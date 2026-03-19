import Link from "next/link";
import { ArrowRight, BadgeCheck, CalendarHeart, MicVocal, Sparkles, UtensilsCrossed } from "lucide-react";

import { Button } from "@/components/ui/button";
import { partyPlaces } from "@/data";
import { formatNumber, getFacilityCounts, getProvinceSummary, getVenueStats } from "@/lib/party-utils";

const stats = getVenueStats(partyPlaces);
const facilities = getFacilityCounts(partyPlaces, 10);
const provinceSummary = getProvinceSummary(partyPlaces);

const servicePackages = [
  {
    name: "Wedding & Reception Planning",
    description: "Focuses on higher-capacity venues with stage, parking, and all-day flow support.",
    icon: CalendarHeart,
    matchCount: partyPlaces.filter((place) => place.capacity >= 450).length,
    tone: "from-rose-50 to-orange-50",
  },
  {
    name: "Birthday & Family Celebrations",
    description: "Flexible halls and cozy setups for private events with essential convenience facilities.",
    icon: Sparkles,
    matchCount: partyPlaces.filter((place) => place.capacity < 450).length,
    tone: "from-sky-50 to-indigo-50",
  },
  {
    name: "Corporate & Formal Events",
    description: "Venue options with sound, projection, stage, and structured seating capacities.",
    icon: MicVocal,
    matchCount: partyPlaces.filter((place) =>
      place.facilities.some((facility) =>
        ["Projector", "Sound System", "Stage", "Live Counter"].includes(facility)
      )
    ).length,
    tone: "from-emerald-50 to-cyan-50",
  },
];

export default function ServicesPage() {
  return (
    <main className="brand-page-bg min-h-screen text-foreground">
      <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <header className="rounded-3xl border border-white/60 bg-white/80 p-6 shadow-xl backdrop-blur-xl sm:p-8 lg:p-10">
          <p className="inline-flex rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-white">
            PartyPlace Services
          </p>
          <h1 className="mt-4 text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
            Services Built Around Real Venue Data
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
            Our services are mapped from live venue attributes in Nepal: coverage by province,
            popular facilities, capacity ranges, and rating trends. This helps planners pick faster
            and coordinate with more confidence.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/contact">Request Consultation</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/">Browse Venues</Link>
            </Button>
          </div>
        </header>

        <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Total Venues</p>
            <p className="mt-2 text-3xl font-black">{stats.totalVenues}</p>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Cities Covered</p>
            <p className="mt-2 text-3xl font-black">{stats.cityCount}</p>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Rating Baseline</p>
            <p className="mt-2 text-3xl font-black">{stats.avgRating.toFixed(1)} / 5</p>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Base Price Starts</p>
            <p className="mt-2 text-3xl font-black">Rs. {formatNumber(stats.minPrice)}</p>
          </article>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-bold tracking-tight">Service Packages</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {servicePackages.map((service) => {
              const Icon = service.icon;

              return (
                <article
                  key={service.name}
                  className={`rounded-2xl border border-slate-200 bg-linear-to-br ${service.tone} p-5 shadow-sm`}
                >
                  <p className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700">
                    <Icon className="size-4" />
                    Package
                  </p>
                  <h3 className="mt-3 text-lg font-bold leading-snug">{service.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{service.description}</p>
                  <p className="mt-4 inline-flex rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
                    {service.matchCount} matching venues
                  </p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="mt-10 grid gap-4 lg:grid-cols-2">
          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold tracking-tight">Most Common Venue Facilities</h2>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {facilities.map((facility) => (
                <li key={facility.name} className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50 px-3 py-2">
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-slate-800">
                    <UtensilsCrossed className="size-4 text-emerald-600" />
                    {facility.name}
                  </span>
                  <span className="text-xs font-semibold text-slate-600">{facility.count} venues</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold tracking-tight">Province-Level Coverage</h2>
            <ul className="mt-4 space-y-2">
              {provinceSummary.map((item) => (
                <li key={item.province} className="rounded-lg border border-slate-100 bg-slate-50 px-3 py-2">
                  <p className="flex items-center justify-between text-sm font-semibold text-slate-800">
                    <span>{item.province}</span>
                    <span>{item.venues} venues</span>
                  </p>
                  <p className="mt-1 text-xs text-slate-600">
                    Capacity {formatNumber(item.capacity)}+ | Avg rating {item.avgRating.toFixed(1)} / 5
                  </p>
                </li>
              ))}
            </ul>
          </article>
        </section>

        <section className="mt-10 rounded-3xl border border-slate-200 bg-slate-900 p-6 text-white shadow-lg sm:p-8">
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-300">
            <BadgeCheck className="size-4 text-emerald-400" />
            Ready To Plan
          </p>
          <h2 className="mt-3 text-2xl font-black">Need help choosing the right package?</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
            Tell us your event type and expected guest count. We will shortlist suitable venues from our data-backed listing.
          </p>
          <Button asChild className="mt-5 bg-white text-slate-900 hover:bg-slate-200">
            <Link href="/contact">
              Contact PartyPlace <ArrowRight className="size-4" />
            </Link>
          </Button>
        </section>
      </section>
    </main>
  );
}
