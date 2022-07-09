import '../styles/layout.scss';
import { Link } from 'gatsby';
import { useEffect } from 'react';
import gsap from 'gsap';
import useStoreContext from '@/context/context';

import { ScrollTrigger } from 'gsap/ScrollTrigger';
interface prop {
  children: JSX.Element;
  page: 'home' | 'about' | 'products' | 'wishlist' | 'cart' | 'none';
}
const Layout = ({ children, page }: prop) => {
  gsap.registerPlugin(ScrollTrigger);
  const { cart } = useStoreContext();

  useEffect(() => {
    //   const showMenu = gsap
    //     .from('header.products, header.wishlist', {
    //       yPercent: -100,
    //       paused: true,
    //       duration: 0.2,
    //       backgroundColor: 'red',
    //     })
    //     .progress(1);

    ScrollTrigger.create({
      trigger: 'header',
      start: 'bottom top',
      // markers: true,
      endTrigger: 'footer',
      end: 'bottom bottom',
      scrub: 0.5,
      onUpdate: (self) => {
        if (self.direction === -1) {
          gsap
            .to('header.products, header.about, header.wishlist, header.cart', {
              y: 0,
              ease: 'slow(0.7, 0.7, false)',
              paused: true,
              duration: 0.2,
            })
            .progress(1);
        }
        if (self.direction === 1) {
          gsap
            .to('header.products, header.wishlist,header.about,  header.cart', {
              y: '-200%',
              ease: 'power3.in',
              paused: true,
              duration: 0.2,
            })
            .progress(1);
        }
        //  ? showMenu.play() : showMenu.reverse();
      },
    });
  });
  return (
    <>
      <header className={page}>
        <div className="logo">
          <Link to="/about">vd</Link>
        </div>
        <ul className="links">
          <Link to="/">
            <li id="home">
              <span>home</span>
              <img src="/static/icons/home.png" alt="home icon" />
            </li>
          </Link>
          <Link to="/about">
            <li id="about">
              <span>about</span>
              <img src="/static/icons/about.png" alt="about icon" />
            </li>
          </Link>
          <Link to="/products">
            <li id="products">
              <span>products</span>

              <img src="/static/icons/store.png" alt="products icon" />
            </li>
          </Link>
          <Link to="/wishlist">
            <li id="wishlist">
              <span>wishlist</span>
              <img src="/static/icons/wishlist.png" alt="wishlist icon" />
            </li>
          </Link>
          <Link to="/cart">
            <li id="cart">
              <span>cart</span>
              <img src="/static/icons/shopping-cart.png" alt="cart icon" />
              <span className="number" >
                {cart.length}
              </span>
            </li>
          </Link>
        </ul>
      </header>
      {children}
      <footer>
        {page === 'home' || page === 'about' ? (
          <div className=" large">
            <div className="logo">
              <Link to="/about">vd</Link>
            </div>
          </div>
        ) : (
          <></>
        )}
        <ul id="contact">
          <li>faith okogbo</li>
          <li>instagram</li>
          <li>twitter</li>
          <li>email</li>
        </ul>
      </footer>
    </>
  );
};

export default Layout;
