import { FC, useState } from "react";

import { useAppDispatch } from "../store/hooks/UseDispatch";
import { useAppSelector } from "../store/hooks/UseSelector";

import { RootState } from "../store/store";
import { fetchUsers } from "../store/slices/users/thunks/fetchUsers";
import { registration } from "../store/slices/user/thunks/registration";
import { login } from "../store/slices/user/thunks/login";

const LoginForm: FC = () => {
  const users = useAppSelector((state: RootState) => state.users);
  const user = useAppSelector((state: RootState) => state.user);

  const dispatch = useAppDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleCleanForm = () => {
    setEmail("");
    setPassword("");
  };

  const handleClick = () => dispatch(fetchUsers());

  const handleLoginSubmit = () => {
    dispatch(login({ email, password }));
    handleCleanForm();
  };
  const handleRewgistrationSubmit = () => {
    dispatch(registration({ email, password }));
    handleCleanForm();
  };

  console.log("user ", user);

  return (
    <div>
      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="text"
        placeholder="Email"
      />
      <br />
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
        placeholder="Password"
      />
      <br />
      <button onClick={handleRewgistrationSubmit}>Registration</button>
      <br />
      <button onClick={handleLoginSubmit}>Login</button>
      <br />
      <button onClick={handleClick}>fetch</button>
      <div>
        {user.refreshToken}
        {user.accessToken}
        {user.user?.email}
      </div>
    </div>
  );
};

export default LoginForm;
