// router.js – Handles view swapping and route logic

const viewContainer = document.getElementById("view");

export async function navigate(viewName, params = {}) {
  try {
    const res = await fetch(`./snippets/${viewName}.html`);
    if (!res.ok) throw new Error("View not found");

    const html = await res.text();
    viewContainer.innerHTML = html;

    // Optional: Load view-specific JS dynamically
    switch (viewName) {
      case "persona":
        import("./persona.js").then(module => {
          module.initPersonaView(params);
        });
        break;
      case "unlock":
        import("./unlock.js").then(module => {
          module.initUnlockView(params);
        });
        break;
      default:
        break;
    }

    // Update URL
    const url = new URL(window.location);
    url.searchParams.set("view", viewName);
    for (const key in params) {
      url.searchParams.set(key, params[key]);
    }
    window.history.pushState({}, "", url);

  } catch (err) {
    console.error("Router error:", err);
    viewContainer.innerHTML = `<p class="error">View not found: ${viewName}</p>`;
  }
}

// Back/forward navigation
window.addEventListener("popstate", () => {
  const params = Object.fromEntries(new URLSearchParams(window.location.search));
  navigate(params.view || "home", params);
});

// Make navigate globally available
window.navigate = navigate;