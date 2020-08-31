import React, { FC, useEffect } from 'react';
import { makeStyles, createStyles } from '@material-ui/core';
import { Sidebar } from '../../components/Menu/Sidebar';
import { Navbar } from '../../components/Menu/Navbar';
import { mainColor, backgroundColor } from '../../colors';
import { Theme } from '../../theme/types';
import { getUser } from '../../graphql/userRepository';
import { useState } from 'react';
import { Me } from '../../graphql/types';
import { AddChildModal } from '../../components/AddChildModal/AddChildModal';

export const UserContext = React.createContext<Me | null>(null);

export const AppWrapper: FC = ({ children }) => {
    const classes = useStyles();
    const [user, setUser] = useState<Me | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => setIsOpen(prev => !prev);

    useEffect(() => {
        getUser().then(({ data }) => setUser(data!.me));
    }, []);

    return (
        <UserContext.Provider value={user}>
            <div className={classes.background}>
                {/* <p>test</p> */}
                <AddChildModal />
                <Sidebar user={user} extended={isOpen} toggleSidebar={toggleSidebar} />
                <div className={classes.container}>
                    <Navbar user={user} />
                    <div className={classes.content}>{children}</div>
                </div>
            </div>
        </UserContext.Provider>
    );
};

// eslint-disable-next-line no-shadow
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        background: {
            display: 'flex',
            backgroundColor: mainColor,
            minHeight: '100vh',
            height: '100%',
            padding: '10px',

            [theme.breakpoints.down('sm')]: {
                backgroundColor,
                padding: 0,
            },
        },
        container: {
            backgroundColor,
            width: 'calc(100% - 107px)',
            minHeight: 'calc(100vh - 20px)',
            height: '100%',
            marginLeft: '107px',
            borderRadius: '10px',
            transition: 'all 0.4s',
            '&.opened': {
                marginLeft: '240px',
                width: 'calc(100% - 240px)',
                transition: 'all 0.5s',
            },
            [theme.breakpoints.down('sm')]: {
                margin: 0,
                width: '100%',
            },
        },
        content: {
            marginTop: '-40px',
            padding: '10px 60px',
            [theme.breakpoints.down('sm')]: {
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: '60px',
                padding: 0,
            },
        },
    }),
);
