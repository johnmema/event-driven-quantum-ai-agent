"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import type { Tables } from "@/types/database";

type ShowRow = Tables<"shows">;
type ShowCard = Pick<ShowRow, "id" | "title" | "slug"> & {
  poster_url: string;
};

const FALLBACK_POSTER = "/Wicked.webp";

const FALLBACK_SHOWS: ShowCard[] = [
  { id: 1, title: "Wicked", slug: "wicked", poster_url: "/Wicked.webp" },
  {
    id: 2,
    title: "Dorian Gray",
    slug: "dorian-gray",
    poster_url: "/Dorian_Gray.webp",
  },
  {
    id: 3,
    title: "The Lion King",
    slug: "the-lion-king",
    poster_url: "/Wicked.webp",
  },
  {
    id: 4,
    title: "Chicago",
    slug: "chicago",
    poster_url: "/Dorian_Gray.webp",
  },
  {
    id: 5,
    title: "Moulin Rouge!",
    slug: "moulin-rouge",
    poster_url: "/Wicked.webp",
  },
  { id: 6, title: "Aladdin", slug: "aladdin", poster_url: "/Wicked.webp" },
];

export function ShowsRow() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [shows] = useState<ShowCard[]>(FALLBACK_SHOWS);
  
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const scrollInterval = setInterval(() => {
      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
        scrollContainer.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        scrollContainer.scrollBy({ left: 1, behavior: 'auto' });
      }
    }, 20);

    return () => {
      clearInterval(scrollInterval);
    };
  }, []);

  return (
    <section className="w-full py-8 sm:py-10 md:py-12" id="whats-on">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-black mb-6 sm:mb-8">
        Currently on Broadway{" "}
        <span className="italic text-gray-400">(& Beyond)</span>
      </h2>
      <div ref={scrollRef} className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 scrollbar-hide -mx-4 sm:mx-0 px-4 sm:px-0 pointer-events-none">
        {shows.map((show) => (
          <div
            key={show.id}
            className="shrink-0 w-[200px] sm:w-[240px] md:w-[280px] lg:w-[300px]"
          >
            <div className="relative aspect-square rounded-md overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
              <Image
                src={show.poster_url}
                alt={show.title}
                fill
                className="object-cover"
                sizes="300px"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
