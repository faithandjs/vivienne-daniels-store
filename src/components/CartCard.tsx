import React from 'react';
import useStoreContext from '@/context/context';
import Amount from './Amount';
import {
  productProp,
  cartProp,
  productDetails,
  selectedOptionsProp,
} from 'type';
import { Link } from 'gatsby';
interface prop {
  currentItem: productDetails;
  variant: string;
  quantity: number;
}
const CartCard = ({ currentItem, quantity, variant }: prop) => {
  const { deleteFromCart } = useStoreContext();
  const { featuredImage, handle, priceRangeV2, title, variants } = currentItem;
  // console?
  return (
    <div className="box">
      <Link to={`/products/${handle}`}>
        <div className="img-box">
          <img src={featuredImage.src} alt={title} />
        </div>
      </Link>
      <div className="details">
        <div className="upper">
          <h4>{title}</h4>
          <button
            onClick={() => {
              deleteFromCart(currentItem);
            }}
          >
            <img src="/static/icons/close.png" alt="close icon" />
          </button>
        </div>
        <ul>
          {variants.map((item) => {
            const { selectedOptions, storefrontId } = item;
            let holder: any = []; //selectedOptionsProp[]
            storefrontId === variant ? (holder = selectedOptions) : null;
            console.log(holder);
            return (
              <>
                {holder.map((item: selectedOptionsProp, index: number) => {
                  return (
                    <li key={index} className="box-sm">
                      {item.value}
                      {/* <span>{item.name}: </span> */}
                      {/* <span></span> */}
                    </li>
                  );
                })}
              </>
            );
          })}
          <li className="box-sm">{quantity}</li>
        </ul>
        <div className="lower">
          <Amount amount={priceRangeV2.maxVariantPrice.amount}></Amount>
          {/* <div className="quantity">{quantity}</div> */}
        </div>
      </div>
    </div>
  );
};

export default CartCard;
