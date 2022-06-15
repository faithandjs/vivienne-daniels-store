import { Link } from 'gatsby';
const DesignerImage = ({
  src0 = 'cover-image-unsplash-',
  ex = 'jpg',
  src,
  button = src,
  title = src, 
  page// src.charAt(0).toUpperCase() + src.substring(1),
}: {
  src0?: string;
  ex?: string;
  src: string;
  button?: string;
  title?: string;
  page?: string;
}) => {
  return (
    <div className="img-box">
      <Link to={`/shop/${page}`}>
        <img src={`/static/images/${src0 + src + '.' + ex}`} alt={title} />
        <div className="overlay">
          <button>{button}</button>
        </div>{' '}
      </Link>
    </div>
  );
};

export default DesignerImage;
