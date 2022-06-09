import { graphql, PageProps } from 'gatsby';
import ProductCard from '@/components/ProductCard';
import React from 'react';
import { productsProp, productProp } from 'type';
import Layout from '@/components/Layout';
import useStore from '@/context/StoreContext';
const Products = ({ data }: productsProp) => {
  console.log(data, 'usestore', useStore());
  return (
    <Layout>
      <div>
        {data.allShopifyProduct.edges.map((product, index) => (
          <ProductCard product={product} key={index} />
        ))}
      </div>
    </Layout>
  );
};

export const productsQuery = graphql`
  {
    allShopifyProduct {
      edges {
        node {
          description
          featuredImage {
            src
          }
          handle
          title
          variants {
            id
          }
          tags
          media {
            preview {
              image {
                src
              }
            }
          }
          priceRangeV2 {
            maxVariantPrice {
              amount
            }
          }
        }
      }
    }
  }
`;
export default Products;
