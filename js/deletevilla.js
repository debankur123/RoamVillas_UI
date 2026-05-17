
let pendingDeleteId   = null;
let pendingDeleteName = "";

function openDeleteModal(id, name) {
  pendingDeleteId   = id;
  pendingDeleteName = name;

  document.getElementById("deleteVillaName").textContent = name;

  bootstrap.Modal.getOrCreateInstance(
    document.getElementById("deleteModal")
  ).show();
}

async function confirmDelete() {
  if (!pendingDeleteId) return;

  const confirmBtn = document.getElementById("confirmDeleteBtn");
  const modal      = bootstrap.Modal.getOrCreateInstance(
    document.getElementById("deleteModal")
  );

  confirmBtn.disabled = true;
  confirmBtn.innerHTML = `<span class="spinner-border spinner-border-sm me-2"></span>Deleting...`;

  try {
    const response = await fetch(
      `https://localhost:7070/api/Villa/DeleteVilla?id=${pendingDeleteId}`,
      { method: "POST" }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result?.message || "Failed to delete villa.");
    }

    if (result.data === false) {
      throw new Error("Villa could not be deleted. It may no longer exist.");
    }

    modal.hide();
    showDeleteSuccess(pendingDeleteName);
    await LoadVillas();

  } catch (error) {
    modal.hide();
    showDeleteError(error.message);

  } finally {
    confirmBtn.disabled  = false;
    confirmBtn.innerHTML = `<i class="bi bi-trash me-1"></i>Yes, Delete`;
    pendingDeleteId   = null;
    pendingDeleteName = "";
  }
}

function showDeleteSuccess(name) {
  const alert = document.getElementById("successAlert");
  const msg   = document.getElementById("successMessage");
  if (!alert || !msg) return;
  msg.textContent = `"${name}" was deleted successfully.`;
  alert.classList.remove("d-none");
  setTimeout(() => alert.classList.add("d-none"), 4000);
}

function showDeleteError(message) {
  const alert = document.getElementById("errorAlert");
  const msg   = document.getElementById("errorMessage");
  if (!alert || !msg) return;
  msg.textContent = message || "Something went wrong while deleting.";
  alert.classList.remove("d-none");
  setTimeout(() => alert.classList.add("d-none"), 5000);
}