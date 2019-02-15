function TodoActionBar() {}
TodoActionBar.prototype.init = function (todoManager) {
    var that = this;
    document.getElementById("add").addEventListener('click', function () {
        that.addElements(todoManager);
    });

    textbox.onkeypress = function (event) {
        if (event.keyCode === 13) {
            that.addElements(todoManager);
        }
    }

    document.getElementById("delete-all").addEventListener('click', function () {
        that.onClickDeleteAll(todoManager);
    });

    document.getElementById("delete-selected").addEventListener('click', function () {
        that.onClickDeleteSelected(todoManager);
    });

    document.getElementById("delete-completed").addEventListener('click', function () {
        that.onClickDeleteCompleted(todoManager)
    });
}

TodoActionBar.prototype.render = function () {

}

TodoActionBar.prototype.addElements = function (todoManager) {
    //checks whether text box is empty or not.
    var todoText = textbox.value;
    var todoId = new Date().getTime();
    var checkedStatus = false;
    var completedStatus = false;
    textbox.value = "";
    todoManager.todoListItemRender(todoText, todoId, checkedStatus, completedStatus);

}

TodoActionBar.prototype.onClickDeleteAll = function (todoManager) {
    todoManager.clearTodoListDetails();
    todoManager.render();

}

TodoActionBar.prototype.onClickDeleteSelected = function (todoManager) {
    for (var [key, value] of todoManager.todoListDetails) {
        if (value.checkedStatus) {
            todoManager.deleteTodoListDetails(key);
        }
    }
    todoManager.render();
}

TodoActionBar.prototype.onClickDeleteCompleted = function (todoManager) {
    for (var [key, value] of todoManager.todoListDetails) {
        if (value.completedStatus) {
            todoManager.deleteTodoListDetails(key);
        }
    }
    todoManager.render();
}

export {
    TodoActionBar
};
