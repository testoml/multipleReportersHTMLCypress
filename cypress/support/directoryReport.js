const fs = require('fs').promises;
const path = require('path');

const dir = 'cypress/reports';

async function createFolder(dir) {
    try {
        await fs.mkdir(dir);
    } catch (err) {
        console.error(err);
    }
}

async function removeFolder() {
    try {
        await fs.rm(dir, { recursive: true });
        console.log(`${dir} is deleted!`);
    } catch (err) {
        console.error(err);
    }
}

async function main() {
    try {
        await fs.access(dir);
        await removeFolder();
    } catch (err) {
        await createFolder(dir);
        await createFolder(path.join(dir, 'mochareports'));
    }

    
}

main();