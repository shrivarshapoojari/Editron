import type { Monaco } from "@monaco-editor/react";

export const getEditorLanguage = (fileExtension: string): string => {
  const extension = fileExtension.toLowerCase();
  const languageMap: Record<string, string> = {
    // JavaScript/TypeScript
    js: "javascript",
    jsx: "javascript",
    ts: "typescript",
    tsx: "typescript",
    mjs: "javascript",
    cjs: "javascript",
    
    // Web languages
    json: "json",
    html: "html",
    htm: "html",
    css: "css",
    scss: "scss",
    sass: "scss",
    less: "less",
    
    // Markup/Documentation
    md: "markdown",
    markdown: "markdown",
    xml: "xml",
    yaml: "yaml",
    yml: "yaml",
    
    // Programming languages
    py: "python",
    python: "python",
    java: "java",
    c: "c",
    cpp: "cpp",
    cs: "csharp",
    php: "php",
    rb: "ruby",
    go: "go",
    rs: "rust",
    sh: "shell",
    bash: "shell",
    sql: "sql",
    
    // Config files
    toml: "ini",
    ini: "ini",
    conf: "ini",
    dockerfile: "dockerfile",
  };
  
  return languageMap[extension] || "plaintext";
};

export const configureMonaco = (monaco: Monaco) => {
  // Define a beautiful modern dark theme with cyan accents
  monaco.editor.defineTheme("modern-dark", {
    base: "vs-dark",
    inherit: true,
    rules: [
      // Comments
      { token: "comment", foreground: "6B7280", fontStyle: "italic" },
      { token: "comment.line", foreground: "6B7280", fontStyle: "italic" },
      { token: "comment.block", foreground: "6B7280", fontStyle: "italic" },
      
      // Keywords
      { token: "keyword", foreground: "06B6D4", fontStyle: "bold" },
      { token: "keyword.control", foreground: "06B6D4", fontStyle: "bold" },
      { token: "keyword.operator", foreground: "E5E7EB" },
      
      // Strings
      { token: "string", foreground: "34D399" },
      { token: "string.quoted", foreground: "34D399" },
      { token: "string.template", foreground: "34D399" },
      
      // Numbers
      { token: "number", foreground: "FBBF24" },
      { token: "number.hex", foreground: "FBBF24" },
      { token: "number.float", foreground: "FBBF24" },
      
      // Functions
      { token: "entity.name.function", foreground: "67E8F9" },
      { token: "support.function", foreground: "67E8F9" },
      
      // Variables
      { token: "variable", foreground: "A5F3FC" },
      { token: "variable.parameter", foreground: "A5F3FC" },
      { token: "variable.other", foreground: "A5F3FC" },
      
      // Types
      { token: "entity.name.type", foreground: "22D3EE" },
      { token: "support.type", foreground: "22D3EE" },
      { token: "storage.type", foreground: "06B6D4" },
      
      // Classes
      { token: "entity.name.class", foreground: "22D3EE" },
      { token: "support.class", foreground: "22D3EE" },
      
      // Constants
      { token: "constant", foreground: "0EA5E9" },
      { token: "constant.language", foreground: "06B6D4" },
      { token: "constant.numeric", foreground: "FBBF24" },
      
      // Operators
      { token: "keyword.operator", foreground: "E5E7EB" },
      { token: "punctuation", foreground: "E5E7EB" },
      
      // HTML/XML
      { token: "tag", foreground: "06B6D4" },
      { token: "tag.id", foreground: "A5F3FC" },
      { token: "tag.class", foreground: "67E8F9" },
      { token: "attribute.name", foreground: "A5F3FC" },
      { token: "attribute.value", foreground: "34D399" },
      
      // CSS
      { token: "attribute.name.css", foreground: "A5F3FC" },
      { token: "attribute.value.css", foreground: "34D399" },
      { token: "property-name.css", foreground: "A5F3FC" },
      { token: "property-value.css", foreground: "34D399" },
      
      // JSON
      { token: "key", foreground: "A5F3FC" },
      { token: "string.key", foreground: "A5F3FC" },
      { token: "string.value", foreground: "34D399" },
      
      // Error/Warning
      { token: "invalid", foreground: "EF4444", fontStyle: "underline" },
      { token: "invalid.deprecated", foreground: "9CA3AF", fontStyle: "strikethrough" },
    ],
    colors: {
      // Editor background with gradient-like dark effect
      "editor.background": "#0F172A",
      "editor.foreground": "#F1F5F9",
      
      // Line numbers
      "editorLineNumber.foreground": "#475569",
      "editorLineNumber.activeForeground": "#06B6D4",
      
      // Cursor
      "editorCursor.foreground": "#06B6D4",
      
      // Selection
      "editor.selectionBackground": "#0891B230",
      "editor.selectionHighlightBackground": "#0891B215",
      "editor.inactiveSelectionBackground": "#1E293B",
      
      // Current line
      "editor.lineHighlightBackground": "#1E293B",
      "editor.lineHighlightBorder": "#334155",
      
      // Gutter
      "editorGutter.background": "#0F172A",
      "editorGutter.modifiedBackground": "#F59E0B66",
      "editorGutter.addedBackground": "#10B98166",
      "editorGutter.deletedBackground": "#EF444466",
      
      // Scrollbar
      "scrollbar.shadow": "#0008",
      "scrollbarSlider.background": "#47556966",
      "scrollbarSlider.hoverBackground": "#47556988",
      "scrollbarSlider.activeBackground": "#475569BB",
      
      // Minimap
      "minimap.background": "#1E293B",
      "minimap.selectionHighlight": "#0891B230",
      
      // Find/Replace
      "editor.findMatchBackground": "#0891B2",
      "editor.findMatchHighlightBackground": "#06B6D480",
      "editor.findRangeHighlightBackground": "#22D3EE40",
      
      // Word highlight
      "editor.wordHighlightBackground": "#47556980",
      "editor.wordHighlightStrongBackground": "#0891B280",
      
      // Brackets
      "editor.bracketMatch.background": "#06B6D420",
      "editor.bracketMatch.border": "#06B6D4",
      
      // Indentation guides
      "editorIndentGuide.background": "#334155",
      "editorIndentGuide.activeBackground": "#475569",
      
      // Ruler
      "editorRuler.foreground": "#334155",
      
      // Whitespace
      "editorWhitespace.foreground": "#475569",
      
      // Error/Warning squiggles
      "editorError.foreground": "#EF4444",
      "editorWarning.foreground": "#F59E0B",
      "editorInfo.foreground": "#06B6D4",
      "editorHint.foreground": "#67E8F9",
      
      // Suggest widget
      "editorSuggestWidget.background": "#1E293B",
      "editorSuggestWidget.border": "#334155",
      "editorSuggestWidget.foreground": "#F1F5F9",
      "editorSuggestWidget.selectedBackground": "#334155",
      
      // Hover widget
      "editorHoverWidget.background": "#1E293B",
      "editorHoverWidget.border": "#334155",
      
      // Panel
      "panel.background": "#0F172A",
      "panel.border": "#334155",
      
      // Activity bar
      "activityBar.background": "#0F172A",
      "activityBar.foreground": "#F1F5F9",
      "activityBar.border": "#334155",
      
      // Side bar
      "sideBar.background": "#0F172A",
      "sideBar.foreground": "#F1F5F9",
      "sideBar.border": "#334155",
    },
  });

  // Set the theme
  monaco.editor.setTheme("modern-dark");
  
  // Configure additional editor settings
  monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
    noSemanticValidation: false,
    noSyntaxValidation: false,
  });
  
  monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
    noSemanticValidation: false,
    noSyntaxValidation: false,
  });

  // Set compiler options for better IntelliSense
  monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
    target: monaco.languages.typescript.ScriptTarget.Latest,
    allowNonTsExtensions: true,
    moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
    module: monaco.languages.typescript.ModuleKind.CommonJS,
    noEmit: true,
    esModuleInterop: true,
    jsx: monaco.languages.typescript.JsxEmit.React,
    reactNamespace: "React",
    allowJs: true,
    typeRoots: ["node_modules/@types"],
  });

  monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
    target: monaco.languages.typescript.ScriptTarget.Latest,
    allowNonTsExtensions: true,
    moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
    module: monaco.languages.typescript.ModuleKind.CommonJS,
    noEmit: true,
    esModuleInterop: true,
    allowSyntheticDefaultImports: true,
    jsx: monaco.languages.typescript.JsxEmit.React,
    reactNamespace: "React",
    allowJs: true,
    typeRoots: ["node_modules/@types"],
  });
};

export const defaultEditorOptions = {
  // Font settings
  fontSize: 14,
  fontFamily: "'JetBrains Mono', 'Fira Code', 'SF Mono', Consolas, 'Liberation Mono', Menlo, Courier, monospace",
  fontLigatures: true,
  fontWeight: "400",
  
  // Layout
  minimap: { 
    enabled: true,
    size: "proportional",
    showSlider: "mouseover"
  },
  scrollBeyondLastLine: false,
  automaticLayout: true,
  padding: { top: 16, bottom: 16 },
  
  // Line settings
  lineNumbers: "on",
  lineHeight: 20,
  renderLineHighlight: "all",
  renderWhitespace: "selection",
  
  // Indentation
  tabSize: 2,
  insertSpaces: true,
  detectIndentation: true,
  
  // Word wrapping
  wordWrap: "on",
  wordWrapColumn: 120,
  wrappingIndent: "indent",
  
  // Code folding
  folding: true,
  foldingHighlight: true,
  foldingStrategy: "indentation",
  showFoldingControls: "mouseover",
  
  // Scrolling
  smoothScrolling: true,
  mouseWheelZoom: true,
  fastScrollSensitivity: 5,
  
  // Selection
  multiCursorModifier: "ctrlCmd",
  selectionHighlight: true,
  occurrencesHighlight: true,
  
  // Suggestions
  suggestOnTriggerCharacters: true,
  acceptSuggestionOnEnter: "on",
  tabCompletion: "on",
  wordBasedSuggestions: true,
  quickSuggestions: {
    other: true,
    comments: false,
    strings: false
  },
  
  // Formatting
  formatOnPaste: true,
  formatOnType: true,
  
  // Bracket matching
  matchBrackets: "always",
  bracketPairColorization: {
    enabled: true
  },
  
  // Guides
  renderIndentGuides: true,
  highlightActiveIndentGuide: true,
  rulers: [80, 120],
  
  // Performance
  disableLayerHinting: false,
  disableMonospaceOptimizations: false,
  
  // Accessibility
  accessibilitySupport: "auto",
  
  // Cursor
  cursorBlinking: "smooth",
  cursorSmoothCaretAnimation: true,
  cursorStyle: "line",
  cursorWidth: 2,
  
  // Find
  find: {
    addExtraSpaceOnTop: false,
    autoFindInSelection: "never",
    seedSearchStringFromSelection: "always"
  },
  
  // Hover
  hover: {
    enabled: true,
    delay: 300,
    sticky: true
  },
  
  // Semantic highlighting
  "semanticHighlighting.enabled": true,
  
  // Sticky scroll
  stickyScroll: {
    enabled: true
  }
};