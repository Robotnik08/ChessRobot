const bb = new Image();
bb.src = './assets/img/bb.png';
const bk = new Image();
bk.src = './assets/img/bk.png';
const bq = new Image();
bq.src = './assets/img/bq.png';
const bn = new Image();
bn.src = './assets/img/bn.png';
const bp = new Image();
bp.src = './assets/img/bp.png';
const br = new Image();
br.src = './assets/img/br.png';
const wb = new Image();
wb.src = './assets/img/wb.png';
const wk = new Image();
wk.src = './assets/img/wk.png';
const wn = new Image();
wn.src = './assets/img/wn.png';
const wp = new Image();
wp.src = './assets/img/wp.png';
const wq = new Image();
wq.src = './assets/img/wq.png';
const wr = new Image();
wr.src = './assets/img/wr.png';
const sprites = [null, null, null, null, null, null, null, null, null, bk, bq, br, bb, bn, bp, null, null, wk, wq, wr, wb, wn, wp];

const movesound = new Audio();
movesound.src = './assets/audio/move.wav';
const capturesound = new Audio();
capturesound.src = './assets/audio/capture.mp3';
const castlesound = new Audio();
castlesound.src = './assets/audio/capture.mp3';

const lightSquare = '#ffe6cc';
const darkSquare = '#804200';
let lastMoveStart = null;
let lastMoveEnd = null;


//draw
setupCheckerBoard();
function setupCheckerBoard () {
    can.offscreenCanvas.getContext('2d').fillStyle = '#000000';
    can.offscreenCanvas.getContext('2d').fillRect(0,0,can.width, can.height);
    for (let x = 0; x < 8; x++) {
        for (let y = 0; y < 8; y++) {
            if ((x + y) % 2 == 0) {
                can.offscreenCanvas.getContext('2d').fillStyle = lightSquare;
            } else {
                can.offscreenCanvas.getContext('2d').fillStyle = darkSquare;
            }
            can.offscreenCanvas.getContext('2d').fillRect((x * can.width/8) | 0, (y * can.height/8) | 0, (can.width/8) | 0, (can.height/8) | 0);
        }
    }
}

update ();
function update () {
    ctx.clearRect(0,0,can.width,can.height);
    ctx.drawImage(can.offscreenCanvas, 0, 0);
    if (board.whiteToMove || (!board.whiteToMove && !board.isHuman.black)) {
        if (lastMoveStart != null) {
            ctx.fillStyle = 'rgba(120, 120, 255, 0.6)';
            ctx.fillRect(((lastMoveStart/8-((lastMoveStart/8)|0))*8)*(can.width/8|0),(7-((lastMoveStart/8)|0))*(can.height/8|0),can.width/8|0,can.height/8|0);
        }
        if (lastMoveEnd != null) {
            ctx.fillStyle = 'rgba(90, 90, 255, 0.6)';
            ctx.fillRect(((lastMoveEnd/8-((lastMoveEnd/8)|0))*8)*(can.width/8|0),(7-((lastMoveEnd/8)|0))*(can.height/8|0),can.width/8|0,can.height/8|0);
        }
        for (let i = 0; i < 64; i++) {
            if (sprites[board.square[i]] != null && i != board.selectedTile) {
                ctx.drawImage(sprites[board.square[i]],((i/8-((i/8)|0))*8)*(can.width/8|0),(7-((i/8)|0))*(can.height/8|0),can.width/8|0,can.height/8|0);
            }
            ctx.fillStyle = 'rgba(255, 0, 0, 0.6)';
            let validmovesmap = getMap (board.selectedTile, board);
            if (validmovesmap[i] &&((board.whiteToMove && board.isHuman.white) || (!board.whiteToMove && board.isHuman.black))) {
                ctx.fillRect(((i/8-((i/8)|0))*8)*(can.width/8|0),(7-((i/8)|0))*(can.height/8|0),can.width/8|0,can.height/8|0);
            }
        }
        if (sprites[board.square[board.selectedTile]] != null) {
            ctx.fillStyle = 'rgba(255, 222, 0, 0.6)';
            ctx.fillRect(((board.selectedTile/8-((board.selectedTile/8)|0))*8)*(can.width/8|0),(7-((board.selectedTile/8)|0))*(can.height/8|0),can.width/8|0,can.height/8|0);
            ctx.drawImage(sprites[board.square[board.selectedTile]],(mouse.x-(can.width/8)/2)|0,(mouse.y-(can.height/8)/2)|0,(can.width/8)|0,(can.height/8)|0);
        }
        
    } else {
        for (let i = 0; i < 64; i++) {
            if (sprites[board.square[i]] != null && i != board.selectedTile) {
                ctx.drawImage(sprites[board.square[i]],can.width - ((i/8-((i/8)|0))*8 + 1)*(can.width/8|0),can.height - (7-((i/8)|0) + 1)*(can.height/8|0),can.width/8|0,can.height/8|0);
            }
            ctx.fillStyle = 'rgba(255, 0, 0, 0.6)';
            let validmovesmap = getMap (board.selectedTile, board);
            if (validmovesmap[i] &&((board.whiteToMove && board.isHuman.white) || (!board.whiteToMove && board.isHuman.black))) {
                ctx.fillRect(can.width - ((i/8-((i/8)|0))*8 + 1)*(can.width/8|0),can.height - (7-((i/8)|0) + 1)*(can.height/8|0),can.width/8|0,can.height/8|0);
            }
        }
        if (sprites[board.square[board.selectedTile]] != null) {
            ctx.fillStyle = 'rgba(255, 222, 0, 0.6)';
            ctx.fillRect(can.width - ((board.selectedTile/8-((board.selectedTile/8)|0))*8 + 1)*(can.width/8|0),can.height - (7-((board.selectedTile/8)|0) + 1)*(can.height/8|0),can.width/8|0,can.height/8|0);
            ctx.drawImage(sprites[board.square[board.selectedTile]],(mouse.x-(can.width/8)/2)|0,(mouse.y-(can.height/8)/2)|0,(can.width/8)|0,(can.height/8)|0);
        }
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


