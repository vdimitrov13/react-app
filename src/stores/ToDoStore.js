import { computed, observable } from "mobx"
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

  edit(value){
     
  }
  
  clearComplete = () => {
    console.log(this.todos.map(s => s.id))
    const incompleteTodos = this.todos.filter(todo => !todo.complete)
    let listToRemove = this.todos.filter(todo => todo.complete).map(x => x.id)
    console.log(listToRemove)

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