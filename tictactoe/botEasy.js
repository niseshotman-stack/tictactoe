(function () {
  const root = window.TicTacToe = window.TicTacToe || {};
  root.ai = root.ai || {};

  function getEasyBotMove(board) {
    return root.ai.getRandomMove(board);
  }

  root.ai.getEasyBotMove = getEasyBotMove;
})();
