'use client';

import { Suspense, useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { gamesData } from '../../lib/gamedata';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

// Componente FilterDropdown
interface FilterOption {
  id: string;
  label: string;
  count?: number;
}

interface FilterDropdownProps {
  label: string;
  options: FilterOption[];
  selected: string[];
  onToggle: (id: string) => void;
  isOpen: boolean;
  onOpen: () => void;
}

function FilterDropdown({ label, options, selected, onToggle, isOpen, onOpen }: FilterDropdownProps) {
  return (
    <div className="relative group">
      <button
        onClick={onOpen}
        className="px-10 py-5 bg-gradient-to-r from-[#2F1A3D] via-[#3D1F4A] to-[#2F1A3D] hover:from-[#3D1F4A] hover:via-[#4a2a5a] hover:to-[#3D1F4A] text-white font-bold text-2xl rounded-3xl transition-all duration-300 border-3 border-[#9B65EC]/50 hover:border-[#c084fc] flex items-center gap-5 whitespace-nowrap shadow-2xl hover:shadow-[0_0_40px_rgba(155,101,236,0.6)]"
      >
        <span className="text-5xl">{label.split(' ')[0]}</span>
        <div className="flex flex-col items-start">
          <span className="text-2xl font-bold leading-tight">{label.split(' ').slice(1).join(' ')}</span>
        </div>
        <ChevronDown 
          size={36} 
          className={`transition-transform duration-300 ml-4 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-5 bg-gradient-to-b from-[#2F1A3D] to-[#1a0b2e] border-4 border-[#9B65EC] rounded-3xl shadow-2xl z-40 backdrop-blur-xl min-w-[480px] max-h-[600px] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 px-8 py-7 border-b-3 border-[#9B65EC]/30 bg-gradient-to-r from-[#9B65EC]/15 to-transparent backdrop-blur-sm">
            <p className="text-2xl text-white font-bold">{label}</p>
          </div>

          {/* Options */}
          <div className="py-5">
            {options.map((option) => {
              const isSelected = selected.includes(option.id);
              return (
                <label
                  key={option.id}
                  className={`px-8 py-5 flex items-center gap-5 cursor-pointer transition-all duration-200 border-l-4 ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#9B65EC]/40 to-transparent text-white border-l-[#c084fc]'
                      : 'text-[#d1d5db] hover:bg-[#9B65EC]/15 border-l-transparent'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => onToggle(option.id)}
                    className="w-7 h-7 accent-[#c084fc] cursor-pointer rounded-md flex-shrink-0"
                  />
                  <span className="flex-1 font-semibold text-xl">{option.label}</span>
                </label>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// Componente separado com a lógica da pesquisa
function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedDevelopers, setSelectedDevelopers] = useState<string[]>([]);
  const [selectedPublishers, setSelectedPublishers] = useState<string[]>([]);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Extrai todas as tags únicas dos jogos
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    gamesData.forEach((game) => {
      game.details.tags.split(',').forEach((tag) => {
        tags.add(tag.trim());
      });
    });
    return Array.from(tags).sort();
  }, []);

  // Filtra os jogos por título, categorias, desenvolvedor e distribuidor
  const filteredGames = useMemo(() => {
    return gamesData.filter((game) => {
      const matchesQuery = game.title.toLowerCase().includes(query.toLowerCase());

      // Categories (tags)
  const gameTags = game.details.tags.split(',').map((tag) => tag.trim());
  const matchesCategory = selectedCategories.length === 0 ? true : selectedCategories.every((tag) => gameTags.includes(tag));

      // Developer
      const matchesDeveloper = selectedDevelopers.length === 0 ? true : selectedDevelopers.includes(game.details.developer);

      // Publisher
      const matchesPublisher = selectedPublishers.length === 0 ? true : selectedPublishers.includes(game.details.publisher);

      return matchesQuery && matchesCategory && matchesDeveloper && matchesPublisher;
    });
  }, [query, selectedCategories, selectedDevelopers, selectedPublishers]);

  const toggleCategory = (tag: string) => {
    setSelectedCategories((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const toggleDeveloper = (dev: string) => {
    setSelectedDevelopers((prev) =>
      prev.includes(dev) ? prev.filter((d) => d !== dev) : [...prev, dev]
    );
  };

  const togglePublisher = (pub: string) => {
    setSelectedPublishers((prev) =>
      prev.includes(pub) ? prev.filter((p) => p !== pub) : [...prev, pub]
    );
  };

  return (
    <main id="main-content">
      <div id="search-page">
        {/* Header da página de pesquisa */}
        <div id="search-header-section">
          <h1 id="search-title">
            Resultados da pesquisa
          </h1>
          <p id="search-query-text">
            Para: <span>"{query}"</span>
          </p>
          <p id="search-results-count">
            {filteredGames.length} {filteredGames.length === 1 ? 'resultado' : 'resultados'} encontrados
          </p>
        </div>

        {/* Barra de Filtros Premium */}
        <div className="mb-14 mt-10 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex gap-4 flex-wrap justify-center items-center">
              {/* Dropdown Categorias */}
              <FilterDropdown
                label="🎮 Categorias"
                options={allTags.map(tag => ({
                  id: tag,
                  label: tag,
                }))}
                selected={selectedCategories}
                onToggle={(tag) => toggleCategory(tag)}
                isOpen={openDropdown === 'categories'}
                onOpen={() => setOpenDropdown(openDropdown === 'categories' ? null : 'categories')}
              />

              {/* Dropdown Desenvolvedora */}
              <FilterDropdown
                label="👨‍💻 Desenvolvedor"
                options={Array.from(new Set(gamesData.map(g => g.details.developer))).map(dev => ({
                  id: dev,
                  label: dev,
                }))}
                selected={selectedDevelopers}
                onToggle={(dev) => toggleDeveloper(dev)}
                isOpen={openDropdown === 'developer'}
                onOpen={() => setOpenDropdown(openDropdown === 'developer' ? null : 'developer')}
              />

              {/* Dropdown Distribuidora */}
              <FilterDropdown
                label="🏢 Distribuidor"
                options={Array.from(new Set(gamesData.map(g => g.details.publisher))).map(pub => ({
                  id: pub,
                  label: pub,
                }))}
                selected={selectedPublishers}
                onToggle={(pub) => togglePublisher(pub)}
                isOpen={openDropdown === 'publisher'}
                onOpen={() => setOpenDropdown(openDropdown === 'publisher' ? null : 'publisher')}
              />

              {/* Botão Limpar */}
              {(selectedCategories.length + selectedDevelopers.length + selectedPublishers.length) > 0 && (
                <button
                  onClick={() => {
                    setSelectedCategories([]);
                    setSelectedDevelopers([]);
                    setSelectedPublishers([]);
                    setOpenDropdown(null);
                  }}
                  className="px-10 py-5 bg-gradient-to-r from-[#dc2626] via-[#ef4444] to-[#dc2626] hover:from-[#b91c1c] hover:via-[#dc2626] hover:to-[#991b1b] text-white font-bold text-2xl rounded-3xl transition-all duration-300 border-3 border-[#fca5a5] hover:border-[#fecaca] flex items-center gap-4 shadow-2xl hover:shadow-[0_0_40px_rgba(220,38,38,0.5)]"
                >
                  <span className="text-3xl">✕</span>
                  <span>Limpar Tudo ({selectedCategories.length + selectedDevelopers.length + selectedPublishers.length})</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Resultados da pesquisa */}
        {filteredGames.length > 0 ? (
          <div id="search-results-wrapper">
            <div id="search-results-container">
              {filteredGames.map((game) => (
                <Link href={`/games/${game.slug}`} key={game.slug} className="search-result-card">
                  <div className="search-result-card-image-wrapper">
                    <img
                      src={game.cardImage}
                      alt={game.title}
                      className="search-result-card-image"
                    />
                    <div className="search-result-card-overlay"></div>
                  </div>
                  <div className="search-result-card-content">
                    <h3 className="search-result-card-title">{game.title}</h3>
                    <p className="search-result-card-tags">{game.details.tags}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <div id="search-no-results-container">
            <p id="search-no-results">
               Nenhum jogo encontrado para "{query}" com os filtros selecionados.
            </p>
            <p id="search-no-results-hint">
              Tente ajustar seus critérios de pesquisa ou filtros.
            </p>
          </div>
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
