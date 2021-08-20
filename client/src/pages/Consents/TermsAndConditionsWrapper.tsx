import { Box, createStyles, makeStyles } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { Theme } from '../../theme';
import { Navbar } from '../../components/Menu/Navbar/Navbar';
import { useBreakpoints } from '../../queries/useBreakpoints';
import dayjs from '../../localizedMoment';

export const TermsAndConditionsWrapper: React.FC = ({ children }) => {
    const classes = useStyles();
    const device = useBreakpoints();
    const { i18n } = useTranslation();

    const language = localStorage.getItem('i18nextLng')!;

    function handleLanguageChange(lng: string) {
        dayjs.locale(lng);

        return i18n.changeLanguage(lng);
    }

    return (
        <Box display="flex" width="100%">
            <Navbar
                device={device}
                activePage={[]}
                language={language}
                notifications={[]}
                onLanguageChange={handleLanguageChange}
            />
            <main className={classes.content}>
                <div className={classes.toolbar}>{children}</div>
            </main>
        </Box>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        content: {
            flexGrow: 1,
            backgroundColor: theme.palette.background.default,
            paddingTop: theme.spacing(12),
            maxWidth: '100%',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',

            overflowY: 'auto',
            '-ms-overflow-style': 'none' /* IE and Edge */,
            scrollbarWidth: 'none' /* Firefox */,
            '&::-webkit-scrollbar': {
                display: 'none',
            },
        },
        toolbar: {
            ...theme.mixins.toolbar,
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
        },
    }),
);
