// blocks.js
import { getBlocksData } from './data.js';
import { createTitleBlock } from './blocks/titleBlock.js';
import { createTextBlock } from './blocks/textBlock.js';
import { enableBlockEditing } from './blockEditor.js';

export function createBlockElement(block) {
  switch (true) {
    case ["h1","h2","h3","h4","h5","h6"].includes(block.type):
      return createTitleBlock(block);

    case block.type === "p":
      return createTextBlock(block);

    default:
      const fallback = document.createElement("div");
      fallback.textContent = `[Unknown block type: ${block.type}]`;
      return fallback;
  }
}

export function renderBlocks(container, addButtonElement) {
  container.innerHTML = "";

  getBlocksData().forEach(block =>{
    const blockElement = createBlockElement(block);

    // Attach editing only once, if not already editing
    blockElement.addEventListener("click", (e) => {
      e.stopPropagation(); // prevent bubbling
      if (!blockElement.classList.contains("editing")) {
        blockElement.classList.add("editing"); // mark as editing
        enableBlockEditing(blockElement, block);
      }
    });

    container.appendChild(blockElement);
  });

  // Always append the "+" button at the end
  container.appendChild(addButtonElement);
}
