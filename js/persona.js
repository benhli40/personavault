// persona.js – Handles individual persona view

import { getPersonaById, savePersona } from './storage.js';
import { navigate } from './router.js';

export function initPersonaView(params) {
  const personaId = params.id;
  const persona = getPersonaById(personaId);
  if (!persona) {
    document.getElementById("view").innerHTML = `<p>Persona not found.</p>`;
    return;
  }

  renderPersona(persona);
}

function renderPersona(persona) {
  const view = document.getElementById("view");
  view.innerHTML = `
    <section class="persona-header">
      <h2>${persona.icon || "👤"} ${persona.name}</h2>
      <p>${persona.description}</p>
    </section>

    <section class="traits-section">
      <h3>Traits</h3>
      <ul class="traits-list">
        ${persona.traits.map((trait, i) => `
          <li class="${trait.unlocked ? 'unlocked' : 'locked'}">
            ${trait.unlocked ? `✅ ${trait.name}` : `🔒 ${trait.name}`}
            <button onclick="unlockTrait('${persona.id}', ${i})">
              ${trait.unlocked ? 'View' : 'Unlock'}
            </button>
          </li>
        `).join('')}
      </ul>
    </section>

    <button onclick="navigate('home')">← Back to Home</button>
  `;

  // Bind unlock functions
  window.unlockTrait = (pid, index) => {
    navigate('unlock', { id: pid, trait: index });
  };
}