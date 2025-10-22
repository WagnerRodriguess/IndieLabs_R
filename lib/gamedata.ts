
export interface GameData {
  slug: string;
  title: string;
  backgroundImage: string;
  cardImage: string;
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

export const gamesData: GameData[] = [
  {
    slug: 'celeste',
    title: 'Celeste',
    backgroundImage: '/assets/celeste_background.png',
    cardImage: '/assets/celeste.png',
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

  {
    slug: 'undertale',
    title: 'Undertale',
    backgroundImage: '/assets/undertale_background.png',
    cardImage: '/assets/undertale.png',
    description: [
      'Undertale é um RPG eletrônico criado pelo desenvolvedor independente norte-americano Toby Fox. Nele, o jogador pode controlar uma criança humana que caiu em uma caverna no subsolo de uma montanha, uma região grande e isolada sob a superfície da Terra, separada por uma barreira mágica.'
    ],
    details: {
      releaseDate: '15 de setembro de 2015',
      developer: 'Toby Fox',
      publisher: 'Toby Fox',
      tags: 'Pixel, RPG, 2D',
    },
    images: ['/assets/undertale_img1.png', '/assets/undertale_img2.png', '/assets/undertale_img3.png'],
    videoUrl: 'https://www.youtube.com/embed/1Hojv0m3TqA',
  },
  
  // Adicione os outros jogos (Hollow Knight, etc.) aqui
];