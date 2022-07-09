import { graphql } from 'gatsby';
import ProductCard from '@/components/ProductCard';
import { productsProp, productProp, productDetails } from 'type';
import Layout from '@/components/Layout';
import useStoreContext from '@/context/context';
import '../styles/products.scss';
import { useEffect, useRef, useState } from 'react';
import { type } from 'os';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Products = ({ data }: productsProp) => {
  gsap.registerPlugin(ScrollTrigger);
  const { editWishlist, wishlist, setfilling } = useStoreContext();
  const [input, setInput] = useState('');
  const [showing, setShowing] = useState('');
  const passed = useRef(false);

  const [current, setCurrent] = useState<
    productProp[] | 'no products match your search'
  >(data.allShopifyProduct.edges);

  const settingDisplay = (x: boolean) => {
    if (!x) {
      gsap.to('.search-box', {
        x: '-100%',
        ease: 'power2.out',
        duration: 0.4,
      });
      gsap.to('.filter', {
        x: 0,
        duration: 0.2,
      });
    }
    if (x) {
      gsap.to('.search-box', {
        x: 0,
        ease: 'expo.out',
        duration: 1,
      });
      gsap.to('.filter', {
        x: '-100%',
        duration: 0.2,
      });
    }
  };
  // useEffect(() => {
  //   const showMenu = gsap
  //     .from('header.products', {
  //       yPercent: -100,
  //       paused: true,
  //       duration: 0.2,
  //     })
  //     .progress(1);

  //   ScrollTrigger.create({
  //     trigger: 'header.products',
  //     start: 'bottom top',
  //     // markers: true,
  //     endTrigger: 'footer',
  //     end: 'bottom bottom',
  //     onUpdate: (self) => {
  //       self.direction === -1 ? showMenu.play() : showMenu.reverse();
  //     },
  //   });
  // });
  const returnTags = (tag: string, alt?: string) => {
    let temp: productProp[] = [];
    data.allShopifyProduct.edges.map((item) => {
      const x = item.node;
      const newTag = tag.toLowerCase().replace(' ', '');
      const newAlt = alt ? alt.toLowerCase().replace(' ', '') : null;
      const isVariant = (a: productDetails['variants'], b: string) => {
        let newVar: string[] = [];
        let states: boolean[] = [];
        a!.map((v) => {
          if (v.displayName) {
            newVar.push(v.displayName.toLowerCase().replace(' ', ''));
          }
        });
        newVar.map((item) => {
          states.push(item.includes(b));
        });
        return states.includes(true);
      };

      if (
        x.title.toLowerCase().includes(newTag) ||
        x.tags.includes(newTag) ||
        isVariant(x.variants, newTag) ||
        (newAlt &&
          (x.title.toLowerCase().includes(newAlt) ||
            x.tags.includes(newAlt) ||
            isVariant(x.variants, newAlt)))
      ) {
        setShowing(tag);
        temp.push(item);
      }
    });
    if (temp.length > 0) {
      setCurrent(temp);
    } else {
      setShowing('');
      setCurrent('no products match your search');
    }
  };
  const returnOptions = (arr: string[] | { a: string; b?: string }[]) => {
    let selected: 'selected' | '' = '';
    return (
      <>
        {arr.map((item, index) => {
          if (typeof item === 'string') {
            showing === item || input === item
              ? (selected = 'selected')
              : (selected = '');
          } else {
            showing === item.a || input === item.a
              ? (selected = 'selected')
              : (selected = '');
          }
          return (
            <button
              className={`box-sm ${selected}`}
              onClick={() => {
                settingDisplay(false);
                setInput(' ');
                typeof item === 'string'
                  ? returnTags(item)
                  : returnTags(item.a, item.b);
              }}
              key={index}
            >
              {typeof item === 'string' ? item : item.a}
            </button>
          );
        })}
      </>
    );
  };
  return (
    <Layout page="products">
      <>
        <section className="products-and-menu">
          <section className="search-box">
            <div className="search">
              <div className="input-box">
                <input
                  type="search"
                  name="search-bar"
                  id="search"
                  placeholder="..."
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value);
                  }}
                />
                <button
                  onClick={() => {
                    settingDisplay(false);
                    returnTags(input);
                  }}
                >
                  search
                </button>
              </div>
              <div className="options">
                <section>
                  <div>
                    <button
                      className="box-sm"
                      onClick={() => {
                        settingDisplay(false);
                        setInput('');
                        setShowing('');
                        setCurrent(data.allShopifyProduct.edges);
                      }}
                    >
                      all
                    </button>
                    {returnOptions([
                      { a: 'shoes', b: 'shoe' },
                      { a: 'bags', b: 'bag' },
                    ])}
                  </div>
                </section>
                <section>
                  <div>
                    {returnOptions([
                      { a: 'YSL', b: 'yve saint laurent' },
                      { a: 'louis vuitton', b: 'lv' },
                      { a: 'chanel' },
                      { a: 'dior' },
                      { a: 'hermes' },
                      { a: 'prada' },
                    ])}
                  </div>
                </section>
                <section>
                  <div>
                    {returnOptions([
                      { a: 'uk 6', b: '6' },
                      { a: 'uk 7', b: '7' },
                      { a: 'uk 8', b: '8' },
                    ])}
                  </div>
                </section>
                <section>
                  <div>{returnOptions(['black', 'white', 'pink', 'blue'])}</div>
                </section>
                <p></p>
              </div>{' '}
              <div className="x" onClick={() => settingDisplay(false)}>
                <div>
                  <img src="/static/icons/close.png" alt="close icon" />{' '}
                </div>
              </div>
            </div>
          </section>
          <div
            className="filter"
            onClick={() => {
              settingDisplay(true);
            }}
          >
            <img src="/static/icons/search.png" alt="" />
          </div>
          <section className="main">
            {showing.replace(' ', '') ? (
              <div className="showing text">
                Showing results for '<span>{`${showing}`}</span>'.
              </div>
            ) : (
              <div className="title showing"> all products</div>
            )}
            <div className="productItems">
              {typeof current === 'object' ? (
                current.map((product, index) => {
                  let fill = setfilling(product.node.title);
                  return (
                    <ProductCard product={product} key={index} fill={fill} />
                  );
                })
              ) : (
                <div>{current}</div>
              )}
            </div>
          </section>
        </section>
      </>
    </Layout>
  );
};

export const productsQuery = graphql`
  {
    allShopifyProduct {
      edges {
        node {
          featuredImage {
            src
          }
          title
          handle
          variants {
            shopifyId
            displayName
            id
            storefrontId
            selectedOptions {
              name
              value
            }
          }
          id
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
/*
    const variables = { tag: tag };
    const productsQuery =  (graphql`
      query tagProducts($tag: String) {
        allShopifyProduct(filter: { tags: { eq: $tag } }) {
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
              media {
                preview {
                  image {
                    src
                  }
                }
              }
              variants {
                id
              }
              tags
            }
          }
        }
      }
    `, {tag: tag});*/
