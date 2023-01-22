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

        this.directions = [8, -8, -1, 1, 7, -7, 9, -9];
        this.kingDir = [8, 9, 1, -7, -8, -9, -1, 7];
        this.knightDir = [15, 17, 10, -6, -15, -17, -10, 6];
        this.valuesWhite = [0, null, null, null, null, null, null, null, null, 0, -1000, -525, -350, -350, -100, null, null, 0, 1000, 525, 350, 350, 100];
        this.FENletters = [null, null, null, null, null, null, null, null, null, 'k', 'q', 'r', 'b', 'n', 'p', null, null, 'K', 'Q', 'R', 'B', 'N', 'P'];

        this.valuesPosition = [null, null, null, null, null, null, null, null, null, 
            [
                //Black King
                0.5, 0.5, 0.5, 0  , 0  , 0.5, 0.5, 0.5, //line 1
                0.5, 0.5, 0.5, 0  , 0  , 0.5, 0.5, 0.5, //line 2
                1  , 0.5, 0.5, 0  , 0  , 0.5, 0.5, 1  , //line 3
                1  , 0.5, 0.5, 0  , 0  , 0.5, 0.5, 1  , //line 4
                2  , 1  , 1  , 0.5, 0.5, 1  , 1  , 2  , //line 5
                3  , 2  , 2  , 2  , 2  , 2  , 2  , 3  , //line 6
                5  , 5  , 3  , 3  , 3  , 3  , 5  , 5  , //line 7
                7  , 11 , 4  , 3.5, 3.5, 4  , 11 , 7    //line 8
            ], [
                //Black Queen
                0.5, 3  , 3  , 5  , 5  , 3  , 3  , 0.5, //line 1
                3  , 6  , 6  , 6  , 6  , 6  , 6  , 3  , //line 2
                3  , 6  , 7  , 7  , 7  , 7  , 6  , 3  , //line 3
                5  , 6  , 7  , 7  , 7  , 7  , 6  , 5  , //line 4
                6  , 6  , 7  , 7  , 7  , 7  , 5.5, 5  , //line 5
                3  , 7  , 7  , 7  , 7  , 7  , 5.5, 3  , //line 6
                3  , 5.5, 7  , 7  , 7  , 5.5, 5.5, 3  , //line 7
                0.5, 3  , 3  , 3.5, 3.5, 3  , 3  , 0.5  //line 8
            ], [
                //Black Rook
                4  , 4  , 4  , 4  , 4  , 4  , 4  , 4  , //line 1
                5.5, 9  , 9  , 9  , 9  , 9  , 9  , 5.5, //line 2
                0.5, 3  , 3  , 3  , 3  , 3  , 3  , 0.5, //line 3
                0.5, 3  , 3  , 3  , 3  , 3  , 3  , 0.5, //line 4
                0.5, 3  , 3  , 3  , 3  , 3  , 3  , 0.5, //line 5
                0.5, 3  , 3  , 3  , 3  , 3  , 3  , 0.5, //line 6
                0.5, 3  , 3  , 3  , 3  , 3  , 3  , 0.5, //line 7
                3  , 3.5, 4  , 6.5, 6.5, 4  , 3.5, 3    //line 8
            ], [
                //Black Bishop
                0.5, 2  , 2  , 2  , 2  , 2  , 2  , 0.5, //line 1
                2  , 4  , 4  , 4  , 4  , 4  , 4  , 2  , //line 2
                2  , 4  , 5  , 6  , 6  , 5  , 4  , 2  , //line 3
                2  , 5  , 5  , 6  , 6  , 5  , 5  , 2  , //line 4
                2  , 4  , 8  , 6  , 6  , 8  , 4  , 2  , //line 5
                2  , 6  , 6  , 6  , 6  , 6  , 6  , 2  , //line 6
                2  , 6  , 4  , 4  , 4  , 4  , 6  , 2  , //line 7
                0.5, 2  , 2  , 2  , 2  , 2  , 2  , 0.5  //line 8
            ], [
                //Black Knight
                0.5, 0  , 2  , 2  , 2  , 2  , 0  , 0.5, //line 1
                1  , 4  , 6  , 6  , 6  , 6  , 4  , 1  , //line 2
                3  , 6  , 6  , 7  , 7  , 6  , 6  , 3  , //line 3
                3  , 6  , 7  , 12 , 12 , 7  , 6  , 3  , //line 4
                3  , 6  , 7  , 8.5, 8.5, 7  , 6  , 3  , //line 5
                3  , 6  , 6  , 7  , 7  , 6  , 6  , 3  , //line 6
                1  , 4  , 6  , 6  , 6  , 6  , 4  , 1  , //line 7
                0.5, 1  , 2  , 2  , 2  , 2  , 1  , 0.5  //line 8
            ], [
                //Black Pawn
                1  , 1  , 1  , 1  , 1  , 1  , 1  , 1  , //line 1
                10 , 10 , 10 , 10 , 10 , 10 , 10 , 10 , //line 2
                3  , 3  , 5  , 6  , 6  , 5  , 3  , 3  , //line 3
                3  , 3  , 6  , 9  , 9  , 6  , 3  , 3  , //line 4
                2.5, 2.5, 2.5, 15 , 15 , 2.5, 2.5, 2.5, //line 5
                3  , 1.5, 5  , 3  , 3  , 5  , 1.5, 3  , //line 6
                3  , 4  , 4  , 0  , 0  , 4  , 4  , 3  , //line 7
                0  , 0  , 0  , 0  , 0  , 0  , 0  , 0    //line 8
            ], null, null,
            [
                //White King
                7  , 11 , 4  , 3.5, 3.5, 4  , 11 , 7  , //line 8
                5  , 5  , 3  , 3  , 3  , 3  , 5  , 5  , //line 7
                3  , 2  , 2  , 2  , 2  , 2  , 2  , 3  , //line 6
                2  , 1  , 1  , 0.5, 0.5, 1  , 1  , 2  , //line 5
                1  , 0.5, 0.5, 0  , 0  , 0.5, 0.5, 1  , //line 4
                1  , 0.5, 0.5, 0  , 0  , 0.5, 0.5, 1  , //line 3
                0.5, 0.5, 0.5, 0  , 0  , 0.5, 0.5, 0.5, //line 2
                0.5, 0.5, 0.5, 0  , 0  , 0.5, 0.5, 0.5  //line 1
            ], [
                //White Queen
                0.5, 3  , 3  , 3.5, 3.5, 3  , 3  , 0.5, //line 8
                3  , 5.5, 7  , 7  , 7  , 5.5, 5.5, 3  , //line 7
                3  , 7  , 7  , 7  , 7  , 7  , 5.5, 3  , //line 6
                6  , 6  , 7  , 7  , 7  , 7  , 5.5, 5  , //line 5
                5  , 6  , 7  , 7  , 7  , 7  , 6  , 5  , //line 4
                3  , 6  , 7  , 7  , 7  , 7  , 6  , 3  , //line 3
                3  , 6  , 6  , 6  , 6  , 6  , 6  , 3  , //line 2
                0.5, 3  , 3  , 5  , 5  , 3  , 3  , 0.5  //line 1
            ], [
                //White Rook
                3  , 3.5, 4  , 6.5, 6.5, 4  , 3.5, 3  , //line 8
                0.5, 3  , 3  , 3  , 3  , 3  , 3  , 0.5, //line 7
                0.5, 3  , 3  , 3  , 3  , 3  , 3  , 0.5, //line 6
                0.5, 3  , 3  , 3  , 3  , 3  , 3  , 0.5, //line 5
                0.5, 3  , 3  , 3  , 3  , 3  , 3  , 0.5, //line 4
                0.5, 3  , 3  , 3  , 3  , 3  , 3  , 0.5, //line 3
                5.5, 9  , 9  , 9  , 9  , 9  , 9  , 5.5, //line 2
                4  , 4  , 4  , 4  , 4  , 4  , 4  , 4    //line 1
            ], [
                //White Bishop
                0.5, 2  , 2  , 2  , 2  , 2  , 2  , 0.5, //line 8
                2  , 6  , 4  , 4  , 4  , 4  , 6  , 2  , //line 7
                2  , 6  , 6  , 6  , 6  , 6  , 6  , 2  , //line 6
                2  , 4  , 8  , 6  , 6  , 8  , 4  , 2  , //line 5
                2  , 5  , 5  , 6  , 6  , 5  , 5  , 2  , //line 4
                2  , 4  , 5  , 6  , 6  , 5  , 4  , 2  , //line 3
                2  , 4  , 4  , 4  , 4  , 4  , 4  , 2  , //line 2
                0.5, 2  , 2  , 2  , 2  , 2  , 2  , 0.5  //line 1
            ], [
                //White Knight
                0.5, 1  , 2  , 2  , 2  , 2  , 1  , 0.5, //line 8
                1  , 4  , 6  , 6  , 6  , 6  , 4  , 1  , //line 7
                3  , 6  , 6  , 7  , 7  , 6  , 6  , 3  , //line 6
                3  , 6  , 7  , 8.5, 8.5, 7  , 6  , 3  , //line 5
                3  , 6  , 7  , 12 , 12 , 7  , 6  , 3  , //line 4
                3  , 6  , 6  , 7  , 7  , 6  , 6  , 3  , //line 3
                1  , 4  , 6  , 6  , 6  , 6  , 4  , 1  , //line 2
                0.5, 0  , 2  , 2  , 2  , 2  , 0  , 0.5  //line 1
            ], [
                //White Pawn
                0  , 0  , 0  , 0  , 0  , 0  , 0  , 0  , //line 8
                3  , 4  , 4  , 0  , 0  , 4  , 4  , 3  , //line 7
                3  , 1.5, 1  , 3  , 3  , 1  , 1.5, 3  , //line 6
                2.5, 2.5, 2.5, 14 , 14 , 2.5, 2.5, 2.5, //line 5
                3  , 3  , 3.5, 6  , 6  , 3.5, 3  , 3  , //line 4
                3  , 3  , 4  , 6  , 6  , 4  , 3  , 3  , //line 3
                10 , 10 , 10 , 10 , 10 , 10 , 10 , 10 , //line 2
                1  , 1  , 1  , 1  , 1  , 1  , 1  , 1    //line 1
            ]
        ]
    }
}
class Board {
    constructor (FEN, w, b) {
        //position
        this.square = [];
        this.whiteToMove = true;
        this.isHuman = {white: w, black:b};
        //hash
        //this.hashHistory = [];
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
        checkLegal(this);
        if ((!this.isHuman.white && this.whiteToMove) || (!this.isHuman.black && !this.whiteToMove)) {
            botMove(this);
        }
    }
}
function setMove (board1, move) {
    board1.moveHistory.push(move);
    board1.gameLength++;
    board1.targets.push(board1.square[move.target]);
    let capture = board1.square[move.target] > 0;
    let starttype = board1.square[move.start];
    board1.lastCapture = board1.square[move.target];
    board1.square[move.target] = board1.square[move.start];
    board1.square[move.start] = 0;
    if (!move.start || !move.target) {
        if (!board1.castleQ) board1.castleQ = board1.gameLength;
    } else if (!(move.start ^ 7) || !(move.target ^ 7)) {
        if (!board1.castleK) board1.castleK = board1.gameLength;
    } else if (!(move.start ^ 55) || !(move.target ^ 55)) {
        if (!board1.castleq) board1.castleq = board1.gameLength;
    } else if (!(move.start ^ 63) || !(move.target ^ 63)) {
        if (!board1.castlek) board1.castlek = board1.gameLength;
    } else if (!(move.start ^ 4)) {
        if (!board1.castleK) board1.castleK = board1.gameLength;
        if (!board1.castleQ) board1.castleQ = board1.gameLength;
    } else if (!(move.start ^ 60)) {
        if (!board1.castlek) board1.castlek = board1.gameLength;
        if (!board1.castleq) board1.castleq = board1.gameLength;
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
        board1.enPas = -999;
    }
    board1.enPasLog.push(board1.enPas);
    board1.selectedTile = null;
    if (capture || starttype == (piece.white | piece.pawn) || starttype == (piece.black | piece.pawn)) {
        board1.fiftyMoveTimer = 0;
    } else {
        board1.fiftyMoveTimer++;
    } 
    board1.fiftyMoveTimerLog.push(board1.fiftyMoveTimer);
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
        this.leap = true;
    }
}
// const table = initZobrist();
// function initZobrist () {
//     const table = {board:[[]], blackToMove:""};
//     for (let i = 0; i < 64; i++) {
//         for (let j = 0; j < 12; j++) {
//             table[i][j] = random_bitstring();
//         }
//     }
//     table.blackToMove = random_bitstring();
//     table.blackToMove = random_bitstring();
//     return table;
// }
// function hashZobrist (board1) {
//     let hash = 0;
//     for (let i = 0; i < 64; i++) {
//         if (board1[i] > 0) {
//             hash ^= parseInt(table[i][board1[i]]);
//         }
//     }
//     return hash;
// }
// function random_bitstring () {
//     let b = "0b";
//     for (let k = 0; k < 30; k++) {
//         b += Math.Round(Math.random());
//     }
//     return b;
// }
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
            board1.castlek = 0;
        } else 
        if (cas[i] == 'q') {
            board1.castleq = 0;
        } else 
        if (cas[i] == 'K') {
            board1.castleK = 0;
        } else 
        if (cas[i] == 'Q') {
            board1.castleQ = 0;
        }
    }
    board1.enPas = FEN.split(" ")[3] == "-" ? null : (parseInt(FEN.split(" ")[3][1])-1)*8 + (parseInt(FEN.split(" ")[3][0]) - 10);
    board1.fiftyMoveTimer = parseInt(FEN.split(" ")[4]);
    board1.abortTimer = parseInt(FEN.split(" ")[5]);

    return board1;
}
function generateFEN (board1) {
    let FEN = "";
    for (let i = 0; i < 8; i++) {
        let empty = 0;
        for (let j = 0; j < 8; j++) {
            const t = board1.square[(7-i)*8+j];
            if (!t) {
                empty++;
                if (!(j ^ 7)) {
                    FEN += empty.toString();
                }
            }
            else {
                if (empty) {
                    FEN += empty.toString();
                    empty = 0;
                }
                FEN += piece.FENletters[t];
            }
        }
        if (i ^ 7) FEN += "/";
    }
    FEN += ` ${board1.whiteToMove ? 'w' : 'b'} `;
    if (board1.castleK && board1.castleQ && board1.castlek && board1.castleq) {
        FEN += '- ';
    } else {
        if (!board1.castleK) {
            FEN += 'K';
        }
        if (!board1.castleQ) {
            FEN += 'Q';
        }
        if (!board1.castlek) {
            FEN += 'k';
        }
        if (!board1.castleq) {
            FEN += 'q';
        }
        FEN += ' ';
    }
    FEN += board1.enPas == null ? '- ' : `${((board1.enPas - (board1.enPas/8|0)*8)+10).toString(26)}${((board1.enPas/8|0)+1).toString()} `;
    FEN += `${board1.fiftyMoveTimer.toString()} `;
    FEN += `${board1.abortTimer.toString()}`;
    return FEN;
}