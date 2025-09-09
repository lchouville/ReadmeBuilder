// blockEditor.js
import { updateBlock } from './data.js';
import { renderAll } from './app.js';

export function enableBlockEditing(blockElement, blockData, onEditEnd) {
  const form = document.createElement("form");
  form.className = "block-editor";

  // Content input
  const textarea = document.createElement("textarea");
  textarea.value = blockData.content;
  textarea.rows = 3;
  textarea.style.width = "100%";
  form.appendChild(textarea);

  // If it's a title block -> add select for h1-h6
  let select;
  if (["h1", "h2", "h3", "h4", "h5", "h6"].includes(blockData.type)) {
    select = document.createElement("select");
    ["h1", "h2", "h3", "h4", "h5", "h6"].forEach(level => {
      const option = document.createElement("option");
      option.value = level;
      option.textContent = level.toUpperCase();
      if (blockData.type === level) {
        option.selected = true;
      }
      select.appendChild(option);
    });
    form.appendChild(select);
  }

  // Buttons container
  const btnRow = document.createElement("div");
  btnRow.style.marginTop = "8px";

  const saveBtn = document.createElement("button");
  saveBtn.type = "submit";
  saveBtn.textContent = "Save";
  btnRow.appendChild(saveBtn);

  const cancelBtn = document.createElement("button");
  cancelBtn.type = "button";
  cancelBtn.textContent = "Cancel";
  cancelBtn.style.marginLeft = "10px";
  btnRow.appendChild(cancelBtn);

  form.appendChild(btnRow);

  // Replace block content
  blockElement.innerHTML = "";
  blockElement.appendChild(form);

  // Save handler
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const updates = { content: textarea.value };
    if (select) {
      updates.type = select.value; // update heading level
    }
    updateBlock(blockData.id, updates);

    // Appeler le callback pour indiquer que l'édition est terminée
    if (onEditEnd) onEditEnd();

    renderAll();
  });

  // Cancel handler
  cancelBtn.addEventListener("click", () => {
    // Appeler le callback pour indiquer que l'édition est terminée
    if (onEditEnd) onEditEnd();

    renderAll();
  });

  // Auto focus on textarea
  textarea.focus();

  // Désactiver le drag pendant l'édition
  blockElement.draggable = false;
}