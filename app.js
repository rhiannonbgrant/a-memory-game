const theCards = document.querySelectorAll(".the-card");
const changeCardPic = document.querySelectorAll(".the-card use");
const cardTypes = document.querySelectorAll("symbol");
const introScreen = document.querySelector("#intro");
const letsPlay = document.querySelector("#intro button");
const playGame = document.querySelector("#play-game");
const finished = document.querySelector("#finished");

const cards = Array.from(theCards);

const twoCardsTurned = null;

console.log(cardTypes);

let noOfCardsTurned = 0;
let card1;
let card2;
let picture1Location;
let picture2Location;
let getCard1;
let getCard2;

let numbers50 = [
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
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
  26,
  27,
  28,
  29,
  30,
  31,
  32,
  33,
  34,
  35,
  36,
  37,
  38,
  39,
  40,
  41,
  42,
  43,
  44,
  45,
  46,
  47,
  48,
  49
];

let random20pairs = [];

for (let i = 0; i < 20; i++) {
  let randomNumber = Math.floor(Math.random() * numbers50.length);
  random20pairs.push(numbers50[randomNumber], numbers50[randomNumber]);
  numbers50.splice(randomNumber, 1);
}

let randomlyOrderCards = [];

for (let j = 0; j < 40; j++) {
  let randomNumber = Math.floor(Math.random() * random20pairs.length);
  randomlyOrderCards.push(random20pairs[randomNumber]);
  random20pairs.splice(randomNumber, 1);
}

for (let k = 0; k < 40; k++) {
  let picture = "#" + cardTypes[randomlyOrderCards[k]].getAttribute("id");
  changeCardPic[k].setAttribute("href", picture);
}

letsPlay.addEventListener("click", () => {
  introScreen.classList.toggle("fadeIn");
  playGame.classList.toggle("fadeIn");
});

cards.forEach((card) => {
  card.addEventListener("click", () => {
    noOfCardsTurned++;
    if (noOfCardsTurned < 3) {
      card.classList.add("turn-card");
      console.log(noOfCardsTurned);
      let noOfCardsRemoved = 0;
      if (noOfCardsTurned % 2 !== 0) {
        getCard1 = cards[cards.indexOf(card)];
        picture1Location = getCard1.getElementsByTagName("use").item(0);
        card1 = picture1Location.getAttribute("href");
        console.log(card1);
      } else if (noOfCardsTurned % 2 === 0) {
        console.log(noOfCardsTurned);
        getCard2 = cards[cards.indexOf(card)];
        picture2Location = getCard2.getElementsByTagName("use").item(0);
        card2 = picture2Location.getAttribute("href");
        console.log(card2);
        if (card1 !== card2) {
          setTimeout(() => {
            getCard1.classList.remove("turn-card");
            getCard2.classList.remove("turn-card");
            noOfCardsTurned = 0;
          }, 2000);
        } else if (card1 === card2) {
          setTimeout(() => {
            getCard1.classList.add("removeCard");
            getCard2.classList.add("removeCard");
            noOfCardsRemoved = noOfCardsRemoved + 2;
            noOfCardsTurned = 0;
            console.log(noOfCardsRemoved);
            if (noOfCardsRemoved === cards.length) {
              playGame.classList.toggle("fadeIn");
              finished.classList.toggle("fadeIn");
            }
          }, 2000);
        }
      }
    }
  });
});

// console.log(random20pairs.length);
// console.log(numbers50.length);
console.log(randomlyOrderCards.length);
console.log(cards.length);

// });

// if (!twoCardsTurned) {
