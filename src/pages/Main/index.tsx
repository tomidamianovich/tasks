import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { userRequestHandler } from "../../utils/requestHandler";
import { UserRequestLogout } from "../../type";

import { stateType } from "../../store";
import { setUser, unsetUser } from "../../store/reducers/userReducer";

import { Header, Tasks, AuthProvider } from "../../components/";
import { LogIn } from "../";
import "./styles/index.scss";

const Main = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: stateType) => state.user);

  const handleUserLogOut = () => {
    userRequestHandler
      .logOutUser(user.token)
      .then((response: UserRequestLogout) => {
        if (!response.success) return;
        dispatch(unsetUser());
      })
      .finally(() => {
        localStorage.deleteItem("user");
        navigate("/login");
      });
  };

  useEffect(() => {
    const userFromStorage = localStorage.getItem("user");
    if (!userFromStorage) return;
    dispatch(setUser(JSON.parse(userFromStorage)));
    navigate("/");
  }, []);

  return (
    <div className="Main">
      <Header
        title="Header Task List"
        userIsLogged={!!user?.token?.length}
        handleUserLogOut={handleUserLogOut}
      />
      <Routes>
        <Route
          path="/"
          element={
            <AuthProvider userIsLogged={!!user?.token?.length}>
              <Tasks />
            </AuthProvider>
          }
        />
        <Route path="/login" element={<LogIn />} />
      </Routes>
    </div>
  );
};

export default Main;
