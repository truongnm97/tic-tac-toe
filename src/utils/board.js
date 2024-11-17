export const createBoard = (size) => Array(size * size).fill(null);

export const checkWinner = (board, player, winningCombinations) => {
  return winningCombinations.some((combination) =>
    combination.every((index) => board[index] === player),
  );
};

export const checkDraw = (board) => board.every((cell) => cell !== null);

export const generateWinningCombinations = (size) => {
  const combinations = [];
  const winLength = Math.min(size, 5);

  // Rows
  for (let row = 0; row < size; row++) {
    for (let col = 0; col <= size - winLength; col++) {
      combinations.push(
        Array.from({ length: winLength }, (_, i) => row * size + col + i),
      );
    }
  }

  // Columns
  for (let col = 0; col < size; col++) {
    for (let row = 0; row <= size - winLength; row++) {
      combinations.push(
        Array.from({ length: winLength }, (_, i) => (row + i) * size + col),
      );
    }
  }

  // Diagonal (top-left to bottom-right)
  for (let row = 0; row <= size - winLength; row++) {
    for (let col = 0; col <= size - winLength; col++) {
      combinations.push(
        Array.from({ length: winLength }, (_, i) => (row + i) * size + col + i),
      );
    }
  }

  // Diagonal (top-right to bottom-left)
  for (let row = 0; row <= size - winLength; row++) {
    for (let col = winLength - 1; col < size; col++) {
      combinations.push(
        Array.from({ length: winLength }, (_, i) => (row + i) * size + col - i),
      );
    }
  }

  return combinations;
};

export const switchPlayer = (currentPlayer) =>
  currentPlayer === "X" ? "O" : "X";
