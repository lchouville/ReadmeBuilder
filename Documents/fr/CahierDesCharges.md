<h1>
  <a href="/Documents/Specifications.md"><img src="https://img.icons8.com/color/48/000000/great-britain-circular.png" width="30" alt="English"/></a>
  <a href="/Documents/fr/CahierDesCharges.md"><img src="https://img.icons8.com/color/48/000000/france-circular.png" width="30" alt="Français"/></a> 
  Cahier des Charges – Outil de Création de README.md
</h1>

## 1. Contexte & Objectif
L’objectif est de développer un outil interactif permettant de **générer des fichiers README.md (et autres fichiers Markdown)** de manière simple, modulaire et compatible avec GitHub.  
L’utilisateur pourra construire son document **bloc par bloc**, gérer plusieurs pages, exporter le résultat et l’enrichir avec différents formats (Markdown, HTML).  

---

## 2. Fonctionnalités

### 2.1 Création Bloc par Bloc
- **Ajout de blocs**  
  - Bouton “+” en bas de la liste des blocs.  
  - Menu déroulant / modale pour sélectionner le type de bloc.  

- **Types de blocs disponibles**  
  - Titres (h1 → h6) avec niveau modifiable.  
  - Paragraphe (texte simple avec mise en forme Markdown).  
  - Listes : ordonnées (1.) et non ordonnées (-).  
  - Code : bloc avec *syntax highlighting* (langage sélectionnable).  
  - Texte formaté : gras, italique, barré.  
  - Images (upload ou URL avec alt).  
  - Liens (texte cliquable + URL).  
  - Tableaux (Markdown).  
  - Blocs imbriqués (ex. : liste dans une citation).  

- **Édition des blocs**  
  - Chaque bloc est éditable (contenu + style).  
  - Options : couleur texte, couleur fond, alignement.  
  - Actions : suppression, duplication, déplacement (haut/bas).  

📌 Exemple de structure JSON :  
```json
{
  "blocks": [
    {
      "id": "block_1",
      "type": "header",
      "level": 1,
      "content": "Titre principal",
      "color": "#000000",
      "background": "#FFFFFF"
    },
    {
      "id": "block_2",
      "type": "paragraph",
      "content": "Un paragraphe avec du **gras** et *italique*.",
      "formats": ["bold", "italic"]
    },
    {
      "id": "block_3",
      "type": "code",
      "language": "javascript",
      "content": "console.log('Hello World');"
    }
  ]
}
```

---

### 2.2 Multi-Page avec Redirection
- Une page = un fichier (exemple : `README.md`, `INSTALL.md`).  
- Renommage possible des pages (⚠️ sans mise à jour auto des liens).  
- Pas de prévisualisation des liens cliquables dans l’éditeur.  
- Export en dossier ZIP ou fichiers séparés.  

---

### 2.3 Compatibilité Markdown GitHub
- **Support complet** : titres, paragraphes, listes, liens, images, code, tableaux, task lists, emojis, mentions.  
- **Alerte pour incompatibilités** (exemple : balises HTML non supportées).  
- Liste des incompatibilités affichée avant export.  

---

### 2.4 Conversion `.md` → HTML
- **Options d’export** :  
  - HTML brut (sans CSS).  
  - HTML stylisé (CSS intégré, thème personnalisable).  
  - Import d’un CSS personnalisé.  

📌 Exemple :  
```markdown
# Titre
- **Gras** et *italique*.
```
→
```html
<h1>Titre</h1>
<ul><li><strong>Gras</strong> et <em>italique</em>.</li></ul>
```

---

### 2.5 Sauvegarde Locale (LocalStorage)
- Sauvegarde automatique :  
  - Toutes les minutes **ou** après modification majeure.  
  - Un seul projet à la fois (sauvegarde écrasée).  

📌 Exemple JSON :  
```json
{
  "project": {
    "name": "Mon Projet",
    "lastSaved": "2025-09-03T14:20:00Z",
    "pages": [
      {
        "name": "README",
        "blocks": [...]
      }
    ]
  }
}
```

---

### 2.6 Export / Import
- **Export** :  
  - `.json` : structure complète.  
  - `.md` : compatible GitHub.  
  - `.html` : version web (brute ou stylisée).  

- **Import** :  
  - `.json` : réimport complet.  
  - `.md` : conversion en blocs (perte de style possible).  
  - `.html` : extraction du contenu si structure simple.  

---

## 3. Technologies Utilisées
- **HTML5 / CSS3** : structure & style de l’interface.  
- **JavaScript (ES6+)** : logique métier et interactions.  
- **LocalStorage** : persistance locale.  
- **Marked.js** : parsing Markdown → HTML.  
- **Highlight.js** : coloration syntaxique.  

---

## 4. Étapes de Développement
1. **Validation du cahier des charges**.  
2. **Priorisation** :  
   - Structure HTML/CSS de base.  
   - Ajout/édition de blocs.  
   - Sauvegarde automatique.  
3. **Prototype** : gestion des blocs + sauvegarde.  
4. **Ajout des fonctionnalités avancées** : export/import, multi-pages, compatibilité GitHub.  
