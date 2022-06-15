import { graphql } from 'gatsby';
import ProductCard from '@/components/ProductCard';
import { productsProp, productProp, productDetails } from 'type';
import Layout from '@/components/Layout';
import useStore from '@/context/StoreContext';
import '../styles/products.scss';
import { useEffect, useState } from 'react';

const Products = ({ data }: productsProp) => {
  const [input, setInput] = useState('');
  const [showing, setShowing] = useState('');
  const [display, setDisplay] = useState<{ display: 'block' | 'none' }>({
    display: 'none',
  });
  const [current, setCurrent] = useState<
    productProp[] | 'no products match your search'
  >(data.allShopifyProduct.edges);

  const returnTags = (tag: string, alt?: string) => {
    let temp: productProp[] = [];
    data.allShopifyProduct.edges.map((item) => {
      const x = item.node;
      const newTag = tag.toLowerCase().trim();
      const newAlt = alt ? alt.toLowerCase().trim() : null;

      const isVariant = (a: productDetails['variants'], b: string) => {
        let newVar: string[] = [];
        let states: boolean[] = [];
        a.map((v) => {
          if (v.displayName) {
            newVar.push(v.displayName.toLowerCase().trim());
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
    return (
      <>
        {arr.map((item, index) => (
          <button
            onClick={() => {
              setDisplay({ display: 'none' });
              setInput(' ');
              typeof item === 'string'
                ? returnTags(item)
                : returnTags(item.a, item.b);
            }}
            key={index}
          >
            {typeof item === 'string' ? item : item.a}
          </button>
        ))}
      </>
    );
  };
  return (
    <Layout page='products'>
      <>
        <div className="search">
          <div className="input-box">
            <input
              type="search"
              name="search-bar"
              id="search"
              placeholder="..."
              value={input}
              onMouseOver={() => {
                if (display.display !== 'block')
                  setDisplay({ display: 'block' });
              }}
              onChange={(e) => {
                setInput(e.target.value);
              }}
            />
            <button
              onClick={() => {
                setDisplay({ display: 'none' });
                returnTags(input);
              }}
            >
              search
            </button>
          </div>
          <div className="options" style={display}>
            <section>
              <div>
                <button
                  onClick={() => {
                    setInput('');
                    setCurrent(data.allShopifyProduct.edges);
                    setDisplay({ display: 'none' });
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
          </div>
        </div>
        {showing.trim() ? (
          <div
            className="showing"
            onMouseOver={() => {
              if (display.display !== 'none') setDisplay({ display: 'none' });
            }}
          >
            Showing results for '<span>{`${showing}`}</span>'.
          </div>
        ) : (
          <></>
        )}
        <section
          className="products"
          onMouseOver={() => {
            if (display.display !== 'none') setDisplay({ display: 'none' });
          }}
        >
          {typeof current === 'object' ? (
            current.map((product, index) => (
              <ProductCard product={product} key={index} />
            ))
          ) : (
            <div>{current}</div>
          )}
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
            id
            displayName
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
