import { productCardProp } from 'type';
import Heart from './Heart';
import { Link } from 'gatsby';
import Amount from './Amount';

export const WishlistCard = ({ product }: productCardProp) => {
  const { featuredImage, priceRangeV2, title, handle } = product.node;

  return (
    <>
      <Link to={`/products/${handle}`}>
        <div className="img-box">
          <img src={featuredImage.src} alt={title} />
        </div>
        <div className="details">
          <h4>{title}</h4>
          <div className="flex">
            <Amount amount={priceRangeV2.maxVariantPrice.amount}></Amount>
            <div className="hearts">
              <p>{`${title.length}k`}</p>

              <div className="addToWL">
                <svg viewBox="0 0 40 40">
                  <path
                    fill="#ff0000"
                    stroke="#ff0000"
                    strokeWidth="1"
                    d="M29.144 20.773c-.063-.13-4.227-8.67-11.44-2.59C7.63 28.795 28.94 43.256 29.143 43.394c.204-.138 21.513-14.6 11.44-25.213-7.214-6.08-11.377 2.46-11.44 2.59z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};
