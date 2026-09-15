import "./style.css";
import type { Priority, Task } from "./models/Task";
import { TaskStorage } from "./services/TaskStorage";

const taskForm = document.querySelector<HTMLFormElement>("#task-form")!;
const taskIdInput = document.querySelector<HTMLInputElement>("#task-id")!;
const titleInput = document.querySelector<HTMLInputElement>("#title")!;
const descriptionInput =
  document.querySelector<HTMLTextAreaElement>("#description")!;
const categoryInput = document.querySelector<HTMLInputElement>("#category")!;
const priorityInput = document.querySelector<HTMLSelectElement>("#priority")!;

const searchInput = document.querySelector<HTMLInputElement>("#search")!;
const statusFilter =
  document.querySelector<HTMLSelectElement>("#status-filter")!;
const priorityFilter =
  document.querySelector<HTMLSelectElement>("#priority-filter")!;

const taskList = document.querySelector<HTMLDivElement>("#task-list")!;
const emptyState = document.querySelector<HTMLDivElement>("#empty-state")!;
const taskCounter = document.querySelector<HTMLSpanElement>("#task-counter")!;
const message = document.querySelector<HTMLDivElement>("#message")!;

const formTitle = document.querySelector<HTMLHeadingElement>("#form-title")!;
const submitButton =
  document.querySelector<HTMLButtonElement>("#submit-button")!;
const cancelEditButton =
  document.querySelector<HTMLButtonElement>("#cancel-edit")!;

let tasks: Task[] = TaskStorage.getTasks();

const escapeHTML = (value: string): string => {
  const element = document.createElement("div");
  element.textContent = value;
  return element.innerHTML;
};

const saveAndRender = (): void => {
  TaskStorage.saveTasks(tasks);
  renderTasks();
};

const showMessage = (
  text: string,
  type: "success" | "danger" = "success",
): void => {
  message.textContent = text;
  message.className = `message ${type}`;

  window.setTimeout(() => {
    message.classList.add("hidden");
  }, 2500);
};

const getFilteredTasks = (): Task[] => {
  const searchTerm = searchInput.value.toLowerCase().trim();
  const selectedStatus = statusFilter.value;
  const selectedPriority = priorityFilter.value;

  return tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm);

    const matchesStatus =
      selectedStatus === "all" ||
      (selectedStatus === "completed" && task.completed) ||
      (selectedStatus === "pending" && !task.completed);

    const matchesPriority =
      selectedPriority === "all" || task.priority === selectedPriority;

    return matchesSearch && matchesStatus && matchesPriority;
  });
};

const renderTasks = (): void => {
  const filteredTasks = getFilteredTasks();

  taskList.innerHTML = "";
  emptyState.classList.toggle("hidden", filteredTasks.length > 0);

  taskCounter.textContent =
    filteredTasks.length === 1 ? "1 tarea" : `${filteredTasks.length} tareas`;

  filteredTasks.forEach((task) => {
    const article = document.createElement("article");

    article.className = `task-card ${task.completed ? "task-completed" : ""}`;

    article.innerHTML = `
      <div class="task-content">
        <div class="task-heading">
          <h3>${escapeHTML(task.title)}</h3>

          <span class="priority priority-${task.priority}">
            ${task.priority}
          </span>
        </div>

        <p>${escapeHTML(task.description)}</p>

        <div class="task-meta">
          <span>${escapeHTML(task.category)}</span>
          <span>
            ${task.completed ? "Completada" : "Pendiente"}
          </span>
        </div>
      </div>

      <div class="task-actions">
        <button
          class="complete-button"
          data-action="toggle"
          data-id="${task.id}"
        >
          ${task.completed ? "Reabrir" : "Completar"}
        </button>

        <button
          class="edit-button"
          data-action="edit"
          data-id="${task.id}"
        >
          Editar
        </button>

        <button
          class="delete-button"
          data-action="delete"
          data-id="${task.id}"
        >
          Eliminar
        </button>
      </div>
    `;

    taskList.appendChild(article);
  });
};

const resetForm = (): void => {
  taskForm.reset();
  taskIdInput.value = "";
  priorityInput.value = "media";

  formTitle.textContent = "Nueva tarea";
  submitButton.textContent = "Agregar tarea";
  cancelEditButton.classList.add("hidden");
};

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = titleInput.value.trim();
  const description = descriptionInput.value.trim();
  const category = categoryInput.value.trim();
  const priority = priorityInput.value as Priority;
  const editingId = taskIdInput.value;

  if (!title || !description || !category) {
    showMessage("Completa todos los campos.", "danger");
    return;
  }

  if (editingId) {
    tasks = tasks.map((task) =>
      task.id === editingId
        ? {
            ...task,
            title,
            description,
            category,
            priority,
          }
        : task,
    );

    showMessage("Tarea actualizada correctamente.");
  } else {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      description,
      category,
      priority,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    tasks.unshift(newTask);
    showMessage("Tarea agregada correctamente.");
  }

  resetForm();
  saveAndRender();
});

taskList.addEventListener("click", (event) => {
  const target = event.target as HTMLButtonElement;

  if (!target.matches("button[data-action]")) {
    return;
  }

  const taskId = target.dataset.id;
  const action = target.dataset.action;
  const task = tasks.find((item) => item.id === taskId);

  if (!task) {
    return;
  }

  if (action === "toggle") {
    task.completed = !task.completed;

    showMessage(
      task.completed
        ? "Tarea marcada como completada."
        : "Tarea marcada como pendiente.",
    );
  }

  if (action === "edit") {
    taskIdInput.value = task.id;
    titleInput.value = task.title;
    descriptionInput.value = task.description;
    categoryInput.value = task.category;
    priorityInput.value = task.priority;

    formTitle.textContent = "Editar tarea";
    submitButton.textContent = "Guardar cambios";
    cancelEditButton.classList.remove("hidden");
    titleInput.focus();

    return;
  }

  if (action === "delete") {
    const confirmed = window.confirm(
      `¿Deseas eliminar la tarea "${task.title}"?`,
    );

    if (!confirmed) {
      return;
    }

    tasks = tasks.filter((item) => item.id !== task.id);

    if (taskIdInput.value === task.id) {
      resetForm();
    }

    showMessage("Tarea eliminada correctamente.");
  }

  saveAndRender();
});

cancelEditButton.addEventListener("click", resetForm);
searchInput.addEventListener("input", renderTasks);
statusFilter.addEventListener("change", renderTasks);
priorityFilter.addEventListener("change", renderTasks);

renderTasks();
