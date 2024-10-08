import ReactDOM from 'react-dom';

import './internationalization/i18n';
import { Root } from './pages/Root';

import * as serviceWorker from './serviceWorker';
import { MainWrapper } from './MainWrapper';

ReactDOM.render(
    <MainWrapper>
        <Root />
    </MainWrapper>,
    document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
