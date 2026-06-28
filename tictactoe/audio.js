(function () {
  const root = window.TicTacToe = window.TicTacToe || {};
  root.services = root.services || {};

  const tracks = {
    pvp: "Mortal Combat.mp3",
    easy: "bezumnyy-zabeg-krolikov-2-1e4752.mp3",
    hard: "veselyy-besporyadok-1-14d595.mp3"
  };

  function createAudioService(muteBtn, state) {
    let currentAudio = null;

    function stopTheme() {
      if (!currentAudio) return;

      currentAudio.pause();
      currentAudio.currentTime = 0;
      currentAudio = null;
    }

    function playTheme(theme) {
      if (state.isMuted) return;

      stopTheme();
      currentAudio = new Audio(tracks[theme] || tracks.pvp);
      currentAudio.loop = true;
      currentAudio.volume = 0.2;
      currentAudio.play().catch(() => {});
    }

    function toggleMusic() {
      state.isMuted = !state.isMuted;
      renderMuteButton();

      if (state.isMuted) {
        stopTheme();
        return;
      }

      if (state.difficulty) playTheme(state.difficulty);
    }

    function renderMuteButton() {
      muteBtn.textContent = state.isMuted ? "🔈 Музыка" : "🔊 Музыка";
      muteBtn.classList.toggle("muted", state.isMuted);
    }

    renderMuteButton();

    return {
      playTheme,
      stopTheme,
      toggleMusic
    };
  }

  root.services.createAudioService = createAudioService;
})();
