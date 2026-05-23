// ============================================================
//  layout.js  –  Loads navbar.html then updates auth area
// ============================================================

async function LoadLayout() {
  const container = document.getElementById("navbarContainer");
  if (!container) return;

  const response = await fetch("../html/navbar.html");
  const navbarHtml = await response.text();
  container.innerHTML = navbarHtml;

  updateNavAuth();
  highlightActiveLink();
}

// ============================================================
//  updateNavAuth()
//  Checks localStorage and renders:
//    NOT logged in → Sign In + Register buttons
//    Logged in     → Avatar dropdown with user info + Sign Out
// ============================================================
function updateNavAuth() {
  const area = document.getElementById("navAuthArea");
  if (!area) return;

  const token = localStorage.getItem("rv_token");
  const user = JSON.parse(localStorage.getItem("rv_user") || "null");

  if (!token || !user) {
    // ── Guest: show Sign In and Register ──
    area.innerHTML = `
      <li class="nav-item">
        <a href="../html/login.html"
           class="nav-link fw-semibold"
           style="color:rgba(255,255,255,0.75);">
          <i class="bi bi-box-arrow-in-right me-1"></i>Sign In
        </a>
      </li>
      <li class="nav-item">
        <a href="../html/register.html"
           class="btn btn-info btn-sm px-3 fw-semibold text-dark">
          <i class="bi bi-person-plus me-1"></i>Register
        </a>
      </li>
    `;
  } else {
    // ── Logged in: avatar initials + dropdown ──
    const initials = user.name
      ? user.name
          .split(" ")
          .map((w) => w[0])
          .join("")
          .toUpperCase()
          .slice(0, 2)
      : "U";

    const isAdmin = user.role === "Admin";

    area.innerHTML = `
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle d-flex align-items-center gap-2 p-0 px-2"
           href="#" role="button"
           data-bs-toggle="dropdown"
           aria-expanded="false"
           style="text-decoration:none;">

          <!-- Avatar circle -->
          <div style="width:34px;height:34px;border-radius:50%;
                      background:linear-gradient(135deg,#0dcaf0,#0ea5e9);
                      display:flex;align-items:center;justify-content:center;
                      color:#fff;font-weight:700;font-size:0.8rem;flex-shrink:0;">
            ${initials}
          </div>

          <!-- Name (hidden on mobile) -->
          <div class="d-none d-lg-block text-start" style="line-height:1.2;">
            <div style="font-size:0.85rem;font-weight:600;color:#fff;">
              ${user.name}
              ${isAdmin ? `<span class="badge ms-1 bg-warning text-dark" style="font-size:0.65rem;">Admin</span>` : ""}
            </div>
            <div style="font-size:0.72rem;color:rgba(255,255,255,0.55);">${user.role}</div>
          </div>
        </a>

        <!-- Dropdown -->
        <ul class="dropdown-menu dropdown-menu-end shadow border-0 rounded-3 mt-2"
            style="min-width:210px;">

          <!-- User info header -->
          <li>
            <div class="px-3 py-2 border-bottom">
              <div style="font-size:0.85rem;font-weight:600;color:#1a1a2e;">${user.name}</div>
              <div style="font-size:0.75rem;color:#6c757d;">${user.email}</div>
            </div>
          </li>

          <li>
            <a class="dropdown-item d-flex align-items-center gap-2 py-2" href="#">
              <i class="bi bi-person-circle text-muted"></i>My Profile
            </a>
          </li>

          <li>
            <a class="dropdown-item d-flex align-items-center gap-2 py-2" href="#">
              <i class="bi bi-calendar-check text-muted"></i>My Bookings
            </a>
          </li>

          ${
            isAdmin
              ? `
          <li>
            <a class="dropdown-item d-flex align-items-center gap-2 py-2"
               href="../html/villalist.html">
              <i class="bi bi-speedometer2 text-muted"></i>Admin Panel
            </a>
          </li>`
              : ""
          }

          <li><hr class="dropdown-divider my-1"/></li>

          <!-- Sign Out — opens the logout confirmation modal -->
          <li>
            <a class="dropdown-item d-flex align-items-center gap-2 py-2 text-danger"
               href="#"
               data-bs-toggle="modal"
               data-bs-target="#logoutModal">
              <i class="bi bi-box-arrow-right"></i>Sign Out
            </a>
          </li>

        </ul>
      </li>
    `;
  }
}

// ============================================================
//  highlightActiveLink()
//  Adds active styling to the current page's nav link
// ============================================================
function highlightActiveLink() {
  const currentPage = window.location.pathname.split("/").pop();
  document.querySelectorAll("#mainNavbar .nav-link").forEach((link) => {
    const linkPage = link.getAttribute("href")?.split("/").pop();
    if (linkPage && linkPage === currentPage) {
      link.classList.add("active");
      link.style.color = "#0dcaf0"; // info colour to match brand
    }
  });
}

LoadLayout();
