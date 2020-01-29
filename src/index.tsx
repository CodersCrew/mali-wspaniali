import React from "react";
import {Provider} from "react-redux";
import ReactDOM from "react-dom";
import './internationalization/i18n';
import {store} from "./store";
import Root from "./pages/Root";

import * as serviceWorker from "./serviceWorker";



ReactDOM.render(
    <Provider store={store}>
        <Root/>
    </Provider>,
    document.getElementById("root")
);


serviceWorker.unregister();
