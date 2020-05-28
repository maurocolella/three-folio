 
//app.js
const express = require('express');
const http = require('http');
const path = require('path');
const compression = require('compression');

let app = express();

app.use(express.static(path.join(__dirname, 'build')));
app.use(compression());

const port = process.env.PORT || '8080';
app.set('port', port);
const server = http.createServer(app);
server.listen(port, () => console.log(`Running on localhost:${port}`));
