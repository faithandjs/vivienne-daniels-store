import '../styles/layout.scss';
import { Link } from 'gatsby';
interface prop {
  children: JSX.Element;
  page: 'home' | 'about' | 'products' | 'wishlist' | 'cart' | 'none';
}
const Layout = ({ children, page }: prop) => {

  return (
    <>
      <header className={page}>
        <div className="logo">
          <Link to="/about">vd</Link>
        </div>
        <div className="links">
          <Link to="/">
            <span id="home">home</span>
          </Link>
          <Link to="/about">
            <span id="about">about VD</span>
          </Link>
          <Link to="/products">
            <span id="products">products</span>
          </Link>
          <Link to="/wishlist">
            <span id="wishlist">wishlist</span>
          </Link>
          <Link to="/cart">
            <span id="cart">cart</span>
          </Link>
        </div>
      </header>
      {children}
      <footer id="contact">
        <span>faith okogbo</span>
        <span>instagram</span>
        <span>twitter</span>
        <span>email</span>
      </footer>
    </>
  );
};

export default Layout;
