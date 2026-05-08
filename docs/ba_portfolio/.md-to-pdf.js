module.exports = {
  stylesheet: [],
  css: `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
    
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      font-size: 13px;
      line-height: 1.6;
      color: #1a1a2e;
      max-width: 100%;
    }
    
    h1 {
      font-size: 22px;
      font-weight: 700;
      color: #0f3460;
      border-bottom: 3px solid #0f3460;
      padding-bottom: 8px;
      margin-top: 40px;
      page-break-before: always;
    }
    
    h1:first-of-type {
      page-break-before: avoid;
    }
    
    h2 {
      font-size: 17px;
      font-weight: 600;
      color: #16213e;
      border-bottom: 1px solid #ddd;
      padding-bottom: 5px;
      margin-top: 25px;
    }
    
    h3 {
      font-size: 14px;
      font-weight: 600;
      color: #1a1a2e;
      margin-top: 18px;
    }
    
    table {
      border-collapse: collapse;
      width: 100%;
      font-size: 12px;
      margin: 10px 0;
    }
    
    th {
      background-color: #0f3460;
      color: white;
      padding: 8px 10px;
      text-align: left;
      font-weight: 600;
    }
    
    td {
      border: 1px solid #ddd;
      padding: 6px 10px;
    }
    
    tr:nth-child(even) {
      background-color: #f8f9fa;
    }
    
    code {
      background: #f0f0f0;
      padding: 2px 5px;
      border-radius: 3px;
      font-size: 12px;
    }
    
    pre {
      background: #1a1a2e;
      color: #e0e0e0;
      padding: 15px;
      border-radius: 6px;
      font-size: 11px;
      overflow-x: auto;
      page-break-inside: avoid;
    }
    
    pre code {
      background: none;
      color: inherit;
      padding: 0;
    }
    
    blockquote {
      border-left: 4px solid #0f3460;
      margin: 10px 0;
      padding: 8px 15px;
      background: #f0f4ff;
      font-style: normal;
      border-radius: 0 6px 6px 0;
    }
    
    hr {
      border: none;
      border-top: 1px solid #eee;
      margin: 20px 0;
    }
    
    .mermaid {
      text-align: center;
      margin: 15px 0;
      page-break-inside: avoid;
    }
    
    svg {
      max-width: 100% !important;
      height: auto !important;
    }
  `,
  body_class: [],
  pdf_options: {
    format: 'A4',
    margin: {
      top: '20mm',
      bottom: '20mm',
      left: '18mm',
      right: '18mm'
    },
    printBackground: true,
    displayHeaderFooter: true,
    headerTemplate: '<div style="font-size:9px; color:#999; width:100%; text-align:center; padding:5px 0;">BỘ TÀI LIỆU BA — LUXROOM E-COMMERCE (v3.0)</div>',
    footerTemplate: '<div style="font-size:9px; color:#999; width:100%; text-align:center; padding:5px 0;">Trang <span class="pageNumber"></span> / <span class="totalPages"></span></div>'
  },
  launch_options: {
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  },
  script: [
    { url: 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js' }
  ],
  markdown_options: {
    html: true
  }
};
