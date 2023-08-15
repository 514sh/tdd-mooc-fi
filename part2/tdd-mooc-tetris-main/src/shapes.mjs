export function shapeToStr(shape){
  let str = ""
  for(let row = 0; row < shape.rows(); row++){
    for(let col = 0; col < shape.columns(); col++){
      str += shape.blockAt(row,col)
    }
    str += "\n"
  }
  return str
}

function createBlankArray(shape){
  return Array.from({length: shape.length}, () => Array(shape.length).fill(""))
}

export function transpose(shape){
  const rows = shape.length
  const cols = shape[0].length
  const newArray = createBlankArray(shape)
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
  const newArray = createBlankArray(shape)
  for (let row = 0; row < rows; row++){
    for(let colLeft = 0, colRight = cols - 1; colLeft < cols; colLeft++, colRight--){
      newArray[row][colLeft] = shape[row][colRight]
    }
  }
  return newArray
}
