import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import Client from 'shopify-buy';
import { productProp, cartProp, statuses, statusProp } from '../../type';
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
  const [wishlist, setWishlist] = useState<productProp[]>([]);

  const initialSet = useRef(false);
  const [statArray, setStatArray] = useState<statusProp[]>();
  const passed = useRef(false);
  const msg_no = useRef(-1);

  const settingStatus = ({ id = 0, stat = statuses.LOADING }: statusProp) => {
    // console.log(statArray);
    if (id === 0 || statArray === undefined) {
      setStatArray([{ id, stat }]);
    } else {
      const temp = [...statArray!, { id, stat }];
      // console.log(statArray, temp);
      setStatArray(temp);
    }
  };
  const resettingStatus = (id:number) => {
    const temp = statArray?.filter((item, index) => item.id !== id);
    // console.log('temp minus item', id, ' : ', temp)
    if (temp?.length !== 0 ) {

      setStatArray(temp);
    } else {
      setStatArray([]);
      msg_no.current = -1;
    }
  };

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
      // console.log(e);
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

  const addToCart = async ({ quantity, variant }: cartProp) => {
    if (!initialSet.current) initialSet.current = true;

    if (typeof checkoutID === 'undefined') {
      await gettingCheckoutID();
      addToCart({ quantity, variant });
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
      const id = ++msg_no.current;
      msg_no.current = id;
      const stat: statuses = statuses.ITEM_ADDED;
      settingStatus({ id, stat });
    } catch (e) {
      const id = ++msg_no.current;
      msg_no.current = id;
      const stat: statuses = statuses.ITEM_NOT_ADDED;
      settingStatus({ id, stat });
      // console.log(e);
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

  const deleteFromCart = async (lineItemIdsToRemove: string[]) => {
    if (!initialSet.current) initialSet.current = true;
    if (typeof checkoutID === 'undefined') {
      await gettingCheckoutID();
    }
    if (currentCheckout.lineItems < 1) {
      return;
    }

    // const id = ++msg_no.current;
    try {
      await client.checkout
        .removeLineItems(checkoutID, lineItemIdsToRemove)
        .then((checkout) => {
          settingCheckout(checkout);
        });
      const id = ++msg_no.current;
      msg_no.current = id;
      const stat: statuses = statuses.ITEM_DELETED;
      settingStatus({ id, stat });
    } catch (e) {
      const id = ++msg_no.current;
      msg_no.current = id;
      const stat: statuses = statuses.ITEM_NOT_DELETED;
      settingStatus({ id, stat });
    }
  };

  const value = useMemo(
    () => ({
      addToCart,
      passed,
      deleteFromCart,
      currentCheckout,
      editWishlist,
      wishlist,
      setfilling,
      statArray,
      resettingStatus,
    }),
    [
      // addToCart,
      // deleteFromCart,
      currentCheckout,
      passed,
      // editWishlist,
      wishlist,
      // setfilling,
      statArray,
      // resettingStatus,
    ],
  );
  return <Provider value={value}>{children}</Provider>;
};

const useStoreContext = () => {
  const context = useContext(StoreContext);

  return context;
};

export default useStoreContext;
