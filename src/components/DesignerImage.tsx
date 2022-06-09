
const DesignerImage = ({
  src,
  button = src,
  title = src.charAt(0).toUpperCase() + src.substring(1),
}: {
  src: string;
  button?: string;
  title?: string;
}) => {
  return (
    <div className="img-box">
      <img src={`/static/images/cover-image-unsplash-${src}.jpg`} alt={title} />
      <div className="overlay">
        <button>{button}</button>
      </div>
    </div>
  );
};

export default DesignerImage;
