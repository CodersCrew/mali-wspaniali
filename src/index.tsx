import React from 'react';
import ReactDOM from 'react-dom';
import './internationalization/i18n';
import { Quill } from 'react-quill';
import ImageResize from 'quill-image-resize-module-react';
import { Root } from './pages/Root';

import * as serviceWorker from './serviceWorker';

Quill.register('modules/imageResize', ImageResize);

ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
