import React from 'react';
import { computed, observable } from "mobx"

export default class Todo {
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