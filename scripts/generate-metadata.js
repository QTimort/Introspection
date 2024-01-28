const fs = require('fs');
const path = require('path');

const outputDir = '../metadata/';

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Function to read the input JSON file and process its content
function processInputFile(inputFile) {
  fs.readFile(inputFile, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading the input file:', err);
      return;
    }

    try {
      const obj = JSON.parse(data);

      // Iterate over each key in the object
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          const filePath = path.join(outputDir, `${key}.json`);
          const content = JSON.stringify(obj[key], null, 4);

          // Write to a file named as the key
          fs.writeFileSync(filePath, content);
        }
      }
    } catch (parseError) {
      console.error('Error parsing the input JSON:', parseError);
    }
  });
}

// Replace 'path/to/input.json' with the actual path of your input JSON file
processInputFile('../metadata.json');
