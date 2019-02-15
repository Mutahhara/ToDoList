function TodoListItem(todoText, todoId, checkedStatus, completedStatus, clonedListItem) {
    this.todoText = todoText;
    this.todoId = todoId;
    this.checkedStatus = false;
    this.completedStatus = false;
    this.clonedListItem = clonedListItem;
}

TodoListItem.prototype.init = function (todoManager) {
    var todoListWrapper = document.getElementById("todo-list");
    var that = this;
    todoListWrapper.addEventListener('click', function () {
        that.onClickTodoListWrapper(event, todoManager);
    }, false); // Event listener for outer div(event bubbling).
}

TodoListItem.prototype.render = function (todoText, todoId, checkedStatus, completedStatus, todoManager) {
    var listItemTemplate,
        clonedListItem,
        todoTextDiv;
    if (todoText) {
        listItemTemplate = document.querySelector(".list-item-template");
        clonedListItem = listItemTemplate.cloneNode(true); //cloning
        todoTextDiv = clonedListItem.querySelector('[data-name = "todo-text-div"]');
        clonedListItem.className = "list-item";
        clonedListItem.setAttribute("todo-id", todoId);
        todoTextDiv.textContent = todoText;
        todoManager.addTodoListDetails(todoId, new TodoListItem(todoText, todoId, checkedStatus, completedStatus, clonedListItem));
        todoManager.render();
    }
}

TodoListItem.prototype.onClickTodoListWrapper = function (e, todoManager) {

    var targetId;

    var listItemParentDiv = (function findClosestListItemParentDiv() {
        var element = e.target;
        while (element.getAttribute("data-name") !== "list-item") {

            element = element.parentElement;
        }
        targetId = parseInt(element.getAttribute("todo-id"));
        return element;
    })();

    var clonedListItem = listItemParentDiv.cloneNode(true);
    var textBoxForCloning = document.getElementById("textbox");
    var clonedTextBox = textBoxForCloning.cloneNode(true);
    var todoTextDiv = clonedListItem.querySelector('[data-name = "todo-text-div"]');

    switch (e.target.getAttribute("data-name")) {

        case "check-box":

            todoManager.todoListDetails.get(targetId).changeCheckedStatus();
            break;


        case "completed-button":

            if (todoManager.todoListDetails.get(targetId).changeCompletedStatus(listItemParentDiv)) {

                todoTextDiv.className = 'completed-class';
                clonedListItem.querySelector('[data-name = "completed-button"]').innerHTML = 'Not Completed';
                todoManager.todoListDetails.get(targetId).clonedListItem = clonedListItem;
                //                todoManager.render();
            } else {

                todoTextDiv.className = 'todo-text-div';
                clonedListItem.querySelector('[data-name = "completed-button"]').innerHTML = 'Completed';
                todoManager.todoListDetails.get(targetId).clonedListItem = clonedListItem;
                //                todoManager.render();
            }
            todoManager.render();
            break;


        case "delete-item-button":

            todoManager.deleteTodoListDetails(targetId);
            todoManager.render();

            break;


        case "update-item-button":

            if (!todoManager.todoListDetails.get(targetId).completedStatus) {

                clonedTextBox.value = todoTextDiv.textContent;
                todoTextDiv.replaceWith(clonedTextBox);
                todoManager.todoListDetails.get(targetId).clonedListItem = clonedListItem;
                todoManager.render();

                //When enter is pressed save text and change html element back to div.
                clonedTextBox.onkeypress = function (event) {
                    if (event.keyCode === 13) {

                        listItemParentDiv.querySelector('[data-name = "todo-text-div"]').textContent = clonedTextBox.value;
                        todoManager.todoListDetails.get(targetId).todoText = todoTextDiv.textContent;
                        todoManager.todoListDetails.get(targetId).clonedListItem = listItemParentDiv;
                        todoManager.render();
                    }
                }
            }

            break;
    }

    e.stopPropagation(); //preventing event bubbling after parent level.
}

TodoListItem.prototype.changeCheckedStatus = function () {

    this.checkedStatus = !this.checkedStatus;
}

TodoListItem.prototype.changeCompletedStatus = function (listItemParentDiv) {

    var listItemParentDivClass = listItemParentDiv.querySelector('[data-name = "todo-text-div"]').className;
    this.completedStatus = (listItemParentDivClass === 'todo-text-div');
    return this.completedStatus;

}

export {
    TodoListItem
};
