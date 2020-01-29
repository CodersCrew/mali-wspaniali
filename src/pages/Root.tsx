import React, { Component, Suspense } from 'react';
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomePage from "./HomePage";
import LoginPage from "./LoginPage";


function Page() {

    const { t, i18n } = useTranslation();
    const changeLanguage = (lng: string) => {
        return i18n.changeLanguage(lng);
    };

    return (
        <div className="App">
            <div className="App-header">
                <button onClick={() => changeLanguage('de')}>de</button>
                <button onClick={() => changeLanguage('en')}>en</button>
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
const Root = () => {
    return (
        <Suspense fallback={<Loader />}>
           < Page/>
            <Router>
                <div>
                    <Route exact path="/" component={homePage} />
                    <Route path="/login" component={loginPage} />
                </div>
            </Router>
        </Suspense>

    );
};


export default Root;
