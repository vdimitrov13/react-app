import React from "react"
import { observer } from "mobx-react"
 

@observer
export default class TodoList extends React.Component {
  componentDidMount () {
  	this.props.store.getAllToDosFromServer()
  }
  
  toggleEditable(todo){
    todo.editable = true
  }

  createNew(e) {
    if (e.which === 13) {
      this.props.store.createTodo(e.target.value)
      e.target.value = ""
    }
  }

  delete(id){
    this.props.store.deleteToDo(id)
  }

  handleEdit(todo){
    if(todo.editable === "hidden"){
      todo.editable = "text"
    }
    else{
      todo.editable = "hidden"
    }
  }

  edit(e, todo){  
    if(e.key == 'Enter'){
      console.log(e.target.value)
      console.log(todo) 
    }
    //this.props.store.editToDo(todo)
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
      <li key={todo.id}>
       <input type="checkbox" onChange={this.toggleComplete.bind(this, todo)} value={todo.complete} checked={todo.complete} />
       <div id="todo-value">{todo.value}</div>&nbsp;&nbsp;
       <button type="button" onClick={this.handleEdit.bind(this, todo)}>Edit</button> 
       <button id="button-delete"type="button" onClick={this.delete.bind(this, todo.id)}>X</button>
       <input class="edit" type={todo.editable} defaultValue={todo.value} onClick= {this.edit.bind(this, todo)}/>
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