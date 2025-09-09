// addButton.js
// Create the "+ Add Block" button with menu

import { addBlockData } from './data.js';

export function createAddButton(renderCallback) {
  const button = document.createElement("button");
  button.textContent = "+ Add Block";
  button.classList.add("add-block-btn");

  const menu = document.createElement("div");
  menu.classList.add("add-block-menu");

  ["title", "text"].forEach(type => {
    const option = document.createElement("div");
    option.textContent = type === "title" ? "Title" : "Text";
    option.classList.add("add-block-option");

    option.addEventListener("click", () => {
      addBlockData(type);
      menu.style.display = "none";
      renderCallback();
    });

    menu.appendChild(option);
  });

  button.addEventListener("click", (e) => {
    e.stopPropagation();
    menu.style.display = menu.style.display === "none" ? "block" : "none";
  });

  document.addEventListener("click", () => {
    menu.style.display = "none";
  });

  const container = document.createElement("div");
  container.style.position = "relative";
  container.appendChild(button);
  container.appendChild(menu);

  return container;
}
