export class ShuffleBag {
  constructor(items) {
    this.items = items.slice()
    this.currentIndex = 0

    this.shuffle()
  }

  shuffle() {
    for (let i = this.items.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.items[i], this.items[j]] = [this.items[j], this.items[i]]
    }
    this.currentIndex = 0;
  }

  next() {
    console.log(this.currentIndex)
    console.log(this.items)
    if (this.currentIndex >= this.items.length) {

      this.shuffle()
    }
    const item = this.items[this.currentIndex]
    this.currentIndex++
    return item
  }
}