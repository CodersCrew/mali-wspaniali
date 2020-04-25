import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { CHECK_INTERVAL, MINUTES_UNTIL_AUTO_LOGOUT, EVENT_THROTTLE } from './config';
import { throttle } from './throttle';
import { onAuthStateChanged } from '../../queries/authQueries';
import { handleLogout } from '../../queries/authQueries';

export const IdleTimer: React.FC = ({ children }) => {
    const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);
    const [loggedIn, setLoggedIn] = useState(false);
    let lastAction = Date.now();
    const history = useHistory();

    useEffect(() => {
        onAuthStateChanged(user => {
            if (user) {
                setLoggedIn(true);
            } else {
                setLoggedIn(false);
            }
        });
    });

    useEffect(() => {
        if (loggedIn && !timerId) {
            reset();
            initInterval();
            initListeners();
        } else if (!loggedIn && timerId) {
            window.clearTimeout(timerId);
            setTimerId(null);
        }
        return () => {
            removeListeners();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loggedIn]);

    const reset = () => {
        lastAction = Date.now();
    };

    const throttledReset = throttle(reset, EVENT_THROTTLE);

    const initListeners = () => {
        document.body.addEventListener('click', reset);
        document.body.addEventListener('mousemove', throttledReset);
        document.body.addEventListener('scroll', throttledReset);
    };
    const removeListeners = () => {
        document.body.removeEventListener('click', reset);
        document.body.removeEventListener('mousemove', throttledReset);
        document.body.removeEventListener('scroll', throttledReset);
    };

    const initInterval = () => {
        const intervalId = setInterval(() => {
            check(intervalId);
        }, CHECK_INTERVAL);
        setTimerId(intervalId);
    };

    const check = (intervalId: NodeJS.Timeout) => {
        const now = Date.now();
        const timeleft = lastAction + MINUTES_UNTIL_AUTO_LOGOUT * 60 * 1000;
        const diff = timeleft - now;
        const isTimeout = diff < 0;
        if (isTimeout) {
            setTimerId(null);
            handleLogout();
            window.clearTimeout(intervalId);
            history.push('/');
        }
    };

    return <> {children} </>;
};
