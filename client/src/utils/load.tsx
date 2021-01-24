import React from 'react';
import * as ReactDOM from 'react-dom';

import { Loader } from '../components/Loader';

let activeLoaders = 0;

export function load<T>(promise: Promise<T>): Promise<T> {
    const loaderElement = document.createElement('div');
    const body = document.querySelector('body');

    const showLoader = () => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        body!.prepend(loaderElement);
        ReactDOM.render(<Loader />, loaderElement);
    };

    const hideLoader = () => {
        ReactDOM.unmountComponentAtNode(loaderElement);
    };

    const addActiveLoaders = () => {
        if (activeLoaders === 0) showLoader();
        activeLoaders += 1;
    };

    const reduceActiveLoaders = () => {
        if (activeLoaders > 0) activeLoaders -= 1;
    };

    addActiveLoaders();

    promise
        .then(() => {
            reduceActiveLoaders();
            if (activeLoaders === 0) hideLoader();
        })
        .catch(() => {
            reduceActiveLoaders();
            hideLoader();
        });

    return promise;
}

// Export for test purpose only
export function getActiveLoadersCounter() {
    return activeLoaders;
}
