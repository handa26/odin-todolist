import { projects, tasks, tags } from "./data";

import "./styles.css";

const root = document.getElementById("root");

// Create task logic

// Edit task logic

// Remove task logic

// Detail task logic

// Create project logic

// Render sidebar

// Render tasks item

// Render popup task

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
}

renderPage();
