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
  const image = getImage(query.data.file);
  gsap.registerPlugin(ScrollTrigger);
  const { passed } = useStoreContext();
  useEffect(() => {
    document.querySelector('.banner text')
      ? (document.querySelector('.banner text')!.textContent =
          'we love designers!')
      : null;
    document.querySelector('.WLD .upper')
      ? (document.querySelector('.WLD .upper')!.textContent = 'we love ')
      : null;
    document.querySelector('.WLD .lower')
      ? (document.querySelector('.WLD .lower')!.textContent = 'designers!')
      : null;

    const banner = gsap.timeline({ delay: 0.7 });
    const banner1 = gsap.timeline();
    if (!passed.current) {
      banner.fromTo(
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
      );
      banner1
        .from(
          '.WLD .upper ',
          { duration: 0.75, yPercent: 100 },
          '<1',
        )
        .from(
          '.WLD .lower',
          { duration: 0.75, yPercent: -100},
          '<0',
        )
        .to(' .WLD .upper, .WLD .lower', {
          duration: 1,
          ease: 'none',
          yPercent: 0,
        });
    }
    passed.current = true;
  });

  return (
    <Layout page="home">
      <>
        <section className="banner">
          <div className="img-box">
            {image !== undefined && (
              <GatsbyImage image={image} alt="banner: designer bag" />
            )}
          </div>
          <div className="text">
            <svg>
              <text x="0" y="100"></text>
            </svg>
            <div className="WLD">
              <div className="upper-box">
                <div className="upper"></div>
              </div>
              <div className="lower-box">
                <div className="lower"></div>
              </div>
            </div>
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
