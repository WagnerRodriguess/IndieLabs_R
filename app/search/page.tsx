'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { gamesData } from '../../lib/gamedata';
import Link from 'next/link';

// Componente separado com a lógica da pesquisa
function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  const filteredGames = gamesData.filter((game) =>
    game.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <main id="main-content">
      <div id="search-page">
        <h1 id="search-title">
          Resultados da pesquisa para: <span>"{query}"</span>
        </h1>

        {filteredGames.length > 0 ? (
          <div id="search-results-container">
            {filteredGames.map((game) => (
              <Link href={`/games/${game.slug}`} key={game.slug} className="search-result-card">
                <img
                  src={game.cardImage}
                  alt={game.title}
                  className="search-result-card-image"
                />
                <h3 className="search-result-card-title">{game.title}</h3>
              </Link>
            ))}
          </div>
        ) : (
          <p id="search-no-results">Nenhum jogo encontrado para "{query}".</p>
        )}
      </div>
    </main>
  );
}

// Página principal com suspense boundary
export default function SearchPage() {
  return (
    <Suspense fallback={<p className="text-white text-center mt-10">Carregando resultados...</p>}>
      <SearchResults />
    </Suspense>
  );
}
