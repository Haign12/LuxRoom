const fs = require('fs');
const { marked } = require('marked');

// Custom renderer to handle mermaid code blocks
const renderer = new marked.Renderer();
const originalCodeRenderer = renderer.code;

renderer.code = function({ text, lang }) {
  if (lang === 'mermaid') {
    return `<div class="mermaid">${text}</div>`;
  }
  // Default code block rendering
  const escaped = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return `<pre><code class="language-${lang || ''}">${escaped}</code></pre>`;
};

marked.setOptions({ renderer });

const md = fs.readFileSync('BA_Complete_Documentation.md', 'utf8');
const htmlBody = marked.parse(md);

const html = `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bộ Tài Liệu BA — LuxRoom E-Commerce (v3.0)</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

    :root {
      --primary: #0f3460;
      --primary-light: #1a5276;
      --accent: #e94560;
      --bg: #ffffff;
      --text: #1a1a2e;
      --text-light: #555;
      --border: #e0e0e0;
      --bg-alt: #f8f9fc;
      --code-bg: #1e1e2e;
    }

    * { margin: 0; padding: 0; box-sizing: border-box; }

    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      font-size: 13px;
      line-height: 1.7;
      color: var(--text);
      background: var(--bg);
      max-width: 210mm;
      margin: 0 auto;
      padding: 20mm 18mm;
    }

    h1 {
      font-size: 24px;
      font-weight: 800;
      color: var(--primary);
      border-bottom: 3px solid var(--primary);
      padding-bottom: 10px;
      margin-top: 50px;
      margin-bottom: 20px;
      page-break-before: always;
      letter-spacing: -0.5px;
    }

    h1:first-of-type { page-break-before: avoid; margin-top: 0; }

    h2 {
      font-size: 17px;
      font-weight: 700;
      color: var(--primary-light);
      border-bottom: 1px solid var(--border);
      padding-bottom: 6px;
      margin-top: 30px;
      margin-bottom: 12px;
    }

    h3 {
      font-size: 14px;
      font-weight: 600;
      color: var(--text);
      margin-top: 20px;
      margin-bottom: 8px;
    }

    p { margin: 8px 0; }

    table {
      border-collapse: collapse;
      width: 100%;
      font-size: 12px;
      margin: 12px 0;
      page-break-inside: avoid;
    }

    thead th {
      background: var(--primary);
      color: white;
      padding: 9px 12px;
      text-align: left;
      font-weight: 600;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    td {
      border: 1px solid var(--border);
      padding: 7px 12px;
      vertical-align: top;
    }

    tbody tr:nth-child(even) { background: var(--bg-alt); }

    code {
      background: #f0f0f5;
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 12px;
      font-family: 'Cascadia Code', 'Fira Code', Consolas, monospace;
      color: var(--accent);
    }

    pre {
      background: var(--code-bg);
      color: #cdd6f4;
      padding: 16px 20px;
      border-radius: 8px;
      font-size: 11px;
      overflow-x: auto;
      margin: 12px 0;
      page-break-inside: avoid;
      border: 1px solid #313244;
      line-height: 1.5;
    }

    pre code {
      background: none;
      color: inherit;
      padding: 0;
    }

    blockquote {
      border-left: 4px solid var(--primary);
      margin: 14px 0;
      padding: 10px 18px;
      background: #f0f4ff;
      border-radius: 0 8px 8px 0;
    }

    ul, ol { margin: 8px 0; padding-left: 24px; }
    li { margin: 3px 0; }

    hr {
      border: none;
      border-top: 1px solid var(--border);
      margin: 25px 0;
    }

    .mermaid {
      text-align: center;
      margin: 18px 0;
      page-break-inside: avoid;
      background: #fafbfe;
      padding: 15px;
      border-radius: 8px;
      border: 1px solid var(--border);
    }

    .mermaid svg {
      max-width: 100% !important;
      height: auto !important;
    }

    a { color: var(--primary); text-decoration: none; }

    @media print {
      body { max-width: none; padding: 0; font-size: 12px; }
      h1 { page-break-before: always; font-size: 20px; }
      h1:first-of-type { page-break-before: avoid; }
      pre { font-size: 10px; }
      .mermaid { page-break-inside: avoid; }
      @page {
        size: A4;
        margin: 18mm 15mm;
      }
    }
  </style>
</head>
<body>

${htmlBody}

<script src="https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js"></script>
<script>
  mermaid.initialize({
    startOnLoad: true,
    theme: 'base',
    themeVariables: {
      primaryColor: '#e8f0fe',
      primaryBorderColor: '#0f3460',
      primaryTextColor: '#1a1a2e',
      lineColor: '#0f3460',
      secondaryColor: '#fff3e0',
      tertiaryColor: '#f3e5f5',
      fontFamily: 'Inter, sans-serif',
      fontSize: '12px'
    },
    flowchart: { curve: 'basis', padding: 15 },
    sequence: { actorMargin: 50, messageMargin: 40 }
  });
</script>
</body>
</html>`;

fs.writeFileSync('BA_Complete_Documentation.html', html, 'utf8');
console.log('✅ Đã tạo file HTML thành công (có hỗ trợ Mermaid)!');
console.log('📄 File: BA_Complete_Documentation.html');
