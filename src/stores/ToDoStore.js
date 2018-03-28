import { computed, observable } from "mobx"
import axios from 'axios'
import Todo from './Todo'

export class TodoStore {
  @observable todos = []
  @observable filter = ""
  @computed get filteredTodos() {
    var matchesFilter = new RegExp(this.filter, "i")
    return this.todos.filter(todo => !this.filter || matchesFilter.test(todo.value))
  }

  getAllToDosFromServer(){
    const ref = this
    
    axios({
      method : 'get',
      url:'http://localhost:1890/api/note'
    }).then(function(response) {
      response.data.forEach(element => {
        const todo = new Todo(element.id, element.content);
        console.log(todo.id)
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
   
  editToDo(id, value){
    let toDoToEdit= this.todos.filter(x => x.editable === "text");

    var content = {    
      id: id,
      content: value     
    }
    axios({
      method : 'put',
      url:"http://localhost:1890/api/note/",
      data: content
    }).then(function(response) {
      toDoToEdit[0].value = response.data.content
      toDoToEdit[0].editable = "hidden"
      console.log('response::', response.data)
    }).catch(function(error) {
      console.log('ERROR::', error.data);
    });
  }

  deleteToDo(todo) {
    let list = this.todos.filter(todo => !todo.complete)
    console.log(todo.id)

    axios({
      method : 'delete',
      url:"http://localhost:1890/api/note/" + todo.id,
      
    }).then(function(response) {
      console.log('response::', response.data);
    }).catch(function(error) {
      console.log('ERROR::', error.data);
    });
    this.todos.replace(list)
  }
  
  clearComplete = () => {
    let incompleteTodos = this.todos.filter(todo => !todo.complete)
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

export default new TodoStore()