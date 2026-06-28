(function () {
  const root = window.TicTacToe = window.TicTacToe || {};
  root.rules = root.rules || {};

  function getEmptyIndices(board) {
    return board
      .map((cell, index) => (cell === "" ? index : null))
      .filter(index => index !== null);
  }

  function isBoardFull(board) {
    return !board.includes("");
  }

  function isHumanTurn(state) {
    return state.difficulty === "pvp" || state.currentPlayer === "X";
  }

  function isMoveAllowed(state, index) {
    return state.isRunning
      && state.difficulty
      && isHumanTurn(state)
      && state.board[index] === "";
  }

  root.rules.getEmptyIndices = getEmptyIndices;
  root.rules.isBoardFull = isBoardFull;
  root.rules.isMoveAllowed = isMoveAllowed;
})();
