"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  CalendarHeart,
  CircleCheckBig,
  MapPin,
  Phone,
  Search,
  SlidersHorizontal,
  Sparkles,
  Star,
  Users,
} from "lucide-react";

import { partyPlaces } from "@/data";
import { Button } from "@/components/ui/button";

const sortOptions = [
  { value: "recommended", label: "Recommended" },
  { value: "rating", label: "Top Rated" },
  { value: "capacity", label: "Highest Capacity" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
];

const serviceHighlights = [
  {
    title: "Smart Venue Discovery",
    description:
      "Search by city, province, category, and facilities to find the right venue in minutes.",
  },
  {
    title: "Budget-Friendly Comparison",
    description:
      "Compare price ranges and capacity together so your budget and guest list stay aligned.",
  },
  {
    title: "Direct Venue Contact",
    description:
      "Call venues instantly from listings without extra steps or delayed communication.",
  },
  {
    title: "Reliable Event Context",
    description:
      "Use rating, facilities, and category tags to shortlist places confidently.",
  },
];

const planningSteps = [
  {
    step: "01",
    title: "Filter by event need",
    description: "Choose location, category, and price sort to narrow down options quickly.",
  },
  {
    step: "02",
    title: "Compare essentials",
    description: "Review capacity, facilities, and rating to create your final shortlist.",
  },
  {
    step: "03",
    title: "Contact and confirm",
    description: "Call the venue directly and lock your date without extra friction.",
  },
];

const eventSegmentDefinitions = [
  {
    key: "wedding",
    title: "Wedding & Reception",
    description: "High-capacity and premium-rated venues for major family celebrations.",
    category: "Premium Wedding",
    tone: "from-[#f5e8ff] to-[#fff5c6] dark:from-[#2e1a45] dark:to-[#3a2c16]",
    matcher: (place) => getPlaceCategory(place) === "Premium Wedding" || place.capacity >= 450,
  },
  {
    key: "garden",
    title: "Garden Events",
    description: "Open and greenery-focused spaces for airy, photogenic gatherings.",
    category: "Garden Events",
    tone: "from-[#f8f0ff] to-[#fff0b3] dark:from-[#2b193f] dark:to-[#3f3118]",
    matcher: (place) => getPlaceCategory(place) === "Garden Events",
  },
  {
    key: "corporate",
    title: "Corporate Events",
    description: "Venues with stage or sound setup suitable for formal and business functions.",
    category: "Corporate Ready",
    tone: "from-[#efe2ff] to-[#f9ebff] dark:from-[#2d1c46] dark:to-[#38234d]",
    matcher: (place) => getPlaceCategory(place) === "Corporate Ready",
  },
  {
    key: "family",
    title: "Family Functions",
    description: "Practical and flexible options for birthdays and medium-size celebrations.",
    category: "Family Friendly",
    tone: "from-[#fff6d8] to-[#f3e8ff] dark:from-[#3f301a] dark:to-[#311f45]",
    matcher: (place) => getPlaceCategory(place) === "Family Friendly",
  },
];

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
  if (category === "Premium Wedding") return "bg-[#f5e5ff] text-[#6a0dad] dark:bg-[#382250] dark:text-[#efd8ff]";
  if (category === "Garden Events") return "bg-[#fff4cc] text-[#7a4d00] dark:bg-[#413117] dark:text-[#ffeb9b]";
  if (category === "Corporate Ready") return "bg-[#ece0ff] text-[#5c1f8f] dark:bg-[#322046] dark:text-[#e2c9ff]";
  if (category === "Grand Celebration") return "bg-[#f2e6ff] text-[#6a0dad] dark:bg-[#37214f] dark:text-[#e8d0ff]";

  return "bg-[#fff7de] text-[#7a4d00] dark:bg-[#3f3016] dark:text-[#ffe08e]";
}

function toMinPrice(priceRange) {
  const leftSide = priceRange.split("-")[0] ?? "";
  const price = Number(leftSide.replace(/[^0-9]/g, ""));
  return Number.isFinite(price) ? price : 0;
}

function formatNumber(value) {
  return new Intl.NumberFormat("en-NP").format(value);
}

export default function Home() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [province, setProvince] = useState("All");
  const [city, setCity] = useState("All");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("recommended");

  function openCardDetails(id) {
    router.push(`/card/${id}`);
  }

  const provinces = useMemo(() => {
    return ["All", ...new Set(partyPlaces.map((place) => place.province))];
  }, []);

  const cities = useMemo(() => {
    const source =
      province === "All"
        ? partyPlaces
        : partyPlaces.filter((place) => place.province === province);

    return ["All", ...new Set(source.map((place) => place.city))];
  }, [province]);

  const categories = useMemo(() => {
    return ["All", ...new Set(partyPlaces.map((place) => getPlaceCategory(place)))];
  }, []);

  const filteredPlaces = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    let items = partyPlaces.filter((place) => {
      const placeCategory = getPlaceCategory(place);

      const matchesQuery =
        normalizedQuery.length === 0 ||
        place.name.toLowerCase().includes(normalizedQuery) ||
        place.city.toLowerCase().includes(normalizedQuery) ||
        place.district.toLowerCase().includes(normalizedQuery) ||
        placeCategory.toLowerCase().includes(normalizedQuery) ||
        place.facilities.some((facility) =>
          facility.toLowerCase().includes(normalizedQuery)
        );

      const matchesProvince = province === "All" || place.province === province;
      const matchesCity = city === "All" || place.city === city;
      const matchesCategory = category === "All" || placeCategory === category;

      return matchesQuery && matchesProvince && matchesCity && matchesCategory;
    });

    items = [...items].sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "capacity") return b.capacity - a.capacity;
      if (sortBy === "price-low") return toMinPrice(a.priceRangeNPR) - toMinPrice(b.priceRangeNPR);
      if (sortBy === "price-high") return toMinPrice(b.priceRangeNPR) - toMinPrice(a.priceRangeNPR);

      const recommendationA = a.rating * 20 + a.capacity / 50;
      const recommendationB = b.rating * 20 + b.capacity / 50;
      return recommendationB - recommendationA;
    });

    return items;
  }, [query, province, city, category, sortBy]);

  const stats = useMemo(() => {
    const totalVenues = filteredPlaces.length;
    const totalCapacity = filteredPlaces.reduce((sum, place) => sum + place.capacity, 0);
    const avgRating =
      totalVenues === 0
        ? 0
        : filteredPlaces.reduce((sum, place) => sum + place.rating, 0) / totalVenues;

    return {
      totalVenues,
      totalCapacity,
      avgRating,
    };
  }, [filteredPlaces]);

  const eventSegments = useMemo(() => {
    return eventSegmentDefinitions.map((segment) => ({
      ...segment,
      count: filteredPlaces.filter(segment.matcher).length,
    }));
  }, [filteredPlaces]);

  const categoryBreakdown = useMemo(() => {
    const counts = new Map();

    filteredPlaces.forEach((place) => {
      const placeCategory = getPlaceCategory(place);
      counts.set(placeCategory, (counts.get(placeCategory) ?? 0) + 1);
    });

    return Array.from(counts.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
  }, [filteredPlaces]);

  const popularFacilities = useMemo(() => {
    const counts = new Map();

    filteredPlaces.forEach((place) => {
      place.facilities.forEach((facility) => {
        counts.set(facility, (counts.get(facility) ?? 0) + 1);
      });
    });

    return Array.from(counts.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
      .slice(0, 10);
  }, [filteredPlaces]);

  const featured = filteredPlaces.slice(0, 3);

  return (
    <main className="brand-page-bg min-h-screen text-foreground">
      <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="brand-panel overflow-hidden rounded-3xl p-6 shadow-xl sm:p-8 lg:p-10">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-foreground/70">
            <Sparkles className="size-4 text-secondary" />
            Find Event Venues Across Nepal
          </div>

          <h1 className="mt-4 max-w-3xl text-balance text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
            PartyPlace Home: Discover Nepal&apos;s Best Celebration Spots
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-foreground/75 sm:text-base">
            Explore curated party venues for weddings, birthdays, receptions, and corporate events.
            Search by city, compare capacity and pricing, and call venues directly.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="brand-soft-card rounded-2xl px-4 py-3 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground/70">Visible Venues</p>
              <p className="mt-1 text-2xl font-bold text-foreground">{stats.totalVenues}</p>
            </div>
            <div className="brand-soft-card rounded-2xl px-4 py-3 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground/70">Avg Rating</p>
              <p className="mt-1 text-2xl font-bold text-foreground">{stats.avgRating.toFixed(1)} / 5</p>
            </div>
            <div className="brand-soft-card rounded-2xl px-4 py-3 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground/70">Total Capacity</p>
              <p className="mt-1 text-2xl font-bold text-foreground">{formatNumber(stats.totalCapacity)}+</p>
            </div>
            <div className="brand-soft-card rounded-2xl px-4 py-3 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground/70">Provinces Covered</p>
              <p className="mt-1 text-2xl font-bold text-foreground">{provinces.length - 1}</p>
            </div>
          </div>
        </div>

        <div className="brand-panel mt-8 rounded-3xl p-4 shadow-lg sm:p-6">
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-5">
            <label className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-foreground/45" />
              <input
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search venue, city, or facility"
                className="h-11 w-full rounded-xl border border-border bg-card pl-9 pr-3 text-sm outline-none ring-0 transition focus:border-primary"
              />
            </label>

            <select
              value={province}
              onChange={(event) => {
                setProvince(event.target.value);
                setCity("All");
              }}
              className="h-11 w-full rounded-xl border border-border bg-card px-3 text-sm outline-none transition focus:border-primary"
            >
              {provinces.map((item) => (
                <option key={item} value={item}>
                  Province: {item}
                </option>
              ))}
            </select>

            <select
              value={city}
              onChange={(event) => setCity(event.target.value)}
              className="h-11 w-full rounded-xl border border-border bg-card px-3 text-sm outline-none transition focus:border-primary"
            >
              {cities.map((item) => (
                <option key={item} value={item}>
                  City: {item}
                </option>
              ))}
            </select>

            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="h-11 w-full rounded-xl border border-border bg-card px-3 text-sm outline-none transition focus:border-primary"
            >
              {categories.map((item) => (
                <option key={item} value={item}>
                  Category: {item}
                </option>
              ))}
            </select>

            <label className="relative">
              <SlidersHorizontal className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-foreground/45" />
              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
                className="h-11 w-full rounded-xl border border-border bg-card pl-9 pr-3 text-sm outline-none transition focus:border-primary"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    Sort: {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <section className="mt-10">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-xl font-bold tracking-tight text-foreground">What PartyPlace Provides</h2>
            <Link href="/services" className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary/80">
              Explore all services <ArrowRight className="size-4" />
            </Link>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {serviceHighlights.map((item) => (
              <article key={item.title} className="brand-soft-card rounded-2xl p-5 shadow-sm">
                <p className="inline-flex items-center gap-2 text-sm font-bold text-foreground">
                  <BadgeCheck className="size-4 text-secondary" />
                  {item.title}
                </p>
                <p className="mt-2 text-sm leading-6 text-foreground/75">{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-bold tracking-tight text-foreground">Event Planning Categories</h2>
          <p className="mt-2 text-sm text-foreground/75">
            Pick a planning mode and instantly apply category filters to refine your venue options.
          </p>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {eventSegments.map((segment) => (
              <article
                key={segment.key}
                className={`rounded-2xl border border-border bg-linear-to-br ${segment.tone} p-5 shadow-sm`}
              >
                <h3 className="text-base font-bold text-foreground">{segment.title}</h3>
                <p className="mt-2 text-sm leading-6 text-foreground/75">{segment.description}</p>
                <p className="brand-chip mt-3 inline-flex rounded-full px-2.5 py-1 text-xs font-semibold">
                  {segment.count} matching venues
                </p>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setCategory(segment.category);
                    setSortBy("recommended");
                  }}
                >
                  View {segment.title}
                </Button>
              </article>
            ))}
          </div>
        </section>

        {featured.length > 0 ? (
          <section className="mt-9">
            <h2 className="text-xl font-bold tracking-tight text-foreground">Featured Picks</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {featured.map((place) => {
                const placeCategory = getPlaceCategory(place);

                return (
                  <article
                    key={`featured-${place.id}`}
                    className="group cursor-pointer overflow-hidden rounded-2xl border border-border bg-linear-to-br from-[#f8ecff] via-[#fff6d9] to-[#f2e7ff] p-5 shadow-sm dark:from-[#2b1a3f] dark:via-[#342913] dark:to-[#2d1c43]"
                    role="button"
                    tabIndex={0}
                    aria-label={`Open details for ${place.name}`}
                    onClick={() => openCardDetails(place.id)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        openCardDetails(place.id);
                      }
                    }}
                  >
                    <div className="relative overflow-hidden rounded-xl border border-border/60 bg-card/80">
                      <div className="relative aspect-16/10">
                        <Image
                          src={place.image}
                          alt={place.imageAlt}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover transition duration-500 group-hover:scale-105"
                        />
                      </div>
                      <p className="brand-chip absolute left-3 top-3 inline-flex rounded-full px-2 py-1 text-xs font-semibold shadow-sm">
                        Top Choice
                      </p>
                      <p
                        className={`absolute right-3 top-3 inline-flex rounded-full px-2 py-1 text-xs font-semibold shadow-sm ${getCategoryBadgeClass(
                          placeCategory
                        )}`}
                      >
                        {placeCategory}
                      </p>
                    </div>
                    <h3 className="mt-3 text-lg font-bold leading-snug text-foreground">{place.name}</h3>
                    <div className="mt-2 flex items-center gap-2 text-sm text-foreground/75">
                      <MapPin className="size-4" />
                      {place.city}, {place.district}
                    </div>
                    <div className="mt-2 flex items-center gap-4 text-sm text-foreground/85">
                      <span className="inline-flex items-center gap-1">
                        <Star className="size-4 text-secondary" /> {place.rating}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Users className="size-4 text-primary" /> {formatNumber(place.capacity)}
                      </span>
                    </div>
                    <p className="mt-3 text-sm font-semibold text-foreground">{place.priceRangeNPR}</p>
                  </article>
                );
              })}
            </div>
          </section>
        ) : null}

        <section className="mt-10">
          <h2 className="text-xl font-bold tracking-tight text-foreground">All Venues</h2>

          {filteredPlaces.length === 0 ? (
            <div className="brand-panel mt-4 rounded-2xl border-dashed p-8 text-center text-sm text-foreground/75">
              No venue matches your filters. Try another city, province, or search keyword.
            </div>
          ) : (
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredPlaces.map((place) => {
                const placeCategory = getPlaceCategory(place);

                return (
                  <article
                    key={place.id}
                    className="group cursor-pointer overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                    role="button"
                    tabIndex={0}
                    aria-label={`Open details for ${place.name}`}
                    onClick={() => openCardDetails(place.id)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        openCardDetails(place.id);
                      }
                    }}
                  >
                    <div className="relative mb-4 overflow-hidden rounded-xl border border-border bg-muted">
                      <div className="relative aspect-16/10">
                        <Image
                          src={place.image}
                          alt={place.imageAlt}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover transition duration-500 group-hover:scale-105"
                        />
                      </div>
                    </div>

                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-base font-bold leading-snug text-foreground">{place.name}</h3>
                      <div className="flex flex-col items-end gap-1">
                        <div className="brand-chip inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold">
                          <Star className="size-3.5" /> {place.rating}
                        </div>
                        <p
                          className={`inline-flex rounded-full px-2 py-1 text-[11px] font-semibold ${getCategoryBadgeClass(
                            placeCategory
                          )}`}
                        >
                          {placeCategory}
                        </p>
                      </div>
                    </div>

                    <p className="mt-2 inline-flex items-center gap-2 text-sm text-foreground/75">
                      <MapPin className="size-4" />
                      {place.address}
                    </p>

                    <div className="mt-4 flex items-center justify-between text-sm">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2 py-1 font-medium text-primary">
                        <Users className="size-4" /> {formatNumber(place.capacity)} Guests
                      </span>
                      <span className="font-semibold text-foreground">{place.priceRangeNPR}</span>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {place.facilities.slice(0, 4).map((facility) => (
                        <span
                          key={facility}
                          className="rounded-full border border-border bg-muted px-2 py-1 text-xs text-foreground/75"
                        >
                          {facility}
                        </span>
                      ))}
                    </div>

                    <div className="mt-5 flex items-center justify-between">
                      <p className="text-xs text-foreground/65">{place.city}, {place.province}</p>
                      <Button asChild size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                        <a href={`tel:${place.contact}`} onClick={(event) => event.stopPropagation()}>
                          <Phone className="size-4" /> Call Venue
                        </a>
                      </Button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        <section className="mt-10 grid gap-4 lg:grid-cols-2">
          <article className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h2 className="text-xl font-bold tracking-tight">How PartyPlace Works</h2>
            <div className="mt-4 space-y-3">
              {planningSteps.map((item) => (
                <div key={item.step} className="brand-soft-card rounded-xl p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-foreground/65">
                    Step {item.step}
                  </p>
                  <p className="mt-1 text-sm font-bold text-foreground">{item.title}</p>
                  <p className="mt-1 text-sm text-foreground/75">{item.description}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-secondary">
              <CircleCheckBig className="size-4" />
              Built for fast planning and confident decisions.
            </p>
          </article>

          <article className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h2 className="text-xl font-bold tracking-tight">Planning Snapshot</h2>
            <p className="mt-2 text-sm text-foreground/75">
              Live summary from your current filters and search criteria.
            </p>

            <div className="brand-soft-card mt-4 rounded-xl p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-foreground/65">Category Distribution</p>
              <ul className="mt-3 space-y-2 text-sm">
                {categoryBreakdown.length === 0 ? (
                  <li className="text-foreground/65">No category data for current filter.</li>
                ) : (
                  categoryBreakdown.slice(0, 5).map((item) => (
                    <li key={item.name} className="flex items-center justify-between">
                      <span className="font-medium text-foreground/85">{item.name}</span>
                      <span className="text-foreground/65">{item.count}</span>
                    </li>
                  ))
                )}
              </ul>
            </div>

            <div className="brand-soft-card mt-4 rounded-xl p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-foreground/65">Popular Facilities</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {popularFacilities.length === 0 ? (
                  <p className="text-sm text-foreground/65">No facility data for current filter.</p>
                ) : (
                  popularFacilities.map((item) => (
                    <span
                      key={item.name}
                      className="rounded-full border border-border bg-card px-2 py-1 text-xs font-semibold text-foreground/85"
                    >
                      {item.name} ({item.count})
                    </span>
                  ))
                )}
              </div>
            </div>
          </article>
        </section>

        <section className="mt-10 overflow-hidden rounded-3xl border border-border bg-primary p-6 text-primary-foreground shadow-lg sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary-foreground/80">
                <CalendarHeart className="size-4 text-secondary" />
                Plan Better With PartyPlace
              </p>
              <h2 className="mt-2 text-2xl font-black">Need Help Finalizing The Right Venue?</h2>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-primary-foreground/80">
                Share your guest count, city, and event type. Our team will help you shortlist venues faster.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button asChild className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                <Link href="/contact">Talk To Planner</Link>
              </Button>
              <Button asChild variant="outline" className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10">
                <Link href="/services">View Service Details</Link>
              </Button>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
