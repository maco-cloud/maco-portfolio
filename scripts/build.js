const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const root = path.join(__dirname, '..');
const dist = path.join(root, 'dist');

function rmDir(dir) {
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

execSync('npm run build:css', { cwd: root, stdio: 'inherit' });

rmDir(dist);
fs.mkdirSync(dist, { recursive: true });

copyDir(path.join(root, 'assets'), path.join(dist, 'assets'));
copyDir(path.join(root, 'styles'), path.join(dist, 'styles'));
copyDir(path.join(root, 'js'), path.join(dist, 'js'));

const html = fs
  .readFileSync(path.join(root, 'pages', 'index.html'), 'utf8')
  .replace(/\.\.\//g, '');

fs.writeFileSync(path.join(dist, 'index.html'), html);

console.log('Build complete → dist/');
