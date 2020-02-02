import React, {Suspense} from 'react';
import {withTranslation} from 'react-i18next';
import {BrowserRouter as Router, Route} from "react-router-dom";
import HomePage from "./HomePage";
import LoginPage from "./LoginPage";
import RegistrationPage from "./RegistrationPage"
import Loader from "../internationalization/utils/Loader";
import Page from "../internationalization/utils/ChangeLanguage";

const homePage = withTranslation()(HomePage);
const loginPage = withTranslation()(LoginPage);
const registrationPage = withTranslation()(RegistrationPage);

const Root = () => {
    return (
        <Suspense fallback={<Loader/>}>
            < Page/>
            <Router>
                <div>
                    <Route exact path="/" component={homePage}/>
                    <Route path="/login" component={loginPage}/>
                    <Route path="/register" component={registrationPage}/>
                </div>
            </Router>
        </Suspense>

    );
};

export default Root;
