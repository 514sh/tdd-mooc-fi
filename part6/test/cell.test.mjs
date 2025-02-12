import { describe, test } from "vitest";
import { expect } from "chai";
import { Cell } from "../src/cell.mjs";


describe("Test cell", () => {
  test("Any live cell with fewer than two live neighbours dies, as if by underpopulation.", () => {
    const cell = new Cell(true,1)
    const newCell = cell.next()
    expect(newCell.ifAlive()).to.equal(false);
  });

  test("Any live cell with two or three live neighbours lives on to the next generation.", () => {
    let cellWithTwoAliveNeighbors = new Cell(true,2);
    let cellWithThreeAliveNeighbors = new Cell(true,3);
    cellWithTwoAliveNeighbors = cellWithTwoAliveNeighbors.next()
    cellWithThreeAliveNeighbors = cellWithThreeAliveNeighbors.next()
    expect(cellWithTwoAliveNeighbors.ifAlive()).to.equal(true);
    expect(cellWithThreeAliveNeighbors.ifAlive()).to.equal(true);
  });

  test("Any live cell with more than three live neighbours dies, as if by overpopulation.", () => {
    const cell = new Cell(true,4)
    const newCell = cell.next()
    expect(newCell.ifAlive()).to.equal(false);
  });

  test("Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.", () => {
    const cell = new Cell(false,3)
    const newCell = cell.next()
    expect(newCell.ifAlive()).to.equal(true);
  });

  test("I know if i will born on the next step", () => {
    const neighbors = [0,1,2,3,4,]
    const ifnewBorn = neighbors.map(neighbor => new Cell(false, neighbor).born())
    const ifReBorn = neighbors.map(neighbor => new Cell(true, neighbor).born())
    expect(ifnewBorn).to.deep.equal([false,false,false,true,false]);
    expect(ifReBorn).to.deep.equal([false,false,false,false,false]);
  })
});
