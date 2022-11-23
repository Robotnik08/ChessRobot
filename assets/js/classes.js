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
    constructor (FEN = '') {
        //position
        this.square = [];
        this.whiteToMove = true;

        this.castleQ = true;
        this.castleq = true;
        this.castleK = true;
        this.castlek = true;

        this.enPas = null;
        
        this.drawTimer = 0;

        //validmoves
        this.moves = [];

        //func
        this.selectedTile = null;
        this.setMove = (move) => {
            let capture = this.square[move.target] > 0;
            this.square[move.target] = this.square[move.start];
            this.square[move.start] = 0;
            if (move.start == 0 || move.target == 0 ) {
                this.castleQ = false;
            } else if (move.start == 7 || move.target == 7) {
                this.castleK = false;
            } else if (move.start == 55 || move.target == 55) {
                this.castleq = false;
            } else if (move.start == 63 || move.target == 63) {
                this.castlek = false;
            } else if (move.start == 4) {
                this.castleK = false;
                this.castleQ = false;
            } else if (move.start == 60) {
                this.castlek = false;
                this.castleq = false;
            }
            
            if (move.constructor.name == 'MoveSpecial') {
                if (move.castle != 0) {
                    if (move.castle > 0) {
                        this.square[move.target - 1] = this.square[move.target + 1];
                        this.square[move.target + 1] = 0;
                    }
                    if (move.castle < 0) {
                        this.square[move.target + 1] = this.square[move.target - 2];
                        this.square[move.target - 2] = 0;
                    }
                } else if (move.enPas) {
                    if (this.whiteToMove) {
                        this.square[move.target -8] = 0;
                    } else {
                        this.square[move.target +8] = 0;
                    }
                    capture = true;
                }
            }
            if (move.constructor.name == 'PawnLeap') {
                if (this.whiteToMove) {
                    this.enPas = move.target - 8;
                } else {
                    this.enPas = move.target + 8;
                }
            } else {
                this.enPas = null;
            }
            this.selectedTile = null;
            this.whiteToMove = !this.whiteToMove;
            checkLegal(this);
            return capture;
        }
        setupBoard(FEN, this);
        checkLegal(this);
    }
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
    board1.square[0] = pieceID.white | pieceID.rook;
    board1.square[1] = pieceID.white | pieceID.knight;
    board1.square[2] = pieceID.white | pieceID.bishop;
    board1.square[3] = pieceID.white | pieceID.queen;
    board1.square[4] = pieceID.white | pieceID.king;
    board1.square[5] = pieceID.white | pieceID.bishop;
    board1.square[6] = pieceID.white | pieceID.knight;
    board1.square[7] = pieceID.white | pieceID.rook;
    for (let i = 8; i < 16; i++) {
        board1.square[i] = pieceID.white | pieceID.pawn;
    }
    for (let i = 48; i < 56; i++) {
        board1.square[i] = pieceID.black | pieceID.pawn;
    }
    board1.square[56] = pieceID.black | pieceID.rook;
    board1.square[57] = pieceID.black | pieceID.knight;
    board1.square[58] = pieceID.black | pieceID.bishop;
    board1.square[59] = pieceID.black | pieceID.queen;
    board1.square[60] = pieceID.black | pieceID.king;
    board1.square[61] = pieceID.black | pieceID.bishop;
    board1.square[62] = pieceID.black | pieceID.knight;
    board1.square[63] = pieceID.black | pieceID.rook;
    return board1;
}