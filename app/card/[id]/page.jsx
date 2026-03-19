import { notFound } from "next/navigation";

import CardDetails from "@/components/cardDetails";
import { partyPlaces } from "@/data";

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

function getRelatedPlaces(currentPlace) {
  const currentCategory = getPlaceCategory(currentPlace);

  return partyPlaces
    .filter((item) => item.id !== currentPlace.id)
    .map((item) => {
      const sameProvinceScore = item.province === currentPlace.province ? 2 : 0;
      const sameCityScore = item.city === currentPlace.city ? 1.5 : 0;
      const sameCategoryScore = getPlaceCategory(item) === currentCategory ? 2 : 0;
      const ratingDelta = Math.abs(item.rating - currentPlace.rating);
      const capacityDelta = Math.abs(item.capacity - currentPlace.capacity);
      const ratingScore = Math.max(0, 1.5 - ratingDelta);
      const capacityScore = Math.max(0, 1.5 - capacityDelta / 150);

      return {
        item,
        score: sameProvinceScore + sameCityScore + sameCategoryScore + ratingScore + capacityScore,
      };
    })
    .sort((a, b) => b.score - a.score || b.item.rating - a.item.rating)
    .slice(0, 4)
    .map(({ item }) => item);
}

function getAdjacentPlaces(currentPlace) {
  const sorted = [...partyPlaces].sort((a, b) => a.id - b.id);
  const currentIndex = sorted.findIndex((item) => item.id === currentPlace.id);

  if (currentIndex === -1) {
    return {
      previousPlace: null,
      nextPlace: null,
    };
  }

  return {
    previousPlace: currentIndex > 0 ? sorted[currentIndex - 1] : null,
    nextPlace: currentIndex < sorted.length - 1 ? sorted[currentIndex + 1] : null,
  };
}

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

  const relatedPlaces = getRelatedPlaces(place);
  const { previousPlace, nextPlace } = getAdjacentPlaces(place);

  return (
    <CardDetails
      place={place}
      relatedPlaces={relatedPlaces}
      previousPlace={previousPlace}
      nextPlace={nextPlace}
    />
  );
}
