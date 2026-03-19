export function toMinPrice(priceRange) {
  const leftSide = priceRange.split("-")[0] ?? ""
  const price = Number(leftSide.replace(/[^0-9]/g, ""))
  return Number.isFinite(price) ? price : 0
}

export function formatNumber(value) {
  return new Intl.NumberFormat("en-NP").format(value)
}

export function getVenueStats(venues) {
  const totalVenues = venues.length
  const totalCapacity = venues.reduce((sum, venue) => sum + venue.capacity, 0)
  const totalRating = venues.reduce((sum, venue) => sum + venue.rating, 0)
  const avgRating = totalVenues === 0 ? 0 : totalRating / totalVenues
  const provinceCount = new Set(venues.map((venue) => venue.province)).size
  const cityCount = new Set(venues.map((venue) => venue.city)).size

  const prices = venues.map((venue) => toMinPrice(venue.priceRangeNPR))
  const minPrice = prices.length === 0 ? 0 : Math.min(...prices)
  const maxPrice = prices.length === 0 ? 0 : Math.max(...prices)

  return {
    totalVenues,
    totalCapacity,
    avgRating,
    provinceCount,
    cityCount,
    minPrice,
    maxPrice,
  }
}

export function getTopCities(venues, limit = 6) {
  const counts = new Map()

  venues.forEach((venue) => {
    counts.set(venue.city, (counts.get(venue.city) ?? 0) + 1)
  })

  return Array.from(counts.entries())
    .map(([city, count]) => ({ city, count }))
    .sort((a, b) => b.count - a.count || a.city.localeCompare(b.city))
    .slice(0, limit)
}

export function getFacilityCounts(venues, limit = 10) {
  const counts = new Map()

  venues.forEach((venue) => {
    venue.facilities.forEach((facility) => {
      counts.set(facility, (counts.get(facility) ?? 0) + 1)
    })
  })

  return Array.from(counts.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
    .slice(0, limit)
}

export function getProvinceSummary(venues) {
  const grouped = new Map()

  venues.forEach((venue) => {
    const bucket = grouped.get(venue.province) ?? {
      province: venue.province,
      venues: 0,
      capacity: 0,
      ratingTotal: 0,
    }

    bucket.venues += 1
    bucket.capacity += venue.capacity
    bucket.ratingTotal += venue.rating

    grouped.set(venue.province, bucket)
  })

  return Array.from(grouped.values())
    .map((item) => ({
      province: item.province,
      venues: item.venues,
      capacity: item.capacity,
      avgRating: item.venues === 0 ? 0 : item.ratingTotal / item.venues,
    }))
    .sort((a, b) => b.venues - a.venues || a.province.localeCompare(b.province))
}
