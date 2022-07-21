import Layout from '@/components/Layout';
import { useEffect, useRef, useState } from 'react';
import { productDetails, productProp } from 'type';
import useStoreContext from '@/context/context';
import Heart from '../components/Heart';
import '../styles/product.scss';
import Amount from '@/components/Amount';
import { graphql } from 'gatsby';
import ProductCard from '@/components/ProductCard';
import { navigate } from 'gatsby';
import next from '../icons/next.png';
import left_arrow from '../icons/left-arrow.png';

interface prop {
  pageContext: { product: productProp };
  data: {
    allShopifyProduct: {
      edges: productProp[];
    };
  };
}
const Product = ({ pageContext, data }: prop) => {
  const { addToCart, setfilling } = useStoreContext();
  const {
    description,
    featuredImage,
    media,
    priceRangeV2,
    title,
    variants,
    tags,
  } = pageContext.product.node;
  const [options, setOptions] = useState<any[]>([]);
  const [displayOptions, setDisplayOptions] = useState<
    { title: string; options: string[] }[]
  >([]);
  const [selected, setSelected] = useState<any>({});
  const [namesArray, setNamesArray] = useState<string[]>([]);
  const [quantity, setQuantity] = useState<number>(1);
  const fill = setfilling(title);
  const tag = useRef(tags[Math.round(Math.random() * (tags.length - 1))]);
  const recommendedArray = useRef<productProp[]>([]);
  const settingOptions = () => {
    let holderArray: any[] = [];
    variants?.map((item) => {
      const { selectedOptions, storefrontId, shopifyId } = item;
      let holderObj = {};
      selectedOptions.map((item) => {
        holderObj = { ...holderObj, [item.name]: item.value };
      });
      holderObj = { ...holderObj, variant: storefrontId, shopifyId: shopifyId };
      holderArray.push(holderObj);
    });
    setOptions(holderArray);
  };
  const arrangingOptions = () => {
    let holderObj: { title: string; options: string[] }[] = [];
    if (namesArray.length > 0) {
      namesArray.map((item) => {
        let holderArray: string[] = [];
        options.map((innerItem) => {
          if (!holderArray.includes(innerItem[`${item}`])) {
            holderArray.push(innerItem[`${item}`]);
          }
        });
        holderObj = [...holderObj, { title: item, options: holderArray }];
      });
      setDisplayOptions(holderObj);
    }
  };
  const addingVariant = () => {
    if (!selected) {
      return;
    }
    if (Object.keys(selected).length === namesArray.length) {
      let filtered = options;

      namesArray.map((item) => {
        filtered = filtered.filter(
          (innerItem) => innerItem[`${item}`] === selected![`${item}`],
        );
      });

      if (filtered.length === 1) {
        const variant = filtered[0].variant;
        addToCart({ quantity, variant });
      }
    }
  };
  const colors = {
    teal: '#008080',
    red: '#ff0000',
    salmon: '#fa8072',
    purple: '#c95ec9',
    orange: '#ff9900',
    babypink: '#ffc0cb',
    baby_pink: '#ffc0cb',
    light_pink: '#ffc0cb',
    fushia: '#f502bc',
    lilac: '#e3aafa',
    lilas:
      'linear-gradient(45deg, rgb(252, 158, 228), rgb(129, 194, 219),rgb(252, 158, 228), rgb(129, 194, 219))',
    pink: '#ff64c4',
    grey: '#aba9a7',
    light_red: '#fcdede',
    brown: '#75400b',
    light_brown: '#edc195',
    yellow: '#f2d322',
    green: '#00e000',
    baby_blue: '#5dc2cf',
    blue: '#313eff',
    deep_blue: '#152f45',
    turquoise: '#63b7c2',
    white: '#fff',
    black: '#000',
  };
  const settingQuantity = (x: boolean) => {
    if (x) {
      setQuantity(quantity + 1);
    } else {
      if (quantity > 1) setQuantity(quantity - 1);
    }
  };
  function countWords(str: string) {
    const arr = str.split(' ');
    return arr.filter((word) => word !== '').length;
  }
  useEffect(() => {
    let holder: string[] = [];
    variants![0].selectedOptions.map((item) => holder.push(item.name));
    setNamesArray(holder);

    data.allShopifyProduct.edges.map((item, index) => {
      if (item.node.tags.includes(tag.current)) {
        if (index === 0) {
          recommendedArray.current = [item];
          return;
        }
        const temp = [...recommendedArray.current!, item];
        recommendedArray.current = temp;
      }
    });
  }, []);
  useEffect(() => {
    if (options.length < 1) {
      settingOptions();
    }
  }, []);
  useEffect(() => {
    if (options.length > 0) {
      arrangingOptions();
    }
  }, [options]);
  const navigate = (dir: 'prev' | 'next' | number) => {
    const allImgs = document.querySelectorAll('.images .img-box');
    const one = document.querySelector('.images .one');
    const two = document.querySelector('.images .two');
    const length = allImgs.length;
    const arrayV = Array.from(allImgs);
    if (dir === 'next') {
      if (arrayV.find((item) => item === two)) {
        let indexTwo = arrayV.findIndex((item) => item === two);

        one?.removeAttribute('class');
        one?.setAttribute('class', 'img-box');
        two?.removeAttribute('class');
        two?.setAttribute('class', 'img-box one');
        if (length - 1 > indexTwo) {
          const newTwo = arrayV.at(indexTwo + 1);
          newTwo?.removeAttribute('class');
          newTwo?.setAttribute('class', 'img-box two');
        } else {
          const newTwo = arrayV.at(0);
          newTwo?.removeAttribute('class');
          newTwo?.setAttribute('class', 'img-box two');
        }
      }
    }
    if (dir === 'prev') {
      if (arrayV.find((item) => item === one)) {
        let indexOne = arrayV.findIndex((item) => item === one);
        one?.removeAttribute('class');
        one?.setAttribute('class', 'img-box two');
        two?.removeAttribute('class');
        two?.setAttribute('class', 'img-box');
        if (indexOne !== 0) {
          const newOne = arrayV.at(indexOne - 1);

          newOne?.removeAttribute('class');
          newOne?.setAttribute('class', 'img-box one');
        } else {
          const newOne = arrayV.at(length - 1);

          newOne?.removeAttribute('class');
          newOne?.setAttribute('class', 'img-box one');
        }
      }
    }
    if (typeof dir === 'number') {
      const newOne = arrayV.at(dir);
      if (newOne !== one) {
        one?.removeAttribute('class');
        one?.setAttribute('class', 'img-box');
        two?.removeAttribute('class');
        two?.setAttribute('class', 'img-box');
        newOne?.removeAttribute('class');
        newOne?.setAttribute('class', 'img-box one');

        if (length - 1 > dir) {
          const newTwo = arrayV.at(dir + 1);
          newTwo?.removeAttribute('class');
          newTwo?.setAttribute('class', 'img-box two');
        } else {
          const newTwo = arrayV.at(0);
          newTwo?.removeAttribute('class');
          newTwo?.setAttribute('class', 'img-box two');
        }
      }
    }
  };
  return (
    <Layout page="none">
      <>
        <div className="product">
          <div className="images">
            {media.length > 1 && (
              <div className="markers">
                <div className="prev" onClick={() => navigate('prev')}>
                  <img src={left_arrow} alt={`previous image of ${title}`} />
                </div>
                <div className="next" onClick={() => navigate('next')}>
                  <img src={next} alt={`next image of ${title}`} />
                </div>
              </div>
            )}
            {media.length === 1 && (
              <div className="img-box one">
                <img src={featuredImage.src} alt={` image of ${title}`} />
              </div>
            )}
            {media.map((item, index) => {
              if (
                (media.length > 1 && index === 1) ||
                (media.length === 1 && index === 0)
              ) {
                return (
                  <div className={`img-box two`} key={index}>
                    <img
                      src={item.preview.image.src}
                      alt={`another image of ${title}`}
                    />
                  </div>
                );
              }
              let classes = index === 0 ? 'one' : '';

              return (
                <div className={`img-box ${classes}`} key={index}>
                  <img
                    src={item.preview.image.src}
                    alt={`another image of ${title}`}
                  />
                </div>
              );
            })}
            <div className="abs">
              <ul className="list">
                {media.length > 1 &&
                  media.map((item, index) => {
                    if (index < 4) {
                      return (
                        <li
                          key={index}
                          onClick={() => {
                            navigate(index);
                          }}
                        >
                          <img
                            src={item.preview.image.src}
                            alt={`another image of ${title}`}
                          />
                        </li>
                      );
                    }
                  })}
              </ul>
            </div>
          </div>

          <section className="details">
            <h1>{title}</h1>
            <div className="heart-price">
              <Amount amount={priceRangeV2.maxVariantPrice.amount} />
              <Heart product={pageContext.product} fill={fill} />
            </div>
            <p className="description">{description}</p>
            <div className="options">
              {displayOptions.map((item, index) => {
                return (
                  <div className="box" key={index}>
                    <h4>{item.title}</h4>
                    <ul>
                      {item.options.map((innerItem, index) => {
                        let newItem =
                          countWords(innerItem) > 1
                            ? innerItem.toLowerCase().replaceAll(' ', '_')
                            : innerItem.toLowerCase();
                        let returnee: JSX.Element = <></>;

                        if (selected !== {}) {
                          const element = document.querySelector(
                            `.${innerItem.replaceAll(' ', '')}`,
                          )?.classList;
                          if (
                            selected[item.title]?.replaceAll(' ', '') ===
                            innerItem.replaceAll(' ', '')
                          ) {
                            element?.add('selected');
                          } else {
                            element?.remove('selected');
                          }
                        }
                        if (
                          index === 0 &&
                          !Object.keys(selected).includes(item.title)
                        ) {
                          setSelected({
                            ...selected,
                            [`${item.title}`]: innerItem,
                          });
                        }
                        item.title.toLowerCase() === 'color'
                          ? (returnee = (
                              <li
                                className={`color ${innerItem.replaceAll(
                                  ' ',
                                  '',
                                )} ${index === 0 ? 'selected' : ''}`}
                                key={index}
                                onClick={() => {
                                  setSelected({
                                    ...selected,
                                    [`${item.title}`]: innerItem,
                                  });
                                  let temp: string[] = [];
                                  variants.map((item) => {
                                    item.selectedOptions.map((newInnerItem) => {
                                      if (
                                        newInnerItem.name.toLowerCase() ===
                                        'color'
                                      ) {
                                        if (newInnerItem.value === innerItem) {
                                          temp = [...temp, item.image.src];
                                        }
                                      }
                                    });
                                  });

                                  media.forEach((item, index) => {
                                    const source = item.preview.image.src;
                                    if (temp.includes(source)) {
                                      navigate(index);
                                    } else if (
                                      temp[0].length === source.length
                                    ) {
                                      if (
                                        temp[0].substring(
                                          0,
                                          temp[0].length - 2,
                                        ) ===
                                        source.substring(0, source.length - 2)
                                      ) {
                                        navigate(index);
                                      }
                                    }
                                  });
                                }}
                                style={{
                                  background:
                                    colors[newItem as keyof typeof colors],
                                }}
                                value={innerItem}
                                title={innerItem}
                              ></li>
                            ))
                          : (returnee = (
                              <li
                                className={`${innerItem.replaceAll(
                                  ' ',
                                  '',
                                )} box-sm ${index === 0 ? 'selected' : ''}`}
                                key={index}
                                onClick={() => {
                                  setSelected({
                                    ...selected,
                                    [`${item.title}`]: innerItem,
                                  });
                                }}
                              >
                                {innerItem}
                              </li>
                            ));
                        return returnee;
                      })}
                    </ul>
                  </div>
                );
              })}
            </div>
            <div className="counter">
              <div className="inner">
                <button onClick={() => settingQuantity(false)}>-</button>
                <span>{quantity}</span>
                <button onClick={() => settingQuantity(true)}>+</button>
              </div>
            </div>
            <div className="btn-box">
              <button
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  addingVariant();
                }}
              >
                add
              </button>
            </div>
          </section>
        </div>

        <section className="recommend">
          <h2 className="title">recommeded for you</h2>
          <div className="productItems">
            {recommendedArray.current !== undefined ? (
              recommendedArray.current.map((item, index) => {
                let fill = setfilling(item.node.title);

                if (index < 6) {
                  return <ProductCard product={item} key={index} fill={fill} />;
                }
              })
            ) : (
              <></>
            )}
          </div>
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

export default Product;
