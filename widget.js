const boardElement = document.querySelector(".board");
const keyboardElement = document.querySelector(".keyboard");
const alphabet = "qwertyuiopasdfghjklzxcvbnm".toUpperCase();

// draw UI
for (let i = 0; i < 5 * 6; i++) {
	const gridItem = document.createElement("div");
	gridItem.className = "board-item";
	gridItem.id = `cell-${i}`;
	boardElement.appendChild(gridItem);
}

for (let i = 0; i < alphabet.length; i++) {
	const gridItem = document.createElement("div");
	gridItem.className = "key-item";
	gridItem.id = `cell-${alphabet[i]}`;
	gridItem.innerHTML = alphabet[i];
	keyboardElement.appendChild(gridItem);
}

// game state
const word = [];
const words = [];
let nextCellId = 0;
const correctWordStr = "apple".toUpperCase();

const isSingleLetter = str => {
	if (str.length !== 1) return false;
	return /[a-zA-Z]/.test(str);
};

const handleKeyDown = e => {
	const input = e.key.toUpperCase();

	// a single letter
	if (isSingleLetter(input)) {
		if (word.length >= 5 || words.length >= 6) {
			alert("can not add a new letter");
			return;
		}
		word.push(input);
		const cellElement = document.querySelector(`#cell-${nextCellId}`);
		cellElement.innerHTML = input;
		nextCellId++;
	}
	// Backspace
	if (input === "BACKSPACE") {
		if (word.length === 0) {
			alert("can not delete a letter");
			return;
		}
		word.pop();
		nextCellId--;
		const cellElement = document.querySelector(`#cell-${nextCellId}`);
		cellElement.innerHTML = "";
	}
	// Enter
	if (input === "ENTER") {
		if (word.length < 5 || words.length === 6) {
			alert("can not make a guess");
			return;
		}
		word.forEach((letter, index) => {
			const cellElement = document.querySelector(
				`#cell-${nextCellId - 5 + index}`
			);
			const keyElement = document.querySelector(`#cell-${letter}`);
			// corrent position
			if (letter === correctWordStr[index]) {
				cellElement.style.backgroundColor = "green";
				keyElement.style.backgroundColor = "green";

				// exist but wrong position
			} else if (correctWordStr.includes(letter)) {
				cellElement.style.backgroundColor = "yellow";
				if (keyElement.style.backgroundColor !== "green") {
					keyElement.style.backgroundColor = "yellow";
				}

				// not exist
			} else {
				cellElement.style.backgroundColor = "grey";
				if (
					keyElement.style.backgroundColor !== "green" &&
					keyElement.style.backgroundColor !== "yellow"
				) {
					keyElement.style.backgroundColor = "grey";
				}
			}
		});

		// whether win
		if (correctWordStr === word.join("")) {
			alert("win");
		}

		word.splice(0, word.length);
		words.push([...word]);
	}
};

document.addEventListener("keydown", e => {
	handleKeyDown(e);
});

// Irrelevant to the game
// get word from row and column directions
const correctArr = ["q1w1e1", "w0w1w2w3"];
const arr2d = [
	["q0", "w0"],
	["q1", "w1", "e1"],
	["q2", "w2", "e2"],
	["q3", "w3"],
];

const wordArr = []; //string
let maxLength = -Infinity;
for (let y = 0; y < arr2d.length; y++) {
	wordArr.push(arr2d[y].join(""));
	if (arr2d.length > maxLength) {
		maxLength = arr2d.length;
	}
}

for (let x = 0; x < maxLength; x++) {
	let str = "";
	for (let y = 0; y < arr2d.length; y++) {
		str += arr2d[y][x] ? arr2d[y][x] : "";
	}
	wordArr.push(str);
}

const wordArrFiltered = wordArr.filter(str => {
	return str !== "";
});

console.log(
	wordArrFiltered.filter(str => {
		return correctArr.includes(str);
	})
);
