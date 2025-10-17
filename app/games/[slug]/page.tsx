// app/games/[slug]/page.tsx (Com ID para a Fila de Imagens)

import { gamesData } from '../../../lib/gamedata';
import Image from 'next/image';

export async function generateStaticParams() {
  return gamesData.map((game) => ({
    slug: game.slug,
  }));
}

export default function GamePage({ params }: { params: { slug: string } }) {
  const game = gamesData.find((g) => g.slug === params.slug);

  // Bloco 'if' preenchido para evitar o erro ts(18048)
  if (!game) {
    return (
      <main className="max-w-6xl mx-auto px-4 py-12 text-center">
        <h1 className="text-4xl font-bold">Jogo não encontrado</h1>
      </main>
    );
  }

  return (
    <div
      className="flex flex-col min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${game.backgroundImage})` }}
    >
      {/* Título Central */}
      <div className="flex flex-col items-center text-center px-4 pt-10">
        <h1 className="text-black text-4xl md:text-6xl font-bold drop-shadow-lg mb-6">
          {game.title}
        </h1>
      </div>

      {/* Container principal com ID para o CSS */}
      <div id="game-page-container" className="flex justify-center px-4 mb-12">
        
        {/* Coluna da Esquerda com ID */}
        <div id="game-media-column" className="flex flex-col">
          
          {/* ======================================= */}
          {/* MUDANÇA (Adicionámos este ID)          */}
          {/* ======================================= */}
          <div id="game-image-row" className="flex">
            {game.images.slice(0, 3).map((img, index) => (
              <div 
                key={index} 
                className="
                  bg-white rounded-lg shadow-lg p-2 w-52 h-52
                  flex items-center justify-center 
                "
              >
                <img
                  src={img} 
                  alt={`${game.title} screenshot ${index + 1}`}
                  className="rounded-md object-cover w-full h-full"
                />
              </div>
            ))}
          </div>

          {/* Vídeo (Com ID e classes 'relative'/'absolute' para o globals.css) */}
          <div 
            id="game-video-container" 
            className="
              border-4 border-white rounded-lg shadow-2xl overflow-hidden 
              w-full max-w-2xl 
              relative 
            "
          >
            <iframe
              className="w-full h-full absolute top-0 left-0" 
              src={game.videoUrl}
              title={`Trailer de ${game.title}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        {/* Coluna da Direita com ID */}
        <div id="game-text-column" className="flex flex-col justify-center text-black">
          {game.description.map((paragraph, index) => (
            <p key={index} className="mb-4 drop-shadow-md text-justify">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}