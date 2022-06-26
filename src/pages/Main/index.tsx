import Header from "../../components/Header";
import Tasks from "../../components/Tasks";
import AuthProvider from "../../components/AuthProvider";
import { useState } from "react";
import { userRequestHandler } from "../../utils/requestHandler";
import { UserToken, UserRequestLogout } from "../../type";
import { Routes, Route } from "react-router-dom";
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
        title="Header Task List"
        userIsLogged={!!userToken?.length}
        handleUserLogOut={handleUserLogOut}
      />
      <Routes>
        <Route
          path="/"
          element={
            <AuthProvider userIsLogged={!!userToken?.length}>
              <Tasks token={userToken} />
            </AuthProvider>
          }
        />
        <Route
          path="/login"
          element={<Login tokenHandler={handleUserToken} />}
        />
      </Routes>
    </div>
  );
};

export default Main;
