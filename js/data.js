// data.js
// Store and manage blocks data with LocalStorage persistence

let blocks = [];

export function getBlockById(blockId) {
  // Logique pour récupérer le bloc depuis tes données
  return blocks.find(block => block.id === blockId);
}

// Default type mapping (more extensible)
const defaultTagByType = {
  title: "h1",
  text: "p",
};

function saveToLocalStorage() {
  localStorage.setItem("readmeBuilderBlocks", JSON.stringify(blocks));
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
    id: "block_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9),
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

// Nouvelle fonction pour déplacer un bloc
export function moveBlock(draggedId, targetId, insertBefore = true) {
  const draggedIndex = blocks.findIndex(b => b.id === draggedId);
  const targetIndex = blocks.findIndex(b => b.id === targetId);
  
  if (draggedIndex === -1 || targetIndex === -1) {
    console.error('Block not found for drag & drop');
    return;
  }
  
  // Retirer le bloc de sa position actuelle
  const [draggedBlock] = blocks.splice(draggedIndex, 1);
  
  // Calculer la nouvelle position
  let newIndex;
  if (insertBefore) {
    newIndex = targetIndex > draggedIndex ? targetIndex - 1 : targetIndex;
  } else {
    newIndex = targetIndex > draggedIndex ? targetIndex : targetIndex + 1;
  }
  
  // Insérer le bloc à sa nouvelle position
  blocks.splice(newIndex, 0, draggedBlock);
  saveToLocalStorage();
}

// Fonction pour supprimer un bloc
export function deleteBlock(id) {
  const index = blocks.findIndex(b => b.id === id);
  if (index !== -1) {
    blocks.splice(index, 1);
    saveToLocalStorage();
  }
}

// Fonction pour dupliquer un bloc
export function duplicateBlock(id) {
  const originalBlock = blocks.find(b => b.id === id);
  if (originalBlock) {
    const newBlock = {
      ...originalBlock,
      id: "block_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9),
      content: originalBlock.content + " (copie)"
    };
    
    const originalIndex = blocks.findIndex(b => b.id === id);
    blocks.splice(originalIndex + 1, 0, newBlock);
    saveToLocalStorage();
  }
}