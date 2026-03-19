import Link from "next/link";
import { Building2, CircleCheckBig, ArrowRight, Sparkles, Star, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { partyPlaces } from "@/data";
import { formatNumber, getTopCities, getVenueStats } from "@/lib/party-utils";

const stats = getVenueStats(partyPlaces);
const topCities = getTopCities(partyPlaces, 8);

export default function AboutPage() {
  return (
    <main className="brand-page-bg min-h-screen text-foreground">
      <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <header className="rounded-3xl border border-white/60 bg-white/75 p-6 shadow-xl backdrop-blur-xl sm:p-8 lg:p-10">
          <p className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-white">
            <Sparkles className="size-3.5" />
            About PartyPlace
          </p>
          <h1 className="mt-4 max-w-3xl text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
            Helping People Discover Trusted Party Venues Across Nepal
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
            PartyPlace is a local-first venue discovery platform focused on practical details: city,
            capacity, pricing, ratings, and contact access. We make event planning faster by turning
            scattered venue information into one clean search experience.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/services">Explore Services</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/contact">Contact Team</Link>
            </Button>
          </div>
        </header>

        <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Venues Listed</p>
            <p className="mt-2 text-3xl font-black text-slate-900">{stats.totalVenues}</p>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Province Reach</p>
            <p className="mt-2 text-3xl font-black text-slate-900">{stats.provinceCount}</p>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Combined Capacity</p>
            <p className="mt-2 text-3xl font-black text-slate-900">{formatNumber(stats.totalCapacity)}+</p>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Average Rating</p>
            <p className="mt-2 text-3xl font-black text-slate-900">{stats.avgRating.toFixed(1)} / 5</p>
          </article>
        </section>

        <section className="mt-10 grid gap-4 lg:grid-cols-3">
          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
            <h2 className="text-xl font-bold tracking-tight">What We Focus On</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                <p className="inline-flex items-center gap-2 text-sm font-semibold text-slate-800">
                  <Building2 className="size-4 text-sky-600" /> Trusted Venue Data
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  We organize practical fields like capacity, city, province, and contact details so users can make quick decisions.
                </p>
              </div>
              <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                <p className="inline-flex items-center gap-2 text-sm font-semibold text-slate-800">
                  <Users className="size-4 text-emerald-600" /> Event-Centered Search
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  From small birthdays to high-capacity receptions, you can filter and compare options in one place.
                </p>
              </div>
              <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                <p className="inline-flex items-center gap-2 text-sm font-semibold text-slate-800">
                  <Star className="size-4 text-amber-600" /> Quality Signal
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Ratings and featured picks help highlight places with strong fit for celebrations and receptions.
                </p>
              </div>
              <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                <p className="inline-flex items-center gap-2 text-sm font-semibold text-slate-800">
                  <CircleCheckBig className="size-4 text-violet-600" /> Fast Contact
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Direct phone actions reduce delay and help families or planners contact venues immediately.
                </p>
              </div>
            </div>
          </article>

          <aside className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold tracking-tight">Top Covered Cities</h2>
            <ul className="mt-4 space-y-2 text-sm">
              {topCities.map((city) => (
                <li key={city.city} className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50 px-3 py-2">
                  <span className="font-medium text-slate-800">{city.city}</span>
                  <span className="text-slate-600">{city.count} venues</span>
                </li>
              ))}
            </ul>
            <Button asChild className="mt-5 w-full">
              <Link href="/">
                Back To Home <ArrowRight className="size-4" />
              </Link>
            </Button>
          </aside>
        </section>
      </section>
    </main>
  );
}
