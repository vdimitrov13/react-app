import { observable } from "mobx"

export default class Todo {
    @observable value
    @observable id
    @observable complete
    @observable fetched = false
    @observable editable
  
    constructor(id, value) {
      this.value = value
      this.id = id
      this.complete = false
    }
}