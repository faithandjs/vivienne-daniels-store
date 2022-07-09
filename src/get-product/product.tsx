import Layout from '@/components/Layout';
import { useEffect, useState } from 'react';
import { productDetails, productProp } from 'type';
import useStoreContext from '@/context/context';
import Heart from '../components/Heart';
import '../styles/product.scss';
import Amount from '@/components/Amount';

interface prop {
  pageContext: { product: productProp };
}
const Product = ({ pageContext }: prop) => {
  const { addToCart, setfilling } = useStoreContext();

  const { description, featuredImage, handle, priceRangeV2, title, variants } =
    pageContext.product.node;
  const [options, setOptions] = useState<any[]>([]);
  const [displayOptions, setDisplayOptions] = useState<
    { title: string; options: string[] }[]
  >([]);
  const [selected, setSelected] = useState<any>();
  const [namesArray, setNamesArray] = useState<string[]>([]);
  const [quantity, setQuantity] = useState<number>(1);

  const fill = setfilling(title);
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
      console.log('select all options');
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
        const product = pageContext.product;
        const variant = filtered[0].variant;
        const shopifyId = filtered[0].shopifyId;
        addToCart({ product, quantity, variant, shopifyId });
      }
    } else {
      console.log('select all options');
    }
  };
  const colors = {
    teal: '#008080',
    red: '#ff0000',
    salmon: '#fa8072',
    purple: '#c95ec9',
    orange: '#ff9900',
    babypink: '#ffc0cb',
    pink: '#ff64c4',
    green: '#00e000',
    baby_blue: '#5dc2cf',
    blue: '#313eff',
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
  return (
    <Layout page="none">
      <div className="product">
        <div className="images">
          <div className="img-box one">
            <img src={featuredImage.src} alt="" />
          </div>
          <div className="img-box">
            <img src={featuredImage.src} alt="" />
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
                      let selectedElement;
                      if (selected === undefined) {
                        selectedElement = '';
                      } else {
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

                      item.title.toLowerCase() === 'color'
                        ? (returnee = (
                            <li
                              className={`color tooltip-parent ${innerItem.replaceAll(
                                ' ',
                                '',
                              )}`}
                              key={index}
                              onClick={() => {
                                setSelected({
                                  ...selected,
                                  [`${item.title}`]: innerItem,
                                });
                              }}
                              style={{
                                backgroundColor:
                                  colors[newItem as keyof typeof colors],
                              }}
                              value={innerItem}
                            >
                              <span className="tooltip">{innerItem}</span>
                            </li>
                          ))
                        : (returnee = (
                            <li
                              className={`${innerItem.replaceAll(
                                ' ',
                                '',
                              )} box-sm`}
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
    </Layout>
  );
};
// <img src={featuredImage.src} alt={`image of ${title}`} />
export default Product;
