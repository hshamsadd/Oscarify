import { loadingElement, errorElement } from "./domElements.js";

export function showLoading() {
  loadingElement.classList.remove("hidden");
  errorElement.classList.add("hidden");
}

export function hideLoading() {
  loadingElement.classList.add("hidden");
}

export function showError(message) {
  errorElement.textContent = message;
  errorElement.classList.remove("hidden");
  loadingElement.classList.add("hidden");
}
