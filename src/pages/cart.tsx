import Layout from '@/components/Layout';
import '../styles/cart.scss';
import Amount from '@/components/Amount';
import gsap from 'gsap';
import useStoreContext from '@/context/context';
import { Link } from 'gatsby';
import { useEffect, useRef, useState } from 'react';
import X from '../icons/close.png';

interface prop {
  title: string;
  id: string;
  quantity: number;
  variant: {
    title: string;
    price: string | number;
    priceV2: {
      amount: string;
    };
    image: {
      src: string;
    };
  };
}

const Cart = () => {
  const { deleteFromCart, currentCheckout } = useStoreContext();
  const [currentI, setCurrentI] = useState<{ id: string; title: string }>();

  // useEffect(() => {
  //   const msg_status = document.querySelector('.msg');
  //   const msg_status_div = document.querySelector('.msg div');
  //   if (status === statuses.LOADING) {
  //     gsap.to(msg_status, {
  //       y: 0,
  //       ease: 'none',
  //     });
  //     msg_status_div?.setAttribute('class', 'loading');
  //   }
  //   if (status === statuses.ITEM_ADDED || status === statuses.ITEM_DELETED) {
  //     msg_status_div?.setAttribute('class', 'success');
  //   }
  //   if (
  //     status === statuses.ITEM_NOT_ADDED ||
  //     status === statuses.ITEM_NOT_DELETED
  //   ) {
  //     msg_status_div?.setAttribute('class', 'error');
  //   }

  //   if (
  //     status === statuses.ITEM_NOT_ADDED ||
  //     status === statuses.ITEM_NOT_DELETED ||
  //     status === statuses.ITEM_ADDED ||
  //     status === statuses.ITEM_DELETED
  //   ) {
  //     setTimeout(() => {
  //       gsap.to(msg_status, {
  //         y: '-100vh',
  //         ease: 'none',
  //         duration: 0.5,
  //       });
  //       console.log('first');
  //       setTimeout(() => {
  //         settingStatus();
  //         console.log('2nd');
  //       }, 2000);
  //     }, 2000);
  //   }
  // }, [status]);

  const CartCard = ({ id, quantity, variant, title }: prop) => {
    const seperate = () => {
      const arr = Array.from(variant.title);
      if (arr.includes('/')) {
        const id = arr.findIndex((item) => item === '/');
        const first = variant.title.substring(0, id - 1);
        const second = variant.title.substring(id + 2, variant.title.length);
        return [first, second];
      } else {
        return variant.title;
      }
    };
    const newVar = seperate();
    return (
      <div className="box">
        <Link
          to={`/products/${title
            .toLowerCase()
            .replaceAll("'", '')
            .replaceAll(' ', '-')}`}
        >
          <div className="img-box">
            <img src={variant.image.src} alt={title} />
          </div>
        </Link>
        <div className="details">
          <div className="upper">
            <h3>{title}</h3>

            <button
              type="button"
              onClick={(e) => {
                setCurrentI({ id: id, title: title });
                gsap.to('.modal', {
                  x: '0%',
                  opacity: 1,
                  ease: 'power1.out',
                });
              }}
            >
              <img src={X} alt="close icon" />
            </button>
          </div>
          <ul>
            <>
              {typeof newVar === 'string' ? (
                <li className="box-sm">{newVar}</li>
              ) : (
                newVar.map((item, index) => {
                  return (
                    <li className="box-sm" key={index}>
                      {item}
                    </li>
                  );
                })
              )}
            </>

            <li className="box-sm">{quantity}</li>
          </ul>
          <div className="lower">
            <Amount amount={variant.price} />
            <Amount amount={+variant.price * quantity} />
          </div>
        </div>
      </div>
    );
  };
  return (
    <Layout page="cart">
      <section className="cart">
        <h1 className="title">cart</h1>
        <div className="cart-list">
          {currentCheckout ? (
            currentCheckout.lineItems.length > 0 ? (
              currentCheckout.lineItems
                // .reverse()
                .map((item: prop, index: number) => {
                  return (
                    <CartCard
                      key={index}
                      id={item.id}
                      quantity={item.quantity}
                      variant={item.variant}
                      title={item.title}
                    />
                  );
                })
            ) : (
              <div className="empty">your cart is empty</div>
            )
          ) : (
            <></>
          )}
        </div>
        {currentCheckout ? (
          currentCheckout.lineItems.length > 0 && (
            <div className="checkout">
              <Amount amount={currentCheckout.totalPriceV2.amount}></Amount>
              <button>checkout</button>
            </div>
          )
        ) : (
          <></>
        )}
        <div className="modal">
          <div className="innerM">
            <p>Delete selected?</p>
            <p> {`> ${currentI?.title}`}</p>
            <div className="btns">
              <button
                onClick={() => {
                  gsap
                    .timeline()
                    .to('.modal', {
                      x: '300%',
                      opacity: 0,
                      ease: 'power1.out',
                    })
                    .set('.modal', {
                      x: '-300%',
                    });
                }}
              >
                cancel
              </button>
              <button
                onClick={() => {
                  deleteFromCart([currentI?.id]);
                  gsap
                    .timeline()
                    .to('.modal', {
                      x: '300%',
                      opacity: 0,
                      ease: 'power1.out',
                    })
                    .set('.modal', {
                      x: '-300%',
                    });
                }}
              >
                delete
              </button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Cart;
