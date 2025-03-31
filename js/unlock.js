// unlock.js – Handles trait unlocking

import { getPersonaById, savePersona } from './storage.js';
import { navigate } from './router.js';

export function initUnlockView(params) {
  const personaId = params.id;
  const traitIndex = parseInt(params.trait);

  const persona = getPersonaById(personaId);
  if (!persona || !persona.traits[traitIndex]) {
    document.getElementById("view").innerHTML = `<p>Trait not found.</p>`;
    return;
  }

  const trait = persona.traits[traitIndex];

  renderUnlockUI(persona, trait, traitIndex);
}

function renderUnlockUI(persona, trait, index) {
  const view = document.getElementById("view");

  view.innerHTML = `
    <section class="unlock-header">
      <h2>${persona.icon || "👤"} ${persona.name} – ${trait.name}</h2>
      <p><strong>Prompt:</strong> ${trait.prompt}</p>
    </section>

    <textarea id="trait-answer" placeholder="Write your response...">${trait.answer || ''}</textarea>
    <br />
    <button id="save-answer">🔓 Unlock Trait</button>
    <button onclick="navigate('persona', { id: '${persona.id}' })">← Back</button>
  `;

  document.getElementById("save-answer").addEventListener("click", () => {
    const response = document.getElementById("trait-answer").value.trim();
    if (!response) return;

    trait.unlocked = true;
    trait.answer = response;

    savePersona(persona);
    navigate("persona", { id: persona.id });
  });
}