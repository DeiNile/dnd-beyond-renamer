
const spellTabClass = 'ct-primary-box__tab--spells ddbc-tab-list__nav-item';
let originalSpellAttackLabel, originalSpellModifierLabel;

let intervalId = window.setInterval(() => {
	const spellTabTitle = document.getElementsByClassName(spellTabClass)[0];
	if (spellTabTitle != null) {
		console.log('spell tab FOUND, polling stops');
		window.clearTimeout(intervalId);
		const observer = new MutationObserver(() => {
			if (spellTabTitle.classList.contains('ddbc-tab-list__nav-item--is-active')) {
				onSpellTabActivated();
			}
		});
		observer.observe(spellTabTitle, {
			attributes: true,
			attributeFilter: ['class'],
			childList: false,
			characterData: false,
		});
	} else {
		console.log('spell tab NOT found, polling continues...');
	}
}, 1000);

function onSpellTabActivated() {
	chrome.storage.sync.get(['spellAttackLabel', 'spellModifierLabel', 'spellAttackOriginalTextPosition', 'spellModifierOriginalTextPosition'], (storageObj) => {
		console.log('special labels:', storageObj);
		const {
			spellAttackLabel,
			spellModifierLabel,
			spellAttackOriginalTextPosition,
			spellModifierOriginalTextPosition,
		} = storageObj;
		const spellContainerElements = document.querySelectorAll(
			'.ct-spells-level-casting__info > .ct-spells-level-casting__info-group'
		);
		console.assert(spellContainerElements.length === 3);

		if (spellModifierLabel !== null) {
			const element = spellContainerElements[0].querySelector('.ct-spells-level-casting__info-label');
			if (originalSpellModifierLabel == null) {
				originalSpellModifierLabel = element.innerHTML;
			}
			element.innerHTML = renameLabel(spellModifierLabel, spellModifierOriginalTextPosition, originalSpellModifierLabel);
		}
		if (spellAttackLabel !== null) {
			const element = spellContainerElements[1].querySelector('.ct-spells-level-casting__info-label');
			if (originalSpellAttackLabel == null) {
				originalSpellAttackLabel = element.innerHTML;
			}
			element.innerHTML = renameLabel(spellAttackLabel, spellAttackOriginalTextPosition, originalSpellAttackLabel);
		}
	});
}

const italicStyle = `style="font-style: italic;"`;
function renameLabel(label, position, originalLabel) {
	console.log(label, position, originalLabel);
	if (position == null) {
		return label;
	} else if (position === 'before') {
		return `<div ${italicStyle}>${originalLabel}</div>${label}`;
	} else {
		return `${label}<div ${italicStyle}>${originalLabel}</div>`;
	}
}