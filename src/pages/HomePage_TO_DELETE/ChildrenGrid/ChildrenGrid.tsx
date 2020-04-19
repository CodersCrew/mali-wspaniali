import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import { getChildrenData } from '../../../queries/childQueries';
import { Child } from '../../../firebase/types';
import { ChildDisplay } from './ChidDisplay';

export const ChildrenGrid = () => {
    const [maliChildren, setMaliCildren] = useState<Child[]>();
    const [listeners, setListeners] = useState<(() => void)[]>([]);

    const classes = useStyles();

    const waitForChildrenData = async () => {
        const { documents, unsubscribe } = await getChildrenData(2, null, null);
        if (unsubscribe) {
            setMaliCildren(documents);
            setListeners([...listeners, unsubscribe]);
        }
    };

    const detachListeners = () => {
        listeners.forEach(listener => () => listener());
    };

    useEffect(() => {
        waitForChildrenData();
        return () => detachListeners();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {maliChildren &&
                maliChildren.map(maliChild => (
                    <div className={classes.childrenBox} key={maliChild.userId}>
                        <ChildDisplay firstname={maliChild.firstName} avatar={maliChild.avatar} />
                    </div>
                ))}
        </>
    );
};

const useStyles = makeStyles({
    childrenBox: {
        marginTop: '30px',
    },
});
