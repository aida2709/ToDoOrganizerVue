import { ADD_TO_DO_ITEM, ADD_DONE_ITEM, REMOVE_TO_DO_ITEM, REMOVE_DONE_ITEM, REMOVE_ALL_DONE_ITEMS, EDIT_TO_DO_ITEM, ADD_TO_DO_ITEM_ON_POSITION, ADD_DONE_ITEM_ON_POSITION, UPDATE_TO_DO_ITEMS, UPDATE_DONE_ITEMS } from '../mutation-types'

function getNextId(state) {
  let id = 1;

  if (state.todoList) {
    state.todoList.map(function (obj) {
      if (obj.Id >= id)
        id = obj.Id + 1;
    });
  }

  if (state.doneList) {
    state.doneList.map(function (obj) {
      if (obj.Id >= id)
        id = obj.Id + 1;
    });
  }

  return id;
}

function getPositionForToDoItem(state) {
  let position = 1;

  if (state.todoList) {
    state.todoList.map(function (obj) {
      if (obj.Position >= position)
        position = obj.Position + 1;
    });
  }

  return position;
}

function getPositionForDoneItem(state) {
  let position = 1;

  if (state.doneList) {
    state.doneList.map(function (obj) {
      if (obj.Position >= position)
        position = obj.Position + 1;
    });
  }

  return position;
}

function sortByPosition(a, b) {
  return b.Position - a.Position;
}

const TodoModule = {
  namespaced: true,
  state: {
    todoList: JSON.parse(localStorage.getItem('todoList')),
    doneList: JSON.parse(localStorage.getItem('doneList')),
  },

  mutations: {
    [ADD_TO_DO_ITEM](state, toDoItem) {
      toDoItem.IsFinished = false;
      toDoItem.Position = getPositionForToDoItem(state);

      if (!toDoItem.Id)//if item already has its id, do not update it
        toDoItem.Id = getNextId(state);

      if (!state.todoList) {
        state.todoList = [];
      }

      state.todoList.push(toDoItem);
      localStorage.setItem('todoList', JSON.stringify(state.todoList));
    },
    [ADD_DONE_ITEM](state, toDoItem) {
      toDoItem.IsFinished = true;
      toDoItem.Position = getPositionForDoneItem(state);

      if (!toDoItem.Id)//if item already has its id, do not update it
        toDoItem.Id = getNextId(state);

      if (!state.doneList) {
        state.doneList = [];
      }

      state.doneList.push(toDoItem);
      localStorage.setItem('doneList', JSON.stringify(state.doneList));
    },
    [REMOVE_TO_DO_ITEM](state, toDoItem) {

      if (state.todoList) {
        const index = state.todoList.findIndex(x => x.Id === toDoItem.Id);

        if (index < 0)
          return;

        state.todoList.splice(index, 1);

        localStorage.setItem('todoList', JSON.stringify(state.todoList));

        state.todoList = JSON.parse(localStorage.getItem('todoList'));
      }
    },
    [REMOVE_DONE_ITEM](state, toDoItem) {
      if (state.doneList) {
        const index = state.doneList.findIndex(x => x.Id === toDoItem.Id);

        if (index < 0)
          return;

        state.doneList.splice(index, 1);

        localStorage.setItem('doneList', JSON.stringify(state.doneList));
      }
    },
    [REMOVE_ALL_DONE_ITEMS](state) {
      localStorage.removeItem('doneList');
      state.doneList = [];
    },
    [EDIT_TO_DO_ITEM](state, editedItem) {
      if (state.todoList) {
        let index = state.todoList.findIndex(x => x.Id === editedItem.Id);
        if (index >= 0) {
          state.todoList.splice(index, 1, editedItem);
          localStorage.setItem('todoList', JSON.stringify(state.todoList));
          state.todoList = JSON.parse(localStorage.getItem('todoList')); //this 'list force refreshing' is done because of file uploading
        }
      }
    },
    [ADD_TO_DO_ITEM_ON_POSITION](state, payload) {
      let toDoItem = payload.toDoItem;
      let index = payload.index;

      toDoItem.IsFinished = false;

      if (!toDoItem.Id)//if item already has its id, do not update it
        toDoItem.Id = getNextId();

      if (!state.todoList.length) {
        state.todoList = [];
        toDoItem.Position = 1;
        state.todoList.push(toDoItem);
      }
      else {
        const foundedIndex = state.todoList.findIndex(x => x.Id === toDoItem.Id);
        if (foundedIndex > -1) {//if item already exist remove it
          state.todoList.splice(foundedIndex, 1);
        }

        state.todoList.splice(index, 0, toDoItem);
        //sort items
        const count = state.todoList.length;
        for (let i = 0; i < count; i++) {
          state.todoList[i].Position = count - i;
        }
      }

      localStorage.setItem('todoList', JSON.stringify(state.todoList));
    },
    [ADD_DONE_ITEM_ON_POSITION](state, payload) {

      let toDoItem = payload.toDoItem;
      let index = payload.index;

      window.console.log(toDoItem);
      window.console.log(index);
      toDoItem.IsFinished = true;


      if (!toDoItem.Id)//if item already has its id, do not update it
        toDoItem.Id = getNextId();

      if (!state.doneList.length) {
        state.doneList = [];
        toDoItem.Position = 1;
        state.doneList.push(toDoItem);
      }
      else {
        const foundedIndex = state.doneList.findIndex(x => x.Id === toDoItem.Id);
        if (foundedIndex > -1) {//if item already exist remove it
          state.doneList.splice(foundedIndex, 1);
        }

        state.doneList.splice(index, 0, toDoItem);
        //sort items
        const count = state.doneList.length;
        for (let i = 0; i < count; i++) {
          state.doneList[i].Position = count - i;
        }
      }

      localStorage.setItem('doneList', JSON.stringify(state.doneList));
    },
    [UPDATE_TO_DO_ITEMS](state, payload) {
      let todoItems = [];

      for (let i = 0; i < payload.length; i++) {
        let item = {
          Id: i+1,
          Title: payload[i].Title,
          Position: payload.length - i,
          IsFinished: false
        }

        todoItems.push(item);
      }

      window.console.log(todoItems);

      localStorage.setItem('todoList', JSON.stringify(todoItems));
      state.todoItems = todoItems.sort(sortByPosition);
    },
    [UPDATE_DONE_ITEMS](state, payload) {
      let doneItems = [];

      for (let i = 0; i < payload.length; i++) {
        let item = {
          Id: i+1,
          Title: payload[i].Title,
          Position: payload.length - i,
          IsFinished: true
        }

        doneItems.push(item);
      }

      window.console.log(doneItems);

      localStorage.setItem('doneList', JSON.stringify(doneItems));
      state.doneList = doneItems.sort(sortByPosition);
    }
  },

  getters: {
    todoList: state => {
      return state.todoList ? state.todoList.sort(sortByPosition) : [];
    },
    doneList: state => {
      return state.doneList ? state.doneList.sort(sortByPosition) : [];
    },
  }
}

export default TodoModule;