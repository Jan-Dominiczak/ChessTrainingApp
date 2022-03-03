const chessGame = {
    rows: 8,
    rowNames: [1,2,3,4,5,6,7,8],
    columns: 8,
    columnNames: ["A", "B", "C", "D", "E", "F", "G", "H"],
    divChessboard: null,

    paletteFields: 6,
    divPalette: null,

    pieceInHand: null,

    markedChessfield: 'marked-chessfield',

    createChessboard() {                                                                // tworzy interaktywne pola szachownicy
        this.divChessboard = document.querySelector(".chessboard");
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                const field = document.createElement("div");
                field.classList.add("chessfield");
                field.setAttribute("id", this.columnNames[j] + this.rowNames[7-i]);
                field.addEventListener("click", e => this.putPiece(e));
                this.divChessboard.appendChild(field);
            }
        }
    },

    createPalette() {                                                                   // tworzy interaktywne pola palety figur
        this.divPalette = document.querySelector(".chess-palette");
        for (let i = 0; i < this.paletteFields; i++) {
            const field = document.createElement("div");
            field.classList.add("chessfield");
            field.setAttribute("id", PIECES[i].name);
            this.divPalette.appendChild(field);
        }
    },

    addToPalette() {                                                                    // tworzy figury na polach palety
        for (let i = 0; i < PIECES.length; i++) {
            const currentPiece = document.createElement("piece");
            const currentField = document.getElementById(PIECES[i].name);
            currentPiece.classList.add(PIECES[i].name);
            currentPiece.dataset.onBoard = 0;
            currentField.appendChild(currentPiece);
            currentPiece.addEventListener("click", e => this.grabPiece(e));
        }
    },

    grabPiece(e) {
        e.stopPropagation();
        if(this.pieceInHand == null) {
            this.pieceInHand = e.target;
            let grabbedPiece = document.createElement("piece");
            grabbedPiece.classList.add(this.pieceInHand.className);
            grabbedPiece.dataset.onBoard = this.pieceInHand.dataset.onBoard;            // sprawdzić, czy mozna usunąć dataset
            if (grabbedPiece.dataset.onBoard == 1) {                                    // jeśli figura jest na szachownicy, pokaż ruchy
                let currentFieldId = this.pieceInHand.parentElement.id;
                let moves;
                for (let i = 0; i < PIECES.length; i++) {
                    if (grabbedPiece.className == PIECES[i].name) {
                        moves = PIECES[i].moves;
                    }
                    else continue;
                }
                for (let i = 0; i < moves.length; i++) {                                // rysowanie możliwych ruchów
                    let moveLetter = String.fromCharCode(currentFieldId[0].charCodeAt() + moves[i][0]);
                    let moveNumber = Number(currentFieldId[1]) + Number(moves[i][1]);
                    let moveFieldId = moveLetter + moveNumber;
                    console.log(moveLetter);
                    console.log(moveNumber);
                    if (!this.columnNames.includes(moveLetter) || ! this.rowNames.includes(moveNumber)) {   // jeśli ruch wykracza poza szachownicę, kontynuuj
                        continue;
                    }
                    let moveField = document.getElementById(moveFieldId);
                    if (!moveField.querySelector("piece")) {                                                // jeśli na polu ruchu nie ma figury - zaznacz pole
                        moveField.classList.replace("chessfield", this.markedChessfield);
                    }
                }
            }
            grabbedPiece.addEventListener("click", e => this.putPiece(e));              // figura oczekuje na umieszczenie na szachownicy
            console.log(grabbedPiece)
        }
    },

    putPiece(e) {
        if (e.target.querySelector("piece") && this.pieceInHand != null) {
            console.log("You cannot put 2 pieces on one field!");
            this.unmarkMoves();
            this.pieceInHand = null;
        }
        if (this.pieceInHand != null) {
            if (this.pieceInHand.dataset.onBoard == 0) {
                const piece = document.createElement("piece");
                piece.classList.add(this.pieceInHand.className);
                piece.dataset.onBoard = 1;
                piece.addEventListener("click", e => this.grabPiece(e));
                e.target.appendChild(piece);
                this.pieceInHand = null;
            }
            else if (this.pieceInHand.dataset.onBoard == 1) {
                if (e.target.className == this.markedChessfield) {
                    console.log('ok');
                    // TUTAJ WSTAWIĆ FORMULARZ Z PROŚBĄ O WALIDACJĘ RUCHU

                    const piece = document.createElement("piece");
                    piece.classList.add(this.pieceInHand.className);
                    piece.dataset.onBoard = 1;
                    piece.addEventListener("click", e => this.grabPiece(e));
                    e.target.appendChild(piece);
                    this.unmarkMoves();
                    this.pieceInHand.remove();
                    this.pieceInHand = null;
                }
                else {                                      // TO PÓJDZIE DO FORMULARZA W PRZYPADKU BŁĘDNEGO RUCHU
                    console.log("You can't move here!");
                    this.unmarkMoves();
                    this.pieceInHand = null;
                }
            }
        }
    },

    unmarkMoves() {
        let markedFields = document.querySelectorAll(".marked-chessfield")
        markedFields.forEach((chessfield) => {
            chessfield.classList.replace(this.markedChessfield, "chessfield")
        });
    },
}

chessGame.createChessboard();
chessGame.createPalette();
chessGame.addToPalette();