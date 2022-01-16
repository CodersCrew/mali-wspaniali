import { FC } from 'react';
import { makeStyles, createStyles, Box } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/client';

import { Theme } from '@app/theme/types';
import { useBreakpoints } from '../queries/useBreakpoints';
import { Navbar } from '../components/Menu/Navbar/Navbar';
import { ACTIVE_PAGE } from '@app/graphql/localFields';
import { Sidebar } from '../components/Menu/Sidebar/Sidebar';
import { useGetMe } from '../operations/mutations/User/useGetMe';
import dayjs from '../localizedMoment';
import { UserContext } from '../utils/useMe';
import { SidebarStateProvider } from '../utils/useSidebar';

export const AppWrapper: FC = ({ children }) => {
    const classes = useStyles();
    const { user } = useGetMe();
    const { i18n } = useTranslation();
    const { data: ActivePageState } = useQuery<{ activePage: string[] }>(ACTIVE_PAGE);
    const device = useBreakpoints();

    const history = useHistory();
    const language = localStorage.getItem('i18nextLng')!;

    if (!user) return null;

    return (
        <UserContext.Provider value={user}>
            <SidebarStateProvider>
                <Box display="flex">
                    <Navbar
                        device={device}
                        activePage={ActivePageState!.activePage}
                        language={language}
                        notifications={user.notifications}
                        onLanguageChange={handleLanguageChange}
                    />
                    <Sidebar user={user} activePage={ActivePageState!.activePage} onClick={handleClick} />

                    <main className={classes.content}>
                        <div className={classes.toolbar}>{children}</div>
                    </main>
                </Box>
            </SidebarStateProvider>
        </UserContext.Provider>
    );

    function handleLanguageChange(lng: string) {
        dayjs.locale(lng);

        return i18n.changeLanguage(lng);
    }

    function handleClick(link?: string) {
        if (link === 'logout') {
            localStorage.removeItem('token');

            return history.push('/login');
        }

        if (link) return history.push(link);
    }
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        content: {
            flexGrow: 1,
            backgroundColor: theme.palette.background.default,
            paddingTop: theme.spacing(8),
            maxWidth: '100%',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
        },
        toolbar: {
            ...theme.mixins.toolbar,
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
        },
    }),
);
