import { describe, test } from "vitest";
import { expect } from "chai";
import { daysUntilChristmas, testableDaysUntilChristmas } from "../src/untestable1.mjs";

describe("Untestable 1: days until Christmas", () => {
  test("todo", () => {
    // TODO: write proper tests
    expect(daysUntilChristmas()).to.be.a("number");
  });
});

/**
 * The function is hard to test because it only calculates the difference between the date today and the christmas day.
 * To make it easier to test, it's better to pass the date that is subtracted day/s until the christmas day as a
 * parameter of the function.
 * 
 * Then, we need to these parts.
 * 1. The christmas day itself.
 * 2. A day before christmas in the same year
 * 3. A day after christmas in the same year
 * 4. A day before christmas in the same leap year
 * 5. A day after christmas but next year is a leap year 
 */

const DECEMBER = 12 - 1;
const FEBRUARY = 2 - 1;

describe("Days until Christmas", () => {
  test("Christmas days itself returns 0 day", () => {
    const todaysYear = new Date().getFullYear()
    const christmas_day_now = new Date(todaysYear, DECEMBER, 25);
    expect(testableDaysUntilChristmas(christmas_day_now)).to.equal(0);
  })

  test("A day before christmas in the same year", () => {
    const dateBeforeChristmas = new Date(2025, FEBRUARY, 28);
    expect(testableDaysUntilChristmas(dateBeforeChristmas)).to.equal(300);
  })

  test("A day after christmas in the same year", () => {
    const dateAfterChristmas = new Date(2025, DECEMBER, 26);
    expect(testableDaysUntilChristmas(dateAfterChristmas)).to.equal(364);
  })

  test("A day before christmas in the same LEAP YEAR", () => {
    const dateBeforeChristmas = new Date(2028, FEBRUARY, 28);
    expect(testableDaysUntilChristmas(dateBeforeChristmas)).to.equal(301);
  })

  test("A day after christmas and next year is a LEAP YEAR", () => {
    const dateAfterChristmas = new Date(2027, DECEMBER, 26);
    expect(testableDaysUntilChristmas(dateAfterChristmas)).to.equal(365);
  })
})
