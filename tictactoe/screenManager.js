(function () {
  const root = window.TicTacToe = window.TicTacToe || {};
  root.ui = root.ui || {};

  function createScreenManager(startScreen, gameScreen) {
    function showStartScreen() {
      startScreen.classList.remove("hidden");
      gameScreen.classList.add("hidden");
    }

    function showGameScreen() {
      startScreen.classList.add("hidden");
      gameScreen.classList.remove("hidden");
    }

    return {
      showStartScreen,
      showGameScreen
    };
  }

  root.ui.createScreenManager = createScreenManager;
})();
