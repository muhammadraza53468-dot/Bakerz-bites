// Bakerz Bite demo authentication using localStorage.
// NOTE: This is for a learning/demo project only. Never store real passwords this way.
const USERS_KEY = "bakerzBiteUsers";
const SESSION_KEY = "bakerzBiteSession";

function getUsers() {
  try {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
    return Array.isArray(users) ? users : [];
  } catch (_) { return []; }
}
function saveSession(user) {
  localStorage.setItem(SESSION_KEY, JSON.stringify({name:user.name, email:user.email, loggedInAt:new Date().toISOString()}));
}
function goHome() { window.location.href = "index.html"; }
function showMessage(text, type = "error") {
  const message = document.getElementById("message");
  if (!message) return;
  message.className = "message " + type;
  message.textContent = text;
}
function setupPasswordToggle() {
  const field = document.getElementById("password");
  const toggle = document.getElementById("togglePassword");
  if (!field || !toggle) return;
  toggle.addEventListener("click", () => {
    const show = field.type === "password";
    field.type = show ? "text" : "password";
    toggle.textContent = show ? "Hide" : "Show";
    toggle.setAttribute("aria-label", show ? "Hide password" : "Show password");
  });
}
document.addEventListener("DOMContentLoaded", () => {
  setupPasswordToggle();
  const currentSession = localStorage.getItem(SESSION_KEY);
  if (currentSession && !location.search.includes("loggedout=1")) { goHome(); return; }

  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    const params = new URLSearchParams(location.search);
    if (params.get("loggedout") === "1") showMessage("You have been logged out successfully.", "success");
    loginForm.addEventListener("submit", event => {
      event.preventDefault();
      const email = document.getElementById("email").value.trim().toLowerCase();
      const password = document.getElementById("password").value;
      const user = getUsers().find(item => item.email.toLowerCase() === email && item.password === password);
      if (!user) { showMessage("Email ya password ghalat hai. Agar account nahi hai to pehle Sign Up karein."); return; }
      saveSession(user);
      goHome();
    });
    const forgot = document.getElementById("forgotLink");
    if (forgot) forgot.addEventListener("click", event => {
      event.preventDefault();
      showMessage("Password reset abhi demo mein connect nahi hai.");
    });
  }

  const signupForm = document.getElementById("signupForm");
  if (signupForm) {
    signupForm.addEventListener("submit", event => {
      event.preventDefault();
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim().toLowerCase();
      const password = document.getElementById("password").value;
      const confirm = document.getElementById("confirmPassword").value;
      if (password.length < 8) { showMessage("Password kam az kam 8 characters ka hona chahiye."); return; }
      if (password !== confirm) { showMessage("Dono passwords match nahi karte."); return; }
      const users = getUsers();
      if (users.some(item => item.email.toLowerCase() === email)) { showMessage("Is email ka account pehle se bana hua hai. Login karein."); return; }
      const user = {name, email, password};
      users.push(user);
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
      saveSession(user);
      goHome();
    });
  }
});
