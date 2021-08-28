import { Box, Grid, Paper } from '@material-ui/core';

import { TermsAndConditionsWrapper } from './TermsAndConditionsWrapper';
import { TermsAndConditionsContentPl } from './translations/pl/TermsAndConditionsContentPl';
import { TermsAndConditionsContentEn } from './translations/en/TermsAndConditionsContentEn';
import { useIsDevice } from '../../queries/useBreakpoints';

export default function TermsAndConditionsPage() {
    const language = localStorage.getItem('i18nextLng')!;
    const { isMobile } = useIsDevice();

    return (
        <TermsAndConditionsWrapper>
            <Grid container>
                <Grid item xs={isMobile ? 1 : 3} />
                <Grid item xs={isMobile ? 10 : 6}>
                    {isMobile ? (
                        <Box>
                            {language === 'pl' && <TermsAndConditionsContentPl />}
                            {language === 'en' && <TermsAndConditionsContentEn />}
                        </Box>
                    ) : (
                        <Paper style={{ padding: '16px' }}>
                            {language === 'pl' && <TermsAndConditionsContentPl />}
                            {language === 'en' && <TermsAndConditionsContentEn />}
                        </Paper>
                    )}
                </Grid>
                <Grid item xs={isMobile ? 1 : 3} />
            </Grid>
        </TermsAndConditionsWrapper>
    );
}
