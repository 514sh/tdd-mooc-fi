import { describe, test } from "vitest";
import { expect } from "chai";
import { readRLE, RLEParser } from "../src/rle.mjs";

/**
 * b = dead
 * o = alive
 * $ = end of a line
 * ! = end of all input(last char)
 */

describe("Test RLE file reader", () => {
    test("I can read the file", async () => {
        const filename = "test/testInput.rle"
        const rleReader = await readRLE(filename)
        expect(rleReader).to.be.equal("test");
    })
})

describe("Test RLE Parser", () => {
    test("I can parse cells given count", async () => {
        const deadCell = "b";
        const aliveCell = "o";
        const rleParser = new RLEParser(deadCell);
        expect(rleParser.parseCell(deadCell)).to.be.equal(".")
        expect(rleParser.parseCell(deadCell, 4)).to.be.equal("....")
        expect(rleParser.parseCell(aliveCell)).to.be.equal("x")
        expect(rleParser.parseCell(aliveCell, 4)).to.be.equal("xxxx")
    })

    test("I can parse a row", async () => {
        const rowCell = "3o4b3o"
        const rowCell2 = "3ob10o10b"
        const rleParser = new RLEParser(rowCell)
        expect(rleParser.parseRow(rowCell)).to.be.equal("xxx....xxx")
        expect(rleParser.parseRow(rowCell2)).to.be.equal("xxx.xxxxxxxxxx..........")
    })

    test("I can group by row", async () => {
        const inputStr = "3o4b$4b3o"
        const inputStr2 = "3o4b$4b3o!"
        const rleParser = new RLEParser(inputStr)
        expect(rleParser.splitByRows()).to.deep.equal(["3o4b","4b3o"])
        expect(rleParser.splitByRows()).to.deep.equal(["3o4b","4b3o"])
    })
    
    test("I can parsed an RLE format", async () => {
        const inputStr = "3o4b$4b3o!"
        const rleParser = new RLEParser(inputStr)
        expect(rleParser.output()).to.deep.equal(["xxx....","....xxx"])
    })

    test("I can add dead cells if a row is not in maximum possible length", async() => {
        const expectedOutput = [
            "........................x...........",
            "......................x.x...........",
            "............xx......xx............xx",
            "...........x...x....xx............xx",
            "xx........x.....x...xx..............",
            "xx........x...x.xx....x.x...........",
            "..........x.....x.......x...........",
            "...........x...x....................",
            "............xx......................",
        ]
    })
})