import Link from "next/link";
import { CalendarHeart, CheckCircle2, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { partyPlaces } from "@/data";
import { getTopCities, getVenueStats } from "@/lib/party-utils";

const stats = getVenueStats(partyPlaces);
const topCities = getTopCities(partyPlaces, 6);

export default function RegistrationPage() {
  return (
    <main className="brand-page-bg min-h-screen text-foreground">
      <section className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-5 lg:px-8 lg:py-14">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg sm:p-8 lg:col-span-3">
          <p className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-white">
            <Sparkles className="size-3.5" />
            Registration
          </p>
          <h1 className="mt-4 text-3xl font-black leading-tight sm:text-4xl">
            Create Your PartyPlace Account
          </h1>
          <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
            Register to save venues, manage inquiries, and receive curated recommendations for your event.
          </p>

          <form className="mt-6 grid gap-3 sm:grid-cols-2">
            <input
              type="text"
              placeholder="First name"
              className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none transition focus:border-sky-500"
            />
            <input
              type="text"
              placeholder="Last name"
              className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none transition focus:border-sky-500"
            />
            <input
              type="email"
              placeholder="Email address"
              className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none transition focus:border-sky-500 sm:col-span-2"
            />
            <input
              type="tel"
              placeholder="Phone number"
              className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none transition focus:border-sky-500"
            />
            <input
              type="text"
              placeholder="Preferred city"
              className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none transition focus:border-sky-500"
            />
            <input
              type="password"
              placeholder="Password"
              className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none transition focus:border-sky-500"
            />
            <input
              type="password"
              placeholder="Confirm password"
              className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none transition focus:border-sky-500"
            />
            <select className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none transition focus:border-sky-500 sm:col-span-2">
              <option value="">Planning for which event?</option>
              <option value="wedding">Wedding / Reception</option>
              <option value="birthday">Birthday</option>
              <option value="corporate">Corporate Event</option>
              <option value="other">Other Celebration</option>
            </select>

            <label className="inline-flex items-center gap-2 text-sm text-slate-600 sm:col-span-2">
              <input type="checkbox" className="size-4 rounded border-slate-300" />
              I agree to the terms and privacy policy.
            </label>

            <Button type="submit" className="h-11 bg-slate-900 text-white hover:bg-slate-800 sm:col-span-2">
              Create Account
            </Button>
          </form>

          <p className="mt-5 text-sm text-slate-600">
            Already have an account?{" "}
            <Link href="/signin" className="font-semibold text-sky-700 hover:text-sky-800">
              Sign in here
            </Link>
          </p>
        </article>

        <aside className="rounded-3xl border border-white/60 bg-white/75 p-6 shadow-xl backdrop-blur-xl sm:p-8 lg:col-span-2">
          <h2 className="text-2xl font-black tracking-tight">Why Register?</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Get personalized recommendations from a database of verified party venues across Nepal.
          </p>

          <ul className="mt-5 space-y-3 text-sm">
            <li className="inline-flex items-center gap-2 font-semibold text-slate-700">
              <CheckCircle2 className="size-4 text-emerald-600" />
              Save your favorite venues
            </li>
            <li className="inline-flex items-center gap-2 font-semibold text-slate-700">
              <CheckCircle2 className="size-4 text-emerald-600" />
              Track inquiry conversations
            </li>
            <li className="inline-flex items-center gap-2 font-semibold text-slate-700">
              <CheckCircle2 className="size-4 text-emerald-600" />
              Compare options by capacity and city
            </li>
          </ul>

          <div className="mt-6 rounded-2xl border border-slate-100 bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">Coverage Snapshot</p>
            <p className="mt-2 text-sm font-semibold text-slate-800">{stats.totalVenues} venues in {stats.cityCount} cities</p>
            <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-slate-600">
              <CalendarHeart className="size-4 text-rose-600" />
              Discover venues for every event style
            </p>
          </div>

          <div className="mt-6 rounded-2xl border border-slate-100 bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">Top Cities Right Now</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {topCities.map((item) => (
                <span key={item.city} className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700">
                  {item.city}
                </span>
              ))}
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}
