const chessGame = {
    rows: 8,
    columns: 8,
    columnNames: ["A", "B", "C", "D", "E", "F", "G", "H"],
    rowNames: [1,2,3,4,5,6,7,8],
    paletteFields: 6,
    divChessboard: null,
    divPalette: null,
    pieces: ["king", "queen", "rook", "bishop", "knight", "pawn"],
    kingMoves: [[-1,1], [0,1], [1,1], [1,0], [1,-1], [0,-1], [-1,-1], [-1,0]],
    queenMoves: [[-2,1], [-1,2], [1,2], [2,1], [2,-1], [1,-2], [-1,-2], [-2,-1]],
    pieceGrabbed: null,
    piecesOnBoard: 0,
    markedChessfield: 'marked-chessfield',

    createChessBoard() {        // tworzę szachownicę złożoną z pól, na których można postawić figury
        this.divChessboard = document.querySelector(".chessboard");
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                const field = document.createElement("div");
                field.classList.add("chessfield");
                field.setAttribute("id", this.columnNames[j] + (8-i))
                field.addEventListener("click", e=> this.putPiece(e))
                this.divChessboard.appendChild(field);
            }
        }
    },

    createPalette() {           // tworzę paletę figur, skąd można je pobierać na szachownicę
        this.divPalette = document.querySelector(".chess-palette");
        for (let i=0; i<this.paletteFields; i++) {
            const field = document.createElement("div");
            field.classList.add("chessfield");
            field.setAttribute("id", this.pieces[i]);
            this.divPalette.appendChild(field);
        }
    },

    addToPalette() {            // dodaję określone figury do palety
        for (let i=0; i < 2; i++) {
            const piece = document.createElement("piece");
            const field = document.getElementById(this.pieces[i]);
            piece.classList.add(this.pieces[i]);
            piece.dataset.onBoard = 0;
            field.appendChild(piece);
            piece.addEventListener("click", e => this.grabPiece(e));
        }
    },

    grabPiece(e) {              // wybieram figurę z palety
        e.stopPropagation();
        if(this.pieceGrabbed == null){
            this.pieceGrabbed = e.target;
            const g_piece = document.createElement("piece");        // tworzę element do umieszczenia na szachownicy
            g_piece.classList.add(this.pieceGrabbed.className);
            g_piece.dataset.onBoard = this.pieceGrabbed.dataset.onBoard;
            if (g_piece.dataset.onBoard == 1) {                     // jeśli figura jest podniesiona z szachownicy, pokazuję możliwe ruchy
                const currentFieldId = this.pieceGrabbed.parentElement.id;
                if (g_piece.className == "king") {
                    for (let i=0; i < this.kingMoves.length; i++) {
                        let moveLetter = String.fromCharCode(currentFieldId[0].charCodeAt() + this.kingMoves[i][0]);    // pobieram indeks pola
                        let moveNumber = Number(currentFieldId[1]) + this.kingMoves[i][1];
                        let moveFieldId = moveLetter + moveNumber;
                        if (!this.columnNames.includes(moveLetter) || !this.rowNames.includes(moveNumber)) {            // jeśli współprzędne wykraczają poza szachownicę, pomijam
                            continue;
                        }
                        const moveField = document.getElementById(moveFieldId);
                        if (!moveField.querySelector("piece")) {
                            moveField.classList.add(this.markedChessfield);
                        }
                    }
                }
                if (g_piece.className == "queen") {                                 // to samo dla innej figury
                    for (let i=0; i < this.queenMoves.length; i++) {
                        let moveLetter = String.fromCharCode(currentFieldId[0].charCodeAt() + this.queenMoves[i][0]);
                        let moveNumber = Number(currentFieldId[1]) + this.queenMoves[i][1];
                        let moveFieldId = moveLetter + moveNumber;
                        if (!this.columnNames.includes(moveLetter) || !this.rowNames.includes(moveNumber)) {
                            continue;
                        }
                        const moveField = document.getElementById(moveFieldId);
                        if (!moveField.querySelector("piece")) {
                            moveField.classList.add(this.markedChessfield);
                        }
                    }
                }
            }
            g_piece.addEventListener("click", e => this.putPiece(e));               // figura oczekuje na polecenie umieszczenia na szachownicy
        }
    },

    putPiece(e) {               // funkcja umieszczająca figurę na szachownicy
        if(e.target.querySelector("piece") && this.pieceGrabbed != null) {      // jeśli w ręku jest figura i na danym polu jest figura - błąd 
            console.log("You cannot put 2 pieces on one field");
            this.unmarkMoves();
            this.pieceGrabbed = null;
        }
        if(this.pieceGrabbed != null){                          // jeśli w ręku jest figura
            if (this.pieceGrabbed.dataset.onBoard == 0) {       // jeśli figura została pobrana z palety
                this.piecesOnBoard++;
                const piece = document.createElement("piece");  // tworzę nowy element na tablicy
                piece.classList.add(this.pieceGrabbed.className);
                piece.dataset.onBoard = 1;
                piece.addEventListener("click", e => this.grabPiece(e));
                e.target.appendChild(piece);
                this.pieceGrabbed = null;
            }
            else if (this.pieceGrabbed.dataset.onBoard == 1) {  // jeśli figura została pobrana z szachownicy
                if (e.target.getAttribute("style") == this.markedBackground) {      // pokaż możliwe ruchy
                    const piece = document.createElement("piece");                  // utwórz kopię elementu
                    piece.classList.add(this.pieceGrabbed.className);
                    piece.dataset.onBoard = 1;
                    piece.addEventListener("click", e => this.grabPiece(e));        // oczekuj na podniesienie
                    e.target.appendChild(piece);                                    // postaw figurę na nowym polu
                    this.unmarkMoves();
                    this.pieceGrabbed.remove();                                     // usuń figurę ze starego pola
                    this.pieceGrabbed = null;                                       // ręka pusta
                }
                else {
                    console.log("You can't move here!");                            // w przypadku nieprawidłowego ruchu
                        this.unmarkMoves();
                        this.pieceGrabbed = null;
                }
            }
        }
    },

    unmarkMoves() {
        let fields = document.querySelectorAll(".chessfield");
        fields.forEach((chessfield) => {
            chessfield.classList.remove(this.markedChessfield);
            });
    }
}

chessGame.createChessBoard();
chessGame.createPalette();
chessGame.addToPalette();