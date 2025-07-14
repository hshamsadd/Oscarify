import { cachedFetch } from "../utils/cacheHelper.js";
import { OSCARS_DATA } from "../constants.js";

export async function fetchOscarData() {
  return cachedFetch(
    "oscar_data",
    async () => {
      return OSCARS_DATA;
    },
    10080
  ); // Cache for 1 week
}
