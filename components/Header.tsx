'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Header = () => {
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
    <header className="py-4 px-14 flex justify-between items-center">
      <Link href="/">
        <Image src="/assets/Logo__indie.png" alt="IndieLabs Logo" width={120} height={40} />
      </Link>
      
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