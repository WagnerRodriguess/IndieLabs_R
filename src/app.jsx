function App() {
  return (
    <div 
      className="flex flex-col min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/lis-background2.jpg')" }}
    >
      {/* Texto central */}
      <div className="flex-grow flex flex-col items-center justify-center text-center px-4 pt-20">
        <h1 className="text-black text-4xl md:text-6xl font-bold drop-shadow-lg mb-6">
          LIFE IS STRANGE
        </h1>
      </div>

      {/* Seção principal: imagens/vídeo à esquerda, textos à direita */}
      <div className="flex flex-col md:flex-row items-start justify-center gap-8 px-4 mb-12">
        
        {/* Lado esquerdo: imagens + vídeo */}
        <div className="flex flex-col gap-6">
          {/* Imagens */}
          <div className="flex gap-6">
            <div className="bg-white rounded-lg shadow-lg p-2 w-52 h-52 flex items-center justify-center hover:scale-105 transition-transform">
              <img src="/lis1.jpg" alt="Imagem 1" className="rounded-md object-cover w-full h-full" />
            </div>
            <div className="bg-white rounded-lg shadow-lg p-2 w-52 h-52 flex items-center justify-center hover:scale-105 transition-transform">
              <img src="/lis2.jpg" alt="Imagem 2" className="rounded-md object-cover w-full h-full" />
            </div>
            <div className="bg-white rounded-lg shadow-lg p-2 w-52 h-52 flex items-center justify-center hover:scale-105 transition-transform">
              <img src="/lis-background.jpg" alt="Imagem 3" className="rounded-md object-cover w-full h-full" />
            </div>
          </div>

          {/* Vídeo */}
          <div className="border-4 border-white rounded-lg shadow-2xl overflow-hidden w-full max-w-2xl aspect-video hover:scale-105 transition-transform">
            <iframe 
              className="w-full h-full"
              src="https://www.youtube.com/embed/mpRhaXfvG_0?si=PBMyeBu3H4HnL8Jz"
              title="Vídeo do YouTube"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        {/* Lado direito: textos */}
        <div className="flex flex-col justify-center max-w-md text-black">
          <p className="mb-4 drop-shadow-md">
            Life is Strange é um jogo de escolhas, onde acompanhos Max uma garota que muda de cidade para cursar Artes na universidade mais renomada nessa área em ..., e lá em uma situação ''estranha'' ela reencontra uma velha amiga porém vê ela sendo baleada e talvez pelo seu apelo tão grande para ela sobreviver ela desenvolve o poder de voltar no tempo e seguimos o jogo acompanhando a vida da Max agora com poder de voltar no tempo para conseguir evitar o efeito borboleta que salvar a amiga dela ocasionou!
          </p>
          <p className="drop-shadow-md">
            Confira o trailer do jogo e se emocione jogando!
          </p>
        </div>
      </div>

      {/* Rodapé */}
      <footer className="bg-black bg-opacity-50 text-white p-4 flex justify-center space-x-6">
        <a href="#" className="hover:text-blue-500 transition">🐦 Twitter</a>
        <a href="#" className="hover:text-blue-700 transition">📘 Facebook</a>
        <a href="#" className="hover:text-pink-500 transition">📸 Instagram</a>
        <a href="#" className="hover:text-black transition">💼 LinkedIn</a>
      </footer>
    </div>
  );
}

export default App;
