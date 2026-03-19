import Link from "next/link";
import Image from "next/image";
import { Mail, MapPinned, Phone, Send, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { partyPlaces } from "@/data";
import { formatNumber, getProvinceSummary } from "@/lib/party-utils";

const topRated = [...partyPlaces].sort((a, b) => b.rating - a.rating).slice(0, 6);
const provinces = getProvinceSummary(partyPlaces).slice(0, 6);

export default function ContactPage() {
  return (
    <main className="brand-page-bg min-h-screen text-foreground">
      <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <header className="rounded-3xl border border-white/70 bg-white/80 p-6 shadow-xl backdrop-blur-xl sm:p-8 lg:p-10">
          <p className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-white">
            <Sparkles className="size-3.5" />
            Contact PartyPlace
          </p>
          <h1 className="mt-4 text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
            Let&apos;s Plan Your Event Faster
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
            Send your event details and we will help you shortlist venues based on guest count,
            location, rating, and budget from our Nepal venue data.
          </p>
        </header>

        <section className="mt-8 grid gap-4 lg:grid-cols-3">
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="inline-flex items-center gap-2 text-sm font-semibold text-slate-800">
              <Phone className="size-4 text-emerald-600" /> General Support
            </p>
            <p className="mt-2 text-lg font-bold">+977-9801000000</p>
            <p className="text-sm text-slate-600">Sun - Fri, 9:00 AM to 6:00 PM</p>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="inline-flex items-center gap-2 text-sm font-semibold text-slate-800">
              <Mail className="size-4 text-sky-600" /> Email
            </p>
            <p className="mt-2 text-lg font-bold">hello@partyplace.com</p>
            <p className="text-sm text-slate-600">Replies typically within 24 hours</p>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="inline-flex items-center gap-2 text-sm font-semibold text-slate-800">
              <MapPinned className="size-4 text-violet-600" /> Head Office
            </p>
            <p className="mt-2 text-lg font-bold">Kathmandu, Nepal</p>
            <p className="text-sm text-slate-600">Remote support across provinces</p>
          </article>
        </section>

        <section className="mt-10 grid gap-4 lg:grid-cols-5">
          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-3">
            <h2 className="text-xl font-bold tracking-tight">Send An Inquiry</h2>
            <form className="mt-4 grid gap-3 sm:grid-cols-2">
              <input
                type="text"
                placeholder="Full name"
                className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none transition focus:border-sky-500"
              />
              <input
                type="tel"
                placeholder="Phone number"
                className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none transition focus:border-sky-500"
              />
              <input
                type="email"
                placeholder="Email address"
                className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none transition focus:border-sky-500 sm:col-span-2"
              />
              <input
                type="text"
                placeholder="Preferred city"
                className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none transition focus:border-sky-500"
              />
              <input
                type="number"
                min="10"
                placeholder="Expected guests"
                className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none transition focus:border-sky-500"
              />
              <textarea
                rows={5}
                placeholder="Tell us your event type, date, and budget range..."
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-sky-500 sm:col-span-2"
              />
              <Button type="submit" className="sm:col-span-2">
                <Send className="size-4" /> Submit Request
              </Button>
            </form>
          </article>

          <aside className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
            <h2 className="text-xl font-bold tracking-tight">Regional Coverage Snapshot</h2>
            <ul className="mt-4 space-y-2">
              {provinces.map((item) => (
                <li key={item.province} className="rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 text-sm">
                  <p className="flex items-center justify-between font-semibold text-slate-800">
                    <span>{item.province}</span>
                    <span>{item.venues} venues</span>
                  </p>
                  <p className="mt-1 text-xs text-slate-600">{formatNumber(item.capacity)}+ guest capacity</p>
                </li>
              ))}
            </ul>
          </aside>
        </section>

        <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-xl font-bold tracking-tight">Quick Call: Top Rated Venues</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {topRated.map((place) => (
              <article key={place.id} className="overflow-hidden rounded-xl border border-slate-100 bg-slate-50 p-4">
                <div className="relative mb-3 overflow-hidden rounded-lg border border-slate-200 bg-white">
                  <div className="relative aspect-16/10">
                    <Image
                      src={place.image}
                      alt={place.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                </div>
                <h3 className="text-sm font-bold text-slate-900">{place.name}</h3>
                <p className="mt-1 text-xs text-slate-600">{place.city}, {place.province}</p>
                <p className="mt-2 text-xs text-slate-500">Rating {place.rating} / 5</p>
                <Button asChild size="sm" className="mt-3 w-full">
                  <a href={`tel:${place.contact}`}>
                    <Phone className="size-4" /> {place.contact}
                  </a>
                </Button>
              </article>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild variant="outline">
              <Link href="/">Back To Home</Link>
            </Button>
            <Button asChild>
              <Link href="/services">View Services</Link>
            </Button>
          </div>
        </section>
      </section>
    </main>
  );
}
