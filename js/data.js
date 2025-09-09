// data.js
// Store and manage blocks data with LocalStorage persistence

let blocks = [];

// Default type mapping (more extensible)
const defaultTagByType = {
  title: "h1",
  text: "p",
};

function saveToLocalStorage() {
  localStorage.setItem("readmeBuilderBlocks", JSON.stringify(blocks));
  console.log(JSON.stringify(blocks))
}

export function loadLocalStorage() {
  const saved = localStorage.getItem("readmeBuilderBlocks");
  if (saved) {
    try {
      blocks = JSON.parse(saved);
    } catch (err) {
      console.error("Error parsing localStorage data:", err);
      blocks = [];
    }
  } else {
    blocks = [];
  }
}

export function addBlockData(type) {
  // fallback to "p" if type unknown
  const balise = defaultTagByType[type] || "p";

  const newBlock = {
    id: "block_" + (blocks.length + 1),
    type: balise,                     // actual tag (h1, p, etc.)
    content: `${type} (${balise})`,   // placeholder text
  };

  blocks.push(newBlock);
  saveToLocalStorage(); // persist
}

export function getBlocksData() {
  return blocks;
}

export function updateBlock(id, newData) {
  const block = blocks.find(b => b.id === id);
  if (block) {
    Object.assign(block, newData);
    saveToLocalStorage(); // persist
  }
}
