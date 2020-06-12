import React from 'react';
import * as ReactDOM from 'react-dom';
import { Loader } from '../components/Loader';

const loaderState = {
    requestsCount: 0,
};

const loaderElement = document.createElement('div');
const body = document.querySelector('body') as HTMLElement;

const showLoader = () => {
    body.prepend(loaderElement);
    ReactDOM.render(<Loader />, loaderElement);
};

const hideLoader = () => {
    ReactDOM.unmountComponentAtNode(loaderElement);
};

export function incrementLoaderRequests() {
    if (loaderState.requestsCount === 0) showLoader();
    loaderState.requestsCount += 1;
}

export function decrementLoaderRequests() {
    if (loaderState.requestsCount > 0) {
        loaderState.requestsCount -= 1;
        if (loaderState.requestsCount === 0) hideLoader();
    }
}

export function load<T>(promise: Promise<T>): Promise<T> {
    incrementLoaderRequests();

    promise
        .then(() => {
            decrementLoaderRequests();
        })
        .catch(() => {
            decrementLoaderRequests();
        });

    return promise;
}

// Export for test purpose only
export function getActiveLoadersCounter() {
    return loaderState.requestsCount;
}
