const millisPerDay = 24 * 60 * 60 * 1000;

export function daysUntilChristmas() {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const christmasDay = new Date(now.getFullYear(), 12 - 1, 25);
  if (today.getTime() > christmasDay.getTime()) {
    christmasDay.setFullYear(new Date().getFullYear() + 1);
  }
  const diffMillis = christmasDay.getTime() - today.getTime();
  return Math.floor(diffMillis / millisPerDay);
}


export function testableDaysUntilChristmas(dateCompared){
  if (!dateCompared){
    dateCompared = new Date();
  }
  const december = 12 - 1;
  const comparedYear = dateCompared.getFullYear();
  const christmasDay = new Date(comparedYear, december, 25);
  if(dateCompared.getTime() > christmasDay.getTime()){
    christmasDay.setFullYear(comparedYear + 1);
  }
  const diffMillis = christmasDay.getTime() - dateCompared.getTime();
  return Math.floor(diffMillis/ millisPerDay);
}
