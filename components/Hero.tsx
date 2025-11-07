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
    slug: 'until_then',
    imgSrc: '/assets/ut-hero.png',
    alt: 'Until Then',
    title: 'Until Then',
  },

  {
    slug: 'outer_wilds',
    imgSrc: '/assets/ow_hero.png',
    alt: 'Outer Wilds',
    title: 'Outer Wilds',
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
    <section id="hero-section" className="hero-carousel">
      <div className="hero-swiper-container">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          pagination={{ clickable: true }}
          navigation={true} 
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
        >
          {highlightGames.map((game, index) => (
            <SwiperSlide key={index}>
              <Link href={`/games/${game.slug}`}>
                <div className="hero-slide-content">
                  <Image
                    src={game.imgSrc}
                    alt={game.alt}
                    fill
                  />
                  <div className="hero-slide-text">{game.alt}</div>
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