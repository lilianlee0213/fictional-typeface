const toolbar = document.querySelector('.toolbar');
const editable = document.querySelectorAll('.editable');
const selectMode = document.querySelector('.select-mode');
const textMode = document.querySelector('.text-mode');
const fireMode = document.querySelector('.fire-mode');
const shootables = document.querySelectorAll('.shootable');
const notifications = document.querySelector('.notifications');
const shotAllNotification = document.querySelector('.notification-shotAll');
const toolbarNotification = document.querySelector('.notification-toolbar');
const textModeNotification = document.querySelector('.notification-text');
const score = document.querySelector('.score');
const links = document.querySelectorAll('a');
let isFireMode = false;

const handleToolbarUnlocked = () => {
	if (scrollY > 300) {
		toolbar.classList.add('toolbar-visible');
		toolbarNotification.classList.add('unlocked');
		textModeNotification.classList.add('unlocked');
		window.removeEventListener('scroll', handleToolbarUnlocked);
	}
};
handleRemoveNotification = (event) => {
	if (!event.target.matches('button')) return;
	event.target.style.display = 'none';
};
const handleSelectMode = () => {
	editable.forEach((item) => {
		item.contentEditable = false;
	});
	isFireMode = false;
	links.forEach((link) => link.classList.remove('disabled-link'));
	score.classList.remove('score-active');
};
const handleTextMode = () => {
	isFireMode = false;
	editable.forEach((item) => {
		item.contentEditable = true;
		const maxLength = item.textContent.trim().length;
		item.addEventListener('keydown', (e) => {
			if (item.textContent.trim().length > maxLength && e.key !== 'Backspace') {
				item.style.borderColor = 'red';
				e.preventDefault();
			} else {
				item.style.borderColor = '#00a3ff';
			}
		});
	});
	score.classList.remove('score-active');
};
const shootThis = (event) => {
	let shotAll = true;
	const targetElement = event.target.closest('.shootable');
	if (isFireMode) {
		targetElement.classList.add('shot');
		score.textContent = Number(score.textContent) + 100;
	}
	shootables.forEach((element) => {
		if (!element.classList.contains('shot')) {
			shotAll = false;
			console.log(element);
		}
	});
	if (shotAll) {
		shotAllNotification.classList.add('unlocked');
	}
};
const activateFireMode = () => {
	isFireMode = true;
	editable.forEach((item) => {
		item.contentEditable = false;
	});
	score.classList.add('score-active');
	links.forEach((link) => link.classList.add('disabled-link'));
};

window.addEventListener('scroll', handleToolbarUnlocked);
notifications.addEventListener('click', (e) => handleRemoveNotification(e));
textMode.addEventListener('click', handleTextMode);
selectMode.addEventListener('click', handleSelectMode);
fireMode.addEventListener('click', activateFireMode);
