const fs = require('fs');
const path = require('path');

// Read the markdown file
const mdContent = fs.readFileSync(path.join(__dirname, 'BA_Complete_Documentation.md'), 'utf-8');

// Simple markdown to HTML conversion
function mdToHtml(md) {
  let html = md;
  
  // Escape HTML entities first (except in code blocks)
  // We'll handle code blocks separately
  
  // Extract code blocks first
  const codeBlocks = [];
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (match, lang, code) => {
    const index = codeBlocks.length;
    const escapedCode = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    codeBlocks.push(`<pre class="code-block${lang ? ' lang-' + lang : ''}"><code>${escapedCode}</code></pre>`);
    return `%%CODEBLOCK_${index}%%`;
  });
  
  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>');
  
  // Headers
  html = html.replace(/^#{1}\s+(.+)$/gm, '<h1>$1</h1>');
  html = html.replace(/^#{2}\s+(.+)$/gm, '<h2>$1</h2>');
  html = html.replace(/^#{3}\s+(.+)$/gm, '<h3>$1</h3>');
  html = html.replace(/^#{4}\s+(.+)$/gm, '<h4>$1</h4>');
  
  // Bold and italic
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
  
  // Horizontal rules
  html = html.replace(/^---$/gm, '<hr>');
  
  // Blockquotes
  html = html.replace(/^>\s+(.+)$/gm, '<blockquote>$1</blockquote>');
  // Merge consecutive blockquotes
  html = html.replace(/<\/blockquote>\n<blockquote>/g, '<br>');
  
  // Tables
  html = html.replace(/^\|(.+)\|$/gm, (match, content) => {
    const cells = content.split('|').map(c => c.trim());
    if (cells.every(c => /^:?-+:?$/.test(c))) return '%%TABLE_SEP%%';
    const cellHtml = cells.map(c => `<td>${c}</td>`).join('');
    return `<tr>${cellHtml}</tr>`;
  });
  
  // Wrap table rows
  html = html.replace(/((?:<tr>.*<\/tr>\n?)+)/g, (match) => {
    let tableHtml = match.replace(/%%TABLE_SEP%%\n?/g, '');
    // Convert first row to th
    tableHtml = tableHtml.replace(/<tr>(.*?)<\/tr>/, (m, content) => {
      return '<thead><tr>' + content.replace(/<td>/g, '<th>').replace(/<\/td>/g, '</th>') + '</tr></thead><tbody>';
    });
    return '<table>' + tableHtml + '</tbody></table>';
  });
  
  // Unordered lists
  html = html.replace(/^- (.+)$/gm, '<li>$1</li>');
  html = html.replace(/((?:<li>.*<\/li>\n?)+)/g, '<ul>$1</ul>');
  
  // Paragraphs - wrap remaining text
  html = html.split('\n\n').map(block => {
    block = block.trim();
    if (!block) return '';
    if (block.startsWith('<') || block.startsWith('%%CODEBLOCK')) return block;
    return `<p>${block.replace(/\n/g, '<br>')}</p>`;
  }).join('\n');
  
  // Restore code blocks
  codeBlocks.forEach((block, i) => {
    html = html.replace(`%%CODEBLOCK_${i}%%`, block);
  });
  
  return html;
}

const htmlContent = mdToHtml(mdContent);

const fullHtml = `<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="UTF-8">
<title>Sổ Tay Vẽ Sơ Đồ Nghiệp Vụ — Dành Cho IT BA Chuyên Nghiệp</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
  
  * { margin: 0; padding: 0; box-sizing: border-box; }
  
  body {
    font-family: 'Inter', 'Segoe UI', sans-serif;
    font-size: 11pt;
    line-height: 1.6;
    color: #1a1a2e;
    max-width: 210mm;
    margin: 0 auto;
    padding: 15mm 20mm;
    background: #fff;
  }
  
  h1 {
    font-size: 20pt;
    color: #0f3460;
    border-bottom: 3px solid #e94560;
    padding-bottom: 8px;
    margin: 30px 0 15px 0;
    page-break-after: avoid;
  }
  
  h2 {
    font-size: 14pt;
    color: #16213e;
    border-left: 4px solid #e94560;
    padding-left: 12px;
    margin: 25px 0 10px 0;
    page-break-after: avoid;
  }
  
  h3 {
    font-size: 12pt;
    color: #0f3460;
    margin: 18px 0 8px 0;
    page-break-after: avoid;
  }
  
  h4 {
    font-size: 11pt;
    color: #333;
    margin: 12px 0 6px 0;
  }
  
  p { margin: 8px 0; }
  
  strong { color: #16213e; }
  
  hr {
    border: none;
    border-top: 1px solid #ddd;
    margin: 20px 0;
  }
  
  blockquote {
    background: #f0f4ff;
    border-left: 4px solid #0f3460;
    padding: 12px 16px;
    margin: 12px 0;
    border-radius: 0 6px 6px 0;
    font-size: 10pt;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 12px 0;
    font-size: 10pt;
  }
  
  th {
    background: #16213e;
    color: white;
    padding: 8px 10px;
    text-align: left;
    font-weight: 600;
  }
  
  td {
    padding: 6px 10px;
    border: 1px solid #ddd;
  }
  
  tr:nth-child(even) { background: #f8f9fa; }
  
  .code-block {
    background: #1e1e2e;
    color: #cdd6f4;
    padding: 14px 16px;
    border-radius: 8px;
    overflow-x: auto;
    font-family: 'Cascadia Code', 'Consolas', monospace;
    font-size: 9pt;
    line-height: 1.5;
    margin: 12px 0;
    white-space: pre-wrap;
    word-wrap: break-word;
    page-break-inside: avoid;
  }
  
  .code-block.lang-mermaid {
    background: #f0f4ff;
    color: #333;
    border: 1px dashed #0f3460;
    position: relative;
  }
  
  .code-block.lang-mermaid::before {
    content: '📊 Sơ đồ Mermaid (xem trên trình soạn thảo Markdown)';
    display: block;
    font-family: 'Inter', sans-serif;
    font-size: 9pt;
    color: #0f3460;
    font-style: italic;
    margin-bottom: 8px;
    padding-bottom: 6px;
    border-bottom: 1px dashed #ccc;
  }
  
  .inline-code {
    background: #e8ecf1;
    padding: 2px 6px;
    border-radius: 4px;
    font-family: 'Cascadia Code', 'Consolas', monospace;
    font-size: 9.5pt;
    color: #e94560;
  }
  
  ul {
    margin: 8px 0;
    padding-left: 24px;
  }
  
  li { margin: 3px 0; }
  
  @media print {
    body { padding: 10mm 15mm; }
    h1 { page-break-before: always; }
    h1:first-of-type { page-break-before: avoid; }
    .code-block { page-break-inside: avoid; }
    table { page-break-inside: avoid; }
  }
  
  @page {
    size: A4;
    margin: 15mm;
  }
</style>
</head>
<body>
${htmlContent}
</body>
</html>`;

// Write HTML file
const outputPath = path.join(__dirname, 'BA_Complete_Documentation.html');
fs.writeFileSync(outputPath, fullHtml, 'utf-8');
console.log('HTML created: ' + outputPath);
console.log('\\nĐể tạo PDF: Mở file HTML trên trình duyệt → Ctrl+P → Save as PDF');
