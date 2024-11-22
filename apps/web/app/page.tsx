import AppBar from "../components/appbar";
import Hero from "../components/hero";
import HeroVideo from "../components/heroVideo";

export default function Home() {
  return (
    <main className="bg-background">
      <AppBar />
      <div className="max-w-full justify-items-center">
        <Hero />
        <HeroVideo />
      </div>
    </main>
  );
}
