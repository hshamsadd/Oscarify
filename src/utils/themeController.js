import { themeToggle } from "../view/domElements.js";
import { initTheme, toggleTheme } from "../utils/theme.js";

export function setupTheme() {
  initTheme();

  themeToggle.addEventListener("click", () => {
    toggleTheme();
  });
}
