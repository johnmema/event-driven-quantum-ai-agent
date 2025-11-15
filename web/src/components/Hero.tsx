import Link from "next/link";
import { Button } from "./ui/button";

export function Hero() {
  return (
    <section className="w-full md:py-24 py-12">
      <div className="mx-auto max-w-6xl px-6 flex flex-col items-start gap-8">
        <h1
          className="text-5xl md:text-7xl font-medium text-black leading-tight"
          style={{ fontFamily: "Instrument Serif, serif" }}
        >
          Never Miss a Broadway Lottery Again
        </h1>
        <p
          className="text-2xl md:text-4xl text-black"
          style={{ fontFamily: "Instrument Serif, serif" }}
        >
          Automatic daily entries for all Broadway lotteries
        </p>
        <div className="flex flex-wrap gap-4 mt-4">
          <Button asChild>
            <Link href="/whats-on">Try it now</Link>
          </Button>
          <Button asChild>
            <Link href="/auth/register">Create Free Account</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
