// titleBlock.js
// Manage creation and rendering of Title block

export function createTitleBlock(block) {
  const div = document.createElement(block.type);
  div.classList.add("block", "title-block");
  div.dataset.id = block.id;
  div.textContent = block.content || "Titre (h1)";

  div.addEventListener("click", (block) => {
    div.innerHtml = "";
  });
  return div;
}
