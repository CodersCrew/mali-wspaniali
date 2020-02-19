import { Role } from '../common/roles';
import { firebase } from '../firebase/Firebase';


export class AuthService {
  private userRoles: Array<Role>;

  constructor(userRoles: Array<Role>) {
    this.userRoles = userRoles;
  }

  async isUserInRole(): Promise<boolean> {
    console.log(await firebase.auth.getUserRole());
    return this.userRoles.includes(await firebase.auth.getUserRole() as Role);
  }
}