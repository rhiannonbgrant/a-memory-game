const theCards = document.querySelectorAll(".the-card");
const cardTypes = document.querySelectorAll("symbol");

const cards = Array.from(theCards);

console.log(cardTypes);

let noOfTurnedCards = 0;
let card1;
let card2;
let picture1Location;
let picture2Location;
let getCard1;
let getCard2;

cards.forEach((card) => {
  card.addEventListener("click", function () {
    card.classList.add("turn-card");
    noOfTurnedCards++;
    if (noOfTurnedCards === 1) {
      getCard1 = cards[cards.indexOf(card)];
      picture1Location = getCard1.getElementsByTagName("use").item(0);
      card1 = picture1Location.getAttribute("href");
      console.log(card1);
    } else if (noOfTurnedCards === 2) {
      getCard2 = cards[cards.indexOf(card)];
      picture2Location = getCard2.getElementsByTagName("use").item(0);
      card2 = picture2Location.getAttribute("href");
      console.log(card2);
      if (card1 !== card2) {
        setTimeout(() => {
          getCard1.classList.remove("turn-card");
          getCard2.classList.remove("turn-card");
        }, 2000);
      } else if (card1 === card2) {
        setTimeout(() => {
          getCard1.classList.add("removeCard");
          getCard2.classList.add("removeCard");
        }, 2000);
      }
    }
  });
});
