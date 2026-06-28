(function () {
  const root = window.TicTacToe = window.TicTacToe || {};
  root.ui = root.ui || {};

  function createStatsView(elements) {
    function render(stats) {
      elements.xWins.textContent = stats.xWins;
      elements.oWins.textContent = stats.oWins;
      elements.draws.textContent = stats.draws;
    }

    return { render };
  }

  root.ui.createStatsView = createStatsView;
})();
