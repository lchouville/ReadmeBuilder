// textBlock.js
// Manage creation and rendering of Text block

export function createTextBlock(block) {
  const div = document.createElement(block.type);
  div.classList.add("block", "text-block");
  div.dataset.id = block.id;
  div.textContent = block.content;

  return div;
}
