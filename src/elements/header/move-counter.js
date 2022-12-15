const movesCounter = document.createElement('p');

const updateMoves = () => movesCounter.textContent = `Moves: ${moves}`;

let moves = localStorage.getItem('moves') ?? 0;

const resetMoves = () => moves = 0;

const incrementMoves = () => moves++;

export { movesCounter, updateMoves, resetMoves, incrementMoves, moves };