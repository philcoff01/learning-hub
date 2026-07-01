// ==================== Courses Data ====================
const coursesData = [
    {
        id: 1,
        title: "Learn JavaScript Basics",
        instructor: "By Web Dev Academy",
        category: "programming",
        description: "Master the fundamentals of JavaScript programming language.",
        duration: "10 hours",
        level: "Beginner",
        icon: "💻",
        videoId: "W6NZfCO5tTE", // JavaScript tutorial
    },
    {
        id: 2,
        title: "Python for Beginners",
        instructor: "By Code Masters",
        category: "programming",
        description: "Start your Python journey with comprehensive tutorials.",
        duration: "12 hours",
        level: "Beginner",
        icon: "🐍",
        videoId: "jHYiMZFY9B8", // Python tutorial
    },
    {
        id: 3,
        title: "Calculus Fundamentals",
        instructor: "By Math Academy",
        category: "mathematics",
        description: "Understanding limits, derivatives, and integrals.",
        duration: "15 hours",
        level: "Intermediate",
        icon: "📐",
        videoId: "VcqjKT1j5zk", // Calculus tutorial
    },
    {
        id: 4,
        title: "Physics: Motion & Forces",
        instructor: "By Physics Lab",
        category: "science",
        description: "Learn about Newton's laws and classical mechanics.",
        duration: "14 hours",
        level: "Intermediate",
        icon: "⚡",
        videoId: "FfxHD8qoqpU", // Physics tutorial
    },
    {
        id: 5,
        title: "English Grammar Master",
        instructor: "By Language Experts",
        category: "language",
        description: "Complete guide to English grammar and writing.",
        duration: "8 hours",
        level: "Beginner",
        icon: "📚",
        videoId: "bNZCq3d0P_0", // English tutorial
    },
    {
        id: 6,
        title: "Spanish for Travelers",
        instructor: "By Language Travel",
        category: "language",
        description: "Learn practical Spanish phrases for travel.",
        duration: "6 hours",
        level: "Beginner",
        icon: "🇪🇸",
        videoId: "Q30f1D7d_nw", // Spanish tutorial
    },
    {
        id: 7,
        title: "Chemistry Basics",
        instructor: "By Science Hub",
        category: "science",
        description: "Introduction to atomic structure and reactions.",
        duration: "11 hours",
        level: "Beginner",
        icon: "🧪",
        videoId: "I-qc5ycSLNc", // Chemistry tutorial
    },
    {
        id: 8,
        title: "Web Development with HTML & CSS",
        instructor: "By Web Masters",
        category: "programming",
        description: "Build responsive websites with HTML and CSS.",
        duration: "20 hours",
        level: "Beginner",
        icon: "🌐",
        videoId: "qz0aGYrrlhU", // Web dev tutorial
    },
];

// ==================== DOM Elements ====================
const coursesGrid = document.getElementById('courses-grid');
const filterBtns = document.querySelectorAll('.filter-btn');
const videoModal = document.getElementById('video-modal');
const videoFrame = document.getElementById('video-frame');
const videoTitle = document.getElementById('video-title');
const videoDescription = document.getElementById('video-description');
const modalClose = document.querySelector('.modal-close');
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

let currentFilter = 'all';

// ==================== Initialize ====================
document.addEventListener('DOMContentLoaded', () => {
    loadTheme();
    renderCourses('all');
    setupEventListeners();
});

// ==================== Event Listeners ====================
function setupEventListeners() {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentFilter = e.target.dataset.category;
            renderCourses(currentFilter);
        });
    });

    modalClose.addEventListener('click', closeModal);
    videoModal.addEventListener('click', (e) => {
        if (e.target === videoModal) closeModal();
    });

    themeToggle.addEventListener('click', toggleTheme);

    // Dark mode Dark mode toggle
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.addEventListener('click', toggleTheme);
    });

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when link is clicked
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    // CTA button
    document.querySelector('.cta-btn').addEventListener('click', () => {
        document.getElementById('courses').scrollIntoView({ behavior: 'smooth' });
    });

    // Contact form
    document.getElementById('contact-form').addEventListener('submit', handleContactForm);

    // Subject cards
    document.querySelectorAll('.subject-card').forEach(card => {
        card.addEventListener('click', function() {
            showNotification(`You clicked on ${this.dataset.subject}`);
        });
    });
}

// ==================== Render Courses ====================
function renderCourses(filter) {
    let filtered = coursesData;
    if (filter !== 'all') {
        filtered = coursesData.filter(course => course.category === filter);
    }

    coursesGrid.innerHTML = filtered.map(course => `
        <div class="course-card" data-category="${course.category}" onclick="openVideoModal(${course.id})">
            <div class="course-thumbnail">${course.icon}</div>
            <div class="course-content">
                <span class="course-category">${course.category.toUpperCase()}</span>
                <h3 class="course-title">${course.title}</h3>
                <p class="course-instructor">${course.instructor}</p>
                <p class="course-description">${course.description}</p>
                <div class="course-meta">
                    <span class="course-duration">⏱️ ${course.duration}</span>
                    <span class="course-level">${course.level}</span>
                </div>
                <button class="course-button">🎥 Watch Now</button>
            </div>
        </div>
    `).join('');
}

// ==================== Open Video Modal ====================
function openVideoModal(courseId) {
    const course = coursesData.find(c => c.id === courseId);
    if (!course) return;

    videoTitle.textContent = course.title;
    videoDescription.textContent = course.description + ` | Duration: ${course.duration} | Level: ${course.level} | Instructor: ${course.instructor}`;
    
    // YouTube iframe embed
    videoFrame.src = `https://www.youtube.com/embed/${course.videoId}?autoplay=1`;
    videoModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

// ==================== Close Video Modal ====================
function closeModal() {
    videoModal.classList.add('hidden');
    videoFrame.src = '';
    document.body.style.overflow = 'auto';
}

// ==================== Theme Toggle ====================
function toggleTheme() {
    body.classList.toggle('dark-mode');
    const isDark = body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeBtn();
}

function loadTheme() {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
        body.classList.add('dark-mode');
    }
    updateThemeBtn();
}

function updateThemeBtn() {
    const isDark = body.classList.contains('dark-mode');
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.textContent = isDark ? '☀️' : '🌙';
    });
}

// ==================== Contact Form ====================
function handleContactForm(e) {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
        showError('Please fill in all fields');
        return;
    }

    if (!isValidEmail(email)) {
        showError('Please enter a valid email address');
        return;
    }

    showSuccess('Message sent successfully! We will get back to you soon.');
    document.getElementById('contact-form').reset();
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ==================== Notifications ====================
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #6366f1, #ec4899);
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 2000;
        animation: slideIn 0.3s ease;
        max-width: 300px;
        font-weight: 500;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function showSuccess(message) {
    const formMessage = document.getElementById('form-message');
    formMessage.textContent = '✅ ' + message;
    formMessage.className = 'form-message success';
    setTimeout(() => {
        formMessage.textContent = '';
    }, 5000);
}

function showError(message) {
    const formMessage = document.getElementById('form-message');
    formMessage.textContent = '❌ ' + message;
    formMessage.className = 'form-message error';
    setTimeout(() => {
        formMessage.textContent = '';
    }, 5000);
}

// ==================== Smooth Scroll Navigation ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

console.log('✅ Learning Hub with Courses and Videos loaded successfully!');
console.log('🎥 All courses link to real YouTube videos');
