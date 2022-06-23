import React, { createContext, useState, useEffect, useContext } from 'react';
import fetch from 'isomorphic-fetch';
import Client from 'shopify-buy';

const client = Client.buildClient(
  {
    domain: process.env.GATSBY_SHOPIFY_STORE_URL!,
    storefrontAccessToken: process.env.GATSBY_STOREFRONT_ACCESS_TOKEN!,
  }, //, fetch
);
interface valuesProp {
  cart: any[];
  loading: boolean;
  addVariantToCart: (product: any, quantity: any) => void;
  removeLineItem: (variantId: any) => void;
  client: Client.Client;
  checkout: {
    id: string;
    lineItems: any[];
    webUrl: string;
  };
}
const defaultValues = {
  cart: [],
  loading: false,
  addVariantToCart: () => {},
  removeLineItem: () => {},
  client,
  checkout: {
    id: '',
    lineItems: [],
    webUrl: '',
  },
};

const StoreContext = createContext<valuesProp>(defaultValues);
const isBrowser = typeof window !== `undefined`;
const localStorageKey = `shopify_checkout_id`;

export const StoreProvider = ({ children }: any) => {
  const [cart, setCart] = useState<valuesProp['cart']>(defaultValues.cart);
  const [checkout, setCheckout] = useState<any>(defaultValues.checkout);
  const [loading, setLoading] = useState(false);

  const setCheckoutItem = (checkout: any) => {
    if (isBrowser) {
      localStorage.setItem(localStorageKey, checkout.id);
    }
    setCheckout(checkout);
  };
  /////////////////////////////////////////////////////////////////
  useEffect(() => {
    const initializeCheckout = async () => {
      const existingCheckoutID = isBrowser //checkout.id from ls
        ? localStorage.getItem(localStorageKey)
        : null;
      // console.log('existingCheckoutID', existingCheckoutID);
      if (existingCheckoutID && existingCheckoutID !== `null`) {
        try {
          const existingCheckout = await client.checkout.fetch(
            existingCheckoutID,
          ); //usiing the id to get the chechout items
          if (!existingCheckout.completedAt) {
            setCheckoutItem(existingCheckout);
            return;
          }
        } catch (e) {
          localStorage.setItem(localStorageKey, 'catch e');
        }
      }
      const newCheckout = await client.checkout.create();
      setCheckoutItem(newCheckout);
    };

    initializeCheckout();
  }, []);
  /////////////////////////////////////////////////////////////////
  const addVariantToCart = async (product: any, quantity: any) => {
    setLoading(true);
    console.log(product);
    if (checkout.id === '') {
      console.error('No checkout ID assigned.');
      return;
    }

    const checkoutID = checkout.id;
    const variantId = product.variants[0]?.id;
    const parsedQuantity = parseInt(quantity, 10);
    console.log(checkoutID, variantId, client);
    const lineItemsToUpdate = [
      {
        variantId,
        quantity: parsedQuantity,
      },
    ];

    try {
      console.log('try', checkout, client);
      const res = await client.checkout.addLineItems(
        checkoutID,
        lineItemsToUpdate,
      );
      console.log('try client');
      setCheckout(res);
      console.log(res);
      let updatedCart = [];
      if (cart.length > 0) {
        const itemIsInCart = cart.find(
          (item: any) => item.product.variants[0]?.shopifyId === variantId,
        );

        if (itemIsInCart) {
          const newProduct = {
            product: { ...itemIsInCart.product },
            quantity: itemIsInCart.quantity + parsedQuantity,
          };
          const otherItems = cart.filter(
            (item) => item.product.variants[0]?.shopifyId !== variantId,
          );
          updatedCart = [...otherItems, newProduct];
        } else {
          updatedCart = cart.concat([{ product, quantity: parsedQuantity }]);
        }
      } else {
        updatedCart = [{ product, quantity: parsedQuantity }];
      }
      setCart(updatedCart);

      setLoading(false);
      alert('Item added to cart!');
    } catch (error) {
      setLoading(false);
      console.error(`Error in addVariantToCart: ${error}`);
    }
  };

  /////////////////////////////////////////////////////////////////
  const removeLineItem = async (variantId: any) => {
    setLoading(true);
    try {
      if (checkout.lineItems.length < 1) throw new Error('Cart is empty');

      let lineItemID = '';
      checkout.lineItems?.forEach((item: any) => {
        if (item.variableValues.lineItems[0]?.variantId === variantId) {
          lineItemID = item.id;
        }
      });

      if (!lineItemID) {
        console.log('Product not in cart');
        return;
      }

      const res = await client.checkout.removeLineItems(checkout.id, [
        lineItemID,
      ]);
      setCheckout(res);

      const updatedCart = cart.filter(
        (item: any) => item.product.variants[0]?.shopifyId !== variantId,
      );
      setCart(updatedCart);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(`Error in removeLineItem: ${error}`);
    }
  };

  /////////////////////////////////////////////////////////////////

  return (
    <StoreContext.Provider
      value={{
        ...defaultValues,
        addVariantToCart,
        removeLineItem,
        cart,
        checkout,
        loading,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

const useStore = () => {
  const context = useContext(StoreContext);

  if (context === undefined) {
    throw new Error('useStore must be used within StoreContext');
  }

  return context;
};

export default useStore;
