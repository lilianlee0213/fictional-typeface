const fictionalText = 'Fictional';
const textArray = fictionalText.split('');
const title = document.getElementById('title');
const charsetList = document.getElementById('charsets');
const charsetDetail = document.querySelector('.charset-detail span');

const charsets = [
	'A',
	'B',
	'C',
	'D',
	'E',
	'F',
	'G',
	'H',
	'I',
	'J',
	'K',
	'L',
	'M',
	'N',
	'O',
	'P',
	'Q',
	'R',
	'S',
	'T',
	'U',
	'V',
	'W',
	'X',
	'Y',
	'Z',
	'a',
	'b',
	'c',
	'd',
	'e',
	'f',
	'g',
	'h',
	'i',
	'j',
	'k',
	'l',
	'm',
	'n',
	'o',
	'p',
	'q',
	'r',
	's',
	't',
	'u',
	'v',
	'w',
	'x',
	'y',
	'z',
	0,
	1,
	2,
	3,
	4,
	5,
	6,
	7,
	8,
	9,
];

function displayText() {
	let currentChar = textArray.shift();
	if (currentChar !== undefined) {
		const span = document.createElement('span');
		const index = Math.abs(textArray.length - 8) + 1;
		span.innerHTML = currentChar;
		span.style.animation = `title-animation ${index * 0.05}s`;
		setTimeout(() => {
			title.appendChild(span);

			displayText();
		}, 200);
	}
}
displayText();

const charsetHtml = charsets
	.map(
		(charset) => `
  <li class="list">
    <button>${charset}</button>
  </li>
`
	)
	.join('');

charsetList.innerHTML = charsetHtml;

charsetList.addEventListener('click', (e) => {
	if (!e.target.matches('button')) return;
	charsetDetail.textContent = e.target.textContent;
	charsetDetail.classList.add('charset-popUp');
	setTimeout(() => {
		charsetDetail.classList.remove('charset-popUp');
	}, 200);
});
