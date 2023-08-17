import { shapeToStr, createBlankArray} from "./shapes.mjs"

const EMPTY = "."

class Point{
  constructor(type ,row, col){
    this.type = type
    this.row = row
    this.col = col
  }
}

class MovableBlock{
  #shape
  #row
  #col
  constructor(shape, row, col){
    this.#shape = shape
    this.#row = row
    this.#col = col
  }

  row(){
    return this.#row
  }

  col(){
    return this.#col
  }

  shape(){
    return this.#shape
  }

  lastCol(){
    return this.#col + this.#shape.width()
  }

  lastRow(){
    return this.#row + this.#shape.height()
  }

  nonEmptyBlocks(){
    let points = []
    let boardRow = this.#row
    let shapeRow = 0
    for(boardRow, shapeRow; shapeRow < this.#shape.height(); boardRow++, shapeRow++){
      let boardCol = this.#col
      let shapeCol = 0
      for(boardCol, shapeCol; shapeCol < this.#shape.width(); boardCol++, shapeCol++){
        if (this.#shape.blockAt(shapeRow, shapeCol) !== EMPTY ){
          let type = this.#shape.blockAt(shapeRow, shapeCol)
          points.push(new Point(type, boardRow, boardCol))
        }
      }
    }
    return points
  }

  moveDown(){
    return new MovableBlock(this.#shape, this.#row + 1, this.#col)
  }

  moveRight(){
    return new MovableBlock(this.#shape, this.#row, this.#col + 1)
  }

  moveLeft(){
    return new MovableBlock(this.#shape, this.#row, this.#col - 1)
  }

}

export class Board{
  #board
  #height
  #width
  #fallingObject
  constructor(width, height){
    this.#height = height
    this.#width = width
    this.#board = createBlankArray(height, width, EMPTY)
    this.#fallingObject = null
  }

  blockAt(row, col){
    return this.#board[row][col]
  }

  drop(shape){
    if(typeof shape === "string"){
      return
    }else{
      const startCol = Math.floor(this.#width/2) - Math.floor(shape.width()/2) - 1
      const initializeBlock = new MovableBlock(shape, 0, startCol)
      this.#fallingObject = initializeBlock
      const points = this.#fallingObject.nonEmptyBlocks()
      this.drawBlockInBoard(points)
    }
  }

  clearBlockInBoard(points){
    points.map( point => {
      if (this.#board[point.row][point.col] !== EMPTY){
        this.#board[point.row][point.col] = EMPTY
      }
    })    
  }

  drawBlockInBoard(points){
    points.map( point => {
      if (this.#board[point.row][point.col] === EMPTY){ 
        this.#board[point.row][point.col] = point.type
      }
    })    
  }

  tick(){
    if(!this.hasFalling()){
      return
    }

    let attempt = this.#fallingObject.moveDown()
    if (this.hitsFloor(attempt) || this.hitsBlock(attempt)){
      this.#fallingObject = null
    }else{
      this.move(this.#fallingObject.moveDown())
    }
  }

  hitsFloor(attempt){
    for (const points of attempt.nonEmptyBlocks()){
      if (points.row >= this.height()){
        return true
      }
    }
    return false
  }

  move(move){
    let pointsBefore = this.#fallingObject.nonEmptyBlocks()
    this.clearBlockInBoard(pointsBefore)
    this.#fallingObject = move
    let pointsAfter = this.#fallingObject.nonEmptyBlocks()
    this.drawBlockInBoard(pointsAfter)
  }

  moveDown(){
    if(!this.hasFalling()){
      return
    }
    for (let i = 0; i < this.height(); i++){
      let attempt = this.#fallingObject.moveDown()
      if (this.hitsFloor(attempt) || this.hitsBlock(attempt)){
        this.#fallingObject = null
        return
      }else{
        this.move(this.#fallingObject.moveDown())
      }
    }
  }

  moveRight(){
    if(!this.hasFalling()){
      return
    }

    let attempt = this.#fallingObject.moveRight()
    
    if (this.hitsWall(attempt)){
      this.#fallingObject = null
      return
    }else if(this.hitsRightBlock(attempt)){
      return
    }
    else{
      this.move(this.#fallingObject.moveRight())
    }
  }

  moveLeft(){
    if(!this.hasFalling()){
      return
    }

    let attempt = this.#fallingObject.moveLeft()
    if (this.hitsWall(attempt)){
      this.#fallingObject = null
      return
    }else if(this.hitsLeftBlock(attempt)){
      return
    }else{
      this.move(this.#fallingObject.moveLeft())
    }
  }

  hitsBlock(attempt){
    for(let col = attempt.col(); col < attempt.lastCol(); col++){
      if((attempt.row() + 1) === this.height()){
        return true
      }
      if (this.#board[attempt.row() +1][col] !== EMPTY){
        return true
      }
    }
    return false
  }

  hitsRightBlock(attempt){
    for(let row = attempt.row(); row < attempt.lastRow(); row++){
      if (this.#board[row][attempt.lastCol() -1] !== EMPTY){
        return true
      }
    }
    return false
  }

  hitsLeftBlock(attempt){
    for(let row = attempt.row(); row < attempt.lastRow(); row++){
      if (this.#board[row][attempt.col()] !== EMPTY){
        return true
      }
    }
    return false
  }


  hasFalling(){
    return this.#fallingObject !== null
  }

  height(){
    return this.#height
  }

  width(){
    return this.#width
  }

  toString(){
    return shapeToStr(this)
  }

  hitsWall(attempt){
    for (const points of attempt.nonEmptyBlocks()){
      if (points.col >= this.width() || points.col < 0){
        return true
      }
    }
    return false
  }
}