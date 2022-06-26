import { FC, useRef, SyntheticEvent, useState } from "react";
import { AxiosError } from "axios";
import { UserRequestLogin, UserToken } from "../../type";
import { userRequestHandler } from "../../utils/requestHandler";
import Input from "../../components/Input";

type LoginProps = {
  tokenHandler: (token: UserToken) => void;
};

const Login: FC<LoginProps> = ({ tokenHandler }) => {
  const [error, setError] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const usernameInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const [userNameInputError, setUserNameInputError] = useState<boolean>(false);
  const [passwordInputError, setPasswordInputError] = useState<boolean>(false);

  const logInUser = (userName: string, password: string) =>
    userRequestHandler
      .logInUser(userName, password)
      .then((response: UserRequestLogin) => {
        tokenHandler(response.token);
      })
      .catch((err: AxiosError) => {
        setError(true);
        setErrorMsg(err?.message);
      });

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    const userName = usernameInputRef?.current?.value ?? "";
    const password = passwordInputRef?.current?.value ?? "";
    const userNameError = !userName?.length || userName?.length < 3;
    const passwordError = !password?.length || password?.length < 8;
    setUserNameInputError(userNameError);
    setPasswordInputError(passwordError);
    if (userNameError || passwordError) return;
    logInUser(userName, password);
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <Input
          name="userName"
          label="Username"
          type="text"
          refVal={usernameInputRef}
          hasError={userNameInputError}
          errorMsg="userNameInputError"
        />
        <Input
          name="password"
          label="Password"
          type="password"
          refVal={passwordInputRef}
          hasError={passwordInputError}
          errorMsg="passwordInputError"
        />
        <button type="submit">Log in</button>
      </form>
      {error && <p>{errorMsg}</p>}
    </section>
  );
};

export default Login;
