import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Compass,
  Map,
  MapPin,
  Phone,
  ShieldCheck,
  Star,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { formatNumber } from "@/lib/party-utils";

function getPlaceCategory(place) {
  const facilities = place.facilities.map((facility) => facility.toLowerCase());
  const hasGardenSpace = facilities.some(
    (facility) => facility.includes("garden") || facility.includes("open lawn")
  );
  const hasCorporateSetup = facilities.some(
    (facility) =>
      facility.includes("projector") ||
      facility.includes("sound system") ||
      facility.includes("stage")
  );

  if (place.rating >= 4.6 && place.capacity >= 450) return "Premium Wedding";
  if (hasGardenSpace) return "Garden Events";
  if (hasCorporateSetup && place.capacity >= 350) return "Corporate Ready";
  if (place.capacity >= 420) return "Grand Celebration";

  return "Family Friendly";
}

function getCategoryBadgeClass(category) {
  if (category === "Premium Wedding") return "bg-[#f5e5ff]/95 text-[#6a0dad]";
  if (category === "Garden Events") return "bg-[#fff4cc]/95 text-[#7a4d00]";
  if (category === "Corporate Ready") return "bg-[#ece0ff]/95 text-[#5c1f8f]";
  if (category === "Grand Celebration") return "bg-[#f2e6ff]/95 text-[#6a0dad]";

  return "bg-[#fff7de]/95 text-[#7a4d00]";
}

function createMapsLink(place) {
  const query = `${place.name}, ${place.address}, ${place.city}`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export default function CardDetails({
  place,
  relatedPlaces = [],
  previousPlace = null,
  nextPlace = null,
}) {
  const category = getPlaceCategory(place);
  const mapsLink = createMapsLink(place);

  return (
    <main className="brand-page-bg min-h-screen text-foreground">
      <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <Button asChild variant="outline" className="gap-2">
            <Link href="/">
              <ArrowLeft className="size-4" /> Back To Home
            </Link>
          </Button>

          <div className="flex flex-wrap gap-2">
            {previousPlace ? (
              <Button asChild variant="outline" size="sm" className="gap-2">
                <Link href={`/card/${previousPlace.id}`}>Previous Venue</Link>
              </Button>
            ) : null}
            {nextPlace ? (
              <Button asChild variant="outline" size="sm" className="gap-2">
                <Link href={`/card/${nextPlace.id}`}>
                  Next Venue <ArrowRight className="size-4" />
                </Link>
              </Button>
            ) : null}
          </div>
        </div>

        <article className="brand-panel overflow-hidden rounded-3xl p-4 shadow-xl sm:p-6 lg:p-8">
          <div className="grid gap-6 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <div className="relative overflow-hidden rounded-2xl border border-border bg-card">
                <div className="relative aspect-16/10">
                  <Image
                    src={place.image}
                    alt={place.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 65vw"
                    className="object-cover transition duration-700 hover:scale-105"
                    priority
                  />
                </div>

                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/70 via-black/25 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                  <p
                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${getCategoryBadgeClass(
                      category
                    )}`}
                  >
                    {category}
                  </p>

                  <h1 className="mt-3 text-2xl font-black leading-tight text-white sm:text-3xl">
                    {place.name}
                  </h1>

                  <p className="mt-2 inline-flex items-center gap-2 text-sm text-white/90">
                    <MapPin className="size-4" /> {place.address}
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full border border-border bg-card px-2.5 py-1 text-xs font-semibold text-foreground/80">
                  City: {place.city}
                </span>
                <span className="rounded-full border border-border bg-card px-2.5 py-1 text-xs font-semibold text-foreground/80">
                  District: {place.district}
                </span>
                <span className="rounded-full border border-border bg-card px-2.5 py-1 text-xs font-semibold text-foreground/80">
                  Province: {place.province}
                </span>
              </div>

              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                <div className="brand-soft-card rounded-xl p-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground/65">
                    Rating
                  </p>
                  <p className="mt-1 inline-flex items-center gap-1 text-lg font-bold">
                    <Star className="size-4 text-secondary" /> {place.rating} / 5
                  </p>
                </div>
                <div className="brand-soft-card rounded-xl p-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground/65">
                    Capacity
                  </p>
                  <p className="mt-1 inline-flex items-center gap-1 text-lg font-bold">
                    <Users className="size-4 text-primary" /> {formatNumber(place.capacity)} Guests
                  </p>
                </div>
                <div className="brand-soft-card rounded-xl p-3 sm:col-span-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground/65">
                    Price Range
                  </p>
                  <p className="mt-1 text-lg font-bold">{place.priceRangeNPR}</p>
                </div>
                <div className="brand-soft-card rounded-xl p-3 sm:col-span-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground/65">
                    Contact Number
                  </p>
                  <a href={`tel:${place.contact}`} className="mt-1 inline-flex text-lg font-bold hover:underline">
                    {place.contact}
                  </a>
                </div>
              </div>

              <div className="mt-5">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground/65">
                  Facilities
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {place.facilities.map((facility) => (
                    <span
                      key={facility}
                      className="rounded-full border border-border bg-card px-2.5 py-1 text-xs font-semibold text-foreground/80"
                    >
                      {facility}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 grid gap-2 sm:grid-cols-2">
                <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <a href={`tel:${place.contact}`}>
                    <Phone className="size-4" /> Call Venue
                  </a>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/contact">
                    <Building2 className="size-4" /> Send Inquiry
                  </Link>
                </Button>
                <Button asChild variant="outline" className="sm:col-span-2">
                  <a href={mapsLink} target="_blank" rel="noreferrer">
                    <Compass className="size-4" /> Open On Map
                  </a>
                </Button>
              </div>

              <p className="mt-5 inline-flex items-center gap-2 text-sm text-foreground/70">
                <ShieldCheck className="size-4 text-secondary" />
                Verified listing info for planning support.
              </p>
            </div>
          </div>
        </article>

        <section className="mt-6 grid gap-4 lg:grid-cols-3">
          <article className="brand-soft-card rounded-2xl p-5">
            <h2 className="text-lg font-bold tracking-tight">Venue Snapshot</h2>
            <ul className="mt-3 space-y-2 text-sm text-foreground/80">
              <li className="flex items-center justify-between">
                <span className="font-semibold">Venue Type</span>
                <span>{category}</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="font-semibold">Capacity</span>
                <span>{formatNumber(place.capacity)} Guests</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="font-semibold">Price</span>
                <span>{place.priceRangeNPR}</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="font-semibold">Rating</span>
                <span>{place.rating} / 5</span>
              </li>
            </ul>
          </article>

          <article className="brand-soft-card rounded-2xl p-5">
            <h2 className="text-lg font-bold tracking-tight">Location Details</h2>
            <p className="mt-3 inline-flex items-start gap-2 text-sm text-foreground/80">
              <Map className="mt-0.5 size-4 text-primary" />
              {place.address}
            </p>
            <p className="mt-2 text-sm text-foreground/70">
              {place.city}, {place.district}, {place.province}
            </p>
            <Button asChild variant="outline" className="mt-4 w-full">
              <a href={mapsLink} target="_blank" rel="noreferrer">
                <Compass className="size-4" /> View Route
              </a>
            </Button>
          </article>

          <article className="brand-soft-card rounded-2xl p-5">
            <h2 className="text-lg font-bold tracking-tight">Planning Help</h2>
            <p className="mt-3 text-sm leading-6 text-foreground/75">
              Need assistance comparing this venue with others? Share your guest count and event type, and we can help shortlist the best options.
            </p>
            <div className="mt-4 grid gap-2">
              <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Link href="/contact">Get Planning Support</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/services">View Services</Link>
              </Button>
            </div>
          </article>
        </section>

        <section className="mt-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-bold tracking-tight">More Venues You May Like</h2>
            <Button asChild variant="outline" size="sm">
              <Link href="/">View All Venues</Link>
            </Button>
          </div>

          {relatedPlaces.length === 0 ? (
            <div className="brand-panel mt-4 rounded-2xl p-6 text-sm text-foreground/75">
              No similar venues available right now.
            </div>
          ) : (
            <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {relatedPlaces.map((relatedPlace) => {
                const relatedCategory = getPlaceCategory(relatedPlace);

                return (
                  <Link
                    key={relatedPlace.id}
                    href={`/card/${relatedPlace.id}`}
                    className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="relative overflow-hidden border-b border-border bg-muted">
                      <div className="relative aspect-16/10">
                        <Image
                          src={relatedPlace.image}
                          alt={relatedPlace.imageAlt}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                          className="object-cover transition duration-500 group-hover:scale-105"
                        />
                      </div>
                      <p
                        className={`absolute left-3 top-3 rounded-full px-2 py-1 text-[11px] font-semibold ${getCategoryBadgeClass(
                          relatedCategory
                        )}`}
                      >
                        {relatedCategory}
                      </p>
                    </div>

                    <div className="p-4">
                      <h3 className="line-clamp-2 text-sm font-bold leading-6 text-foreground">
                        {relatedPlace.name}
                      </h3>

                      <p className="mt-1 text-xs text-foreground/70">
                        {relatedPlace.city}, {relatedPlace.province}
                      </p>

                      <div className="mt-3 flex items-center gap-3 text-xs font-semibold text-foreground/85">
                        <span className="inline-flex items-center gap-1">
                          <Star className="size-3.5 text-secondary" /> {relatedPlace.rating}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Users className="size-3.5 text-primary" /> {formatNumber(relatedPlace.capacity)}
                        </span>
                      </div>

                      <p className="mt-3 text-sm font-semibold text-foreground">{relatedPlace.priceRangeNPR}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </section>
      </section>
    </main>
  );
}
