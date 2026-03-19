import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Building2,
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

export default function CardDetails({ place }) {
  const category = getPlaceCategory(place);

  return (
    <main className="brand-page-bg min-h-screen text-foreground">
      <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="mb-5">
          <Button asChild variant="outline" className="gap-2">
            <Link href="/">
              <ArrowLeft className="size-4" /> Back To Home
            </Link>
          </Button>
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
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <p className="brand-chip inline-flex rounded-full px-2.5 py-1 text-xs font-semibold">
                {category}
              </p>

              <h1 className="mt-3 text-2xl font-black leading-tight sm:text-3xl">
                {place.name}
              </h1>

              <p className="mt-3 inline-flex items-center gap-2 text-sm text-foreground/75">
                <MapPin className="size-4" /> {place.address}
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
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

              <div className="mt-5 grid gap-2 sm:grid-cols-2">
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
                  <p className="mt-1 text-lg font-bold">{place.contact}</p>
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

              <div className="mt-6 flex flex-wrap gap-2">
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
            <h2 className="text-lg font-bold tracking-tight">Venue Details</h2>
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
              <a href={`tel:${place.contact}`}>
                <Phone className="size-4" /> Call For Directions
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
      </section>
    </main>
  );
}
