(function () {
  const elements = {
    board: document.getElementById("board"),
    status: document.getElementById("status"),
    restartBtn: document.getElementById("restart"),
    muteBtn: document.getElementById("muteBtn"),
    startScreen: document.getElementById("startScreen"),
    gameScreen: document.getElementById("gameScreen"),
    startBtn: document.getElementById("startBtn"),
    backBtn: document.getElementById("backBtn"),
    difficultyDisplay: document.getElementById("currentDifficulty"),
    difficultyButtons: document.querySelectorAll("[data-difficulty]"),
    stats: {
      xWins: document.getElementById("xWins"),
      oWins: document.getElementById("oWins"),
      draws: document.getElementById("draws")
    }
  };

  window.TicTacToe.controllers.createGameController(elements).init();
})();
