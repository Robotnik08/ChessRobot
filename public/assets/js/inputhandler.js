
//inputhandler
let sel = false;
function getMouse (ev) {
    mouse.x = ev.x-document.getElementById("main").offsetLeft - 25;
    mouse.y = ev.y-document.getElementById("main").offsetTop - 25;
}

function clickdown () {
    if (sel) {
        if (((mouse.x/(can.width/8))|0) + 8*(8 - (mouse.y/(can.height/8))|0) != board.selectedTile) {
            clickup();
        }
        else {
            sel = false;
            return;

        }
    }
    if (mouse.x <= 0 || mouse.y <= 0) {return;}
    if ((board.whiteToMove || (!board.whiteToMove && !board.isHuman.black)) && board.isHuman.white) {
        board.selectedTile = ((mouse.x/(can.width/8))|0) + 8*(8 - (mouse.y/(can.height/8))|0);
    } else {
        board.selectedTile = (((can.width - mouse.x)/(can.width/8))|0) + 8*(8 - ((can.height - mouse.y)/(can.height/8))|0);
    }
}

function clickup () {
    if (mouse.x <= 0 || mouse.y <= 0) {return;}
    let mouseposextract = {
        x: ((board.whiteToMove || (!board.whiteToMove && !board.isHuman.black)) && board.isHuman.white) ? mouse.x : can.width - mouse.x,
        y: ((board.whiteToMove || (!board.whiteToMove && !board.isHuman.black)) && board.isHuman.white) ? mouse.y : can.height - mouse.y
    }
    if (((mouseposextract.x/(can.width/8))|0) + 8*(8 - (mouseposextract.y/(can.height/8))|0) == board.selectedTile) {sel =true; return;}
    sel = false;
    if (board.square[board.selectedTile] == piece.none) {return;}

    if ((board.whiteToMove && board.isHuman.white) || (!board.whiteToMove && board.isHuman.black)) {
        let move = checkValid(board.selectedTile, ((mouseposextract.x/(can.width/8))|0) + 8*(8 - (mouseposextract.y/(can.height/8))|0), board);
        moveWithSound(move, board);
    } else {
        board.selectedTile = null;
    }
}
function botMove(board1) {
    const w = new Worker('assets/js/calBestMove.js');
    w.postMessage(board1);
    w.onmessage = (e) => {
        moveWithSound(parseObjToClass(e.data), board1);
        w.terminate();
        return true;
    };
}
function moveWithSound (move, board1) {
    if (move == false) {
        board1.selectedTile = null;
        return false;
    }
    const capture = setMove(board1, move);
    if (capture) {
        capturesound.currentTime = 0;
        capturesound.play();
    } else {
        movesound.currentTime = 0;
        movesound.play();
    }
    lastMoveStart = move.start;
    lastMoveEnd = move.target;
    const state = checkGameState(board1);
    if (state != "Play") {
        io.emit('sendState', {board: generateFEN(board1), timeStamp: Date.now(), result: state});
        if (state == "CheckMate") {
            document.getElementById("gameState").innerHTML = `CheckMate! ${(board1.whiteToMove ? "Black" : "White")} wins!!`;
            return;
        }
        else if (state == "Stalemate") {
            document.getElementById("gameState").innerHTML = 'Draw by stalemate!';
        }
        else if (state == "Fifty") {
            document.getElementById("gameState").innerHTML = 'Draw by fifty move rule!';
        }
    }
    if ((!board1.isHuman.white && board1.whiteToMove) || (!board1.isHuman.black && !board1.whiteToMove)) {
        botMove(board1);
    }
    return true;
}
function parseObjToClass (m) {
    return m.promote != null ? new MoveSpecial (m.start, m.target, m.castle, m.enPas, m.promote) : m.leap ? new PawnLeap (m.start, m.target) : new Move (m.start, m.target);
}