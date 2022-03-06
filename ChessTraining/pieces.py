class Piece:
    moves = []

    def __init__(self, name):
        self.name = name

king = {"name": 'king', "moves": [[-1,1], [0,1], [1,1], [1,0], [1,-1], [0,-1], [-1,-1], [-1,0]]}
queen = {"name": 'queen', "moves": [[1,0], [2,0], [3,0], [4,0], [5,0], [6,0], [7,0], [-1,0], [-2,0], [-3,0], [-4,0], [-5,0], [-6,0], [-7,0], [0,1], [0,2], [0,3], [0,4], [0,5], [0,6], [0,7], [0,-1], [0,-2], [0,-3], [0,-4], [0,-5], [0,-6], [0,-7], [1,1], [2,2], [3,3], [4,4], [5,5], [6,6], [7,7],[-1,1], [-2,2], [-3,3], [-4,4], [-5,5], [-6,6], [-7,7], [1,-1], [2,-2], [3,-3], [4,-4], [5,-5], [6,-6], [7,-7], [-1,-1], [-2,-2], [-3,-3], [-4,-4], [-5,-5], [-6,-6], [-7,-7]]}
rook = {"name": 'rook', "moves": [[1,0], [2,0], [3,0], [4,0], [5,0], [6,0], [7,0], [-1,0], [-2,0], [-3,0], [-4,0], [-5,0], [-6,0], [-7,0], [0,1], [0,2], [0,3], [0,4], [0,5], [0,6], [0,7], [0,-1], [0,-2], [0,-3], [0,-4], [0,-5], [0,-6], [0,-7]]}
bishop = {"name": 'bishop', "moves": [[1,1], [2,2], [3,3], [4,4], [5,5], [6,6], [7,7],[-1,1], [-2,2], [-3,3], [-4,4], [-5,5], [-6,6], [-7,7], [1,-1], [2,-2], [3,-3], [4,-4], [5,-5], [6,-6], [7,-7], [-1,-1], [-2,-2], [-3,-3], [-4,-4], [-5,-5], [-6,-6], [-7,-7]]}
knight = {"name": 'knight', "moves": [[-2,1], [-1,2], [1,2], [2,1], [2,-1], [1,-2], [-1,-2], [-2,-1]]}
pawn = {"name": 'pawn', "moves": [[0,1]]}

collection = [king, queen, rook, bishop, knight, pawn]

chessboard = {
    'A1': None,
    'A2': None,
    'A3': None,
    'A4': None,
    'A5': None,
    'A6': None,
    'A7': None,
    'A8': None,
    'B1': None,
    'B2': None,
    'B3': None,
    'B4': None,
    'B5': None,
    'B6': None,
    'B7': None,
    'B8': None,
    'C1': None,
    'C2': None,
    'C3': None,
    'C4': None,
    'C5': None,
    'C6': None,
    'C7': None,
    'C8': None,
    'D1': None,
    'D2': None,
    'D3': None,
    'D4': None,
    'D5': None,
    'D6': None,
    'D7': None,
    'D8': None,
    'E1': None,
    'E2': None,
    'E3': None,
    'E4': None,
    'E5': None,
    'E6': None,
    'E7': None,
    'E8': None,
    'F1': None,
    'F2': None,
    'F3': None,
    'F4': None,
    'F5': None,
    'F6': None,
    'F7': None,
    'F8': None,
    'G1': None,
    'G2': None,
    'G3': None,
    'G4': None,
    'G5': None,
    'G6': None,
    'G7': None,
    'G8': None,
    'H1': None,
    'H2': None,
    'H3': None,
    'H4': None,
    'H5': None,
    'H6': None,
    'H7': None,
    'H8': None,
}

palette = ['king', 'queen']

def calculatePosition(instruction):
    pieceType = instruction['name']
    pieceCurrentPos = instruction['move'][0]
    pieceMovement = instruction['move'][1]
    if not pieceMovement in chessboard:
        return {'type': pieceType, 'movement': pieceMovement, 'info': "Error_move_to_palette"}
    if pieceCurrentPos in chessboard:                                                   #jeśli figura jest na szachownicy
        movementCoords = []
        movementCoords.append(ord(pieceMovement[0]) - ord(pieceCurrentPos[0]))
        movementCoords.append(int(pieceMovement[1]) - int(pieceCurrentPos[1]))
        possibleMoves = []
        for piece in collection:
            if piece['name'] == pieceType:
                possibleMoves = piece['moves']
        if movementCoords in possibleMoves:
            if chessboard[pieceMovement] != None:
                return {'type': pieceType, 'movement': pieceMovement, 'info': "Error_multiple_pieces"}
            chessboard[pieceMovement] = pieceType
            chessboard[pieceCurrentPos] = None 
            return {'type': pieceType, 'movement': movementCoords, 'info': "ok"}
        else:
            return {'type': pieceType, 'movement': movementCoords, 'info': "Error_forbidden_move"}
    else:
        if chessboard[pieceMovement] != None:
            return {'type': pieceType, 'movement': pieceMovement, 'info': "Error_multiple_pieces"}
        chessboard[pieceMovement] = pieceType
        return {'type': pieceType, 'movement': pieceCurrentPos, 'info': "ok"}


def cleanChessboard():
    for i in chessboard:
        chessboard[i] = None
    return

def removeFromChessboard(field):
    chessboard[field] = None
    return