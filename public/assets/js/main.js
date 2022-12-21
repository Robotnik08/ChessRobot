const can = document.getElementById('main');
const ctx = can.getContext('2d');
can.offscreenCanvas = document.createElement('canvas');
can.offscreenCanvas.width = can.width;
can.offscreenCanvas.height = can.height;
const numToEdge = preComputedSlidingData();
const preKnight = preComputedKnightData();
const preKing = preComputedKingData();
const piece = new Piece();
const board = new Board('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1', true, false);
const mouse = {x:0,y:0};
// rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1






//returnlegal
function checkLegal (board1) {
    board1.moves = [];
    for (let start = 0; start < 64; start++) {
        let t = board1.square[start];
        if (pieceIsColour(t, board1.whiteToMove)) {
            if (isSliding(t)) {
                genSliding(board1, start, t);
            }
            if (t == (piece.white | piece.pawn) || t == (piece.black | piece.pawn)) {
                genPawn(board1, start, t);
            }
            if (t == (piece.white | piece.knight) || t == (piece.black | piece.knight)) {
                genKnight(board1, start);
            }
            if (t == (piece.white | piece.king) || t == (piece.black | piece.king)) {
                genKing(board1, start);
            }
        }
    }
    if (board1.whiteToMove) {
        if (board1.castleQ && board1.square[1] == 0 && board1.square[2] == 0 && board1.square[3] == 0 && !checkIfAttacked(board1, 4) && !checkIfAttacked(board1, 3) && !checkIfAttacked(board1, 2)) {
            board1.moves.push(new MoveSpecial(4, 2, -1, false));
        }
        if (board1.castleK && board1.square[5] == 0 && board1.square[6] == 0 && !checkIfAttacked(board1, 4) && !checkIfAttacked(board1, 5) && !checkIfAttacked(board1, 6)) {
            board1.moves.push(new MoveSpecial(4, 6, 1, false));
        }
    } else {
        if (board1.castleq && board1.square[57] == 0 && board1.square[58] == 0 && board1.square[59] == 0 && !checkIfAttacked(board1, 60) && !checkIfAttacked(board1, 59) && !checkIfAttacked(board1, 58)) {
            board1.moves.push(new MoveSpecial(60, 58, -1, false));
        }
        if (board1.castlek && board1.square[61] == 0 && board1.square[62] == 0 && !checkIfAttacked(board1, 60) && !checkIfAttacked(board1, 61) && !checkIfAttacked(board1, 62)) {
            board1.moves.push(new MoveSpecial(60, 62, 1, false));
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
            board1.moves.push(new MoveSpecial(i, i + offset, false, false, piece.bishop));
            board1.moves.push(new MoveSpecial(i, i + offset, false, false, piece.knight));
            board1.moves.push(new MoveSpecial(i, i + offset, false, false, piece.rook));
            board1.moves.push(new MoveSpecial(i, i + offset, false, false, piece.queen));
        } else {
            board1.moves.push(new Move(i, i + offset));
        }
    }
    if (allowDouble && board1.square[i + offset * 2] == piece.none && board1.square[i + offset] == piece.none) {
        board1.moves.push(new PawnLeap(i, i + offset * 2));
    }
    if (pieceIsColour(board1.square[i + offset + 1], !board1.whiteToMove) && toSide < 1) {
        if (i + 1 + offset * 2 > 63 || i + 1 + offset * 2 < 0) {
            board1.moves.push(new MoveSpecial(i, i + 1 + offset, false, false, piece.bishop));
            board1.moves.push(new MoveSpecial(i, i + 1 + offset, false, false, piece.knight));
            board1.moves.push(new MoveSpecial(i, i + 1 + offset, false, false, piece.rook));
            board1.moves.push(new MoveSpecial(i, i + 1 + offset, false, false, piece.queen));
        } else {
            board1.moves.push(new Move(i, i + 1 + offset));
        }
    }
    if (pieceIsColour(board1.square[i + offset - 1], !board1.whiteToMove) && toSide > -1) {
        if (i - 1 + offset * 2 > 63 || i - 1 + offset * 2 < 0) {
            board1.moves.push(new MoveSpecial(i, i - 1 + offset, false, false, piece.bishop));
            board1.moves.push(new MoveSpecial(i, i - 1 + offset, false, false, piece.knight));
            board1.moves.push(new MoveSpecial(i, i - 1 + offset, false, false, piece.rook));
            board1.moves.push(new MoveSpecial(i, i - 1 + offset, false, false, piece.queen));
        } else {
            board1.moves.push(new Move(i, i - 1 + offset));
        }
    }
    //enpassantCheck
    if (board1.enPas == i + offset + 1) {
        board1.moves.push(new MoveSpecial(i, i + offset + 1, 0, true));
    } else if (board1.enPas == i + offset - 1) {
        board1.moves.push(new MoveSpecial(i, i + offset - 1, 0, true));
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
        if (board1.moves[i].start == s && board.moves[i].target == t) {
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
function getKingDex (board1) {
    for (let i = 0; i < 64; i++) {
        if (!(board1.square[i] ^ ((board1.whiteToMove ? piece.white : piece.black) | piece.king))) {
            return i;
        }
    }
    console.log('not founds?')
    return 0;
}
function checkGameState (board1) {
    return !board1.moves.length ? checkIfAttacked(board1, getKingDex(board1)) ? "CheckMate" : "Stalemate" : board1.fiftyMoveTimer > 50 ? "Fifty" : "Play";
}
function Evaluate (board1, depth) {
    console.time('eval');
    const settings = structuredClone(board1.isHuman);
    board1.isHuman = {white: false, black: false};
    setMove(board1, AlphaBeta(board1, depth, -Infinity, +Infinity, board.whiteToMove, true));
    board1.isHuman = settings;
    console.timeEnd('eval');
}
function AlphaBeta (board1, depth, alpha, beta, m, r) {
    if (!(depth - 1)) return evaluatePosition(board1);
    let score = Infinity;
    if (r) var winDex = 0;
    const order = orderMoves(board1);
    if (m) {
        score = -Infinity;
        for (let i = board1.moves.length - 1; i >= 0; i--) {
            const n = structuredClone(board1);
            setMove(n, board1.moves[order.indexOf(Math.min(...order))]);
            if (r) var j = order.indexOf(Math.min(...order));
            order[order.indexOf(Math.min(...order))] = Infinity;
            // setMove(n, board1.moves[i]);
            score = Math.max(score, AlphaBeta(n, depth - 1, alpha, beta, !m, false));
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
        const n = structuredClone(board1);
        setMove(n, board1.moves[order.indexOf(Math.max(...order))]);
        if (r) var j = order.indexOf(Math.max(...order));
        order[order.indexOf(Math.max(...order))] = -Infinity;
        // setMove(n, board1.moves[i]);
        score = Math.min(score, AlphaBeta(n, depth - 1, alpha, beta, !m, false));
        if (r) if (Math.min(beta, score) < beta) winDex = j;
        beta = Math.min(beta, score);
        if (score <= alpha) {
            break;
        }
    }
    if (r) return board1.moves[winDex];
    return score;
}
function evaluatePosition (board1) {
    return evalMaterials(board1);
}
function evalMaterials (board1) {
    const state = checkGameState(board1);
    if (state == "CheckMate") {
        return board1.whiteToMove ? Infinity : -Infinity;
    }
    if (state == "StaleMate" || state == "Fifty") {
        return 0;
    }
    let val = 0;
    for (let i = 0; i < 64; i++) {
        val += piece.valuesWhite[board1.square[i]];
    }
    return val;
}
function logArray (s) {
    str = "[";
    for (let i in s) {
        str += `${s[i]}, `;
    }
    console.log(`${str.slice(0,-2)}]`);
}