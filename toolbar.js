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
const score = document.querySelector('.score');
const links = document.querySelectorAll('a');
let isFireMode = false;
let isFireModeUnlocked = false;

modes.addEventListener('click', function (e) {
	const mode = e.target.closest('.toolbar-btn');
	const body = document.querySelector('body');
	mode.title !== 'Fire mode'
		? body.classList.remove('body-firemode')
		: body.classList.add('body-firemode');
	switch (mode.title) {
		case 'Select mode':
			handleSelectMode();
			break;
		case 'Text mode':
			handleTextMode();
			break;
		case 'Fire mode':
			handleFireMode();
			break;
		case 'Refresh':
			handleRefreshMode();
			break;
	}
});
const handleSelectMode = () => {
	isFireMode = false;
	editable.forEach((item) => {
		item.contentEditable = false;
	});
	links.forEach((link) => link.classList.remove('disabled-link'));
	score.classList.remove('score-active');
};

// Setting the original text to bring it back when isTextMode
editable.forEach((item) => {
	item.setAttribute('data-initial-text', item.innerHTML.trim(''));
	if (!item.dataset.initialText) {
		item.dataset.initialText = 'Fictional';
	}
});

const handleTextMode = () => {
	isFireMode = false;
	score.classList.remove('score-active');
	editable.forEach((item) => {
		const maxLength = item.textContent.trim().length;
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
	links.forEach((link) => link.classList.add('disabled-link'));
};

const shootThis = (event) => {
	let shots = 0;
	// find shootable, add "shot": each shot will be 100 points
	const targetElement = event.target.closest('.shootable');
	if (isFireMode) {
		targetElement.classList.add('shot');
		score.textContent = Number(score.textContent) + 100;
		setTimeout(() => {
			score.classList.add('score-animated');
		});
		score.classList.remove('score-animated');
	}
	// Count each shot to check if all shootables shots
	shootables.forEach((element) => {
		if (element.classList.contains('shot')) {
			shots++;
			// allow refreshMode when any shot
			refreshMode.disabled = false;
		}
	});
	if (shots === shootables.length) {
		shotAllNotification.classList.add('unlocked');
		score.textContent = 'HOORAY';
		score.style.backgroundColor = '#3ccb09';
	}
};

const handleRefreshMode = () => {
	refreshScreen.classList.add('restoring');
	handleRestoreAnimation();
	setTimeout(handleReset, 1500);
};

// Reset all the contents from textMode and fireMode
const handleReset = () => {
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
	document.querySelector('body').classList.remove('body-firemode');
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
