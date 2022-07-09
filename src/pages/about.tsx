import Layout from '@/components/Layout';
import '../styles/about.scss';
import gsap from 'gsap';
import { useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const About = () => {
  gsap.registerPlugin(ScrollTrigger);
   useEffect(() => {
    let founder = gsap.timeline();
    if (window.matchMedia('( max-width: 924px)').matches) {
      let founder = gsap.timeline({
        scrollTrigger: { trigger: '.img-box', start: 'top 80%' },
      });
      founder.fromTo(
        '.img-box img',
        {
          opacity: 0.5,
          scale: 0.7,
          // width: '0%',
          duration: 4,
          ease: 'linear',
          delay: 1,
        },
        {
          opacity: 1,
          scale: 1,
          // width: '100%',
          duration: 1,
        },
      );
    } else {
      founder.fromTo(
        '.img-box img',
        { x: '5%', opacity: 0.7, duration: 2, delay: 1 },
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
            <img
              src="/static/images/christina-wocintechchat-com-eZ8g_7Sh0J0-unsplash.jpg"
              alt=" founder, vivienne daniels"
            />
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
