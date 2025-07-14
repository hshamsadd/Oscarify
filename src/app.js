import { fetchOscarData } from "./api/oscarApi.js";
import { fetchTmdbConfig } from "./api/tmdbConfigApi.js";
import { fetchMovieDetails } from "./api/tmdbMovieApi.js";
import { oscarData, tmdbConfig } from "./constants.js";
import { yearFilter, categoryFilter, searchBtn } from "./view/domElements.js";
import { setupTheme } from "./utils/themeController.js";

import { setupFilters, checkFilters } from "./view/filters.js";
import { createMovieCard } from "./view/movieCard.js";
import { showLoading, hideLoading, showError } from "./view/notifications.js";

async function init() {
  setupTheme();
  try {
    oscarData.push(...(await fetchOscarData()));
    Object.assign(tmdbConfig, await fetchTmdbConfig());

    setupFilters(oscarData);

    searchBtn.disabled = true;

    yearFilter.addEventListener("change", () => checkFilters(searchBtn));
    categoryFilter.addEventListener("change", () => checkFilters(searchBtn));
    searchBtn.addEventListener("click", displayWinnerForCategory);
  } catch (err) {
    showError(`Failed to start: ${err.message}`);
  }
}

async function displayWinnerForCategory() {
  try {
    showLoading();

    const selectedYear = yearFilter.value;
    const selectedCategory = categoryFilter.value;

    if (!selectedYear || !selectedCategory) {
      showError("Please select both a year and a category.");
      hideLoading();
      return;
    }

    const winner = oscarData.find((item) => {
      return (
        item.Winner &&
        item.Winner.toLowerCase() === "true" &&
        String(item.Year).trim() === selectedYear &&
        item.CanonicalCategory === selectedCategory
      );
    });

    if (!winner) {
      showError(
        `No winner found in ${selectedYear} for ${selectedCategory} category.`
      );
      hideLoading();
      return;
    }

    const movieDetails = await fetchMovieDetails(winner.FilmId);

    if (movieDetails) {
      const additionalWins = oscarData.filter(
        (item) =>
          item.FilmId === winner.FilmId &&
          item.Year === winner.Year &&
          item.CanonicalCategory !== winner.CanonicalCategory &&
          item.Winner?.toLowerCase() === "true"
      );

      createMovieCard(winner, movieDetails, tmdbConfig, additionalWins);
    } else {
      showError(`No details found for "${winner.Film}".`);
    }

    hideLoading();
  } catch (err) {
    showError(`Failed to load winner: ${err.message}`);
  }
}

addEventListener("DOMContentLoaded", init);
