

LoadVillas();

async function LoadVillas(id = null) {
  try {
    let URL = "https://localhost:7070/api/Villa/GetVillas";
    if (id && id !== 0) URL += "?id=" + id;

    const response = await fetch(URL);
    if (!response.ok) throw new Error("API Failed");

    const result     = await response.json();
    const villas     = result.data;
    const tableBody  = document.getElementById("villaTableBody");
    const tableWrap  = document.getElementById("tableWrapper");
    const noVilla    = document.getElementById("noVillaBlock");
    const badge      = document.getElementById("tableBadge");

    tableBody.innerHTML = "";

    // ── Empty state ──
    if (!villas || villas.length === 0) {
      tableWrap.classList.add("d-none");
      noVilla.classList.remove("d-none");
      badge.textContent = "0 villas";
      updateStats([]);
      return;
    }

    // ── Has data ──
    tableWrap.classList.remove("d-none");
    noVilla.classList.add("d-none");
    badge.textContent = `${villas.length} villa${villas.length !== 1 ? "s" : ""}`;
    updateStats(villas);

    villas.forEach((villa, i) => {
      // Image cell
      const imageHtml = (villa.imageURL && villa.imageURL.trim() !== "")
        ? `<img src="${villa.imageURL}" class="villa-img" alt="${villa.name}">`
        : `<div class="villa-img-placeholder"><i class="bi bi-image"></i></div>`;

      // Build row element (so we can set animation-delay)
      const tr = document.createElement("tr");
      tr.style.animationDelay = `${i * 60}ms`;
      tr.innerHTML = `
        <td>${imageHtml}</td>

        <td>
          <div class="villa-name">${villa.name}</div>
        </td>

        <td>
          <div class="villa-details">
            ${villa.details || "<span class='fst-italic text-muted'>No description</span>"}
          </div>
        </td>

        <td>
          <span class="rate-badge">$${Number(villa.rate).toLocaleString()}</span>
        </td>

        <td>
          <span class="info-chip">
            <i class="bi bi-people"></i>${villa.occupancy}
          </span>
        </td>

        <td>
          <span class="info-chip">
            <i class="bi bi-rulers"></i>${Number(villa.sqft).toLocaleString()}
          </span>
        </td>

        <td class="text-center">
          <div class="d-flex gap-2 justify-content-center">
            <a href="../html/createvilla.html?id=${villa.id}"
               class="btn-action-edit"
               title="Edit Villa">
              <i class="bi bi-pencil"></i>
            </a>
            <a href="#" onclick="openDeleteModal(${villa.id}, '${villa.name}')"
               class="btn-action-delete"
               title="Delete Villa">
              <i class="bi bi-trash"></i>
            </a>
          </div>
        </td>
      `;

      tableBody.appendChild(tr);
    });

  } catch (error) {
    console.error(error);
    showError("Failed to load villas.");
  }
}

// ============================================================
//  Update stat cards from villa data
// ============================================================
function updateStats(villas) {
  // Total count
  document.getElementById("statCount").textContent = villas.length;

  // Average rate
  const avg = villas.length
    ? (villas.reduce((sum, v) => sum + Number(v.rate), 0) / villas.length).toFixed(2)
    : "0.00";
  document.getElementById("statAvgRate").textContent =
    "$" + Number(avg).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  // Total sqft
  const totalSqft = villas.reduce((sum, v) => sum + Number(v.sqft), 0);
  document.getElementById("statSqft").textContent =
    Number(totalSqft).toLocaleString();
}

// ============================================================
//  Show / hide helpers (called from error.js or inline)
// ============================================================
function showNoVillaMessage() {
  document.getElementById("noVillaBlock")?.classList.remove("d-none");
  document.getElementById("tableWrapper")?.classList.add("d-none");
  document.getElementById("tableBadge").textContent = "0 villas";
  updateStats([]);
}

function hideNoVillaMessage() {
  document.getElementById("noVillaBlock")?.classList.add("d-none");
  document.getElementById("tableWrapper")?.classList.remove("d-none");
}