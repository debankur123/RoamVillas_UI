const VillaApi = {
  //baseUrl: "https://localhost:7070/api/Villa",
  baseUrl: "http://localhost:5199/api/Villa",
  async insertUpdateVilla(villaDto) {
    const response = await fetch(`${this.baseUrl}/InsertUpdateVilla`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(villaDto),
    });
    const data = await response.json();
    if (!response.ok) {
      const errMsg =
        (typeof data?.errors === "string" && data.errors)
        || data?.message
        || "Something went wrong. Please try again.";
      throw new Error(errMsg);
    }
    return data;
  },

  async getVillaById(id) {
    const response = await fetch(`${this.baseUrl}/GetVillas?id=${id}`);
    const data = await response.json();
    if (!response.ok) throw new Error(data?.message || "Failed to load villa.");
    return data;
  },
};
//  Edit mode — reads ?id= from URL
function getEditId() {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"));
  return isNaN(id) || id === 0 ? null : id;
}

async function loadVillaForEdit(id) {
  showLoader();
  try {
    const result  = await VillaApi.getVillaById(id);
    const villas  = result?.data;

    // GetVillas returns an array; pick the first match
    const villa   = Array.isArray(villas) ? villas[0] : villas;
    if (!villa) throw new Error("Villa not found.");

    // Populate form fields
    document.getElementById("villaId").value        = villa.id       ?? 0;
    document.getElementById("villaName").value      = villa.name     ?? "";
    document.getElementById("villaDetails").value   = villa.details  ?? "";
    document.getElementById("villaRate").value      = villa.rate     ?? "";
    document.getElementById("villaOccupancy").value = villa.occupancy?? "";
    document.getElementById("villaSqft").value      = villa.sqft     ?? "";
    document.getElementById("villaImageURL").value  = villa.imageURL ?? "";

    if (villa.imageURL) previewImage(villa.imageURL);

    setEditMode(true);

  } catch (error) {
    showModal("danger", "Failed to Load Villa", error.message);
  } finally {
    hideLoader();
  }
}

function setEditMode(isEdit) {
  const heading = document.getElementById("pageHeading");
  if (heading) heading.textContent = isEdit ? "Edit Villa" : "Create New Villa";

  const badge = document.getElementById("headerBadge");
  if (badge) {
    badge.className = isEdit
      ? "badge bg-white text-warning fw-semibold"
      : "badge bg-white text-success fw-semibold";
    badge.innerHTML = isEdit
      ? `<i class="bi bi-pencil-square me-1"></i>Edit Mode`
      : `<i class="bi bi-pencil-square me-1"></i>New Entry`;
  }

  const submitBtn = document.getElementById("submitBtn");
  if (submitBtn) {
    submitBtn.innerHTML = isEdit
      ? `<i class="bi bi-save me-1"></i>Update Villa`
      : `<i class="bi bi-check-circle me-1"></i>Create Villa`;
    submitBtn.className = isEdit
      ? "btn btn-warning px-4 text-white"
      : "btn btn-success px-4";
  }

  document.title = isEdit ? "Edit Villa" : "Create Villa";
}

const modalIcons = {
  success : { header: "bg-success", icon: "bi-check-circle-fill"        },
  warning : { header: "bg-warning", icon: "bi-exclamation-triangle-fill" },
  danger  : { header: "bg-danger",  icon: "bi-x-octagon-fill"            },
};

function showModal(type, title, lines) {
  const cfg  = modalIcons[type] || modalIcons.danger;
  const msgs = Array.isArray(lines) ? lines : [lines];

  const header = document.getElementById("villaModalHeader");
  header.className = `modal-header ${cfg.header} text-white border-0`;
  header.querySelector(".modal-title").innerHTML =
    `<i class="bi ${cfg.icon} me-2"></i>${title}`;

  const body = document.getElementById("villaModalBody");
  body.innerHTML = msgs.length === 1
    ? `<p class="mb-0" style="line-height:1.7;">${msgs[0]}</p>`
    : `<ul class="mb-0 ps-3" style="line-height:2;">${msgs.map(m=>`<li>${m}</li>`).join("")}</ul>`;

  const closeBtn = document.getElementById("villaModalClose");
  closeBtn.className = type === "warning" ? "btn-close" : "btn-close btn-close-white";

  const actionBtn = document.getElementById("villaModalAction");
  actionBtn.className = `btn btn-${type} px-4`;
  actionBtn.textContent = type === "success" ? "Great, thanks!" : "Close & Retry";

  new bootstrap.Modal(document.getElementById("villaModal")).show();
}

function showLoader() { document.getElementById("pageLoader").classList.remove("d-none"); }
function hideLoader() { document.getElementById("pageLoader").classList.add("d-none"); }

function getTextValue(id) {
  const val = document.getElementById(id)?.value?.trim();
  return val || null;
}
function getNumberValue(id) {
  const raw = document.getElementById(id)?.value?.trim();
  if (!raw) return null;
  const num = Number(raw);
  return isNaN(num) ? null : num;
}
function clearErrors() {
  document.querySelectorAll(".field-error").forEach(el => el.textContent = "");
}
function resetForm() {
  document.getElementById("villaForm").reset();
  document.getElementById("villaId").value = "0";
  document.getElementById("previewImg").classList.add("d-none");
  document.getElementById("previewPlaceholder").classList.remove("d-none");
  document.getElementById("previewBox").classList.remove("has-image");
  clearErrors();
}
//  Validation
function validateVillaForm() {
  const errors = [];
  const name = getTextValue("villaName");
  if (!name) errors.push("Villa Name is required.");

  const rate = getNumberValue("villaRate");
  if (rate === null)  errors.push("Nightly Rate is required.");
  else if (rate < 0)  errors.push("Nightly Rate cannot be negative.");

  const occupancy = getNumberValue("villaOccupancy");
  if (occupancy !== null && occupancy <= 0)
    errors.push("Max Occupancy must be greater than 0.");

  const sqft = getNumberValue("villaSqft");
  if (sqft !== null && sqft <= 0)
    errors.push("Square Feet must be greater than 0.");

  return errors;
}
//  Save handler (Create & Update)
async function saveVilla(event) {
  event.preventDefault();
  clearErrors();

  const validationErrors = validateVillaForm();
  if (validationErrors.length > 0) {
    showModal("warning", "Please fix the following", validationErrors);
    return;
  }

  const isEdit  = (getNumberValue("villaId") ?? 0) !== 0;

  const villaDto = {
    Id:        getNumberValue("villaId") ?? 0,
    Name:      getTextValue("villaName"),
    Details:   getTextValue("villaDetails"),
    Rate:      getNumberValue("villaRate") ?? 0,
    Occupancy: getNumberValue("villaOccupancy") ?? 0,
    Sqft:      getNumberValue("villaSqft") ?? 0,
    ImageURL:  getTextValue("villaImageURL"),
  };

  showLoader();

  try {
    const result = await VillaApi.insertUpdateVilla(villaDto);

    showModal(
      "success",
      isEdit ? "Villa Updated!" : "Villa Created!",
      result?.message || (isEdit ? "Villa updated successfully." : "Villa created successfully.")
    );

    setTimeout(() => { window.location.href = "../html/villalist.html"; }, 1900);

  } catch (error) {
    if (!isEdit) resetForm();        
    showModal("danger", "Something Went Wrong", error.message || "An unexpected error occurred.");
  } finally {
    hideLoader();
  }
}
//  Image preview
function previewImage(url) {
  const img         = document.getElementById("previewImg");
  const placeholder = document.getElementById("previewPlaceholder");
  const box         = document.getElementById("previewBox");

  if (url && url.trim()) {
    img.src = url;
    img.onload = () => {
      img.classList.remove("d-none");
      placeholder.classList.add("d-none");
      box.classList.add("has-image");
    };
    img.onerror = () => {
      img.classList.add("d-none");
      placeholder.classList.remove("d-none");
      box.classList.remove("has-image");
    };
  } else {
    img.classList.add("d-none");
    placeholder.classList.remove("d-none");
    box.classList.remove("has-image");
  }
}
//  Init on DOM ready
document.addEventListener("DOMContentLoaded", async function () {
  const form = document.getElementById("villaForm");
  if (form) form.addEventListener("submit", saveVilla);

  const editId = getEditId();
  if (editId) {
    await loadVillaForEdit(editId);
  } else {
    setEditMode(false);
  }
});