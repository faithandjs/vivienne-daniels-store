import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import Client from 'shopify-buy';
import { productProp, cartProp } from '../../type';
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
  const [cart, setCart] = useState<cartProp[]>([]);
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
  const savingCartAndWishlist = (
    savecart: any = cart,
    savewishlist: any = wishlist,
  ) => {
    localStorage.setItem(shopifyCart, JSON.stringify(savecart));
    localStorage.setItem(shopifyWishlist, JSON.stringify(savewishlist));
    //
  };
  const settingCart = (cartItem: cartProp) => {
    setCart([...cart, cartItem]);
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
        if (oldCart.length > 1) setCart(oldCart);
        if (oldWishlist.length > 1) setWishlist(oldWishlist);
        savingCartAndWishlist(oldCart, oldWishlist);
        await client.checkout.fetch(oldCheckoutId).then((checkout) => {
          settingCheckout(checkout);
        });
      } else {
        await client.checkout.create().then((checkout) => {
          settingCheckout(checkout);
        });
        savingCartAndWishlist([], wishlist);
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
      savingCartAndWishlist();
      console.log(
        'cart length',
        cart.length,
        'chekout item length',
        currentCheckout.lineItems,
      );
      console.log('wishlist', wishlist);
    }
  }, [cart, wishlist, currentCheckout]);

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

      if (cart.length > 0) {
        const inCart = cart.find((obj) => obj.variant === variant);
        if (inCart) {
          let oldQuantity = inCart.quantity;
          let newQuantity = quantity;
          const newObject = { ...inCart, quantity: oldQuantity + newQuantity };
          const remainder = cart.filter((obj) => obj.variant !== variant);
          setCart(remainder.concat(newObject));
        } else {
          settingCart({ product, quantity, variant, shopifyId });
        }
      } else {
        settingCart({ product, quantity, variant, shopifyId });
      }
    } catch (e) {
      console.log('add to cart error', e);
    }
  };

  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>..
  const deleteFromCart = async (item: any) => {
    if (!initialSet.current) initialSet.current = true;
    // console.log(items)
    // return
    const lineItemIdsToRemove: string[] = [item.variant];
    // console.log(
    //   lineItemIdsToRemove,
    //   checkoutID,
    //   currentCheckout.lineItems.length,
    //   cart.length,
    // );
    if (currentCheckout.lineItems < 1) {
      console.log('cart empty');
      return;
    }
    // items.map((item) => {
    //   const includes = currentCheckout.lineItems.find((innerItem:any)=> innerItem.shopifyId === );
    //   includes ? lineItemIdsToRemove.push(item) : console.log('not in cart');
    // });
    console.log(lineItemIdsToRemove, currentCheckout.lineItems);
    try {
      await client.checkout
        .removeLineItems(checkoutID, lineItemIdsToRemove)
        .then((checkout) => {
          // console.log(checkout.lineItems);
          console.log('it worked?');
          settingCheckout(checkout);
        })
        .then(() => {
          // let newCart = cart;
          // items.map((item) => {
          //   const result = newCart.filter((x) => x.variant !== item);
          //   newCart = result;
          // });
          // console.log(newCart);
        });
    } catch (e) {
      console.log(e);
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
  //add to cart!!!!!!!!!!!!!!!!!!!!!!!
  //delete from cart
  //add to wishlist
  //updating cart when an increased number of items is added

  //test checkout attributes
  //check numbers
  console.log('context');
  cart.map((item) => {
    console.log(item.product.node.handle);
  });
  const value = useMemo(
    () => ({
      addToCart,
      passed,
      deleteFromCart,
      cart,
      editWishlist,
      wishlist,
      setfilling,
    }),
    [
      addToCart,
      deleteFromCart,
      passed,
      cart,
      editWishlist,
      wishlist,
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
