(function () {
  const root = window.TicTacToe = window.TicTacToe || {};
  root.services = root.services || {};

  const STORAGE_KEY = "tictactoe_state";

  function loadGameState() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return null;

    try {
      return JSON.parse(saved);
    } catch (error) {
      console.error("Error loading game state:", error);
      return null;
    }
  }

  function saveGameState(state) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function clearGameState() {
    localStorage.removeItem(STORAGE_KEY);
  }

  root.services.storage = {
    loadGameState,
    saveGameState,
    clearGameState
  };
})();
