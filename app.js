const theCards = document.querySelectorAll(".the-card");
const changeCardPic = document.querySelectorAll(".the-card use");
const cardTypes = document.querySelectorAll("symbol");
const introScreen = document.querySelector("#intro");
const letsPlay = document.querySelector("#intro button");
const playGame = document.querySelector("#play-game");
const finished = document.querySelector("#finished");

let random20pairs = [];
const cards = Array.from(theCards);

let noOfCardsTurned = 0;
let cardId1;
let cardId2;
let card1;
let card2;
let picture1Location;
let picture2Location;
let getCard1;
let getCard2;
let noOfCardsRemoved = 0;
let randomlyOrderCards = [];

function range(j, k) {
  return Array.apply(null, Array(k - j + 1)).map(function (_, n) {
    return n + j;
  });
}

let numbers50 = range(0, cardTypes.length - 1);

for (let i = 0; i < 20; i++) {
  let randomNumber = Math.floor(Math.random() * numbers50.length);
  random20pairs.push(numbers50[randomNumber], numbers50[randomNumber]);
  numbers50.splice(randomNumber, 1);
}

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
      if (noOfCardsTurned % 2 !== 0) {
        cardId1 = card.getAttribute("id");
        getCard1 = cards[cards.indexOf(card)];
        console.log(getCard1);
        picture1Location = getCard1.getElementsByTagName("use").item(0);
        card1 = picture1Location.getAttribute("href");
      } else if (noOfCardsTurned % 2 === 0) {
        cardId2 = card.getAttribute("id");
        if (cardId1 !== cardId2) {
          getCard2 = cards[cards.indexOf(card)];
          console.log(getCard2);
          picture2Location = getCard2.getElementsByTagName("use").item(0);
          card2 = picture2Location.getAttribute("href");
          if (card1 !== card2) {
            setTimeout(() => {
              getCard1.classList.remove("turn-card");
              getCard2.classList.remove("turn-card");
              noOfCardsTurned = 0;
            }, 1000);
          } else if (card1 === card2) {
            setTimeout(() => {
              getCard1.classList.add("removeCard");
              getCard2.classList.add("removeCard");
              noOfCardsRemoved += 2;
              console.log(noOfCardsRemoved);
              noOfCardsTurned = 0;
              if (noOfCardsRemoved === cards.length) {
                playGame.classList.toggle("fadeIn");
                finished.classList.toggle("fadeIn");
              }
            }, 1000);
          }
        } else if (cardId1 === cardId2) {
          noOfCardsTurned--;
        }
      }
    }
  });
});
