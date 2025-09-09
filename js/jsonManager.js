// jsonManager.js
// Export and import project JSON

import { getBlocksData, replaceBlocks } from './data.js';

export function exportJSON() {
  const data = { blocks: getBlocksData() };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "project.json";
  a.click();

  URL.revokeObjectURL(url);
}

export function importJSON(file, callback) {
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const data = JSON.parse(e.target.result);
      if (data.blocks) {
        replaceBlocks(data.blocks);  // utilise la fonction propre
        callback(); // re-render
      } else {
        alert("Invalid JSON format");
      }
    } catch (err) {
      alert("Error reading JSON file: " + err.message);
    }
  };
  reader.readAsText(file);
}
