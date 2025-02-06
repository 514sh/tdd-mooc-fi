import { describe, test } from "vitest";
import { expect } from "chai";
import { testableDiceHandValue } from "../src/testableRandom.mjs";

/**
 * The issue with the Untestable2 is that random variables is inside the function that's why it is hard to test.
 * Random variables should be passed as parameters so that it is easier to test.
 *
 * We now need to tests for these cases;
 * 1. die1 > die2 => returns die1
 * 2. die1 < die2 => returns die2
 * 3. die1 == die2 => returns 100 + die1
 */

describe("Testable Random: Dice hand Value", () => {
  test("die1 is greater than die2", () => {
    const die1 = 5;
    const die2 = 1;
    expect(testableDiceHandValue(die1, die2)).to.be.equal(5);
  });

  test("die2 is greater than die1", () => {
    const die2 = 5;
    const die1 = 1;
    expect(testableDiceHandValue(die1, die2)).to.be.equal(5);
  })

  test("die1 is equal to die2", () => {
    const die1 = 1;
    const die2 = 1;
    expect(testableDiceHandValue(die1, die2)).to.be.equal(101);
  })
});
