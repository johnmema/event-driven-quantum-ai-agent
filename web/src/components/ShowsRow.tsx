import Image from "next/image";
import Link from "next/link";

import { getSupabaseServerClient } from "@/lib/supabase";
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

async function loadShows(): Promise<ShowCard[]> {
  const supabase = await getSupabaseServerClient();

  if (!supabase) return FALLBACK_SHOWS;

  const { data, error } = await supabase
    .from("shows")
    .select("id,title,slug,poster_url,priority")
    .order("priority", { ascending: true, nullsFirst: true })
    .limit(12);

  if (error) {
    console.error("Failed to load shows from Supabase", error.message);
    return FALLBACK_SHOWS;
  }

  if (!data || data.length === 0) return FALLBACK_SHOWS;

  return data.map((show: ShowCard) => ({
    id: show.id,
    title: show.title,
    slug: show.slug,
    poster_url: show.poster_url ?? FALLBACK_POSTER,
  }));
}

export async function ShowsRow() {
  const shows = await loadShows();

  return (
    <section className="w-full py-12" id="whats-on">
      <h2 className="font-instrument-serif text-3xl md:text-4xl font-bold text-black mb-8">
        Currently on Broadway{" "}
        <span className="italic text-gray-400">(& Beyond)</span>
      </h2>
      <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
        {shows.map((show) => (
          <Link
            key={show.id}
            href={`/shows/${show.slug ?? show.id}`}
            className="group shrink-0 snap-start w-[300px]"
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
          </Link>
        ))}
      </div>
    </section>
  );
}
