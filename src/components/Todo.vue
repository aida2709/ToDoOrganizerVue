<template>
  <div>
    <toolbar></toolbar>

    <div class="global-container">
      <div>
        <p class="title">Manage your to do list</p>
        <p class="subtitle">Click on checkbox or drag and drop to done</p>
      </div>

      <div class="col left">
        <div class="div-options">
          <h4>To-do list</h4>
          <button @click="onAddToDoItemClicked" class="add-btn header-btn"></button>
        </div>

        <hr />

        <div class="card-container">
          <!-- <div class="card" *ngIf="newToDo!=null">
                <label class="label-container">
                    <input type="checkbox" name="IsFinished" [(ngModel)]="newToDo.IsFinished" name="IsFinished" id="newtodo-checkbox">
                    <span class="checkmark"
                        [ngClass]="{'checkmark-unchecked':newToDo.IsFinished != true,'checkmark-checked':newToDo.IsFinished == true}"></span>
                </label>

                <input id="newtodo-title" autofocus type="text" [(ngModel)]="newToDo.Title" (keyup.enter)="addToDo()" (focusout)="addToDo()" 
                    name="Title">
          </div>-->

          <input
            type="file"
            accept=".png, .jpg, .jpeg"
            id="imgupload"
            style="display:none"
            @change="onUploadImageClicked($event)"
          />

          <div class="main-card" v-bind:key="item.Id" v-for="item in todoList">
            <img v-if="item.Image" v-bind:src="item.Image" class="todo-item-image" />

            <div class="card">
              <label class="label-container">
                <input
                  type="checkbox"
                  name="title"
                  v-bind:value="item.IsFinished"
                  v-model="item.IsFinished"
                  @change="onToDoItemStatusChanged(item)"
                />
                <span class="checkmark checkmark-unchecked"></span>
              </label>

              <input
                class="todo-title"
                type="text"
                v-model="item.Title"
                v-on:keyup.enter="editToDo(item)"
                name="Title"
              />

              <button @click="onShowDropDownClicked(item)" class="item-btn"></button>
              <div class="dropdown-content" v-if="showDropdown && item.Id==selectedItemId">
                <div class="dropdown-item">
                  <img src="../assets/icons/image.png" class="dropdown-img" />
                  <a @click="uploadImage(item)" class="dropdown-label">Image</a>
                </div>

                <div class="dropdown-item">
                  <img src="../assets/icons/delete-item.png" class="dropdown-img" />
                  <a @click="onDeleteToDoItemClicked(item)" class="dropdown-label">Delete</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col right">
        <div class="div-options">
          <h4>Done</h4>
          <button @click="onDeleteAllDoneItemsClicked" class="delete-btn header-btn"></button>
        </div>

        <hr />

        <div class="card-container">
          <div class="main-card" v-bind:key="item.Id" v-for="item in doneList">
            <img v-if="item.Image" v-bind:src="item.Image" class="todo-item-image" />

            <div class="card">
              <label class="label-container">
                <input
                  type="checkbox"
                  name="title"
                  v-bind:value="item.IsFinished"
                  v-model="item.IsFinished"
                  @change="onDoneItemStatusChanged(item)"
                />
                <span class="checkmark checkmark-checked"></span>
              </label>

              <p style="display: inline;" class="done-title">{{item.Title}}</p>

              <button @click="onDeleteDoneItemClicked(item)" class="item-btn delete-item"></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Todo",
  data() {
    return {
      todoList: [],
      doneList: [],
      showDropdown: false
    };
  },
  methods: {
    onAddToDoItemClicked() {},
    onUploadImageClicked($event) {},
    onToDoItemStatusChanged(item) {},
    editToDo(item) {},
    onShowDropDownClicked(item) {},
    uploadImage(item) {},
    onDeleteToDoItemClicked(item) {},
    onDeleteAllDoneItemsClicked() {},
    onDoneItemStatusChanged(item) {},
    onDeleteDoneItemClicked(item) {}
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