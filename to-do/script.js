let tasks = [];
let completedTasks = [];
let editId = null;

// Utility to format date & time
function formatDateTime(dt) {
  return dt.toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' });
}

function renderLists() {
  // Render Pending Tasks
  const pendingUl = document.getElementById('pendingTasks');
  pendingUl.innerHTML = '';
  tasks.forEach((task, idx) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span class="task-text">
        <strong>${task.text}</strong>
        <div class="task-desc">${task.desc || ''}</div>
      </span>
      <span class="task-meta">added: ${formatDateTime(new Date(task.created))}</span>
      <span class="action-btns">
        <button class="complete-btn" onclick="completeTask(${idx})">Complete</button>
        <button class="edit-btn" onclick="editTask(${idx})">Edit</button>
        <button class="delete-btn" onclick="deleteTask(${idx}, false)">Delete</button>
      </span>
    `;
    pendingUl.appendChild(li);
  });

  // Render Completed Tasks
  const completedUl = document.getElementById('completedTasks');
  completedUl.innerHTML = '';
  completedTasks.forEach((task, idx) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span class="task-text">
        <strong>${task.text}</strong>
        <div class="task-desc">${task.desc || ''}</div>
      </span>
      <span class="task-meta">completed: ${formatDateTime(new Date(task.completed))}</span>
      <span class="action-btns">
        <button class="edit-btn" onclick="editTask(${idx}, true)">Edit</button>
        <button class="delete-btn" onclick="deleteTask(${idx}, true)">Delete</button>
      </span>
    `;
    completedUl.appendChild(li);
  });
}

function addTask() {
  const input = document.getElementById('taskInput');
  const descInput = document.getElementById('descInput');
  const text = input.value.trim();
  const desc = descInput.value.trim();
  if (!text) return;
  const now = Date.now();
  if (editId !== null) {
    // Edit
    if (editId.type === "pending") {
      tasks[editId.idx].text = text;
      tasks[editId.idx].desc = desc;
    } else {
      completedTasks[editId.idx].text = text;
      completedTasks[editId.idx].desc = desc;
    }
    editId = null;
  } else {
    tasks.push({ text, desc, created: now });
  }
  input.value = '';
  descInput.value = '';
  renderLists();
}

function completeTask(idx) {
  const now = Date.now();
  const [task] = tasks.splice(idx, 1);
  task.completed = now;
  completedTasks.push(task);
  renderLists();
}

function deleteTask(idx, isCompleted) {
  if (isCompleted) {
    completedTasks.splice(idx, 1);
  } else {
    tasks.splice(idx, 1);
  }
  renderLists();
}

function editTask(idx, isCompleted = false) {
  const input = document.getElementById('taskInput');
  const descInput = document.getElementById('descInput');
  if (isCompleted) {
    input.value = completedTasks[idx].text;
    descInput.value = completedTasks[idx].desc;
    editId = { type: "completed", idx };
  } else {
    input.value = tasks[idx].text;
    descInput.value = tasks[idx].desc;
    editId = { type: "pending", idx };
  }
  input.focus();
}

renderLists();
