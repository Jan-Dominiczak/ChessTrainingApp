class Piece:

    moves = []
    

    def __init__(self, name):
        self.name = name
    
class Collection():

    king = Piece('king')
    king.moves = [[-1,1], [0,1], [1,1], [1,0], [1,-1], [0,-1], [-1,-1], [-1,0]]
    

    rook = Piece('rook')
    rook.moves = [[1,0], [2,0], [3,0], [4,0], [5,0], [6,0], [7,0], [-1,0], [-2,0], [-3,0], [-4,0], [-5,0], [-6,0], [-7,0], [0,1], [0,2], [0,3], [0,4], [0,5], [0,6], [0,7], [0,-1], [0,-2], [0,-3], [0,-4], [0,-5], [0,-6], [0,-7]]

    bishop = Piece('bishop')
    bishop.moves = [[1,1], [2,2], [3,3], [4,4], [5,5], [6,6], [7,7],[-1,1], [-2,2], [-3,3], [-4,4], [-5,5], [-6,6], [-7,7], [1,-1], [2,-2], [3,-3], [4,-4], [5,-5], [6,-6], [7,-7], [-1,-1], [-2,-2], [-3,-3], [-4,-4], [-5,-5], [-6,-6], [-7,-7]]

    queen = Piece('queen')
    queen.moves = rook.moves + bishop.moves

    knight = Piece('knight')
    knight.moves = [[-2,1], [-1,2], [1,2], [2,1], [2,-1], [1,-2], [-1,-2], [-2,-1]]

    pawn = Piece('pawn')
    pawn.moves = [[1,0]]

king = {"name": 'king', "moves": [[-1,1], [0,1], [1,1], [1,0], [1,-1], [0,-1], [-1,-1], [-1,0]]}
queen = {"name": 'queen', "moves": [[1,0], [2,0], [3,0], [4,0], [5,0], [6,0], [7,0], [-1,0], [-2,0], [-3,0], [-4,0], [-5,0], [-6,0], [-7,0], [0,1], [0,2], [0,3], [0,4], [0,5], [0,6], [0,7], [0,-1], [0,-2], [0,-3], [0,-4], [0,-5], [0,-6], [0,-7], [1,1], [2,2], [3,3], [4,4], [5,5], [6,6], [7,7],[-1,1], [-2,2], [-3,3], [-4,4], [-5,5], [-6,6], [-7,7], [1,-1], [2,-2], [3,-3], [4,-4], [5,-5], [6,-6], [7,-7], [-1,-1], [-2,-2], [-3,-3], [-4,-4], [-5,-5], [-6,-6], [-7,-7]]}
rook = {"name": 'rook', "moves": [[1,0], [2,0], [3,0], [4,0], [5,0], [6,0], [7,0], [-1,0], [-2,0], [-3,0], [-4,0], [-5,0], [-6,0], [-7,0], [0,1], [0,2], [0,3], [0,4], [0,5], [0,6], [0,7], [0,-1], [0,-2], [0,-3], [0,-4], [0,-5], [0,-6], [0,-7]]}
bishop = {"name": 'bishop', "moves": [[1,1], [2,2], [3,3], [4,4], [5,5], [6,6], [7,7],[-1,1], [-2,2], [-3,3], [-4,4], [-5,5], [-6,6], [-7,7], [1,-1], [2,-2], [3,-3], [4,-4], [5,-5], [6,-6], [7,-7], [-1,-1], [-2,-2], [-3,-3], [-4,-4], [-5,-5], [-6,-6], [-7,-7]]}

knight = {"name": 'knight', "moves": [[-2,1], [-1,2], [1,2], [2,1], [2,-1], [1,-2], [-1,-2], [-2,-1]]}
pawn = {"name": 'pawn', "moves": [[0,1]]}

collection = [king, queen, rook, bishop, knight, pawn]