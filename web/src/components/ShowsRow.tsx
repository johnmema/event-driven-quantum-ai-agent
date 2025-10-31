import Image from 'next/image'
import Link from 'next/link'

const mockShows = [
  { id: 1, title: 'Wicked' },
  { id: 2, title: 'Hamilton' },
  { id: 3, title: 'The Lion King' },
  { id: 4, title: 'Chicago' },
  { id: 5, title: 'Moulin Rouge!' },
  { id: 6, title: 'Aladdin' },
]

export function ShowsRow() {
  return (
    <section className="w-full py-12">
      <h2 className="font-instrument-serif text-3xl md:text-4xl font-bold text-black mb-8">
        Currently on Broadway (& Beyond)
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {mockShows.map((show) => (
          <Link key={show.id} href={`/shows/${show.id}`} className="group block">
            <div className="aspect-[3/4] bg-gray-200 rounded-md overflow-hidden shadow-sm hover:shadow-lg transition-shadow flex items-center justify-center">
              <span className="text-gray-500 text-xs text-center px-2">{show.title}</span>
            </div>
            <p className="mt-2 text-sm font-inter text-black text-center group-hover:opacity-70 transition-opacity">
              {show.title}
            </p>
          </Link>
        ))}
      </div>
    </section>
  )
}
