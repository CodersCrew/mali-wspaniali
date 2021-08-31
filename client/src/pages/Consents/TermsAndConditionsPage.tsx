import { Box, Grid, Paper } from '@material-ui/core';

import { useIsDevice } from '../../queries/useBreakpoints';

import { TermsAndConditionsWrapper } from './TermsAndConditionsWrapper';
import { TermsAndConditionsContent } from './TermsAndConditionsContent';

export default function TermsAndConditionsPage() {
    const { isMobile } = useIsDevice();

    return (
        <TermsAndConditionsWrapper>
            <Grid container>
                <Grid item xs={isMobile ? 1 : 3} />
                <Grid item xs={isMobile ? 10 : 6}>
                    {isMobile ? (
                        <Box mb="2rem">
                            <TermsAndConditionsContent />
                        </Box>
                    ) : (
                        <Box mb="2rem">
                            <Paper style={{ padding: '16px' }}>
                                <TermsAndConditionsContent />
                            </Paper>
                        </Box>
                    )}
                </Grid>
                <Grid item xs={isMobile ? 1 : 3} />
            </Grid>
        </TermsAndConditionsWrapper>
    );
}
