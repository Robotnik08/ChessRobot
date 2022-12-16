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
class Board {
    constructor (FEN, w, b) {
        //position
        this.square = [];
        this.whiteToMove = true;
        this.isHuman = {white: w, black:b};

        this.castleQ = false;
        this.castleq = false;
        this.castleK = false;
        this.castlek = false;

        this.enPas = null;
        
        this.fiftyMoveTimer = 0;
        this.abortTimer = 0;

        //validmoves
        this.moves = [];

        //func
        this.selectedTile = null;
        setupBoard(FEN, this);
        checkLegal(this);
    }
}
function setMove (board1, move) {
    let capture = board.square[move.target] > 0;
    let starttype = board.square[move.start];
    board1.square[move.target] = board1.square[move.start];
    board1.square[move.start] = 0;
    if (move.start == 0 || move.target == 0 ) {
        board1.castleQ = false;
    } else if (move.start == 7 || move.target == 7) {
        board1.castleK = false;
    } else if (move.start == 55 || move.target == 55) {
        board1.castleq = false;
    } else if (move.start == 63 || move.target == 63) {
        board1.castlek = false;
    } else if (move.start == 4) {
        board1.castleK = false;
        board1.castleQ = false;
    } else if (move.start == 60) {
        board1.castlek = false;
        board1.castleq = false;
    }
    
    if (move.constructor.name == 'MoveSpecial') {
        if (move.castle != 0) {
            if (move.castle > 0) {
                board1.square[move.target - 1] = board1.square[move.target + 1];
                board1.square[move.target + 1] = 0;
            }
            if (move.castle < 0) {
                board1.square[move.target + 1] = board1.square[move.target - 2];
                board1.square[move.target - 2] = 0;
            }
        } else if (move.enPas) {
            if (board1.whiteToMove) {
                board1.square[move.target -8] = 0;
            } else {
                board1.square[move.target +8] = 0;
            }
            capture = true;
        } else if (move.promote) {
            if ((board1.isHuman.white && board1.whiteToMove) || (board1.isHuman.black && !board1.whiteToMove)) {
                let type = prompt('Enter your Piece (Q,R,B,K) defaults to queen');
                console.log(type);
                if (type == '' || type == null) {
                    if (board1.whiteToMove) {
                        board1.square[move.target] = piece.white | piece.queen;
                    } else {
                        board1.square[move.target] = piece.black | piece.queen;
                    }
                } else if (type[0].toLowerCase() == 'r') {
                    if (board1.whiteToMove) {
                        board1.square[move.target] = piece.white | piece.rook;
                    } else {
                        board1.square[move.target] = piece.black | piece.rook;
                    }
                } else if (type[0].toLowerCase() == 'b') {
                    if (board1.whiteToMove) {
                        board1.square[move.target] = piece.white | piece.bishop;
                    } else {
                        board1.square[move.target] = piece.black | piece.bishop;
                    }
                } else if (type[0].toLowerCase() == 'k') {
                    if (board1.whiteToMove) {
                        board1.square[move.target] = piece.white | piece.knight;
                    } else {
                        board1.square[move.target] = piece.black | piece.knight;
                    }
                } else {
                    if (board1.whiteToMove) {
                        board1.square[move.target] = piece.white | piece.queen;
                    } else {
                        board1.square[move.target] = piece.black | piece.queen;
                    }
                }
            } else {
                if (board1.whiteToMove) {
                    board1.square[move.target] = piece.white | move.promote;
                } else {
                    board1.square[move.target] = piece.black | move.promote;
                }
            }
            
        }
    }
    if (move.constructor.name == 'PawnLeap') {
        if (board1.whiteToMove) {
            board1.enPas = move.target - 8;
        } else {
            board1.enPas = move.target + 8;
        }
    } else {
        board1.enPas = null;
    }
    board1.selectedTile = null;
    if (capture || starttype == (piece.white | piece.pawn) || starttype == (piece.black | piece.pawn)) {
        board1.fiftyMoveTimer = 0;
    } else {
        board1.fiftyMoveTimer++;
    } 
    if (!board1.whiteToMove) board1.abortTimer++;
    board1.whiteToMove = !board1.whiteToMove;
    checkLegal(board1);
    return capture;
}
class Move {
    constructor (s, t) {
        this.start = s;
        this.target = t;
    }
}
class MoveSpecial {
    constructor (s, t, c, e, p) {
        this.start = s;
        this.target = t;

        this.castle = c;
        this.enPas = e;
        this.promote = p;
    }
}

class PawnLeap {    
    constructor (s, t) {
        this.start = s;
        this.target = t;
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
    const cas = FEN.split(" ")[2];
    for (let i in cas) {
        if (cas[i] == 'k') {
            board1.castlek = true;
        } else 
        if (cas[i] == 'q') {
            board1.castleq = true;
        } else 
        if (cas[i] == 'K') {
            board1.castleK = true;
        } else 
        if (cas[i] == 'Q') {
            board1.castleQ = true;
        }
    }
    board1.enPas = FEN.split(" ")[3] == "-" ? null : FEN.split(" ")[3][1];
    board1.fiftyMoveTimer = parseInt(FEN.split(" ")[4]);
    board1.abortTimer = parseInt(FEN.split(" ")[5]);

    return board1;
}