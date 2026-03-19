import { notFound } from "next/navigation";

import CardDetails from "@/components/cardDetails";
import { partyPlaces } from "@/data";

export function generateStaticParams() {
  return partyPlaces.map((place) => ({
    id: String(place.id),
  }));
}

export default async function CardDetailsPage({ params }) {
  const resolvedParams = await params;
  const id = String(resolvedParams?.id ?? "");
  const place = partyPlaces.find((item) => String(item.id) === id);

  if (!place) {
    notFound();
  }

  return <CardDetails place={place} />;
}
