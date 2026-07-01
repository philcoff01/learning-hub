# ✓ To-Do List App

A modern, feature-rich to-do list application built with vanilla HTML, CSS, and JavaScript. All tasks are saved locally in your browser using LocalStorage.

## ✨ Features

### 📝 Core Task Management
- **Add Tasks** - Create new tasks with priority levels (High, Medium, Low)
- **Edit Tasks** - Click the pencil icon to edit existing tasks
- **Delete Tasks** - Remove individual tasks
- **Complete Tasks** - Check off completed tasks with visual feedback
- **Clear Completed** - Remove all completed tasks at once
- **Clear All** - Delete all tasks (with confirmation)

### 🎯 Priority System
- **High Priority** 🔴 - Important and urgent tasks
- **Medium Priority** 🟡 - Regular tasks (default)
- **Low Priority** 🟢 - Non-urgent tasks
- Visual priority badges on each task

### 🔍 Filtering
- **All** - View all tasks
- **Active** - View only incomplete tasks
- **Completed** - View only finished tasks

### 📊 Sorting Options
- **By Priority** - Sort by urgency (High → Low)
- **By Date** - Sort by creation date (newest first)
- **By Name** - Sort alphabetically

### 📈 Statistics Dashboard
- **Total Tasks** - Count of all tasks
- **Completed** - Number of finished tasks
- **Remaining** - Number of active tasks
- **Progress** - Completion percentage with visual indicator

### 💾 Local Storage
- All tasks are automatically saved to browser LocalStorage
- Tasks persist across browser sessions
- No server or account required
- Theme preference is also saved

### 🌓 Dark Mode
- Toggle between light and dark themes
- Theme preference is remembered
- Easy on the eyes for extended use

### 🎨 User Experience
- Smooth animations and transitions
- Responsive design (desktop, tablet, mobile)
- Toast notifications for actions
- Empty state message
- Keyboard shortcuts (Enter to add, Escape in edit mode)
- Confirmation dialogs for destructive actions

## 📁 File Structure

```
todo-app/
├── index.html       # Main HTML structure
├── styles.css       # Complete styling with dark mode
├── script.js        # All JavaScript functionality
└── README.md        # This file
```

## 🚀 Getting Started

### Quick Start
1. Open `index.html` in your web browser
2. Start adding tasks!
3. Tasks are automatically saved locally

### Local Server (Recommended)
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (if installed)
npx http-server

# Then visit http://localhost:8000/todo-app/
```

## 📚 How to Use

### Adding a Task
1. Type your task in the input box
2. Select a priority level (Low, Medium, High)
3. Click "➕ Add Task" or press Enter
4. Task appears at the top of the list

### Editing a Task
1. Click the ✏️ (edit) button on any task
2. Modify the task text
3. Click "💾 Save" or press Enter to save
4. Or click "✕ Cancel" to discard changes

### Completing a Task
1. Click the checkbox next to a task
2. Task is marked as complete with strikethrough
3. It still counts toward your progress

### Deleting a Task
1. Click the 🗑️ (delete) button on any task
2. Task is immediately removed

### Filtering Tasks
1. Use the filter buttons to view:
   - 📋 **All** - Every task
   - ⏳ **Active** - Incomplete tasks only
   - ✅ **Completed** - Finished tasks only

### Sorting Tasks
1. Click a sort button to reorder:
   - ⬆️ **Priority** - Most urgent first
   - 📅 **Date** - Newest first
   - 🔤 **Name** - Alphabetical

### Managing Tasks
- 🗑️ **Clear Completed** - Remove all finished tasks
- ❌ **Clear All** - Remove all tasks (careful!)
- 🌙 **Theme Toggle** - Switch to dark mode

## 🔧 Customization

### Change Colors
Edit CSS variables in `styles.css`:
```css
:root {
    --primary-color: #667eea;      /* Main brand color */
    --secondary-color: #764ba2;    /* Accent color */
    --success-color: #10b981;      /* Completed color */
    --danger-color: #ef4444;       /* Delete color */
    /* ... more colors ... */
}
```

### Modify Priority Colors
```css
--high-priority: #ef4444;      /* Red */
--medium-priority: #f59e0b;    /* Orange */
--low-priority: #10b981;       /* Green */
```

### Change Notification Duration
In `script.js`, find `showNotification()` and modify the timeout:
```javascript
setTimeout(() => {
    // Change 3000 to desired milliseconds (e.g., 5000 for 5 seconds)
}, 3000);
```

## 💻 Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📱 Responsive Breakpoints
- **Desktop** - 1200px and above
- **Tablet** - 768px to 1199px
- **Mobile** - Below 768px

## 🎓 Learning Concepts

This project demonstrates:
- **DOM Manipulation** - Creating and updating HTML elements
- **LocalStorage API** - Persisting data in the browser
- **Event Handling** - Responding to user interactions
- **ES6+ Features** - Arrow functions, template literals, destructuring
- **Array Methods** - Filter, map, sort, find
- **CSS Grid & Flexbox** - Modern responsive layouts
- **Dark Mode** - Theme switching with CSS variables
- **Form Validation** - Input checking and error handling
- **Accessibility** - Semantic HTML, ARIA labels

## 🚀 Enhancement Ideas

1. **Due Dates** - Add deadlines for tasks
2. **Categories** - Organize tasks by category/project
3. **Recurring Tasks** - Create tasks that repeat
4. **Search** - Find tasks by keyword
5. **Tags** - Label tasks for better organization
6. **Collaboration** - Sync tasks across devices
7. **Export** - Download tasks as CSV/JSON
8. **Import** - Upload tasks from file
9. **Statistics** - Advanced analytics and charts
10. **Notifications** - Browser notifications for due dates
11. **Subtasks** - Nested task hierarchy
12. **Time Tracking** - Track time spent on tasks

## 🐛 Troubleshooting

### Tasks Not Saving
- Check if LocalStorage is enabled in browser
- Try clearing browser cache
- Ensure JavaScript is enabled

### Tasks Not Appearing After Refresh
- Check browser console for errors (F12)
- Verify LocalStorage quota is not exceeded
- Try incognito/private mode to test

### Styling Issues
- Clear browser cache
- Try a different browser
- Check if CSS file is loading correctly

## 📄 License
Open source and available for personal and educational use.

---

Made with ❤️ | To-Do List App v1.0
