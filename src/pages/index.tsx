import DesignerImage from '@/components/DesignerImage';
import Layout from '@/components/Layout';
import { graphql } from 'gatsby';
import { useEffect, useRef, useState } from 'react';
import '../styles/global.scss';
import '../styles/iotd.scss';
import '../styles/shop.scss';

export default function Home({ data }: any) {
  const { media, priceRangeV2, title } = data.shopifyProduct;
  const products = data.allShopifyProduct.edges;
  const length = products.length;
  const array = useRef<number[]>([]);

  const newArrivals = () => {
    while (array.current.length < 4) {
      const n = Math.round(Math.random() * length);
      if (
        (!array.current.find((num) => num === n) ||
          array.current.find((num) => num === n) !== 0) &&
        products[n].node.title !== 'VERSACE MEDUSA AEVITAS PLATFORM PUMPS'
      ) {
        array.current.push(n);
      }
    }
    return (
      <>
        {products.map((item: any, index: number) => {
          const { featuredImage, priceRangeV2, title } = item.node;
          if (
            array.current.find((num) => num === index) ||
            array.current.find((num) => num === index) === 0
          ) {
            return (
              <div key={index}>
                <div className="img-box">
                  <img src={featuredImage.src} alt={title} />
                </div>
                <div className="details">
                  <span>{title}</span>
                </div>
              </div>
            );
          }
        })}
      </>
    );
  };

  return (
    <Layout>
      <>
        <section className="banner"></section>
        <section className="iotd">
          <div className="title">Item of the day</div>
          <div className="images">
            {media.map((item: any, index: number) => (
              <div className="img-box" key={index}>
                <img src={item.preview.image.src} />
              </div>
            ))}
            {media.map((item: any, index: number) => (
              <div className="img-box" key={index}>
                <img src={item.preview.image.src} />
              </div>
            ))}
          </div>
          <div className="details">
            <p>{title.toLowerCase()}</p>
            <p>
              <span>Best selling item - </span>
              <span>Eur </span>
              <span>{priceRangeV2.maxVariantPrice.amount}</span>
            </p>
          </div>
        </section>
        <section className="new">
          <div className="title">new arrivals</div>
          <div className="images">{newArrivals()}</div>
        </section>
        <section className="shop">
          <div className="title">shop designers</div>
          <div className="designers">
            <div className="names"> lalllaala</div>
            <div className="grid">
              <div className="up">
                <DesignerImage
                  src="lv"
                  title="Louis Vuitton"
                  button="Louis Vuitton"
                />
                <div className="all">
                  <span>all products</span>
                </div>
                <DesignerImage src="ysl" title="Yves Saint Laurent" />
              </div>
              <div className="down">
                <DesignerImage src="chanel" />
                <DesignerImage src="dior" title="Christian Dior" />
                <DesignerImage src="prada" />
              </div>
            </div>
          </div>
        </section>
      </>
    </Layout>
  );
}
export const query = graphql`
  {
    allShopifyProduct {
      edges {
        node {
          featuredImage {
            src
          }
          title
          priceRangeV2 {
            maxVariantPrice {
              amount
            }
          }
        }
      }
    }
    shopifyProduct(title: { eq: "VERSACE MEDUSA AEVITAS PLATFORM PUMPS" }) {
      media {
        preview {
          image {
            src
          }
        }
      }
      title
      priceRangeV2 {
        maxVariantPrice {
          amount
        }
      }
    }
  }
`;
