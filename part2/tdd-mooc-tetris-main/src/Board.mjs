import { shapeToStr, createBlankArray} from "./shapes.mjs"

const EMPTY = "."

class Point{
  constructor(row, col){
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

  emptyRowAtDrop(){
    let emptyRow = 0
    for (let row = this.#row; row < this.#row + this.#shape.height(); row++){
      for (let col = this.#col; col < this.#col + this.#shape.width(); col++){
        const block = this.blockAt(row, col)
        if (block !== EMPTY){
          return emptyRow
        }
      }
      emptyRow += 1
    }
    return
  }

  nonEmptyBlocks(){
    let points = []
    for (let row = this.#row; row < this.#row + this.#shape.height(); row++){
      for (let col = this.#col; col < this.#col + this.#shape.width(); col++){
        const block = this.blockAt(row, col)
        if (block !== EMPTY){
          points.push (new Point(row,col))
        }
      }
    }
    return points
  }

  blockAt(row, col){
    if (
      row >= this.#row &&
      row < this.#row + this.#shape.height() &&
      col >= this.#col &&
      col < this.#col + this.#shape.width()
    ) {
      return this.#shape.blockAt(row - this.#row, col - this.#col)
    }else{
      return EMPTY
    }
    
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

  rotateRight(){
    return new MovableBlock(this.#shape.rotateRight(), this.#row, this.#col)
  }

  rotateLeft(){
    return new MovableBlock(this.#shape.rotateLeft(), this.#row, this.#col)
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

  height(){
    return this.#height
  }

  width(){
    return this.#width
  }

  nonEmptyBlocks(){
    return this.#fallingObject.nonEmptyBlocks()
  }

  blockAt(row, col){
    if (this.#fallingObject){
      const block = this.#fallingObject.blockAt(row, col)
      if (block !== EMPTY)
      return block
    }
    return this.#board[row][col]
  }

  #initializeBlock(piece){
    this.#fallingObject = new MovableBlock(
      piece,
      0,
      Math.floor((this.#width - piece.width()) / 2)
    )
  }

  drop(piece){

    if (typeof piece === "string") {
      return
    }
    if (this.#fallingObject) {
      throw new Error("another piece is already falling")
    }
    this.#initializeBlock(piece)
    this.#fallingObject = new MovableBlock(
      piece,
      -this.#fallingObject.emptyRowAtDrop(),
      Math.floor((this.#width - piece.width()) / 2)
    )
  }
  
  tick(){
    if (!this.#fallingObject){
      return
    }

    const attempt = this.#fallingObject.moveDown()
    if(this.hitsFloor(attempt) || this.hitsBlock(attempt)){
      this.stopFalling()
    }else{
      this.#fallingObject = this.#fallingObject.moveDown()
    }
  }

  moveRight(){
    if(!this.#fallingObject){
      return
    }

    const attempt = this.#fallingObject.moveRight()

    if(this.hitsWall(attempt) || this.hitsBlock(attempt)){
      return
    }else{
      this.#fallingObject = this.#fallingObject.moveRight()
    }
  }

  moveLeft(){
    if(!this.#fallingObject){
      return
    }
    const attempt = this.#fallingObject.moveLeft()
    if(this.hitsWall(attempt) || this.hitsBlock(attempt)){
      return
    }else{
      this.#fallingObject = this.#fallingObject.moveLeft()
    }
  }

  moveDown(){
    while(this.#fallingObject){
      this.tick()
    }
  }

  rotateRight(){
    if (!this.hasFalling()){
      return
    }

    const attempt = this.#fallingObject.rotateRight()
    if (this.hitsWall(attempt) || this.hitsBlock(attempt) || this.hitsFloor(attempt)){
      let attemptLeft = this.#fallingObject.moveLeft().rotateRight()
      let attemptRight = this.#fallingObject.moveRight().rotateRight()
      let attemptDown = this.#fallingObject.moveDown().rotateRight()
      this.#attempts(attemptLeft, attemptRight, attemptDown)
    }else{
      this.#fallingObject = attempt
    }
  }

  rotateLeft(){
    if (!this.hasFalling()){
      return
    }

    const attempt = this.#fallingObject.rotateLeft()
    if (this.hitsWall(attempt) || this.hitsBlock(attempt) || this.hitsFloor(attempt)){
      let attemptLeft = this.#fallingObject.moveLeft().rotateLeft()
      let attemptRight = this.#fallingObject.moveRight().rotateLeft()
      let attemptDown = this.#fallingObject.moveDown().rotateLeft()
      this.#attempts(attemptLeft, attemptRight, attemptDown)
    }else{
      this.#fallingObject = attempt
    }
  }

  hitsFloor(attempt){
    for(const block of attempt.nonEmptyBlocks()){
      if (block.row < 0 || block.row >= this.height()){
        return true
      }
    }
    return false
  }

  hitsBlock(attempt){
    for(const block of attempt.nonEmptyBlocks()){
      if (block.row < 0){
        continue
      }
      if(this.#board[block.row][block.col] !== EMPTY){
        return true
      }
    }
  }

  hitsWall(attempt){
    for(const block of attempt.nonEmptyBlocks()){
      if(block.col < 0 || block.col >= this.width()){
        return true
      }
    }
    return false
  }

  stopFalling(){
    for(let row = 0; row < this.height();row++){
      for(let col = 0; col < this.width();col++){
        this.#board[row][col] = this.blockAt(row,col)
      }
    }
    this.#fallingObject = null
  }

  hasFalling(){
    return this.#fallingObject !== null
  }

  toString() {
    return shapeToStr(this);
  }

  #attempts(attemptLeft, attemptRight, attemptDown){
    
    if(!this.hitsWall(attemptLeft) && !this.hitsBlock(attemptLeft) && !this.hitsFloor(attemptLeft))
      this.#fallingObject = attemptLeft
    else if(!this.hitsWall(attemptRight) && !this.hitsBlock(attemptRight) &&!this.hitsFloor(attemptRight))
      this.#fallingObject = attemptRight
    else if(!this.hitsWall(attemptDown) && !this.hitsBlock(attemptDown) && !this.hitsFloor(attemptDown)){
      this.#fallingObject = attemptDown
    }
    else
      return
  }
}