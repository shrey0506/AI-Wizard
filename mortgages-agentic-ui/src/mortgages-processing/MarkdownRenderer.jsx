import React, { useMemo } from "react";
import MarkdownIt from "markdown-it";
import hljs from "highlight.js";
import "highlight.js/styles/github.css"; // Use the GitHub light theme
// import "./markdown-custom.css";          // Custom overrides if you want (see below)
import 'highlight.js/styles/github.css';             // GitHub (light)
import 'highlight.js/styles/atom-one-light.css';     // Atom One Light
import 'highlight.js/styles/atom-one-dark.css';      // Atom One Dark
import 'highlight.js/styles/monokai-sublime.css';    // Monokai Sublime
import 'highlight.js/styles/stackoverflow-light.css';// StackOverflow Light
import 'highlight.js/styles/stackoverflow-dark.css'; // StackOverflow Dark
import 'highlight.js/styles/default.min.css';        // Classic default

// Main configure function for markdown-it
function configureMarkdown() {
  const md = new MarkdownIt({
    html: false,  // Don't allow raw HTML (safe)
    linkify: true,
    typographer: true,
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return `<pre class="hljs"><code>${hljs.highlight(str, { language: lang }).value}</code></pre>`;
        } catch (_) { }
      }
      return `<pre class="hljs"><code>${md.utils.escapeHtml(str)}</code></pre>`;
    },
  });
  return md;
}

const MarkDownRenderer = ({ content = "", messageId }) => {
  const md = useMemo(() => configureMarkdown(), []);
  const html = useMemo(() => md.render(content), [content, md]);

  return (
    <div
      className="prose markdown-response" // `prose` is for typography (tailwind/other), `markdown-response` is your CSS
      style={{
        fontSize: 16,
        color: "#222", // Default text color
        // background: "transparent", // No background
        padding: 0,
        margin: 0,
        wordBreak: "break-word",
      }}
      // If you trust your backend, you can use dangerouslySetInnerHTML
      dangerouslySetInnerHTML={{ __html: html }}
      id={messageId}
    />
  );
};

export default MarkDownRenderer;
