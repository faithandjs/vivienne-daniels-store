import Layout from '@/components/Layout';
import '../styles/about.scss';
import gsap from 'gsap';
import { useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

const About = (query: any) => {
  const image = getImage(query.data.file);
  gsap.registerPlugin(ScrollTrigger);
  useEffect(() => {
    let founder = gsap.timeline();
    if (window.matchMedia('( max-width: 924px)').matches) {
      let founder = gsap.timeline({
        scrollTrigger: { trigger: '.img-box', start: 'top 90%' },
      });
      founder.fromTo(
        '.img-box img',
        {
          opacity: 0.5,
          scale: 0.7,
          duration: 1,
          ease: 'linear',
        },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
        },
      );
    } else {
      founder.fromTo(
        '.img-box img',
        { x: '5%', opacity: 0.7, duration: 2 },
        {
          opacity: 1,
          x: 0,
          duration: 2,
          scale: 1,
        },
      );
    }
    founder.fromTo(
      '.img-box p',
      {
        opacity: 0,
      },
      { opacity: 1 },
    );
  });
  return (
    <Layout page="about">
      <>
        <div className="title about-title">vivienne daniels</div>
        <section className="about-1 about">
          <div className="text">
            <div>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque
                quam officia excepturi architecto doloribus omnis dolorem culpa
                voluptate eligendi, provident amet alias nihil quos vel in
                suscipit voluptas, dicta inventore corrupti. Autem quibusdam
                exercitationem aliquam possimus. Fugiat odit officiis quis magni
                blanditiis nihil id dolores repudiandae. Excepturi ab non quis!
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
              <p>
                Consequuntur odio fugit quos magni commodi sequi ex accusamus
                adipisci minus, assumenda eos quis quo vitae laboriosam cumque
                excepturi magnam itaque, deserunt minima praesentium odit rem,
                et repudiandae!
              </p>
            </div>
          </div>
          <div className="img-box">
            {image !== undefined && (
              <GatsbyImage image={image} alt="banner: designer bag" />
            )}
            <p>founder, vivienne daniels</p>
          </div>
        </section>
        <section className="about quote">
          <q>
            Beatae provident eaque doloribus id possimus. Beatae odit quas ea
            tempore nemo asperiores illo esse nulla
          </q>
        </section>
        <section className="about-2 about">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa,
            beatae! Culpa blanditiis placeat enim quaerat tempore dolorem magni
            vel ab, fugiat eum dolor, beatae quia nam expedita sit ut accusamus?
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. At libero
            consequuntur ipsam sunt facere nulla consectetur, numquam molestiae
            quibusdam fugiat corporis incidunt, nihil possimus tempore corrupti!
            Repellat, dolores sit architecto commodi repellendus voluptas
            facilis modi doloremque quia qui autem consectetur temporibus
            voluptatem animi, cumque blanditiis corrupti omnis accusantium dolor
            ea eos reprehenderit, fugiat nam? Praesentium, natus debitis. Eum,
            culpa officiis.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa,
            beatae! Culpa blanditiis placeat enim quaerat tempore dolorem magni
            vel ab, fugiat eum dolor, beatae quia nam expedita sit ut accusamus?
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. At libero
            consequuntur ipsam sunt facere nulla consectetur, numquam molestiae
            quibusdam fugiat corporis incidunt, nihil possimus tempore corrupti!
            Repellat, dolores sit architecto commodi repellendus voluptas
            facilis modi doloremque quia qui autem consectetur temporibus
            voluptatem animi, cumque blanditiis corrupti omnis accusantium dolor
            ea eos reprehenderit, fugiat nam? Praesentium, natus debitis. Eum,
            culpa officiis.
          </p>
        </section>
      </>
    </Layout>
  );
};

export default About;
export const pageQuery = graphql`
  query founder {
    file(
      relativePath: {
        eq: "christina-wocintechchat-com-eZ8g_7Sh0J0-unsplash.jpg"
      }
    ) {
      childImageSharp {
        gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
      }
    }
  }
`;

