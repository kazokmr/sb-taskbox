import "./App.css";
import { Provider } from "react-redux";
import store from "./lib/store";
import { InboxScreen } from "./components/InboxScreen";

export const App = () => {
  return (
    <Provider store={store}>
      <InboxScreen />
    </Provider>
  );
};
