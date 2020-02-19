import * as React from 'react';
import { Redirect } from 'react-router-dom';
import { AuthService } from '../services/authService';
import {AuthorizationProps} from '../interfaces/AuthorizationProps';
import {firebase} from '../firebase/Firebase';

interface IState {
  authorized: boolean,
  isLoaded: boolean;
}

class AuthorizationComponent extends React.Component<AuthorizationProps, IState> {

state: IState;

newProps: AuthorizationProps;

isAuthorized: boolean;

readonly authService: AuthService;


constructor(newProps: AuthorizationProps) {
  super(newProps);

  this.isAuthorized = false;
  this.authService = new AuthService(newProps.roles);
  this.newProps = newProps;

  this.state = {
    authorized: false,
    isLoaded: false
  };

  console.log('constructor');
}

async componentDidMount() {
   console.log('didmount');
   this.authService.isUserInRole().then((res)=>{
       console.log('test');
       console.log(res);
   }).catch( (error) =>{
     console.log('error');
   });
}

componentWillUnmount() {
  console.log('unmount');
  this.setState({
    authorized: false,
    isLoaded: false
  });
}

  render() {
    console.log('render');
    if(this.state.isLoaded)
    {
      console.log('inside inloaded');
      return (
        this.state.authorized === true ? <React.Fragment>{this.props.children}</React.Fragment> : (<Redirect to="/not-found" />)
      );
    }
    return (<p>Loading...</p>);
  }
}

export default AuthorizationComponent;