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
  const { cart, currentCheckout } = useStoreContext();

  useEffect(() => {
    ScrollTrigger.create({
      trigger: 'header',
      start: '180px top',
      // markers: true,
      endTrigger: 'footer',
      end: 'bottom bottom',
      scrub: 0.5,
      onUpdate: (self) => {
        if (self.direction === -1) {
          gsap
            .to('header.products, header.wishlist, header.cart', {
              y: 0,
              ease: 'slow(0.7, 0.7, false)',
              paused: true,
              duration: 0.2,
            })
            .progress(1);
        }
        if (self.direction === 1) {
          gsap
            .to('header.products, header.wishlist,  header.cart', {
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
    // const tooltip = document.querySelectorAll(
    //   'tooltip-icon',
    // );
    // if (tooltip) {
    //   console.log(tooltip)
    //   // tooltip.addEventListener('mouseenter', function () {
    //   //   gsap.to('.tooltip', {
    //   //     opacity: 1,
    //   //     ease: 'sine.out',
    //   //     duration: 0.7,
    //   //   });
    //   // });
    //   // tooltip.addEventListener('mouseleave', function () {
    //   //   gsap.to('.tooltip', {
    //   //     opacity: 0,
    //   //     ease: 'expo.out',
    //   //     duration: 0.7,
    //   //   });
    //   // });
    // }
  });
  const classes =
    `children ` + (page === 'home' || page === 'about' ? '' : page);

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
              <span className="number">
                {currentCheckout ? currentCheckout.lineItems.length : `0`}
              </span>
            </li>
          </Link>
        </ul>
      </header>
      <section className={classes}>{children}</section>

      <footer className={page}>
        <div className=" large">
          {page === 'home' || page === 'about' ? (
            <div className="logo">vd</div>
          ) : (
            <></>
          )}{' '}
          <p>
            &copy; 2022
            <a target="_blank" href="https://faithh.netlify.app/">
              {' '}
              faith okogbo
            </a>
          </p>
        </div>
        <ul id="contact">
          <li>
            <span>instagram</span>
            <img src="/static/icons/instagram.png" alt="instagram icon" />
          </li>
          <li>
            <span>twitter</span>
            <img src="/static/icons/twitter.png" alt="twitter icon" />
          </li>
          <li>
            <span>email</span>
            <img src="/static/icons/mail.png" alt="mail icon" />
          </li>
        </ul>
      </footer>
    </>
  );
};

export default Layout;
