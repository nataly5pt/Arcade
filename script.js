/* ===========================
   Arcade 1 — script.js
   All variables instantiated at the top.
   =========================== */

// Shared helpers & constants
const YES = ["y", "yes"];
const NO = ["n", "no"];

// For BNH (arrays + randomizer required)
const BNH_CHOICES = ["Bear", "Ninja", "Hunter"];
const BNH_RULES = {
  Bear: "Ninja",   // Bear beats Ninja
  Ninja: "Hunter", // Ninja beats Hunter
  Hunter: "Bear"   // Hunter beats Bear
};

// Oracle responses (Magic Eight Ball vibe)
const ORACLE = [
  "It is certain.",
  "Prospects are good.",
  "Ask again later.",
  "My sources say no.",
  "The spirits are undecided.",
  "Absolutely!",
  "Doubtful.",
  "A path opens if you are patient."
];

/* ===========================
   Utility: prompt a yes/no, validate, and return Boolean.
   Handles cancel/empty/invalid with messages.
   =========================== */
function askYesNo(message) {
  while (true) {
    const raw = prompt(message);
    if (raw === null) {            // cancel
      alert("Cancelled. We'll treat that as 'no'.");
      return false;
    }
    const val = raw.trim().toLowerCase();
    if (YES.includes(val)) return true;
    if (NO.includes(val)) return false;
    alert("Please type 'y' or 'n'.");
  }
}

/* ===========================
   Utility: random array pick
   =========================== */
function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/* ===========================
   Session gate shown AFTER a game’s internal loop
   =========================== */
function endOfGameAskAnother() {
  const another = askYesNo("Would you like to pick another game to play?  y/n");
  if (another) {
    alert("Great! Click one of the buttons on the page to launch another game.");
    return; // leave the UI as-is; player clicks a button next
  }
  // End the playing session: show farewell UI in HTML.
  const box = document.getElementById("farewell");
  const msg = document.getElementById("farewellMsg");
  msg.textContent = "Thanks for visiting the Arcade. Come back soon!";
  box.hidden = false;
}

/* =========================================================
   GAME 1 — Bear • Ninja • Hunter
   Function Declaration
   ========================================================= */
function playBNH() {
  // One Playing loop consists of many “Single Game” rounds.
  let playing = true;

  while (playing) {
    // --- Single Game (exactly one user choice vs random computer) ---
    // Get user choice (validate)
    let userInput = prompt("Type your choice: Bear, Ninja, or Hunter.");
    if (userInput === null) {
      alert("Cancelled. Ending this game.");
      break;
    }
    userInput = userInput.trim().toLowerCase();
    // allow short forms
    if (userInput === "b") userInput = "bear";
    if (userInput === "n") userInput = "ninja";
    if (userInput === "h") userInput = "hunter";

    if (!["bear", "ninja", "hunter"].includes(userInput)) {
      alert("Invalid choice. Please type Bear, Ninja, or Hunter.");
      continue; // re-run this single game
    }

    const player = userInput[0].toUpperCase() + userInput.slice(1); // capitalize
    const computer = pickRandom(BNH_CHOICES);

    // Determine result
    let outcome;
    if (player === computer) {
      outcome = "Tie!";
    } else if (BNH_RULES[player] === computer) {
      outcome = `You win! ${player} defeats ${computer}.`;
    } else {
      outcome = `Computer wins! ${computer} defeats ${player}.`;
    }

    alert(
      `You chose: ${player}\nComputer chose: ${computer}\n\n${outcome}`
    );

    // Ask if they want to keep playing THIS game
    // (Use ternary operator to exit the loop)
    playing = askYesNo("Would you like to keep playing this game? y/n") ? true : false;
  }

  // Playing loop ended — ask about another game
  endOfGameAskAnother();
}

/* =========================================================
   GAME 2 — Consult the Oracle (Magic Eight Ball)
   Function Expression
   ========================================================= */
const consultOracle = function () {
  let playing = true;

  while (playing) {
    let question = prompt("Ask the Oracle a yes/no question:");
    if (question === null || question.trim() === "") {
      alert("No question asked. Ending this game.");
      break;
    }
    const answer = pickRandom(ORACLE);
    alert(`You asked:\n"${question.trim()}"\n\nThe Oracle says:\n${answer}`);

    playing = askYesNo("Would you like to keep playing this game? y/n") ? true : false;
  }

  endOfGameAskAnother();
};

/* =========================================================
   GAME 3 — Guess the Number (1–10)
   Arrow Function
   Single guess per round = one “Single Game”
   ========================================================= */
const guessNumber = () => {
  let playing = true;

  while (playing) {
    const secret = Math.floor(Math.random() * 10) + 1;

    let guessRaw = prompt("Guess the number (1–10):");
    if (guessRaw === null) {
      alert("Cancelled. Ending this game.");
      break;
    }
    const guess = Number(guessRaw.trim());

    if (!Number.isInteger(guess) || guess < 1 || guess > 10) {
      alert("Please enter a whole number from 1 to 10.");
      continue; // invalid -> redo single game
    }

    let result = (guess === secret)
      ? `Correct! The number was ${secret}.`
      : `Nope. You guessed ${guess}, but the number was ${secret}.`;
    alert(result);

    playing = askYesNo("Would you like to keep playing this game? y/n") ? true : false;
  }

  endOfGameAskAnother();
};
