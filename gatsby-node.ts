import type { GatsbyNode } from 'gatsby';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
const path = require(`path`);

export const onCreateWebpackConfig: GatsbyNode['onCreateWebpackConfig'] = ({
  actions,
}) => {
  actions.setWebpackConfig({
    resolve: {
      plugins: [new TsconfigPathsPlugin()],
    },
  });
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const result = await graphql(`
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
  `);
  console.log(result);
  result.data.allShopifyProduct.edges.forEach(({ node }) => {
    createPage({
      path: `/products/${node.handle}`,
      component: path.resolve(`./src/get-product/product.tsx`),
      context: {
        product: node,
      },
    });
  });
};
/*
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const result = await graphql(`
  {
    allShopifyProduct(filter: {tags: {eq: "shoes"}}) {
      edges {
        node {
          variants {
            id
          }
          title
          tags
          description
          featuredImage {
            src
          }
          handle
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
  `);
  console.log(result); 
   createPage({
      path: `/products/shoes`,
      component: path.resolve(`./src/pages/shop/product.tsx`),
      context: {
        product: result.data,
      },
    });
};
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const result = await graphql(`
  {
    allShopifyProduct(filter: {tags: {eq: "dior"}}) {
      edges {
        node {
          variants {
            id
          }
          title
          tags
          description
          featuredImage {
            src
          }
          handle
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
  `);
  console.log(result); 
   createPage({
      path: `/products/christian-dior`,
      component: path.resolve(`./src/pages/shop/designer.tsx`),
      context: {
        product: result.data,
      },
    });
};
*/