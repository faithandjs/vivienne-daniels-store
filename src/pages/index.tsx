import Layout from '@/components/Layout';
import { useEffect } from 'react';
import '../styles/global.scss';
import '../styles/banner.scss';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useStoreContext from '@/context/context';
import { graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

export default function Home(query: any) {
  const image = getImage(query.data.file)
  gsap.registerPlugin(ScrollTrigger);
  const { passed } = useStoreContext();
  useEffect(() => {
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
          '>-1',
        );
    }
    passed.current = true;
  });

  return (
    <Layout page="home">
      <>
        <section className="banner">
          <div className="img-box">
           { image !== undefined &&
            <GatsbyImage image={image} alt="banner: designer bag" />
            }
            {/* <img src="/images/content-pixie-ZB4eQcNqVUs-unsplash.jpg" /> */}
          </div>
          <div className="text">
            <svg>
              <text x="0" y="100"></text>
            </svg>
          </div>
        </section>
      </>
    </Layout>
  );
}
export const pageQuery = graphql`
  query Banner {
    file(relativePath: { eq: "lv-bags1.webp" }) {
      childImageSharp {
        gatsbyImageData(layout: CONSTRAINED, placeholder: DOMINANT_COLOR)
      }
    }
  }
`;
