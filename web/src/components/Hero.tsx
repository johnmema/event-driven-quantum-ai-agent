import Link from "next/link";
import { Button } from "./ui/button";

export function Hero() {
  return (
    <section className="w-full py-8 sm:py-12 md:py-16 lg:py-24">
      <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
        {/* Left section - Text content (70% on desktop) */}
        <div className="flex flex-col items-start gap-4 sm:gap-6 md:gap-8 w-full md:w-[70%]">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal leading-tight">
            Never Miss a Broadway Lottery Again
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-black/80 font-normal leading-snug">
            Automatic daily entries for all Broadway lotteries
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 mt-2 sm:mt-4 w-full sm:w-auto">
            <Link href="/whats-on" className="btn-primary">
              Try it now
            </Link>
            <Link href="/auth/register" className="btn-primary hidden md:inline-block">
              Create Free Account
            </Link>
          </div>
        </div>

        {/* Right section - Image (30% on desktop, hidden on mobile) */}
        <div className="hidden md:flex w-[30%] items-center justify-center">
          <div className="w-full aspect-square bg-gray-200 rounded-lg flex items-center justify-center text-gray-400">
            Image placeholder
          </div>
        </div>
      </div>
    </section>
  );
}
