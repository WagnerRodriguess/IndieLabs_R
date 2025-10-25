'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules'; 
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const games = [
  { slug: 'celeste', imgSrc: '/assets/celeste.png', alt: 'Celeste' },
  { slug: 'lifeisstrange', imgSrc: '/assets/lis-caurosel.png', alt: 'Life is Strange' },
  { slug: 'katanazero', imgSrc: '/assets/kz-caurosel.png', alt: 'Katana Zero' },
  { slug: 'hollowknight', imgSrc: '/assets/hollow-capa.png', alt: 'Hollow Knight' },
  { slug: 'cuphead', imgSrc: '/assets/Cuphead logo.png', alt: 'Cup Head' },
  { slug: 'undertale', imgSrc: '/assets/undertale.png', alt: 'Undertale' },
  { slug: 'project_zomboid', imgSrc: '/assets/project.png', alt: 'Project Zomboid' },
  { slug: 'gris', imgSrc: '/assets/Gris.png', alt: 'Gris' },
  { slug: 'stardew_valley', imgSrc: '/assets/stardew.png', alt: 'Stardew Valley' },
];

const GameCarousel = () => {
  return (
    <section id="game-carousel-section" className="w-[72rem] mx-auto">
      <h2 className="">Recomendado para você</h2>
      
      <div className="flex items-center gap-4">


        <button 
        id="game-carousel-prev-btn"
     
        >
          <ChevronLeft size={32} />
        </button>

        <Swiper
          modules={[Navigation]}
          navigation={{
            nextEl: '#game-carousel-next-btn',
            prevEl: '#game-carousel-prev-btn',
          }}
          
          slidesPerView={4}
          slidesPerGroup={4}
          spaceBetween={20}
          id="game-carousel"
          className="flex-1"
        >
          {games.map((game) => (
            <SwiperSlide key={game.slug}>
              <Link href={`/games/${game.slug}`}>
                <div className="game-carousel-slide-content">
                  <Image
                    src={game.imgSrc}
                    alt={game.alt}
                    fill
                    className="game-carousel-image" 
                  />
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

        <button id="game-carousel-next-btn">
          <ChevronRight size={32} />
        </button>

      </div>
    </section>
  );
};

export default GameCarousel;