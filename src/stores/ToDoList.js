import React from "react"
import { observer } from "mobx-react"
import { autorun } from "mobx";


@observer
export default class TodoList extends React.Component {
  componentDidMount () {
  	this.props.store.getAllToDosFromServer()
  }
  
  createNew(e) {
    if (e.which === 13) {
      this.props.store.createTodo(e.target.value)
      e.target.value = ""
    }
  }

  getAll(){
    this.props.store.getAllToDosFromServer()
  }

  delete(id){
    console.log(id)
    this.props.store.deleteToDo(id)
  }
  
  filter(e) {
    this.props.store.filter = e.target.value
  }

  toggleComplete(todo) {
    todo.complete = !todo.complete
  }

  edit(todo){
    console.log(todo.id);
  }
  
  render() {
    const { clearComplete, filter, filteredTodos, todos, deleteToDo,
      getAllToDosFromServer } = this.props.store
    
    const todoList = filteredTodos.map(todo => (
      <li key={todo.id}>
       <input type="checkbox" onChange={this.toggleComplete.bind(this, todo)} value={todo.complete} checked={todo.complete} />
       <span>{todo.value}</span>&nbsp;
       <button type="button" onClick={this.delete.bind(this, todo.id)}>x</button>
      </li>
    ))
    return <div>
      <h1>ToDo App List</h1>
      <input className="new" onKeyPress={this.createNew.bind(this)} placeholder="Add ToDo"/>
      <input className="filter" value={filter} onChange={this.filter.bind(this)} placeholder="Filter ToDos"/>
      <ul>{todoList}</ul>
      <button type="button" className="delete" onClick={clearComplete}>Clear Completed Todos</button>
    </div>
  }
}