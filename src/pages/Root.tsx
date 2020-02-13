import React, {Suspense, useEffect, useState } from 'react';
import {withTranslation} from 'react-i18next';
import {BrowserRouter as Router, Route} from 'react-router-dom'; 
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import RegistrationPage from './RegistrationPage';
import Loader from '../components/Loader';
import Page from '../components/ChangeLanguage';
import firebaseConfig from "../firebase/config";


const homePage = withTranslation()(HomePage);
const loginPage = LoginPage;
const registrationPage = withTranslation()(RegistrationPage);


const Root = () => {   
    const [isLoggedIn, setLoggedIn] = useState(false);
    function readSession() {
        const user = window.sessionStorage.getItem(
                `firebase:authUser:${firebaseConfig.apiKey}:[DEFAULT]`
            );
            if (user) { 
              setLoggedIn(true);
            }
      }

      useEffect(() => {
        readSession()
      }, [])

    return (      
        <Suspense fallback={<Loader/>}>
            < Page/>
            <Router>
                <div>
                     Is logged in? {JSON.stringify(isLoggedIn)}
                    <Route exact path="/" component={homePage}/>
                    <Route path="/login" component={loginPage} isLoggedIn = {isLoggedIn} />
                    <Route path="/register" component={registrationPage}/>
                </div>
            </Router>
        </Suspense>        
    );
};

export default Root;
