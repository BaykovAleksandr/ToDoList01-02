import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { App } from "./app/App";
import { store } from "./app/store";

import { BrowserRouter } from "react-router";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter basename="/ToDoList">
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
);
