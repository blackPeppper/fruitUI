const fs = require('fs');
const sass = require('sass');

const sassCompiler = (sasscssPath, sasssrcPath) => {
  const result = sass.compile(sasssrcPath);
  fs.writeFile(sasscssPath, result.css, (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });
};

module.exports = sassCompiler;