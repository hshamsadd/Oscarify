export async function cachedFetch(
  cacheKey,
  fetchFunction,
  cacheDurationMinutes = 1440
) {
  // Check the cache first for stored data
  const cached = localStorage.getItem(cacheKey);
  const cachedTime = localStorage.getItem(`${cacheKey}_time`);

  if (cached && cachedTime) {
    const cacheAge = (Date.now() - parseInt(cachedTime)) / 60000; // minutes
    if (cacheAge < cacheDurationMinutes) {
      return JSON.parse(cached);
    }
  }

  // If there is no cache or cache is expired, fetch new data
  const newData = await fetchFunction();

  // Store in cache
  localStorage.setItem(cacheKey, JSON.stringify(newData));
  localStorage.setItem(`${cacheKey}_time`, Date.now().toString());

  return newData;
}
