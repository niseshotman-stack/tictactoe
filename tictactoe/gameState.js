(function () {
  const root = window.TicTacToe = window.TicTacToe || {};
  root.core = root.core || {};

  function createEmptyBoard() {
    return Array(9).fill("");
  }

  function createStats() {
    return {
      xWins: 0,
      oWins: 0,
      draws: 0
    };
  }

  function createGameState(savedState) {
    return {
      board: savedState?.board || createEmptyBoard(),
      currentPlayer: savedState?.currentPlayer || "X",
      isRunning: savedState?.isRunning ?? true,
      difficulty: savedState?.difficulty || null,
      isMuted: false,
      gameStats: savedState?.gameStats || createStats()
    };
  }

  function resetRound(state) {
    state.board = createEmptyBoard();
    state.currentPlayer = "X";
    state.isRunning = true;
  }

  function createSnapshot(state) {
    return {
      board: state.board,
      currentPlayer: state.currentPlayer,
      isRunning: state.isRunning,
      difficulty: state.difficulty,
      gameStats: state.gameStats
    };
  }

  root.core.createGameState = createGameState;
  root.core.resetRound = resetRound;
  root.core.createSnapshot = createSnapshot;
})();
