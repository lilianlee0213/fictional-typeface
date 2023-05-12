const fictionalText = 'Fictional';
let textArray = fictionalText.split('');

function displayText() {
	let currentChar = textArray.shift();
	const title = document.getElementById('title');
	if (currentChar !== undefined) {
		let span = document.createElement('span');
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

let charsetHtml = '';
for (let charset of charsets) {
	charsetHtml += `
        <li class="list">
			<button>${charset}</button>
		</li>
    `;
}
document.getElementById('charsets').innerHTML = charsetHtml;
