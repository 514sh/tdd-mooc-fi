import { describe, test } from "vitest";
import { expect } from "chai";
import { Item, Shop } from "../src/gilded_rose.mjs";

describe("Item name is Aged Brie", () => {
  test("When sell in date is greater than one, quality increments by one", () => {
    const gildedRose = new Shop([new Item("Aged Brie", 1, 3)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).to.equal("Aged Brie");
    expect(items[0].sellIn).to.equal(0);
    expect(items[0].quality).to.equal(4);
  });

  test("When sell in date is zero, quality increments by two", () => {
    const gildedRose = new Shop([new Item("Aged Brie", 0, 3)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).to.equal("Aged Brie");
    expect(items[0].sellIn).to.equal(-1);
    expect(items[0].quality).to.equal(5);
  });

  test("When sell in date is less than zero, quality incements by two", () => {
    const gildedRose = new Shop([new Item("Aged Brie", -10, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).to.equal("Aged Brie");
    expect(items[0].sellIn).to.equal(-11);
    expect(items[0].quality).to.equal(2);
  });

  test("Quality doesn't get any higher than fifty", () => {
    const gildedRose = new Shop([new Item("Aged Brie", -10, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).to.equal("Aged Brie");
    expect(items[0].sellIn).to.equal(-11);
    expect(items[0].quality).to.equal(50);
  });
});
