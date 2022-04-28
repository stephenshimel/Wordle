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
const Dictionary = [
	"Abuse",
	"Adult",
	"Agent",
	"Anger",
	"Apple",
	"Award",
	"Basis",
	"Beach",
	"Birth",
	"Block",
	"Blood",
	"Board",
	"Brain",
	"Bread",
	"Break",
	"Brown",
	"Buyer",
	"Cause",
	"Chain",
	"Chair",
	"Chest",
	"Chief",
	"Child",
	"China",
	"Claim",
	"Class",
	"Clock",
	"Coach",
	"Coast",
	"Court",
	"Cover",
	"Cream",
	"Crime",
	"Cross",
	"Crowd",
	"Crown",
	"Cycle",
	"Dance",
	"Death",
	"Depth",
	"Doubt",
	"Draft",
	"Drama",
	"Dream",
	"Dress",
	"Drink",
	"Drive",
	"Earth",
	"Enemy",
	"Entry",
	"Faith",
	"Fault",
	"Field",
	"Fight",
	"Final",
	"Floor",
	"Focus",
	"Force",
	"Frame",
	"Frank",
	"Front",
	"Fruit",
	"Glass",
	"Grant",
	"Grass",
	"Green",
	"Group",
	"Guide",
	"Heart",
	"Henry",
	"Horse",
	"Hotel",
	"House",
	"Index",
	"Input",
	"Issue",
	"Japan",
	"Jones",
	"Judge",
	"Knife",
	"Laura",
	"Layer",
	"Level",
	"Lewis",
	"Light",
	"Limit",
	"Lunch",
	"Major",
	"March",
	"Match",
	"Metal",
	"Model",
	"Money",
	"Month",
	"Motor",
	"Mouth",
	"Music",
	"Night",
	// Noise,
	// North,
	// Novel,
	// Nurse,
	// Offer,
	// Order,
	// Other,
	// Owner,
	// Panel,
	// Paper,
	// Party,
	// Peace,
	// Peter,
	// Phase,
	// Phone,
	// Piece,
	// Pilot,
	// Pitch,
	// Place,
	// Plane,
	// Plant,
	// Plate,
	// Point,
	// Pound,
	// Power,
	// Press,
	// Price,
	// Pride,
	// Prize,
	// Proof,
	// Queen,
	// Radio,
	// Ratio,
	// Reply,
	// Right,
	// River,
	// Round,
	// Route,
	// Rugby,
	// Scale,
	// Scene,
	// Scope,
	// Score,
	// Sense,
	// Shape,
	// Share,
	// Sheep,
	// Sheet,
	// Shift,
	// Shirt,
	// Shock,
	// Sight,
	// Simon,
	// Skill,
	// Sleep,
	// Smile,
	// Smith,
	// Smoke,
	// Sound,
	// South,
	// Space,
	// Speed,
	// Spite,
	// Sport,
	// Squad,
	// Staff,
	// Stage,
	// Start,
	// State,
	// Steam,
	// Steel,
	// Stock,
	// Stone,
	// Store,
	// Study,
	// Stuff,
	// Style,
	// Sugar,
	// Table,
	// Taste,
	// Terry,
	// Theme,
	// Thing,
	// Title,
	// Total,
	// Tower,
	// Track,
	// Trade,
	// Train,
	// Trend,
	// Trial,
	// Trust,
	// Truth,
	// Uncle,
	// Union,
	// Unity,
	// Value,
	// Video,
	// Visit,
	// Voice,
	// Waste,
	// Watch,
	// Water,
	// While,
	// White,
	// Whole,
	// Woman,
	// World,
	// Youth,
];

const getRandomElement = arr => {
	if (arr.length === 0) return;
	return arr[Math.floor(Math.random() * arr.length)];
};
const word = [];
const words = [];
let nextCellId = 0;
const correctWordStr = getRandomElement(Dictionary).toUpperCase();
console.log(correctWordStr);

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
		// if (correctWordStr === word.join("")) {
		// 	alert("win");
		// }

		word.splice(0, word.length);
		words.push([...word]);
	}
};

document.addEventListener("keydown", e => {
	handleKeyDown(e);
});
