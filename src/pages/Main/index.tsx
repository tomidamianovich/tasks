import Header from "../../components/Header";
import Tasks from "../../components/Tasks";
import { useState } from "react";
import { userRequestHandler } from "../../utils/requestHandler";
import { UserToken, UserRequestLogout } from "../../type";
import Login from "../Login";
import "./styles/index.scss";

const Main = () => {
  const [userToken, setUserToken] = useState<string>("");

  const handleUserToken = (token: UserToken) => setUserToken(token);

  const handleUserLogOut = () => {
    userRequestHandler
      .logOutUser(userToken)
      .then(
        (response: UserRequestLogout) => response.success && setUserToken("")
      );
  };

  return (
    <div className="Main">
      <Header
        title="Task List"
        userIsLogged={!!userToken?.length}
        handleUserLogOut={handleUserLogOut}
      />
      {!userToken && <Login tokenHandler={handleUserToken} />}
      {userToken && <Tasks token={userToken} />}
    </div>
  );
};

export default Main;
