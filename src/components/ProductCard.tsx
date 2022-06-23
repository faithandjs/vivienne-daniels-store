import React from 'react';
import { productCardProp } from 'type';
import { Link } from 'gatsby';
import useStore from '@/context/StoreContext';
const ProductCard = ({ product }: productCardProp) => {
  const { addVariantToCart, cart } = useStore();
  const { featuredImage, handle, priceRangeV2, title, variants } = product.node;
  // console.log(cart)
  return (
    <div className="product-card">
      <Link to={`/products/${handle}`}>
        <div className="img-box">
          <img src={featuredImage.src} alt={`image of ${title}`} />
        </div>
      </Link>
      <div className="details">
        <Link to={`/products/${handle}`}>
          <h3>{title}</h3>
        </Link>
        <div className="extra">
          <p>
            <span>eur </span>
            <span>{priceRangeV2.maxVariantPrice.amount}</span>
          </p>
          <div className="add" onClick={() => addVariantToCart(product.node, 1)}>
            <img src="https://img.icons8.com/external-tanah-basah-glyph-tanah-basah/96/undefined/external-plus-user-interface-tanah-basah-glyph-tanah-basah-2.png" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
