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
          <button @click="onAddToDoItemClicked" class="add-btn header-btn"></button>
        </div>

        <hr />

        <div class="card-container">
          <div class="card" v-if="newToDo!=null">
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

          <div class="main-card" v-bind:key="item.Id" v-for="item in todoList">
            <TodoItem
              v-bind:item="item"
              v-on:edit-todo="editToDo"
              v-on:upload-image="uploadImage"
              v-on:delete-todo="onDeleteToDoItemClicked"
              v-on:status-changed="onToDoItemStatusChanged"
            />
          </div>
        </div>
      </div>

      <div class="col right">
        <div class="div-options">
          <h4>{{ $t('_DONE_LIST') }}</h4>
          <button @click="onDeleteAllDoneItemsClicked" class="delete-btn header-btn"></button>
        </div>

        <hr />

        <div class="card-container">
          <div class="main-card" v-bind:key="item.Id" v-for="item in doneList">
            <DoneItem 
            v-bind:item="item"
            v-on:status-changed="onDoneItemStatusChanged"
            v-on:delete-item="onDeleteDoneItemClicked"
            />
          </div>
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


export default {
  name: "Todo",
  components: { Toolbar, TodoItem, DoneItem },
  data() {
    return {
      todoList: [],
      doneList: [],
      newToDo: null,
      selectedItemId: null,
      selectedItemForImageUpload: null,
      image:''
    };
  },
  methods: {
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
      this.getToDoList();
    },
    uploadImage(item) {
      this.selectedItemForImageUpload = item;
      document.getElementById("imgupload").click();
    },
    onDeleteToDoItemClicked(item) {
      if (TodoService.removeToDoItem(item)) {
        this.todoList = TodoService.getTodoList();
      }

      this.selectedItemId = null;
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
        this.getDoneList();
      }
    }
  },
  mounted: function() {
    this.todoList = TodoService.getTodoList();
    this.doneList = TodoService.getDoneList();
  }
};
</script>

<style scoped>
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
  background-color: #e6e8ef;
  height: 25px;
  width: 25px;
  border-radius: 50%;
  cursor: pointer;
}

.add-btn {
  background: url("../assets/icons/add.png") no-repeat padding-box center;
  border: 1px solid #e6e8ef;
  background-color: #e6e8ef;
}

.delete-btn {
  background: url("../assets/icons/delete.png") no-repeat padding-box center;
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
  .todo-title,
  .label-container,
  .done-title {
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
  .todo-title,
  .label-container,
  .done-title {
    font-size: 16px;
  }
  h4 {
    font-size: 18px;
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
  .todo-title {
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