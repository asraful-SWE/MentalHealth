// Auth utility functions

function saveAuth(token, user) {
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
}

function getToken() {
  return localStorage.getItem('token');
}

function getUser() {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}

function isLoggedIn() {
  return !!getToken();
}

function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = window.location.pathname.includes('/pages/')
    ? '../index.html'
    : 'index.html';
}

function requireAuth() {
  if (!isLoggedIn()) {
    window.location.href = window.location.pathname.includes('/pages/')
      ? 'login.html'
      : 'pages/login.html';
  }
}

function requireAdmin() {
  const user = getUser();
  if (!user || user.role !== 'admin') {
    window.location.href = window.location.pathname.includes('/pages/')
      ? 'login.html'
      : 'pages/login.html';
  }
}

// Dynamic navbar
function updateNavbar() {
  const navLinksEl = document.getElementById('navLinks');
  if (!navLinksEl) return;

  const user = getUser();
  const isInPages = window.location.pathname.includes('/pages/');
  const prefix = isInPages ? '' : 'pages/';
  const homeLink = isInPages ? '../index.html' : 'index.html';

  if (user) {
    let links = '';

    if (user.role === 'admin') {
      links = `
        <li class="nav-item"><a class="nav-link text-white" href="${prefix}admin.html"><i class="fas fa-tachometer-alt me-1"></i> Dashboard</a></li>
      `;
    } else {
      links = `
        <li class="nav-item"><a class="nav-link text-white" href="${prefix}dashboard.html"><i class="fas fa-chart-line me-1"></i> Dashboard</a></li>
        <li class="nav-item"><a class="nav-link text-white" href="${prefix}assessment.html"><i class="fas fa-clipboard-list me-1"></i> Assessment</a></li>
        <li class="nav-item"><a class="nav-link text-white" href="${prefix}results.html"><i class="fas fa-file-alt me-1"></i> Results</a></li>
      `;
    }

    links += `
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle text-white" href="#" data-bs-toggle="dropdown">
          <i class="fas fa-user-circle me-1"></i> ${user.name}
        </a>
        <ul class="dropdown-menu dropdown-menu-end">
          <li><span class="dropdown-item-text small text-muted">${user.email}</span></li>
          <li><span class="dropdown-item-text small"><span class="badge bg-primary">${user.role}</span></span></li>
          <li><hr class="dropdown-divider"></li>
          <li><a class="dropdown-item text-danger" href="#" onclick="logout()"><i class="fas fa-sign-out-alt me-2"></i>Logout</a></li>
        </ul>
      </li>
      <li class="nav-item ms-2">
        <button class="btn btn-sm btn-outline-light rounded-pill" onclick="toggleDarkMode()" title="Toggle Dark Mode">
          <i class="fas fa-moon" id="darkModeIcon"></i>
        </button>
      </li>
    `;

    navLinksEl.innerHTML = links;
  } else {
    navLinksEl.innerHTML = `
      <li class="nav-item"><a class="nav-link text-white" href="${prefix}login.html"><i class="fas fa-sign-in-alt me-1"></i> Login</a></li>
      <li class="nav-item"><a class="nav-link text-white" href="${prefix}register.html"><i class="fas fa-user-plus me-1"></i> Register</a></li>
      <li class="nav-item ms-2">
        <button class="btn btn-sm btn-outline-light rounded-pill" onclick="toggleDarkMode()" title="Toggle Dark Mode">
          <i class="fas fa-moon" id="darkModeIcon"></i>
        </button>
      </li>
    `;
  }

  // Apply dark mode on load
  if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
    const icon = document.getElementById('darkModeIcon');
    if (icon) icon.className = 'fas fa-sun';
  }
}

// Dark mode toggle
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  const isDark = document.body.classList.contains('dark-mode');
  localStorage.setItem('darkMode', isDark);
  const icon = document.getElementById('darkModeIcon');
  if (icon) icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
}
