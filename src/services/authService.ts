import { Role } from '../common/roles';
import { firebase } from '../firebase/Firebase';


export class AuthService {
  private userRoles: Array<Role>;

  constructor(userRoles: Array<Role>) {
    this.userRoles = userRoles;
  }

  async isUserInRole(): Promise<boolean> {
    console.log('second');
    console.log(this.userRoles);
    const test = firebase.auth;
    if(await firebase.auth.getUserRole() === undefined){
      console.log('jest undefined');
      setTimeout( async () => await this.isUserInRole(), 1000);
    }
    return this.userRoles.includes(await firebase.auth.getUserRole() as Role);
  }
}