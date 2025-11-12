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

      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      setOpen(false);
      
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
     <div ref={containerRef} id="search-container">
        <div className="relative">
          <div className="flex items-center bg-gradient-to-r from-[#2F1A3D] to-[#3D1F4A] border border-[#9B65EC] rounded-xl px-6 py-3.5 shadow-2xl transition-all duration-300 hover:border-[#c084fc] hover:shadow-[0_0_30px_rgba(155,101,236,0.3)] focus-within:border-[#c084fc] focus-within:shadow-[0_0_30px_rgba(155,101,236,0.4)]">
            <Search className="text-[#c084fc] w-6 h-6 mr-4 flex-shrink-0" />
            <input
              type="search"
              placeholder="Buscar jogo..."
              value={query}
              onChange={(e) => {
                const v = e.target.value;
                setQuery(v);
                setOpen(v.trim().length > 0);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter'){
                  e.preventDefault();
                  goToSearchPage();
                }
                if (e.key === 'Escape') setOpen(false);
              }}
              className="bg-transparent outline-none text-white placeholder-purple-400 w-full text-base font-medium
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
                className="search-clear-btn"
                aria-label="Limpar"
              />
            )}
          </div>

          {/* Dropdown melhorado */}
          {open && (
            <div className="absolute left-0 right-0 top-full mt-3 bg-gradient-to-b from-[#2F1A3D] to-[#1a0b2e] border border-[#9B65EC] rounded-xl shadow-2xl max-h-96 overflow-y-auto z-50 backdrop-blur-sm">
              {results.length > 0 ? (
                <>
                  <div className="px-4 py-3 border-b border-[#581c87]/30 text-xs text-[#9ca3af] font-semibold uppercase tracking-wide">
                    🎮 Sugestões ({results.length})
                  </div>
                  <ul className="py-2 list-none m-0 p-0">
                    {results.map((g, index) => (
                      <li
                        key={g.slug}
                        className="px-4 py-3 hover:bg-[#9B65EC]/20 transition-all duration-200 cursor-pointer border-b border-[#581c87]/10 last:border-b-0 hover:border-b-[#9B65EC]/30"
                        onClick={() => {
                          router.push(`/games/${g.slug}`);
                          setOpen(false);
                        }}
                      >
                        <div className="flex items-center gap-4">
                          {/* Índice */}
                          <div className="text-[#9B65EC] font-bold text-sm min-w-fit w-6 h-6 flex items-center justify-center bg-[#9B65EC]/20 rounded-full">
                            {index + 1}
                          </div>

                          {/* Imagem */}
                          <div className="relative flex-shrink-0 overflow-hidden rounded-lg border border-[#581c87]/50">
                            <img
                              src={g.cardImage}
                              alt={g.title}
                              width={72}
                              height={48}
                              style={{
                                objectFit: 'cover',
                              }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-200" />
                          </div>

                          {/* Texto */}
                          <div className="flex-grow">
                            <p className="text-white font-bold text-sm leading-tight mb-1.5 hover:text-[#c084fc] transition-colors duration-200">
                              {g.title}
                            </p>
                            <p className="text-[#9ca3af] text-xs leading-tight line-clamp-2">
                              {g.details?.tags}
                            </p>
                          </div>

                          {/* Ícone de seta */}
                          <div className="flex-shrink-0 text-[#9B65EC] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            →
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <button
                    className="w-full px-4 py-3 text-center text-sm text-[#c084fc] hover:text-white hover:bg-[#9B65EC]/30 cursor-pointer border-t border-[#581c87]/30 font-semibold transition-all duration-200 hover:font-bold"
                    onClick={goToSearchPage}
                  >
                    🔍 Ver mais resultados ({gamesData.filter(g => g.title.toLowerCase().includes(query.toLowerCase())).length})
                  </button>
                </>
              ) : (
                <div className="px-4 py-8 text-center">
                  <p className="text-[#9ca3af] text-base font-medium"> Nenhum resultado encontrado</p>
                  <p className="text-[#6b7280] text-sm mt-1">Tente buscar por outro termo</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
