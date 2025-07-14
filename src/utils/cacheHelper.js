export async function cachedFetch(
  cacheKey,
  fetchFunction,
  cacheDurationMinutes = 1440
) {
  const cached = localStorage.getItem(cacheKey);
  const cachedTime = localStorage.getItem(`${cacheKey}_time`);

  if (cached && cachedTime) {
    const cacheAge = (Date.now() - parseInt(cachedTime)) / 60000;
    if (cacheAge < cacheDurationMinutes) {
      return JSON.parse(cached);
    }
  }

  const newData = await fetchFunction();

  localStorage.setItem(cacheKey, JSON.stringify(newData));
  localStorage.setItem(`${cacheKey}_time`, Date.now().toString());

  return newData;
}
