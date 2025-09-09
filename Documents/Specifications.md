<h1>
  <a href="/Documents/fr/CahierDesCharges.md"><img src="https://img.icons8.com/color/48/000000/france-circular.png" width="30" alt="Français"/></a>
  <a href="/Documents/Specifications.md"><img src="https://img.icons8.com/color/48/000000/great-britain-circular.png" width="30" alt="English"/></a> 
  Specifications – README.md Creation Tool
</h1>

## 1. Context & Objective

The goal is to develop an interactive tool that allows users to **generate README.md files (and other Markdown files)** in a simple, modular, and GitHub-compatible way.  
Users can build their document **block by block**, manage multiple pages, export the result, and enrich it with different formats (Markdown, HTML).

---

## 2. Features

### 2.1 Block-by-Block Creation

- **Add blocks**

  - "+" button at the bottom of the block list.
  - Dropdown menu / modal to select the block type.

- **Available block types**

  - Headings (h1 → h6) with adjustable level.
  - Paragraph (simple text with Markdown formatting).
  - Lists: ordered (1.) and unordered (-).
  - Code: block with syntax highlighting (selectable language).
  - Formatted text: bold, italic, strikethrough.
  - Images (upload or URL with alt text).
  - Links (clickable text + URL).
  - Tables (Markdown).
  - Nested blocks (e.g., list inside a quote).

- **Block editing**
  - Editable content + style.
  - Options: text color, background color, alignment.
  - Actions: delete, duplicate, move up/down.

📌 JSON structure example:

```json
{
  "blocks": [
    {
      "id": "block_1",
      "type": "header",
      "level": 1,
      "content": "Main Title",
      "color": "#000000",
      "background": "#FFFFFF"
    },
    {
      "id": "block_2",
      "type": "paragraph",
      "content": "A paragraph with **bold** and *italic* text.",
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

### 2.2 Multi-Page with Redirection

- One page = one file (e.g., `README.md`, `INSTALL.md`).
- Pages can be renamed (⚠️ links are not updated automatically).
- No clickable link preview in the editor.
- Export as ZIP folder or separate files.

### 2.3 GitHub Markdown Compatibility

- **Full support**: headings, paragraphs, lists, links, images, code, tables, task lists, emojis, mentions.
- **Warning for unsupported elements** (e.g., unsupported HTML tags).
- List of incompatibilities shown before export.

### 2.4 Markdown → HTML Conversion

- **Export options**:
  - Plain HTML (no CSS).
  - Styled HTML (integrated CSS, customizable theme).
  - Custom CSS upload.

📌 Example:

```markdown
# Title

- **Bold** and _italic_.
```

→

```html
<h1>Title</h1>
<ul>
  <li><strong>Bold</strong> and <em>italic</em>.</li>
</ul>
```

### 2.5 Local Storage

- Automatic saving:
  - Every minute **or** after a major modification.
  - Only one project at a time (previous save overwritten).

📌 JSON example:

```json
{
  "project": {
    "name": "My Project",
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

### 2.6 Export / Import

- **Export**:

  - `.json`: full structure.
  - `.md`: GitHub-compatible.
  - `.html`: web version (plain or styled).

- **Import**:
  - `.json`: full project import.
  - `.md`: convert to editable blocks (possible loss of style).
  - `.html`: extract content if simple structure.

## 3. Technologies

- **HTML5 / CSS3**: interface structure & style.
- **JavaScript (ES6+)**: business logic and interactions.
- **LocalStorage**: local persistence.
- **Marked.js**: Markdown → HTML parsing.
- **Highlight.js**: syntax highlighting.

## 4. Development Steps

1. **Specification validation**.
2. **Prioritization**:
   - Basic HTML/CSS structure.
   - Block addition/editing.
   - Automatic saving.
3. **Prototype**: block management + saving.
4. **Advanced features**: export/import, multi-page, GitHub compatibility.
