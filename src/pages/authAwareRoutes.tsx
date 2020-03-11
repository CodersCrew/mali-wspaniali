import React, { useState, useEffect } from 'react';
import { RouteProps } from 'react-router-dom';
import { onAuthStateChanged } from '../queries/authQueries';
import { User } from '../firebase/firebase';

export const AuthAwareRoutes = ({ children }: { children: JSX.Element[] }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(userState => setUser(userState));
  }, []);

  return (
    <>
      {React.Children.map(children, child =>
        React.cloneElement(child, {
          component: undefined,
          render: function renderDecoratedPage(props: RouteProps) {
            return <child.props.component {...props} user={user} />;
          },
        }),
      )}
    </>
  );
};
