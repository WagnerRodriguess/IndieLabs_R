'use client'; 

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import Image from 'next/image';
import Link from 'next/link';

import 'swiper/css';
import 'swiper/css/pagination';

const games = [
  { slug: 'celeste', imgSrc: '/assets/celeste.png', alt: 'Celeste' },
  { slug: 'lifeisstrange', imgSrc: '/assets/lis-caurosel.png', alt: 'Life is Strange' },
  { slug: 'stardew-valley', imgSrc: '/assets/stardew.png', alt: 'Stardew Valley' },
  { slug: 'hollowknight', imgSrc: '/assets/hollow-capa.png', alt: 'Hollow Knight' },
  { slug: 'limbo', imgSrc: '/assets/limbo.png', alt: 'Limbo' },
  { slug: 'undertale', imgSrc: '/assets/undertale.png', alt: 'Undertale' },
  { slug: 'bastion', imgSrc: '/assets/bastion.png', alt: 'Bastion' },
  { slug: 'untitled-goose-game', imgSrc: '/assets/goose intro.png', alt: 'Untitled Goose Game' },
];

const GameCarousel = () => {
  return (
    <section className="mt-12 mb-48 max-w-[1440px] mx-auto">
      <h2 className="text-3xl font-bold mb-4">Recomendado para você</h2>
      <Swiper
        modules={[Pagination]}
        spaceBetween={24}
        slidesPerView={5}
        pagination={{ clickable: true }}
        className="!pb-10"
      >
        {games.map((game) => (
          <SwiperSlide key={game.slug}>
            <Link href={`/games/${game.slug}`}>
              
              
              <div className="
                w-48 h-64 mx-auto rounded-lg overflow-hidden group
                transition-shadow duration-300
                group-hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]
              ">
                <Image
                  src={game.imgSrc}
                  alt={game.alt}
                  width={200}
                  height={280}
                  
                  className="w-full h-full object-cover"
                />
              </div>

            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default GameCarousel;