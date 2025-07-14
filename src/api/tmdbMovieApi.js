import { cachedFetch } from "../utils/cacheHelper.js";
import { TMDB_API_KEY } from "../constants.js";

export async function fetchMovieDetails(imdbId) {
  return cachedFetch(
    `movie_${imdbId}`,
    async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/find/${imdbId}?api_key=${TMDB_API_KEY}&external_source=imdb_id`
        );
        const data = await response.json();

        if (data.movie_results && data.movie_results.length > 0) {
          return data.movie_results[0];
        } else {
          console.warn(`No TMDb data found for IMDb ID: ${imdbId}`);
          return null;
        }
      } catch (err) {
        console.error(`Failed to fetch details for IMDb ID ${imdbId}:`, err);
        return null;
      }
    },
    10080
  ); // Cache for 1 week
}
