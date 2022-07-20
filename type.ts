export interface selectedOptionsProp {
  name: string;
  value: string;
}
export interface productDetails {
  description: string;
  featuredImage: {
    src: string;
  };
  id: string;
  handle: string;
  media: {
    preview: {
      image: { src: string };
    };
  }[];
  priceRangeV2: {
    maxVariantPrice: {
      amount: number;
    };
  };
  tags: string[];
  title: string;
  variants: {
    displayName: string;
    shopifyId: string;
    selectedOptions: selectedOptionsProp[];
    id: string;
    image: {
      src: string;
    };
    storefrontId: string;
  }[];
  variant?: {
    storefrontId: string;
    selectedOptions: { name: string; value: string }[];
  };
}
export interface productProp {
  node: productDetails;
}
export interface productsProp {
  data: {
    allShopifyProduct: {
      edges: productProp[];
    };
  };
}
export interface productCardProp {
  product: productProp;
  fill?: string;
}
export interface cartProp {
  quantity: number;
  variant: string;
}
export enum statuses {
  NEUTRAL = '...',
  LOADING = 'loading...',
  ITEM_ADDED = 'succesfully added',
  ITEM_NOT_ADDED = 'add unsuccesful',
  ITEM_DELETED = 'item deleted',
}
