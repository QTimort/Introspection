const fs = require('fs');
const path = require('path');

// Block dataset source
const sourceDir = '../public/assets/processed-blocks';
// Bundle HTML Template file location
const htmlBundlePath = '../bundled-html-build/index.html';

// HTMLs Output directory
const destDir = '../htmls/';

if (!fs.existsSync(destDir)){
  fs.mkdirSync(destDir, { recursive: true });
}

const htmlData = fs.readFileSync(htmlBundlePath, 'utf8');

fs.readdir(sourceDir, (err, files) => {
  if (err) {
    handleError(`An error occurred reading the directory: ${err}`);
  }

  for (let index = 0; index < files.length; index++) {
    const file = files[index];
    if (path.extname(file).toLowerCase() === '.json') {
      const filePath = path.join(sourceDir, file);
      try {
        const data = fs.readFileSync(filePath, "utf-8");
        try {
          const newFilePath = path.join(destDir, file);
          const newData = replaceBlockData(htmlData, data);
          try {
            fs.writeFileSync(newFilePath.replace('.json', '.html'), newData);
          } catch (writeError) {
            handleError(`An error occurred writing the file ${newFilePath}: ${err}`);
          }
        } catch (parseError) {
          handleError(`An error occurred parsing the file ${file}: ${parseError}`);
        }
      } catch (err) {
        handleError(`An error occurred reading the file ${file}: ${err}`);
      }
    }
    console.log((index + 1) + '\t / ' + files.length);
  }
});

function replaceBlockData(htmlData, blockData) {
  const pattern = /const DEMO_BLOCK_TEMPLATE = [^;]+;/;
  const replacement = `const DEMO_BLOCK_TEMPLATE = ${blockData};`;

  return htmlData.replace(pattern, replacement);
}

function handleError(errorMsg) {
  console.error(errorMsg);
  process.exit(1);
}
