'use client'; 

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Image from 'next/image';
import Link from 'next/link';

const highlightGames = [
  {
    slug: 'hollowknight',
    imgSrc: '/assets/hollowknight.png',
    alt: 'Hollow Knight',
    title: 'Hollow Knight',
  },
  {
    slug: 'celeste',
    imgSrc: '/assets/celeste_banner.jpg',
    alt: 'Celeste',
    title: 'Celeste',
  },
  {
    slug: 'undertale',
    imgSrc: '/assets/undertale_banner.jpg',
    alt: 'Undertale',
    title: 'Undertale',
  },

  {
    slug: 'lifeisstrange',
    imgSrc: '/assets/lis-hero.jpg',
    alt: 'Life is Strange',
    title: 'Life is Strange',
  },

  {
    slug: 'cuphead',
    imgSrc: '/assets/cuphead-hero.png',
    alt: 'Cuphead',
    title: 'Cuphead',
  },

  {
    slug: 'katanazero',
    imgSrc: '/assets/kz-hero.png',
    alt: 'Katana Zero',
    title: 'Katana Zero',
  },

];

const Hero = () => {
  return (
    <section id="hero-section" className="mt-12 w-[72rem] mx-auto hero-carousel">
      
      <div className="rounded-xl overflow-hidden">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true, 
          }}
          navigation={true} 
          loop={true}
          className="h-[400px]" 
        >
          {highlightGames.map((game) => (
            <SwiperSlide key={game.slug}>
              
              <Link href={`/games/${game.slug}`}>
                <div className="
                  relative w-full h-full group
                  transition-shadow duration-300
                  group-hover:shadow-[0_0_25px_rgba(255,255,255,0.4)]
                ">
                  <Image
                    src={game.imgSrc}
                    alt={game.alt}
                    fill 
                  />
                  
                  <div id="hero-text-container" 
                  className="
                    absolute inset-0 
                    bg-gradient-to-r from-black/70 via-black/50 to-transparent 
                    pt-12 pb-12 pl-48 pr-12
                    flex flex-col justify-end
                    h-full
                  ">
                    <h2 className="text-4xl font-bold">{game.title}</h2>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div> 

    </section>
  );
};

export default Hero;