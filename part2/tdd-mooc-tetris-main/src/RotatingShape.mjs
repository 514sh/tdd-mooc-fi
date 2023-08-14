export class RotatingShape{
  constructor(shape){
    this.shape = shape

    let shapeArrRow = this.shape.split("\n")
    this.shapeArr = shapeArrRow.map(row => row.trim().split(''))
  }

  strToArrShape(shape){
    let shapeArrRow = shape.split("\n")
    return shapeArrRow.map(row => row.trim().split(''))
  }

  transpose(shape){
    const dimension = shape.length
    const newShape = Array.from({length: dimension}, () => Array(dimension).fill(""))
    for(let i = 0; i < dimension; i++){
      for(let j = 0; j < dimension; j++ ){
        newShape[i][j] = shape[j][i]
      }
    }
    return newShape
  }

  flipCol(shape){
    const dimension = shape.length
    const newShape = Array.from({length: dimension}, () => Array(dimension).fill(""))

    for(let i = 0; i < dimension; i++){
      for(let j = 0, k = dimension - 1; j < dimension; j++, k-- ){
        newShape[i][j] = shape[i][k]
      }
    }
    return newShape
  }

  rotateRight(){
    const shapeArr = this.strToArrShape(this.shape)
    let transposed = this.transpose(shapeArr)
    let newShape = this.flipCol(transposed)
    this.shapeArr = [...newShape]
    return this
  }

  rotateLeft(){
    const shapeArr = this.strToArrShape(this.shape)
    let flipped = this.flipCol(shapeArr)
    let newShape = this.transpose(flipped)
    this.shapeArr = [...newShape]
    return this
  }

  toString(){
    const dimension = this.shapeArr.length
    let str=""
    for(let i = 0; i < dimension; i++){
      for(let j = 0; j < dimension; j++){
        str += this.shapeArr[i][j]
      }
      str += "\n"
    }
    return str
  }
}