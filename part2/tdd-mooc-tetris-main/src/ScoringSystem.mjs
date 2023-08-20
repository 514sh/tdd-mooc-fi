export class ScoringSystem{
  score
  level
  constructor(){
    this.score = 0
    this.level = 1
  }

  linesCleared(lines){
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


  increaseLevel(){
    this.level = this.level + 1
  }

  addToScore(lines){
    this.score +=  this.linesCleared(lines) * (this.level + 1)
  }
}
