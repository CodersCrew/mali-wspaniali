import { Grid } from '@material-ui/core';

import { TermsAndConditionsWrapper } from './TermsAndConditionsWrapper';
import { TermsAndConditionsContentPl } from './translations/pl/TermsAndConditionsContentPl';
import { TermsAndConditionsContentEn } from './translations/en/TermsAndConditionsContentEn';

export default function TermsAndConditionsPage() {
    const language = localStorage.getItem('i18nextLng')!;

    return (
        <TermsAndConditionsWrapper>
            <Grid container>
                <Grid item xs />
                <Grid item xs={6}>
                    {language === 'pl' && <TermsAndConditionsContentPl />}
                    {language === 'en' && <TermsAndConditionsContentEn />}
                </Grid>
                <Grid item xs />
            </Grid>
        </TermsAndConditionsWrapper>
    );
}
