import React, { useState, useEffect } from 'react';
import { load } from '../../utils/load';
import { getChildrenData } from '../../queries/childQueries';
import { Child } from '../../firebase/types';


export const ChildrenGrid = () =>
{
    const [maliChildren, setMaliCildren] = useState<Child[]>();
    const [listeners, setListeners] = useState<(() => void)[]>([]);


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
        load(waitForChildrenData());
        return () => detachListeners();		
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        <>
            { maliChildren && maliChildren.map(maliChild => <div key={ maliChild.firstName }>
                {maliChild.firstName}
            </div>) }
        </>
    );
};