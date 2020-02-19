import * as React from 'react';
import { Redirect } from 'react-router-dom';
import { AuthService } from '../services/authService';
import {AuthorizationProps} from '../interfaces/AuthorizationProps';



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
}

 async componentDidMount() {
  this.setState({
    authorized: await this.authService.isUserInRole(),
    isLoaded: true
  });
}

  render() {

    if(this.state.isLoaded)
    {
      return (
        this.state.authorized === true ? <React.Fragment>{this.props.children}</React.Fragment> : (<Redirect to="/not-found" />)
      );
    }
    return (<p>Loading...</p>);
  }
}

export default AuthorizationComponent;