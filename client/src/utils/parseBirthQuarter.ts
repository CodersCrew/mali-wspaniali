export function parseBirthQuarter(birthQuarter: number): string {
    if (birthQuarter === 0) return 'I';
    if (birthQuarter === 1) return 'II';
    if (birthQuarter === 2) return 'III';

    return 'IV';
}
