import Link from "next/link";
import { Mail, MapPin, PhoneCall, Sparkles } from "lucide-react";

import { partyPlaces } from "@/data";
import { formatNumber, getTopCities, getVenueStats } from "@/lib/party-utils";

const stats = getVenueStats(partyPlaces);
const topCities = getTopCities(partyPlaces, 6);
const year = new Date().getFullYear();

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background/70 text-foreground">
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="brand-panel rounded-3xl p-5 shadow-md sm:p-7">
          <p className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary-foreground">
            <Sparkles className="size-3.5" />
            PartyPlace Nepal
          </p>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <article className="brand-soft-card rounded-xl p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-foreground/70">Listed Venues</p>
              <p className="mt-2 text-2xl font-black text-foreground">{stats.totalVenues}</p>
            </article>
            <article className="brand-soft-card rounded-xl p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-foreground/70">Cities Covered</p>
              <p className="mt-2 text-2xl font-black text-foreground">{stats.cityCount}</p>
            </article>
            <article className="brand-soft-card rounded-xl p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-foreground/70">Capacity Reach</p>
              <p className="mt-2 text-2xl font-black text-foreground">{formatNumber(stats.totalCapacity)}+</p>
            </article>
            <article className="brand-soft-card rounded-xl p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-foreground/70">Average Rating</p>
              <p className="mt-2 text-2xl font-black text-foreground">{stats.avgRating.toFixed(1)} / 5</p>
            </article>
          </div>
        </section>

        <section className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <article>
            <h2 className="text-sm font-black uppercase tracking-[0.14em] text-foreground">PartyPlace</h2>
            <p className="mt-3 text-sm leading-7 text-foreground/75">
              Venue discovery built for Nepal. Compare capacity, pricing, and facilities quickly,
              then contact places directly.
            </p>
          </article>

          <article>
            <h2 className="text-sm font-black uppercase tracking-[0.14em] text-foreground">Quick Links</h2>
            <ul className="mt-3 space-y-2 text-sm font-medium text-foreground/80">
              <li><Link href="/" className="hover:text-primary">Home</Link></li>
              <li><Link href="/about" className="hover:text-primary">About</Link></li>
              <li><Link href="/services" className="hover:text-primary">Services</Link></li>
              <li><Link href="/contact" className="hover:text-primary">Contact</Link></li>
              <li><Link href="/signin" className="hover:text-primary">Sign In</Link></li>
              <li><Link href="/registration" className="hover:text-primary">Register</Link></li>
            </ul>
          </article>

          <article>
            <h2 className="text-sm font-black uppercase tracking-[0.14em] text-foreground">Top Cities</h2>
            <ul className="mt-3 space-y-2 text-sm text-foreground/80">
              {topCities.map((city) => (
                <li key={city.city} className="brand-soft-card flex items-center justify-between rounded-lg px-3 py-1.5">
                  <span className="font-medium">{city.city}</span>
                  <span className="text-xs text-foreground/65">{city.count} venues</span>
                </li>
              ))}
            </ul>
          </article>

          <article>
            <h2 className="text-sm font-black uppercase tracking-[0.14em] text-foreground">Contact</h2>
            <ul className="mt-3 space-y-2 text-sm text-foreground/80">
              <li className="inline-flex items-center gap-2">
                <PhoneCall className="size-4 text-secondary" />
                +977-9801000000
              </li>
              <li className="inline-flex items-center gap-2">
                <Mail className="size-4 text-primary" />
                hello@partyplace.com
              </li>
              <li className="inline-flex items-center gap-2">
                <MapPin className="size-4 text-primary" />
                Kathmandu, Nepal
              </li>
            </ul>
          </article>
        </section>

        <section className="mt-8 flex flex-col gap-2 border-t border-border pt-4 text-xs text-foreground/65 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} PartyPlace. All rights reserved.</p>
          <p>Built for planners, families, and event hosts across Nepal.</p>
        </section>
      </div>
    </footer>
  );
}
