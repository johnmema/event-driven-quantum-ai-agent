import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function Hero() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center w-full py-12">
      {/* Left: Pole image */}
      <div className="relative w-full h-[400px] md:h-[500px]">
        <Image
          src="/pole.png"
          alt="Times Square Broadway street sign"
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* Right: Text + CTAs */}
      <div className="flex flex-col items-start gap-6 text-center md:text-left">
        <h1 className="font-instrument-serif text-5xl md:text-6xl font-bold text-black leading-tight">
          Never Miss a Broadway Lottery Again
        </h1>
        <p className="font-inter text-lg md:text-xl text-black max-w-md">
          Automatic daily entries for all Broadway lotteries
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            asChild
            className="bg-yellow-cta text-black font-semibold px-6 py-3 rounded-md hover:bg-yellow-300 transition-colors"
          >
            <Link href="/whats-on">Try it now</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-yellow-cta text-black font-semibold px-6 py-3 rounded-md hover:bg-yellow-cta hover:text-black transition-colors"
          >
            <Link href="/auth/login">Create Free Account</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
