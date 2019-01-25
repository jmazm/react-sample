const path = require('path');

const ROOT = process.cwd();
const ENTRY = path.resolve(ROOT, 'src');
const OUTPUT = path.resolve(ROOT, 'dist');


module.exports = {
    title: 'react-sample',
    p: {
        ROOT,
        ENTRY,
        OUTPUT
    },
    devServer: {
        port: 8080,
        host: '127.0.0.1'
    }
}