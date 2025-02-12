import { Cell } from "./cell.mjs";

export class Plane{
    #state;
    #bornCount;

    constructor(state, bornCount){
        this.#state = state
        if (bornCount && bornCount > 0){
            this.#bornCount = bornCount;
        }else{
            this.#bornCount = 0;
        }
    }

    stringToCell(ifAlive, aliveNeighbor){
        return new Cell(this.#ifAlive(ifAlive), aliveNeighbor)
    }

    cellToString(cell){
        if(cell.ifAlive()){
            return "x"
        }
        return "."
    }

    stateInPlace(row, col){
        if(this.#rows() > row && this.#cols() > col){
            return this.#state[row][col];
        }
    }

    next(){
        let nextCells = [];
        let bornCount = 0;
        for(let row = 0; row < this.#rows(); row++){
            let newRow = "";
            for(let col = 0; col < this.#cols(); col++){
                const newCell = this.stringToCell(this.stateInPlace(row, col), this.countAlive(row, col))
                if (newCell.born()){
                    bornCount++;
                }
                const newCellStr = this.cellToString(newCell.next());
                newRow = newRow + newCellStr;
            }
            nextCells = nextCells.concat(newRow);
        }
        return new Plane(nextCells, bornCount);
    }

    aliveNeighbors(){
        let alive = [];
        for(let row = 0; row < this.#rows(); row++){
            let newRow = [];
            for(let col = 0; col < this.#cols(); col++){
                newRow = newRow.concat(this.countAlive(row, col));
            }
            alive = [...alive, newRow];
        }
        return alive;
    }

    countAlive(row, col){
        let count = 0;
        for(let currentRow = Math.max(0, row-1); currentRow < Math.min(this.#rows(), row+2); currentRow++){
            for(let currentCol = Math.max(0, col-1); currentCol < Math.min(this.#cols(), col+2); currentCol++){
                if(currentRow === row && currentCol === col){
                    continue;
                }
                if (this.#state[currentRow][currentCol] === "x"){
                    count++;
                }
            }
        }
        return count;
    }

    #rows(){
        return this.#state.length;
    }

    #cols(){
        if (this.#rows() > 0){
            return this.#state[0].length
        }
        return 0;
    }

    currentState(){
        return this.#state;
    }

    getBornCount(){
        return this.#bornCount;
    }

    #ifAlive(value){
        if(value === "x"){
            return true;
        }
        return false;
    }


    print(){
        return this.currentState().join("\n");
    }
}