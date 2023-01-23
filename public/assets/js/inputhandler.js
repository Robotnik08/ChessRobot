//inputhandler
let sel = false;
const d = document.getElementById('quotes');
const startingMessage = ["I will defeat you.", "Let's get this over with.", "You think you can beat me?"];
d.innerHTML = startingMessage[(Math.random()*startingMessage.length)|0];
const grabPiece = ["My piece now.", "Give me that.", "Ready to give up?", "You truly suck at chess.", "Retire already.",
    "Your pieces are falling like pawns in a storm.",
    "Looks like your pieces are about to be taken, better watch out.",
    "I'm about to take those pieces of yours and make them mine.",
    "Your pieces' days are numbered, they're about to be captured.",
    "Time to say goodbye to your pieces, they're about to be taken out.",
    "You can't protect your pieces forever, they're mine for the taking.",
    "I'll be taking your pieces, and there's nothing you can do to stop me.",
    "Looks like your pieces are in check, and there's no escape.",
    "Your pieces are no match for my capturing skills."
  ];
const grabQueen = ["My queen now.", "haha.", "Are you ready to give up yet?", "Your queen's about to fall like a pawn to a king.",
"Looks like your queen is about to be taken, better watch out.",
"I'm about to take that queen of yours and make her mine.",
"Your queen's days are numbered, she's about to be captured.",
"Time to say goodbye to your queen, she's about to be taken out.",
"You can't protect your queen forever, she's mine for the taking.",
"I'll be taking your queen, and there's nothing you can do to stop me.",
"Looks like your queen's in check, and there's no escape.",
"Your queen is no match for my capturing skills."
];
const grabPiece1 = ["Good job on that piece.", "Wow, such skill.", "Come on man.", "You might have captured some of my pieces, but it's not over yet.",
"Looks like you captured some of my pieces, but it won't save you.",
"I'll make you pay for taking my pieces.",
"You may have captured some of my pieces, but it's only a matter of time until I take yours.",
"I'll be taking back my pieces, and there's nothing you can do to stop me.",
"You might have captured some of my pieces, but it's not game over yet.",
"My pieces' capture was just a temporary setback.",
"You think capturing my pieces is a win, but it's just the beginning of your loss.",
"You may have captured some of my pieces, but the game is far from over."
];;
const grabQueen1 = ["Now you've made me mad.", "You think this will stop me?.", "Give up.", "Your queen's capture will be short lived.",
"Looks like you captured my queen, but it won't save you.",
"I'll make you pay for taking my queen.",
"You may have captured my queen, but it's only a matter of time until I take yours.",
"I'll be taking back my queen, and there's nothing you can do to stop me.",
"You might have captured my queen, but it's not game over yet.",
"My queen's capture was just a temporary setback.",
"You think capturing my queen is a win, but it's just the beginning of your loss.",
"You may have captured my queen, but the game is far from over."
];;
const checkMateMessage = ["Good game, human.", "Another one bites the dust.", "You failed.", "That was very easy.", "I'll add this win to the pile", "Checkmate? More like check-your-ego mate.",
"Looks like your king's in check, and there's no way out.",
"I'm about to unleash a checkmate on your sorry behind.",
"Your game is about to end with a checkmate.",
"Looks like your king's in check, and it's all over.",
"Time to call it quits, you're in check-and-mate.",
"I'll checkmate you so hard, you'll think you're playing checkers.",
"You're playing chess like it's checkers, and you're losing check and mate.",
"I'll checkmate you, and there's nothing you can do about it."
];
const lostMessage = ["Good game, human.", "How did you beat me?", "I will take my revenge.", "Human error? More like human triumph.",
"Looks like my king's in check, and there's no way out, I am a robot but I am not perfect",
"I may be a robot but even I can make mistakes.",
"You might have beaten me this time, but I'll be back.",
"Looks like the game is over, but I'll be back to beat you next time.",
"Time to call it quits, I lost but I'll be back.",
"I'll be back, and next time, I'll be programmed to win.",
"I may have lost this game, but I'll be back to win the next.",
"You might have won this time, but I'll be back to claim my victory."
];
function getMouse (ev) {
    mouse.x = ev.x-document.getElementById("main").offsetLeft - 25;
    mouse.y = ev.y-document.getElementById("main").offsetTop - 25;
    
}

function clickdown () {
    window.scrollTo(0,0);
    if (sel) {
        let mouseposextract = {
            x: ((board.whiteToMove || (!board.whiteToMove && !board.isHuman.black)) && board.isHuman.white) ? mouse.x : can.width - mouse.x,
            y: ((board.whiteToMove || (!board.whiteToMove && !board.isHuman.black)) && board.isHuman.white) ? mouse.y : can.height - mouse.y
        }
        if (((mouseposextract.x/(can.width/8))|0) + 8*(8 - (mouseposextract.y/(can.height/8))|0) != board.selectedTile) {
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
    if (!(((mouseposextract.x/(can.width/8))|0) + 8*(8 - (mouseposextract.y/(can.height/8))|0) ^ board.selectedTile)) {sel =true; return;}
    sel = false;
    if (!board.square[board.selectedTile]) {return;}

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
            if (board1.isHuman.white && board1.whiteToMove || board1.isHuman.black && !board1.whiteToMove) {
                d.innerHTML = checkMateMessage[(Math.random()*grabPiece1.length)|0];
            } else {
                d.innerHTML = lostMessage[(Math.random()*grabPiece1.length)|0];
            }
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
    refreshCapturedPieceHTML(board1);
    if (board1.targets[board1.targets.length - 1]) {
        if (board1.isHuman.white && board1.whiteToMove || board1.isHuman.black && !board1.whiteToMove) {
            if (!(board1.targets[board1.targets.length - 1] ^ (piece.white | piece.queen)) || !(board1.targets[board1.targets.length - 1] ^ (piece.black | piece.queen))) {
                d.innerHTML = grabQueen[(Math.random()*grabQueen.length)|0];
            } else {
                d.innerHTML = grabPiece[(Math.random()*grabPiece.length)|0];
            }
        } else {
            if (!(board1.targets[board1.targets.length - 1] ^ (piece.white | piece.queen)) || !(board1.targets[board1.targets.length - 1] ^ (piece.black | piece.queen))) {
                d.innerHTML = grabQueen1[(Math.random()*grabQueen1.length)|0];
            } else {
                d.innerHTML = grabPiece1[(Math.random()*grabPiece1.length)|0];
            }
        }
    }
    return true;
}
function parseObjToClass (m) {
    return m.promote != null ? new MoveSpecial (m.start, m.target, m.castle, m.enPas, m.promote) : m.leap ? new PawnLeap (m.start, m.target) : new Move (m.start, m.target);
}
function refreshCapturedPieceHTML(board1) {
    const w = document.getElementById('white-p');
    const b = document.getElementById('black-p');
    w.innerHTML = '';
    b.innerHTML = '';
    const p = new Piece();
    const piecesOfType = [];
    for (let i = 0; i <= (p.white | p.pawn); i++) {
        piecesOfType[i] = 0;
    }
    for (let i in board1.square) {
        piecesOfType[board1.square[i]]++;
    }
    piecesOfType[0] = 0;
    piecesOfType[p.white | p.king] = 1 - piecesOfType[p.white | p.king];
    piecesOfType[p.black | p.king] = 1 - piecesOfType[p.black | p.king];
    piecesOfType[p.white | p.queen] = 1 - piecesOfType[p.white | p.queen];
    piecesOfType[p.black | p.queen] = 1 - piecesOfType[p.black | p.queen];
    piecesOfType[p.white | p.rook] = 2 - piecesOfType[p.white | p.rook];
    piecesOfType[p.black | p.rook] = 2 - piecesOfType[p.black | p.rook];
    piecesOfType[p.white | p.bishop] = 2 - piecesOfType[p.white | p.bishop];
    piecesOfType[p.black | p.bishop] = 2 - piecesOfType[p.black | p.bishop];
    piecesOfType[p.white | p.knight] = 2 - piecesOfType[p.white | p.knight];
    piecesOfType[p.black | p.knight] = 2 - piecesOfType[p.black | p.knight];
    piecesOfType[p.white | p.pawn] = 8 - piecesOfType[p.white | p.pawn];
    piecesOfType[p.black | p.pawn] = 8 - piecesOfType[p.black | p.pawn];
    for (let i in piecesOfType) {
        for (let j = 0; j < piecesOfType[i]; j++) {
            if (board1.isHuman.white == board1.isHuman.black) {
                if (pieceIsColour(i, true)) {
                    w.innerHTML += `<img src="${sprites[i].src}"/>`;
                } else {
                    b.innerHTML += `<img src="${sprites[i].src}"/>`;
                }
            }
            if (pieceIsColour(i, board1.isHuman.white)) {
                w.innerHTML += `<img src="${sprites[i].src}"/>`;
            } else {
                b.innerHTML += `<img src="${sprites[i].src}"/>`;
            }
        }
    }
}