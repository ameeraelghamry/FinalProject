// Country to city mapping
const cityOptions = {
  Algeria: ["Algiers", "Annaba", "Oran"],
  Argentina: ["Buenos Aires", "Cordoba", "Rosario"],
  Belgium: ["Antwerp", "Brussels", "Charleroi"],
  Brazil: ["Brasilia", "Salvador", "Manaus"],
  Canada: ["Toronto", "Vancouver", "Montreal"],
  China: ["Beijing", "Shanghai", "Guangzhou"],
  Chile: ["Santiago", "Valparaíso", "Concepción"],
  Colombia: ["Bogotá", "Medellín", "Cali"],
  Denmark: ["Copenhagen", "Aarhus", "Odense"]
};

document.addEventListener('DOMContentLoaded', function () {
  const countrySelect = document.getElementById("country");
  const citySelect = document.getElementById("city");

  countrySelect.addEventListener("change", function () {
    const selectedCountry = this.value;
    citySelect.innerHTML = "<option value=''>Select City</option>"; // Clear previous options

    if (cityOptions[selectedCountry]) {
      cityOptions[selectedCountry].forEach(city => {
        const option = document.createElement("option");
        option.value = city.toLowerCase();
        option.textContent = city;
        citySelect.appendChild(option);
      });
    }
  });
});

// Handle order submission
const placeOrderBtn = document.getElementById("placeOrderBtn");

placeOrderBtn.addEventListener("click", function (e) {
  e.preventDefault();

  const fullName = document.getElementById("fullname").value.trim();
  const email = document.getElementById("email").value.trim();

  if (!fullName || !email) {
    alert("Please fill out your name and email before placing the order.");
    return;
  }

  const orderCode = Math.floor(100000 + Math.random() * 900000);
  const orderDate = new Date().toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  localStorage.setItem("orderCode", orderCode);
  localStorage.setItem("orderDate", orderDate);

  // ✅ Redirect AFTER setting values
  window.location.href = "confirm.html";
});
