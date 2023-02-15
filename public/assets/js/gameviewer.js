class Board {
    constructor (FEN, w, b) {
        //position
        this.square = [];
        this.whiteToMove = true;
        this.isHuman = {white: w, black:b};
        //hash
        this.moveHistory = [];
        this.gameLength = 0;
        this.targets = [];

        this.castleQ = -100;
        this.castleq = -100;
        this.castleK = -100;
        this.castlek = -100;

        this.enPas = null;
        this.enPasLog = [];

        
        this.fiftyMoveTimer = 0;
        this.abortTimer = 0;
        this.fiftyMoveTimerLog = [];
        //validmoves
        this.moves = [];

        //func
        this.selectedTile = null;
        setupBoard(FEN, this);
    }
}
class Piece {
    constructor () {
        this.none = 0;
        this.king = 1;
        this.queen = 2;
        this.rook = 3;
        this.bishop = 4;
        this.knight = 5;
        this.pawn = 6;
    
        this.black = 8;
        this.white = 16;
    }
}
function setupBoard (FEN, board1) {
    let pieceID = new Piece();
    for (let i = 0; i < 64; i++) {
        board1.square[i] = pieceID.none;
    }
    const FENPOS = FEN.split(" ")[0].split("/");
    for (let i = 0; i < 8; i++) {
        let IPos = 0;
        for (let j in FENPOS[i]) {
            if (FENPOS[i][j] > 0) {
                IPos += parseInt(FENPOS[i][j]);
                continue;
            }
            let type = piece.white;
            if (FENPOS[i][j] == FENPOS[i][j].toLowerCase()) {
                type = piece.black;
            }
            const pos = ((7-i)*8 + IPos);
            switch (FENPOS[i][j].toLowerCase()) {
                case 'p':
                    board1.square[pos] = type | piece.pawn;
                    break;
                case 'n':
                    board1.square[pos] = type | piece.knight;
                    break;
                case 'b':
                    board1.square[pos] = type | piece.bishop;
                    break;
                case 'r':
                    board1.square[pos] = type | piece.rook;
                    break;
                case 'q':
                    board1.square[pos] = type | piece.queen;
                    break;
                case 'k':
                    board1.square[pos] = type | piece.king;
                    break;
            }
            IPos++;
        }
    }
    board1.whiteToMove = FEN.split(" ")[1] == 'w';
    return board1;
}
const bb = new Image();
bb.src = '../assets/img/bb.png';
const bk = new Image();
bk.src = '../assets/img/bk.png';
const bq = new Image();
bq.src = '../assets/img/bq.png';
const bn = new Image();
bn.src = '../assets/img/bn.png';
const bp = new Image();
bp.src = '../assets/img/bp.png';
const br = new Image();
br.src = '../assets/img/br.png';
const wb = new Image();
wb.src = '../assets/img/wb.png';
const wk = new Image();
wk.src = '../assets/img/wk.png';
const wn = new Image();
wn.src = '../assets/img/wn.png';
const wp = new Image();
wp.src = '../assets/img/wp.png';
const wq = new Image();
wq.src = '../assets/img/wq.png';
const wr = new Image();
wr.src = '../assets/img/wr.png';
const sprites = [null, null, null, null, null, null, null, null, null, bk, bq, br, bb, bn, bp, null, null, wk, wq, wr, wb, wn, wp];
const can = document.getElementById('main');
const ctx = can.getContext('2d');
can.offscreenCanvas = document.createElement('canvas');
can.offscreenCanvas.width = can.width;
can.offscreenCanvas.height = can.height;

let games;
let index = 0;
const piece = new Piece();
let board = new Board("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");
const lightSquare = '#ffe6cc';
const darkSquare = '#804200';
let windowAmplifiedSize = 0.9;
const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
]
const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
]
changeSize (0);
function changeSize (i) {
    if (windowAmplifiedSize + i < 0.3 || windowAmplifiedSize + i > 1.7) return;
    windowAmplifiedSize += i;
    can.width = 720 * windowAmplifiedSize;
    can.height = 720 * windowAmplifiedSize;
    can.offscreenCanvas.width = can.width;
    can.offscreenCanvas.height = can.height;
    setupCheckerBoard();
}
function changeGame (i) {
    if (index+i >= games.length || index+i < 0) return;
    index += i;
    board = new Board(games[index].board);
    const stamp = new Date(games[index].timeStamp);
    document.getElementById("gameState").innerHTML = `${games[index].result} on ${days[stamp.getDay()]} the ${stamp.getDate()}th of ${months[stamp.getMonth()]} ${stamp.getFullYear()} at ${stamp.getHours()}:${stamp.getMinutes() < 10 ? "0" + stamp.getMinutes() : stamp.getMinutes()}.<br>The game was finished by ${!board.whiteToMove ? games[index].robot ? "Slome" : "the human" : !games[index].robot ? "Slome" : "the human"} as ${!board.whiteToMove ? "white" : "black"}.`;
}
//draw
setupCheckerBoard();
function setupCheckerBoard () {
    can.offscreenCanvas.getContext('2d').fillStyle = '#000000';
    can.offscreenCanvas.getContext('2d').fillRect(0,0,can.width, can.height);
    for (let x = 0; x < 8; x++) {
        for (let y = 0; y < 8; y++) {
            if (!((x + y) % 2)) {
                can.offscreenCanvas.getContext('2d').fillStyle = lightSquare;
            } else {
                can.offscreenCanvas.getContext('2d').fillStyle = darkSquare;
            }
            can.offscreenCanvas.getContext('2d').fillRect((x * can.width/8) | 0, (y * can.height/8) | 0, (can.width/8) | 0, (can.height/8) | 0);
        }
    }
}
update();
function update () {
    document.getElementById("gid").innerHTML = `${index}`;
    ctx.clearRect(0,0,can.width,can.height);
    ctx.drawImage(can.offscreenCanvas, 0, 0);
    for (let i = 0; i < 64; i++) {
        if (sprites[board.square[i]] != null) {
            ctx.drawImage(sprites[board.square[i]],((i/8-((i/8)|0))*8)*(can.width/8|0),(7-((i/8)|0))*(can.height/8|0),can.width/8|0,can.height/8|0);
        }
    }
    for (let i = 0; i < 8; i++) {
        ctx.fillStyle = '#000000FF';
        ctx.font = can.width/8/4 +"px Arial";
        ctx.fillText((i+10).toString(36).toUpperCase(),i*(can.width/8|0),can.height);
        ctx.fillText(8-i,0,i*(can.height/8|0) +can.height/30);
    }
    requestAnimationFrame(update);
}

function getMap (i, board1) {
    let resp = [];
    for (let k = 0; k < 64; k++) {
        resp[k] = false;
        for (let j = 0; j < board1.moves.length; j++) {
            if (board1.moves[j].start == i && board1.moves[j].target == k) {
                resp[k] = true;
                break;
            }
        }
    }
    return resp;
}
io.on("getStateTest", () => {
    io.emit("getStateTest");
});
io.on("getState", (data) => {
    games = data.games;
    changeGame(0);
});