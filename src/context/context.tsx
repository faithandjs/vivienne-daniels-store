import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import Client from 'shopify-buy';
import { productProp, cartProp, productDetails } from '../../type';
interface contextProp {
  children: JSX.Element;
}

const client = Client.buildClient({
  domain: process.env.GATSBY_SHOPIFY_STORE_URL!,
  storefrontAccessToken: process.env.GATSBY_STOREFRONT_ACCESS_TOKEN!,
});

const StoreContext = createContext<any>(null);
const { Provider } = StoreContext;

export const Context = ({ children }: contextProp) => {
  const browser = typeof window !== `undefined`;
  const shopifyCheckoutID = 'shopify-checkout-ID';
  const shopifyCart = 'shopify-cart';
  const shopifyWishlist = 'shopify-wishlist';
  const [checkoutID, setCheckoutID] = useState<any>();
  const [currentCheckout, setCurrentCheckout] = useState<any>('');
  const [wishlist, setWishlist] = useState<productProp[]>([]); //productProp[]
  const initialSet = useRef(false);

  const passed = useRef(false);

  const setfilling = (title: string) => {
    let fill: '#fc0000e7' | 'transparent' = 'transparent';
    wishlist
      ? wishlist.find((item: productProp) => item.node.title === title)
        ? (fill = '#fc0000e7')
        : (fill = 'transparent')
      : null;
    return fill;
  };
  const settingCheckout = (checkout: any) => {
    if (browser) {
      localStorage.setItem(shopifyCheckoutID, checkout.id);
    }
    setCurrentCheckout(checkout);
  };
  const savingWishlist = (savewishlist: any = wishlist) => {
    localStorage.setItem(shopifyWishlist, JSON.stringify(savewishlist));
    //
  };
  const gettingCheckoutID = async () => {
    try {
      const oldCheckoutId = localStorage.getItem(shopifyCheckoutID)
        ? localStorage.getItem(shopifyCheckoutID)
        : null;
      const oldCart = localStorage.getItem(shopifyCart)
        ? JSON.parse(localStorage.getItem(shopifyCart)!)
        : [];
      const oldWishlist = localStorage.getItem(shopifyWishlist)
        ? JSON.parse(localStorage.getItem(shopifyWishlist)!)
        : [];

      if (oldCheckoutId) {
        setCheckoutID(oldCheckoutId);
        if (oldWishlist.length > 1) setWishlist(oldWishlist);
        await client.checkout.fetch(oldCheckoutId).then((checkout) => {
          settingCheckout(checkout);
        });
      } else {
        await client.checkout.create().then((checkout) => {
          settingCheckout(checkout);
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    if (browser) {
      gettingCheckoutID();
      passed.current = true;
    }
  }, [typeof checkoutID === 'undefined']);
  useEffect(() => {
    if (initialSet.current) {
      savingWishlist();
    }
  }, [wishlist, currentCheckout]);

  const addToCart = async ({
    product,
    quantity,
    variant,
    shopifyId,
  }: cartProp) => {
    if (!initialSet.current) initialSet.current = true;
    console.log('add items to cart');
    if (typeof checkoutID === 'undefined') {
      console.log('no checkout id');
      return;
    }
    const lineItemsToAdd = [
      {
        variantId: variant,
        quantity: quantity,
      },
    ];
    try {
      await client.checkout
        .addLineItems(checkoutID, lineItemsToAdd)
        .then((checkout) => {
          settingCheckout(checkout);
        });
    } catch (e) {
      console.log('add to cart error', e);
    }
  };
  const editWishlist = (product: productProp) => {
    if (!initialSet.current) initialSet.current = true;
    let tempWL: productProp[] = [];
    if (wishlist.length === 0) {
      tempWL = [product];
    } else {
      if (wishlist.find((item) => item.node.title === product.node.title)) {
        tempWL = wishlist.filter(
          (item) => item.node.title !== product.node.title,
        );
      } else {
        tempWL = [...wishlist, product];
      }
    }
    setWishlist(tempWL);
    return;
  };

  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>..
  const deleteFromCart = async (lineItemIdsToRemove: string[]) => {
    if (!initialSet.current) initialSet.current = true;

    // const lineItemIdsToRemove: any = [item];
    if (currentCheckout.lineItems < 1) {
      console.log('cart empty');
      return;
    }
    try {
      await client.checkout
        .removeLineItems(checkoutID, lineItemIdsToRemove)
        .then((checkout) => {
          // console.log(checkout.lineItems);
          console.log('it worked?');
          settingCheckout(checkout);
        });
    } catch (e) {
      console.log(e);
    }
  };

  //test checkout attributes
  //check numbers
  // console.log('context  >>>>>>>>>>>>>>>>>>>>>>>');
  // wishlist.map((item) => {
  //   console.log(item.node.handle);
  // });

  // console.log('context  >>>>>>>>>>>>>>>>>>>>>>>');
  // cart.map((item) => {
  //   console.log(item.product.node.handle);
  // });
  const value = useMemo(
    () => ({
      addToCart,
      passed,
      deleteFromCart,
      currentCheckout,
      editWishlist,
      wishlist,
      setfilling,
    }),
    [
      addToCart,
      deleteFromCart,
      currentCheckout,
      passed,
      editWishlist,
      wishlist.reverse(),
      setfilling,
    ],
  );
  return <Provider value={value}>{children}</Provider>;
};

const useStoreContext = () => {
  const context = useContext(StoreContext);

  // if (context === undefined) {
  //   throw new Error('useStore must be used within StoreContext');
  // }

  return context;
};

export default useStoreContext;
