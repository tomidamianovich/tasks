import { FC } from "react";
import LogOut from "../../pages/LogOut";

type HeaderProps = {
  title: string;
  userIsLogged: boolean;
  handleUserLogOut: () => void;
};

const Header: FC<HeaderProps> = ({ title, userIsLogged, handleUserLogOut }) => (
  <header>
    <span>{title}</span>
    {userIsLogged && <LogOut handleUserLogOut={handleUserLogOut} />}
  </header>
);

export default Header;
