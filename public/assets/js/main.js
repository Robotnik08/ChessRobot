const numToEdge = preComputedSlidingData();
const preKnight = preComputedKnightData();
const preKing = preComputedKingData();
const piece = new Piece();
const player = Math.round(Math.random());
const board = new Board('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1', player, !player);
const mouse = {x:0,y:0};
// rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1  ## Starting POSITION ##
// 5k2/p6p/6r1/7K/1p6/1B6/P7/8 w - - 0 1  ## En passant check ##
// 8/k7/3p4/p2P1p2/P2P1P2/8/8/K7 w - -  ## Far searching endgame ##






//returnlegal
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
    const col = board1.whiteToMove ? piece.white : piece.black;
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
    const col = board1.whiteToMove ? piece.black : piece.white;
    for (let dirI = 0; dirI < 8; dirI++) {
        let hasFriend = false;
        let friendIndex = 0;
        let p = dirI > 3 ? piece.bishop : piece.rook;
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
    if (!(type ^ (piece.white | piece.rook)) || !(type ^ (piece.black | piece.rook))) {
        end = 4;
    } else if (!(type ^ (piece.white | piece.bishop)) || !(type ^ (piece.black | piece.bishop))) {
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
function getKingDex (board1, isOther = false) {
    for (let i = 0; i < 64; i++) {
        if (!(board1.square[i] ^ ((board1.whiteToMove ? isOther ? piece.black : piece.white : isOther ? piece.white : piece.black) | piece.king))) {
            return i;
        }
    }
    console.log('not founds?')
    return 0;
}
function checkGameState (board1) {
    const state = !board1.moves.length ? checkIfAttacked(board1, getKingDex(board1)) ? "CheckMate" : "Stalemate" : board1.fiftyMoveTimer > 50 ? "Fifty" : "Play";
    if (state == "Fifty") {
        board1.moves = [];
    }
    if (state == "Play") {
        if (!(board1.moveHistory.length-1)) {
            return state;
        }
        latestyou = board1.moveHistory[board1.moveHistory.length-1];
        latestopp = board1.moveHistory[board1.moveHistory.length-2];
        for (let i = 1; i < 3; i++) {
            if (board1.moveHistory.length-2-i*4 < 0) {
                return state;
            }
            if (!(!(latestyou.start ^ board1.moveHistory[board1.moveHistory.length-1-i*4].start) && !(latestyou.target ^ board1.moveHistory[board1.moveHistory.length-1-i*4].target))) {
                return state;
            }
            if (!(!(latestopp.start	^ board1.moveHistory[board1.moveHistory.length-2-i*4].start) && !(latestopp.target ^ board1.moveHistory[board1.moveHistory.length-2-i*4].target))) {
                return state;
            }
        }
        return "Rep";
    }
    return state;
}
function logArray (s) {
    str = "[";
    for (let i in s) {
        str += `${s[i]}, `;
    }
    console.log(`${str.slice(0,-2)}]`);
}
function checkifSimple (board1) {
    for (let i in board1) {
        switch (board1[i]) {
            case 0:
            case piece.white | piece.king:
            case piece.white | piece.knight:
            case piece.white | piece.pawn:
            case piece.black | piece.king:
            case piece.black | piece.knight:
            case piece.black | piece.pawn:
                break;
            default:
                return false;
        }
    }
    return true;
}