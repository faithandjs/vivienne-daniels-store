import Layout from '@/components/Layout';
import { graphql } from 'gatsby';
import { productDetails, productsProp } from 'type';

const Product = ({ data }: any) => {
  /* const { description, featuredImage, handle, priceRangeV2, title, variants } =
    pageContext.;*/
  console.log(data);
  return (
    <Layout>
      <div>
        <div className="img-box"></div>
        <div className="details">
          <h1></h1>
        </div>
      </div>
    </Layout>
  );
};

export const productsQuery = graphql`
  {
    allShopifyProduct(filter: { tags: { eq: "shoes" } }) {
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
`;
export default Product;
