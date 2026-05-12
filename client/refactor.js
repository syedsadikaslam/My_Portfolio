const fs = require('fs');
const path = require('path');

const directory = path.join(__dirname, 'src');

function walk(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    const dirPath = path.join(dir, f);
    const isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walk(dirPath, callback) : callback(path.join(dir, f));
  });
}

walk(directory, function(filePath) {
  if (filePath.endsWith('.js') || filePath.endsWith('.jsx')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    // Replace `fill` or `fill=""` inside <img />
    if (content.match(/<img[^>]*\bfill\b/)) {
      content = content.replace(/(<img[^>]*?)\bfill\b\s*/g, (match, p1) => {
        return p1;
      });
      changed = true;
    }
    
    // Some imgs might lack absolute/w-full/h-full now, but let's see if we can just inject it
    // Or just trust Tailwind classes like 'object-cover' or 'object-contain' already there and we just need w-full h-full
    if (content.match(/<img[^>]*class(?:Name)?=["'][^"']*?object-cover/)) {
        content = content.replace(/(<img[^>]*class(?:Name)?=["'][^"']*?)object-cover([^"']*?["'])/g, "$1absolute inset-0 w-full h-full object-cover$2");
        changed = true;
    }

    if (content.match(/<img[^>]*class(?:Name)?=["'][^"']*?object-contain/)) {
        content = content.replace(/(<img[^>]*class(?:Name)?=["'][^"']*?)object-contain([^"']*?["'])/g, "$1absolute inset-0 w-full h-full object-contain$2");
        changed = true;
    }

    // Since we appended absolute inset-0 w-full h-full, we might have added them multiple times if they existed
    // But it's fine for Tailwind. Let's make sure it's clean.

    if (changed) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('Updated fill in', filePath);
    }
  }
});
