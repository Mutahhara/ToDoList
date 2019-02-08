(function myToDoList() {
    var toDoListDetails = [];
    var toDoListWrapper = document.getElementById("todo-list-wrapper-id");
    var toDoList = document.getElementById("todo-list-id");


    toDoListWrapper.addEventListener('click', OnClickToDoListWrapper, false); //    Event listener for outer div(event bubbling).

    function OnClickToDoListWrapper(e) {
        var listItemParentDiv = e.target.parentElement.parentElement;
        var targetId = listItemParentDiv.id;
        var todoTextDiv;

        switch (e.target.getAttribute("data-name")) {

            case "check-box":

                toDoListDetails[e.target.parentElement.id].changeCheckedStatus();
                break;


            case "completed-button":

                if (toDoListDetails[targetId].changeCompletedStatus()) {
                    e.target.textContent = "Not Completed";
                    listItemParentDiv.querySelector('[data-name = "todo-text-div"]').className = 'completed-class';
                } else {
                    e.target.textContent = "Completed";
                    listItemParentDiv.querySelector('[data-name = "todo-text-div"]').className = 'todo-text-div';
                }

                break;


            case "delete-button":

                toDoListDetails[targetId].removeElements();

                break;


            case "update-button":

                if (!toDoListDetails[targetId].completedStatus) {
                    textBoxForCloning = document.getElementById("textbox");
                    clonedTextBox = textBoxForCloning.cloneNode(true);
                    todoTextDiv = listItemParentDiv.querySelector('[data-name = "todo-text-div"]');
                    clonedTextBox.value = todoTextDiv.textContent;
                    todoTextDiv.replaceWith(clonedTextBox);
                    //When enter is pressed save text and change html element back to div.
                    clonedTextBox.onkeypress = function (event) {
                        if (event.keyCode === 13) {
                            todoTextDiv.textContent = clonedTextBox.value;
                            clonedTextBox.replaceWith(todoTextDiv);
                            toDoListDetails[targetId].text = todoTextDiv.textContent;
                        }
                    }
                }

                break;
        }

        e.stopPropagation(); //preventing event bubbling after parent level.
    }


    //listening to enter key press on textbox to add elements. 
    textbox.onkeypress = function (event) {
        if (event.keyCode === 13) {
            addElements();
        }
    }

    //Attaching event listener to add button.
    document.getElementById("add").addEventListener('click', addElements);


    document.getElementById("delete-all").addEventListener('click', function onClickDeleteAll() {
        while (toDoList.firstChild) {
            toDoList.firstChild.remove();
        }
        toDoListDetails = [];
    });

    document.getElementById("delete-selected").addEventListener('click', function onClickDeleteSelected() {
        var i;
        for (i = toDoListDetails.length - 1; i >= 0; i--) {
            if (toDoListDetails[i].checkedStatus) {
                toDoListDetails[i].removeElements();
            }
        }
    });

    document.getElementById("delete-completed").addEventListener('click', function onClickDeleteCompleted() {
        var i;
        for (i = toDoListDetails.length - 1; i >= 0; i--) {
            if (toDoListDetails[i].completedStatus) {
                toDoListDetails[i].removeElements();
            }
        }
    });

    function addElements() {
        //checks whether text box is empty or not.
        var toDoText = textbox.value;
        if (toDoText) {
            var listItemTemplate = document.querySelector(".list-item-template");
            // Copy the <li> element and its child nodes
            var clonedListItem = listItemTemplate.cloneNode(true);
            clonedListItem.className = "list-item";
            clonedListItem.setAttribute("id", toDoListDetails.length);
            clonedListItem.querySelector('[data-name="todo-text-div"]').textContent = toDoText;
            // Append the cloned <li> element to <ul> 
            toDoList.appendChild(clonedListItem);

            textbox.value = "";
            //pushing objects into array
            toDoListDetails.push(new SetToDoListDetails(toDoText, toDoListDetails.length, false, false));
        }
    }



    function SetToDoListDetails(text, id, checked, completedStatus) {
        this.text = text;
        this.id = id;
        this.checkedStatus = checked;
        this.completedStatus = completedStatus;
    }


    SetToDoListDetails.prototype.changeCheckedStatus = function () {
        var listItemParentDiv = document.getElementById(this.id);
        this.checkedStatus = listItemParentDiv.querySelector('[data-name = "check-box"]').checked;
    }

    SetToDoListDetails.prototype.changeCompletedStatus = function () {
        var listItemParentDiv = document.getElementById(this.id);
        var listItemParentDivClass = listItemParentDiv.querySelector('[data-name = "todo-text-div"]').className;
        this.completedStatus = listItemParentDivClass === 'todo-text-div';
        return this.completedStatus;
    }

    SetToDoListDetails.prototype.removeElements = function () {
        var id = this.id;
        document.getElementById(id).remove();
        toDoListDetails.splice(id, 1);
        changeIds(id);
    }

    function changeIds(id) {
        var i;
        for (i = id; i < toDoListDetails.length; i++) {
            if (!(toDoListDetails[i].id === i)) {
                toDoListDetails[i].id = i;
                document.getElementById(i + 1).setAttribute("id", i);
            }

        }
    }

})();
