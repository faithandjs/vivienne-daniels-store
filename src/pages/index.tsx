import DesignerImage from '@/components/DesignerImage';
import Layout from '@/components/Layout';
import { graphql, Link } from 'gatsby';
import { useEffect, useRef, useState } from 'react';
import '../styles/global.scss';
import '../styles/index/iotd.scss';
import '../styles/index/new-arrivals.scss';
import '../styles/index/shop.scss';
import '../styles/index/banner.scss';

export default function Home({ data }: any) {
  const { media, priceRangeV2, title } = data.shopifyProduct;
  const products = data.allShopifyProduct.edges;
  const allTags = useRef<string[]>([]);
  const rollingArr = [
    'louis vuitton',
    'yves saint laurent',
    'prada',
    'chanel',
    'dior',
    'shoes',
    'bags',
  ];

  const returnRollingArr = () => {
    products.map((item: any) => {
      item.node.tags.map((tag: string) => {
        if (!allTags.current.find((item) => item === tag)) {
          allTags.current.push(tag);
        }
      });
    });
    return (
      <div>
        {rollingArr.map((item, index: number) => (
          <span key={index}>{item} </span>
        ))}
      </div>
    );
  };

  return (
    <Layout page='home'>
      <>
        <section className="banner">
          <div className="img-box">
            <img
              src="/static/images/cover-image-unsplash-banner.jpg"
              alt="banner: prada bag"
            />
          </div>
          <div className="text">
            <p>we love designers!</p>
          </div>
        </section>
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
        <section className="shop">
          <div className="title">our shop</div>
          <div className="designers">
            <div className="shoes-bags">
              <DesignerImage src0="lv-" src="bags" ex="webp" button="bags" page='product'/>
              <DesignerImage src0="twt-ysl-" src="shoes" button="shoes" page='product'/>
            </div>
            <div className="tags">
              <div className="box">
                {returnRollingArr()}
                {returnRollingArr()}
                {returnRollingArr()}
                {returnRollingArr()}
                {returnRollingArr()}
                {returnRollingArr()}
                {returnRollingArr()}
                {returnRollingArr()}
                {returnRollingArr()}
                {returnRollingArr()}
                {returnRollingArr()}
                {returnRollingArr()}
                {returnRollingArr()}
                {returnRollingArr()}
                {returnRollingArr()}
                {returnRollingArr()}
                {returnRollingArr()}
                {returnRollingArr()}
                {returnRollingArr()}
                {returnRollingArr()}
                {returnRollingArr()}
                {returnRollingArr()}
                {returnRollingArr()}
                {returnRollingArr()}
              </div>
            </div>
            <div className="grid">
              <div className="up">
                <DesignerImage
                  src="lv"
                  title="Louis Vuitton"
                  button="Louis Vuitton"
                />
                <div className="all">
                  <Link to="/products">
                    <span>all products</span>
                  </Link>
                </div>
                <DesignerImage src="ysl" title="Yves Saint Laurent" />
              </div>
              <div className="down">
                <DesignerImage src="chanel" />
                <DesignerImage src="dior" title="Christian Dior"  page='christian-dior'/>
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
          tags
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
