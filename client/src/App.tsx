import store from "./store/store";
import { Provider } from "react-redux";

import LoginForm from "./components/LoginForm";

function App() {
  return (
    <Provider store={store}>
      <div className="">
        <LoginForm />
      </div>
    </Provider>
  );
}

export default App;
