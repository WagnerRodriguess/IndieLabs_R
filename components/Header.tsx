'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useMemo, useRef, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Search, X, ChevronLeft } from 'lucide-react';
import { gamesData } from '../lib/gamedata';

const Header = () => {
  const pathname = usePathname();
  const isGamePage = pathname.startsWith('/games/');
  const isSearchPage = pathname.startsWith('/search');

  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    window.addEventListener('mousedown', onClickOutside);
    return () => window.removeEventListener('mousedown', onClickOutside);
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return gamesData.filter((g) => g.title.toLowerCase().includes(q)).slice(0, 8);
  }, [query]);

  const goToSearchPage = () => {
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      setOpen(false);
    }
  };

  return (
    <header
      id="main-header"
      className="flex flex-col items-center justify-center mt-10 relative z-50 space-y-6"
    >
      {/* Logo ou botão voltar */}
      {isGamePage || isSearchPage ? (
        <Link href="/" id="back-to-home-btn" className="inline-flex items-center gap-2 text-white">
          <ChevronLeft size={20} />
          Voltar para a Home
        </Link>
      ) : (
        <Image
          src="/assets/Logo__indie.png"
          alt="IndieLabs Logo"
          width={140}
          height={45}
          className="select-none"
        />
      )}

      {/* Barra de pesquisa */}
      <div ref={containerRef} className="relative w-[70%] max-w-3xl mx-auto">
        <div className="flex items-center bg-[#2F1A3D] border border-[#7e22ce] rounded-full px-5 py-4 shadow-lg transition-all duration-300 hover:border-purple-500 focus-within:border-purple-400">
          <Search className="text-purple-300 w-5 h-5 mr-3" />
          <input
            type="search"
            placeholder="Pesquisar"
            value={query}
            onChange={(e) => {
              const v = e.target.value;
              setQuery(v);
              setOpen(v.trim().length > 0);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') goToSearchPage();
              if (e.key === 'Escape') setOpen(false);
            }}
            className="bg-transparent outline-none text-white placeholder-purple-300 w-full text-base font-medium
                       [color-scheme:dark]
                       [&::-webkit-search-cancel-button]:appearance-none
                       [&::-ms-clear]:hidden [&::-ms-reveal]:hidden"
          />
          {query && (
            <X
              onClick={() => {
                setQuery('');
                setOpen(false);
              }}
              className="text-purple-300 cursor-pointer w-5 h-5"
              aria-label="Limpar"
            />
          )}
        </div>

        {/* Dropdown estilo Steam */}
        {open && (
          <div className="absolute left-0 right-0 mt-2 bg-[#1f1230] border border-[#581c87] rounded-lg shadow-xl max-h-80 overflow-y-auto z-50">
            {results.length > 0 ? (
              <ul className="py-2 list-none m-0 p-0">

                {results.map((g) => (
                  <li
                    key={g.slug}
                    className="px-4 py-2 hover:bg-purple-900/30 transition-colors cursor-pointer"
                    onClick={() => {
                      router.push(`/games/${g.slug}`);
                      setOpen(false);
                    }}
                  >
                    <div
                      className="flex items-center"
                      style={{
                        gap: '1.75rem',
                        alignItems: 'center',
                        isolation: 'isolate',
                      }}
                    >
                      {/* Ponto */}
                      <span
                        style={{
                          color: '#c084fc',
                          fontSize: '1.2rem',
                          marginRight: '0.5rem',
                          lineHeight: 1,
                        }}
                      >
                        •
                      </span>

                      {/* Imagem */}
                      <img
                        src={g.cardImage}
                        alt={g.title}
                        width={70}
                        height={45}
                        style={{
                          borderRadius: '6px',
                          objectFit: 'cover',
                          flexShrink: 0,
                          marginRight: '0.75rem', // 🔹 antes era 1.5rem
                        }}
                      />

                      {/* Texto */}
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          color: '#fff',
                          justifyContent: 'center',
                          transform: 'translateY(1px)',
                        }}
                      >
                        <p
                          style={{
                            fontSize: '1rem',
                            fontWeight: 600,
                            lineHeight: 1.3,
                            marginBottom: '2px',
                          }}
                        >
                          {g.title}
                        </p>
                        <p
                          style={{
                            fontSize: '0.85rem',
                            color: '#d1d5db',
                            lineHeight: 1.2,
                          }}
                        >
                          {g.details?.tags}
                        </p>
                      </div>
                    </div>



                  </li>
                ))}
                <li
                  className="px-4 py-2 text-center text-sm text-purple-200 hover:bg-purple-900/30 cursor-pointer"
                  onClick={goToSearchPage}
                >
                Ver mais resultados
                </li>
              </ul>
            ) : (
              <div className="px-4 py-3 text-sm text-purple-200">
              Nenhum resultado encontrado.
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
