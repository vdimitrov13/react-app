import { computed, observable } from "mobx"
import axios from 'axios'
import Todo from './Todo'
import { ApiCalls, Method } from '../ApiCalls'
import { LOCALHOST_URL } from '../constants'

export class TodoStore {
  @observable todos = []
  @observable filter = ""
  @computed get filteredTodos() {
    var matchesFilter = new RegExp(this.filter, "i")
    return this.todos.filter(todo => !this.filter || matchesFilter.test(todo.value))
  }

  getAllToDosFromServer(){
    ApiCalls.call(Method.GET,
                  this.getAllToDosSuccessCall.bind(this));
  }

  getAllToDosSuccessCall(response) {
    this.todos = response.data.map(element => new Todo(element.id, element.content)); 
  }
  
  createTodo(content) {
    const note = { content }
    ApiCalls.call(Method.POST,
                  this.createToDoSuccessCall.bind(this), 
                  undefined,
                  note);
  }

  createToDoSuccessCall(response){
    const todo = new Todo(response.data.id, response.data.content);
    this.todos.push(todo);
  }
   
  editToDo(id, value){
    const content = {    
      id: id,
      content: value     
    }

    ApiCalls.call(Method.PUT,
                  this.editToDoSuccessCall.bind(this), 
                  undefined,
                  content);
  }

  editToDoSuccessCall(response){
    const toDoToEdit = this.todos.find(x => x.id == response.data.id)
    console.log(response.data)
    toDoToEdit.value = response.data.content  
    toDoToEdit.editable = "hidden"
  }

  deleteToDo(todo) {
    ApiCalls.call(Method.DELETE,
                 this.deleteToDoSuccessCall.bind(this), 
                 todo.id);
    this.todos.remove(todo)
  }

  deleteToDoSuccessCall(response){
    console.log(response)
  }
  
  clearComplete = () => {
    const listToRemove = this.todos.filter(todo => todo.complete).map(x => x.id)
    const data = { Ids : listToRemove} 
    
    ApiCalls.call(Method.DELETE,
                  this.clearCompleteSuccesssCall.bind(this), 
                  undefined,
                  data);    
  }
  
  clearCompleteSuccesssCall(){
    let incompleteTodos = this.todos.filter(todo => !todo.complete)
    this.todos.replace(incompleteTodos)
  }
}

export default new TodoStore()