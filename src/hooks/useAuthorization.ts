import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { onAuthStateChanged } from '../queries/authQueries';
import { User } from '../firebase/firebase';

export const useAuthorization = (
  isProtected = false,
  redirectTo = '/',
  allowedRoles?: string[],
) => {
  const [user, setUser] = useState<User | null>(null);
  const history = useHistory();

  useEffect(() => {
    const checkAuthorization = async (currentUser: User | null) => {
      setUser(currentUser);
      const tokenResult = currentUser && (await currentUser.getIdTokenResult());
      const userRole = tokenResult && tokenResult.claims.role;

      if (
        (isProtected && !currentUser) ||
        (allowedRoles && !allowedRoles.includes(userRole))
      ) {
        history.push(redirectTo);
      }
    };

    onAuthStateChanged(authUser => {
      checkAuthorization(authUser);
    });
        // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return user;
};
