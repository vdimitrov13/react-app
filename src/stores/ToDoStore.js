import { action, computed, observable } from "mobx"
import fetch from 'isomorphic-fetch';
import axios from 'axios'
import Todo from './Todo'

export class TodoStore {
  @observable todos = []
  @observable filter = ""
  @computed get filteredTodos() {
    var matchesFilter = new RegExp(this.filter, "i")
    return this.todos.filter(todo => !this.filter || matchesFilter.test(todo.value))
  }

  @action getAllToDosFromServer(){
    const ref = this
    axios({
      method : 'get',
      url:'http://localhost:1890/api/note'
    }).then(function(response) {
      response.data.forEach(element => {
        const todo = new Todo(element.id, element.content);
        console.log(todo)
        ref.todos.push(todo)
      }); 
      console.log('response::', response.data);
    }).catch(function(error) {
      console.log('ERROR::', error.data);
    });
  }
  
  createTodo(content) {
    const ref = this
    const note = { content }

    axios({
      method : 'post',
      url:'http://localhost:1890/api/note',
      data: note
    }).then(function(response) {
      const todo = new Todo(response.data.id, content);
      ref.todos.push(todo);
      console.log('response::', response.data);
    }).catch(function(error) {
      console.log('ERROR::', error.data);
    });
  }
   
  deleteToDo(id) {
    var toDoToRemove = this.todos.find(x => x.id === id)
    this.todos.remove(toDoToRemove)
    
    axios({
      method : 'delete',
      url:"http://localhost:1890/api/note/" + id,
      
    }).then(function(response) {
      console.log('response::', response.data);
    }).catch(function(error) {
      console.log('ERROR::', error.data);
    });
  }
  
  clearComplete = () => {
    const incompleteTodos = this.todos.filter(todo => !todo.complete)
    let listToRemove = this.todos.filter(todo => todo.complete).map(x => x.id)

    axios({
      method : 'delete',
      url:'http://localhost:1890/api/note',
      data: { "Ids": listToRemove} 
    }).then(function(response) {
      console.log('response::', response.data);
    }).catch(function(error) {
      console.log('ERROR::', error.data);
    });

    this.todos.replace(incompleteTodos)
  }
}

export default new TodoStore