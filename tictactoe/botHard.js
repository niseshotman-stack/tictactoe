(function () {
  const root = window.TicTacToe = window.TicTacToe || {};
  root.ai = root.ai || {};

  function findTwoInLine(board, player) {
    return root.rules.WIN_PATTERNS
      .map(pattern => findMissingCell(board, pattern, player))
      .find(index => index !== null) ?? null;
  }

  function findMissingCell(board, pattern, player) {
    const playerCells = pattern.filter(index => board[index] === player);
    const emptyCells = pattern.filter(index => board[index] === "");
    return playerCells.length === 2 && emptyCells.length === 1 ? emptyCells[0] : null;
  }

  function getCenterMove(board) {
    return board[4] === "" ? 4 : null;
  }

  function getCornerMove(board) {
    const emptyCorners = [0, 2, 6, 8].filter(index => board[index] === "");
    return root.ai.pickRandom(emptyCorners);
  }

  function getHardBotMove(board) {
    return findTwoInLine(board, "O")
      ?? findTwoInLine(board, "X")
      ?? getCenterMove(board)
      ?? getCornerMove(board)
      ?? root.ai.getRandomMove(board);
  }

  root.ai.getHardBotMove = getHardBotMove;
})();
