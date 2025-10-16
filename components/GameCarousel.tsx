'use client'; // Necessário para usar hooks do Swiper

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import Image from 'next/image';
import Link from 'next/link';

// Importe os estilos do Swiper
import 'swiper/css';
import 'swiper/css/pagination';

const games = [
  { slug: 'celeste', imgSrc: '/assets/celeste.png', alt: 'Celeste' },
  { slug: 'project-zomboid', imgSrc: '/assets/project.png', alt: 'Project Zomboid' },
  { slug: 'stardew-valley', imgSrc: '/assets/stardew.png', alt: 'Stardew Valley' },
  { slug: 'limbo', imgSrc: '/assets/limbo.png', alt: 'Limbo' },
  { slug: 'undertale', imgSrc: '/assets/undertale.png', alt: 'Undertale' },
  { slug: 'bastion', imgSrc: '/assets/bastion.png', alt: 'Bastion' },
  { slug: 'untitled-goose-game', imgSrc: '/assets/goose intro.png', alt: 'Untitled Goose Game' },
];

const GameCarousel = () => {
  return (
    <section className="mt-12 mb-48 max-w-[1000px] mx-auto bg-lime-500">
      <h2 className="text-3xl font-bold mb-4">Recomendado para você</h2>
      <Swiper
        modules={[Pagination]}
        spaceBetween={24}
        slidesPerView={5} // Mostra 5 slides por vez
        pagination={{ clickable: true }}
        className="!pb-10" // Adiciona espaço para a paginação
      >
        {games.map((game) => (
          <SwiperSlide key={game.slug}>
            <Link href={`/games/${game.slug}`}>
              <div className="rounded-lg overflow-hidden group">
                <Image
                  src={game.imgSrc}
                  alt={game.alt}
                  width={250}
                  height={350}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
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