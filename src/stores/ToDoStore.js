import { computed, observable } from "mobx"
import fetch from 'isomorphic-fetch';
import axios from 'axios'

class Todo {
  @observable value
  @observable id
  @observable complete
  @observable fetched = false

  constructor(id, value) {
    this.value = value
    this.id = id
    this.complete = false
  }
}

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
      url:'http://localhost:54133/api/note',
      data: note
    }).then(function(response) {
      ref.todos.push(new Todo(response.data.id, content))
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
      url:'http://localhost:54133/api/note',
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