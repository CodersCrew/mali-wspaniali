export function parseDateToAge(
  birthYear: number,
  birthQuarter: number,
  comparatorDate: Date = new Date(),
): number {
  const currentQuarter = getQuarter(comparatorDate);
  const currentYear = comparatorDate.getFullYear();
  const yearsInQuarters = (currentYear - birthYear) * 4;
  const yearFragmentInQuarters = currentQuarter - birthQuarter;
  const totalQuarters = yearsInQuarters + yearFragmentInQuarters;

  return Math.floor(totalQuarters / 4);
}

function getQuarter(date: Date) {
  const quarters = [0, 1, 2, 3];

  return quarters[Math.floor(date.getMonth() / 3)];
}
