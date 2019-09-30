<template>
  <div>
    <img v-if="item.Image" :src="item.Image" class="todo-item-image" />

    <div class="card">
      <label class="label-container">
        <input
          type="checkbox"
          name="title"
          :value="item.IsFinished"
          v-model="item.IsFinished"
          @change="onDoneItemStatusChanged(item)"
        />
        <span class="checkmark checkmark-checked"></span>
      </label>

      <p style="display: inline;" class="done-title">{{item.Title}}</p>

      <button @click="onDeleteDoneItemClicked(item)" class="item-btn delete-item">
        <i class="material-icons">delete_outline</i>
      </button>
    </div>
  </div>
</template>

<script>
import { ADD_TO_DO_ITEM, REMOVE_DONE_ITEM } from "../store/mutation-types";

export default {
  name: "DoneItem",
  props: ["item"],
  methods: {
    onDoneItemStatusChanged(item) {
      this.$store.commit("todoModule/" + REMOVE_DONE_ITEM, item);
      this.$store.commit("todoModule/" + ADD_TO_DO_ITEM, item);
    },
    onDeleteDoneItemClicked(item) {
      this.$store.commit("todoModule/" + REMOVE_DONE_ITEM, item);
    }
  }
};
</script>

<style scoped>
input,
label,
button,
a {
  font-family: "Nunito Sans", sans-serif;
}

input:focus {
  outline: none;
}

/*List items*/

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
  color: #7f7f7f;
}

.todo-title {
  border: none;
  width: 80%;
  text-overflow: ellipsis;
}

/*END List items*/

@media (min-width: 1432px) and (max-width: 1640px) {
  .todo-item-image {
    height: 250px;
  }
  .label-container,
  .done-title {
    font-size: 14px;
  }
}

@media (min-width: 1641px) {
  .todo-item-image {
    height: 350px;
  }

  .label-container,
  .done-title {
    font-size: 16px;
  }
  h4 {
    font-size: 18px;
  }
}

@media (max-width: 1400px) {
  .material-icons {
    font-size: 20px !important;
  }

  .item-btn {
    margin-top: -2px;
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