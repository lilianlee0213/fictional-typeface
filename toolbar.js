const toolbar = document.querySelector('.toolbar');
const selectMode = document.querySelector('.select-mode');
const textMode = document.querySelector('.text-mode');
const fireMode = document.querySelector('.fire-mode');
const refreshMode = document.querySelector('.refresh');
const editable = document.querySelectorAll('.editable');
const shootables = document.querySelectorAll('.shootable');
const refreshScreen = document.querySelector('.refreshScreen');
const notifications = document.querySelector('.notifications');
const toolbarNotification = document.querySelector('.notification-toolbar');
const textModeNotification = document.querySelector('.notification-text');
const fireModeNotification = document.querySelector('.notification-fire');
const shotAllNotification = document.querySelector('.notification-shotAll');
const score = document.querySelector('.score');
const links = document.querySelectorAll('a');
let isFireMode = false;
let isFireModeUnlocked = false;
let isRefreshed = false;

// Setting the original text to bring it back when isTextMode
editable.forEach((item) => {
	item.setAttribute('data-initial-text', item.innerHTML.trim(''));
	if (!item.dataset.initialText) {
		item.dataset.initialText = 'Fictional';
	}
});

// Reset all the contents from textMode and fireMode
const handleReset = () => {
	refreshScreen.classList.add('restoring');
	setTimeout(() => {
		editable.forEach((item) => {
			item.innerHTML = item.dataset.initialText;
		});
		shootables.forEach((item) => {
			item.classList.remove('shot');
		});
		score.textContent = 0;
		score.style.backgroundColor = '#fd4b38';
		handleSelectMode();
		shotAllNotification.classList.remove('unlocked');
		refreshScreen.classList.remove('restoring');
	}, 1500);
	refreshMode.setAttribute('disabled', true);
};

const handleSelectMode = () => {
	isFireMode = false;
	editable.forEach((item) => {
		item.contentEditable = false;
	});
	links.forEach((link) => link.classList.remove('disabled-link'));
	score.classList.remove('score-active');
};

const handleTextMode = () => {
	isFireMode = false;
	score.classList.remove('score-active');
	editable.forEach((item) => {
		const maxLength = item.textContent.trim().length;
		item.contentEditable = true;
		item.addEventListener('keydown', (e) => {
			if (item.textContent.trim().length > maxLength && e.key !== 'Backspace') {
				item.style.borderColor = 'red';
				e.preventDefault();
			} else {
				item.style.borderColor = '#00a3ff';
			}
			// when a user ever uses textMode, fireMode is unlocked
			if (e.key === 'Backspace' && !isFireModeUnlocked) {
				isFireModeUnlocked = true;
				fireMode.removeAttribute('disabled');
				fireModeNotification.classList.add('unlocked');
			}
			//allow a user to refresh when keydown event
			refreshMode.disabled = false;
		});
	});
};

const activateFireMode = () => {
	// change other Mode to fireMode
	isFireMode = true;
	editable.forEach((item) => {
		item.contentEditable = false;
	});
	score.classList.add('score-active');
	links.forEach((link) => link.classList.add('disabled-link'));
};

const shootThis = (event) => {
	let shots = 0;
	// find shootable, add "shot": each shot will be 100 points
	const targetElement = event.target.closest('.shootable');
	if (isFireMode) {
		targetElement.classList.add('shot');

		score.textContent = Number(score.textContent) + 100;
	}
	// Count each shot to check if all shootables shots
	shootables.forEach((element) => {
		if (element.classList.contains('shot')) {
			shots++;
		}
	});
	if (shots === shootables.length) {
		shotAllNotification.classList.add('unlocked');
		score.textContent = 'HOORAY';
		score.style.backgroundColor = '#3ccb09';
	}
	// allow refreshMode when any shot
	refreshMode.disabled = false;
};

//add notification for toolbar and textMode when scroll
const handleToolbarUnlocked = () => {
	if (scrollY > 300) {
		toolbar.classList.add('toolbar-visible');
		toolbarNotification.classList.add('unlocked');
		textModeNotification.classList.add('unlocked');
		window.removeEventListener('scroll', handleToolbarUnlocked);
	}
};
// remove notification
const handleRemoveNotification = (event) => {
	if (!event.target.matches('button')) return;
	event.target.style.display = 'none';
};

window.addEventListener('scroll', handleToolbarUnlocked);
notifications.addEventListener('click', (e) => handleRemoveNotification(e));
textMode.addEventListener('click', handleTextMode);
selectMode.addEventListener('click', handleSelectMode);
fireMode.addEventListener('click', activateFireMode);
refreshMode.addEventListener('click', handleReset);
