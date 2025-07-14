import { cachedFetch } from "../utils/cacheHelper.js";
import { TMDB_API_KEY } from "../constants.js";

export async function fetchTmdbConfig() {
  return cachedFetch(
    "tmdb_config",
    async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/configuration?api_key=${TMDB_API_KEY}`
      );
      return await response.json();
    },
    10080
  ); // Cache for 1 week
}
