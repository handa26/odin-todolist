const projects = [
  {
    id: 1,
    title: "personal",
  },
  {
    id: 2,
    title: "works",
  },
];

const tasks = [
  {
    id: 1,
    title: "Do Homework",
    description: "-",
    dueDate: "2024-12-7",
    priority: ["urgent"],
    notes: "-",
    checklist: false,
    tags: [1, 2],
    projects: ["personal"],
  },
  {
    id: 2,
    title: "Replace lightbulb",
    description: "Need to change kitchen lightbulb",
    dueDate: "2024-12-12",
    priority: [""],
    notes: "-",
    checklist: true,
    tags: [1, 3],
    projects: ["personal"],
  },
];

const tags = [
  {
    id: 1,
    title: "Inbox",
    tasks: [1, 2],
    classIcon: "fa-solid fa-inbox"
  },
  {
    id: 2,
    title: "Today",
    tasks: [1, 2],
    classIcon: "fa-solid fa-calendar-day"
  },
  {
    id: 3,
    title: "Tomorrow",
    tasks: [],
    classIcon: "fa-solid fa-calendar-days"
  },
  {
    id: 4,
    title: "Upcoming",
    tasks: [],
    classIcon: "fa-solid fa-calendar-days"
  },
];

export { projects, tasks, tags };
