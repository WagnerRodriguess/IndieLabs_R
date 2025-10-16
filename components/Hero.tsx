import Image from 'next/image';
import Link from 'next/link';

const Hero = () => {
  return (
    <section className="mt-12">
      {/* O link leva para a página do jogo Hollow Knight */}
      <Link href="/games/hollowknight">
        <div className="relative rounded-xl overflow-hidden max-w-[1100px] mx-auto group">
          <Image
            src="/assets/hollowknight.png" // Imagem principal da home
            alt="Hollow Knight banner"
            width={800}
            height={500}
            className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {/* Adicionando um gradiente para legibilidade, como na imagem */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
        </div>
      </Link>
    </section>
  );
};

export default Hero;