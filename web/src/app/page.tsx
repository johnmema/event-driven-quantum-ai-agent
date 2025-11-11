import { AboutUs } from "@/components/AboutUs";
import { FAQ } from "@/components/FAQ";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ShowsRow } from "@/components/ShowsRow";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex flex-col items-center justify-center w-full">
        <Hero />
        <ShowsRow />
        <FAQ />
        <AboutUs />
      </main>
    </div>
  );
}
