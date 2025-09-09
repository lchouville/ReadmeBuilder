// blocks.js
import { getBlockById, getBlocksData } from './data.js';
import { createTitleBlock } from './blocks/titleBlock.js';
import { createTextBlock } from './blocks/textBlock.js';
import { enableBlockEditing } from './blockEditor.js';
import { enableDragDrop, disableDragDrop, enableDragDropAgain } from './dragDrop.js';

export function createBlockElement(block) {
  let blockElement;

  switch (true) {
    case ["h1", "h2", "h3", "h4", "h5", "h6"].includes(block.type):
      blockElement = createTitleBlock(block);
      break;

    case block.type === "p":
      blockElement = createTextBlock(block);
      break;

    default:
      blockElement = document.createElement("div");
      blockElement.textContent = `[Unknown block type: ${block.type}]`;
      break;
  }

  // Activer le drag & drop pour ce bloc
  enableDragDrop(blockElement, block);

  return blockElement;
}

export function renderBlocks(container, addButtonElement) {
  container.innerHTML = "";

  getBlocksData().forEach(block => {
    const blockElement = createBlockElement(block);

    // Attach editing only once, if not already editing
    blockElement.addEventListener("click", (e) => {
      e.stopPropagation(); // prevent bubbling

      // Ne pas démarrer l'édition si on clique sur le drag handle
      if (e.target.classList.contains('drag-handle')) {
        return;
      }

      if (!blockElement.classList.contains("editing")) {
        blockElement.classList.add("editing"); // mark as editing

        // Désactiver le drag pendant l'édition
        disableDragDrop(blockElement);

        enableBlockEditing(blockElement, block, () => {
          // Callback appelé quand l'édition se termine
          blockElement.classList.remove("editing");
          enableDragDropAgain(blockElement);
        });
      }
    });

    container.appendChild(blockElement);
  });

  // Always append the "+" button at the end
  container.appendChild(addButtonElement);
}

export function renderBlock(blockId) {
  const block = getBlockById(blockId);
  if (!block) return;

  // Trouver l'élément DOM correspondant via data-id
  const oldBlockElement = document.querySelector(`[data-id="${blockId}"]`);
  if (!oldBlockElement) return;

  // Créer le nouvel élément de bloc
  const newBlockElement = createBlockElement(block);

  // Remplacer l'ancien élément par le nouveau
  oldBlockElement.replaceWith(newBlockElement);

  // Réattacher les événements
  newBlockElement.addEventListener("click", (e) => {
    e.stopPropagation();
    if (e.target.classList.contains('drag-handle')) {
      return;
    }
    if (!newBlockElement.classList.contains("editing")) {
      newBlockElement.classList.add("editing");
      disableDragDrop(newBlockElement);
      enableBlockEditing(newBlockElement, block, () => {
        newBlockElement.classList.remove("editing");
        enableDragDropAgain(newBlockElement);
      });
    }
  });
}