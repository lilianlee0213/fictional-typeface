const body = document.querySelector('body');
const toolbar = document.querySelector('.toolbar');
const modes = document.querySelector('.toolbar');
const fireMode = document.querySelector('.fire-mode');
const refreshMode = document.querySelector('.refresh');
const editable = document.querySelectorAll('.editable');
const shootables = document.querySelectorAll('.shootable');
const refreshScreen = document.querySelector('.refreshScreen');
const refreshText = document.querySelector('.refreshScreen-text');
const notifications = document.querySelector('.notifications');
const toolbarNotification = document.querySelector('.notification-toolbar');
const textModeNotification = document.querySelector('.notification-text');
const fireModeNotification = document.querySelector('.notification-fire');
const shotAllNotification = document.querySelector('.notification-shotAll');
const fireAudio = document.querySelector('.fire-sound');
const notiAudio = document.querySelector('.noti-sound');

const restoreAudio = document.querySelector('.restore-sound');
const score = document.querySelector('.score');
const links = document.querySelectorAll('a');
let shots = 0;
let isFireMode = false;
let isFireModeUnlocked = false;

modes.addEventListener('click', function (e) {
	const mode = e.target.closest('.toolbar-btn');
	if (!mode) {
		return;
	}
	const isFireMode = mode.title === 'Fire mode';
	const isTextMode = mode.title === 'Text mode';
	if (mode.title !== 'Fire mode') {
		body.classList.remove('body-firemode');
	}
	links.forEach((link) => {
		link.setAttribute('aria-disabled', isFireMode || isTextMode);
	});
	switch (mode.title) {
		case 'Select mode':
			handleSelectMode();
			break;
		case 'Text mode':
			handleTextMode();
			break;
		case 'Fire mode':
			if (isFireModeUnlocked) {
				handleFireMode();
				body.classList.add('body-firemode');
			}
			break;
		case 'Refresh':
			if (!refreshMode.disabled) {
				handleRefreshMode();
			}
			break;
	}
});
const handleSelectMode = () => {
	isFireMode = false;
	editable.forEach((item) => {
		item.contentEditable = false;
	});
	score.classList.remove('score-active');
};

// Setting the original text to bring it back when isTextMode
editable.forEach((item) => {
	item.setAttribute('data-initial-text', item.innerHTML.trim(''));
	item.setAttribute('data-max-length', item.textContent.trim('').length);
	if (!item.dataset.initialText) {
		item.dataset.initialText = 'Fictional';
	}
	if (item.dataset.maxLength === '0') {
		item.dataset.maxLength = 9;
	}
});

const handleTextMode = () => {
	isFireMode = false;
	score.classList.remove('score-active');
	editable.forEach((item) => {
		const maxLength = parseInt(item.dataset.maxLength);
		item.contentEditable = true;
		item.style.borderColor = '#00a3ff';
		item.addEventListener('keydown', (e) => {
			if (item.textContent.trim().length > maxLength && e.key !== 'Backspace') {
				item.style.borderColor = 'red';
				e.preventDefault();
			} else {
				item.style.borderColor = '#00a3ff';
			}
			// when a user ever uses textMode, fireMode is unlocked
			if (e.key === 'Backspace' && !isFireModeUnlocked) {
				notiAudio.play();
				isFireModeUnlocked = true;
				fireMode.disabled = false;
				fireModeNotification.classList.add('unlocked');
			}
			// enable refreshmode when keydown event
			refreshMode.disabled = false;
		});
	});
};

const handleFireMode = () => {
	// change other Mode to fireMode
	isFireMode = true;
	editable.forEach((item) => {
		item.contentEditable = false;
	});
	score.classList.add('score-active');
};

const shootThis = (event) => {
	// find shootable, add "shot": each shot will be 100 points
	const targetElement = event.target.closest('.shootable');
	if (isFireMode) {
		fireAudio.currentTime = 0;
		fireAudio.play();
		shots = shots + 1;
		targetElement.classList.add('shot');
		score.textContent = Number(score.textContent) + 100;
		score.classList.add('score-animated');
		body.classList.add('body-shotfired');
		setTimeout(() => {
			score.classList.remove('score-animated');
			body.classList.remove('body-shotfired');
		}, 300);
	}
	if (shots > 0) {
		refreshMode.disabled = false;
	}
	if (shots === shootables.length) {
		score.textContent = 'YAY';
		score.style.backgroundColor = '#3ccb09';
		shotAllNotification.classList.add('unlocked');
		setTimeout(() => {
			notiAudio.play();
		}, 300);
	}
};

const handleRefreshMode = () => {
	refreshScreen.classList.add('restoring');
	handleRestoreAnimation();
	restoreAudio.play();
	setTimeout(handleReset, 1500);
};

// Reset all the contents from textMode and fireMode
const handleReset = () => {
	shots = 0;
	score.textContent = 0;
	score.style.backgroundColor = '#fd4b38';
	handleSelectMode();
	editable.forEach((item) => {
		item.innerHTML = item.dataset.initialText;
	});
	shootables.forEach((item) => {
		item.classList.remove('shot');
	});
	shotAllNotification.classList.remove('unlocked');
	refreshScreen.classList.remove('restoring');
	body.classList.remove('body-firemode');
	refreshMode.disabled = true;
};
const handleRestoreAnimation = () => {
	const refreshArray = refreshText.textContent.split('');
	const refreshHtml = refreshArray
		.map((letter, index) => {
			index = index + 2;
			const delay = index / 10;
			return `<span style="animation-delay:${delay}s">${letter}</span>`;
		})
		.join('');
	refreshText.innerHTML = refreshHtml;
};

//add notification for toolbar and textMode when scroll
const handleToolbarUnlocked = () => {
	toolbar.classList.add('toolbar-visible');
	toolbarNotification.classList.add('unlocked');
	textModeNotification.classList.add('unlocked');
	notiAudio.play();
	body.removeEventListener('click', handleToolbarUnlocked);
};
// remove notification
const handleRemoveNotification = (event) => {
	if (!event.target.matches('button')) return;
	event.target.style.display = 'none';
};

// window.addEventListener('scroll', handleToolbarUnlocked);
body.addEventListener('click', handleToolbarUnlocked);
notifications.addEventListener('click', (e) => handleRemoveNotification(e));
