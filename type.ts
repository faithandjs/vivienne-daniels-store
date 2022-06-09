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
  tags:string[];
  title: string;
  variants: { shopifyId: string }[];
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
}
