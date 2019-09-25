todoList: [];
doneList: [];


export default {

    getTodoList() {
        this.todoList = JSON.parse(localStorage.getItem('todoList'));

        if (this.todoList == null)
            return null;

        return this.todoList.sort(function (a, b) {
            return b.Position - a.Position;
        });
    },

    getDoneList() {
        this.doneList = JSON.parse(localStorage.getItem('doneList'));

        if (this.doneList == null)
            return null;

        return this.doneList.sort(function (a, b) {
            return b.Position - a.Position;
        });
    },

    addToDo(toDoItem) {
        toDoItem.IsFinished = false;
        toDoItem.Position = this.getPositionForToDoItem();

        if (!toDoItem.Id)//if item already has its id, do not update it
            toDoItem.Id = this.getNextId();

        this.todoList = JSON.parse(localStorage.getItem('todoList'));

        if (this.todoList == null) {
            this.todoList = [];
        }

        this.todoList.push(toDoItem);
        localStorage.setItem('todoList', JSON.stringify(this.todoList));
    },

    addDone(toDoItem) {
        toDoItem.IsFinished = true;
        toDoItem.Position = this.getPositionForDoneItem();

        if (!toDoItem.Id)//if item already has its id, do not update it
            toDoItem.Id = this.getNextId();

        this.doneList = JSON.parse(localStorage.getItem('doneList'));

        if (this.doneList == null) {
            this.doneList = [];
        }

        this.doneList.push(toDoItem);
        localStorage.setItem('doneList', JSON.stringify(this.doneList));
    },

    removeToDoItem(toDoItem) {
        this.todoList = JSON.parse(localStorage.getItem('todoList'));

        if (this.todoList != null) {
            for (let i = 0; i < this.todoList.length; i++) {
                if (this.todoList[i].Id === toDoItem.Id) {
                    this.todoList.splice(i, 1);
                    localStorage.setItem('todoList', JSON.stringify(this.todoList));
                    return true;
                }
            }

            return false;
        }

        return false;
    },

    removeDoneItem(doneItem) {
        this.doneList = JSON.parse(localStorage.getItem('doneList'));

        if (this.doneList != null) {
            for (let i = 0; i < this.doneList.length; i++) {
                if (this.doneList[i].Id === doneItem.Id) {
                    this.doneList.splice(i, 1);
                    localStorage.setItem('doneList', JSON.stringify(this.doneList));
                    return true;
                }
            }

            return false;
        }

        return false;
    },

    removeAllDoneItems() {
        localStorage.removeItem('doneList');
    },

    getNextId() {
        this.todoList = JSON.parse(localStorage.getItem('todoList'));
        this.doneList = JSON.parse(localStorage.getItem('doneList'));
        let id = 1;

        if (this.todoList != null) {
            this.todoList.map(function (obj) {
                if (obj.Id >= id)
                    id = obj.Id + 1;
            });
        }

        if (this.doneList != null) {
            this.doneList.map(function (obj) {
                if (obj.Id >= id)
                    id = obj.Id + 1;
            });
        }

        return id;
    },

    getPositionForToDoItem() {
        this.todoList = JSON.parse(localStorage.getItem('todoList'));
        let position = 1;

        if (this.todoList != null) {
            this.todoList.map(function (obj) {
                if (obj.Position >= position)
                    position = obj.Position + 1;
            });
        }

        return position;
    },

    getPositionForDoneItem() {
        this.doneList = JSON.parse(localStorage.getItem('doneList'));
        let position = 1;

        if (this.doneList != null) {
            this.doneList.map(function (obj) {
                if (obj.Position >= position)
                    position = obj.Position + 1;
            });
        }

        return position;
    },

    editToDoItem(editedItem) {
        this.todoList = JSON.parse(localStorage.getItem('todoList'));

        if (this.todoList != null) {
            for (let i = 0; i < this.todoList.length; i++) {
                if (this.todoList[i].Id === editedItem.Id) {
                    this.todoList.splice(i, 1, editedItem)
                    localStorage.setItem('todoList', JSON.stringify(this.todoList));
                }
            }
        }
    },

    addToDoOnSpecificPosition(toDoItem, index) {
        toDoItem.IsFinished = false;

        if (!toDoItem.Id)//if item already has its id, do not update it
            toDoItem.Id = this.getNextId();

        this.getTodoList();

        if (this.todoList == null || this.todoList == []) {
            this.todoList = [];
            toDoItem.Position = 1;
            this.todoList.push(toDoItem);
        }
        else {
            this.todoList.splice(index, 0, toDoItem);
            //sort items
            let count = this.todoList.length;
            for (let i = 0; i < count; i++) {
                this.todoList[i].Position = count - i;
            }
        }

        localStorage.setItem('todoList', JSON.stringify(this.todoList));
    },

    addDoneItemOnSpecificPosition(toDoItem, index) {
        toDoItem.IsFinished = true;

        if (!toDoItem.Id)//if item already has its id, do not update it
            toDoItem.Id = this.getNextId();

        this.getDoneList();

        if (this.doneList == null || this.doneList == []) {
            this.doneList = [];
            toDoItem.Position = 1;
            this.doneList.push(toDoItem);
        }
        else {
            this.doneList.splice(index, 0, toDoItem);
            //sort items
            let count = this.doneList.length;
            for (let i = 0; i < count; i++) {
                this.doneList[i].Position = count - i;
            }
        }

        localStorage.setItem('doneList', JSON.stringify(this.doneList));
    }
}