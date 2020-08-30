import { useTheme, useMediaQuery } from '@material-ui/core';

export type Device = 'MOBILE' | 'TABLET' | 'DESKTOP';

export function useBreakpoints(): Device {
    const theme = useTheme();

    const mobile = useMediaQuery(theme.breakpoints.down('sm')) && 'MOBILE';
    const tablet =
        useMediaQuery(theme.breakpoints.between('sm', 'md')) && 'TABLET';
    const desktop = useMediaQuery(theme.breakpoints.up('md')) && 'DESKTOP';

    return mobile || tablet || desktop || 'DESKTOP';
}
