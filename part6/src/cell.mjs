export class Cell{
  #ifAlive;
  #aliveNeighbor;

  constructor(ifAlive, aliveNeighbor){
    this.#ifAlive = ifAlive
    this.#aliveNeighbor = aliveNeighbor
  }

  next(){
    if(this.#ifAlive){
      if(this.#aliveNeighbor === 2 || this.#aliveNeighbor === 3){
        return new Cell(true, this.#aliveNeighbor)
      }else{
        return new Cell(false, 2);
      }
    }
    if(this.#aliveNeighbor === 3){
      return new Cell(true, this.#aliveNeighbor)
    }
    return new Cell(false, this.#aliveNeighbor);
  }

  ifAlive(){
    return this.#ifAlive;
  }

  aliveNeighbors(){
    return this.#aliveNeighbor;
  }
}