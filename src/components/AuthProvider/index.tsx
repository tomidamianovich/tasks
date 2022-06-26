import { FC } from "react";
import { Navigate } from "react-router-dom";

type AuthProviderProps = {
  children: JSX.Element;
  userIsLogged: boolean;
};

const AuthProvider: FC<AuthProviderProps> = ({ children, userIsLogged }) =>
  userIsLogged ? children : <Navigate to="/login" replace />;

export default AuthProvider;
