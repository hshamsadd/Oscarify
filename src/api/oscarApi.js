import { cachedFetch } from "../utils/cacheHelper.js";
import { OSCARS_DATA } from "../constants.js";

export async function fetchOscarData() {
  return cachedFetch(
    "oscar_data",
    async () => {
      const response = await fetch(`${OSCARS_DATA}`);
      return await response.json();
    },
    10080
  ); // Cache for 1 week
}
