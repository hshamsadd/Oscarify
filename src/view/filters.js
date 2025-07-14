import { yearFilter, categoryFilter } from "./domElements.js";

export function setupFilters(oscarData) {
  const years = [...new Set(oscarData.map((item) => item.Year))].sort();
  const categories = [
    ...new Set(oscarData.map((item) => item.CanonicalCategory)),
  ].sort();

  populateFilter(yearFilter, years);
  populateFilter(categoryFilter, categories);
}

function populateFilter(element, options) {
  options.forEach((value) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    element.appendChild(option);
  });
}

export function checkFilters(searchBtn) {
  searchBtn.disabled = !(yearFilter.value && categoryFilter.value);
}
