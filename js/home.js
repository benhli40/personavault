// home.js – Render persona dashboard + handle creation

import { loadPersonas, savePersona, createPersona } from './storage.js';
import { navigate } from './router.js';

document.addEventListener("DOMContentLoaded", () => {
  if (!document.getElementById("persona-list")) return;

  renderPersonaList();
  setupCreateForm();
});

// === Render existing personas ===
function renderPersonaList() {
  const container = document.getElementById("persona-list");
  const personas = loadPersonas();

  if (!personas.length) {
    container.innerHTML = "<p>No personas yet. Create your first one below 👇</p>";
    return;
  }

  container.innerHTML = personas.map(p => `
    <div class="persona-card" onclick="navigate('persona', { id: '${p.id}' })">
      <h3>${p.icon || "👤"} ${p.name}</h3>
      <p>${p.description || "No description yet."}</p>
      <small>${p.traits.filter(t => t.unlocked).length} / ${p.traits.length} traits unlocked</small>
    </div>
  `).join("");
}

// === Handle new persona form ===
function setupCreateForm() {
  const form = document.getElementById("new-persona-form");
  const addTraitBtn = document.getElementById("add-trait");
  const traitsContainer = document.getElementById("traits-container");

  addTraitBtn.addEventListener("click", () => {
    const count = traitsContainer.querySelectorAll(".trait-name").length;
    if (count >= 5) return alert("Max 5 traits allowed!");

    traitsContainer.insertAdjacentHTML("beforeend", `
      <input type="text" class="trait-name" placeholder="Trait Name" />
      <input type="text" class="trait-prompt" placeholder="Prompt" />
    `);
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("persona-name").value.trim();
    const icon = document.getElementById("persona-icon").value.trim();
    const desc = document.getElementById("persona-desc").value.trim();

    const traitNames = Array.from(document.querySelectorAll(".trait-name")).map(i => i.value.trim());
    const traitPrompts = Array.from(document.querySelectorAll(".trait-prompt")).map(i => i.value.trim());

    const traits = traitNames.map((name, i) => ({
      name,
      prompt: traitPrompts[i]
    })).filter(t => t.name && t.prompt);

    if (!name || traits.length === 0) return alert("Please fill in name and at least one valid trait.");

    const newPersona = createPersona({ name, icon, description: desc, traits });
    navigate('persona', { id: newPersona.id });
  });
}