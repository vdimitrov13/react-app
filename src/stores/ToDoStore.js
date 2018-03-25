import { computed, observable } from "mobx"
import fetch from 'isomorphic-fetch';
import axios from 'axios'

class Todo {
  @observable value
  @observable id
  @observable complete
  @observable fetched = false

  constructor(value) {
    this.value = value
    this.id = Date.now()
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

  createTodo(value) {
    this.todos.push(new Todo(value))
    
    axios({
      method : 'post',
      url:'http://localhost:54133/api/note',
      data: {value}
    })
  }

  deleteToDo(value) {
    this.todos.splice(value)
  }

  clearComplete = () => {
    const incompleteTodos = this.todos.filter(todo => !todo.complete)
    this.todos.replace(incompleteTodos)
  }
}

export default new TodoStore