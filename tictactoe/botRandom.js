(function () {
  const root = window.TicTacToe = window.TicTacToe || {};
  root.ai = root.ai || {};

  function pickRandom(items) {
    return items[Math.floor(Math.random() * items.length)] ?? null;
  }

  function getRandomMove(board) {
    return pickRandom(root.rules.getEmptyIndices(board));
  }

  root.ai.pickRandom = pickRandom;
  root.ai.getRandomMove = getRandomMove;
})();
