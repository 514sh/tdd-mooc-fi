import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

function hitRightWall(board){
  for(let i = 0; i < 10; i++){
    board.moveRight()
  }
}

function hitLeftWall(board){
  for(let i = 0; i < 10; i++){
    board.moveLeft()
  }
}

/*
- a falling tetromino can be moved left
- a falling tetromino can be moved right
- a falling tetromino can be moved down
- it cannot be moved left beyond the board
- it cannot be moved right beyond the board
- it cannot be moved down beyond the board (will stop falling)
- it cannot be moved left through other blocks
- it cannot be moved right through other blocks
- it cannot be moved down through other blocks (will stop falling)
*/

describe('Moving tetromino in the board', () => {
  let board;
  beforeEach(() => {
    board = new Board(10,6)
  })

  it('it can move right', () => {
    board.drop(Tetromino.T_SHAPE)
    board.moveRight()
    expect(board.toString()).to.equalShape(
      `.....T....
       ....TTT...
       ..........
       ..........
       ..........
       ..........`
    )
  })

  it('it can move left', () => {
    board.drop(Tetromino.T_SHAPE)
    board.moveLeft()
    expect(board.toString()).to.equalShape(
      `...T......
       ..TTT.....
       ..........
       ..........
       ..........
       ..........`
    )
  })

  it('it stops when hit the right wall', () => {
    board.drop(Tetromino.T_SHAPE)
    hitRightWall(board)

    expect(board.toString()).to.equalShape(
      `........T.
       .......TTT
       ..........
       ..........
       ..........
       ..........`
    )
  })

  it('it stops when hit the left wall', () => {
    board.drop(Tetromino.T_SHAPE)
    hitLeftWall(board)
    expect(board.toString()).to.equalShape(
      `.T........
       TTT.......
       ..........
       ..........
       ..........
       ..........`
    )
  })

  it('it can be moved down', () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveDown()
    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ....T.....
       ...TTT....`
    );
  })

  it('it cannot be moved down through other blocks', () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveDown()
    board.drop(Tetromino.T_SHAPE);
    board.moveRight()
    board.moveDown()
    expect(board.toString()).to.equalShape(
      `..........
       ..........
       .....T....
       ....TTT...
       ....T.....
       ...TTT....`
    );
  })

  it('it cannot be moved right through other blocks', () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveDown()
    board.drop(Tetromino.T_SHAPE);
    board.moveRight()
    board.moveDown()
    board.drop(Tetromino.T_SHAPE);
    board.moveLeft()
    board.tick()
    board.moveRight()
    board.moveRight()
    board.moveLeft()
    board.moveDown()
    expect(board.toString()).to.equalShape(
      `..........
       ..........
       .....T....
       ..T.TTT...
       .TTTT.....
       ...TTT....`
    );
  })

  it('it cannot be moved left through other blocks', () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveDown()
    board.drop(Tetromino.T_SHAPE);
    board.moveLeft()
    board.moveDown()
    board.drop(Tetromino.T_SHAPE);
    board.moveRight()
    board.tick()
    board.moveLeft()
    board.moveLeft()
    board.moveLeft()
    board.moveLeft()
    board.moveRight()
    board.moveDown()
    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ...T......
       ..TTT.T...
       ....TTTT..
       ...TTT....`
    );
  })
})
