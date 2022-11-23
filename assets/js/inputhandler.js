//inputhandler
function getMouse (ev) {
    mouse.x = ev.x-document.getElementById("main").offsetLeft - 25;
    mouse.y = ev.y-document.getElementById("main").offsetTop - 25;
}

function clickdown () {
    if (mouse.x <= 0 || mouse.y <= 0) {return;}
    board.selectedTile = ((mouse.x/(can.width/8))|0) + 8*(8 - (mouse.y/(can.height/8))|0);
}

function clickup () {
    if (mouse.x <= 0 || mouse.y <= 0) {return;}

    if (((mouse.x/(can.width/8))|0) + 8*(8 - (mouse.y/(can.height/8))|0) == board.selectedTile) {board.selectedTile = null; return;}
    
    if (board.square[board.selectedTile] == piece.none) {return;}

    let move = checkValid(board.selectedTile, ((mouse.x/(can.width/8))|0) + 8*(8 - (mouse.y/(can.height/8))|0), board);
    if (move.promote) {
        
    }
    if (moveWithSound(move, board)) {

    }
}
function moveWithSound (move, board) {
    if (move == false) {
        board.selectedTile = null;
        return false;
    }
    let capture = board.setMove(move);
    if (capture) {
        capturesound.currentTime = 0;
        capturesound.play();
    } else {
        movesound.currentTime = 0;
        movesound.play();
    }
    return true;
}