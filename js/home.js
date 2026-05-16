LoadVillas();
async function LoadVillas(id = null) {
    try {

        let URL = "https://localhost:7070/api/Villa/GetVillas";
        if (id && id !== 0) {
            URL = URL + "?id=" + id;
        }
        const response = await fetch(URL);
        if (!response.ok) {
            throw new Error("API Failed");
        }
        const result = await response.json();
        const villas = result.data;
        const noDataBlock = document.getElementById("noDataBlock");
        const container = document.getElementById("villaContainer");
        container.innerHTML = "";

        if (!villas || villas.length === 0) {
            noDataBlock.classList.remove("d-none");
            container.appendChild(noDataBlock);
            return;
        }
        noDataBlock.classList.add("d-none");
        let html = "";
        villas.forEach((element) => {
            let imageSection = "";
            if (element.imageURL && element.imageURL.trim() !== "") {
                imageSection = `
                    <img
                        src="${element.imageURL}"
                        class="card-img-top villa-image"
                        style="height: 250px; object-fit: cover"
                    />
                `;
            }
            else {
                imageSection = `
                    <div
                        class="card-img-top bg-gradient-primary d-flex align-items-center justify-content-center"
                        style="height: 250px"
                    >
                        <i class="bi bi-image text-white"
                           style="font-size: 4rem"></i>
                    </div>
                `;
            }
            html += `
                <div class="col">
                    <div class="card h-100 shadow-sm hover-shadow transition">
                        <!-- Image Section -->
                        <div class="position-relative overflow-hidden">
                            ${imageSection}
                            <!-- Price Badge -->
                            <div class="position-absolute top-0 end-0 m-3">
                                <span class="badge bg-success fs-6 px-3 py-2 rounded-pill shadow">
                                    $${element.rate}/night
                                </span>
                            </div>
                        </div>
                        <!-- Card Body -->
                        <div class="card-body d-flex flex-column">
                            <!-- Villa Name -->
                            <h5 class="card-title text-primary fw-bold mb-3">
                                ${element.name}
                            </h5>
                            <!-- Villa Details -->
                            <p class="card-text text-muted flex-grow-1">
                                ${element.details || ""}
                            </p>
                            <!-- Villa Info -->
                            <div class="mb-3">
                                <div class="row g-2">
                                    <!-- Occupancy -->
                                    <div class="col-6">
                                        <div class="d-flex align-items-center">
                                            <i class="bi bi-people-fill m-1"></i>
                                            <small class="text-muted">
                                                ${element.occupancy} Guests 
                                            </small>
                                        </div>
                                    </div>
                                    <!-- Sqft -->
                                    <div class="col-6">
                                        <div class="d-flex align-items-center float-end">
                                            <i class="bi bi-house m-1"></i>
                                            <small class="text-muted">
                                                ${element.sqft} sqft
                                            </small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- Contact Button -->
                            <div class="d-grid gap-2">
                                <a href="mailto:hello@dotnetmastery.com"
                                   class="btn btn-primary btn-hover">
                                    <i class="bi bi-envelope"></i>
                                    Contact Us
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });
        //footer elements 
        container.innerHTML = html;
        const totalVillas = villas.length;
        const minRate = Math.min(...villas.map(v => v.rate));
        const maxOccupancy = Math.max(...villas.map(v => v.occupancy));
        const totalSqft = villas.reduce((sum, v) => sum + v.sqft, 0);
        document.getElementById("totalVillas").innerText = totalVillas;
        document.getElementById("startingPrice").innerText = "$"+ minRate;
        document.getElementById("maxOccupancy").innerText = maxOccupancy;
        document.getElementById("totalSqft").innerText = totalSqft;
    } 
    catch (error) {
        console.error(error);
        showError("Failed to load villas");
    }
}