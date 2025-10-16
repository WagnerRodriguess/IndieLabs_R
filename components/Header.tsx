import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
  return (
   <header className="py-4 px-14 flex justify-between items-center">
      <Link href="/">
        <Image src="/assets/logo.png" alt="IndieLabs Logo" width={120} height={40} />
      </Link>
      <div className="flex items-center gap-4">
        <input
          type="search"
          placeholder="Pesquisar"
          className="bg-brand-text text-brand-background rounded-lg h-11 w-72 px-4 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-primary"
        />
        {/* Adicionei os dois botões do seu HTML original */}
        <button className="text-brand-text h-10 px-4 rounded-md hover:bg-brand-primary/20 transition-colors">
          Entrar
        </button>
        <button className="bg-brand-primary text-brand-text h-10 px-4 rounded-md font-semibold hover:bg-opacity-90 transition-colors">
          Criar conta
        </button>
      </div>
    </header>
  );
};

export default Header;