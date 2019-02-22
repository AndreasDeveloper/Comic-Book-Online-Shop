// * --------------------------- * \\
//   - BACK-END SETUP | NODEJS -
// * --------------------------- * \\

// - Setting up Express & Path - \\
const path = require('path');
const express = require('express');
const app = express();

// All static files (CSS,JS..)
app.use(express.static(`${__dirname}/../../dist`));


// * ------------- * \\
// - Routes | Pages - \\
// * ------------- * \\

// - Home Page - \\
app.get('/', (req, res) => {
    res.writeHead(200, { 'Content-type': 'text/html' });
    res.sendFile(path.resolve(`${__dirname}/../../dist/index.html`));
});

// - User Profile - \\
app.get('/user-profile', (req, res) => {
    res.writeHead(200, { 'Content-type': 'text/html' });
    res.send('User Profile');
});

// - 404 - Page not Found Page - \\
app.get('*', (req, res) => {
    res.status(404).send('404 - Page Not Found');
});

// - localHost / Route setup - \\
const port = 3000;
app.listen(port, () => console.log(`App Running on port - ${port}`));