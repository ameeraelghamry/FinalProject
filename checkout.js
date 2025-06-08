<<<<<<< HEAD
const cityOptions = {
  AF: ["Kabul", "Kandahar", "Herat"],
  AL: ["Tirana", "Durrës", "Vlorë"],
  DZ: ["Algiers", "Annaba", "Oran"],
  AD: ["Andorra la Vella", "Escaldes-Engordany", "Encamp"],
  AO: ["Luanda", "Huambo", "Lubango"],
  AR: ["Buenos Aires", "Córdoba", "Rosario"],
  AM: ["Yerevan", "Gyumri", "Vanadzor"],
  AU: ["Sydney", "Melbourne", "Brisbane"],
  AT: ["Vienna", "Graz", "Linz"],
  AZ: ["Baku", "Ganja", "Sumqayit"],
  BS: ["Nassau", "Freeport", "West End"],
  BH: ["Manama", "Riffa", "Muharraq"],
  BD: ["Dhaka", "Chittagong", "Khulna"],
  BE: ["Antwerp", "Brussels", "Charleroi"],
  BZ: ["Belmopan", "Belize City", "San Ignacio"],
  BJ: ["Porto-Novo", "Cotonou", "Parakou"],
  BT: ["Thimphu", "Paro", "Punakha"],
  BO: ["La Paz", "Santa Cruz", "Cochabamba"],
  BA: ["Sarajevo", "Banja Luka", "Tuzla"],
  BW: ["Gaborone", "Francistown", "Maun"],
  BR: ["Brasilia", "Rio de Janeiro", "São Paulo"],
  BG: ["Sofia", "Plovdiv", "Varna"],
  KH: ["Phnom Penh", "Siem Reap", "Battambang"],
  CM: ["Yaoundé", "Douala", "Garoua"],
  CA: ["Toronto", "Vancouver", "Montreal"],
  CL: ["Santiago", "Valparaíso", "Concepción"],
  CN: ["Beijing", "Shanghai", "Guangzhou"],
  CO: ["Bogotá", "Medellín", "Cali"],
  HR: ["Zagreb", "Split", "Rijeka"],
  CU: ["Havana", "Santiago de Cuba", "Camagüey"],
  CY: ["Nicosia", "Limassol", "Larnaca"],
  CZ: ["Prague", "Brno", "Ostrava"],
  DK: ["Copenhagen", "Aarhus", "Odense"],
  DO: ["Santo Domingo", "Santiago", "La Romana"],
  EC: ["Quito", "Guayaquil", "Cuenca"],
  EG: ["Cairo", "Alexandria", "Giza"],
  EE: ["Tallinn", "Tartu", "Narva"],
  ET: ["Addis Ababa", "Dire Dawa", "Mekelle"],
  FI: ["Helsinki", "Espoo", "Tampere"],
  FR: ["Paris", "Marseille", "Lyon"],
  DE: ["Berlin", "Hamburg", "Munich"],
  GH: ["Accra", "Kumasi", "Tamale"],
  GR: ["Athens", "Thessaloniki", "Patras"],
  GT: ["Guatemala City", "Mixco", "Villa Nueva"],
  HT: ["Port-au-Prince", "Cap-Haïtien", "Gonaïves"],
  HN: ["Tegucigalpa", "San Pedro Sula", "La Ceiba"],
  HU: ["Budapest", "Debrecen", "Szeged"],
  IS: ["Reykjavík", "Kopavogur", "Hafnarfjörður"],
  IN: ["New Delhi", "Mumbai", "Bangalore"],
  ID: ["Jakarta", "Surabaya", "Bandung"],
  IR: ["Tehran", "Mashhad", "Isfahan"],
  IQ: ["Baghdad", "Basra", "Erbil"],
  IE: ["Dublin", "Cork", "Limerick"],
  IL: ["Jerusalem", "Tel Aviv", "Haifa"],
  IT: ["Rome", "Milan", "Naples"],
  JM: ["Kingston", "Spanish Town", "Montego Bay"],
  JP: ["Tokyo", "Osaka", "Kyoto"],
  JO: ["Amman", "Zarqa", "Irbid"],
  KZ: ["Almaty", "Astana", "Shymkent"],
  KE: ["Nairobi", "Mombasa", "Kisumu"],
  KR: ["Seoul", "Busan", "Incheon"],
  KW: ["Kuwait City", "Al Ahmadi", "Hawalli"],
  LV: ["Riga", "Daugavpils", "Liepāja"],
  LB: ["Beirut", "Tripoli", "Sidon"],
  LT: ["Vilnius", "Kaunas", "Klaipėda"],
  LU: ["Luxembourg City", "Esch-sur-Alzette", "Differdange"],
  MY: ["Kuala Lumpur", "George Town", "Johor Bahru"],
  MX: ["Mexico City", "Guadalajara", "Monterrey"],
  MA: ["Rabat", "Casablanca", "Marrakesh"],
  NP: ["Kathmandu", "Pokhara", "Lalitpur"],
  NL: ["Amsterdam", "Rotterdam", "The Hague"],
  NZ: ["Auckland", "Wellington", "Christchurch"],
  NG: ["Lagos", "Abuja", "Kano"],
  NO: ["Oslo", "Bergen", "Trondheim"],
  PK: ["Islamabad", "Karachi", "Lahore"],
  PE: ["Lima", "Arequipa", "Trujillo"],
  PH: ["Manila", "Quezon City", "Cebu"],
  PL: ["Warsaw", "Kraków", "Wrocław"],
  PT: ["Lisbon", "Porto", "Coimbra"],
  QA: ["Doha", "Al Rayyan", "Al Wakrah"],
  RO: ["Bucharest", "Cluj-Napoca", "Timișoara"],
  RU: ["Moscow", "Saint Petersburg", "Novosibirsk"],
  SA: ["Riyadh", "Jeddah", "Dammam"],
  RS: ["Belgrade", "Novi Sad", "Niš"],
  SG: ["Singapore"],
  SK: ["Bratislava", "Košice", "Prešov"],
  SI: ["Ljubljana", "Maribor", "Celje"],
  ZA: ["Johannesburg", "Cape Town", "Durban"],
  KR: ["Seoul", "Incheon", "Busan"],
  ES: ["Madrid", "Barcelona", "Valencia"],
  LK: ["Colombo", "Kandy", "Galle"],
  SD: ["Khartoum", "Omdurman", "Nyala"],
  SE: ["Stockholm", "Gothenburg", "Malmö"],
  CH: ["Zurich", "Geneva", "Bern"],
  SY: ["Damascus", "Aleppo", "Homs"],
  TW: ["Taipei", "Kaohsiung", "Taichung"],
  TZ: ["Dodoma", "Dar es Salaam", "Arusha"],
  TH: ["Bangkok", "Chiang Mai", "Pattaya"],
  TN: ["Tunis", "Sfax", "Sousse"],
  TR: ["Ankara", "Istanbul", "Izmir"],
  UG: ["Kampala", "Entebbe", "Gulu"],
  UA: ["Kyiv", "Lviv", "Kharkiv"],
  AE: ["Dubai", "Abu Dhabi", "Sharjah"],
  GB: ["London", "Manchester", "Birmingham"],
  US: ["New York", "Los Angeles", "Chicago"],
  UZ: ["Tashkent", "Samarkand", "Bukhara"],
  VE: ["Caracas", "Maracaibo", "Valencia"],
  VN: ["Hanoi", "Ho Chi Minh City", "Da Nang"],
  YE: ["Sana'a", "Aden", "Taiz"],
  ZM: ["Lusaka", "Ndola", "Kitwe"],
  ZW: ["Harare", "Bulawayo", "Mutare"]
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
  const address = document.getElementById("address").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const zipcode = document.getElementById("zipcode").value.trim();
  const country = document.getElementById("country").value.trim();
  const city = document.getElementById("city").value.trim();
  const cardnumber = document.getElementById("cardnumber").value.trim();
  const expdate = document.getElementById("expdate").value.trim();
  const cvv = document.getElementById("cvv").value.trim();

  if (!fullName || !email || !address || !phone || !zipcode || !country || !city || !cardnumber || !expdate || !cvv) {
    alert("Please fill out any missing field before placing the order.");
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

  // Redirect after setting values
  window.location.href = "success.html";
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
=======
const cityOptions = {
  AF: ["Kabul", "Kandahar", "Herat"],
  AL: ["Tirana", "Durrës", "Vlorë"],
  DZ: ["Algiers", "Annaba", "Oran"],
  AD: ["Andorra la Vella", "Escaldes-Engordany", "Encamp"],
  AO: ["Luanda", "Huambo", "Lubango"],
  AR: ["Buenos Aires", "Córdoba", "Rosario"],
  AM: ["Yerevan", "Gyumri", "Vanadzor"],
  AU: ["Sydney", "Melbourne", "Brisbane"],
  AT: ["Vienna", "Graz", "Linz"],
  AZ: ["Baku", "Ganja", "Sumqayit"],
  BS: ["Nassau", "Freeport", "West End"],
  BH: ["Manama", "Riffa", "Muharraq"],
  BD: ["Dhaka", "Chittagong", "Khulna"],
  BE: ["Antwerp", "Brussels", "Charleroi"],
  BZ: ["Belmopan", "Belize City", "San Ignacio"],
  BJ: ["Porto-Novo", "Cotonou", "Parakou"],
  BT: ["Thimphu", "Paro", "Punakha"],
  BO: ["La Paz", "Santa Cruz", "Cochabamba"],
  BA: ["Sarajevo", "Banja Luka", "Tuzla"],
  BW: ["Gaborone", "Francistown", "Maun"],
  BR: ["Brasilia", "Rio de Janeiro", "São Paulo"],
  BG: ["Sofia", "Plovdiv", "Varna"],
  KH: ["Phnom Penh", "Siem Reap", "Battambang"],
  CM: ["Yaoundé", "Douala", "Garoua"],
  CA: ["Toronto", "Vancouver", "Montreal"],
  CL: ["Santiago", "Valparaíso", "Concepción"],
  CN: ["Beijing", "Shanghai", "Guangzhou"],
  CO: ["Bogotá", "Medellín", "Cali"],
  HR: ["Zagreb", "Split", "Rijeka"],
  CU: ["Havana", "Santiago de Cuba", "Camagüey"],
  CY: ["Nicosia", "Limassol", "Larnaca"],
  CZ: ["Prague", "Brno", "Ostrava"],
  DK: ["Copenhagen", "Aarhus", "Odense"],
  DO: ["Santo Domingo", "Santiago", "La Romana"],
  EC: ["Quito", "Guayaquil", "Cuenca"],
  EG: ["Cairo", "Alexandria", "Giza"],
  EE: ["Tallinn", "Tartu", "Narva"],
  ET: ["Addis Ababa", "Dire Dawa", "Mekelle"],
  FI: ["Helsinki", "Espoo", "Tampere"],
  FR: ["Paris", "Marseille", "Lyon"],
  DE: ["Berlin", "Hamburg", "Munich"],
  GH: ["Accra", "Kumasi", "Tamale"],
  GR: ["Athens", "Thessaloniki", "Patras"],
  GT: ["Guatemala City", "Mixco", "Villa Nueva"],
  HT: ["Port-au-Prince", "Cap-Haïtien", "Gonaïves"],
  HN: ["Tegucigalpa", "San Pedro Sula", "La Ceiba"],
  HU: ["Budapest", "Debrecen", "Szeged"],
  IS: ["Reykjavík", "Kopavogur", "Hafnarfjörður"],
  IN: ["New Delhi", "Mumbai", "Bangalore"],
  ID: ["Jakarta", "Surabaya", "Bandung"],
  IR: ["Tehran", "Mashhad", "Isfahan"],
  IQ: ["Baghdad", "Basra", "Erbil"],
  IE: ["Dublin", "Cork", "Limerick"],
  IL: ["Jerusalem", "Tel Aviv", "Haifa"],
  IT: ["Rome", "Milan", "Naples"],
  JM: ["Kingston", "Spanish Town", "Montego Bay"],
  JP: ["Tokyo", "Osaka", "Kyoto"],
  JO: ["Amman", "Zarqa", "Irbid"],
  KZ: ["Almaty", "Astana", "Shymkent"],
  KE: ["Nairobi", "Mombasa", "Kisumu"],
  KR: ["Seoul", "Busan", "Incheon"],
  KW: ["Kuwait City", "Al Ahmadi", "Hawalli"],
  LV: ["Riga", "Daugavpils", "Liepāja"],
  LB: ["Beirut", "Tripoli", "Sidon"],
  LT: ["Vilnius", "Kaunas", "Klaipėda"],
  LU: ["Luxembourg City", "Esch-sur-Alzette", "Differdange"],
  MY: ["Kuala Lumpur", "George Town", "Johor Bahru"],
  MX: ["Mexico City", "Guadalajara", "Monterrey"],
  MA: ["Rabat", "Casablanca", "Marrakesh"],
  NP: ["Kathmandu", "Pokhara", "Lalitpur"],
  NL: ["Amsterdam", "Rotterdam", "The Hague"],
  NZ: ["Auckland", "Wellington", "Christchurch"],
  NG: ["Lagos", "Abuja", "Kano"],
  NO: ["Oslo", "Bergen", "Trondheim"],
  PK: ["Islamabad", "Karachi", "Lahore"],
  PE: ["Lima", "Arequipa", "Trujillo"],
  PH: ["Manila", "Quezon City", "Cebu"],
  PL: ["Warsaw", "Kraków", "Wrocław"],
  PT: ["Lisbon", "Porto", "Coimbra"],
  QA: ["Doha", "Al Rayyan", "Al Wakrah"],
  RO: ["Bucharest", "Cluj-Napoca", "Timișoara"],
  RU: ["Moscow", "Saint Petersburg", "Novosibirsk"],
  SA: ["Riyadh", "Jeddah", "Dammam"],
  RS: ["Belgrade", "Novi Sad", "Niš"],
  SG: ["Singapore"],
  SK: ["Bratislava", "Košice", "Prešov"],
  SI: ["Ljubljana", "Maribor", "Celje"],
  ZA: ["Johannesburg", "Cape Town", "Durban"],
  KR: ["Seoul", "Incheon", "Busan"],
  ES: ["Madrid", "Barcelona", "Valencia"],
  LK: ["Colombo", "Kandy", "Galle"],
  SD: ["Khartoum", "Omdurman", "Nyala"],
  SE: ["Stockholm", "Gothenburg", "Malmö"],
  CH: ["Zurich", "Geneva", "Bern"],
  SY: ["Damascus", "Aleppo", "Homs"],
  TW: ["Taipei", "Kaohsiung", "Taichung"],
  TZ: ["Dodoma", "Dar es Salaam", "Arusha"],
  TH: ["Bangkok", "Chiang Mai", "Pattaya"],
  TN: ["Tunis", "Sfax", "Sousse"],
  TR: ["Ankara", "Istanbul", "Izmir"],
  UG: ["Kampala", "Entebbe", "Gulu"],
  UA: ["Kyiv", "Lviv", "Kharkiv"],
  AE: ["Dubai", "Abu Dhabi", "Sharjah"],
  GB: ["London", "Manchester", "Birmingham"],
  US: ["New York", "Los Angeles", "Chicago"],
  UZ: ["Tashkent", "Samarkand", "Bukhara"],
  VE: ["Caracas", "Maracaibo", "Valencia"],
  VN: ["Hanoi", "Ho Chi Minh City", "Da Nang"],
  YE: ["Sana'a", "Aden", "Taiz"],
  ZM: ["Lusaka", "Ndola", "Kitwe"],
  ZW: ["Harare", "Bulawayo", "Mutare"]
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
  const address = document.getElementById("address").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const zipcode = document.getElementById("zipcode").value.trim();
  const country = document.getElementById("country").value.trim();
  const city = document.getElementById("city").value.trim();
  const cardnumber = document.getElementById("cardnumber").value.trim();
  const expdate = document.getElementById("expdate").value.trim();
  const cvv = document.getElementById("cvv").value.trim();

  if (!fullName || !email || !address || !phone || !zipcode || !country || !city || !cardnumber || !expdate || !cvv) {
    alert("Please fill out any missing field before placing the order.");
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

  // Redirect after setting values
  window.location.href = "success.html";
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
>>>>>>> be7cf73cf80d9ca7f6f3ced5ac389b9e424b9ea2
}