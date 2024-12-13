import { projects, tasks, tags } from "./data";

import "./styles.css";

const root = document.getElementById("root");
const content = document.querySelector(".content");
const title = document.getElementById("title");
const desc = document.getElementById("description");

// Create task logic
function Task(title, desc, checklist, tags) {
  this.title = title;
  this.description = desc;
  this.checklist = checklist;
  this.tags = tags;
}

function createTask() {
  const newTask = new Task(title.value, desc.value, false, [1]);
  if (title.value === "") {
    alert("Please fill all input fields.");
    return;
  }

  tasks.push(JSON.parse(JSON.stringify(newTask)));
  renderTasks();
}

function resetForm() {
  title.value = "";
  desc.value = "";
}

// Edit task logic

// Remove task logic

// Detail task logic

// Create project logic

// Render sidebar

// Render tasks item
function renderTasks() {
  content.innerHTML = "";

  tasks.map((task, index) => {
    const itemContainer = document.createElement("div");
    const itemLabel = document.createElement("label");
    const itemContent = document.createElement("div");
    const inputCheckbox = document.createElement("input");
    const checkmarkSpan = document.createElement("span");
    const itemDesc = document.createElement("p");
    const itemTag = document.createElement("p");

    itemContainer.classList.add("item");
    itemLabel.classList.add("item-label");
    itemContent.classList.add("item-content");
    checkmarkSpan.classList.add("checkmark");
    itemDesc.classList.add("item-desc");
    inputCheckbox.type = "checkbox";
    itemContainer.setAttribute("data-id", task.id);
    
    itemLabel.innerText = task.title;
    itemDesc.innerText = task.description;
    itemTag.innerText = task.tags[0];
    inputCheckbox.checked = task.checklist;

    content.appendChild(itemContainer);
    itemContainer.appendChild(itemLabel);
    itemContainer.appendChild(itemContent);
    itemLabel.appendChild(inputCheckbox);
    itemLabel.appendChild(checkmarkSpan);
    itemContent.appendChild(itemDesc);
    itemContent.appendChild(itemTag);
  });
}

// Render popup task

// Render create task modal
function renderCreateTaskModal() {
  const modal = document.getElementById("myModal");
  const btn = document.getElementById("tags-button");
  const span = document.getElementsByClassName("close")[0];
  const btnAddTask = document.getElementById("btn-add-task");

  btn.onclick = function () {
    modal.style.display = "block";
  };

  span.onclick = function () {
    modal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  btnAddTask.addEventListener("click", () => {
    createTask();
    resetForm();
    modal.style.display = "none";
  });
}

// Render overall pages
function renderSidebar() {
  const ul = document.querySelector("#tags ul");

  tags.map((tag) => {
    const li = document.createElement("li");
    const icon = document.createElement("i");

    icon.className = tag.classIcon;

    li.innerText = tag.title;

    ul.appendChild(li);
    li.prepend(icon);
  });
}

function renderPage() {
  renderSidebar();
  renderCreateTaskModal();
  renderTasks();
}

renderPage();
