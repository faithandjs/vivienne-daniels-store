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
              shopifyId
              displayName
              image {
                src
              }
              id
              storefrontId
              selectedOptions {
                name
                value
              }
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
  result.data.allShopifyProduct.edges.forEach((product) => {
    createPage({
      path: `/products/${product.node.handle}`,
      component: path.resolve(`./src/get-product/product.tsx`),
      context: {
        product: product,
      },
    });
  });
};
