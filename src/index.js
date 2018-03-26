import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import TodoList from "./stores/ToDoList"
import ToDoStore from "./stores/ToDoStore";
import App from "./App"

const test = (<TodoList store = {ToDoStore}/>)

ReactDOM.render(test, document.getElementById("root"));
registerServiceWorker();
