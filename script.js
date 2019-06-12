// Instatiate an array with all the possible winning combinations
const winCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [2, 4, 6],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8]
];

//create an array with all the spaces in the board
const grid = () => Array.from(document.getElementsByClassName('cell'));

// Capture the number portion of the id, minus 1 so that it starts from zero
const idCapture = cell => Number(cell.id.replace('cell', '') - 1);

// return a new array of empt cells so that the computer is not able to be selected
const emptyCell = () => grid().filter(cell => cell.innerText === '');

// create an array where all cells will be the same, except all the same are empty
// by checking that the cell innerText is the same as the same in the zero position of itself
// it forces the array to equate to XXX or 000.
const winningLogic = arr =>
  arr.every(
    cell => cell.innerText === arr[0].innerText && cell.innerText !== ''
  );

// On each turn, it will add player(as innertext) to the index position that was selected
const turn = (i, player) => (grid()[i].innerText = player);

const endGame = winner => {
  winner.forEach(cell => cell.classList.add('green'));
  //remove the listener so that no one takes a turn again after there has been a winner
  grid().forEach(cell => cell.removeEventListener('click', clickEvnt));
};

const checkWin = () => {
  let win = false;
  winCombinations.forEach(combination => {
    const gridEval = grid();
    //it captures the 0, 1, and 2 places of the combination array and store it on a
    //variable that will be checked to see if it matches and the later checked
    // against the winning numbers to see if it's a winner
    const sq = [
      gridEval[combination[0]],
      gridEval[combination[1]],
      gridEval[combination[2]]
    ];
    if (winningLogic(sq)) {
      win = true;
      endGame(sq);
    }
  });
  return win;
};

// on the computer's turn, it will calculate a random number in the length of
// empty cells available and floor it, ten pass it as a number to the turn
// function in the timeout, in the opponent function
const opponentTurn = () =>
  idCapture(emptyCell()[Math.floor(Math.random() * emptyCell().length)]);

const opponent = () => {
  //remove the listener so that it is clickable
  grid().forEach(cell => cell.removeEventListener('click', clickEvnt));
  setTimeout(() => {
    // pass the opponentTurn as index to the turn function
    turn(opponentTurn(), 'o');

    // check for the end of game first and then add the event listener back
    if (!checkWin()) {
      grid().forEach(cell => cell.addEventListener('click', clickEvnt));
    } else {
      document.getElementById('message').textContent = ' O is the winner!!! ';
    }
  }, 1000);
};

const clickEvnt = e => {
  //capture the id and pass it as an index, and the x as player
  turn(idCapture(e.target), 'x');
  // check if the game has ended
  if (!checkWin()) {
    opponent();
  } else {
    document.getElementById('message').textContent = ' X is the winner!!! ';
  }
};

// capture the click event on any particular cell. Controlling the click event removes cheating
// by clicking quickly on 3 spaces and winning
const toggleListeners = () =>
  grid().forEach(cell =>
    clickEvnt
      ? cell.addEventListener('click', clickEvnt)
      : cell.removeEventListener('click', clickEvnt)
  );

toggleListeners();
