import DesignerImage from '@/components/DesignerImage';
import Layout from '@/components/Layout';
import { graphql, Link } from 'gatsby';
import { useEffect, useRef, useState } from 'react';
import '../styles/global.scss';
import '../styles/index/iotd.scss';
import '../styles/index/new-arrivals.scss';
import '../styles/index/shop.scss';
import '../styles/index/banner.scss';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useStoreContext from '@/context/context';

export default function Home({ data }: any) {
  gsap.registerPlugin(ScrollTrigger);
  const { passed } = useStoreContext();
  const { media, priceRangeV2, title } = data.shopifyProduct;
  const products = data.allShopifyProduct.edges;
  const allTags = useRef<string[]>([]);
  const rollingArr = [
    'louis vuitton',
    'yves saint laurent',
    'prada',
    'chanel',
    'dior',
    'shoes',
    'bags',
  ];

  const returnRollingArr = () => {
    products.map((item: any) => {
      item.node.tags.map((tag: string) => {
        if (!allTags.current.find((item) => item === tag)) {
          allTags.current.push(tag);
        }
      });
    });
    return (
      <div>
        {rollingArr.map((item, index: number) => (
          <span key={index}>{item} </span>
        ))}
      </div>
    );
  };
  useEffect(() => {
    //onload, banner animationa
    document.querySelector('.banner text')
      ? (document.querySelector('.banner text')!.textContent =
          'we love designers!')
      : null;
    if (!passed.current) {
      const banner = gsap.timeline();
      banner
        .fromTo(
          '.banner .text',
          { display: 'none', backgroundColor: 'rgba(0, 0, 0, 1)' },
          {
            display: 'block',
            backgroundColor: 'rgba(0, 0, 0, 0.212)',
            duration: 0.5,
          },
        )
        .fromTo('.banner img', { opacity: 0 }, { opacity: 1, duration: 1 }, '<')
        .fromTo(
          '.banner text',
          {
            strokeDasharray: 900,
            strokeDashoffset: 900,
            fill: 'transparent',
            opacity: 0.7,
          },
          {
            strokeDashoffset: 0,
            duration: 2.5,
            opacity: 1,
            // ease: 'slow(0.7, 0.7, false)',
            fill: 'rgba(255, 255, 255, 0.267)',
          },
        )
        .fromTo(
          'header.home .logo ',
          { opacity: 0, scale: 0.7 },
          { opacity: 1, duration: 1, scale: 1 },
          '-=2',
        )
        .fromTo(
          'header.home .links li ',
          {
            opacity: 0,
            y: -100,
          },
          {
            opacity: 1,
            y: 0,
            stagger: {
              from: 'end',
              ease: 'power3.inOut',
              amount: 1,
            },
          },
          '>-0.5',
        )
        .to('header.home', {
          backgroundColor: 'rgba(0, 0, 0, 0.11)',
        });
    } else {
      console.log('else');
      // gsap.fromTo(
      //   'header.home',
      //   {
      //     backgroundColor: 'rgba(0, 0, 0, 0.11)',
      //   },
      //   {
      //     scrollTrigger: {
      //       trigger: '.banner .img-box',
      //       start: 'bottom top',
      //       endTrigger: 'footer',
      //       end: 'bottom bottom',
      //       markers: true,
      //       toggleActions: 'play play reverse play',
      //     },
      //     backgroundColor: '#000',
      //   },
      // );
    }
    passed.current = true;
  });
  useEffect(() => {
    gsap.set;
    const showMenu = gsap
      // .timeline()
      // .to('header.home', {
      //   backgroundColor: 'rgba(0, 0, 0, 1)',
      // })
      .from('header.home', {
        yPercent: -100,
        paused: true,
        duration: 0.3,
        // backgroundColor: 'rgba(0, 0, 0, 0.11)',
      })
      .progress(1);
    // const changeColor = gsap.fromTo(
    //   'header.home',
    //   {
    //     backgroundColor: 'rgba(0, 0, 0, .11)',
    //   },
    //   {
    //     backgroundColor: 'rgba(0, 0, 0, .8)',duration: .4
    //   },
    // );
    ScrollTrigger.create({
      trigger: '.banner .img-box',
      start: 'bottom top',
      endTrigger: 'footer',
      end: 'bottom bottom',
      onUpdate: (self) => {
        console.log(self);
        if (self.direction === -1) {
          showMenu.play();
          // changeColor.play();
          gsap.to(
            'header.home',
            // {
            //   backgroundColor: 'rgba(0, 0, 0, .11)',
            // },
            {
              backgroundColor: 'rgba(0, 0, 0, .8)',
              duration: 0.4,
            },
          );
        } else {
          showMenu.reverse();
          // changeColor.reverse();
          gsap
            .from(
              'header.home',
              {
                backgroundColor: 'rgba(0, 0, 0, .11)',
              },
              // {
              //   backgroundColor: 'rgba(0, 0, 0, .8)',
              //   duration: 0.4,
              // },
            )
            .reverse();
        }
      },
    });
  });
  useEffect(() => {
    // window.scrollY
  });
  useEffect(() => {
    const box = document.querySelector('.images-box')!;
    const list = document.querySelector('ul.one')!;
    const list1 = document.querySelector('ul.two')!;
    const item = document.querySelectorAll('ul.images li');
    let listWidth = 12;
    console.log('listWidth', listWidth);
    item.forEach((li) => {
      console.log('listWidth', listWidth, 'li.clientWidth', li.clientWidth);
      listWidth = listWidth + li.clientWidth + 5;
      console.log('listWidth', listWidth, 'li.clientWidth', li.clientWidth);
    });
    console.log(listWidth);

    const roll = gsap.timeline({
      force3D: true,
      repeat: -1,
      paused: false,
    });
    roll
      .fromTo(
        list,
        { x: 0 },
        { x: -listWidth, ease: 'power0', duration: 10 },
        '>',
      )
      .fromTo(
        list1,
        { x: listWidth },
        { x: -(listWidth * 2), ease: 'power0', duration: 10 },
        '>',
      );

    // roll.set(list, { x: listWidth });
    // roll.to(list1, { x: -listWidth, ease: 'power0' });
    // roll.to(list, { x: 0, ease: 'power0' });
    // roll.fromTo(list, { x: 0 }, { x: -listWidth, ease: 'power0' }, 0);

    // infinite.fromTo($clonedList, time, {x:listWidth}, {x:0, ease: Linear.easeNone}, 0);
    // infinite.set($list, {x: listWidth});
    // infinite.to($clonedList, time, {x: -listWidth, ease: Linear.easeNone}, time);
    // infinite.to($list, time, {x: 0, ease: Linear.easeNone}, time);

    // //Pause/Play

    box.addEventListener('mouseenter', function () {
      roll.pause();
    });
    box.addEventListener('mouseleave', function () {
      roll.play();
    });
  });

  // .addLabel('start')
  // .from('.box p', { scale: 0.3, rotation: 45, autoAlpha: 0 })
  // .addLabel('color')
  // .from('.box', { backgroundColor: '#28a92b' })
  // .addLabel('spin')
  // .to('.box', { rotation: 360 })
  // .addLabel('end');
  return (
    <Layout page="home">
      <>
        <section className="banner">
          <div className="img-box">
            <img
              src="/static/images/cover-image-unsplash-banner.jpg"
              alt="banner: prada bag"
            />
          </div>
          <div className="text">
            {/* <p></p> */}
            <svg>
              <text x="0" y="100"></text>
            </svg>
          </div>
        </section>
        <section className="iotd">
          <div className="title">Item of the day</div>
          <div className="images-box">
            <ul className="images one">
              {media.map((item: any, index: number) => (
                <li className="img-box" key={index}>
                  <img src={item.preview.image.src} />
                </li>
              ))}
            </ul>
            <ul className="images two">
              {media.map((item: any, index: number) => (
                <li className="img-box" key={index}>
                  <img src={item.preview.image.src} />
                </li>
              ))}
            </ul>
            {/* {media.map((item: any, index: number) => (
              <li className="img-box" key={index}>
                <img src={item.preview.image.src} />
              </li>
            ))} */}
          </div>

          <div className="details">
            <p>{title.toLowerCase()}</p>
            <p>
              <span>Best selling item - </span>
              <span>Eur </span>
              <span>{priceRangeV2.maxVariantPrice.amount}</span>
            </p>
          </div>
        </section>
        <section className="shop">
          <div className="title">our shop</div>
          <div className="designers">
            <div className="shoes-bags">
              <DesignerImage
                src0="lv-"
                src="bags"
                ex="webp"
                button="bags"
                page="product"
              />
              <DesignerImage
                src0="twt-ysl-"
                src="shoes"
                button="shoes"
                page="product"
              />
            </div>
            <div className="tags">
              <div className="box">
                {returnRollingArr()}
                {returnRollingArr()}
                {returnRollingArr()}
                {returnRollingArr()}
                {returnRollingArr()}
                {returnRollingArr()}
                {returnRollingArr()}
                {returnRollingArr()}
                {returnRollingArr()}
                {returnRollingArr()}
                {returnRollingArr()}
                {returnRollingArr()}
                {returnRollingArr()}
                {returnRollingArr()}
                {returnRollingArr()}
                {returnRollingArr()}
                {returnRollingArr()}
                {returnRollingArr()}
                {returnRollingArr()}
                {returnRollingArr()}
                {returnRollingArr()}
                {returnRollingArr()}
                {returnRollingArr()}
                {returnRollingArr()}
              </div>
            </div>
            <div className="grid">
              <div className="up">
                <DesignerImage
                  src="lv"
                  title="Louis Vuitton"
                  button="Louis Vuitton"
                />
                <div className="all">
                  <Link to="/products">
                    <span>all products</span>
                  </Link>
                </div>
                <DesignerImage src="ysl" title="Yves Saint Laurent" />
              </div>
              <div className="down">
                <DesignerImage src="chanel" />
                <DesignerImage
                  src="dior"
                  title="Christian Dior"
                  page="christian-dior"
                />
                <DesignerImage src="prada" />
              </div>
            </div>
          </div>
        </section>
      </>
    </Layout>
  );
}
export const query = graphql`
  {
    allShopifyProduct {
      edges {
        node {
          featuredImage {
            src
          }
          title
          tags
          priceRangeV2 {
            maxVariantPrice {
              amount
            }
          }
        }
      }
    }
    shopifyProduct(title: { eq: "VERSACE MEDUSA AEVITAS PLATFORM PUMPS" }) {
      media {
        preview {
          image {
            src
          }
        }
      }
      title
      priceRangeV2 {
        maxVariantPrice {
          amount
        }
      }
    }
  }
`;
