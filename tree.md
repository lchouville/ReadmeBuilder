```cmd
/ReadmeBuilder
├── index.html
├── css/
│   ├── core/
│   │   ├── variables.css
│   │   ├── reset.css
│   │   └── themes.css
│   ├── components/
│   │   ├── block.css
│   │   ├── toolbar.css
│   │   └── editor.css
│   └── style.css (import tout)
├── js/
│   ├── app.js (point d'entrée)
│   ├── core/
│   │   ├── Store.js (état centralisé)
│   │   └── EventBus.js (communication)
│   ├── services/
│   │   ├── StorageService.js
│   │   ├── ExportService.js
│   │   └── ValidationService.js
│   ├── components/
│   │   ├── Editor.js
│   │   ├── Toolbar.js
│   │   └── blocks/
│   │       ├── Block.js (classe de base)
│   │       ├── BlockFactory.js
│   │       ├── TitleBlock.js
│   │       ├── TextBlock.js
│   │       └── CodeBlock.js
│   └── utils/
│       ├── helpers.js
│       ├── validators.js
│       └── constants.js
```