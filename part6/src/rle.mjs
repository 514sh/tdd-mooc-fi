import { readFile } from "node:fs/promises";

export async function readRLE(filename){
    return await readFile(filename, { encoding: "utf8" })
}

export class RLEParser{
    #inputStr;
    
    constructor(inputStr){
        this.#inputStr = inputStr
    }

    prepareOutput(){
        let parsedRLE = []
        for(const row of this.splitByRows()){
            parsedRLE = [...parsedRLE, this.parseRow(row)]
        }
        return parsedRLE;
    }

    output(){
        let parsedRLE = []
        for(const row of this.prepareOutput()){
            parsedRLE = [...parsedRLE, this.addDeadCell(row)]
        }
        return parsedRLE;
    }

    parseCell(alive,count=1){
        if (count === 0){
            return ""
        }
        if (alive === "o"){
            return "x".repeat(count)
        }
        return ".".repeat(count)
    }

    parseRow(inputStr){
        let parsed = ""
        let indexOfLastNumber = 0;
        for(let index = 0; index < inputStr.length; index++){
            if(isNaN(Number(inputStr[index]))){
                let count;
                if (indexOfLastNumber === index){
                    count = 1
                }else{
                    count = Number(inputStr.slice(indexOfLastNumber, index));
                }
                parsed = parsed + this.parseCell(inputStr[index], count);
                indexOfLastNumber = index+1;
            }
        }
        return parsed
    }

    getLongestRowCount(){
        let longest = 0;
        for(const row of this.prepareOutput()){
            longest = Math.max(longest, row.length);
        }
        return longest;
    }

    splitByRows(){
        const rows = this.#trimmedInput().split("$");
        return rows
    }


    addDeadCell(row){
        if(row.length < this.getLongestRowCount()){
            return `${row}${this.parseCell("b", this.getLongestRowCount()-row.length)}`
        }return row
    }

    #trimmedInput(){
        const input = this.#inputStr.split("!");
        if (input.length > 0){
            return input[0]
        }
        return ""
    }
}