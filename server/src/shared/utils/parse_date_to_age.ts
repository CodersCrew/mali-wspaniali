export function parseDateToAge(
  birthYear: number,
  birthQuarter: number,
): number {
  const currentQuarter = getQuarter();
  const currentYear = new Date().getFullYear();
  const yearsInQuarters = (currentYear - birthYear) * 4;
  const yearFragmentInQuarters = currentQuarter - birthQuarter;
  const totalQuarters = yearsInQuarters + yearFragmentInQuarters;

  return Math.floor(totalQuarters / 4);
}

function getQuarter(date: Date = new Date()) {
  const quarters = [0, 1, 2, 3];

  return quarters[Math.floor(date.getMonth() / 3)];
}
