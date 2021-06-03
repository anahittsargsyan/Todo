import { Component } from '@angular/core';
import { Router } from '@angular/router';
interface Todo {
  done: boolean;
  description: string;
  editing: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  done = null;
  count = null;
  title = 'v-todolist';
  todoDescription = '';
  activeFilter = 'all';
  todos: Todo[] = [];

  constructor() {}
  get displayedTodos() {
    this.count = this.todos.filter((todo) => !todo.done).length;
    switch (this.activeFilter) {
      case 'all':
        return this.todos;
      case 'done':
        return this.todos.filter((todo) => todo.done);
      case 'incomplete':
        return this.todos.filter((todo) => !todo.done);
    }
  }

  ngOnInit(): void {
    this.todos = this.getItemsFromStorage();
  }

  addTodo() {
    if (!this.todoDescription) {
      return alert('description required');
    }

    this.todos.push({
      done: false,
      description: this.todoDescription,
      editing: false,
    });

    this.todoDescription = '';
    this.saveItemsToStorage();
  }

  clearCompleted() {
    this.todos = this.todos.filter((todo) => !todo.done);
  }

  removeTodo(i) {
    this.todos.splice(i, 1);
    this.saveItemsToStorage();
  }

  selectAll() {
    let isCheck = false;
    if (this.todos.filter((x) => x.done).length != this.todos.length) {
      isCheck = true;
    }
    this.todos.forEach((item) => {
      item.done = isCheck;
    });
  }
  saveItemsToStorage() {
    localStorage.setItem('items', JSON.stringify(this.todos));
  }

  getItemsFromStorage() {
    const itemsJson = localStorage.getItem('items');
    if (itemsJson) {
      const items = JSON.parse(itemsJson);
      return items;
    }
    return [];
  }
  editTodo(todo) {
    todo.editing = true;
  }

  doneTodo(todo) {
    todo.editing = false;
  }
}
