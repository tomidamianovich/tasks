import Header from "../../components/Header";
import Tasks from "../../components/Tasks";
import AuthProvider from "../../components/AuthProvider";
import { userRequestHandler } from "../../utils/requestHandler";
import { UserRequestLogout } from "../../type";
import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { stateType } from "../../store";
import { unsetUser } from "../../store/reducers/userReducer";
import Login from "../Login";
import "./styles/index.scss";

const Main = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: stateType) => state.user);

  const handleUserLogOut = () => {
    userRequestHandler
      .logOutUser(user.token)
      .then(
        (response: UserRequestLogout) =>
          response.success && dispatch(unsetUser())
      );
  };

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
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default Main;
