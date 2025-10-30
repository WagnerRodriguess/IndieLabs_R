'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { gamesData } from '../../lib/gamedata';

function SearchContent() {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get('q') || '';

  const results = gamesData.filter(game =>
    game.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main id="search-page" className="flex-grow">
      <h1 id="search-title">
        Resultados para: <span>{searchTerm}</span>
      </h1>

      <div id="search-results-container">
        {results.length > 0 ? (
          results.map(game => (
            <Link
              href={`/games/${game.slug}`}
              key={game.slug}
              className="search-result-card"
            >
              <Image
                src={game.cardImage}
                alt={game.title}
                width={400}
                height={300}
                className="search-result-card-image"
              />
              <h2 className="search-result-card-title">{game.title}</h2>
            </Link>
          ))
        ) : (
          <p id="search-no-results">
            Nenhum jogo encontrado para &quot;{searchTerm}&quot;.
          </p>
        )}
      </div>
    </main>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <SearchContent />
    </Suspense>
  );
}
