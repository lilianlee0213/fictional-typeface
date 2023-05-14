const editable = document.querySelectorAll('.editable');
const textMode = document.querySelector('.text-mode');
const selectMode = document.querySelector('.select-mode');
const handleSelectMode = () => {
	editable.forEach((item) => {
		item.contentEditable = false;
	});
};

textMode.addEventListener('click', () => {
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
});

selectMode.addEventListener('click', handleSelectMode);
