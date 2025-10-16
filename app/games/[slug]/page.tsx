import Image from 'next/image';
import { notFound } from 'next/navigation';

// Dados dos jogos (em um projeto real, isso viria de um banco de dados ou API)
const gameData: { [key: string]: any } = {
  undertale: {
    titleImg: '/assets/tituloundertale.png',
    characterImg: '/assets/asriel.png',
    gallery: [
      '/assets/Undertale01 1.png',
      '/assets/Undertale_07-12-18 1.png',
      '/assets/NSwitchDS_Undertale_05 1.png',
      '/assets/15_ma_pj_jeu_video 1.png',
    ],
    synopsis: `“Undertale” é um jogo de RPG desenvolvido por Toby Fox que se destaca por sua narrativa inovadora...`,
    releaseDate: '15 de setembro de 2015',
    developer: 'Toby Fox',
  },
  celeste: {
    titleImg: '/assets/tituloceleste.png',
    characterImg: '/assets/Celeste_character_Madeline_with_strawberry 1.png',
    gallery: [
        '/assets/5 1.png', 
        '/assets/4 1.png',
        '/assets/6 1.png',
        '/assets/7 2.png'
    ],
    synopsis: `"Celeste" é um jogo indie lançado em 2018 que rapidamente conquistou a atenção...`,
    releaseDate: '25 jan, 2018',
    developer: 'Maddy Makes Games Inc.',
  },
  hollowknight: {
      // Adicione os dados do hollowknight.html aqui
  }
  // Adicione os outros jogos aqui...
};

export default function GameDetailPage({ params }: { params: { slug: string } }) {
  const game = gameData[params.slug];

  if (!game) {
    notFound(); // Se o jogo não for encontrado, mostra uma página 404
  }

  return (
    <div className="max-w-7xl mx-auto mt-12 px-4">
      <div className="grid grid-cols-12 gap-8">
        
        {/* Galeria de Imagens (à esquerda) */}
        <div className="col-span-3 flex flex-col gap-4">
          {game.gallery.map((img: string, index: number) => (
            <Image key={index} src={img} alt={`${params.slug} screenshot ${index + 1}`} width={300} height={180} className="rounded-md" />
          ))}
        </div>

        {/* Sinopse (ao centro) */}
        <div className="col-span-6">
          <Image src={game.titleImg} alt={`${params.slug} title`} width={400} height={100} className="mb-6" />
          <p className="text-gray-300 leading-relaxed whitespace-pre-line">{game.synopsis}</p>
          <h2 className="text-xl font-bold mt-8 mb-2">Informações adicionais:</h2>
          <p className="text-gray-400">
            <strong>Data de lançamento:</strong> {game.releaseDate}<br/>
            <strong>Developer:</strong> {game.developer}
          </p>
        </div>

        {/* Imagem do Personagem (à direita) */}
        <div className="col-span-3">
          <Image src={game.characterImg} alt="Character" width={350} height={500} />
        </div>

      </div>
    </div>
  );
}