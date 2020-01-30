import React, {Component, Suspense} from 'react';
import {useTranslation, withTranslation, Trans} from 'react-i18next';
import {BrowserRouter as Router, Route} from "react-router-dom";
import {Button, makeStyles} from '@material-ui/core/';
import HomePage from "./HomePage";
import LoginPage from "./LoginPage";
import RegistrationPage from "./RegistrationPage/RegistrationPage";

function Page() {

    const {t, i18n} = useTranslation();
    const changeLanguage = (lng: string) => {
        return i18n.changeLanguage(lng);
    };

    return (
        <div className="App">
            <div className="App-header">
                <Button
                    onClick={() => changeLanguage('pl')}
                    variant="contained">pl
                </Button>
                <Button onClick={() => changeLanguage('de')}
                        variant="contained">de
                </Button>
                <Button onClick={() => changeLanguage('en')}
                        variant="contained"
                        color="default">en</Button>
            </div>
        </div>
    );
}

const Loader = () => (
    <div className="App">
        <div>loading...</div>
    </div>
);

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
