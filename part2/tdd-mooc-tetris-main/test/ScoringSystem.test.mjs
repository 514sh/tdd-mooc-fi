
import {expect} from "chai";
import { Board } from "../src/Board.mjs";
import {ScoringSystem} from "../src/ScoringSystem.mjs";
import {Tetromino} from "../src/Tetromino.mjs"

describe('The scoring system', () => {
  let scoringSystem
  beforeEach(() => {
    scoringSystem = new ScoringSystem()
  })

  it('Scoring system instance created', () => {
    expect(scoringSystem.score).to.be.equal(0)
  })
 
  it('Calculation is correct', () => {
    scoringSystem.addToScore(1)
    scoringSystem.addToScore(2)
    scoringSystem.addToScore(3)
    scoringSystem.addToScore(4)
    scoringSystem.addToScore(5)
    scoringSystem.addToScore(0)
    expect(scoringSystem.score).to.be.equal(3280)
    scoringSystem.increaseLevel()
    scoringSystem.addToScore(1)
    scoringSystem.addToScore(2)
    scoringSystem.addToScore(3)
    scoringSystem.addToScore(4)
    scoringSystem.addToScore(5)
    scoringSystem.addToScore(0)
    expect(scoringSystem.score).to.be.equal(8200)
  })

  it('Scores correctly when lines are cleared in the board', () => {
    let board = new Board(4, 10)
    board.addSubscriber(scoringSystem)
  
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

    scoringSystem.increaseLevel()
    board.drop(Tetromino.O_SHAPE)
    board.moveRight()
    board.moveDown()
    board.drop(Tetromino.O_SHAPE)
    board.moveLeft()
    board.moveDown()
    expect(scoringSystem.score).to.be.equal(780)
  })
})
