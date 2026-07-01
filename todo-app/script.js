// ==================== DOM Elements ====================
const taskInput = document.getElementById('task-input');
const prioritySelect = document.getElementById('priority-select');
const addBtn = document.getElementById('add-btn');
const tasksList = document.getElementById('tasks-list');
const emptyState = document.getElementById('empty-state');
const clearCompletedBtn = document.getElementById('clear-completed-btn');
const clearAllBtn = document.getElementById('clear-all-btn');
const themeBtn = document.getElementById('theme-btn');
const notification = document.getElementById('notification');

const totalTasksEl = document.getElementById('total-tasks');
const completedTasksEl = document.getElementById('completed-tasks');
const remainingTasksEl = document.getElementById('remaining-tasks');
const progressPercentEl = document.getElementById('progress-percent');

const filterBtns = document.querySelectorAll('.filter-btn');
const sortBtns = document.querySelectorAll('.sort-btn');
const sortPriorityBtn = document.getElementById('sort-priority-btn');
const sortDateBtn = document.getElementById('sort-date-btn');
const sortNameBtn = document.getElementById('sort-name-btn');

// ==================== State ====================
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let currentFilter = 'all';
let currentSort = 'date'; // 'date', 'priority', 'name'

// ==================== Initialize ====================
document.addEventListener('DOMContentLoaded', () => {
    loadTheme();
    renderTasks();
    setupEventListeners();
    updateStats();
});

// ==================== Event Listeners ====================
function setupEventListeners() {
    addBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTask();
    });
    clearCompletedBtn.addEventListener('click', clearCompletedTasks);
    clearAllBtn.addEventListener('click', clearAllTasks);
    themeBtn.addEventListener('click', toggleTheme);

    // Filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentFilter = e.target.dataset.filter;
            renderTasks();
        });
    });

    // Sort buttons
    sortPriorityBtn.addEventListener('click', () => {
        currentSort = 'priority';
        updateSortButtons();
        renderTasks();
    });
    sortDateBtn.addEventListener('click', () => {
        currentSort = 'date';
        updateSortButtons();
        renderTasks();
    });
    sortNameBtn.addEventListener('click', () => {
        currentSort = 'name';
        updateSortButtons();
        renderTasks();
    });
}

// ==================== Add Task ====================
function addTask() {
    const taskText = taskInput.value.trim();
    const priority = prioritySelect.value;

    if (!taskText) {
        showNotification('Please enter a task', 'warning');
        return;
    }

    const newTask = {
        id: Date.now(),
        text: taskText,
        priority: priority,
        completed: false,
        createdAt: new Date().toISOString(),
    };

    tasks.unshift(newTask);
    saveTasks();
    renderTasks();
    updateStats();
    taskInput.value = '';
    prioritySelect.value = 'medium';
    taskInput.focus();
    showNotification('Task added successfully', 'success');
}

// ==================== Delete Task ====================
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
    updateStats();
    showNotification('Task deleted', 'info');
}

// ==================== Toggle Task Completion ====================
function toggleTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        saveTasks();
        renderTasks();
        updateStats();
    }
}

// ==================== Edit Task ====================
function editTask(id) {
    const taskItem = document.querySelector(`[data-id="${id}"]`);
    const task = tasks.find(t => t.id === id);

    if (!task) return;

    taskItem.classList.add('edit-mode');

    const taskContent = taskItem.querySelector('.task-content');
    taskContent.innerHTML = `
        <input type="text" class="edit-input" value="${escapeHtml(task.text)}">
        <div class="edit-actions">
            <button class="save-btn">💾 Save</button>
            <button class="cancel-btn">✕ Cancel</button>
        </div>
    `;

    const editInput = taskContent.querySelector('.edit-input');
    const saveBtn = taskContent.querySelector('.save-btn');
    const cancelBtn = taskContent.querySelector('.cancel-btn');

    editInput.focus();
    editInput.select();

    function saveEdit() {
        const newText = editInput.value.trim();
        if (newText) {
            task.text = newText;
            saveTasks();
            renderTasks();
            showNotification('Task updated', 'success');
        } else {
            showNotification('Task cannot be empty', 'warning');
            cancelEdit();
        }
    }

    function cancelEdit() {
        renderTasks();
    }

    saveBtn.addEventListener('click', saveEdit);
    cancelBtn.addEventListener('click', cancelEdit);
    editInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') saveEdit();
        if (e.key === 'Escape') cancelEdit();
    });
}

// ==================== Clear Completed Tasks ====================
function clearCompletedTasks() {
    const completedCount = tasks.filter(t => t.completed).length;
    if (completedCount === 0) {
        showNotification('No completed tasks to clear', 'warning');
        return;
    }

    if (confirm(`Delete ${completedCount} completed task(s)?`)) {
        tasks = tasks.filter(t => !t.completed);
        saveTasks();
        renderTasks();
        updateStats();
        showNotification('Completed tasks cleared', 'success');
    }
}

// ==================== Clear All Tasks ====================
function clearAllTasks() {
    if (tasks.length === 0) {
        showNotification('No tasks to clear', 'warning');
        return;
    }

    if (confirm(`Delete all ${tasks.length} task(s)? This cannot be undone.`)) {
        tasks = [];
        saveTasks();
        renderTasks();
        updateStats();
        showNotification('All tasks cleared', 'success');
    }
}

// ==================== Filter Tasks ====================
function getFilteredTasks() {
    switch (currentFilter) {
        case 'active':
            return tasks.filter(t => !t.completed);
        case 'completed':
            return tasks.filter(t => t.completed);
        default:
            return tasks;
    }
}

// ==================== Sort Tasks ====================
function getSortedTasks(tasksToSort) {
    const sorted = [...tasksToSort];
    const priorityOrder = { high: 0, medium: 1, low: 2 };

    switch (currentSort) {
        case 'priority':
            return sorted.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
        case 'date':
            return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        case 'name':
            return sorted.sort((a, b) => a.text.localeCompare(b.text));
        default:
            return sorted;
    }
}

// ==================== Render Tasks ====================
function renderTasks() {
    const filteredTasks = getFilteredTasks();
    const sortedTasks = getSortedTasks(filteredTasks);

    if (sortedTasks.length === 0) {
        tasksList.innerHTML = '';
        emptyState.classList.remove('hidden');
        return;
    }

    emptyState.classList.add('hidden');

    tasksList.innerHTML = sortedTasks
        .map(
            (task) => `
            <div class="task-item ${task.completed ? 'completed' : ''}" data-id="${task.id}">
                <input 
                    type="checkbox" 
                    class="task-checkbox" 
                    ${task.completed ? 'checked' : ''}
                    onchange="toggleTask(${task.id})"
                >
                <div class="task-content">
                    <div class="task-header">
                        <span class="task-text">${escapeHtml(task.text)}</span>
                        <span class="priority-badge ${task.priority}">${getPriorityEmoji(task.priority)} ${task.priority}</span>
                    </div>
                    <div class="task-meta">
                        Created: ${formatDate(new Date(task.createdAt))}
                    </div>
                </div>
                <div class="task-actions">
                    <button class="task-btn edit-btn" onclick="editTask(${task.id})" title="Edit">✏️</button>
                    <button class="task-btn delete-btn" onclick="deleteTask(${task.id})" title="Delete">🗑️</button>
                </div>
            </div>
        `
        )
        .join('');
}

// ==================== Update Stats ====================
function updateStats() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const remaining = total - completed;
    const progress = total === 0 ? 0 : Math.round((completed / total) * 100);

    totalTasksEl.textContent = total;
    completedTasksEl.textContent = completed;
    remainingTasksEl.textContent = remaining;
    progressPercentEl.textContent = `${progress}%`;
}

// ==================== Sort Buttons Update ====================
function updateSortButtons() {
    sortPriorityBtn.classList.remove('active');
    sortDateBtn.classList.remove('active');
    sortNameBtn.classList.remove('active');

    if (currentSort === 'priority') sortPriorityBtn.classList.add('active');
    if (currentSort === 'date') sortDateBtn.classList.add('active');
    if (currentSort === 'name') sortNameBtn.classList.add('active');
}

// ==================== Local Storage ====================
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// ==================== Theme ====================
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    themeBtn.textContent = isDark ? '☀️' : '🌙';
}

function loadTheme() {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
        themeBtn.textContent = '☀️';
    }
}

// ==================== Notifications ====================
function showNotification(message, type = 'success') {
    notification.textContent = message;
    notification.className = `notification ${type}`;
    notification.classList.remove('hidden');

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            notification.classList.add('hidden');
            notification.style.animation = 'slideInRight 0.3s ease';
        }, 300);
    }, 3000);
}

// ==================== Utility Functions ====================
function getPriorityEmoji(priority) {
    const emojis = {
        high: '🔴',
        medium: '🟡',
        low: '🟢',
    };
    return emojis[priority] || '⚪';
}

function formatDate(date) {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
        return 'Today at ' + date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    }
    if (date.toDateString() === yesterday.toDateString()) {
        return 'Yesterday at ' + date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    }
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) +
           ' at ' + date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;',
    };
    return text.replace(/[&<>"']/g, (m) => map[m]);
}

console.log('✓ To-Do List App loaded successfully!');
console.log('💾 All tasks are saved locally in your browser');
