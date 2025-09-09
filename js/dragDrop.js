// js/dragDrop.js
// Gestion du drag & drop pour réorganiser les blocs

import { moveBlock } from './data.js';
import { renderAll } from './app.js';

let draggedElement = null;
let draggedBlockId = null;

export function enableDragDrop(blockElement, blockData) {
  // Rendre l'élément draggable
  blockElement.draggable = true;
  blockElement.dataset.blockId = blockData.id;

  // Optionnel : ajouter un handle de drag
  addDragHandle(blockElement);

  // Event listeners pour le drag
  blockElement.addEventListener('dragstart', handleDragStart);
  blockElement.addEventListener('dragend', handleDragEnd);
  blockElement.addEventListener('dragover', handleDragOver);
  blockElement.addEventListener('dragenter', handleDragEnter);
  blockElement.addEventListener('dragleave', handleDragLeave);
  blockElement.addEventListener('drop', handleDrop);
}

function addDragHandle(blockElement) {
  const handle = document.createElement('div');
  handle.classList.add('drag-handle');
  handle.title = 'Glisser pour réorganiser';
  blockElement.appendChild(handle);
  
  // Le handle déclenche le drag au lieu du bloc entier
  handle.addEventListener('mousedown', (e) => {
    // Optionnel : démarrer le drag seulement depuis le handle
    e.stopPropagation();
  });
}

function handleDragStart(e) {
  draggedElement = this;
  draggedBlockId = this.dataset.blockId;
  
  this.classList.add('dragging');
  
  // Données à transférer
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', this.outerHTML);
  e.dataTransfer.setData('text/plain', draggedBlockId);
  
  // Image de drag personnalisée (optionnel)
  const dragImage = this.cloneNode(true);
  dragImage.style.opacity = '0.8';
  e.dataTransfer.setDragImage(dragImage, 0, 0);
}

function handleDragEnd(e) {
  this.classList.remove('dragging');
  
  // Nettoyer tous les indicateurs visuels
  document.querySelectorAll('.block').forEach(block => {
    block.classList.remove('drag-over', 'drag-over-bottom');
  });
  
  draggedElement = null;
  draggedBlockId = null;
}

function handleDragOver(e) {
  if (e.preventDefault) {
    e.preventDefault(); // Permet le drop
  }
  
  e.dataTransfer.dropEffect = 'move';
  
  if (this === draggedElement) {
    return false;
  }
  
  // Déterminer si on est au-dessus ou en-dessous du milieu
  const rect = this.getBoundingClientRect();
  const midY = rect.top + rect.height / 2;
  
  this.classList.remove('drag-over', 'drag-over-bottom');
  
  if (e.clientY < midY) {
    this.classList.add('drag-over'); // Au-dessus
  } else {
    this.classList.add('drag-over-bottom'); // En-dessous
  }
  
  return false;
}

function handleDragEnter(e) {
  if (this !== draggedElement) {
    // Optionnel : effet visuel d'entrée
  }
}

function handleDragLeave(e) {
  // Retirer les classes visuelles seulement si on quitte vraiment l'élément
  const rect = this.getBoundingClientRect();
  if (e.clientX < rect.left || e.clientX > rect.right || 
      e.clientY < rect.top || e.clientY > rect.bottom) {
    this.classList.remove('drag-over', 'drag-over-bottom');
  }
}

function handleDrop(e) {
  if (e.stopPropagation) {
    e.stopPropagation(); // Empêche la propagation
  }
  
  if (this === draggedElement) {
    return false;
  }
  
  const targetBlockId = this.dataset.blockId;
  
  // Déterminer la position (avant ou après)
  const rect = this.getBoundingClientRect();
  const midY = rect.top + rect.height / 2;
  const insertBefore = e.clientY < midY;
  
  // Déplacer le bloc dans les données
  moveBlock(draggedBlockId, targetBlockId, insertBefore);
  
  // Nettoyer les classes visuelles
  this.classList.remove('drag-over', 'drag-over-bottom');
  
  // Re-render pour refléter le nouvel ordre
  setTimeout(() => renderAll(), 50);
  
  return false;
}

// Fonction utilitaire pour désactiver temporairement le drag (pendant l'édition)
export function disableDragDrop(blockElement) {
  blockElement.draggable = false;
}

export function enableDragDropAgain(blockElement) {
  blockElement.draggable = true;
}