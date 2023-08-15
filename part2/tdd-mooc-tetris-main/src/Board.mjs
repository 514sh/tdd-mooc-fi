export class Board {
  width;
  height;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.board = Array.from({length: this.height}, () => Array(this.width).fill("."))
    this.block = "."
    this.xPlace = 0
    this.yPlace = 1
    this.boardHasFalling = false
    this.count = 0
  }

  toString() {
    let str = ""
    for (let i = 0; i < this.height; i++){
      for (let j = 0; j < this.width; j++){
        str += this.board[i][j]
      }
      str += "\n"
    }
    return str
  }

  drop(block){
    if (!this.boardHasFalling){
      this.board[this.xPlace][this.yPlace] = block
      this.block = block
      this.boardHasFalling = true
    }else{
      throw 'already falling'
    }

  }

  tick(){
    if (this.boardHasFalling && this.xPlace < this.height - (1 + this.count)){
      this.board[this.xPlace][this.yPlace] = "."
      this.xPlace += 1
      this.board[this.xPlace][this.yPlace] = this.block
    }else{
      this.boardHasFalling = false
      this.count += 1
      this.xPlace = 0
    }
  }

  hasFalling(){
    return this.boardHasFalling
  }
}
