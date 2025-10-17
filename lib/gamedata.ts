// lib/gameData.ts

export interface GameData {
  slug: string;
  title: string;
  backgroundImage: string; // A nova imagem de fundo
  description: string[]; 
  details: {
    releaseDate: string;
    developer: string;
    publisher: string;
    tags: string;
  };
  images: string[];
  videoUrl: string;
}

// O nosso "banco de dados"
export const gamesData: GameData[] = [
  {
    slug: 'life-is-strange',
    title: 'LIFE IS STRANGE',
    backgroundImage: '/assets/lis-background2.jpg', // Imagem de fundo
    description: [
      'Life is Strange é um jogo de escolhas, onde acompanhos Max uma garota que muda de cidade para cursar Artes na universidade mais renomada nessa área em ..., e lá em uma situação "estranha" ela reencontra uma velha amiga porém vê ela sendo baleada e talvez pelo seu apelo tão grande para ela sobreviver ela desenvolve o poder de voltar no tempo e seguimos o jogo acompanhando a vida da Max agora com poder de voltar no tempo para conseguir evitar o efeito borboleta que salvar a amiga dela ocasionou!',
    ],
    details: { // Adicionei detalhes de exemplo
      releaseDate: '30 jan, 2015',
      developer: 'Dontnod Entertainment',
      publisher: 'Square Enix',
      tags: 'Escolhas importam, Aventura, Mistério',
    },
    images: [
      '/assets/lis1.jpg', //
      '/assets/lis2.jpg', //
      '/assets/lis-background.jpg', //
    ],
    videoUrl: 'https://www.youtube.com/embed/mpRhaXfvG_0', //
  },
  {
    slug: 'celeste',
    title: 'Celeste',
    backgroundImage: '/assets/celeste_background.png', // ADICIONE UMA IMAGEM DE FUNDO
    description: [
      '"Celeste" é um jogo indie lançado em 2018 que rapidamente conquistou a atenção da comunidade de jogadores e críticos. Desenvolvido pela Maddy Makes Games, o jogo é uma obra-prima de plataforma que combina desafio, narrativa emocional e uma trilha sonora cativante para criar uma experiência única.',
      'O enredo de "Celeste" segue a jornada de Madeline, uma jovem mulher que decide escalar a misteriosa montanha Celeste.',
    ],
    details: {
      releaseDate: '25 jan, 2018',
      developer: 'Maddy Makes Games Inc.',
      publisher: 'Maddy Makes Games Inc.',
      tags: 'Pixel, Plataformas e precisão, 2D',
    },
    images: ['/assets/celeste_img1.png', '/assets/celeste_img2.png', '/assets/celeste_img3.png'],
    videoUrl: 'https://www.youtube.com/embed/FqBj2IGg6Uw',
  },
  // Adicione os outros jogos (Hollow Knight, etc.) aqui
];