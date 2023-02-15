const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const port = 80;
const { Server } = require("socket.io");
var fs = require('fs');
let io = null;
app.use(express.static('public'));
server.listen(port, () => {
    console.log(`listening on *:${port}`);
});
io = new Server(server);
var dir = './serverFiles';
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}


//after this is important
let JSONwinData = {games: []};
if (!fs.existsSync(dir + "/chessStats.json")) {
    let file = fs.createWriteStream(dir + "/chessStats.json");
    file.write(JSON.stringify(JSONwinData));
    file.end();
} else {
    JSONwinData = JSON.parse(fs.readFileSync(dir + "/chessStats.json", 'utf-8'));
}
io.on('connection', (socket) => {
    socket.emit("getStateTest");
    socket.on("getStateTest", () => {
        socket.emit("getState", JSONwinData);
    });
    socket.on("sendState", (data) => {
        JSONwinData.games.push(data);
        let file = fs.createWriteStream(dir + "/chessStats.json");
        file.write(JSON.stringify(JSONwinData));
        file.end();
    });
})
