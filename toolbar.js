const editable = document.querySelectorAll('.editable');
const selectMode = document.querySelector('.select-mode');
const textMode = document.querySelector('.text-mode');
const fireMode = document.querySelector('.fire-mode');
const shootables = document.querySelectorAll('.shootable');
const shotAllNotification = document.querySelector('.notification-shotAll');
const notifications = document.querySelector('.notifications');
const score = document.querySelector('.score');
const links = document.querySelectorAll('a');
let isFireMode = false;

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

notifications.addEventListener('click', (e) => handleRemoveNotification(e));
textMode.addEventListener('click', handleTextMode);
selectMode.addEventListener('click', handleSelectMode);
fireMode.addEventListener('click', activateFireMode);
