import { Device } from '../../../queries/useBreakpoints';

export function getMenuWidth(device: Device): [number, number] {
    if (device === 'MOBILE') return [354, 0];
    if (device === 'TABLET') return [354, 0];

    return [354, 354];
}
