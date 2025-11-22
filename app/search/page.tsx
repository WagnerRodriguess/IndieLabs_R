'use client';

import { Suspense, useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { gamesData } from '../../lib/gamedata';
import Link from 'next/link';
import { ChevronDown, Filter, X } from 'lucide-react';

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

    <div className="filter-group">
      

      <button onClick={onOpen} className="filter-dropdown-btn">
        <span className="filter-icon-large">{label.split(' ')[0]}</span>
        
        <div className="filter-text-group">
          <span className="filter-label-main">{label.split(' ').slice(1).join(' ')}</span>
        </div>
        
        <ChevronDown 
          className={`filter-chevron ${isOpen ? 'open' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="filter-dropdown-menu">
          
          <div className="filter-menu-header">
            <p className="filter-menu-title">{label}</p>
          </div>

          <div className="filter-options-list">
            {options.map((option) => {
              const isSelected = selected.includes(option.id);
              return (
                <label
                  key={option.id}
                  className={`filter-option-label ${isSelected ? 'selected' : ''}`}
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => onToggle(option.id)}
                    className="filter-checkbox"
                  />
                  <span style={{ flex: 1 }}>{option.label}</span>
                </label>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}


function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedDevelopers, setSelectedDevelopers] = useState<string[]>([]);
  const [selectedPublishers, setSelectedPublishers] = useState<string[]>([]);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    gamesData.forEach((game) => {
      game.details.tags.split(',').forEach((tag) => {
        tags.add(tag.trim());
      });
    });
    return Array.from(tags).sort();
  }, []);

  const filteredGames = useMemo(() => {
    return gamesData.filter((game) => {
      const matchesQuery = game.title.toLowerCase().includes(query.toLowerCase());
      const gameTags = game.details.tags.split(',').map((tag) => tag.trim());
      const matchesCategory = selectedCategories.length === 0 ? true : selectedCategories.every((tag) => gameTags.includes(tag));
      const matchesDeveloper = selectedDevelopers.length === 0 ? true : selectedDevelopers.includes(game.details.developer);
      const matchesPublisher = selectedPublishers.length === 0 ? true : selectedPublishers.includes(game.details.publisher);
      return matchesQuery && matchesCategory && matchesDeveloper && matchesPublisher;
    });
  }, [query, selectedCategories, selectedDevelopers, selectedPublishers]);

  const toggleCategory = (tag: string) => {
    setSelectedCategories((prev) => prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]);
  };
  const toggleDeveloper = (dev: string) => {
    setSelectedDevelopers((prev) => prev.includes(dev) ? prev.filter((d) => d !== dev) : [...prev, dev]);
  };
  const togglePublisher = (pub: string) => {
    setSelectedPublishers((prev) => prev.includes(pub) ? prev.filter((p) => p !== pub) : [...prev, pub]);
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedDevelopers([]);
    setSelectedPublishers([]);
    setOpenDropdown(null);
  };

  const activeFiltersCount = selectedCategories.length + selectedDevelopers.length + selectedPublishers.length;

  return (
    <main id="main-content">
      <div id="search-page">
        <div id="search-header-section">
          <h1 id="search-title">Resultados da pesquisa</h1>
          <p id="search-query-text">Para: <span>"{query}"</span></p>
          <p id="search-results-count">
            {filteredGames.length} {filteredGames.length === 1 ? 'resultado' : 'resultados'} encontrados
          </p>
        </div>

        <div id="search-filters-container" className="mb-14 mt-10 px-4">
          
          <div id="search-filters-header">
            <div id="search-filters-title-group">
              <div id="search-filters-title">
                <Filter size={24} color="#ffffff" />
                Filtros
              </div>
              {activeFiltersCount > 0 && (
                <span id="active-filters-count">{activeFiltersCount}</span>
              )}
            </div>

            {activeFiltersCount > 0 && (
              <button 
                id="clear-filters-btn"
                onClick={clearAllFilters}
                className="flex items-center gap-2" 
              >
                <X size={18} /> Limpar Filtros
              </button>
            )}
          </div>

          <div className="flex gap-4 flex-wrap justify-center items-center relative" style={{ zIndex: 50 }}>
            <FilterDropdown
              label="🎮 Categorias"
              options={allTags.map(tag => ({ id: tag, label: tag }))}
              selected={selectedCategories}
              onToggle={(tag) => toggleCategory(tag)}
              isOpen={openDropdown === 'categories'}
              onOpen={() => setOpenDropdown(openDropdown === 'categories' ? null : 'categories')}
            />

            <FilterDropdown
              label="👨‍💻 Desenvolvedor"
              options={Array.from(new Set(gamesData.map(g => g.details.developer))).map(dev => ({ id: dev, label: dev }))}
              selected={selectedDevelopers}
              onToggle={(dev) => toggleDeveloper(dev)}
              isOpen={openDropdown === 'developer'}
              onOpen={() => setOpenDropdown(openDropdown === 'developer' ? null : 'developer')}
            />

            <FilterDropdown
              label="🏢 Distribuidor"
              options={Array.from(new Set(gamesData.map(g => g.details.publisher))).map(pub => ({ id: pub, label: pub }))}
              selected={selectedPublishers}
              onToggle={(pub) => togglePublisher(pub)}
              isOpen={openDropdown === 'publisher'}
              onOpen={() => setOpenDropdown(openDropdown === 'publisher' ? null : 'publisher')}
            />
          </div>
        </div>

        {filteredGames.length > 0 ? (
          <div id="search-results-wrapper">
            <div id="search-results-container">
              {filteredGames.map((game) => (
                <Link href={`/games/${game.slug}`} key={game.slug} className="search-result-card">
                  <div className="search-result-card-image-wrapper">
                    <img src={game.cardImage} alt={game.title} className="search-result-card-image" />
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

export default function SearchPage() {
  return (
    <Suspense fallback={<p className="text-white text-center mt-10">Carregando resultados...</p>}>
      <SearchResults />
    </Suspense>
  );
}