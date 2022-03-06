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

    validation: [],

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
            const currentPiece = document.createElement("piece-on-palette");
            const currentField = document.getElementById(PIECES[i].name);
            currentPiece.classList.add(PIECES[i].name);
            currentPiece.dataset.onBoard = 0;
            currentField.appendChild(currentPiece);
            currentPiece.addEventListener("click", e => this.grabPiece(e));
        }
    },

    grabPiece(e) {                                                              // chwytanie figury
        e.stopPropagation();
        if(this.pieceInHand != null) {                                          // jeśli figura w ręce, a klikam na inną - błąd
            this.validation = this.validate(this.pieceInHand.className, this.pieceInHand.parentElement.id, e.target.parentElement.id);
            if (this.validation.info == 'Error_multiple_pieces') {
                this.unmarkMoves();
                this.pieceInHand = null;
                console.log(this.validation.info);
                alert("You cannot place multiple pieces on a field");
                return;
            }
            if (this.pieceInHand == e.target.querySelector('piece')) {
                this.unmarkMoves();
                this.pieceInHand = null;
                return;
            }
        }
        if(this.pieceInHand == null) {
            this.pieceInHand = e.target;
            let grabbedPiece = document.createElement("piece");
            grabbedPiece.classList.add(this.pieceInHand.className);
            grabbedPiece.dataset.onBoard = this.pieceInHand.dataset.onBoard;
            if (grabbedPiece.dataset.onBoard == 1) {                                    // jeśli figura jest na szachownicy, pokaż ruchy
                let currentFieldId = this.pieceInHand.parentElement.id;
                let moves;
                for (let i = 0; i < PIECES.length; i++) {                               // wybór listy ruchów odpowiadającej danej figurze
                    if (grabbedPiece.className == PIECES[i].name) {
                        moves = PIECES[i].moves;
                    }
                    else continue;
                }
                for (let i = 0; i < moves.length; i++) {                                // rysowanie możliwych ruchów
                    let moveLetter = String.fromCharCode(currentFieldId[0].charCodeAt() + moves[i][0]);
                    let moveNumber = Number(currentFieldId[1]) + Number(moves[i][1]);
                    let moveFieldId = moveLetter + moveNumber;
                    let moveField = document.getElementById(moveFieldId);
                    if (!this.columnNames.includes(moveLetter) || ! this.rowNames.includes(moveNumber)) {   // jeśli ruch wykracza poza szachownicę, kontynuuj
                        continue;
                    }
                    if (!moveField.querySelector("piece")) {                                                // jeśli na polu ruchu nie ma figury - zaznacz pole
                        moveField.classList.replace("chessfield", this.markedChessfield);
                    }
                }
            }
            grabbedPiece.addEventListener("click", e => this.putPiece(e));              // figura oczekuje na umieszczenie na szachownicy
        }
    },

    putPiece(e) {
        if (this.pieceInHand != null) {
            if (this.pieceInHand.parentElement == e.target) {               // jeśli próbuję umieścić figurę na polu, na którym stoi - odłóż figurę
                this.unmarkMoves();
                this.pieceInHand = null;
                return;
            }
            this.validation = this.validate(this.pieceInHand.className, this.pieceInHand.parentElement.id, e.target.id);
            if (this.validation.info == 'Error_multiple_pieces') {          // jeśli próbuję umieścić figurę na polu, gdzie stoi inna figura - błąd
                this.unmarkMoves();
                this.pieceInHand = null;
                console.log(this.validation.info);
                alert("You can't place multiple pieces on a field")
                return;
            }
            if (this.validation.info == 'Error_forbidden_move') {           // jeśli próbuję umieścić figurę na polu spoza listy dozwolonych - błąd
                this.unmarkMoves();
                this.pieceInHand = null;
                console.log(this.validation.info);
                alert("You can perform moves only on marked fields")
                return;
            }
            if (document.getElementById(this.validation.movement)) {                // figura wstawiana na szachownicę z palety
                const piece = document.createElement("piece");
                piece.classList.add(this.pieceInHand.className);
                piece.dataset.onBoard = 1;
                piece.addEventListener("click", e => this.grabPiece(e));
                e.target.appendChild(piece);
                this.pieceInHand = null;
                return;
            }
            else if (Array.isArray(this.validation.movement)) {                     // figura przestawiana na szachownicy
                const piece = document.createElement("piece");
                piece.classList.add(this.pieceInHand.className);
                piece.dataset.onBoard = 1;
                piece.addEventListener("click", e => this.grabPiece(e));
                e.target.appendChild(piece);
                this.unmarkMoves();
                this.pieceInHand.remove();
                this.pieceInHand = null;
                return
            }
        }
    },

    unmarkMoves() {                                                                 // funkcja czyszcząca oznaczone pola ruchu
        let markedFields = document.querySelectorAll(".marked-chessfield")
        markedFields.forEach((chessfield) => {
            chessfield.classList.replace(this.markedChessfield, "chessfield")
        });
    },

    validate(chosenPiece,field1,field2) {                                           // wysłanie zapytania o walidację ruchu
        let test = $.ajax({
            url: '',
            type: 'GET',
            global: false,
            async: false,
            data: {
                piece: chosenPiece,
                curr: field1,
                move: field2
            },
            success: function(response) {
                return response.answer
            },
        }).responseJSON;
        return test.answer
    },
    
    cleanChessboard() {                                                             // funkcja wysyłająca żądanie do serwera w celu wyczyszczenia
        $.ajax({                                                                    // zmiennej przechowującej stan szachownicy po stronie serwera
            url:'',
            type: 'GET',
            data: {
                piece: 'clean',
            },
            success: function() {
                console.log('Chessboard cleaned')
            }
        })
    },

    functionalizeButtons() {
        let that = this;
        let resetButton = document.querySelector('#reset-chessboard');
        resetButton.addEventListener('click', function() {
            elements = document.querySelectorAll('piece');
            elements.forEach(element => {element.parentElement.removeChild(element)})
            that.cleanChessboard();
            that.unmarkMoves();
            that.pieceInHand = null;
            console.log("Chessboard cleaned");
        });
        let deletePieceButton = document.querySelector('#delete-piece');
        deletePieceButton.addEventListener('click', function() {
            if (that.pieceInHand != null) {
                if (that.pieceInHand.tagName == 'PIECE') {
                    that.pieceInHand.parentElement.removeChild(that.pieceInHand)
                    that.pieceInHand = null;
                    that.unmarkMoves();
                }
            }
        })
    }
}

chessGame.cleanChessboard();
chessGame.createChessboard();
chessGame.createPalette();
chessGame.addToPalette();
chessGame.functionalizeButtons();