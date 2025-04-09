// Country to city mapping
const cityOptions = {
  Afghanistan: ["Kabul", "Kandahar", "Herat"],
  Albania: ["Tirana", "Durrës", "Vlorë"],
  Algeria: ["Algiers", "Annaba", "Oran"],
  Andorra: ["Andorra la Vella", "Escaldes-Engordany", "Encamp"],
  Angola: ["Luanda", "Huambo", "Lubango"],
  Argentina: ["Buenos Aires", "Córdoba", "Rosario"],
  Armenia: ["Yerevan", "Gyumri", "Vanadzor"],
  Australia: ["Sydney", "Melbourne", "Brisbane"],
  Austria: ["Vienna", "Graz", "Linz"],
  Azerbaijan: ["Baku", "Ganja", "Sumqayit"],
  Bahamas: ["Nassau", "Freeport", "West End"],
  Bahrain: ["Manama", "Riffa", "Muharraq"],
  Bangladesh: ["Dhaka", "Chittagong", "Khulna"],
  Belgium: ["Antwerp", "Brussels", "Charleroi"],
  Belize: ["Belmopan", "Belize City", "San Ignacio"],
  Benin: ["Porto-Novo", "Cotonou", "Parakou"],
  Bhutan: ["Thimphu", "Paro", "Punakha"],
  Bolivia: ["La Paz", "Santa Cruz", "Cochabamba"],
  Bosnia: ["Sarajevo", "Banja Luka", "Tuzla"],
  Botswana: ["Gaborone", "Francistown", "Maun"],
  Brazil: ["Brasilia", "Rio de Janeiro", "São Paulo"],
  Bulgaria: ["Sofia", "Plovdiv", "Varna"],
  Cambodia: ["Phnom Penh", "Siem Reap", "Battambang"],
  Cameroon: ["Yaoundé", "Douala", "Garoua"],
  Canada: ["Toronto", "Vancouver", "Montreal"],
  Chile: ["Santiago", "Valparaíso", "Concepción"],
  China: ["Beijing", "Shanghai", "Guangzhou"],
  Colombia: ["Bogotá", "Medellín", "Cali"],
  Croatia: ["Zagreb", "Split", "Rijeka"],
  Cuba: ["Havana", "Santiago de Cuba", "Camagüey"],
  Cyprus: ["Nicosia", "Limassol", "Larnaca"],
  Czech: ["Prague", "Brno", "Ostrava"],
  Denmark: ["Copenhagen", "Aarhus", "Odense"],
  Dominican: ["Santo Domingo", "Santiago", "La Romana"],
  Ecuador: ["Quito", "Guayaquil", "Cuenca"],
  Egypt: ["Cairo", "Alexandria", "Giza"],
  Estonia: ["Tallinn", "Tartu", "Narva"],
  Ethiopia: ["Addis Ababa", "Dire Dawa", "Mekelle"],
  Finland: ["Helsinki", "Espoo", "Tampere"],
  France: ["Paris", "Marseille", "Lyon"],
  Germany: ["Berlin", "Hamburg", "Munich"],
  Ghana: ["Accra", "Kumasi", "Tamale"],
  Greece: ["Athens", "Thessaloniki", "Patras"],
  Guatemala: ["Guatemala City", "Mixco", "Villa Nueva"],
  Haiti: ["Port-au-Prince", "Cap-Haïtien", "Gonaïves"],
  Honduras: ["Tegucigalpa", "San Pedro Sula", "La Ceiba"],
  Hungary: ["Budapest", "Debrecen", "Szeged"],
  Iceland: ["Reykjavík", "Kopavogur", "Hafnarfjörður"],
  India: ["New Delhi", "Mumbai", "Bangalore"],
  Indonesia: ["Jakarta", "Surabaya", "Bandung"],
  Iran: ["Tehran", "Mashhad", "Isfahan"],
  Iraq: ["Baghdad", "Basra", "Erbil"],
  Ireland: ["Dublin", "Cork", "Limerick"],
  Israel: ["Jerusalem", "Tel Aviv", "Haifa"],
  Italy: ["Rome", "Milan", "Naples"],
  Jamaica: ["Kingston", "Spanish Town", "Montego Bay"],
  Japan: ["Tokyo", "Osaka", "Kyoto"],
  Jordan: ["Amman", "Zarqa", "Irbid"],
  Kazakhstan: ["Almaty", "Astana", "Shymkent"],
  Kenya: ["Nairobi", "Mombasa", "Kisumu"],
  Korea: ["Seoul", "Busan", "Incheon"],
  Kuwait: ["Kuwait City", "Al Ahmadi", "Hawalli"],
  Latvia: ["Riga", "Daugavpils", "Liepāja"],
  Lebanon: ["Beirut", "Tripoli", "Sidon"],
  Lithuania: ["Vilnius", "Kaunas", "Klaipėda"],
  Luxembourg: ["Luxembourg City", "Esch-sur-Alzette", "Differdange"],
  Malaysia: ["Kuala Lumpur", "George Town", "Johor Bahru"],
  Mexico: ["Mexico City", "Guadalajara", "Monterrey"],
  Morocco: ["Rabat", "Casablanca", "Marrakesh"],
  Nepal: ["Kathmandu", "Pokhara", "Lalitpur"],
  Netherlands: ["Amsterdam", "Rotterdam", "The Hague"],
  NewZealand: ["Auckland", "Wellington", "Christchurch"],
  Nigeria: ["Lagos", "Abuja", "Kano"],
  Norway: ["Oslo", "Bergen", "Trondheim"],
  Pakistan: ["Islamabad", "Karachi", "Lahore"],
  Peru: ["Lima", "Arequipa", "Trujillo"],
  Philippines: ["Manila", "Quezon City", "Cebu"],
  Poland: ["Warsaw", "Kraków", "Wrocław"],
  Portugal: ["Lisbon", "Porto", "Coimbra"],
  Qatar: ["Doha", "Al Rayyan", "Al Wakrah"],
  Romania: ["Bucharest", "Cluj-Napoca", "Timișoara"],
  Russia: ["Moscow", "Saint Petersburg", "Novosibirsk"],
  SaudiArabia: ["Riyadh", "Jeddah", "Dammam"],
  Serbia: ["Belgrade", "Novi Sad", "Niš"],
  Singapore: ["Singapore"],
  Slovakia: ["Bratislava", "Košice", "Prešov"],
  Slovenia: ["Ljubljana", "Maribor", "Celje"],
  SouthAfrica: ["Johannesburg", "Cape Town", "Durban"],
  SouthKorea: ["Seoul", "Incheon", "Busan"],
  Spain: ["Madrid", "Barcelona", "Valencia"],
  SriLanka: ["Colombo", "Kandy", "Galle"],
  Sudan: ["Khartoum", "Omdurman", "Nyala"],
  Sweden: ["Stockholm", "Gothenburg", "Malmö"],
  Switzerland: ["Zurich", "Geneva", "Bern"],
  Syria: ["Damascus", "Aleppo", "Homs"],
  Taiwan: ["Taipei", "Kaohsiung", "Taichung"],
  Tanzania: ["Dodoma", "Dar es Salaam", "Arusha"],
  Thailand: ["Bangkok", "Chiang Mai", "Pattaya"],
  Tunisia: ["Tunis", "Sfax", "Sousse"],
  Turkey: ["Ankara", "Istanbul", "Izmir"],
  Uganda: ["Kampala", "Entebbe", "Gulu"],
  Ukraine: ["Kyiv", "Lviv", "Kharkiv"],
  UAE: ["Dubai", "Abu Dhabi", "Sharjah"],
  UK: ["London", "Manchester", "Birmingham"],
  USA: ["New York", "Los Angeles", "Chicago"],
  Uzbekistan: ["Tashkent", "Samarkand", "Bukhara"],
  Venezuela: ["Caracas", "Maracaibo", "Valencia"],
  Vietnam: ["Hanoi", "Ho Chi Minh City", "Da Nang"],
  Yemen: ["Sana'a", "Aden", "Taiz"],
  Zambia: ["Lusaka", "Ndola", "Kitwe"],
  Zimbabwe: ["Harare", "Bulawayo", "Mutare"]
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
const phoneInputField = document.querySelector("#phone");
const phoneInput = window.intlTelInput(phoneInputField, {
  utilsScript:
    "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
});
const info = document.querySelector(".alert-info");

function process(event) {
 event.preventDefault();

 const phoneNumber = phoneInput.getNumber();

 info.style.display = "";
 info.innerHTML = `Phone number in E.164 format: <strong>${phoneNumber}</strong>`;
}
