import { describe, test } from "vitest";
import { expect } from "chai";
import { Item, Shop } from "../src/gilded_rose.mjs";

describe("Item name has Backstage passes", () => {
  test("When sell in date is greater than 10, quality increments by one", () => {
    const gildedRose = new Shop([new Item("Backstage passes", 11, 3)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).to.equal("Backstage passes");
    expect(items[0].sellIn).to.equal(10);
    expect(items[0].quality).to.equal(4);
  });

  test("When sell in date is less than or equal 10, quality increments by two", () => {
    const gildedRose = new Shop([new Item("Backstage passes", 10, 3)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).to.include("Backstage passes");
    expect(items[0].sellIn).to.equal(9);
    expect(items[0].quality).to.equal(5);
  });

  test("When sell in date is less than or equal 5, quality increments by three", () => {
    const gildedRose = new Shop([new Item("Backstage passes", 5, 3)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).to.include("Backstage passes");
    expect(items[0].sellIn).to.equal(4);
    expect(items[0].quality).to.equal(6);
  });

  test("When sell in date is zero, quality drops to zero", () => {
    const gildedRose = new Shop([new Item("Backstage passes", 0, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).to.include("Backstage passes");
    expect(items[0].sellIn).to.equal(-1);
    expect(items[0].quality).to.equal(0);
  });
});
