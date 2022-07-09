import Layout from '@/components/Layout';
import '../styles/cart.scss';
import Amount from '@/components/Amount';
import gsap from 'gsap';
import useStoreContext from '@/context/context';
import {
  productProp,
  cartProp,
  productDetails,
  selectedOptionsProp,
} from 'type';
import { Link } from 'gatsby';
import { useState } from 'react';
interface prop {
  currentItem: productDetails;
  variant: string;
  quantity: number;
}

const Cart = () => {
  const { cart, deleteFromCart } = useStoreContext();
  const [currentI, setCurrentI] = useState<productDetails>();
  console.log('cart');
  cart.map((item: any) => {
    console.log(item.product.node.handle);
  });
  const calculateTotal = () => {
    let total: number = 0;
    cart.map((item: cartProp) => {
      const amnt = item.product.node.priceRangeV2.maxVariantPrice.amount;
      total = total + amnt;
    });
    return total;
  };
  const CartCard = ({ currentItem, quantity, variant }: prop) => {
    const { deleteFromCart } = useStoreContext();
    const { featuredImage, handle, priceRangeV2, title, variants } =
      currentItem;

    return (
      <div className="box">
        <Link to={`/products/${handle}`}>
          <div className="img-box">
            <img src={featuredImage.src} alt={title} />
          </div>
        </Link>
        <div className="details">
          <div className="upper">
            <h3>{title}</h3>
            <button type='button'
              onClick={(e) => {
                e.preventDefault();
                setCurrentI(currentItem);
                console.log('clicked the x button');
                gsap.to('.modal', {
                  x: '0%',
                  opacity: 1,
                  ease: 'power1.out',
                });
              }}
            >
              <img src="/static/icons/close.png" alt="close icon" />
            </button>
          </div>
          <ul>
            {variants.map((item, index) => {
              const { selectedOptions, storefrontId } = item;
              let holder: any = [];
              storefrontId === variant ? (holder = selectedOptions) : null;

              return (
                <div key={index} style={{display: 'flex'}}>
                  {holder.map((item: selectedOptionsProp, index: number) => {
                    return (
                      <li key={index} className="box-sm">
                        {item.value}
                      </li>
                    );
                  })}
                </div>
              );
            })}
            <li className="box-sm">{quantity}</li>
          </ul>
          <div className="lower">
            <Amount amount={priceRangeV2.maxVariantPrice.amount}></Amount>
          </div>
        </div>
      </div>
    );
  };
  const reverse = cart.reverse();
  // console.log(cart)
  return (
    <Layout page="cart">
      <main className="cart">
        <h1 className="title">cart</h1>
        <div className="cart-list">
          {cart.map((item: cartProp, index: any) => {
            const current = item.product.node;
            console.log(index,  item.product.node.handle);
            return (
              <CartCard
                key={index}
                currentItem={current}
                variant={item.variant}
                quantity={item.quantity}
              />
            );
          })}
        </div>
        <div className="checkout">
          <Amount amount={calculateTotal()}></Amount>
          <button>checkout</button>
        </div>
        <div className="modal">
          <div className="innerM">
            <p>Delete selected?</p>
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
      </main>
    </Layout>
  );
};

export default Cart;
