
import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

describe('Rotating tetromino in the board', () => {
  let board
  beforeEach(() => {
    board = new Board(10,6)
  })

  it('it can rotate right', () => {
    board.drop(Tetromino.T_SHAPE)
    board.rotateRight()
    expect(board.toString()).to.equalShape(
      `....T.....
       ...TT.....
       ....T.....
       ..........
       ..........
       ..........`
    )
  })

  it('it can rotate left', () => {
    board.drop(Tetromino.T_SHAPE)
    board.rotateLeft()
    expect(board.toString()).to.equalShape(
      `....T.....
       ....TT....
       ....T.....
       ..........
       ..........
       ..........`
    )
  })

  it('it can rotate and move', () => {
    board.drop(Tetromino.T_SHAPE)
    board.rotateRight()
    board.moveRight()
    board.moveRight()
    board.tick()
    board.tick()
    board.tick()
    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ......T...
       .....TT...
       ......T...`
    )
  })

  it('wall kick', () => {
    board.drop(Tetromino.T_SHAPE)
    board.moveLeft()
    board.moveLeft()
    board.moveLeft()
    board.rotateRight()
    board.moveLeft()
    board.rotateRight()
    board.rotateRight()
    board.rotateRight()
    board.rotateLeft()
    board.rotateLeft()
    board.rotateLeft()
    board.moveLeft()
    board.rotateLeft()
    expect(board.toString()).to.equalShape(
      `..........
       TTT.......
       .T........
       ..........
       ..........
       ..........`
    )
  })

  it('cannot rotate when there is no room to rotate', () => {
    board.drop(Tetromino.O_SHAPE)
    board.moveDown()
    board.drop(Tetromino.O_SHAPE)
    board.moveDown()

    board.drop(Tetromino.O_SHAPE)
    board.moveLeft()
    board.moveLeft()
    board.moveLeft()
    board.moveLeft()
    board.moveDown()

    board.drop(Tetromino.O_SHAPE)
    board.moveLeft()
    board.moveLeft()
    board.moveLeft()
    board.moveLeft()
    board.moveDown()

    board.drop(Tetromino.T_SHAPE)
    board.moveLeft()
    board.moveLeft()
    board.rotateLeft()
    board.tick()
    board.tick()
    board.rotateRight()
    board.rotateRight()
    board.rotateRight()
    board.rotateRight()
    board.rotateRight()
    expect(board.toString()).to.equalShape(
      `..........
       ..........
       OOT.OO....
       OOTTOO....
       OOT.OO....
       OO..OO....`
    )
  })
})
