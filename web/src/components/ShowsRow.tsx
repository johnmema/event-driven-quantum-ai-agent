import Image from "next/image";
import Link from "next/link";

interface Show {
  id: number;
  title: string;
  path: string;
}

const mockShows: Show[] = [
  { id: 1, title: "Wicked", path: "/Wicked.webp" },
  { id: 2, title: "Dorian Gray", path: "/Dorian_Gray.webp" },
  { id: 3, title: "The Lion King", path: "/Wicked.webp" },
  { id: 4, title: "Chicago", path: "/Dorian_Gray.webp" },
  { id: 5, title: "Moulin Rouge!", path: "/Wicked.webp" },
  { id: 6, title: "Aladdin", path: "/Wicked.webp" },
];

export function ShowsRow() {
  return (
    <section className="w-full py-12" id="whats-on">
      <h2 className="font-instrument-serif text-3xl md:text-4xl font-bold text-black mb-8">
        Currently on Broadway{" "}
        <span className="italic text-gray-400">(& Beyond)</span>
      </h2>
      <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
        {mockShows.map((show) => (
          <Link
            key={show.id}
            href={`/shows/${show.id}`}
            className="group shrink-0 snap-start w-[300px]"
          >
            <div className="relative aspect-square rounded-md overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
              <Image
                src={show.path}
                alt={show.title}
                fill
                className="object-cover"
                sizes="300px"
              />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
