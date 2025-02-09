import { describe, test } from "vitest";
import { expect } from "chai";
import { Item, Shop } from "../src/gilded_rose.mjs";

describe("Gilded Rose conjured Items degrades twice as fast as normal items", () => {
  test("When sell in date is greater than zero, quality decrements by two", () => {
    const gildedRose = new Shop([new Item("Conjured", 1, 5)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).to.equal("Conjured");
    expect(items[0].sellIn).to.equal(0);
    expect(items[0].quality).to.equal(3);
  });

  test("When sell in date is less than or equal zero, quality decrements by four", () => {
    const gildedRose = new Shop([new Item("Conjured", 0, 5)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).to.equal("Conjured");
    expect(items[0].sellIn).to.equal(-1);
    expect(items[0].quality).to.equal(1);
  });

  test("Quality lowest possible is zero", () => {
    const gildedRose = new Shop([new Item("Conjured", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).to.equal("Conjured");
    expect(items[0].sellIn).to.equal(-1);
    expect(items[0].quality).to.equal(0);
  });
});
