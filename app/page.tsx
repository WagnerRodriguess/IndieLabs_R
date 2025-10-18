import Hero from '../components/Hero';
import GameCarousel from '../components/GameCarousel';

export default function Home() {
  return (
    <main className="flex-grow">
      <Hero />
      <GameCarousel />
    </main>
  );
}