const millisPerDay = 24 * 60 * 60 * 1000;

export function testableDaysUntilChristmas(dateCompared) {
  if (!dateCompared) {
    dateCompared = new Date();
  }
  const december = 12 - 1;
  const comparedYear = dateCompared.getFullYear();
  const christmasDay = new Date(comparedYear, december, 25);
  if (dateCompared.getTime() > christmasDay.getTime()) {
    christmasDay.setFullYear(comparedYear + 1);
  }
  const diffMillis = christmasDay.getTime() - dateCompared.getTime();
  return Math.floor(diffMillis / millisPerDay);
}
