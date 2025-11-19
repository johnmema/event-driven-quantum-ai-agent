import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

import { logoutAction } from "@/app/auth/actions";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getSupabaseServerClient } from "@/lib/supabase";
import type { Tables } from "@/types/database";

export const metadata: Metadata = {
  title: "Dashboard | Playbill Picks",
};

type ShowRow = Tables<"shows">;

type TrackedShow = {
  id: string | number;
  title: string;
  posterUrl: string;
  note: string;
  slug?: string | null;
  placeholder?: boolean;
};

const FALLBACK_POSTER = "/Wicked.webp";

const PLACEHOLDER_TRACKED_SHOWS: TrackedShow[] = [
  {
    id: "placeholder-1",
    title: "Wicked",
    posterUrl: "/Wicked.webp",
    note: "Placeholder: connect this card to each user's saved lotteries.",
    placeholder: true,
  },
  {
    id: "placeholder-2",
    title: "Chicago",
    posterUrl: "/Dorian_Gray.webp",
    note: "Placeholder: replace with live preference data.",
    placeholder: true,
  },
  {
    id: "placeholder-3",
    title: "Moulin Rouge!",
    posterUrl: "/Wicked.webp",
    note: "Placeholder: wired up to Supabase `user_shows` later.",
    placeholder: true,
  },
];

type SupabaseServerClient = NonNullable<
  Awaited<ReturnType<typeof getSupabaseServerClient>>
>;

export default async function DashboardPage() {
  const supabase = await getSupabaseServerClient();

  if (!supabase) {
    redirect("/");
  }

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (!user || userError) {
    redirect("/");
  }

  const trackedShows = await loadTrackedShows(supabase);
  const todayLabel = formatCurrentDate();
  const greetingName =
    extractFirstName(user.user_metadata?.full_name) ?? user.email ?? "friend";

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 text-black md:px-6 lg:px-0">
      <DashboardHeader name={greetingName} email={user.email} />
      <main className="mt-8 flex flex-col gap-8">
        <section
          id="overview"
          className="flex flex-wrap items-start gap-4 rounded-3xl border border-black/10 bg-white/80 px-6 py-6 shadow-sm"
        >
          <div className="space-y-1">
            <p className="text-black/70">Welcome back, {greetingName}.</p>
            <h1 className="font-instrument-serif text-4xl font-semibold md:text-5xl">
              Lottery dashboard
            </h1>
          </div>
          <div className="ml-auto text-right">
            <p className="text-sm uppercase tracking-wide text-black/50">
              Today
            </p>
            <p className="font-instrument-serif text-2xl">{todayLabel}</p>
          </div>
        </section>

        <section id="automation">
          <Card className="border-black/20 bg-white">
            <CardHeader className="pb-4">
              <CardTitle>Automation status</CardTitle>
              <CardDescription>
                Your daily show lotteries are now automated—we&apos;ll enter you
                for each show every morning at 9:00 AM ET and email you if you
                hit.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap items-center gap-4 pt-0">
              <div className="rounded-2xl bg-[#4b8afe]/10 px-4 py-3 text-sm font-medium text-[#1a2a52]">
                Placeholder: add live task status + last submission timestamp.
              </div>
              <Button
                type="button"
                variant="outline"
                className="rounded-full border-black/20 bg-white/90 text-lg text-black"
              >
                Manage entry schedule
              </Button>
            </CardContent>
          </Card>
        </section>

        <section id="shows">
          <Card className="border-black/20 bg-white">
            <CardHeader>
              <div className="flex flex-wrap items-start gap-2">
                <div className="flex-1 space-y-2">
                  <CardTitle>Your automated shows</CardTitle>
                  <CardDescription>
                    Placeholder: swap this list with the specific shows each
                    user follows once the Supabase relation is ready.
                  </CardDescription>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  className="rounded-full border-black/20 bg-white/90 text-sm text-black"
                >
                  Edit shows
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {trackedShows.map((show) => (
                <div
                  key={show.id}
                  className="flex flex-wrap items-center gap-4 rounded-3xl border border-black/10 bg-white/90 p-4"
                >
                  <div className="relative h-20 w-16 overflow-hidden rounded-2xl bg-black/5">
                    <Image
                      src={show.posterUrl}
                      alt={show.title}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="font-instrument-serif text-2xl">
                      {show.title}
                    </p>
                    <p className="text-sm text-black/60">{show.note}</p>
                    {show.placeholder ? (
                      <p className="text-xs uppercase tracking-wide text-black/40">
                        Placeholder data
                      </p>
                    ) : null}
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    className="rounded-full border border-transparent px-4 text-sm text-black hover:border-black/10 hover:bg-black/5"
                  >
                    View details
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}

async function loadTrackedShows(
  supabase: SupabaseServerClient,
): Promise<TrackedShow[]> {
  const { data, error } = await supabase
    .from("shows")
    .select("id,title,slug,poster_url")
    .order("priority", { ascending: true, nullsFirst: true })
    .limit(6);

  if (error || !data || data.length === 0) {
    return PLACEHOLDER_TRACKED_SHOWS;
  }

  return data.map((show: ShowRow) => ({
    id: show.id,
    title: show.title,
    slug: show.slug,
    posterUrl: show.poster_url ?? FALLBACK_POSTER,
    note: "Auto-entry scheduled • Placeholder until `user_shows` exists.",
  }));
}

function formatCurrentDate(date: Date = new Date()) {
  const day = date.getDate();
  const suffix = getOrdinalSuffix(day);
  const monthFormatter = new Intl.DateTimeFormat("en-US", {
    month: "long",
  });
  return `${day}${suffix} of ${monthFormatter.format(date)}`;
}

function getOrdinalSuffix(day: number) {
  if (day >= 11 && day <= 13) return "th";
  const lastDigit = day % 10;
  switch (lastDigit) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

function extractFirstName(fullName?: unknown) {
  if (typeof fullName !== "string") return null;
  const trimmed = fullName.trim();
  if (!trimmed) return null;
  return trimmed.split(" ")[0];
}

type DashboardHeaderProps = {
  name: string;
  email?: string | null;
};

function DashboardHeader({ name, email }: DashboardHeaderProps) {
  const initial = getInitial(name, email);

  return (
    <header className="flex flex-wrap items-center gap-6 rounded-3xl border border-black/10 bg-white/90 px-6 py-4 shadow-sm">
      <div className="font-instrument-serif text-3xl font-bold text-black underline">
        <Link href="/">Playbill Picks</Link>
      </div>

      <nav className="flex flex-1 items-center justify-center gap-6 font-instrument-serif text-2xl text-black">
        <Link href="/dashboard" className="hover:underline">
          My shows
        </Link>
        <Link href="/profile" className="hover:underline">
          My profile
        </Link>
      </nav>

      <div className="ml-auto flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-2 rounded-2xl border border-black/10 bg-white px-2 py-2">
          <Avatar className="h-10 w-10 bg-[#4b8afe]/20 text-black">
            <AvatarFallback className="font-semibold text-black">
              {initial}
            </AvatarFallback>
          </Avatar>
          <div className="text-left leading-tight">
            <p className="font-instrument-serif text-xs uppercase tracking-wide text-black/50">
              Signed in as
            </p>
            <p className="font-instrument-serif text-lg">{name}</p>
          </div>
        </div>
        <form action={logoutAction}>
          <Button
            type="submit"
            className="rounded-full bg-[#ffef5c] text-black shadow-[2px_2px_0_#4285f4]"
          >
            Log out
          </Button>
        </form>
      </div>
    </header>
  );
}

function getInitial(name?: string, email?: string | null) {
  if (name && name.trim().length > 0) {
    return name.trim().charAt(0).toUpperCase();
  }

  if (email) {
    return email.charAt(0).toUpperCase();
  }

  return "P";
}
