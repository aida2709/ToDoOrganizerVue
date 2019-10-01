export default {
    sortByPosition(a, b) {
        return b.Position - a.Position;
    },

    getTodoList() {
        let todoList = JSON.parse(localStorage.getItem('todoList'));

        if (!todoList)
            return null;

        return todoList.sort(this.sortByPosition);
    },

    getDoneList() {
        let doneList = JSON.parse(localStorage.getItem('doneList'));

        if (!doneList)
            return null;

        return doneList.sort(this.sortByPosition);
    },

    addToDo(toDoItem) {
        toDoItem.IsFinished = false;
        toDoItem.Position = this.getPositionForToDoItem();
        toDoItem.Id = this.getNextId();

        let todoList = JSON.parse(localStorage.getItem('todoList'));

        if (!todoList) {
            todoList = [];
        }

        todoList.push(toDoItem);
        localStorage.setItem('todoList', JSON.stringify(todoList));

        return todoList;
    },

    addDone(toDoItem) {
        toDoItem.IsFinished = true;
        toDoItem.Position = this.getPositionForDoneItem();
        toDoItem.Id = this.getNextId();

        let doneList = JSON.parse(localStorage.getItem('doneList'));

        if (!doneList) {
            doneList = [];
        }

        doneList.push(toDoItem);
        localStorage.setItem('doneList', JSON.stringify(doneList));

        return doneList;
    },

    removeToDoItem(toDoItem) {
        let todoList = JSON.parse(localStorage.getItem('todoList'));

        if (todoList) {
            const index = todoList.findIndex(x => x.Id === toDoItem.Id);

            if (index >= 0) {
                todoList.splice(index, 1);
                localStorage.setItem('todoList', JSON.stringify(todoList));
            }
        }

        return todoList;
    },

    removeDoneItem(doneItem) {
        let doneList = JSON.parse(localStorage.getItem('doneList'));

        if (doneList) {
            const index = doneList.findIndex(x => x.Id === doneItem.Id);

            if (index >= 0) {
                doneList.splice(index, 1);
                localStorage.setItem('doneList', JSON.stringify(doneList));
            }
        }

        return doneList;
    },

    removeAllDoneItems() {
        localStorage.removeItem('doneList');
    },

    getNextId() {
        let todoList = JSON.parse(localStorage.getItem('todoList'));
        let doneList = JSON.parse(localStorage.getItem('doneList'));
        let id = 1;

        if (todoList) {
            todoList.map(function (obj) {
                if (obj.Id >= id)
                    id = obj.Id + 1;
            });
        }

        if (doneList) {
            doneList.map(function (obj) {
                if (obj.Id >= id)
                    id = obj.Id + 1;
            });
        }

        return id;
    },

    getPositionForToDoItem() {
        let todoList = JSON.parse(localStorage.getItem('todoList'));
        let position = 1;

        if (todoList) {
            todoList.map(function (obj) {
                if (obj.Position >= position)
                    position = obj.Position + 1;
            });
        }

        return position;
    },

    getPositionForDoneItem() {
        let doneList = JSON.parse(localStorage.getItem('doneList'));
        let position = 1;

        if (doneList) {
            doneList.map(function (obj) {
                if (obj.Position >= position)
                    position = obj.Position + 1;
            });
        }

        return position;
    },

    editToDoItem(editedItem) {
        let todoList = JSON.parse(localStorage.getItem('todoList'));

        if (todoList) {
            let index = todoList.findIndex(x => x.Id === editedItem.Id);

            if (index >= 0) {
                todoList.splice(index, 1, editedItem)
                localStorage.setItem('todoList', JSON.stringify(todoList));
            }
        }

        return todoList;
    },

    addToDoOnSpecificPosition(toDoItem, index) {
        toDoItem.IsFinished = false;

        if (!toDoItem.Id)//if item already has its id, do not update it
            toDoItem.Id = this.getNextId();

        let todoList = this.getTodoList();

        if (!todoList.length) {
            todoList = [];
            toDoItem.Position = 1;
            todoList.push(toDoItem);
        }
        else {
            let foundIndex = todoList.findIndex(x => x.Id === toDoItem.Id);
            if (foundIndex >= 0) {//if item already exist remove it
                todoList.splice(foundIndex, 1);
            }

            todoList.splice(index, 0, toDoItem);
            //sort items
            let count = todoList.length;
            for (let i = 0; i < count; i++) {
                todoList[i].Position = count - i;
            }
        }

        localStorage.setItem('todoList', JSON.stringify(todoList));
    },

    addDoneItemOnSpecificPosition(toDoItem, index) {
        toDoItem.IsFinished = true;

        if (!toDoItem.Id)//if item already has its id, do not update it
            toDoItem.Id = this.getNextId();

        let doneList = this.getDoneList();

        if (!doneList.length) {
            doneList = [];
            toDoItem.Position = 1;
            doneList.push(toDoItem);
        }
        else {
            let foundIndex = doneList.findIndex(x => x.Id === toDoItem.Id);
            if (foundIndex >= 0) {//if item already exist remove it
                doneList.splice(foundIndex, 1);
            }

            doneList.splice(index, 0, toDoItem);
            //sort items
            let count = doneList.length;
            for (let i = 0; i < count; i++) {
                doneList[i].Position = count - i;
            }
        }

        localStorage.setItem('doneList', JSON.stringify(doneList));
    },

    updateTodoList(todoArray) {
        let newTodoList = [];

        if (!todoArray) {
            localStorage.removeItem('doneList');
        }
        else {
            for (let i = 0; i < todoArray.length; i++) {
                let newItem = {
                    Id: i + 1,
                    Title: todoArray[i].Title,
                    Position: todoArray.length-i,
                    Image: todoArray[i].Image,
                    IsFinished: false
                }

                newTodoList.push(newItem);
            }

            localStorage.setItem('todoList', JSON.stringify(newTodoList));
        }

        return newTodoList;
    },

    updateDoneList(doneArray) {
        let newDoneList = [];

        if (!doneArray) {
            localStorage.removeItem('doneList');
        }
        else {
            for (let i = 0; i < doneArray.length; i++) {
                let newItem = {
                    Id: i + 1,
                    Title: doneArray[i].Title,
                    Position: doneArray.length-i,
                    Image: doneArray[i].Image,
                    IsFinished: false
                }

                newDoneList.push(newItem);
            }

            localStorage.setItem('doneList', JSON.stringify(newDoneList));
        }

        return newDoneList;
    }
}