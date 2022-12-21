const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const port = 80;
app.use(express.static('public'));
server.listen(port, () => {
    console.log(`listening on *:${port}`);
});