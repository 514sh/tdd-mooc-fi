export class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }

  createNormalItems() {
    if (this.sellIn > 0) {
      return new Item(this.name, this.sellIn - 1, Math.max(this.quality - 1, 0));
    } else {
      return new Item(this.name, this.sellIn - 1, Math.max(this.quality - 2, 0));
    }
  }

  createAgedBrie() {
    if (this.sellIn > 0) {
      return new Item(this.name, this.sellIn - 1, Math.min(this.quality + 1, 50));
    } else {
      return new Item(this.name, this.sellIn - 1, Math.min(this.quality + 2, 50));
    }
  }

  createBackstagePasses() {
    if (this.sellIn <= 0) {
      return new Item(this.name, this.sellIn - 1, 0);
    } else if (this.sellIn <= 5) {
      return new Item(this.name, this.sellIn - 1, Math.min(this.quality + 3, 50));
    } else if (this.sellIn <= 10) {
      return new Item(this.name, this.sellIn - 1, Math.min(this.quality + 2, 50));
    } else {
      return new Item(this.name, this.sellIn - 1, Math.min(this.quality + 1, 50));
    }
  }

  createSulfuras() {
    return new Item(this.name, this.sellIn, 80);
  }

  createConjured() {
    if (this.sellIn > 0) {
      return new Item(this.name, this.sellIn - 1, Math.max(this.quality - 2, 0));
    } else {
      return new Item(this.name, this.sellIn - 1, Math.max(this.quality - 4, 0));
    }
  }

  update() {
    const itemName = this.name.toLowerCase().trim();
    if (itemName.includes("aged brie")) {
      return this.createAgedBrie();
    } else if (itemName.includes("backstage passes")) {
      return this.createBackstagePasses();
    } else if (itemName.includes("sulfuras")) {
      return this.createSulfuras();
    } else if (itemName.includes("conjured")) {
      return this.createConjured();
    } else {
      return this.createNormalItems();
    }
  }
}

export class Shop {
  constructor(items) {
    this.items = items;
  }

  updateQuality() {
    let updatedItems = [];
    for (const item of this.items) {
      updatedItems = updatedItems.concat(item.update());
    }

    return updatedItems;
  }
}
