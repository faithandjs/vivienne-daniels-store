import React from 'react';
import { productCardProp } from 'type';
import { Link } from 'gatsby';
const ProductCard = ({ product }: productCardProp) => {
  const { featuredImage, handle, priceRangeV2, title, variants } = product.node;
  return (
    <div className="product-card">
      <Link to={`/products/${handle}`}>
        <div className="img-box">
          <img src={featuredImage.src} alt={`image of ${title}`} />
        </div>
        <div className="details">
          {' '}
          <h3>{title}</h3>
          <div className="extra">
            <p>
              <span>eur </span>
              <span>{priceRangeV2.maxVariantPrice.amount}</span>
            </p>
            <div className="add">
              <img src="https://img.icons8.com/external-tanah-basah-glyph-tanah-basah/96/undefined/external-plus-user-interface-tanah-basah-glyph-tanah-basah-2.png" />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
