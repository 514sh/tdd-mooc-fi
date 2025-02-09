import { describe, test, beforeAll } from "vitest";
import { expect } from "chai";
import { Item, Shop } from "../src/gilded_rose.mjs";

describe("Item name is Sulfuras", () => {
  test("It never has to be sold and it never loses it's quality", () => {
    const gildedRose = new Shop([new Item("Sulfuras", 1, 80)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).to.equal("Sulfuras");
    expect(items[0].sellIn).to.equal(1);
    expect(items[0].quality).to.equal(80);
  });

  test("It's quality is always eighty", () => {
    const gildedRose = new Shop([new Item("Sulfuras", 1, 3)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).to.equal("Sulfuras");
    expect(items[0].sellIn).to.equal(1);
    expect(items[0].quality).to.equal(80);
  });
});
