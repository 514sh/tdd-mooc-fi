import { shapeToStr, transpose, flipColumn } from "./shapes.mjs"

export class RotatingShape{
  #shape

  constructor(shape){
    if (typeof shape === "string"){
      this.#shape = shape
        .replaceAll(" ", "")
        .trim()
        .split("\n")
        .map(row => row.split(""))
    }else{
      this.#shape = shape
    }
  }

  columns(){
    return this.#shape[0].length
  }

  rows(){
    return this.#shape.length
  }

  blockAt(row,col){
    return this.#shape[row][col]
  }

  rotateRight(){
    const transposed = transpose(this.#shape)
    const rotated = flipColumn(transposed)
    return new RotatingShape(rotated)
  }

  rotateLeft(){
    const flipped = flipColumn(this.#shape)
    const rotated = transpose(flipped)
    return new RotatingShape(rotated)
  }

  toString(){
    return shapeToStr(this)
  }
}