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

        if (!toDoItem.Id)//if item already has its id, do not update it
            toDoItem.Id = this.getNextId();

        let todoList = JSON.parse(localStorage.getItem('todoList'));

        if (!todoList) {
            todoList = [];
        }

        todoList.push(toDoItem);
        localStorage.setItem('todoList', JSON.stringify(todoList));
    },

    addDone(toDoItem) {
        toDoItem.IsFinished = true;
        toDoItem.Position = this.getPositionForDoneItem();

        if (!toDoItem.Id)//if item already has its id, do not update it
            toDoItem.Id = this.getNextId();

        let doneList = JSON.parse(localStorage.getItem('doneList'));

        if (!doneList) {
             doneList = [];
        }

        doneList.push(toDoItem);
        localStorage.setItem('doneList', JSON.stringify(doneList));
    },

    removeToDoItem(toDoItem) {
        let todoList = JSON.parse(localStorage.getItem('todoList'));

        if (todoList) {
            let i = todoList.findIndex(x => x.Id === toDoItem.Id);
            todoList.splice(i, 1);

            if (i < 0)
                return false;

            localStorage.setItem('todoList', JSON.stringify(todoList));
            return true;
        }

        return false;
    },

    removeDoneItem(doneItem) {
        let doneList = JSON.parse(localStorage.getItem('doneList'));

        if (doneList) {
            let i = doneList.findIndex(x => x.Id === doneItem.Id);

            if (i < 0)
                return false;

            doneList.splice(i, 1);
            localStorage.setItem('doneList', JSON.stringify(doneList));
            return true;
        }

        return false;
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
            let i = todoList.findIndex(x => x.Id === editedItem.Id);

            if (i >= 0) {
                todoList.splice(i, 1, editedItem)
                localStorage.setItem('todoList', JSON.stringify(todoList));
            }
        }
    },

    addToDoOnSpecificPosition(toDoItem, index) {
        toDoItem.IsFinished = false;

        if (!toDoItem.Id)//if item already has its id, do not update it
            toDoItem.Id = this.getNextId();

        let todoList=this.getTodoList();

        if (todoList == null || todoList == []) {
             todoList = [];
            toDoItem.Position = 1;
            todoList.push(toDoItem);
        }
        else {
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

        let doneList=this.getDoneList();

        if (doneList == null || doneList == []) {
            doneList = [];
            toDoItem.Position = 1;
            doneList.push(toDoItem);
        }
        else {
            doneList.splice(index, 0, toDoItem);
            //sort items
            let count = doneList.length;
            for (let i = 0; i < count; i++) {
                doneList[i].Position = count - i;
            }
        }

        localStorage.setItem('doneList', JSON.stringify(doneList));
    }
}