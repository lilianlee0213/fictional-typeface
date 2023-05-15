const editable = document.querySelectorAll('.editable');
const selectMode = document.querySelector('.select-mode');
const textMode = document.querySelector('.text-mode');
const fireMode = document.querySelector('.fire-mode');
const notifications = document.querySelector('.notifications');
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
};
const shootThis = (event) => {
	const targetElement = event.target.closest('.shootable');
	if (isFireMode) {
		targetElement.style.opacity = 0;
	}
};

notifications.addEventListener('click', (e) => handleRemoveNotification(e));
textMode.addEventListener('click', handleTextMode);
selectMode.addEventListener('click', handleSelectMode);
fireMode.addEventListener('click', () => {
	isFireMode = true;
	editable.forEach((item) => {
		item.contentEditable = false;
	});

	links.forEach((link) => link.classList.add('disabled-link'));
});
