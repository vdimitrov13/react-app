import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import TodoList from "./stores/ToDoList"
import ToDoStore from "./stores/ToDoStore";

const test = (<TodoList store = {ToDoStore}/>)

ReactDOM.render(test, document.getElementById("root"));

