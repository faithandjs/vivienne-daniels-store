import { productCardProp } from 'type';
import { Link } from 'gatsby';
import Heart from './Heart';
import Amount from './Amount';

const ProductCard = ({ product, fill }: productCardProp) => {
  const { featuredImage, handle, priceRangeV2, title, variants } = product.node;

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
          <Amount amount={priceRangeV2.maxVariantPrice.amount}></Amount>
          <Heart product={product} fill={fill} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
