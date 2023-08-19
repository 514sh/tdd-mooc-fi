import { RotatingShape } from "./RotatingShape.mjs"

export class Tetromino{
  static T_SHAPE = new Tetromino(
    0, 
    4, 
     `...
      TTT
      .T.`
    )
  static I_SHAPE = new Tetromino(
    0, 
    2, 
     `.....
      .....
      IIII.
      .....
      .....`
    )
  static O_SHAPE = new Tetromino(
    0, 
    1, 
     `.OO
      .OO
      ...`
    )
  
  static Z_SHAPE = new Tetromino(
    0,
    2,
    `...
     ZZ.
     .ZZ`
  )

  static S_SHAPE = new Tetromino(
    0,
    2,
    `...
     .SS
     SS.`
  )
  
  static L_SHAPE = new Tetromino(
    0,
    4,
    `...
     LLL
     L..`
  )

  static J_SHAPE = new Tetromino(
    0,
    4,
    `...
     JJJ
     ..J`
  )

  #currentOrientation
  #orientations
  constructor(currentOrientation, orientations, initialShape){
    if(typeof initialShape === "string"){
      const shape = new RotatingShape(initialShape)
      this.#currentOrientation = currentOrientation
      this.#orientations = [
        shape,
        shape.rotateRight(),
        shape.rotateRight().rotateRight(),
        shape.rotateRight().rotateRight().rotateRight()
      ].slice(0, orientations)
    }else{
      this.#currentOrientation = (currentOrientation + orientations.length) % orientations.length
      this.#orientations = orientations
    }
  }

  #shape() {
    return this.#orientations[this.#currentOrientation];
  }

  height(){
    return this.#shape().height()
  }

  width(){
    return this.#shape().width()
  }

  rotateRight(){
    return new Tetromino(this.#currentOrientation + 1, this.#orientations)
  }

  rotateLeft(){
    return new Tetromino(this.#currentOrientation - 1, this.#orientations)
  }

  blockAt(row, col) {
    return this.#shape().blockAt(row, col);
  }

  toString(){
    return this.#shape().toString()
  }
}