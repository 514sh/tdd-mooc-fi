export class ScoringSystem{
  #score
  #level
  constructor(){
    this.#score = 0
    this.#level = 0
  }

  score(){
    return this.#score
  }

  clearedLines(lines){
    if(lines == 1)
      return 40
    else if (lines == 2)
      return 100
    else if (lines == 3)
      return 300
    else if (lines == 4)
      return 1200
    else
      return 0
  }

  level(){
    return this.#level
  }

  increaseLevel(){
    this.#level = this.#level + 1
  }

  addToScore(lines){
    this.#score +=  this.clearedLines(lines) * (this.level() + 1)
  }
}

/*
0	40	100	300	1200
1	80	200	600	2400
2	120	300	900	3600
9	400	1000	3000	12000
n	40 * (n + 1)	100 * (n + 1)	300 * (n + 1)	1200 * (n + 1)
*/