import { projects, tasks, tags } from "./data";

import "./styles.css";

const root = document.getElementById("root");
const content = document.querySelector(".content");
const ul = document.querySelector("#tags ul");

// Input form
const title = document.getElementById("title");
const desc = document.getElementById("description");
const dueDate = document.getElementById("dueDate");
const priority = document.getElementById("priority");

function generateId(tasks) {
  if (tasks.length === 0) return 1; // Start from 1 if tasks are empty

  const maxId = tasks.reduce((max, task) => (task.id > max ? task.id : max), 0);
  return maxId + 1;
}

// Check status date whether is 'today', 'tomorrow', etc
function checkDueDateStatus(dueDateString) {
  const today = new Date();
  const dueDate = new Date(dueDateString); // Convert "2024-12-18" string into Date obj

  // Normalize dates (remove time for accurate comparison)
  today.setHours(0, 0, 0, 0);
  dueDate.setHours(0, 0, 0, 0);

  const timeDifference = (dueDate - today) / (1000 * 60 * 60 * 24);

  if (timeDifference === 0) {
    return "Today";
  } else if (timeDifference === 1) {
    return "Tomorrow";
  } else if (timeDifference > 1) {
    return "Upcoming";
  } else {
    return "Overdue";
  }
}

// Task instances
class Task {
  constructor(id, title, desc, dueDate, notes, checklist, tags, projects) {
    this.id = id;
    this.title = title;
    this.description = desc;
    this.dueDate = dueDate;
    this.priority = [];
    this.notes = notes;
    this.checklist = checklist;
    this.tags = tags;
    this.projects = projects;
  }

  // Method to toggle the checklist status
  toggleChecklist() {
    this.checklist = !this.checklist;
  }

  setPriority(priority) {
    this.priority.push(priority);
  }
}

// Convert tasks data to Task instances
tasks.map((task) => new Task(
  task.id,
  task.title,
  task.description,
  task.dueDate,
  task.priority,
  task.notes,
  task.checklist,
  task.tags,
  task.projects
));

// Create task logic
function createTask() {
  const newId = generateId(tasks); // Generate unique ID
  const selectedTags = [1]; // Default selecetd tags

  // Validate input
  if (title.value === "") {
    alert("Please fill all input fields.");
    return;
  }

  switch (checkDueDateStatus(dueDate.value)) {
    case "Today":
      selectedTags.push(2);
      break;
    case "Tomorrow":
      selectedTags.push(3);
      break;
    case "Upcoming":
      selectedTags.push(4);
      break;
    default:
      break;
  }

  const newTask = new Task(newId, title.value, desc.value, dueDate.value, "", false, selectedTags, "");
  newTask.setPriority(priority.value);

  // Update the tag categories with the new tasks ID
  selectedTags.map((tag) => {
    if (tag === 1) {
      tags[0].tasks.push(newTask.id);
    } else if (tag === 2) {
      tags[1].tasks.push(newTask.id);
    } else if (tag === 3) {
      tags[2].tasks.push(newTask.id);
    } else if (tag === 4) {
      tags[3].tasks.push(newTask.id);
    }
  });

  console.log(newTask);
  tasks.push(newTask);

  // Rerender UI every time new item added
  renderTasks();
  renderSidebar();
}

// Reset all input form
function resetForm() {
  title.value = "";
  desc.value = "";
  dueDate.value = "";
  priority.value = "";
}

// Edit task logic

// Remove task logic

// Detail task logic

// Create project logic

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
    itemTag.classList.add("item-tag");
    inputCheckbox.type = "checkbox";
    itemContainer.setAttribute("data-id", task.id);
    
    itemLabel.innerText = task.title;
    itemDesc.innerText = task.description;
    inputCheckbox.checked = task.checklist;

    // Display tag title
    tags.map((tag) => {
      if (tag.tasks.includes(task.id)) {
        itemTag.innerText = tag.title;
      }
    })

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

// Render sidebar
function renderSidebar() {
  ul.innerHTML = "";

  tags.map((tag) => {
    const li = document.createElement("li");
    const icon = document.createElement("i");
    const tasksCounter = document.createElement("p");
    const iconText = document.createElement("p");
    
    icon.className = tag.classIcon;
    tasksCounter.classList.add("tasks-counter");

    iconText.innerText = tag.title;
    tasksCounter.textContent = tag.tasks.length;

    ul.appendChild(li);
    li.appendChild(iconText);
    iconText.prepend(icon);
    li.appendChild(tasksCounter);
  });
}

// Render switch category

// Render overall pages
function renderPage() {
  renderSidebar();
  renderCreateTaskModal();
  renderTasks();
}

renderPage();
