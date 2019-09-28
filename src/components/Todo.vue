<template>
  <div>
    <Toolbar></Toolbar>

    <div class="global-container">
      <div>
        <p class="title">{{ $t('_MANAGE_TO_DO_LIST') }}</p>
        <p class="subtitle">{{ $t('_SUBTITLE_CLICK_ON_CHECKBOX') }}</p>
      </div>

      <div class="col left">
        <div class="div-options">
          <h4>{{ $t('_TODO_LIST') }}</h4>
          <i class="material-icons add-btn header-btn" @click="onAddToDoItemClicked">add</i>
        </div>

        <hr />

        <div class="card-container">
          <div class="card" v-if="newToDo">
            <label class="label-container">
              <input
                type="checkbox"
                name="IsFinished"
                v-bind:value="newToDo.IsFinished"
                v-model="newToDo.IsFinished"
                id="newtodo-checkbox"
              />
              <span
                class="checkmark"
                v-bind:class="{'checkmark-unchecked':!newToDo.IsFinished, 'checkmark-checked':newToDo.IsFinished}"
              ></span>
            </label>

            <input
              id="newtodo-title"
              autofocus
              type="text"
              v-model="newToDo.Title"
              v-on:keyup.enter="addToDo"
              @focusout="addToDo"
              name="Title"
            />
          </div>

          <input
            type="file"
            accept=".png, .jpg, .jpeg"
            id="imgupload"
            style="display:none"
            @change="onUploadImageClicked($event)"
          />

          <draggable
            class="list-group"
            tag="div"
            v-model="todoList"
            v-bind="dragOptions"
            :move="onMove"
            @start="isDragging=true"
            @end="isDragging=false"
          >
            <transition-group type="transition" :name="'flip-list'">
              <div class="main-card" v-bind:key="item.Id" v-for="item in todoList">
                <TodoItem
                  v-bind:item="item"
                  v-on:edit-todo="editToDo"
                  v-on:upload-image="uploadImage"
                  v-on:delete-todo="onDeleteToDoItemClicked"
                  v-on:status-changed="onToDoItemStatusChanged"
                />
              </div>
            </transition-group>
          </draggable>
        </div>
      </div>

      <div class="col right">
        <div class="div-options">
          <h4>{{ $t('_DONE_LIST') }}</h4>
          <i
            class="material-icons delete-btn header-btn"
            @click="onDeleteAllDoneItemsClicked"
          >delete_sweep</i>
        </div>

        <hr />

        <div class="card-container">
          <draggable element="div" v-model="doneList" v-bind="dragOptions" :move="onMove">
            <transition-group name="no" class="list-group" tag="div">
              <div class="main-card" v-bind:key="item.Id" v-for="item in doneList">
                <DoneItem
                  v-bind:item="item"
                  v-on:status-changed="onDoneItemStatusChanged"
                  v-on:delete-item="onDeleteDoneItemClicked"
                />
              </div>
            </transition-group>
          </draggable>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Toolbar from "./Toolbar";
import TodoService from "../services/ToDoService";
import TodoItem from "./TodoItem";
import DoneItem from "./DoneItem";
import draggable from "vuedraggable";

export default {
  name: "Todo",
  components: { Toolbar, TodoItem, DoneItem, draggable },
  data() {
    return {
      todoList: [],
      doneList: [],
      newToDo: null,
      selectedItemForImageUpload: null,
      image: "",
      editable: true,
      isDragging: false,
      delayedDragging: false
    };
  },
  methods: {
    onMove({ relatedContext, draggedContext }) {
      const relatedElement = relatedContext.element;
      const draggedElement = draggedContext.element;

      /*  window.console.log(relatedContext);
      window.console.log(draggedContext);  */

      let listElement = {
        Id: draggedElement.Id,
        Title: draggedElement.Title,
        Position: draggedElement.Position,
        IsFinished: draggedElement.IsFinished
      };

      //if dragging is in the same list
      if (relatedElement.IsFinished == draggedElement.IsFinished) {
        if (draggedElement.IsFinished) {
          TodoService.removeDoneItem(listElement);
          TodoService.addDoneItemOnSpecificPosition(
            listElement,
            draggedContext.futureIndex
          );
        } else {
          TodoService.removeToDoItem(listElement);
          TodoService.addToDoOnSpecificPosition(
            listElement,
            draggedContext.futureIndex
          );
        }
      } else {
        if (!relatedElement) {
          //if list to drag element is empty
          if (draggedElement.IsFinished) {
            TodoService.removeDoneItem(listElement);
            TodoService.addToDo(listElement);
          } else {
            TodoService.removeToDoItem(listElement);
            TodoService.addDone(listElement);
          }
        } else {
          if (draggedElement.IsFinished == false) {
            window.console.log("remove TODO add DONE");
            TodoService.removeToDoItem(listElement);
            listElement.IsFinished = true;

            TodoService.addDoneItemOnSpecificPosition(
              listElement,
              draggedContext.futureIndex
            );
          } else {
            window.console.log("remove DONE add TODO");

            TodoService.removeDoneItem(listElement);
            listElement.IsFinished = false;

            window.console.log(listElement);
            window.console.log(draggedContext.futureIndex);
            TodoService.addToDoOnSpecificPosition(
              listElement,
              draggedContext.futureIndex
            );
          }
        }
      }

      return (
        (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
      );
    },

    addToDo() {
      if (
        !this.newToDo ||
        !this.newToDo.Title ||
        this.newToDo.Title.trim() == ""
      ) {
        this.newToDo = null;
        return;
      }

      if (this.newToDo.IsFinished) {
        TodoService.addDone(this.newToDo);
        this.doneList = TodoService.getDoneList();
      } else {
        TodoService.addToDo(this.newToDo);
        this.todoList = TodoService.getTodoList();
      }

      this.newToDo = null;
    },
    onAddToDoItemClicked() {
      this.newToDo = {
        Title: "",
        IsFinished: false
      };
    },
    onUploadImageClicked(event) {
      if (!this.selectedItemForImageUpload) {
        return;
      }

      let reader = new FileReader();
      let file = event.target.files[0];

      if (event.target.files && event.target.files[0]) {
        reader.readAsDataURL(file);

        reader.onload = () => {
          this.image = reader.result;
          this.selectedItemForImageUpload.Image = this.image.toString();
          TodoService.editToDoItem(this.selectedItemForImageUpload);
          this.todoList = TodoService.getTodoList();
        };
      }
    },
    onToDoItemStatusChanged(item) {
      if (TodoService.removeToDoItem(item)) {
        TodoService.addDone(item);
        this.todoList = TodoService.getTodoList();
        this.doneList = TodoService.getDoneList();
      }
    },
    editToDo(item) {
      TodoService.editToDoItem(item);
      this.todoList = TodoService.getTodoList();
      this.doneList = TodoService.getDoneList();
    },
    uploadImage(item) {
      this.selectedItemForImageUpload = item;
      document.getElementById("imgupload").click();
    },
    onDeleteToDoItemClicked(item) {
      if (TodoService.removeToDoItem(item)) {
        this.todoList = TodoService.getTodoList();
      }
    },
    onDeleteAllDoneItemsClicked() {
      TodoService.removeAllDoneItems();
      this.doneList = TodoService.getDoneList();
    },
    onDoneItemStatusChanged(item) {
      if (TodoService.removeDoneItem(item)) {
        TodoService.addToDo(item);
        this.todoList = TodoService.getTodoList();
        this.doneList = TodoService.getDoneList();
      }
    },
    onDeleteDoneItemClicked(item) {
      if (TodoService.removeDoneItem(item)) {
        this.doneList = TodoService.getDoneList();
      }
    }
  },
  mounted: function() {
    this.todoList = TodoService.getTodoList();
    this.doneList = TodoService.getDoneList();
  },
  computed: {
    dragOptions() {
      return {
        animation: 0,
        group: "description",
        disabled: !this.editable,
        ghostClass: "ghost"
      };
    },
    listString() {
      return JSON.stringify(this.todoList, null, 2);
    },
    list2String() {
      return JSON.stringify(this.doneList, null, 2);
    }
  },
  watch: {
    isDragging(newValue) {
      if (newValue) {
        this.delayedDragging = true;
        return;
      }
      this.$nextTick(() => {
        this.delayedDragging = false;
      });
    }
  }
};
</script>


<style scoped>
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
input,
label,
button,
a {
  font-family: "Nunito Sans", sans-serif !important;
}

input:focus {
  outline: none !important;
}

/* List positioning */

.global-container {
  margin-left: 250px;
  margin-right: 250px;
  position: relative;
  margin-top: 40px;
  margin-bottom: 140px;
  height: 100vh;
  text-align: left;
}

.title {
  font-weight: bold;
  margin-bottom: 2px;
}

.subtitle {
  font-size: 12px;
  padding: 0;
  margin-top: 0;
  margin-bottom: 25px;
  color: gray;
}

.col {
  width: 49%;
  padding: 20px;
  position: absolute;
  background-color: #f5f6fa;
  min-height: 100vh;
  border-radius: 10px;
  margin-bottom: 50px;
  /* overflow-y: overlay; 
     height: 100vh;*/
}

.left {
  float: left;
}

.right {
  float: right;
  left: 54%;
}

/*END List positioning */

/*List header*/

.div-options {
  margin-bottom: 20px;
}

hr {
  background-color: #e2e2e6;
  border: 0.5px solid #e2e2e6;
}

h4 {
  margin: 0;
  display: inline;
}

.header-btn {
  position: absolute;
  float: right;
  right: 22px;
  height: 25px;
  width: 25px;
  border-radius: 50%;
  cursor: pointer;
  color: #66676a;
}

.add-btn {
  border: 1px solid #e6e8ef;
  background-color: #e6e8ef;
}

.delete-btn {
  border: none !important;
}

/*END List header*/

/*List items*/

.card-container {
  margin-top: 20px;
  text-align: left;
}

.main-card {
  background: white;
  border-radius: 10px;
  cursor: pointer;
}

.card {
  margin: 10px 0;
  padding: 10px;
  font-size: 13px;
  background: white;
  border-radius: 10px;
  cursor: pointer;
}

.todo-item-image {
  width: 100%;
  height: 200px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.done-title {
  color: #8b8b8b;
}

.item-btn {
  float: right;
  margin-top: -5px;
  background: url("../assets/icons/more.png") no-repeat padding-box center;
  background-color: transparent;
  border: none;
  height: 25px;
  width: 25px;
  border-radius: 50%;
  cursor: pointer;
}

.card-checkbox {
  background: url("../assets/icons/checkbox-active.png") no-repeat padding-box
    center;
}

/*Checkbox*/

.label-container {
  position: relative;
  padding-left: 26px;
  font-size: 12px;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Hide the browser's default checkbox */

.label-container input[type="checkbox"] {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding: 0;
}

.checkmark {
  position: absolute;
  left: 0;
  height: 18px;
  width: 18px;
}

.checkmark-unchecked {
  background-image: url("../assets/icons/checkbox.png");
}

.checkmark-checked {
  background-image: url("../assets/icons/checkbox-active.png");
}

.label-container:hover input ~ .checkmark {
  background-color: transparent;
}

.label-container input:checked ~ .checkmark {
  background-color: transparent;
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/*END Checkbox*/

#newtodo-title {
  font-size: 13px;
  border: none;
  width: 87%;
}

#newtodo-title :focus {
  border: none;
}

#newtodo-title :checked {
  border: none;
}

.delete-item {
  background: url("../assets/icons/delete-item.png") no-repeat padding-box
    center;
}

.todo-title {
  border: none;
  width: 80%;
  text-overflow: ellipsis;
}

/*END List items*/

/*Dropdown*/

.dropdown-content {
  width: 150px;
  position: absolute;
  right: 35px;
  background-color: white;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.dropdown-label {
  padding: 12px 16px;
  font-size: 10px;
  font-weight: bold;
  text-decoration: none;
  display: block;
  color: #7f7f7f;
}

.dropdown-item {
  border-bottom: 1px solid #e6e8ef;
  cursor: pointer;
}

.dropdown-img {
  float: left;
  margin-top: 10px;
  margin-left: 5px;
  margin-right: 5px;
}

/*END Dropdown*/

@media (min-width: 1432px) and (max-width: 1640px) {
  .todo-item-image {
    height: 250px;
  }

  #newtodo-title {
    font-size: 14px;
  }
  h4 {
    font-size: 18px;
  }
}

@media (min-width: 1641px) {
  .todo-item-image {
    height: 350px;
  }
  #newtodo-title {
    font-size: 16px;
  }
  h4 {
    font-size: 18px;
  }
  .header-btn {
    font-size: 24px;
    padding: 3px;
  }

  .checkmark {
    top: -2px;
  }
}

@media (min-width: 1407px) {
  .col {
    width: 47%;
  }
}

@media (min-width: 1020px) {
  .col {
    width: 44%;
  }
}

@media (min-width: 1700px) {
  .col {
    width: 48%;
  }

  .right {
    right: 0;
  }
}

@media (max-width: 1115px) {
  #newtodo-title {
    width: 50%;
  }
}

@media (max-width: 1215px) {
  .global-container {
    margin-left: 180px;
    margin-right: 180px;
  }
}

@media (max-width: 1215px) and (min-width: 601px) {
  .global-container {
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 0px;
  }
  h4 {
    font-size: 14px;
  }
  .right {
    left: 52%;
  }
}

@media (max-width: 1020px) {
  .col {
    width: 44%;
  }
  .right {
    left: 51%;
  }
}

@media (max-width: 1215px) and (min-width: 880px) {
  .todo-item-image {
    height: 240px;
  }
}

@media (max-width: 700px) {
  .todo-item-image {
    height: 250px;
  }

  .global-container {
    margin-left: 10px;
    margin-right: 10px;
  }

  .col {
    min-height: fit-content;
  }

  .right {
    left: 0;
    float: left;
  }

  .left,
  .right {
    width: 92%;
    position: relative;
  }
}
</style>