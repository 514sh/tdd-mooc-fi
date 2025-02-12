export class Cell{
  #ifAlive;
  #aliveNeighbor;

  constructor(ifAlive, aliveNeighbor){
    this.#ifAlive = ifAlive
    this.#aliveNeighbor = aliveNeighbor
  }

  next(newAliveNeighbor){
    if(this.#ifAlive){
      if(this.#aliveNeighbor === 2 || this.#aliveNeighbor === 3){
        return new Cell(true, newAliveNeighbor)
      }else{
        return new Cell(false, newAliveNeighbor);
      }
    }
    if(this.#aliveNeighbor === 3){
      return new Cell(true, newAliveNeighbor)
    }
    return new Cell(false, newAliveNeighbor);
  }

  ifAlive(){
    return this.#ifAlive;
  }

  aliveNeighbors(){
    return this.#aliveNeighbor;
  }
}