// Select All Variables
let myContainer = document.querySelector(".todo-container"),
  theInput = document.querySelector(".add-tasks input"),
  theAddButton = document.querySelector(".add-tasks .plus"),
  tasksContainer = document.querySelector(".tasks-content"),
  tasksCount = document.querySelector(".tasks-count span"),
  tasksCompleted = document.querySelector(".tasks-completed span");
// Focus On Input Field
window.onload = function () {
  theInput.focus();
};

// Adding The Task
let arrayOfTasks = [];
if (localStorage.getItem("tasks")) {
  arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
  getTasksFromLocSto();
}

theAddButton.onclick = function () {
  if (theInput.value !== "") {
    const task = {
      id: Math.random(),
      title: theInput.value,
    };
    arrayOfTasks.push(task);
    checkInput();
    theInput.value = "";
    theInput.focus();
    calculateTasks();
  }
};

function addingTask(arrayOfTasks) {
  noTasksMsg = document.querySelector(".no-tasks-msg");
  if (document.body.contains(document.querySelector(".no-tasks-msg"))) {
    noTasksMsg.remove();
  }
  tasksContainer.innerHTML = "";
  arrayOfTasks.forEach((task) => {
    let mainSpan = document.createElement("span");
    mainSpan.className = "tasks-box";
    mainSpan.setAttribute("data-id", task.id);
    mainSpan.appendChild(document.createTextNode(task.title));
    let mainDelete = document.createElement("span");
    mainDelete.className = "delete";
    mainDelete.appendChild(document.createTextNode("delete"));
    let mainUpdate = document.createElement("span");
    mainUpdate.className = "update";
    mainUpdate.appendChild(document.createTextNode("update"));
    mainSpan.appendChild(mainUpdate);
    mainSpan.appendChild(mainDelete);
    tasksContainer.appendChild(mainSpan);
  });
  let DeleteAll = document.createElement("button");
  DeleteAll.className = "delete-all";
  DeleteAll.appendChild(document.createTextNode("Delete All"));
  tasksContainer.appendChild(DeleteAll);
  let finishAll = document.createElement("button");
  finishAll.className = "finish-all";
  finishAll.appendChild(document.createTextNode("Finish All"));
  tasksContainer.appendChild(finishAll);
}

function getTasksFromLocSto() {
  if (localStorage.getItem("tasks")) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    addingTask(tasks);
  }
}

tasksContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    e.target.parentElement.remove();
    deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
    if (tasksContainer.childElementCount === 2) {
      tasksContainer.innerHTML = "";
      localStorage.clear();
      createNoTasks();
      window.location.reload();
      theInput.focus();
    }
  }
  if (e.target.classList.contains("update")) {
    theInput.value = e.target.parentElement.firstChild.textContent;
    e.target.parentElement.remove();
    deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
  }
  if (e.target.classList.contains("tasks-box")) {
    e.target.classList.toggle("finish");
  }
  if (e.target.classList.contains("delete-all")) {
    tasksContainer.innerHTML = "";
    localStorage.clear();
    createNoTasks();
    window.location.reload();
    theInput.focus();
  }
  if (e.target.classList.contains("finish-all")) {
    document.querySelectorAll(".tasks-content .tasks-box").forEach((ele) => {
      ele.classList.toggle("finish");
    });
  }
  calculateTasks();
});

function deleteTaskWith(taskId) {
  arrayOfTasks = arrayOfTasks.filter((task) => {
    return taskId != task.id;
  });
  localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

function createNoTasks() {
  let msgSpan = document.createElement("span");
  msgSpan.appendChild(document.createTextNode("No Tasks To Show"));
  msgSpan.className = "no-tasks-msg";
  tasksContainer.appendChild(msgSpan);
}

function calculateTasks() {
  tasksCount.innerHTML = document.querySelectorAll(
    ".tasks-content .tasks-box"
  ).length;
  tasksCompleted.innerHTML = document.querySelectorAll(
    ".tasks-content .finish"
  ).length;
}

// function check if there is repeat inputs
function checkInput() {
  let status = true;
  document.querySelectorAll(".tasks-box").forEach((ele) => {
    if (
      theInput.value.toLowerCase() === ele.firstChild.textContent.toLowerCase()
    ) {
      window.alert("The Value Is Repeated");
      status = false;
      window.location.reload();
    }
  });
  if (status === true) {
    addingTask(arrayOfTasks);
    localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
  }
}
