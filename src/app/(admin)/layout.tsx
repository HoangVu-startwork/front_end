import React, { ReactNode } from 'react';

interface AuthenticateLayoutProps {
  children: ReactNode;
}

const AuthenticateLayout: React.FC<AuthenticateLayoutProps> = ({ children }) => {
  return (
    <div>{children}</div>
  );
}

export default AuthenticateLayout;
