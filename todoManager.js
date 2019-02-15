import {
    TodoListItem
} from './todoListItem.js';

import {
    TodoActionBar
} from './todoActionBar.js'

function TodoManager() {
    this.todoListDetails = new Map();
    this.todoList = document.getElementById("todo-list");
}

TodoManager.prototype.init = function () {
    var todoListItem = new TodoListItem();
    var todoActionBar = new TodoActionBar();
    todoListItem.init(this);
    todoActionBar.init(this);
}

TodoManager.prototype.todoListItemRender = function (todoText, todoId, checkedStatus, completedStatus) {
    var todoListItem = new TodoListItem();
    todoListItem.render(todoText, todoId, checkedStatus, completedStatus, this);
}

TodoManager.prototype.addTodoListDetails = function (key, todoListItem) {
    this.todoListDetails.set(key, todoListItem);
}

TodoManager.prototype.deleteTodoListDetails = function (key) {
    this.todoListDetails.delete(key);
}

TodoManager.prototype.clearTodoListDetails = function (key) {
    this.todoListDetails = new Map();
}

TodoManager.prototype.render = function () {

    this.todoList.innerHTML = '';

    for (var [key, value] of this.todoListDetails) {
        this.todoList.appendChild(value.clonedListItem);
    }

}

export {
    TodoManager
};
