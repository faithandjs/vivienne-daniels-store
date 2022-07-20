import '../styles/layout.scss';
import { Link } from 'gatsby';
import { useEffect } from 'react';
import gsap from 'gsap';
import useStoreContext from '@/context/context';
import about from '../icons/about.png';
import home from '../icons/home.png';
import store from '../icons/store.png';
import wishlist from '../icons/wishlist.png';
import cart from '../icons/shopping-cart.png';
import IG from '../icons/instagram.png';
import Twitter from '../icons/twitter.png';
import Mail from '../icons/mail.png';

import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { statuses } from 'type';
interface prop {
  children: JSX.Element;
  page: 'home' | 'about' | 'products' | 'wishlist' | 'cart' | 'none';
}
const Layout = ({ children, page }: prop) => {
  gsap.registerPlugin(ScrollTrigger);
  const { currentCheckout, settingStatus, status } = useStoreContext();
 
  useEffect(() => {
    ScrollTrigger.create({
      trigger: 'header',
      start: '180px top',
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
      },
    });
    if (page === 'home') {
      let logos = document.querySelectorAll('.large-logos li');
      let logoBox = document.querySelectorAll('.large-logos');
      const reveal = gsap.timeline({
        paused: true,
        repeat: -1,
      });

      logos.forEach((logo, i) => {
        reveal.to(logoBox, {
          y: i * -174,
          ease: 'slow(0.7, 0.7, false)',
          duration: 2,
        });
      });
      reveal.play();
    }
  });
  useEffect(() => {
    const msg_status = document.querySelector('.msg');
    const msg_status_div = document.querySelector('.msg div');
    if (status === statuses.NEUTRAL) {
      msg_status_div?.removeAttribute('class');
    }
    if (status === statuses.LOADING) {
      gsap.to(msg_status, {
        y: 0,
        ease: 'none',
      });
      msg_status_div?.setAttribute('class', 'loading');
    }
    if (status === statuses.ITEM_ADDED || status === statuses.ITEM_DELETED) {
      msg_status_div?.setAttribute('class', 'success');
    }
    if (
      status === statuses.ITEM_NOT_ADDED ||
      status === statuses.ITEM_NOT_DELETED
    ) {
      msg_status_div?.setAttribute('class', 'error');
    }

    if (
      status === statuses.ITEM_NOT_ADDED ||
      status === statuses.ITEM_NOT_DELETED ||
      status === statuses.ITEM_ADDED ||
      status === statuses.ITEM_DELETED
    ) {
      setTimeout(() => {
        gsap.to(msg_status, {
          y: '-100vh',
          ease: 'none',
          duration: 0.2,
        });
        settingStatus();
      }, 3000);
    }
  }, [status]);
  const classes = `children ` + (page === 'about' ? '' : page);

  return (
    <>
      <header className={page}>
        <div className="logo">
          vd
          {/* <Link to="/about"></Link> */}
        </div>
        <ul className="links">
          <Link to="/">
            <li id="home">
              <span>home</span>
              <img src={home} alt="home icon" />
            </li>
          </Link>
          <Link to="/about">
            <li id="about">
              <span>about</span>
              <img src={about} alt="about icon" />
            </li>
          </Link>
          <Link to="/products">
            <li id="products">
              <span>products</span>
              <img src={store} alt="products icon" />
            </li>
          </Link>
          <Link to="/wishlist">
            <li id="wishlist">
              <span>wishlist</span>
              <img src={wishlist} alt="wishlist icon" />
            </li>
          </Link>
          <Link to="/cart">
            <li id="cart">
              <span>cart</span>
              <img src={cart} alt="cart icon" />
              <span className="number">
                {currentCheckout ? currentCheckout.lineItems.length : `0`}
              </span>
            </li>
          </Link>
        </ul>
      </header>
      <section className={classes}>
        <div className="msg">
          <div>{status}</div>
        </div>
        {children}
      </section>

      <footer className={page}>
        <div className=" large">
          {page === 'home' ? <div className="logo">vd</div> : <></>}{' '}
          <p>
            &copy; 2022
            <a target="_blank" href="https://faithh.netlify.app/">
              {' '}
              faith okogbo
            </a>
          </p>
        </div>
        {page === 'home' ? (
          <div className="large-logos-box">
            <ul className=" large-logos">
              <li className="versace">
                <a
                  href="https://www.versace.com/international/en/home/"
                  target="_blank"
                  title="Versace  - Go to the Homepage"
                  aria-label="Versace  - Go to the Homepage"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 284 64"
                    width="100%"
                    height="100%"
                    xmlSpace="preserve"
                    style={{
                      clipRule: 'evenodd',
                      fillRule: 'evenodd',
                      strokeLinejoin: 'round',
                      strokeMiterlimit: 2,
                    }}
                  >
                    <path
                      d="M343.98 115.21h-19.62V93.46h15.44v-5.72h-15.44V66.22h19.62v-5.77h-31.24v60.53h31.24zm-34.19-37.96c-.36-12.08-8.85-17.84-20.07-17.84-18.48 0-23.61 14.71-23.61 31.24 0 17.39 5.54 31.42 24.02 31.42 9.63 0 19.25-4.77 19.57-17.75h-9.72c-.14 6.86-3.22 13.98-9.81 13.98-10.58 0-11.67-15.48-11.67-27.11v-.77c0-8.95.23-27.29 10.94-27.29 7.22 0 8.99 8.45 9.26 14.12zm-60.38-16.8h-9l-20.61 60.53h5.77l6.72-19.93h17.44l5.95 19.93h12.71zm-15.22 34.87 7.04-20.93h.5L248 95.32Zm-13.03 7.08c0-8.81-4.54-14.76-14.39-17.39l-4.95-1.32c-5.81-1.54-10.44-3.86-10.44-10.44 0-5.86 3.72-8.76 8.22-8.76s9.63 2.91 12.67 8.63l6.36-6.45a22.732 22.732 0 0 0-16.57-7.17c-10.08 0-19.52 6.81-19.52 19.48 0 11.26 7.9 15.17 15.62 17.25l3.54.95c6.72 1.82 9.72 6.31 9.72 10.76 0 6.36-4.4 9.72-9.4 9.72-6.45 0-11.44-5.22-14.21-10.58-6.58 6.31-6.67 6.45-6.67 6.45 5.09 6.72 13.53 8.54 19.8 8.54 12.94 0 20.25-8.76 20.25-19.66m-53.12-9.76c7.08-2.45 10.81-8.72 10.81-15.21 0-8.45-5.95-16.98-18.98-16.98h-19.84v60.53h11.62V95.34h4.99l12.08 25.65h12.8l-13.49-28.33Zm-1.09-14.71c0 7.63-2.82 13.12-10.17 13.12h-5.13v-26.2h5.13c7.36 0 10.17 5.45 10.17 13.08m-29.65 37.28h-19.62V93.47h15.44v-5.72h-15.44V66.23h19.62v-5.77h-31.24v60.53h31.24zM98.55 60.46l-12.67 46.68h-.5L73.3 60.46H60.54l17.12 60.53h9.31l17.3-60.53z"
                      style={{ fillRule: 'nonzero' }}
                      transform="matrix(1.00198 0 0 1.00198 -60.66 -59.527)"
                    ></path>
                  </svg>
                </a>
              </li>
              <li className="hermes">
                <a
                  itemProp="url"
                  href="https://www.hermes.com/us/en/"
                  target="_blank"
                  title="Hermès  - Go to the Homepage"
                  aria-label="Hermès  - Go to the Homepage"
                >
                  <picture>
                    <img
                      itemProp="logo"
                      alt="Homepage Hermès Paris United States"
                      src="https://www.hermes.com/sites/all/themes/custom/hermes/img/hermes-logo.svg"
                    />
                  </picture>
                </a>
              </li>
              <li className="ysl">
                <a
                  href="https://www.ysl.com/en-en"
                  target="_blank"
                  title="SAINT LAURENT  - Go to the Homepage"
                  aria-label="SAINT LAURENT  - Go to the Homepage"
                >
                  <h1>
                    <img
                      className="u-hidden@lg"
                      src="https://www.ysl.com/on/demandware.static/-/Library-Sites-Library-SLP/default/dw4961ba3f/images/logo.svg"
                      alt="SAINT LAURENT LOGO"
                    />
                  </h1>
                </a>
              </li>
              <li className="dior">
                <a
                  href="https://www.dior.com/en_int/fashion"
                  target="_blank"
                  title="Dior  - Go to the Homepage"
                  aria-label="Dior  - Go to the Homepage"
                >
                  <span className="icon css-f86pio">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 494.5 138.3"
                    >
                      <path d="M1.5 2.7h64.2c55.2 0 76.8 32.4 76.8 66.7 0 34.9-27.7 66-80.4 66H1.6c-1.1 0-1.5-.7-1.5-1.3 0-.7.7-1.3 1.7-1.3h11.3c3.5 0 5.8-2.1 5.8-6V11.5c0-2.9-1.4-6.1-6-6.1H1.4C.5 5.4 0 4.8 0 4.1c0-.6.2-1.4 1.5-1.4m40.1 126.5c0 2.9 1.3 3.8 3.2 3.8h17c41.9 0 57.1-32.1 57.1-64.3S102.8 5.3 67.4 5.3H44.3c-2.4 0-2.6 2-2.6 2.9l-.1 121zM148.9 2.7c-1 0-1.9.4-1.9 1.2 0 .8.5 1.3 1.4 1.3h11.3c2.6 0 5.1 1.8 5.1 6.8v114.9c0 2.4-1.8 6-5 6h-11.2c-1.3 0-1.4 1-1.4 1.4 0 .4-.1 1.1 1.4 1.1H203c.8 0 1.9-.1 1.9-.9s-.2-1.6-1.6-1.6h-10.5c-1.5 0-5.6-.9-5.6-5.5V10.8c0-3.3 2.1-5.5 5.9-5.5h10.3c.9 0 1.4-.5 1.4-1.2s-.5-1.3-1.7-1.3h-54.2zm85 66.4c0-36.7 16.4-66.4 47.2-66.4 30.2 0 47.2 29.7 47.2 66.4s-15.5 66.4-47.2 66.4c-30.7.1-47.2-29.7-47.2-66.4m47.2 69.2c43.8 0 71.4-31 71.4-69.1S325.2 0 281.1 0c-44 0-71.4 31-71.4 69.1s28.5 69.2 71.4 69.2m211.4-3.7c-17.2 1.8-26.7-26.4-35.4-39.8-6.5-9.9-20.3-20-33.9-22 22.4-1.3 47.5-8.5 47.5-33.9 0-20.6-12.7-36.2-59.3-36.2h-53.7c-.7 0-1.4.4-1.4 1.2 0 .8.7 1.3 1.4 1.3H370c2.6 0 5.1 1.8 5.1 6.8v114.9c0 2.4-1.8 6-5 6H358c-1 0-1.4.8-1.4 1.2s.4 1.3 1.4 1.3h57c.8 0 1.5-.4 1.5-1.2 0-.8-.5-1.3-1.6-1.3h-11.5c-1.5 0-5.6-1-5.6-5.5V73.1h5.9c28.2 0 30.3 30.6 44.3 48.1 12 15 27.7 16.9 36.6 16.9 3.8 0 6.4-.1 8.8-.7 1.5-.5 1.8-3.1-.9-2.8m-89-129.4h8.3c14.2 0 37.2 5.6 37.2 32.4 0 24.6-20.4 32.9-39.3 32.9h-12.1V10.8c0-3.4 2.1-5.6 5.9-5.6"></path>
                    </svg>
                  </span>
                </a>
              </li>
              <li className="lv">
                <a
                  target="_blank"
                  href="https://eu.louisvuitton.com/eng-e1/homepage"
                  title="LOUIS VUITTON  - Go to the Homepage"
                  aria-label="LOUIS VUITTON  - Go to the Homepage"
                >
                  <svg
                    width="151"
                    height="16"
                    viewBox="0 0 151 16"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M67.637.293l3.816 9.205L75.269.293h2.725L71.746 15.39l-.293.294-.294-.294L64.911.293h2.726zm-13.712 0c1.468 0 2.86.767 3.627 1.887l-1.467 1.468h-.462c-.304-.65-.973-1.048-1.698-1.048-.863 0-1.672.71-1.72 1.614-.035.68.277 1.105.84 1.468.606.391.854.554 1.677 1.006.897.493 3.166 1.46 3.166 4.005 0 2.509-2.097 4.843-4.802 4.843-.347 0-.976-.039-1.446-.147-1.325-.321-2.129-.822-2.998-1.845l1.887-1.929.65.545c.293.23.937.693 1.55.776 1.246.169 2.082-.655 2.244-1.468.129-.642-.034-1.6-1.069-2.096 0 0-1.866-1.037-2.684-1.51-.833-.482-1.719-1.798-1.719-3.375 0-1.174.538-2.311 1.405-3.103.67-.614 1.589-1.09 3.019-1.09zM138.67 0l9.77 9.77V.587l.294-.294h1.929l.294.294v14.802h-.462l-9.602-9.602v9.309l-.294.293h-1.929l-.293-.293V.293L138.67 0zm-28.807.293v2.223l-.294.293h-2.222v12.58h-2.516V2.809h-2.516V.587l.294-.294h7.254zm9.225 0v2.223l-.294.293h-2.222v12.58h-2.516V2.809h-2.516V.587l.294-.294h7.254zM2.516.293v12.58h5.032v2.516H0V.587L.293.293h2.223zm14.257 0a7.548 7.548 0 110 15.096 7.548 7.548 0 010-15.096zm111.54 0a7.548 7.548 0 110 15.096 7.548 7.548 0 010-15.096zm-98.415 0l.293.294v9.77a2.516 2.516 0 005.032 0V.587l.294-.294h1.929l.293.294v9.77a5.032 5.032 0 01-10.064 0V.587l.294-.294h1.929zm15.389 0v14.803l-.294.293h-2.222V.587l.293-.294h2.223zm37.446 0l.293.294v9.77a2.516 2.516 0 005.032 0V.587l.294-.294h1.928l.294.294v9.77a5.032 5.032 0 01-10.064 0V.587l.294-.294h1.929zm15.389 0v14.803l-.294.293h-2.222V.587l.293-.294h2.223zM16.772 2.81a5.032 5.032 0 10.001 10.065 5.032 5.032 0 000-10.065zm111.541 0a5.032 5.032 0 100 10.065 5.032 5.032 0 000-10.065z"
                      fillRule="evenodd"
                    ></path>
                  </svg>
                </a>
              </li>
              <li className="chanel">
                <a
                  href="https://www.chanel.com/us/"
                  target="_blank"
                  title="CHANEL  - Go to the Homepage"
                  aria-label="CHANEL  - Go to the Homepage"
                >
                  <h1>
                    <svg
                      aria-hidden="true"
                      data-test="imgLogo"
                      focusable="false"
                      height="28"
                      width="175"
                      viewBox="0 0 175 28"
                    >
                      <g fill="#000" fillRule="evenodd">
                        <path d="M20.655 17.726l4.565 2.615c-2.282 4.197-6.737 6.922-11.781 6.922C6.075 27.263 0 21.629 0 13.713S6.075.163 13.439.163c5.044 0 9.5 2.725 11.781 6.923L20.655 9.7c-1.326-2.725-4.013-4.381-7.216-4.381-4.603 0-8.1 3.423-8.1 8.394s3.497 8.395 8.1 8.395c3.203 0 5.89-1.657 7.216-4.382M49.705 26.6V15.554H36.818V26.6h-5.154V.826h5.154V10.4h12.887V.826h5.155V26.6h-5.155M79.603 15.922L74.926 5.061 70.25 15.922h9.353zM89.838 26.6h-5.634l-2.54-5.892H68.188l-2.54 5.892h-5.634L71.428.826h6.996L89.838 26.6zM113.586 26.6L99.778 6.313V26.6h-4.786V.826h6.812l11.598 17.084V.826h4.787V26.6h-4.603M128.129 26.6V.826h18.41v4.787h-13.624v5.523h11.782v4.786h-11.782v5.892h14.36V26.6h-19.146M155.56 26.6V.826h5.154v20.62h13.622V26.6H155.56"></path>
                      </g>
                    </svg>
                  </h1>
                </a>
              </li>
              <li className="balenciaga">
                <a
                  href="https://www.balenciaga.com/en-us"
                  title="Balenciaga - Go to the Homepage"
                  aria-label="Balenciaga - Go to the Homepage"
                  data-qa="Home-Show"
                  target="_blank"
                >
                  <img
                    src="https://www.balenciaga.com/on/demandware.static/-/Sites/default/dw4a689780/images/logo/BAL/logo.svg"
                    alt="Balenciaga - Go to the Homepage"
                  />
                </a>
              </li>
            </ul>
          </div>
        ) : (
          <></>
        )}

        <ul id="contact">
          <li>
            <span>instagram</span>
            <img src={IG} alt="instagram icon" />
          </li>
          <li>
            <span>twitter</span>
            <img src={Twitter} alt="twitter icon" />
          </li>
          <li>
            <span>email</span>
            <img src={Mail} alt="mail icon" />
          </li>
        </ul>
      </footer>
    </>
  );
};

export default Layout;
