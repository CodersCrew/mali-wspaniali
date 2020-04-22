import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from '../../queries/authQueries';
import { handleLogout } from '../../queries/authQueries';
import { useHistory } from 'react-router-dom';

export const IdleTimer: React.FC = ({ children }) => {
    const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);
    const history = useHistory();
    useEffect(() => {
        console.log('idle timer use effect');
        onAuthStateChanged(user => {
            if (user) {
                reset();
                initInterval();
                initListeners();
            }
        });
    }, []);

    let lastAction: number;
    const CHECK_INTERVAL = 5000;
    const MINUTES_UNITL_AUTO_LOGOUT = 1;

    const initListeners = () => {
        document.body.addEventListener('click', () => reset());
    };

    const reset = () => {
        console.log('reset');
        lastAction = Date.now();
    };

    const initInterval = () => {
        let intervalId: NodeJS.Timeout;
        if (timerId === null) {
            intervalId = setInterval(() => {
                check(intervalId);
            }, CHECK_INTERVAL);
            setTimerId(intervalId);
            console.log('started interval: ', intervalId);
        }
    };

    const check = (intervalId: NodeJS.Timeout) => {
        const now = Date.now();
        const timeleft = lastAction + MINUTES_UNITL_AUTO_LOGOUT * 60 * 1000;
        const diff = timeleft - now;
        const isTimeout = diff < 0;
        console.log('check', 'is timeout?' , isTimeout)
        if (isTimeout) {
          console.log('logout');
            handleLogout();
            window.clearTimeout(intervalId);
            history.push('/');
        }
    };

    return <> {children} </>;
};
