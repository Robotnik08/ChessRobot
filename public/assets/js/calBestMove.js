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

const numToEdge = preComputedSlidingData();
const preKnight = preComputedKnightData();
const preKing = preComputedKingData();
const piece = new Piece();
const endgameStrength = 0.5;
const depth = 6;
const immediateMateScore = 1000000;
onmessage = (e) => {
    e.data.moveHistory = [];
    Evaluate(e.data, depth);
};
function Evaluate (board1, depth) {
    board1.isHuman = {white: false, black: false};
    for (let i = board1.moves.length - 1; i >= 0; i--) {
        board1.moves[i] = parseObjToClass(board1.moves[i]);
    }
    postMessage(AlphaBeta(board1, 0, depth, -Infinity, +Infinity, board1.whiteToMove, true, board1.whiteToMove));
}
function AlphaBeta (board1, fromRoot, depth, alpha, beta, m, r, o) {
    if (!board1.moves.length) return getNoMovesResult(board1, fromRoot);
    if (!(depth - 1)) {
        return evaluatePosition(board1);
    } else {
        let score = Infinity;
        if (r) var winDex = 0;
        const order = orderMoves(board1);
        if (m) {
            score = -Infinity;
            for (let i = board1.moves.length - 1; i >= 0; i--) {
                const move2 = board1.moves[order.indexOf(Math.min(...order))];
                setMove(board1, move2);
                if (r) var j = order.indexOf(Math.min(...order));
                order[order.indexOf(Math.min(...order))] = Infinity;
                score = Math.max(score, AlphaBeta(board1, fromRoot + 1, depth - 1, alpha, beta, !m, false, o));
                undoMove(board1, move2);
                if (r) if (Math.max(alpha, score) > alpha) winDex = j;
                alpha = Math.max(alpha, score);
                if (score >= beta) {
                    break;
                }
            }
            if (r) return board1.moves[winDex];
            return score;
        }
        for (let i = board1.moves.length - 1; i >= 0; i--) {
            const move2 = board1.moves[order.indexOf(Math.max(...order))];
            setMove(board1, move2);
            if (r) var j = order.indexOf(Math.max(...order));
            order[order.indexOf(Math.max(...order))] = -Infinity;
            score = Math.min(score, AlphaBeta(board1, fromRoot + 1, depth - 1, alpha, beta, !m, false, o));
            undoMove(board1, move2);
            if (r) if (Math.min(beta, score) < beta) winDex = j;
            beta = Math.min(beta, score);
            if (score <= alpha) {
                break;
            }
        }
        if (r) return board1.moves[winDex];
        return score;
    }
}
function getNoMovesResult(board1, plyFromRoot) {
    if (checkGameState(board1) == "CheckMate") {
        return (immediateMateScore - plyFromRoot*100)*(board1.whiteToMove ? -1 : 1);
    }
    return 0;
}
function evaluatePosition (board1) {
    return evalMaterials(board1);
}

function evalMaterials (board1) {
    const state = checkGameState(board1);
    if (state == "CheckMate") {
        return board1.whiteToMove ? -Infinity : Infinity;
    }
    if (state == "StaleMate" || state == "Fifty") {
        return 0;
    }
    const endGameWeight = getWeight(board1.square);
    const endGameWeightSplit = getWeightSplit(board1.square);
    let val = 0;
    for (let i = 0; i < 64; i++) {
        val += piece.valuesWhite[board1.square[i]];
        if (board1.square[i]) {
            val += piece.valuesPosition[board1.square[i]][i] * endGameWeight * (pieceIsColour(board1.square[i], true) ? 1 : -1);
        }
    }
    val += Math.min(...numToEdge[getKingDex(board1, true)]) * 10 * (board1.whiteToMove ? (1 - endGameWeightSplit.black) * -1 :  1 - endGameWeightSplit.white);
    val += Math.min(...numToEdge[getKingDex(board1)]) * 8 * (board1.whiteToMove ? 1 - endGameWeightSplit.white :  (1 - endGameWeightSplit.black) * -1);
    return val;
}
function getWeight (b) {
    let val = 0;
    for (let i = b.length - 1; i >= 0; i--) {
        val += Math.abs(piece.valuesWhite[b[i]]);
    }
    return val / 8500;
}
function getWeightSplit (b) {
    let val = {white: 0, black: 0};
    for (let i = b.length - 1; i >= 0; i--) {
        if (piece.valuesWhite[b[i]]) {
            val.white += Math.abs(piece.valuesWhite[b[i]]);
        } else {
            val.black += Math.abs(piece.valuesWhite[b[i]]);
        }
    }
    return {white: val.white / 4750, black: val.white / 4750};
}

function checkGameState (board1) {
    const state = !board1.moves.length ? checkIfAttacked(board1, getKingDex(board1)) ? "CheckMate" : "Stalemate" : board1.fiftyMoveTimer > 50 ? "Fifty" : "Play";
    if (state == "Fifty") {
        board1.moves = [];
    }
    return state;
}
// function hashZobrist (board1) {
//     let hash = 0;
//     for (let i = 0; i < 64; i++) {
//         if (board1[i] > 0) {
//             hash ^= parseInt(table[i][board1[i]]);
//         }
//     }
//     return hash;
// }

function setMove (board1, move) {
    board1.gameLength++;
    board1.targets.push(board1.square[move.target]);
    let capture = board1.square[move.target] > 0;
    let starttype = board1.square[move.start];
    board1.square[move.target] = board1.square[move.start];
    board1.square[move.start] = 0;
    if (!move.start || !move.target) {
        board1.castleQ = board1.gameLength;
    } else if (!(move.start ^ 7) || !(move.target ^ 7)) {
        board1.castleK = board1.gameLength;
    } else if (!(move.start ^ 55) || !(move.target ^ 55)) {
        board1.castleq = board1.gameLength;
    } else if (!(move.start ^ 63) || !(move.target ^ 63)) {
        board1.castlek = board1.gameLength;
    } else if (!(move.start ^ 4)) {
        board1.castleK = board1.gameLength;
        board1.castleQ = board1.gameLength;
    } else if (!(move.start ^ 60)) {
        board1.castlek = board1.gameLength;
        board1.castleq = board1.gameLength;
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
        board1.enPas = -1;
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
function undoMove (board1, move) {
    board1.square[move.start] = board1.square[move.target];
    board1.square[move.target] = board1.targets.pop();
    board1.whiteToMove = !board1.whiteToMove;
    if (!(board1.gameLength ^ board1.castleQ)) {
        board1.castleQ = 0;
    }
    if (!(board1.gameLength ^ board1.castleq)) {
        board1.castleq = 0;
    }
    if (!(board1.gameLength ^ board1.castleK)) {
        board1.castleK = 0;
    }
    if (!(board1.gameLength ^ board1.castlek)) {
        board1.castlek = 0;
    }
    if (move.constructor.name == 'MoveSpecial') {
        if (move.castle != 0) {
            if (move.castle > 0) {
                board1.square[move.target + 1] = board1.square[move.target - 1];
                board1.square[move.target - 1] = 0;
            }
            if (move.castle < 0) {
                board1.square[move.target - 2] = board1.square[move.target + 1];
                board1.square[move.target + 1] = 0;
            }
        } else if (move.enPas) {
            if (board1.whiteToMove) {
                board1.square[move.target -8] = piece.black | piece.pawn;
            } else {
                board1.square[move.target +8] = piece.white | piece.pawn;
            }
        } else if (move.promote) {
            if (board1.whiteToMove) {
                board1.square[move.start] = piece.white | piece.pawn;
            } else {
                board1.square[move.start] = piece.black | piece.pawn;
            }
        }
    }
    board1.enPasLog.pop();
    board1.fiftyMoveTimerLog.pop();
    board1.enPas = board1.enPasLog[board1.enPasLog.length - 1];
    board1.selectedTile = null;
    board1.fiftyMoveTimer = board1.fiftyMoveTimerLog[board1.fiftyMoveTimerLog.length - 1];
    board1.gameLength--;
    checkLegal(board1);
}
function checkLegal (board1) {
    board1.moves = [];
    for (let start = 0; start < 64; start++) {
        let t = board1.square[start];
        if (pieceIsColour(t, board1.whiteToMove)) {
            if (isSliding(t)) {
                genSliding(board1, start, t);
            }
            if (!(t ^ (piece.white | piece.pawn)) || !(t ^ (piece.black | piece.pawn))) {
                genPawn(board1, start, t);
            }
            if (!(t ^ (piece.white | piece.knight)) || !(t ^ (piece.black | piece.knight))) {
                genKnight(board1, start);
            }
            if (!(t ^ (piece.white | piece.king)) || !(t ^ (piece.black | piece.king))) {
                genKing(board1, start);
            }
        }
    }
    if (board1.whiteToMove) {
        if (!board1.castleQ && !board1.square[1] && !board1.square[2] && !board1.square[3] && !checkIfAttacked(board1, 4) && !checkIfAttacked(board1, 3) && !checkIfAttacked(board1, 2)) {
            board1.moves.push(new MoveSpecial(4, 2, -1, false, 0));
        }
        if (!board1.castleK && !board1.square[5] && !board1.square[6] && !checkIfAttacked(board1, 4) && !checkIfAttacked(board1, 5) && !checkIfAttacked(board1, 6)) {
            board1.moves.push(new MoveSpecial(4, 6, 1, false, 0));
        }
    } else {
        if (!board1.castleq && !board1.square[57] && !board1.square[58] && !board1.square[59] && !checkIfAttacked(board1, 60) && !checkIfAttacked(board1, 59) && !checkIfAttacked(board1, 58)) {
            board1.moves.push(new MoveSpecial(60, 58, -1, false, 0));
        }
        if (!board1.castlek && !board1.square[61] && !board1.square[62] && !checkIfAttacked(board1, 60) && !checkIfAttacked(board1, 61) && !checkIfAttacked(board1, 62)) {
            board1.moves.push(new MoveSpecial(60, 62, 1, false, 0));
        }
    }
    filterLegal(board1);
}
function filterLegal (board1) {
    let col = piece.black;
    if (board1.whiteToMove) {
        col = piece.white;
    }
    for (let i = 0; i < 64; i++) {
        if (!(board1.square[i] ^ (col | piece.king))) {
            kingGenSlidingPin(board1, i);
            if (checkIfAttacked(board1, i)) {
                filterCheckLegal(board1, i);
            }
            break;
        }
    }
}
function orderMoves (board1) {
    let prio = [];
    for (let i = board1.moves.length - 1; i >= 0; i--) {
        prio[i] = piece.valuesWhite[board1.square[board1.moves[i].start]] + piece.valuesWhite[board1.square[board1.moves[i].target]];
    }
    return prio;
}
function kingGenSlidingPin (board1, i) {
    let col = piece.white;
    if (board1.whiteToMove) {
        col = piece.black;
    }
    for (let dirI = 0; dirI < 8; dirI++) {
        let hasFriend = false;
        let friendIndex = 0;
        let p = piece.rook;
        if (dirI > 3) {
            p = piece.bishop;
        }
        for (let n = 0; n < numToEdge[i][dirI]; n++) {
            let target = i + piece.directions[dirI] * (n + 1);
            let targetpiece = board1.square[target];
            if (hasFriend && (!(targetpiece ^ (col | p)) || !(targetpiece ^ (col | piece.queen)))) {
                for (let k = board1.moves.length - 1; k > -1; k--) {
                    if (!(board1.moves[k].start ^ friendIndex)) {
                        if (!Number.isInteger((friendIndex - board1.moves[k].target)/piece.directions[dirI])) {
                            board1.moves.splice(k,1);
                        }
                        else if ((board1.moves[k].target/8|0) ^ (friendIndex/8|0) && !((i/8|0) ^ (friendIndex/8|0))) {
                            board1.moves.splice(k,1);
                        }
                    }
                }
                break;
            }
            if (pieceIsColour(targetpiece, !board1.whiteToMove) || (hasFriend && pieceIsColour(targetpiece, board1.whiteToMove))) {
                break;
            }
            if (!hasFriend && pieceIsColour(targetpiece, board1.whiteToMove)) {
                friendIndex = target;
                hasFriend = true;
            }
        }
    }
}
function genSliding (board1, i, type) {
    let start = 0;
    let end = 8;
    if (type == (piece.white | piece.rook) || type == (piece.black | piece.rook)) {
        end = 4;
    } else if (type == (piece.white | piece.bishop) || type == (piece.black | piece.bishop)) {
        start = 4;
    }
    for (let dirI = start; dirI < end; dirI++) {
        for (let n = 0; n < numToEdge[i][dirI]; n++) {
            let target = i + piece.directions[dirI] * (n + 1);
            let targetpiece = board1.square[target];

            if (pieceIsColour(targetpiece, board1.whiteToMove)) {
                break;
            }

            board1.moves.push(new Move(i, target));

            if (pieceIsColour(targetpiece, !board1.whiteToMove)) {
                break;
            }
        }
    }
}
function genPawn (board1, i, type) {
    let offset = 8;
    let allowDouble = false;
    let toSide = 0;
    if (pieceIsColour(type, false)) {
        offset *= -1;
        if (i > 47) {
            allowDouble = true;
        }
    } else {
        if (i < 16) {
            allowDouble = true;
        }
    }
    if (!preKing[i][6]) {
        toSide -= 1;
    } else if (!preKing[i][2]) {
        toSide += 1;
    }
    if (board1.square[i + offset] == piece.none) {
        if (i + offset * 2 > 63 || i + offset * 2 < 0) {
            board1.moves.push(new MoveSpecial(i, i + offset, 0, false, piece.bishop));
            board1.moves.push(new MoveSpecial(i, i + offset, 0, false, piece.knight));
            board1.moves.push(new MoveSpecial(i, i + offset, 0, false, piece.rook));
            board1.moves.push(new MoveSpecial(i, i + offset, 0, false, piece.queen));
        } else {
            board1.moves.push(new Move(i, i + offset));
        }
    }
    if (allowDouble && board1.square[i + offset * 2] == piece.none && board1.square[i + offset] == piece.none) {
        board1.moves.push(new PawnLeap(i, i + offset * 2));
    }
    if (pieceIsColour(board1.square[i + offset + 1], !board1.whiteToMove) && toSide < 1) {
        if (i + 1 + offset * 2 > 63 || i + 1 + offset * 2 < 0) {
            board1.moves.push(new MoveSpecial(i, i + 1 + offset, 0, false, piece.bishop));
            board1.moves.push(new MoveSpecial(i, i + 1 + offset, 0, false, piece.knight));
            board1.moves.push(new MoveSpecial(i, i + 1 + offset, 0, false, piece.rook));
            board1.moves.push(new MoveSpecial(i, i + 1 + offset, 0, false, piece.queen));
        } else {
            board1.moves.push(new Move(i, i + 1 + offset));
        }
    }
    if (pieceIsColour(board1.square[i + offset - 1], !board1.whiteToMove) && toSide > -1) {
        if (i - 1 + offset * 2 > 63 || i - 1 + offset * 2 < 0) {
            board1.moves.push(new MoveSpecial(i, i - 1 + offset, 0, false, piece.bishop));
            board1.moves.push(new MoveSpecial(i, i - 1 + offset, 0, false, piece.knight));
            board1.moves.push(new MoveSpecial(i, i - 1 + offset, 0, false, piece.rook));
            board1.moves.push(new MoveSpecial(i, i - 1 + offset, 0, false, piece.queen));
        } else {
            board1.moves.push(new Move(i, i - 1 + offset));
        }
    }
    //enpassantCheck
    if (board1.enPas == i + offset + 1) {
        board1.moves.push(new MoveSpecial(i, i + offset + 1, 0, true, 0));
    } else if (board1.enPas == i + offset - 1) {
        board1.moves.push(new MoveSpecial(i, i + offset - 1, 0, true, 0));
    }
}
function genKnight (board1, i) {
    for (let j = 0; j < 8; j++) {
        if (preKnight[i][j] && !pieceIsColour(board1.square[i + piece.knightDir[j]], board1.whiteToMove)) {
            board1.moves.push(new Move(i, i + piece.knightDir[j]));
        }
    }
}
function genKing (board1, i) {
    for (let j = 0; j < 8; j++) {
        if (preKing[i][j] && !pieceIsColour(board1.square[i + piece.kingDir[j]], board1.whiteToMove) && !checkIfAttacked(board1, i + piece.kingDir[j])) {
            board1.moves.push(new Move(i, i + piece.kingDir[j]));
        }
    }
}
function checkIfAttacked (board1, i) {
    let col = piece.white;
    let colme = piece.black;
    if (board1.whiteToMove) {
        col = piece.black;
        colme = piece.white;
    }
    for (let dirI = 0; dirI < 8; dirI++) {
        let p = piece.rook;
        if (dirI > 3) {
            p = piece.bishop;
        }
        for (let n = 0; n < numToEdge[i][dirI]; n++) {
            let targetpiece = board1.square[i + piece.directions[dirI] * (n + 1)];
            if (targetpiece > 0) {
                if (!(targetpiece ^ (col | p)) || !(targetpiece ^ (col | piece.queen))) {
                    return true;
                }
                if (!(targetpiece ^ (colme | piece.king))) {
                    continue;

                }
                break;
            }
        }
        if ((preKnight[i][dirI] && !(board1.square[i+piece.knightDir[dirI]] ^ (col | piece.knight)))) {
            return true;
        }
        if ((preKing[i][dirI] && !(board1.square[i+piece.kingDir[dirI]] ^ (col | piece.king)))) {
            return true;
        }
    }
    if (board1.whiteToMove) {
        if ((preKing[i][1] && !(board1.square[i+piece.kingDir[1]] ^ (col | piece.pawn)))) {
            return true;
        }
        if ((preKing[i][7] && !(board1.square[i+piece.kingDir[7]] ^ (col | piece.pawn)))) {
            return true;
        }
    } else {
        if ((preKing[i][3] && !(board1.square[i+piece.kingDir[3]] ^ (col | piece.pawn)))) {
            return true;
        }
        if ((preKing[i][5] && !(board1.square[i+piece.kingDir[5]] ^ (col | piece.pawn)))) {
            return true;
        }
    }
    return false;
}
function filterCheckLegal (board1, i) {
    if (countAttacks(board1, i) > 1) {
        for (let j = board1.moves.length - 1; j > -1; j--) {
            if (board1.moves[j].start ^ i) {
                board1.moves.splice(j,1);
            }
        }
    }
    let col = piece.white;
    if (board1.whiteToMove) {
        col = piece.black;
    }
    let blockcheck = [];
    for (let dirI = 0; dirI < 8; dirI++) {
        if ((preKnight[i][dirI] && !(board1.square[i+piece.knightDir[dirI]] ^ (col | piece.knight)))) {
            for (let j = board1.moves.length - 1; j > -1; j--) {
                if (board1.moves[j].start ^ i && board1.moves[j].target ^ (i+piece.knightDir[dirI])) {
                    board1.moves.splice(j,1);
                }
            }
            return;
        }
        let p = piece.rook;
        if (dirI > 3) {
            p = piece.bishop;
        }
        for (let n = 0; n < numToEdge[i][dirI]; n++) {
            let targetpiece = board1.square[i + piece.directions[dirI] * (n + 1)];
            if (targetpiece > 0) {
                if (!(targetpiece ^ (col | p)) || !(targetpiece ^ (col | piece.queen))) {
                    blockcheck[i + piece.directions[dirI] * (n + 1)] = true;
                    for (let o = 0; o < n; o++) {
                        blockcheck[i + piece.directions[dirI] * (o + 1)] = true;
                    }
                }
                break;
            }
        }          
    }
    if (board1.whiteToMove) {
        if ((preKing[i][1] && !(board1.square[i+piece.kingDir[1]] ^ (col | piece.pawn)))) {
            blockcheck[i+piece.kingDir[1]] = true;
        }
        if ((preKing[i][7] && !(board1.square[i+piece.kingDir[7]] ^ (col | piece.pawn)))) {
            blockcheck[i+piece.kingDir[7]] = true;
        }
    } else {
        if ((preKing[i][3] && !(board1.square[i+piece.kingDir[3]] ^ (col | piece.pawn)))) {
            blockcheck[i+piece.kingDir[3]] = true;
        }
        if ((preKing[i][5] && !(board1.square[i+piece.kingDir[5]] ^ (col | piece.pawn)))) {
            blockcheck[i+piece.kingDir[5]] = true;
        }
    }
    for (let j = board1.moves.length - 1; j > -1; j--) {
        if (!blockcheck[board1.moves[j].target] && board1.moves[j].start ^ i) {
            board1.moves.splice(j,1);
        }
    }
}
function countAttacks(board1, i) {
    let col = piece.white;
    if (board1.whiteToMove) {
        col = piece.black;
    }
    let count = 0;
    for (let dirI = 0; dirI < 8; dirI++) {
        let p = piece.rook;
        if (dirI > 3) {
            p = piece.bishop;
        }
        for (let n = 0; n < numToEdge[i][dirI]; n++) {
            let targetpiece = board1.square[i + piece.directions[dirI] * (n + 1)];
            if (targetpiece > 0) {
                if (!(targetpiece ^ (col | p)) || !(targetpiece ^ (col | piece.queen))) {
                    count++;
                }
                break;
            }
        }
        if ((preKnight[i][dirI] && !(board1.square[i+piece.knightDir[dirI]] ^ (col | piece.knight)))) {
            count++;
        }
        if ((preKing[i][dirI] && !(board1.square[i+piece.kingDir[dirI]] ^ (col | piece.king)))) {
            count++;
        }
    }
    if (board1.whiteToMove) {
        if ((preKing[i][1] && !(board1.square[i+piece.kingDir[1]] ^ (col | piece.pawn)))) {
            count++;
        }
        if ((preKing[i][7] && !(board1.square[i+piece.kingDir[7]] ^ (col | piece.pawn)))) {
            count++;
        }
    } else {
        if ((preKing[i][3] && !(board1.square[i+piece.kingDir[3]] ^ (col | piece.pawn)))) {
            count++;
        }
        if ((preKing[i][5] && !(board1.square[i+piece.kingDir[5]] ^ (col | piece.pawn)))) {
            count++;
        }
    }
    return count;
}
function checkValid (s, t, board1) {
    for (let i = 0; i < board1.moves.length; i++) {
        if (board1.moves[i].start == s && board1.moves[i].target == t) {
            return board1.moves[i];
        }
    }
    return false;
}
function pieceIsColour (i, white) {
    if (white) {
        if (i < 16) {
            return false;
        }
        return true;
    }
    if (i > 16 || i < 1) {
        return false;
    }
    return true;
}
function isSliding (i) {
    return (i == (piece.white | piece.bishop) || i == (piece.white | piece.rook) || i == (piece.white | piece.queen) || i == (piece.black | piece.bishop) || i == (piece.black | piece.rook) || i == (piece.black | piece.queen));
}
function preComputedSlidingData () {
    let data = [];
    for (let file = 0; file < 8; file++) {
        for (let rank = 0; rank < 8; rank++) {

            let numNorth = 7 - rank;
            let numSouth = rank;
            let numWest = file;
            let numEast = 7 - file;

            let index = rank * 8 + file;
            data[index] = [
                numNorth,
                numSouth,
                numWest,
                numEast,
                Math.min(numNorth, numWest),
                Math.min(numSouth, numEast),
                Math.min(numNorth, numEast),
                Math.min(numSouth, numWest),
            ];
        }
    }
    return data;
}
function preComputedKnightData () {
    let valid = [];
    for (let i = 0; i < 64; i++) {
        valid[i] = [
            !(numToEdge[i][0] < 2 || numToEdge[i][2] < 1),
            !(numToEdge[i][0] < 2 || numToEdge[i][3] < 1),
            !(numToEdge[i][3] < 2 || numToEdge[i][0] < 1),
            !(numToEdge[i][3] < 2 || numToEdge[i][1] < 1),
            !(numToEdge[i][1] < 2 || numToEdge[i][3] < 1),
            !(numToEdge[i][1] < 2 || numToEdge[i][2] < 1),
            !(numToEdge[i][2] < 2 || numToEdge[i][1] < 1),
            !(numToEdge[i][2] < 2 || numToEdge[i][0] < 1)
        ];
    }
    return valid;
}
function preComputedKingData () {
    let valid = [];
    for (let i = 0; i < 64; i++) {
        valid[i] = [
            !(numToEdge[i][0] < 1),
            !(numToEdge[i][0] < 1 || numToEdge[i][3] < 1),
            !(numToEdge[i][3] < 1),
            !(numToEdge[i][3] < 1 || numToEdge[i][1] < 1),
            !(numToEdge[i][1] < 1),
            !(numToEdge[i][1] < 1 || numToEdge[i][2] < 1),
            !(numToEdge[i][2] < 1),
            !(numToEdge[i][2] < 1 || numToEdge[i][0] < 1)
        ];
    }
    return valid;
}
function getKingDex (board1, isOther = false) {
    for (let i = 0; i < 64; i++) {
        if (!(board1.square[i] ^ ((board1.whiteToMove ? isOther ? piece.black : piece.white : isOther ? piece.white : piece.black) | piece.king))) {
            return i;
        }
    }
    console.log('not founds?')
    return 0;
}
function parseObjToClass (m) {
    return m.promote != null ? new MoveSpecial (m.start, m.target, m.castle, m.enPas, m.promote) : m.leap ? new PawnLeap (m.start, m.target) : new Move (m.start, m.target);
}
