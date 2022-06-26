import { FC } from "react";

type LogOutProps = {
  handleUserLogOut: () => void;
};

const LogOut: FC<LogOutProps> = ({ handleUserLogOut }) => {
  return <button onClick={handleUserLogOut}>Log Out</button>;
};

export default LogOut;
