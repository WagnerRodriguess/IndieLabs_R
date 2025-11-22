'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useMemo, useRef, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Search, X, ChevronLeft, LogIn, LogOut, User, Settings, Lock, Trash } from 'lucide-react';
import { gamesData } from '../lib/gamedata';
import { signOut, useSession } from 'next-auth/react';
import path from 'path';

const Header = () => {
  const pathname = usePathname();
  const isGamePage = pathname.startsWith('/games/');
  const isSearchPage = pathname.startsWith('/search');
  const isAuthPage = pathname === '/login' || pathname === '/register' || pathname === '/change-password';

  const showBackButton = isGamePage || isSearchPage || isAuthPage;
  const showSearchBar = !isAuthPage;
  const showLoggedUser = !isAuthPage;

  const { data: session, status } = useSession();

  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);

  const router = useRouter();
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node | null;
      if (containerRef.current && target && !containerRef.current.contains(target)) {
        setOpen(false);
      }
    };
    window.addEventListener('mousedown', handleClickOutside);
    return () => window.removeEventListener('mousedown', handleClickOutside);
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

  const handleDeleteAccount = async () => {

    const confirm = window.confirm(
      "Tem certeza? Esta ação não pode ser desfeita."
    );

    if (!confirm) return;

    try {
      const res = await fetch('/api/user/delete', {
        method: 'DELETE',
      });

      if (res.ok) {
        alert('Conta excluída com sucesso.');
        signOut({ callbackUrl: '/' });
      } else {
        alert('Erro ao excluir a conta.');
      }
    } catch (error) {
      alert('Erro de conexão.');
    }
  };

  return (
    <header className="header-container">

      {showBackButton ? (
        <Link href="/" className="back-btn">
          <ChevronLeft size={20} /> Voltar ao home
        </Link>
      ) : (
        <Image
          src="/assets/Logo__indie.png"
          alt="IndieLabs Logo"
          width={140}
          height={45}
          className="logo"
        />
      )}

      {showSearchBar && (
        <div ref={containerRef} className="search-bar-wrapper">
          <div className="search-bar">
            <Search className="search-icon" />
            <input
              type="search"
              className="search-input"
              placeholder="Buscar jogo..."
              value={query}
              onChange={(e) => {
                const v = e.target.value;
                setQuery(v);
                setOpen(v.trim().length > 0);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  goToSearchPage();
                }
                if (e.key === 'Escape') setOpen(false);
              }}
            />
            {query && (
              <X
                className="search-clear-btn"
                onClick={() => {
                  setQuery('');
                  setOpen(false);
                }}
              />
            )}
          </div>

          {open && (
            <div className="search-dropdown">
              {results.length > 0 ? (
                <>
                  <div className="dropdown-header">🎮 Sugestões ({results.length})</div>
                  <ul className="dropdown-list">
                    {results.map((g, i) => (
                      <li
                        key={g.slug}
                        className="dropdown-item"
                        onClick={() => {
                          router.push(`/games/${g.slug}`);
                          setOpen(false);
                        }}
                      >
                        <div className="dropdown-index">{i + 1}</div>
                        <img
                          src={g.cardImage}
                          alt={g.title}
                          className="dropdown-thumb"
                        />
                        <div className="dropdown-info">
                          <p className="dropdown-title">{g.title}</p>
                          <p className="dropdown-tags">{g.details?.tags}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <button className="dropdown-more-btn" onClick={goToSearchPage}>
                    🔍 Ver mais resultados
                  </button>
                </>
              ) : (
                <div className="dropdown-empty">
                  <p>Nenhum resultado encontrado</p>
                  <span>Tente outro termo</span>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      <div className="auth-area">
        
        <div className="user-auth-section">
          {status === 'loading' && showLoggedUser && (
            <div className="auth-loading">Carregando...</div>
          )}

          {status === 'unauthenticated' && !isAuthPage && (
            <Link href="/login" className="auth-link-btn login-btn">
              <LogIn size={18} /> Login
            </Link>
          )}
          
          {status === 'authenticated' && showLoggedUser && (
            <>
            
              <div className="auth-welcome">
                <User size={16} />
                Olá, <strong>{session.user.username}</strong>
              </div>
              <button 
                onClick={() => setIsOptionsOpen(true)} 
                className="auth-link-btn options-btn"
              >
                <Settings size={18} /> Opções
              </button>
            </>
          )}
        </div>

      </div>
      {isOptionsOpen && status === 'authenticated' && (
        <div className="options-overlay">
          <div className="options-modal">
            <button onClick={() => setIsOptionsOpen(false)} className="options-close-btn">
              <X size={24} />
            </button>

            <div className="options-header">
              <div className="options-avatar">
                <User size={40} />
              </div>
              <h2 className="options-username">{session.user.username}</h2>
            </div>

            <div className="options-actions">
              <button 
                className="options-action-btn" 
                onClick={() => {
                  setIsOptionsOpen(false); 
                  router.push('/change-password'); 
                }}
              >
                <Lock size={18} /> Alterar Senha
              </button>   

              <button 
                className="options-action-btn delete-account" 
                onClick={handleDeleteAccount} 
              >
                <Trash size={18} /> Excluir Conta
              </button>
            </div>

            <div className="options-footer">
              <button 
                onClick={() => {
                  signOut({ callbackUrl: '/' });
                  setIsOptionsOpen(false);
                }} 
                className="options-logout-btn"
              >
                <LogOut size={18} /> Sair da Conta
              </button>
            </div>
          </div>
        </div>
      )}

    </header>
  );
};

export default Header;