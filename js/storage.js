// storage.js – Persona storage & utilities

const STORAGE_KEY = "persona_vault";

// === Load all personas ===
export function loadPersonas() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

// === Save all personas ===
export function savePersonas(personas) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(personas));
}

// === Save single persona (overwrite by ID) ===
export function savePersona(updated) {
  const all = loadPersonas();
  const index = all.findIndex(p => p.id === updated.id);
  if (index !== -1) {
    all[index] = updated;
  } else {
    all.push(updated);
  }
  savePersonas(all);
}

// === Get one persona by ID ===
export function getPersonaById(id) {
  return loadPersonas().find(p => p.id === id);
}

// === Create a new persona ===
export function createPersona({ name, icon, description, traits }) {
  const id = name.toLowerCase().replace(/\s+/g, "-");

  const newPersona = {
    id,
    name,
    icon,
    description,
    traits: traits.map(t => ({
      name: t.name,
      prompt: t.prompt,
      unlocked: false,
      answer: ""
    }))
  };

  const all = loadPersonas();
  all.push(newPersona);
  savePersonas(all);

  return newPersona;
}