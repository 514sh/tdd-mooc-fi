export function shapeToStr(shape){
  let str = ""
  for(let row = 0; row < shape.height(); row++){
    for(let col = 0; col < shape.width(); col++){
      str += shape.blockAt(row,col)
    }
    str += "\n"
  }
  return str
}

export function createBlankArray(row, col, char){
  return Array.from({length: row}, () => Array(col).fill(char))
}

export function transpose(shape){
  const rows = shape.length
  const cols = shape[0].length
  const newArray = createBlankArray(rows, cols)
  for (let row = 0; row < rows; row++){
    for(let col = 0; col < cols; col++){
      newArray[row][col] = shape[col][row]
    }
  }
  return newArray
}

export function flipColumn(shape){
  const rows = shape.length
  const cols = shape[0].length
  const newArray = createBlankArray(rows,cols)
  for (let row = 0; row < rows; row++){
    for(let colLeft = 0, colRight = cols - 1; colLeft < cols; colLeft++, colRight--){
      newArray[row][colLeft] = shape[row][colRight]
    }
  }
  return newArray
}
