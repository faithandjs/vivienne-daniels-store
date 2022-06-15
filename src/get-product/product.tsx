import Layout from '@/components/Layout';
import React from 'react';
import { productDetails } from 'type';
interface prop {
  product: productDetails;
}
const Product = ({ pageContext }: any) => {
  const { description, featuredImage, handle, priceRangeV2, title, variants } =
    pageContext;
  console.log(pageContext);
  return (
    <Layout>
      <div>
        <div className="img-box">
       
        </div>
        <div className="details">
          <h1>{title}</h1>
          
        </div>
      </div>
      
    </Layout>
  );
};
// <img src={featuredImage.src} alt={`image of ${title}`} />
export default Product;
