export function parseDateToAge(birthYear: number, birthQuarter: number, compareDate: Date = new Date()): number {
    return Math.floor(getAgeInQuarters(birthYear, birthQuarter, compareDate) / 4);
}

type Age = number;
type Quarter = number;

type DetailedAge = [Age, Quarter];

export function parseToDetailedAge(
    birthYear: number,
    birthQuarter: number,
    compareDate: Date = new Date(),
): DetailedAge {
    const age = getAgeInQuarters(birthYear, birthQuarter, compareDate) / 4;

    const roundedAge = Math.floor(age);
    const quarter = (age % roundedAge) * 4;

    return [roundedAge, quarter];
}

function getAgeInQuarters(birthYear: number, birthQuarter: number, compareDate: Date = new Date()) {
    const currentQuarter = getQuarter(compareDate);
    const currentYear = compareDate.getFullYear();
    const yearsInQuarters = (currentYear - birthYear) * 4;
    const yearFragmentInQuarters = currentQuarter - birthQuarter;
    const totalQuarters = yearsInQuarters + yearFragmentInQuarters;

    return totalQuarters;
}

export function getQuarter(date: Date = new Date()): number {
    const quarters = [0, 1, 2, 3];

    return quarters[Math.floor(date.getMonth() / 3)];
}
