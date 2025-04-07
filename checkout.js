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