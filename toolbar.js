const editable = document.querySelectorAll('.editable');
const selectMode = document.querySelector('.select-mode');
const textMode = document.querySelector('.text-mode');
const notifications = document.querySelector('.notifications');

handleRemoveNotification = (event) => {
	if (!event.target.matches('button')) return;
	event.target.style.display = 'none';
};
const handleSelectMode = () => {
	editable.forEach((item) => {
		item.contentEditable = false;
	});
};

const handleTextMode = () => {
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
notifications.addEventListener('click', (e) => handleRemoveNotification(e));
textMode.addEventListener('click', handleTextMode);
selectMode.addEventListener('click', handleSelectMode);
