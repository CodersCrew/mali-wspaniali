import { useTheme, useMediaQuery } from '@material-ui/core';

export type Device = 'MOBILE' | 'TABLET' | 'DESKTOP';

export function useBreakpoints(): Device {
    const theme = useTheme();

    const mobile = useMediaQuery(theme.breakpoints.down('sm')) && 'MOBILE';
    const tablet = useMediaQuery(theme.breakpoints.between('sm', 'md')) && 'TABLET';
    const desktop = useMediaQuery(theme.breakpoints.up('md')) && 'DESKTOP';

    return mobile || tablet || desktop || 'DESKTOP';
}

export function useIsDevice() {
    const device = useBreakpoints();
    const theme = useTheme();

    return {
        isDesktop: device === 'DESKTOP',
        isMobile: device === 'MOBILE',
        isSmallMobile: useMediaQuery(theme.breakpoints.down('xs')), // we treat small mobile as a subcategory of mobile
        isTablet: device === 'TABLET',
    };
}
