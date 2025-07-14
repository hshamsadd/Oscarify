import { resultsContainer } from "./domElements.js";

export function createMovieCard(
  oscarInfo,
  tmdbInfo,
  tmdbConfig,
  additionalWins = []
) {
  resultsContainer.innerHTML = "";
  resultsContainer.appendChild(
    buildCardElement(oscarInfo, tmdbInfo, tmdbConfig, additionalWins)
  );
}

function buildCardElement(oscarInfo, tmdbInfo, tmdbConfig, additionalWins) {
  const card = document.createElement("div");
  card.className = "movie-card";
  card.innerHTML = generateCardHTML(
    oscarInfo,
    tmdbInfo,
    tmdbConfig,
    additionalWins
  );
  return card;
}

function generateCardHTML(oscarInfo, tmdbInfo, tmdbConfig, additionalWins) {
  return `
    <img src="${getPosterPath(tmdbInfo, tmdbConfig)}" alt="${
    tmdbInfo.title || oscarInfo.Film
  } poster">
    <div class="movie-info">
      <h3>${tmdbInfo.title || oscarInfo.Film} (${getReleaseYear(tmdbInfo)})</h3>
      <div class="awards-container">
        <div class="oscar-badge primary">🏆 ${oscarInfo.CanonicalCategory}</div>
        ${
          additionalWins.length > 0
            ? `
          <div class="additional-wins">
            <span class="wins-label"></span>
            ${additionalWins
              .map(
                (award) => `
              <span class="oscar-badge secondary">🏆 ${award.CanonicalCategory}</span>
            `
              )
              .join("")}
          </div>
        `
            : ""
        }
      </div>
      <p><strong>Winner:</strong> ${oscarInfo.Name}</p>
      <p><strong>Year:</strong> ${oscarInfo.Year}</p>
      <p class="overview">${tmdbInfo.overview || "No overview available."}</p>
      <div class="rating">⭐ ${getFormattedRating(tmdbInfo)}/10</div>
    </div>
  `;
}

// Keep all existing helper functions exactly as they are
function getPosterPath(tmdbInfo, tmdbConfig) {
  return tmdbInfo.poster_path
    ? `${tmdbConfig.images.secure_base_url}w300${tmdbInfo.poster_path}`
    : "/placeholder.png";
}

function getReleaseYear(tmdbInfo) {
  return tmdbInfo.release_date
    ? new Date(tmdbInfo.release_date).getFullYear()
    : "N/A";
}

function getFormattedRating(tmdbInfo) {
  return parseFloat(tmdbInfo.vote_average?.toFixed(1)) || "N/A";
}
