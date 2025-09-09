// app.js
// Main app initialization using modules

import { renderBlocks } from './blocks.js';
import { createAddButton } from './addButton.js';
import { exportJSON, importJSON } from './jsonManager.js';
import { loadLocalStorage } from './data.js';

const main = document.getElementById("main");

export function renderAll() {
  const addButtonElement = createAddButton(() => renderAll());
  renderBlocks(main, addButtonElement);
}


// Connect JSON buttons
document.getElementById("exportJSON").addEventListener("click", exportJSON);

document.getElementById("importJSON").addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) {
    importJSON(file, () => renderAll());
  }
});

// Initial render
loadLocalStorage();
renderAll();
