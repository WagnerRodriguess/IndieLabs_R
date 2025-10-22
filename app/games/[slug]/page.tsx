import { gamesData } from '../../../lib/gamedata';
import Image from 'next/image';

export async function generateStaticParams() {
  return gamesData.map((game) => ({
    slug: game.slug,
  }));
}

export default function GamePage({ params }: { params: { slug: string } }) {
  const game = gamesData.find((g) => g.slug === params.slug);

  if (!game) {
    return (
      <main className="max-w-6xl mx-auto px-4 py-12 text-center">
        <h1 className="text-4xl font-bold">Jogo não encontrado</h1>
      </main>
    );
  }

  return (
    <div
      className="flex flex-col flex-grow bg-cover bg-center"
      style={{ backgroundImage: `url(${game.backgroundImage})` }}
    >
      <div className="flex flex-col items-center text-center px-4 pt-10">
        <h1 id="game-page-title">
          {game.title}
        </h1>
      </div>

      <div id="game-page-container">

        <div id="game-media-column">
          
          <div id="game-image-row">
            {game.images.slice(0, 3).map((img, index) => (
              <div key={index}>
                <img
                  src={img} 
                  alt={`${game.title} screenshot ${index + 1}`}
                />
              </div>
            ))}
          </div>
          
          <div id="game-video-container">
            <iframe
              src={game.videoUrl}
              title={`Trailer de ${game.title}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
        <div id="game-text-column">
          {game.description.map((paragraph, index) => (
            <p key={index}>
              {paragraph}
            </p>
          ))}
          
          <div id="game-details-box">
            <h3>Informações adicionais:</h3>
            <ul>
              <li>📅 Data de lançamento: {game.details.releaseDate}</li>
              <li>🏢 Desenvolvedora: {game.details.developer}</li>
              <li>🎮 Editora: {game.details.publisher}</li>
              <li>🏷️ Marcadores: {game.details.tags}</li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
}