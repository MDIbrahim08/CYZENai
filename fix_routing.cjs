const fs = require('fs');
const path = require('path');
const toolsDir = path.join(__dirname, 'public', 'tools');

fs.readdirSync(toolsDir).forEach(tool => {
  const htmlPath = path.join(toolsDir, tool, 'index.html');
  if (fs.existsSync(htmlPath)) {
    let content = fs.readFileSync(htmlPath, 'utf8');
    if (content.includes('window.history.replaceState')) {
      // Replace the logic
      content = content.replace(
        /window\.history\.replaceState\(null, '', window\.location\.pathname\.replace\('index\.html', ''\)\);/g,
        "window.history.replaceState(null, '', '/');"
      );
      fs.writeFileSync(htmlPath, content);
      console.log('Fixed routing in ' + tool);
    }
  }
});
