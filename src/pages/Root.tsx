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

export const AuthContext = React.createContext({    
        isLoggedIn : false,
        setLoggedIn : (isLoggedIn:boolean) => {}
}); 

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
        <AuthContext.Provider value={{ isLoggedIn, setLoggedIn }}>  
        Is logged in? {JSON.stringify(isLoggedIn)}
        <Suspense fallback={<Loader/>}>
            < Page/>
            <Router>
                <div>                    
                    <Route exact path="/" component={homePage} />
                    <Route path="/login" component={loginPage} />
                    <Route path="/register" component={registrationPage}/>
                </div>
            </Router>
        </Suspense> 
        </AuthContext.Provider>       
    );
};

export default Root;
