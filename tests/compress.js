const fs = require('fs-extra');
const path = require('path');
const archiver = require('archiver');

const orig = path.resolve(path.join(__dirname, "mooc_node-mod1_types_sentences.zip"));
const dest = path.resolve(path.join(__dirname ,"../mooc_node-mod1_types_sentences.zip"));
const output = fs.createWriteStream(orig);
const archive = archiver('zip', {
    zlib: { level: 9 } // Sets the compression level.
});
archive.pipe(output);
archive.glob('*', {"ignore": ['node_modules', 'tests', 'README.md', 'LICENSE']});
archive.finalize();
fs.moveSync(orig, dest, { overwrite: true });