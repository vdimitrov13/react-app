import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

import { Provider } from "mobx-react";
import UiStore from "./stores/UiStore";

import TodoList from "./stores/ToDoList"
import ToDoStore from "./stores/ToDoStore";
import Test from "./stores/Test"

const Root = (
  <Provider UiStore={UiStore}>
    <App />
  </Provider>
);
const test = (<TodoList store = {ToDoStore}/>)

ReactDOM.render(test, document.getElementById("root"));
registerServiceWorker();
