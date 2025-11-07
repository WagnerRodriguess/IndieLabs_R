'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation'; // MUDANÇA: Importa o hook
import { ChevronLeft } from 'lucide-react'; // MUDANÇA: Importa o ícon

const Header = () => {

  const pathname = usePathname();
  const isGamePage = pathname.startsWith('/games/');
  const isSearchPage = pathname.startsWith('/search')

  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter(); 

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (searchTerm.trim() !== '') {
        router.push(`/search?q=${searchTerm}`);
      }
    }
  };

  return (
    <header id="main-header" className="flex justify-between items-center mt-10 ">
      {isGamePage || isSearchPage ? (

        <Link href="/" id="back-to-home-btn">
          <ChevronLeft size={20} />
          Voltar para a Home
        </Link>
      ) : (

          <Image src="/assets/Logo__indie.png" alt="IndieLabs Logo" width={120} height={40} />
      
      )}
      
      <div className="flex items-center">
        <input
          id="search-bar" 
          type="search"
          placeholder="Pesquisar"
          className="focus:outline-none focus:ring-2 focus:ring-brand-primary"
          
          value={searchTerm}
          onChange={handleSearchInput}
          onKeyDown={handleKeyDown} 
        />
      </div>
    </header>
  );
};

export default Header;