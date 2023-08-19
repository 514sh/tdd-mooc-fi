import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

describe('Clearing lines', () => {
  let board
  beforeEach(() => {
    board = new Board(4, 10)
  })

  it('rows are removed after lines are cleared', () => {
    board.drop(Tetromino.O_SHAPE)
    board.moveLeft()
    board.moveDown()
    board.drop(Tetromino.O_SHAPE)
    board.moveLeft()
    board.moveDown()
    board.drop(Tetromino.O_SHAPE)
    board.moveLeft()
    board.moveDown()
    board.drop(Tetromino.T_SHAPE)
    board.moveRight()
    board.rotateRight()
    board.moveRight()
    board.moveDown()
    board.drop(Tetromino.O_SHAPE)
    board.moveRight()
    board.moveDown()
    board.drop(Tetromino.O_SHAPE)
    board.moveRight()
    board.moveDown()
    
    expect(board.toString()).to.equalShape(
      `....
       ....
       ....
       ....
       ....
       ....
       ....
       ..OO
       OO.T
       OO.T`
    )
  })
})