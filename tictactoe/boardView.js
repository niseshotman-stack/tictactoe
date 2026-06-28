(function () {
  const root = window.TicTacToe = window.TicTacToe || {};
  root.ui = root.ui || {};

  function createBoardView(boardEl, onCellClick) {
    function render(board) {
      boardEl.innerHTML = "";
      board.forEach((cellValue, index) => boardEl.appendChild(createCell(index, cellValue)));
    }

    function createCell(index, cellValue) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.index = index;
      cell.textContent = cellValue;
      cell.style.pointerEvents = cellValue ? "none" : "";
      cell.addEventListener("click", onCellClick);
      return cell;
    }

    function updateCell(index, value) {
      const cell = getCell(index);
      if (!cell) return;

      cell.textContent = value;
      cell.style.pointerEvents = "none";
    }

    function highlightCells(indices) {
      indices.forEach(index => {
        const cell = getCell(index);
        if (cell) cell.classList.add("winning-cell");
      });
    }

    function getCell(index) {
      return boardEl.querySelector(`[data-index="${index}"]`);
    }

    return {
      render,
      updateCell,
      highlightCells
    };
  }

  root.ui.createBoardView = createBoardView;
})();
