import { gamesData } from '../../../lib/gamedata';
import Image from 'next/image';
import Link from 'next/link';
import CommentsSection from '../../../components/CommentsSection'; 

export async function generateStaticParams() {
  return gamesData.map((game) => ({
    slug: game.slug,
  }));
}

export default function GamePage({ params }: { params: { slug: string } }) {
  const game = gamesData.find((g) => g.slug === params.slug);

  if (!game) {
    return (
      
      <main id="main-content" className="max-w-6xl mx-auto px-4 py-12 text-center">
        <h1 className="text-4xl font-bold">Jogo não encontrado</h1>
      </main>
    );
  }

  return (

    <div
      id="main-content"
      className="bg-cover bg-center"
      style={{ backgroundImage: `url(${game.backgroundImage})` }}
    >
      
      
      <div className="flex flex-col items-center text-center px-4 pt-10">
        <h1 id="game-page-title">{game.title}</h1>
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
          
          <div id="official-stores-container">
            <h3 id="official-stores-title">Compre o jogo nas lojas oficiais: </h3>
            <div id="stores-logo-grid">
            
              
              {game.storeLinks.steam && (
                <Link href={game.storeLinks.steam} target="_blank" className="store-logo-link">
                  <Image src="/assets/steam_icon.png" alt="Steam" width={120} height={45} />
                </Link>
              )}
              {game.storeLinks.epic && (
                <Link href={game.storeLinks.epic} target="_blank" className="store-logo-link">
                  <Image src="/assets/epic_icon.png" alt="Epic Games" width={120} height={45} />
                </Link>
              )}
              {game.storeLinks.gog && (
                <Link href={game.storeLinks.gog} target="_blank" className="store-logo-link">
                  <Image src="/assets/gog_icon.png" alt="GOG.com" width={120} height={45} />
                </Link>
              )}
              {game.storeLinks.nuuvem && (
                <Link href={game.storeLinks.nuuvem} target="_blank" className="store-logo-link">
                  <Image src="/assets/nuuvem_icon.png" alt="Nuuvem" width={120} height={45} />
                </Link>
              )}

            </div>
          </div>

        </div>
      </div>
      
      <div className="w-full max-w-[72rem] mx-auto px-4 pb-10">
            <CommentsSection gameSlug={params.slug} />
      </div>
    </div>
  );
}