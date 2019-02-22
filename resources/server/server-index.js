// * --------------------------- * \\
//   - BACK-END SETUP | NODEJS -
// * --------------------------- * \\

// - Setting up Express & Path - \\
const path = require('path');
const express = require('express');

const app = express(),
            DIST_DIR = __dirname,
            HTML__FILE = path.join(DIST_DIR, 'index.html');

// All static files (CSS,JS..)
app.use(express.static(DIST_DIR));

// - Home Page -
app.get('/', (req, res) => {
    //res.sendFile(path.resolve('dist/index.html'));
    res.sendFile(HTML__FILE);
});

app.get('*', (req, res) => {
    res.send('404 Not Found');
});

// - Port Setup - \\
const port = 3000;
// - localHost / Route setup - \\
app.listen(port, () => console.log(`App Running on port - ${port}`));