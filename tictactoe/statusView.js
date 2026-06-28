(function () {
  const root = window.TicTacToe = window.TicTacToe || {};
  root.ui = root.ui || {};

  const difficultyLabels = {
    pvp: "👥 Выбран режим: PvP",
    easy: "😊 Выбран режим: Легкий",
    hard: "🤖 Выбран режим: Тяжелый"
  };

  function createStatusView(statusEl, difficultyDisplay) {
    function showTurn(player) {
      statusEl.textContent = `Ход: ${player}`;
    }

    function showBotThinking() {
      statusEl.textContent = "Ход: O (бот думает...)";
    }

    function showWinner(player, isBot) {
      statusEl.textContent = `🎉 Победил: ${player}${isBot ? " (бот)" : ""}`;
    }

    function showDraw() {
      statusEl.textContent = "🤝 Ничья!";
    }

    function showDifficulty(level) {
      difficultyDisplay.textContent = difficultyLabels[level] || "Режим не выбран";
    }

    function showDifficultyRequired() {
      difficultyDisplay.textContent = "⚠ Сначала выберите режим";
    }

    function showRestartCountdown(message, secondsLeft) {
      statusEl.innerHTML = `${message}<br><span style="font-size: 0.9rem; opacity: 0.8;">⏱ Новая игра через ${secondsLeft}...</span>`;
    }

    return {
      showTurn,
      showBotThinking,
      showWinner,
      showDraw,
      showDifficulty,
      showDifficultyRequired,
      showRestartCountdown
    };
  }

  root.ui.createStatusView = createStatusView;
})();
