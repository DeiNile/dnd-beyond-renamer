
const spellAttackElement = document.getElementById('spell-attack');
const spellAttackOriginalTextPositionElement = document.getElementById('spell-modifier-original-label-position');
const spellModifierElement = document.getElementById('spell-modifier');
const spellModifierOriginalTextPositionElement = document.getElementById('spell-attack-original-label-position');
const messageElement = document.getElementById('message');

chrome.storage.sync.get('spellAttackLabel', ({ spellAttackLabel }) => {
	spellAttackElement.value = spellAttackLabel;
});
chrome.storage.sync.get('spellModifierLabel', ({ spellModifierLabel }) => {
	spellModifierElement.value = spellModifierLabel;
});
chrome.storage.sync.get('spellAttackOriginalTextPosition', ({ spellAttackOriginalTextPosition }) => {
	if (spellAttackOriginalTextPosition != null) {
		spellAttackOriginalTextPositionElement.value = spellAttackOriginalTextPosition;
	}
});
chrome.storage.sync.get('spellModifierOriginalTextPosition', ({ spellModifierOriginalTextPosition }) => {
	if (spellModifierOriginalTextPosition != null) {
		spellModifierOriginalTextPositionElement.value = spellModifierOriginalTextPosition;
	}
});

spellAttackElement.addEventListener('change', event => {
	chrome.storage.sync.set({ spellAttackLabel: event.target.value ?? null });
});

spellModifierElement.addEventListener('change', event => {
	chrome.storage.sync.set({ spellModifierLabel: event.target.value ?? null });
});

spellAttackOriginalTextPositionElement.addEventListener('change', event => {
	chrome.storage.sync.set({ spellAttackOriginalTextPosition: event.target.value || null });
});

spellModifierOriginalTextPositionElement.addEventListener('change', event => {
	chrome.storage.sync.set({ spellModifierOriginalTextPosition: event.target.value || null });
});