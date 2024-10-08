import { FC } from 'react';
import { makeStyles, createStyles, Theme, Typography, AppBar, Box } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import Logo from '@app/assets/MW_logo_with_characters.svg';
import { useIsDevice } from '../../queries/useBreakpoints';
import { LanguageSelectorLoginFlow as LanguageSelector } from '../../components/LanguageSelectorLoginFlow';

import { PartnerLogotypeContainer } from './PartnerLogotypeContainer';

type AuthTemplateType = 'login' | 'register';

export const AuthTemplate: FC<{ type: AuthTemplateType }> = ({ children, type }) => {
    const classes = useStyles();
    const { t } = useTranslation();
    const { isDesktop } = useIsDevice();

    return (
        <>
            {isDesktop ? (
                <div className={classes.background}>
                    <div className={classes.logoContainer}>
                        <div className={classes.logoInnerContainer}>
                            <img className={classes.logo} src={Logo} alt="Mali Wspaniali Logo" />
                            <Typography className={classes.welcomeText} variant="h2">
                                {t('login-wrapper.welcome-text')}
                            </Typography>
                        </div>
                        {type === 'login' && <PartnerLogotypeContainer />}
                    </div>
                    <div className={classes.formContainer}>
                        <div className={classes.headerLanguageSelector}>
                            <LanguageSelector />
                        </div>
                        {children}
                    </div>
                </div>
            ) : (
                <>
                    <Box zIndex="appBar">
                        <AppBar className={classes.appBar} position="fixed">
                            <div className={classes.appBarLanguageSelector} />
                            <img className={classes.appBarLogo} src={Logo} alt="Mali Wspaniali Logo" />
                            <div className={classes.appBarLanguageSelector}>
                                <LanguageSelector />
                            </div>
                        </AppBar>
                    </Box>
                    <div className={classes.formContainer}>
                        <Box mb={8} />
                        {children}
                    </div>
                </>
            )}
        </>
    );
};
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        background: {
            backgroundColor: theme.palette.primary.main,
            minHeight: '100vh',
            height: '100%',
            display: 'flex',
        },
        logoContainer: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            flex: '4 0 0',
            flexDirection: 'column',
            padding: theme.spacing(3),
        },
        logoInnerContainer: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
        },
        logo: {
            width: '327.04',
        },
        welcomeText: {
            marginTop: theme.spacing(5),
            width: 400,
            textAlign: 'center',
        },
        formContainer: {
            backgroundColor: theme.palette.background.default,
            minHeight: '100vh',
            maxHeight: '100vh',
            flex: '3 0 0',

            display: 'flex',
            flexDirection: 'column',

            overflow: 'auto',
            scrollbarWidth: 'none',
            '-ms-overflow-style': 'none',
            '&::-webkit-scrollbar': {
                display: 'none',
            },
        },
        headerLanguageSelector: {
            paddingRight: theme.spacing(3),
            paddingTop: theme.spacing(2.5),
        },

        appBar: {
            height: 64,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            borderBottom: `1px solid ${theme.palette.primary.main}`,
        },
        appBarLogo: {
            width: 109,
            margin: 'auto',
        },
        appBarLanguageSelector: {
            marginRight: theme.spacing(3),
        },
    }),
);
