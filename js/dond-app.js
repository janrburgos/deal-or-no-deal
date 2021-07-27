////////// VARIABLE DECLARATION //////////

const prizeList = [
  1, 5, 10, 25, 50, 75, 100, 200, 300, 400, 500, 750, 1000, 5000, 10000, 25000,
  50000, 100000, 200000, 300000, 400000, 500000, 1000000, 2000000,
];
const prizeDisplay = document.querySelectorAll(".prize");
const briefcases = document.querySelectorAll(".briefcase");
const chooseCountDisplay = document.querySelector("#choose-count");
const prizeReference = [];
let previousOfferAmount = 0;
let initChooseCount = 6;
let notOpenedCount = prizeDisplay.length;
let prizeTotal = 0;
let chooseCount = initChooseCount;
let contestantOwnBriefcasePrize;
let contestantOwnBriefcaseFlag;
let bankerOfferAmount;

////////// FUNCTIONS //////////

// getting the average of remaining unopened prizes
const prizeListAve = () => {
  if (prizeTotal > 1000) {
    bankerOfferAmount = Math.floor(prizeTotal / notOpenedCount / 100) * 100;
  } else if (prizeTotal > 100) {
    bankerOfferAmount = Math.floor(prizeTotal / notOpenedCount / 10) * 10;
  } else {
    bankerOfferAmount = Math.floor(prizeTotal / notOpenedCount);
  }
};

// create banker offer div
const bankerOfferWindow = () => {
  let bankerOfferDiv = document.createElement("div");
  bankerOfferDiv.classList.add("banker-offer");
  let boxBorderDiv = document.createElement("div");
  boxBorderDiv.classList.add("box-border");
  bankerOfferDiv.append(boxBorderDiv);
  let boxDiv = document.createElement("div");
  boxDiv.classList.add("box");
  boxBorderDiv.append(boxDiv);
  let previousOfferDiv = document.createElement("div");
  previousOfferDiv.classList.add("previous-offer");
  previousOfferDiv.textContent = "PREVIOUS OFFER: ";
  boxDiv.append(previousOfferDiv);
  let previousOfferAmountSpan = document.createElement("span");
  previousOfferAmountSpan.classList.add("previous-offer-amount");
  previousOfferDiv.append(previousOfferAmountSpan);
  let offerTextP = document.createElement("p");
  offerTextP.classList.add("offer-text");
  offerTextP.textContent = "BANK OFFER:";
  let currentOfferDiv = document.createElement("div");
  currentOfferDiv.classList.add("current-offer");
  let dondQuestionDiv = document.createElement("div");
  dondQuestionDiv.classList.add("dond-question");
  boxDiv.append(offerTextP);
  boxDiv.append(currentOfferDiv);
  boxDiv.append(dondQuestionDiv);
  let dealButton = document.createElement("button");
  dealButton.classList.add("deal");
  dealButton.textContent = "DEAL";
  let orSpan = document.createElement("span");
  orSpan.textContent = "OR";
  let noDealButton = document.createElement("button");
  noDealButton.classList.add("no-deal");
  noDealButton.textContent = "NO DEAL";
  dondQuestionDiv.append(dealButton);
  dondQuestionDiv.append(orSpan);
  dondQuestionDiv.append(noDealButton);
  document.querySelector("body").append(bankerOfferDiv);
  noDealButton.addEventListener("click", () => {
    if (initChooseCount > 1) {
      initChooseCount--;
    }
    chooseCount = initChooseCount;
    chooseCountDisplay.textContent = chooseCount;
    previousOfferAmount = bankerOfferAmount;
    bankerOfferDiv.remove();
  });
  dealButton.addEventListener("click", () => {
    bankerOfferDiv.remove();
    gameOverWindow();
  });
  // display banker offer
  prizeListAve();
  currentOfferDiv.textContent = bankerOfferAmount.toLocaleString();
  previousOfferAmountSpan.textContent = previousOfferAmount.toLocaleString();
};

// create game over div
const gameOverWindow = () => {
  let gameOverDiv = document.createElement("div");
  gameOverDiv.classList.add("banker-offer");
  let boxBorderDiv = document.createElement("div");
  boxBorderDiv.classList.add("box-border");
  gameOverDiv.append(boxBorderDiv);
  let boxDiv = document.createElement("div");
  boxDiv.classList.add("box");
  boxBorderDiv.append(boxDiv);
  let chosenBriefcaseAmountDiv = document.createElement("div");
  chosenBriefcaseAmountDiv.classList.add("previous-offer");
  chosenBriefcaseAmountDiv.textContent = "CHOSEN BRIEFCASE AMOUNT: ";
  boxDiv.append(chosenBriefcaseAmountDiv);
  let chosenBriefcaseAmountSpan = document.createElement("span");
  chosenBriefcaseAmountSpan.classList.add("previous-offer-amount");
  chosenBriefcaseAmountDiv.append(chosenBriefcaseAmountSpan);
  let offerTextP = document.createElement("p");
  offerTextP.classList.add("offer-text");
  offerTextP.textContent = "YOU WON:";
  let currentOfferDiv = document.createElement("div");
  currentOfferDiv.classList.add("current-offer");
  let dondQuestionDiv = document.createElement("div");
  dondQuestionDiv.classList.add("dond-question");
  boxDiv.append(offerTextP);
  boxDiv.append(currentOfferDiv);
  boxDiv.append(dondQuestionDiv);
  let playAgainButton = document.createElement("button");
  playAgainButton.classList.add("deal");
  playAgainButton.textContent = "PLAY AGAIN";
  dondQuestionDiv.append(playAgainButton);
  document.querySelector("body").append(gameOverDiv);
  playAgainButton.addEventListener("click", () => {
    window.location.href = "index.html";
  });
  // display winnings
  prizeListAve();
  chosenBriefcaseAmountSpan.textContent =
    contestantOwnBriefcasePrize.toLocaleString();
  currentOfferDiv.textContent = bankerOfferAmount.toLocaleString();
};

// function to add click event to other briefcases that are not the contestant's own briefcase
const otherBriefcases = () => {
  for (let i = 0; i < briefcases.length; i++) {
    // check if the clicked briefcase is not contestant's own briefcase
    if (i != contestantOwnBriefcaseFlag) {
      // remove the initial click event to briefcases not chosen by contestant
      briefcases[i].removeEventListener("click", contestantOwnBriefcase);
      // add click event to briefcases not chosen as own briefcase by contestant
      briefcases[i].addEventListener("click", () => {
        // check if the briefcase has already been clicked once by checking if the prize inside the briefcase can still be found in the prizeList array
        if (prizeList.indexOf(briefcases[i].prize) != -1) {
          // styling for briefcases when opened
          prizeDisplay[
            prizeReference.indexOf(briefcases[i].prize)
          ].style.filter = "contrast(20%)";
          briefcases[i].textContent = "";
          let openedBriefcaseDisplay;
          let whiteStrip = document.createElement("div");
          whiteStrip.style.backgroundColor = "white";
          whiteStrip.style.width = "100%";
          whiteStrip.style.textAlign = "center";
          briefcases[i].append(whiteStrip);
          briefcases[i].style.background = "hsl(0, 0%, 50%)";
          briefcases[i].style.transform = "scale(0.95)";
          if (briefcases[i].prize >= 1000000) {
            openedBriefcaseDisplay = briefcases[i].prize / 1000000 + `M`;
          } else if (briefcases[i].prize >= 1000) {
            openedBriefcaseDisplay = briefcases[i].prize / 1000 + `K`;
          } else {
            openedBriefcaseDisplay = briefcases[i].prize;
          }
          whiteStrip.textContent = openedBriefcaseDisplay;
          // find the briefcase.prize in the prizeList array and replace it with 0
          prizeList.splice(prizeList.indexOf(briefcases[i].prize), 1, 0);
          // deduct briefcase.prize from total prize
          prizeTotal -= briefcases[i].prize;
          // update unopened briefcase count
          notOpenedCount--;
          // count the remaining prizes and to check if only one briefcase left
          let briefcaseLeft = prizeList.filter((value) => {
            return value > 0;
          });
          if (briefcaseLeft.length > 1) {
            // change choose count display each round
            if (chooseCount > 1) {
              chooseCount--;
              chooseCountDisplay.textContent = chooseCount;
            } else {
              bankerOfferWindow();
            }
          } else {
            gameOverWindow();
          }
        }
      });
    }
  }
};

// when contestant chose his/her own briefcase
const contestantOwnBriefcase = (e) => {
  // if the contestant hasn't chosen his/her own briefcase yet
  if (contestantOwnBriefcaseFlag == undefined) {
    // this flag will be used as index for the briefcases array
    contestantOwnBriefcaseFlag = Number(e.target.textContent) - 1;
    // assign the contestant's own chosen briefcase's prize property to another variable to be used later
    contestantOwnBriefcasePrize = e.target.prize;
    // display choose count for round 1
    chooseCountDisplay.textContent = chooseCount;
    // add a class name that changes contestant's own chosen briefcase's color to orange
    e.target.classList.add("orange-briefcase");
    otherBriefcases();
  }
};

////////// GAME MECHANICS //////////

// 1. calculate sum of all prizes
for (i of prizeList) {
  prizeTotal += i;
}
// 2. add prize property to each prizeDisplay and transfer prize list to a reference array
for (let i = 0; i < prizeList.length; i++) {
  prizeDisplay[i].prize = prizeList[i];
  prizeReference.push(prizeList[i]);
}

// 3. shuffle prize list
const shuffle = function (array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};
shuffle(prizeList);

// 4. add shuffled prize property to briefcase indices
for (let i = 0; i < prizeList.length; i++) {
  briefcases[i].prize = prizeList[i];
}

// 5. initially add click events to all briefcases
for (let i = 0; i < briefcases.length; i++) {
  briefcases[i].addEventListener("click", contestantOwnBriefcase);
}
