import Link from "next/link";
import { ArrowRight, LockKeyhole, Mail, ShieldCheck, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { partyPlaces } from "@/data";
import { formatNumber, getVenueStats } from "@/lib/party-utils";

const stats = getVenueStats(partyPlaces);

export default function SignInPage() {
  return (
    <main className="brand-page-bg min-h-screen text-foreground">
      <section className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-14">
        <article className="rounded-3xl border border-white/60 bg-white/75 p-6 shadow-xl backdrop-blur-xl sm:p-8 lg:p-10">
          <p className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-white">
            <Sparkles className="size-3.5" />
            Welcome Back
          </p>
          <h1 className="mt-4 text-3xl font-black leading-tight sm:text-4xl">
            Sign In To Manage Your PartyPlace Dashboard
          </h1>
          <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
            Access saved venues, shortlist lists, and inquiry history in one place.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">Venues Listed</p>
              <p className="mt-1 text-2xl font-black">{stats.totalVenues}</p>
            </div>
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">Cities Covered</p>
              <p className="mt-1 text-2xl font-black">{stats.cityCount}</p>
            </div>
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 sm:col-span-2">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">Capacity Reach</p>
              <p className="mt-1 text-2xl font-black">{formatNumber(stats.totalCapacity)}+ Guests</p>
            </div>
          </div>

          <p className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700">
            <ShieldCheck className="size-4" />
            Secure sign-in with encrypted authentication flow
          </p>
        </article>

        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg sm:p-8">
          <h2 className="text-2xl font-black tracking-tight">Sign In</h2>
          <p className="mt-2 text-sm text-slate-600">Use your email and password to continue.</p>

          <form className="mt-6 grid gap-3">
            <label className="text-sm font-semibold text-slate-700" htmlFor="signin-email">
              Email Address
            </label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              <input
                id="signin-email"
                type="email"
                placeholder="you@example.com"
                className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3 text-sm outline-none transition focus:border-sky-500"
              />
            </div>

            <label className="mt-2 text-sm font-semibold text-slate-700" htmlFor="signin-password">
              Password
            </label>
            <div className="relative">
              <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              <input
                id="signin-password"
                type="password"
                placeholder="Enter your password"
                className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3 text-sm outline-none transition focus:border-sky-500"
              />
            </div>

            <div className="mt-2 flex items-center justify-between text-sm">
              <label className="inline-flex items-center gap-2 text-slate-600">
                <input type="checkbox" className="size-4 rounded border-slate-300" />
                Remember me
              </label>
              <Link href="/contact" className="font-semibold text-sky-700 hover:text-sky-800">
                Forgot password?
              </Link>
            </div>

            <Button type="submit" className="mt-2 h-11 bg-slate-900 text-white hover:bg-slate-800">
              Continue <ArrowRight className="size-4" />
            </Button>
          </form>

          <p className="mt-5 text-sm text-slate-600">
            Do not have an account?{" "}
            <Link href="/registration" className="font-semibold text-sky-700 hover:text-sky-800">
              Create one now
            </Link>
          </p>
        </article>
      </section>
    </main>
  );
}
