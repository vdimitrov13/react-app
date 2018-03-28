import React from "react"
import { observer } from "mobx-react"

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

  delete(todo){
    todo.complete = true
    this.props.store.deleteToDo(todo)
  }

  handleEdit(todo){
    if(todo.editable === "hidden"){
      todo.editable = "text"
    }
    else{
      todo.editable = "hidden"
    }
  }

  edit(e){  
    if(e.key === 'Enter'){
      this.props.store.editToDo(e.target.id, e.target.value)
    }
  }
  
  filter(e) {
    this.props.store.filter = e.target.value
  }

  toggleComplete(todo) {
    todo.complete = !todo.complete
  }
  
  render() {
    const { clearComplete, filter, filteredTodos, todos, deleteToDo,
      getAllToDosFromServer, editToDo } = this.props.store
    
    const todoList = filteredTodos.map(todo => (
      <li key={todo.id} className="note">
       <input type="checkbox" onChange={this.toggleComplete.bind(this, todo)} value={todo.complete} checked={todo.complete} />
       <div id="todo-value">{todo.value}</div>&nbsp;&nbsp;
       <button type="button" onClick={this.handleEdit.bind(this, todo)}>Edit</button> 
       <button id="button-delete"type="button" onClick={this.delete.bind(this, todo)}>X</button>
       <input id= {todo.id} className="edit" type={todo.editable} defaultValue={todo.value} onKeyPress={this.edit.bind(this)}/>
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