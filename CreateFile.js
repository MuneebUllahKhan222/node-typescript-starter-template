const path = require('path');
const fs = require('fs');

if (!process.argv[2]) {
  console.error('Please provide a name for the files.');
  process.exit(1);
}

const createFile = (folder, extension) => {
  const pathName = __dirname +"/src/" + folder ;
  const filePath = path.join(pathName, `${process.argv[2]}.${extension}`);
  const fileContent = `// ${process.argv[2]}.${extension}\n\n`;
  fs.writeFileSync(filePath, fileContent);
  console.log(`Created ${process.argv[2]}.${extension} in ${folder} folder.`);
};

const createFiles = () => {
  createFile('controllers', 'controller.ts');
  createFile('models', 'model.ts');
  createFile('routes', 'routes.ts');
  createFile('validators', 'validator.ts');
  createFile('types', 'types.ts');
};

createFiles();