
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
      'Celeste é um jogo indie lançado em 2018 que rapidamente conquistou a atenção da comunidade de jogadores e críticos. Desenvolvido pela Maddy Makes Games, o jogo é uma obra-prima de plataforma que combina desafio, narrativa emocional e uma trilha sonora cativante para criar uma experiência única.',
      'O enredo de Celeste segue a jornada de Madeline, uma jovem mulher que decide escalar a misteriosa montanha Celeste.',
    ],
    details: {
      releaseDate: '25 jan, 2018',
      developer: 'Maddy Makes Games Inc.',
      publisher: 'Maddy Makes Games Inc.',
      tags: 'Pixels, Plataforma, 2D',
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
      tags: 'Pixels, RPG, 2D',
    },
    images: ['/assets/undertale_img1.png', '/assets/undertale_img2.png', '/assets/undertale_img3.png'],
    videoUrl: 'https://www.youtube.com/embed/1Hojv0m3TqA',
  },

  {
    slug: 'lifeisstrange',
    title: 'Life is Strange',
    backgroundImage: '/assets/lis-background.jpg',
    cardImage: '/assets/lis-caurosel.png',
    description: [
      'Life is Strange é um jogo de escolhas, onde acompanhos Max uma garota que muda de cidade para cursar Artes na universidade mais renomada de Arcadia Bay, e lá em uma situação estranha ela reencontra uma velha amiga porém vê ela sendo baleada e talvez pelo seu apelo tão grande para ela sobreviver ela desenvolve o poder de voltar no tempo e seguimos o jogo acompanhando a vida da Max agora com poder de voltar no tempo para conseguir evitar o efeito borboleta que salvar a amiga dela ocasionou. Confira o trailer do jogo e se emocione jogando! '
    ],
    details: {
      releaseDate: '29 de janeiro de 2015',
      developer: 'DONTNOD Entertainment',
      publisher: 'Square Enix',
      tags: 'Viagem no Tempo, Episódico, Mistério',
    },
    images: ['/assets/lis1.jpg', '/assets/lis2.jpg', '/assets/lis-background2.jpg'],
    videoUrl: 'https://www.youtube.com/embed/mpRhaXfvG_0?si=IDa1DK6UavQijOWG',
  },

  {
    slug: 'hollowknight',
    title: 'Hollow Knight',
    backgroundImage: '/assets/hollow3.png',
    cardImage: '/assets/hollow-capa.png',
    description: [
      'Forje seu caminho em Hollow Knight! Uma aventura de ação épica em um vasto reino arruinado de insetos e heróis. Explore cavernas serpenteantes, lute contra criaturas malignas e alie-se a insetos bizarros num estilo clássico 2D desenhado à mão. '
    ],
    details: {
      releaseDate: '24 de fevereiro de 2017',
      developer: 'Team Cherry',
      publisher: 'Team Cherry',
      tags: 'Plataforma, Metrodvania, 2D',
    },
    images: ['/assets/hk1.png', '/assets/hk2.png', '/assets/hk3.png'],
    videoUrl: 'https://www.youtube.com/embed/UAO2urG23S4?si=GRWd2eY6XN6StVMC',
  },

  {
    slug: 'cuphead',
    title: 'Cuphead',
    backgroundImage: '/assets/cuphead-background.jpg',
    cardImage: '/assets/Cuphead logo.png',
    description: [
      'Cuphead gira em torno dos irmãos Xicrinho (Cuphead) e Caneco (Mugman), que fazem um pacto com o Diabo após perderem em seu cassino. Para não entregarem suas almas, eles precisam coletar contratos de outros devedores para o Diabo, embarcando em uma aventura perigosa pelas Ilhas Tinteiro e enfrentando chefes inspirados em desenhos animados clássicos dos anos 1930 '
    ],
    details: {
      releaseDate: '29 de setembro de 2017',
      developer: 'Studio MDHR Entertainment',
      publisher: 'Studio MDHR Entertainment',
      tags: 'Cooperativo, Desenho Animado, 2D',
    },
    images: ['/assets/Cuphead 2.png', '/assets/Cuphead 3.png', '/assets/Cuphead 4.png'],
    videoUrl: 'https://www.youtube.com/embed/NN-9SQXoi50?si=0-_mIkxQY0mrIih8',
  },

  {
    slug: 'katanazero',
    title: 'Katana Zero',
    backgroundImage: '/assets/kz-background.png',
    cardImage: '/assets/kz-hero.png',
    description: [
      'um assassino com amnésia que manipula o tempo e usa habilidades de katana para desvendar seu passado. O jogador controla Zero, que precisa completar missões de assassinato, mas a história é contada de forma misteriosa, envolvendo escolhas de diálogo e elementos como a droga Cronos e o projeto governamental "Programa Nu".  '
    ],
    details: {
      releaseDate: '18 de abril de 2019',
      developer: 'Askiisoft',
      publisher: 'Devolver Digital',
      tags: 'Pixels, Ação, 2D',
    },
    images: ['/assets/kz1.jpg', '/assets/kz2.jpg', '/assets/kz3.png'],
    videoUrl: 'https://www.youtube.com/embed/CaBM1HPD9xI?si=cyqzrDohqC2xuSpG',
  },

  {
    slug: 'project_zomboid',
    title: 'Project Zomboid',
    backgroundImage: '/assets/zomboid_background.jpg',
    cardImage: '/assets/project.png',
    description: [
      'Project Zomboid é um jogo eletrônico de terror de sobrevivência isométrico de mundo aberto. Se passa em um mundo pós-apocalíptico infestado de zumbis, onde o jogador é desafiado a sobreviver o máximo possível antes de morrer inevitavelmente.'
    ],
    details: {
      releaseDate: '8 de novembro de 2013',
      developer: 'The Indie Stone',
      publisher: ' The Indie Stone',
      tags: 'Sobrevivência, Zumbis, Mundo Aberto',
    },
    images: ['/assets/zomboid1.png', '/assets/zomboid2.png', '/assets/zomboid3.png'],
    videoUrl: 'https://www.youtube.com/embed/nPbsDmzZ3Oc?si=dk9YlzGAMOTZDzE4',
  },

  {
    slug: 'gris',
    title: 'Gris',
    backgroundImage: '/assets/gris_background.png',
    cardImage: '/assets/Gris.png',
    description: [
      'Gris é uma jovem esperançosa, perdida em seu próprio mundo, que lida com uma dolorosa experiência. Sua jornada pela tristeza se manifesta em seu vestido, que concede a ela novas habilidades para navegar melhor por sua realidade desbotada.'
    ],
    details: {
      releaseDate: '13 de dezembro de 2018',
      developer: 'Nomada Studio',
      publisher: 'Devolver Digital',
      tags: '2D, Plataforma, Aventura',
    },
    images: ['/assets/Gris 1.png', '/assets/Gris 2.png', '/assets/Gris 3.png'],
    videoUrl: 'https://www.youtube.com/embed/xtWnBHG6dis?si=HG-doTEucUi5vW2d',
  },

  {
    slug: 'stardew_valley',
    title: 'Stardew Valley',
    backgroundImage: '/assets/st_background.png',
    cardImage: '/assets/st_background.png',
    description: [
      'Você herdou a antiga fazenda do seu avô, em Stardew Valley. Com ferramentas de segunda-mão e algumas moedas, você parte para dar início a sua nova vida. Será que você vai aprender a viver da terra, a transformar esse matagal em um próspero lar?'
    ],
    details: {
      releaseDate: '13 de dezembro de 2018',
      developer: 'ConcernedApe',
      publisher: 'ConcernedApe',
      tags: '2D, Simulação, Pixels',
    },
    images: ['/assets/img1st.png', '/assets/img2st.png', '/assets/img3st.png'],
    videoUrl: 'https://www.youtube.com/embed/ot7uXNQskhs?si=mxQLT0LewEyrJHmR',
  },

  {
    slug: 'until_then',
    title: 'Until Then',
    backgroundImage: '/assets/ut_background.png',
    cardImage: '/assets/ut_background.png',
    description: [
      'Um fatídico encontro desencadeia um efeito dominó, revirando a vida de Mark. Pessoas somem e as memórias se mostram incertas. Revele uma verdade oculta com Mark e seus amigos nesta narrativa de aventura e corra para resolver o mistério antes que seja tarde demais.'
    ],
    details: {
      releaseDate: '25 de junho de 2024',
      developer: 'Polychroma Games',
      publisher: 'Maximum Entertainment',
      tags: '2D, Visual Novel, Pixels, Aventura',
    },
    images: ['/assets/ut_img1.png', '/assets/ut_img2.png', '/assets/ut_img3.png'],
    videoUrl: 'https://www.youtube.com/embed/2_dBTwoCcD4?si=33BP4BXEQZkZ4I4v',
  },

  {
    slug: 'outer_wilds',
    title: 'Outer Wilds',
    backgroundImage: '/assets/ow_background.png',
    cardImage: '/assets/outerwilds.png',
    description: [
      'Outer Wilds é um jogo de mistério de mundo aberto aclamado pela crítica que retrata um sistema solar fadado a um loop temporal perpétuo.'
    ],
    details: {
      releaseDate: '18 de junho de 2020',
      developer: 'Mobius Digital',
      publisher: 'Annapurna Interactive',
      tags: '3D, Mundo Aberto, Exploração, Aventura',
    },
    images: ['/assets/ow_img1.png', '/assets/ow_img2.png', '/assets/ow_img3.png'],
    videoUrl: 'https://www.youtube.com/embed/ZKJUMMCJvGM?si=OhJEeeG4lIsvE77I',
  },
  
  
  // Adicione os outros jogos (Hollow Knight, etc.) aqui
];