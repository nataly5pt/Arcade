/* ===========================
   Arcade 1 — script.js
   All variables instantiated at the top.
   =========================== */

/* ------------- Globals & helpers ------------- */

// Simple YES test and UI handles for ending the Playing session
const YES = /^y/i;
const farewellBox = document.getElementById('farewell');
const farewellMsg = document.getElementById('farewellMsg');
const reloadBtn   = document.getElementById('reload');

reloadBtn.addEventListener('click', () => location.reload());

// End the overall Playing session: show message + restart button
function endPlayingSession(msg = 'Thanks for playing Arcade 1! See you next time.') {
  farewellMsg.textContent = msg;
  farewellBox.hidden = false;
  reloadBtn.focus();
  alert('Session ended. (You can restart from the page button.)');
}

// Normalize a y/n prompt into boolean
function ynPrompt(message) {
  const ans = prompt(message);
  return ans && YES.test(ans) ? true : false; // <- uses a ternary as required
}

// Random helpers
const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const pick = arr => arr[Math.floor(Math.random() * arr.length)];

/* ------------- Game 1: Guessing Game (Declaration) ------------- */
function guessingGame() {
  let keepPlaying = true;
  while (keepPlaying) {
    const target = randInt(1, 10);
    const input  = prompt('Guess a number between 1 and 10:');

    if (input === null) {
      alert('Game cancelled. (Tip: enter a number 1–10.)');
    } else {
      const guess = parseInt(input, 10);
      if (Number.isNaN(guess) || guess < 1 || guess > 10) {
        alert('Invalid input. Please enter an integer from 1 to 10.');
      } else {
        const diff = Math.abs(guess - target);
        let msg = '';
        if (diff === 0) {
          msg = `Exact! It was ${target}. You win!`;
        } else if (diff === 1) {
          msg = `Close! It was ${target}. Computer wins this round.`;
        } else {
          msg = `Not this time. It was ${target}. Computer wins.`;
        }
        alert(msg);
      }
    }

    // Single Game loop control
    keepPlaying = ynPrompt('Would you like to keep playing this game? y/n');
  }

  // Playing session control (outside the game loop)
  ynPrompt('Would you like to pick another game to play?  y/n')
    ? null
    : endPlayingSession('Goodbye from the Guessing Game. 👋');
}

/* ------------- Game 2: Consult the Oracle (Expression) ------------- */
const consultOracle = function() {
  const replies = [
    'It is certain.',
    'Without a doubt.',
    'Yes — definitely.',
    'Most likely.',
    'Signs point to yes.',
    'Ask again later.',
    'Better not tell you now.',
    'Don’t count on it.',
    'My sources say no.',
    'Very doubtful.'
  ];
  const positiveIdx = new Set([0,1,2,3,4]); // define “wins” however you like

  let keepPlaying = true;
  while (keepPlaying) {
    const q = prompt('Ask the Oracle a yes/no question (or Cancel to stop):');
    if (q === null) {
      alert('The Oracle fades into silence…');
    } else if (!q.trim()) {
      alert('Ask something with words! The Oracle dislikes emptiness.');
    } else {
      const reply = pick(replies);
      const win = positiveIdx.has(replies.indexOf(reply));
      alert(`You asked: "${q}"\nOracle says: "${reply}"\n${win ? 'You win the favor of fate!' : 'Alas… fortune turns away.'}`);
    }
    keepPlaying = ynPrompt('Would you like to keep playing this game? y/n');
  }

  ynPrompt('Would you like to pick another game to play?  y/n')
    ? null
    : endPlayingSession('The Oracle returns to the mist. Farewell! 🔮');
};

/* ------------- Game 3: Bear • Ninja • Hunter (Arrow) ------------- */
const bnh = () => {
  const CHOICES = ['Bear', 'Ninja', 'Hunter'];
  const BEATS = { Bear: 'Ninja', Ninja: 'Hunter', Hunter: 'Bear' };

  const normalize = (s) => (s || '').trim().toLowerCase();
  const titleCase = (s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();

  let keepPlaying = true;
  while (keepPlaying) {
    const raw = prompt('Type your choice: Bear, Ninja, or Hunter:');
    if (raw === null) {
      alert('Cancelled. (Type Bear, Ninja, or Hunter next time.)');
    } else {
      const n = normalize(raw);
      const valid = { bear: 'Bear', ninja: 'Ninja', hunter: 'Hunter' }[n];
      if (!valid) {
        alert('Invalid choice. Please enter Bear, Ninja, or Hunter.');
      } else {
        const player = valid;
        const computer = pick(CHOICES);
        let outcome = '';
        if (player === computer) outcome = "It's a tie.";
        else if (BEATS[player] === computer) outcome = 'You win!';
        else outcome = 'Computer wins.';
        alert(`You chose: ${player}\nComputer chose: ${computer}\n${outcome}`);
      }
    }
    keepPlaying = ynPrompt('Would you like to keep playing this game? y/n');
  }

  ynPrompt('Would you like to pick another game to play?  y/n')
    ? null
    : endPlayingSession('Hunt well, traveler. 🐻🥷🏹');
};
