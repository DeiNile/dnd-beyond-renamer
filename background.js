
let spellModifierLabel = null;
let spellAttackLabel = null;
let spellModifierOriginalTextPosition = null;
let spellAttackOriginalTextPosition = null;

chrome.runtime.onInstalled.addListener(() => {
	chrome.storage.sync.set({
		spellAttackLabel,
		spellModifierLabel,
		spellAttackOriginalTextPosition,
		spellModifierOriginalTextPosition,
	});
	console.log(`Spell Modifier Label: ${spellModifierLabel}`);
	console.log(`Spell Attack Label: ${spellAttackLabel}`);
});
