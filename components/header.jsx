import React from "react";

function Header() {
  return (
    <header className="flex justify-between items-center bg-purple-950 text-white px-6 py-3">
      <div className="flex items-center gap-2">
        <img src="/logo.png" alt="Indie Labs" className="w-8 h-8" />
        <h1 className="font-bold text-lg">INDIE LABS</h1>
      </div>
      <div className="flex items-center gap-3">
        <input
          type="text"
          placeholder="Pesquisar"
          className="rounded-md px-2 py-1 text-black text-sm"
        />
        <button className="text-sm hover:underline">Entrar</button>
        <button className="bg-purple-600 px-3 py-1 rounded-md text-sm hover:bg-purple-700 transition">
          Criar conta
        </button>
      </div>
    </header>
  );
}

export default Header;
