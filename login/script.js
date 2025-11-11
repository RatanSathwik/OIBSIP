// In-memory users DB
let users = {};
let currentUser = null;

// Render login form
function renderLogin(msg = "") {
  document.getElementById('form-wrap').innerHTML = `
    <h2>Login</h2>
    <form onsubmit="login(event)">
      <input type="text" id="loginUser" placeholder="Username" required>
      <input type="password" id="loginPass" placeholder="Password" required>
      <button type="submit">Login</button>
    </form>
    <button class="link-btn" onclick="renderRegister()">Don't have an account? Register</button>
    ${msg ? `<div class="error">${msg}</div>` : ""}
  `;
}

// Render registration form
function renderRegister(msg = "") {
  document.getElementById('form-wrap').innerHTML = `
    <h2>Register</h2>
    <form onsubmit="register(event)">
      <input type="text" id="regUser" placeholder="Username" required>
      <input type="password" id="regPass" placeholder="Password" required>
      <button type="submit">Register</button>
    </form>
    <button class="link-btn" onclick="renderLogin()">Already have an account? Login</button>
    ${msg ? `<div class="error">${msg}</div>` : ""}
  `;
}

// Render secured page
function renderSecured() {
  document.getElementById('form-wrap').innerHTML = `
    <div class="secured">
      <h2>Welcome, ${currentUser}! 🎉</h2>
      <p>You are viewing a secured page only for logged-in users.</p>
      <button class="logout-btn" onclick="logout()">Logout</button>
    </div>
  `;
}

// Registration handler
function register(e) {
  e.preventDefault();
  let username = document.getElementById('regUser').value.trim();
  let password = document.getElementById('regPass').value;
  if (!username || !password) {
    renderRegister("Please fill both fields!");
    return;
  }
  if (users[username]) {
    renderRegister("Username already taken!");
    return;
  }
  users[username] = password;
  renderLogin("Account created! Please login.");
}

// Login handler
function login(e) {
  e.preventDefault();
  let username = document.getElementById('loginUser').value.trim();
  let password = document.getElementById('loginPass').value;
  if (users[username] && users[username] === password) {
    currentUser = username;
    renderSecured();
  } else {
    renderLogin("Invalid credentials!");
  }
}

// Logout handler
function logout() {
  currentUser = null;
  renderLogin("Logged out successfully!");
}

// Initial page
renderLogin();
