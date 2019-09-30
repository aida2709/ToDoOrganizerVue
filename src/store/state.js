export default {
  todoList: JSON.parse(localStorage.getItem('todoList')) || [],
  doneList: JSON.parse(localStorage.getItem('doneList')) || [],
  loggedUser: JSON.parse(localStorage.getItem('loggedUser')),
};
