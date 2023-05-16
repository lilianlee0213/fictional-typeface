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
	'?',
	'~',
	'`',
	'!',
	'@',
	'#',
	'$',
	'%',
	'^',
	'&',
	'*',
	'(',
	')',
	'-',
	'_',
	'+',
	'=',
	'[',
	']',
	'{',
	'}',
	'|',
	'/',
	'<',
	'>',
	':',
	';',
	'"',
	"'",
];
const title = document.getElementById('title');
const styleBox = document.querySelector('.styles');
const textBox = document.querySelector('.textBox-text');
const weightInput = document.getElementById('weight-input');
const charsetBox = document.querySelector('.charset');
const charsetList = document.getElementById('charsets');
const charsetDetail = document.querySelector('.charset-detail ');
const charsetDetailText = document.querySelector('.charset-detail span');
const infoBox = document.querySelector('.info');
const fictionalText = 'Fictional';
const textArray = fictionalText.split('');

let isLoaded = false;
function displayText() {
	isLoaded = true;
	if (isLoaded) {
		const letters = textArray
			.map((letter, index) => {
				index = index + 2;
				const delay = index / 10;
				return `<span style="animation-delay: ${delay}s" >${letter}</span>`;
			})
			.join('');
		title.innerHTML = letters;
	}

	// if (currentChar !== undefined) {
	// 	const span = document.createElement('span');
	// 	const index = Math.abs(textArray.length - 8) + 1;
	// 	span.innerHTML = currentChar;
	// 	span.style.animation = `title-animation ${index * 0.05}s`;
	// 	setTimeout(() => {
	// 		title.appendChild(span);
	// 		displayText();
	// 	}, 200);
	// }
}

window.addEventListener('DOMContentLoaded', function () {
	displayText();
});

//Styles Font Weight Click Event
styleBox.addEventListener('click', (e) => {
	if (!e.target.matches('button')) return;
	const weight = e.target.dataset.fw;
	textBox.style.fontFamily = weight;
	weightInput.value =
		weight === 'fic300'
			? 0
			: weight === 'fic400'
			? 30
			: weight === 'fic500'
			? 60
			: weight === 'fic700'
			? 90
			: 120;
});
//TextBox Font Weight Change Event
weightInput.addEventListener('input', () => {
	const weight = parseInt(weightInput.value);
	textBox.style.fontFamily =
		weight < 25
			? 'fic300'
			: weight < 50
			? 'fic400'
			: weight < 75
			? 'fic500'
			: weight < 100
			? 'fic700'
			: 'fic900';
});

// Charset Html and Animation
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
	charsetDetailText.textContent = e.target.textContent;
	charsetDetailText.classList.add('charset-popUp');
	setTimeout(() => {
		charsetDetailText.classList.remove('charset-popUp');
	}, 200);
});
const showCharsetDetail = () => {
	const scrollPosition = window.scrollY + window.innerHeight - 180;
	const shouldShowCharsetDetail =
		window.matchMedia('(max-width: 701px)').matches &&
		scrollPosition > charsetBox.offsetTop &&
		scrollPosition < infoBox.offsetTop + 50;

	charsetDetail.classList.toggle(
		'charset-detail-visible',
		shouldShowCharsetDetail
	);
};

document.addEventListener('scroll', showCharsetDetail);
