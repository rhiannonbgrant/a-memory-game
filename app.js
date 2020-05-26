const theCards = document.querySelectorAll(".the-card");
const changeCardPic = document.querySelectorAll(".the-card use");
const cardTypes = document.querySelectorAll("symbol");
const introScreen = document.querySelector("#intro");
const letsPlay = document.querySelector("#intro button");
const playAgain = document.querySelector("#finished button");
const playGame = document.querySelector("#play-game");
const finished = document.querySelector("#finished");
const htmlElm = document.getElementsByTagName("html").item(0);
const theCardsContainer = document.querySelectorAll(".card-container");
let intFrameWidth = htmlElm.clientWidth;
let intFrameHeight = htmlElm.clientHeight;

let randomPairs = [];
let noOfRandomPairs;
let noOfCards;

const cards = Array.from(theCards);
const cardsContainer = Array.from(theCardsContainer);

let noOfCardsTurned = 0;
let card1Index;
let card2Index;
let card1;
let card2;
let picture1Location;
let picture2Location;
let getCard1;
let getCard2;
let noOfCardsRemoved = 0;
let randomlyOrderCards = [];

//Generate different numbers of cards for different screen sizes
// mobile portrait
if (intFrameWidth < 481) {
  noOfRandomPairs = 10;
  noOfCards = 20;
  cardsContainer.forEach((cardContainer) => {
    if (cardsContainer.indexOf(cardContainer) >= noOfCards) {
      cardContainer.classList.add("remove-card");
    }
  });
  // mobile landscape
} else if (intFrameWidth < 900 && intFrameHeight < 481) {
  noOfRandomPairs = 10;
  noOfCards = 20;
  cardsContainer.forEach((cardContainer) => {
    if (cardsContainer.indexOf(cardContainer) >= noOfCards) {
      cardContainer.classList.add("remove-card");
    }
  });
  // Ipad landscape
} else if (intFrameWidth < 1030 && intFrameHeight < 780) {
  noOfRandomPairs = 20;
  noOfCards = 40;
  cardsContainer.forEach((cardContainer) => {
    if (cardsContainer.indexOf(cardContainer) >= noOfCards) {
      cardContainer.classList.add("remove-card");
    }
  });
  // Ipad portrait
} else if (intFrameHeight < 1030 && intFrameWidth < 780) {
  noOfRandomPairs = 20;
  noOfCards = 40;
  cardsContainer.forEach((cardContainer) => {
    if (cardsContainer.indexOf(cardContainer) >= noOfCards) {
      cardContainer.classList.add("remove-card");
    }
  });
  //Large tablets portrait
} else if (intFrameWidth < 1460 && intFrameHeight > 781) {
  noOfRandomPairs = 25;
  noOfCards = 50;
  cardsContainer.forEach((cardContainer) => {
    if (cardsContainer.indexOf(cardContainer) >= noOfCards) {
      cardContainer.classList.add("remove-card");
    }
  });
  // 13inch destop and large tablet is landscape
} else if (intFrameWidth < 1460) {
  noOfRandomPairs = 25;
  noOfCards = 50;
  cardsContainer.forEach((cardContainer) => {
    if (cardsContainer.indexOf(cardContainer) >= noOfCards) {
      cardContainer.classList.add("remove-card");
    }
  });
  //Large screens
} else if (intFrameWidth < 1740) {
  noOfRandomPairs = 30;
  noOfCards = 60;
  cardsContainer.forEach((cardContainer) => {
    if (cardsContainer.indexOf(cardContainer) >= noOfCards) {
      cardContainer.classList.add("remove-card");
    }
  });
  //Larger screens
} else {
  noOfRandomPairs = 45;
  noOfCards = 70;
}

//Generating the game
//create an array of 50 numbers from 0 - 49

function range(j, k) {
  return Array.apply(null, Array(k - j + 1)).map(function (_, n) {
    return n + j;
  });
}

let numbers50 = range(0, cardTypes.length - 2);

function setTheCards() {
  //Randomly generate different pictures for each game
  for (let i = 0; i < noOfRandomPairs; i++) {
    let randomNumber = Math.floor(Math.random() * numbers50.length);
    randomPairs.push(numbers50[randomNumber], numbers50[randomNumber]);
    numbers50.splice(randomNumber, 1);
  }
  //Ramdomly order cards on the screen
  for (let j = 0; j < noOfCards; j++) {
    let randomNumber = Math.floor(Math.random() * randomPairs.length);
    randomlyOrderCards.push(randomPairs[randomNumber]);
    randomPairs.splice(randomNumber, 1);
  }
  //Attach the picture to the randomly ordered cards
  for (let k = 0; k < noOfCards; k++) {
    let picture = "#" + cardTypes[randomlyOrderCards[k]].getAttribute("id");
    changeCardPic[k].setAttribute("href", picture);
  }
  noOfCardsRemoved = 0;
}

//The functions that runs the game
cards.forEach((card) => {
  card.addEventListener("click", () => {
    noOfCardsTurned++;
    if (noOfCardsTurned < 3) {
      card.classList.add("turn-card");
      if (noOfCardsTurned % 2 !== 0) {
        card1Index = cards.indexOf(card);
        getCard1 = cards[cards.indexOf(card)];
        console.log(getCard1);
        picture1Location = getCard1.getElementsByTagName("use").item(0);
        card1 = picture1Location.getAttribute("href");
      } else if (noOfCardsTurned % 2 === 0) {
        card2Index = cards.indexOf(card);
        if (card1Index !== card2Index) {
          getCard2 = cards[cards.indexOf(card)];
          console.log(getCard2);
          picture2Location = getCard2.getElementsByTagName("use").item(0);
          card2 = picture2Location.getAttribute("href");
          if (card1 !== card2) {
            setTimeout(() => {
              getCard1.classList.toggle("turn-card");
              getCard2.classList.toggle("turn-card");
              noOfCardsTurned = 0;
            }, 1000);
          } else if (card1 === card2) {
            setTimeout(() => {
              getCard1.classList.toggle("remove-card");
              getCard2.classList.toggle("remove-card");
              noOfCardsRemoved += 2;
              console.log(noOfCardsRemoved);
              noOfCardsTurned = 0;
              if (noOfCardsRemoved === noOfCards) {
                playGame.classList.toggle("fadeIn");
                finished.classList.toggle("fadeIn");
                cards.forEach((card) => {
                  card.classList.toggle("remove-card");
                  card.classList.toggle("turn-card");
                  randomPairs = [];
                  randomlyOrderCards = [];
                });
              }
            }, 1000);
          }
        } else if (card1Index === card2Index) {
          noOfCardsTurned--;
        }
      }
    }
  });
});

letsPlay.addEventListener("click", () => {
  introScreen.classList.toggle("fadeIn");
  setTheCards();
  playGame.classList.toggle("fadeIn");
});

playAgain.addEventListener("click", () => {
  finished.classList.toggle("fadeIn");
  setTheCards();
  playGame.classList.toggle("fadeIn");
});

console.log(cardTypes);

console.log(numbers50);
console.log(noOfRandomPairs);
console.log(randomlyOrderCards);
