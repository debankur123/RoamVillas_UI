
const AuthApi = {
  //baseUrl: "https://localhost:7070/api/auth",
  baseUrl: "http://localhost:5199/api/auth",

  // Send login credentials to the API
  async login(email, password) {
    const response = await fetch(`${this.baseUrl}/Login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(
        (typeof data?.errors === "string" && data.errors) ||
        data?.message ||
        "Login failed."
      );
    }
    return data; 
  },

  async register(name, email, password) {
    const response = await fetch(`${this.baseUrl}/Register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, role: "Customer" }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(
        (typeof data?.errors === "string" && data.errors) ||
        data?.message ||
        "Registration failed."
      );
    }
    return data; 
  },
};

function saveSession(token, userDto) {
  localStorage.setItem("rv_token", token);
  localStorage.setItem("rv_user", JSON.stringify(userDto));
}


function getToken() {
  return localStorage.getItem("rv_token");
}

function getUser() {
  const raw = localStorage.getItem("rv_user");
  return raw ? JSON.parse(raw) : null;
}

function isLoggedIn() {
  return !!getToken();
}

function clearSession() {
  localStorage.removeItem("rv_token");
  localStorage.removeItem("rv_user");
}

function requireAuth() {
  if (!isLoggedIn()) {
    window.location.href = "../html/login.html";
  }
}

function redirectIfLoggedIn(destination = "../html/home.html") {
  if (isLoggedIn()) {
    window.location.href = destination;
  }
}


function showAuthError(message) {
  const box = document.getElementById("authError");
  const msg = document.getElementById("authErrorMsg");
  if (!box || !msg) return;
  msg.textContent = message;
  box.classList.remove("d-none");
}

function hideAuthError() {
  document.getElementById("authError")?.classList.add("d-none");
}

function setLoading(btnId, loading, label) {
  const btn = document.getElementById(btnId);
  if (!btn) return;
  btn.disabled = loading;
  btn.innerHTML = loading
    ? `<span class="spinner-border spinner-border-sm me-2"></span>Please wait...`
    : label;
}

async function handleLogin(event) {
  event.preventDefault();
  hideAuthError();

  const email    = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value;

  if (!email || !password) {
    showAuthError("Please enter both email and password.");
    return;
  }

  setLoading("loginBtn", true);

  try {
    const result = await AuthApi.login(email, password);
    const { token, userDto } = result.data;

    saveSession(token, userDto);
    window.location.href = "../html/index.html";

  } catch (error) {
    showAuthError(error.message);
  } finally {
    setLoading("loginBtn", false, `<i class="bi bi-box-arrow-in-right me-2"></i>Sign In`);
  }
}


// handle registration form submission

async function handleRegister(event) {
  event.preventDefault();
  hideAuthError();

  const name     = document.getElementById("regName").value.trim();
  const email    = document.getElementById("regEmail").value.trim();
  const password = document.getElementById("regPassword").value;
  const confirm  = document.getElementById("regConfirm").value;

  if (!name || !email || !password || !confirm) {
    showAuthError("All fields are required.");
    return;
  }
  if (password !== confirm) {
    showAuthError("Passwords do not match.");
    return;
  }
  if (password.length < 6) {
    showAuthError("Password must be at least 6 characters.");
    return;
  }

  setLoading("registerBtn", true);

  try {
    await AuthApi.register(name, email, password);
    
    window.location.href = "../html/login.html?registered=1";

  } catch (error) {
    showAuthError(error.message);
  } finally {
    setLoading("registerBtn", false, `<i class="bi bi-person-plus me-2"></i>Create Account`);
  }
}

function confirmLogout() {
  clearSession();
  window.location.href = "../html/login.html";
}