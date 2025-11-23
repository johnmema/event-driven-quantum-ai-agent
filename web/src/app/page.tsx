import { AboutUs } from "@/components/AboutUs";
import { FAQ } from "@/components/FAQ";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ShowsRow } from "@/components/ShowsRow";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex flex-col w-full">
        <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 md:px-8">
          <Hero />
          <ShowsRow />
          <FAQ />
          <AboutUs />
        </div>
      </main>
    </div>
  );
}
