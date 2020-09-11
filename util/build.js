const fs = require('fs-extra');
const childProcess = require('child_process');

try {
    fs.removeSync('./dist/');
    childProcess.exec('tsc --build tsconfig.prod.json');
    fs.copySync('./src/public', './dist/public')
    fs.copySync('./src/views', './dist/views')
} catch (err) {
    console.log(err);
}
