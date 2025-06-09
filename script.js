// Dark Mode Toggle
const themeToggleBtn = document.getElementById('themeToggle');
const htmlElem = document.documentElement;

themeToggleBtn.addEventListener('click', () => {
  if (htmlElem.getAttribute('data-theme') === 'light') {
    htmlElem.setAttribute('data-theme', 'dark');
    themeToggleBtn.textContent = '☀️';
  } else {
    htmlElem.setAttribute('data-theme', 'light');
    themeToggleBtn.textContent = '🌙';
  }
});

// Contact Form Validation
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', e => {
  e.preventDefault();
  let valid = true;

  // Clear previous errors
  [...contactForm.querySelectorAll('.error-message')].forEach(el => (el.textContent = ''));

  // Name validation
  const nameInput = contactForm.name;
  if (!nameInput.value.trim()) {
    contactForm.name.nextElementSibling.textContent = 'Name is required.';
    valid = false;
  }

  // Email validation
  const emailInput = contactForm.email;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailInput.value.trim()) {
    contactForm.email.nextElementSibling.textContent = 'Email is required.';
    valid = false;
  } else if (!emailRegex.test(emailInput.value.trim())) {
    contactForm.email.nextElementSibling.textContent = 'Please enter a valid email.';
    valid = false;
  }

  if (valid) {
    alert('Form submitted successfully!');
    contactForm.reset();
  }
});

// To-Do List Logic
const todoForm = document.getElementById('todoForm');
const todoInput = document.getElementById('todoInput');
const taskList = document.getElementById('taskList');

todoForm.addEventListener('submit', e => {
  e.preventDefault();

  const taskText = todoInput.value.trim();
  if (!taskText) return;

  // Create task elements
  const li = document.createElement('li');
  li.classList.add('task-item');

  // Checkbox
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.setAttribute('aria-label', 'Mark task complete');
  
  // Label
  const label = document.createElement('label');
  label.className = 'task-label';
  label.textContent = taskText;

  // Timestamp
  const timestamp = document.createElement('span');
  timestamp.className = 'task-timestamp';
  const now = new Date();
  timestamp.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // Delete button
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.className = 'delete-btn';
  deleteBtn.setAttribute('aria-label', `Delete task: ${taskText}`);

  // Append elements in order
  li.appendChild(checkbox);
  li.appendChild(label);
  li.appendChild(timestamp);
  li.appendChild(deleteBtn);

  taskList.appendChild(li);

  // Animate adding
  li.animate([{ opacity: 0, transform: 'translateY(15px)' }, { opacity: 1, transform: 'translateY(0)' }], {
    duration: 300,
    fill: 'forwards',
  });

  todoInput.value = '';
  todoInput.focus();

  // Checkbox toggle completed style
  checkbox.addEventListener('change', () => {
    li.classList.toggle('completed', checkbox.checked);
  });

  // Delete with animation
  deleteBtn.addEventListener('click', () => {
    li.animate([{ opacity: 1, transform: 'translateY(0)' }, { opacity: 0, transform: 'translateY(15px)' }], {
      duration: 300,
      fill: 'forwards',
    }).onfinish = () => li.remove();
  });
});
