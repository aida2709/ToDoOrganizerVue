<template>
  <div>
    <img v-if="item.Image" v-bind:src="item.Image" class="todo-item-image" />

    <div class="card">
      <label class="label-container">
        <input
          type="checkbox"
          name="title"
          v-bind:value="item.IsFinished"
          v-model="item.IsFinished"
          v-on:change="$emit('status-changed',item)"
        />
        <span class="checkmark checkmark-unchecked"></span>
      </label>

      <input
        class="todo-title"
        type="text"
        v-model="item.Title"
        v-on:keyup.enter="$emit('edit-todo', item)"
        name="Title"
      />

      <button @click="onShowDropDownClicked(item)" class="item-btn"></button>
      <div class="dropdown-content" v-if="showDropdown && item.Id==selectedItemId">
        <div class="dropdown-item">
          <i class="material-icons dropdown-img"> image </i>
          <a
            @click="$emit('upload-image', item); onShowDropDownClicked(item);"
            class="dropdown-label"
          >{{ $t('_IMAGE') }}</a>
        </div>

        <div class="dropdown-item">
          <i class="material-icons dropdown-img">
delete_outline
</i>
          <a @click="$emit('delete-todo', item)" class="dropdown-label">{{ $t('_DELETE') }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TodoItem",
  props: ["item"],
  data() {
    return {
      showDropdown: false
    };
  },
  methods: {
    onShowDropDownClicked(item) {
      this.showDropdown = !this.showDropdown;
      this.selectedItemId = item.Id;
    }
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

/*List items*/

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

.item-btn {
  float: right;
  margin-top: -2px;
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
  margin-top: 7px;
  margin-left: 5px;
  margin-right: 5px;
  color: #7f7f7f;
}

/*END Dropdown*/

@media (min-width: 1432px) and (max-width: 1640px) {
  .todo-item-image {
    height: 250px;
  }
  .todo-title,
  .label-container {
    font-size: 14px;
  }
}

@media (min-width: 1641px) {
  .todo-item-image {
    height: 350px;
  }
  .todo-title,
  .label-container {
    font-size: 16px;
  }

  .dropdown-label{
    font-size:12px;
  }

  .checkmark{
    top:2px;
  }
}

@media (max-width: 1115px) {
  .todo-title {
    width: 50%;
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
}
</style>