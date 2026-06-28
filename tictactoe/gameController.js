(function () {
  const root = window.TicTacToe = window.TicTacToe || {};
  root.controllers = root.controllers || {};

  const BOT_DELAY_MS = 500;
  const RESTART_DELAY_SECONDS = 4;

  function createGameController(elements) {
    const savedState = root.services.storage.loadGameState();
    const state = root.core.createGameState(savedState);
    const boardView = root.ui.createBoardView(elements.board, handleHumanMove);
    const screenManager = root.ui.createScreenManager(elements.startScreen, elements.gameScreen);
    const statsView = root.ui.createStatsView(elements.stats);
    const statusView = root.ui.createStatusView(elements.status, elements.difficultyDisplay);
    const audio = root.services.createAudioService(elements.muteBtn, state);

    function init() {
      bindEvents();
      statsView.render(state.gameStats);
      boardView.render(state.board);
      restoreScreen();
    }

    function bindEvents() {
      elements.restartBtn.addEventListener("click", restart);
      elements.backBtn.addEventListener("click", goBackToMenu);
      elements.muteBtn.addEventListener("click", audio.toggleMusic);
      elements.startBtn.addEventListener("click", startGame);
      elements.difficultyButtons.forEach(button => {
        button.addEventListener("click", () => setDifficulty(button.dataset.difficulty));
      });
    }

    function restoreScreen() {
      if (!savedState) {
        screenManager.showStartScreen();
        return;
      }

      applyDifficultyView();
      if (state.isRunning) statusView.showTurn(state.currentPlayer);
      screenManager.showGameScreen();
    }

    function startGame() {
      if (!state.difficulty) {
        statusView.showDifficultyRequired();
        return;
      }

      restart();
    }

    function setDifficulty(level) {
      state.difficulty = level;
      applyDifficultyView();
      statusView.showTurn("X");
      save();
      audio.playTheme(level);
    }

    function applyDifficultyView() {
      elements.difficultyButtons.forEach(button => {
        button.classList.toggle("active", button.dataset.difficulty === state.difficulty);
      });
      statusView.showDifficulty(state.difficulty);
    }

    function handleHumanMove(event) {
      const index = Number(event.currentTarget.dataset.index);
      if (!root.rules.isMoveAllowed(state, index)) return;

      makeMove(index, state.currentPlayer);
      continueAfterHumanMove();
    }

    function continueAfterHumanMove() {
      if (finishRoundIfNeeded(false)) return;

      if (state.difficulty === "pvp") {
        switchPlayer();
        save();
        return;
      }

      state.currentPlayer = "O";
      statusView.showBotThinking();
      save();
      setTimeout(makeBotMove, BOT_DELAY_MS);
    }

    function makeBotMove() {
      if (!state.isRunning) return;

      const botMove = getBotMove();
      if (botMove === null) return;

      makeMove(botMove, "O");
      if (finishRoundIfNeeded(true)) return;

      state.currentPlayer = "X";
      statusView.showTurn("X");
      save();
    }

    function getBotMove() {
      return state.difficulty === "hard"
        ? root.ai.getHardBotMove(state.board)
        : root.ai.getEasyBotMove(state.board);
    }

    function makeMove(index, player) {
      state.board[index] = player;
      boardView.updateCell(index, player);
    }

    function finishRoundIfNeeded(isBotMove) {
      const winningCells = root.rules.findWinningCells(state.board);
      if (winningCells) {
        finishWithWinner(winningCells, isBotMove);
        return true;
      }

      if (root.rules.isBoardFull(state.board)) {
        finishWithDraw();
        return true;
      }

      return false;
    }

    function finishWithWinner(winningCells, isBotMove) {
      state.isRunning = false;
      state.gameStats[state.currentPlayer === "X" ? "xWins" : "oWins"]++;
      statusView.showWinner(state.currentPlayer, isBotMove);
      statsView.render(state.gameStats);
      boardView.highlightCells(winningCells);
      save();
      scheduleAutoRestart();
    }

    function finishWithDraw() {
      state.isRunning = false;
      state.gameStats.draws++;
      statusView.showDraw();
      statsView.render(state.gameStats);
      save();
      scheduleAutoRestart();
    }

    function switchPlayer() {
      state.currentPlayer = state.currentPlayer === "X" ? "O" : "X";
      statusView.showTurn(state.currentPlayer);
    }

    function scheduleAutoRestart() {
      let countdown = RESTART_DELAY_SECONDS;
      const resultMessage = elements.status.textContent;
      const timer = setInterval(() => {
        statusView.showRestartCountdown(resultMessage, countdown);
        countdown--;

        if (countdown < 0) {
          clearInterval(timer);
          restart();
        }
      }, 1000);
    }

    function restart() {
      root.services.storage.clearGameState();
      root.core.resetRound(state);
      statusView.showTurn("X");
      boardView.render(state.board);
      screenManager.showGameScreen();
    }

    function goBackToMenu() {
      audio.stopTheme();
      screenManager.showStartScreen();
    }

    function save() {
      root.services.storage.saveGameState(root.core.createSnapshot(state));
    }

    return { init };
  }

  root.controllers.createGameController = createGameController;
})();
