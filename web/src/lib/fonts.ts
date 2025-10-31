import { Instrument_Serif, Inter } from 'next/font/google'

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  variable: '--font-instrument-serif',
  weight: '400',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export { instrumentSerif, inter }
