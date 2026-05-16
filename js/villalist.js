LoadVillas();
async function LoadVillas(id = null) {
    try {

        let URL =
            "https://localhost:7070/api/Villa/GetVillas";

        if (id && id !== 0) {

            URL = URL + "?id=" + id;
        }
        const response = await fetch(URL);
        if (!response.ok) {
            throw new Error("API Failed");
        }
        const result = await response.json();
        const villas = result.data;
        const tableBody = document.getElementById("villaTableBody");
        tableBody.innerHTML = "";

        if (!villas || villas.length === 0) {
            showNoVillaMessage();
            return;
        }

        hideNoVillaMessage();
        // Loop through villas
        villas.forEach((villa) => {
            let imageHtml = "";
            if (villa.imageURL &&
                villa.imageURL.trim() !== "") {
                imageHtml = `
                    <img src="${villa.imageURL}"
                         class="rounded"
                         style="
                            width:60px;
                            height:45px;
                            object-fit:cover;
                         ">
                `;
            }
            else {

                imageHtml = `
                    <div class="
                        bg-secondary
                        rounded
                        d-flex
                        align-items-center
                        justify-content-center
                        text-white"
                        style="
                            width:60px;
                            height:45px;">

                        <i class="bi bi-image"></i>
                    </div>
                `;
            }

            const row = `
                <tr>

                    <!-- Image -->
                    <td>
                        ${imageHtml}
                    </td>

                    <!-- Name -->
                    <td class="align-middle">
                        <strong>${villa.name}</strong>
                    </td>

                    <!-- Details -->
                    <td class="align-middle">
                        <small class="text-muted">
                            ${villa.details || ""}
                        </small>
                    </td>

                    <!-- Rate -->
                    <td class="align-middle">
                        <span class="badge bg-success">
                            $${villa.rate}
                        </span>
                    </td>

                    <!-- Occupancy -->
                    <td class="align-middle">
                        <i class="bi bi-people me-1"></i>
                        ${villa.occupancy}
                    </td>

                    <!-- Sqft -->
                    <td class="align-middle">
                        <i class="bi bi-rulers me-1"></i>
                        ${villa.sqft}
                    </td>

                    <!-- Actions -->
                    <td class="align-middle text-center">

                        <div class="btn-group btn-group-sm">

                            <a href="#"
                               class="btn btn-outline-warning"
                               title="Edit">

                                <i class="bi bi-pencil"></i>
                            </a>

                            <a href="#"
                               class="btn btn-outline-danger"
                               title="Delete">

                                <i class="bi bi-trash"></i>
                            </a>

                        </div>

                    </td>

                </tr>
            `;
            // Append row
            tableBody.innerHTML += row;
        });

    }
    catch (error) {

        console.error(error);

        showError("Failed to load villas");
    }
}