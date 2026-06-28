(function () {
  const root = window.TicTacToe = window.TicTacToe || {};
  root.rules = root.rules || {};

  function findWinningCells(board) {
    return root.rules.WIN_PATTERNS.find(([a, b, c]) => (
      board[a] && board[a] === board[b] && board[a] === board[c]
    )) || null;
  }

  root.rules.findWinningCells = findWinningCells;
})();
