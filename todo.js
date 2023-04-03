let todoList = [];

function addTask(event) {
  event.preventDefault();
  const newTaskInput = document.getElementById("todo-input");
  const newTaskText = newTaskInput.value.trim();
  if (newTaskText !== "") {
    const newTask = {
      id: Date.now(),
      text: newTaskText,
      completed: false,
    };
    todoList.push(newTask);
    newTaskInput.value = "";
    renderTodoList();
  }
}

function toggleTaskCompleted(taskId) {
  const task = todoList.find((task) => task.id === taskId);
  task.completed = !task.completed;
  renderTodoList();
}

function deleteTask(taskId) {
  todoList = todoList.filter((task) => task.id !== taskId);
  renderTodoList();
}

function renderTodoList() {
  const todoListEl = document.getElementById("todo-list");
  todoListEl.innerHTML = "";
  for (let i = 0; i < todoList.length; i++) {
    const task = todoList[i];
    const taskEL = document.createElement("li");
    const taskText = document.createElement("span");
    taskText.innerText = task.text;
    if (task.completed) {
      taskText.classList.add("completed");
    }
    taskEL.appendChild(taskText);
    const taskButton = document.createElement("div");
    const completeButton = document.createElement("button");
    completeButton.innerText = task.completed ? "undo" : "completed";
    completeButton.addEventListener("click", () =>
      toggleTaskCompleted(task.id)
    );

    taskButton.appendChild(completeButton);
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "delete";
    deleteButton.addEventListener("click", () => deleteTask(task.id));
    taskButton.appendChild(deleteButton);
    taskEL.appendChild(taskButton);
    todoListEl.appendChild(taskEL);
  }
}

const todoForm = document.getElementById("todo-form");
todoForm.addEventListener("submit", addTask);
renderTodoList();
