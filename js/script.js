// script.js – Theme toggle + view loader

import { loadTheme, saveTheme } from './storage.js';
import { loadView } from './router.js';

document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("toggle-theme");
  const viewContainer = document.getElementById("view");

  // === 1. Apply stored theme ===
  const savedTheme = loadTheme();
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }

  updateThemeButton(savedTheme);

  // === 2. Set up toggle handler
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const isDark = document.body.classList.toggle("dark");
      const newTheme = isDark ? "dark" : "light";
      saveTheme(newTheme);
      updateThemeButton(newTheme);
    });
  }

  // === 3. Load current view
  const params = new URLSearchParams(window.location.search);
  const view = params.get("view") || "home";
  const id = params.get("id");
  const trait = params.get("trait");

  loadView(view, { id, trait });
});

// === Update theme button label
function updateThemeButton(theme) {
  const themeToggle = document.getElementById("toggle-theme");
  if (themeToggle) {
    themeToggle.textContent = theme === "dark" ? "☀️ Light" : "🌓 Dark";
  }
}