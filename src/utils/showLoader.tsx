import React from 'react';
import * as ReactDOM from 'react-dom';
import { Loader } from '../components/Loader';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function showLoader(anyPromise: Promise<any>) {
  const confirmRoot = document.createElement('div');
  const body = document.querySelector('body');

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  body!.prepend(confirmRoot);
  ReactDOM.unmountComponentAtNode(confirmRoot);

  ReactDOM.render(<Loader />, confirmRoot);

  const hideLoader = () => {
    ReactDOM.unmountComponentAtNode(confirmRoot);
  };

  anyPromise
    .then(() => hideLoader())
    .catch(() => {
      hideLoader();
    });

  return anyPromise;
}
