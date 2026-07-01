# 📚 Learning Hub - Study Website

A modern, responsive study website built with vanilla HTML, CSS, and JavaScript. Perfect for students and lifelong learners!

## ✨ Features

### 🎨 Design
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile devices
- **Dark Mode** - Toggle between light and dark themes with local storage persistence
- **Modern UI** - Clean, gradient-based design with smooth animations
- **Accessibility** - Semantic HTML and keyboard-friendly navigation

### 📚 Content Sections
- **Home/Hero** - Welcoming introduction with call-to-action button
- **Subjects** - 6 popular study subjects with interactive cards (Mathematics, Science, History, Languages, Programming, Arts)
- **Study Tools** - Essential learning tools (Note Taking, Pomodoro Timer, Progress Tracker, Goal Setting)
- **Resources** - Learning resources including E-books, Videos, Quizzes, and Community Forum
- **Contact** - Functional contact form with validation

### 🔧 Interactive Features
- **Mobile Menu** - Hamburger menu for mobile devices
- **Smooth Scrolling** - Smooth navigation between sections
- **Form Validation** - Email validation and error handling
- **Notifications** - Toast notifications for user actions
- **Scroll Animations** - Fade-in animations as cards come into view
- **Active Navigation Highlight** - Current section highlighted in navigation
- **Dark Mode Toggle** - Easy theme switching with persistent storage

## 📁 Project Structure

```
learning-hub/
├── index.html      # Main HTML file
├── styles.css      # Complete styling with dark mode
├── script.js       # Interactive JavaScript features
└── README.md       # This file
```

## 🚀 Getting Started

### Option 1: Clone and Open Locally
```bash
git clone https://github.com/philcoff01/learning-hub.git
cd learning-hub
# Open index.html in your web browser
```

### Option 2: GitHub Pages
1. Go to your repository settings
2. Navigate to "Pages" section
3. Set source to "main branch"
4. Your site will be available at `https://philcoff01.github.io/learning-hub/`

## 💻 Usage

### Contact Form
The contact form includes:
- Name, email, and message fields
- Email validation
- Success/error messages
- Form reset after submission
- (Note: Currently simulates submission - integrate with a backend/service to save messages)

### Subject Cards
- Click any subject card to see an interactive notification
- Cards have hover effects with smooth transitions
- Responsive grid layout that adapts to screen size

### Dark Mode
- Click the moon/sun icon in the navigation bar
- Your preference is saved locally
- Works seamlessly across all pages

## 🎯 Customization

### Change Colors
Edit the CSS variables in `styles.css`:
```css
:root {
    --primary-color: #6366f1;      /* Main brand color */
    --secondary-color: #ec4899;    /* Accent color */
    --text-dark: #1f2937;          /* Dark text */
    --text-light: #f3f4f6;         /* Light text */
    --bg-light: #ffffff;           /* Light background */
    --bg-dark: #111827;            /* Dark background */
}
```

### Add New Subjects
1. Add a new card in the HTML:
```html
<div class="subject-card" data-subject="music">
    <div class="card-icon">🎵</div>
    <h3>Music</h3>
    <p>Learn music theory and instruments</p>
</div>
```
2. The JavaScript will automatically handle the click interaction

### Integrate Contact Form
To actually save form submissions, integrate with:
- **Formspree** - Free form backend service
- **EmailJS** - Send emails directly from JavaScript
- **Your own backend API** - PHP, Node.js, Python, etc.

Example with Formspree:
```javascript
// Replace form submission code with Formspree
fetch('https://formspree.io/f/YOUR_FORM_ID', {
    method: 'POST',
    body: new FormData(contactForm),
    headers: { 'Accept': 'application/json' }
})
```

## 📱 Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 License
This project is open source and available under the MIT License.

## 🎓 Learning Resources for Enhancement

Want to add more features? Here are some ideas:
1. **Quiz System** - Add interactive quizzes using JavaScript
2. **Progress Tracking** - Store user data in localStorage
3. **User Accounts** - Add authentication and user profiles
4. **Video Integration** - Embed YouTube tutorials
5. **Backend API** - Connect to a database for dynamic content
6. **Search Functionality** - Add a search feature
7. **Responsive Images** - Optimize images for different devices
8. **SEO Optimization** - Add meta tags and structured data

## 🙋‍♀️ Support
For issues, questions, or suggestions, feel free to open a GitHub issue!

---

Made with ❤️ by Learning Hub | 2024