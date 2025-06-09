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

document.addEventListener('DOMContentLoaded', function() {
  try {
    // Initialize country/city selectors
    const countrySelect = document.getElementById("country");
    const citySelect = document.getElementById("city");

    if (countrySelect && citySelect) {
      countrySelect.addEventListener("change", function() {
        const selectedCountry = this.value;
        citySelect.innerHTML = "<option value=''>Select City</option>";

        if (cityOptions[selectedCountry]) {
          cityOptions[selectedCountry].forEach(city => {
            const option = document.createElement("option");
            option.value = city;
            option.textContent = city;
            citySelect.appendChild(option);
          });
          citySelect.disabled = false;
        } else {
          citySelect.disabled = true;
        }
      });

      // Initialize city dropdown
      countrySelect.dispatchEvent(new Event('change'));
    }

    // Initialize card number input
    const cardNumberInput = document.getElementById('cardnumber');
    if (cardNumberInput) {
      cardNumberInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 16) value = value.slice(0, 16);
        
        // Add spaces every 4 digits
        const parts = [];
        for (let i = 0; i < value.length; i += 4) {
          parts.push(value.slice(i, i + 4));
        }
        e.target.value = parts.join(' ');
      });
    }

    // Initialize expiration date inputs
    const expMonthInput = document.getElementById('expMonth');
    const expYearInput = document.getElementById('expYear');

    if (expMonthInput) {
      expMonthInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 2) value = value.slice(0, 2);
        
        // Validate month
        if (value.length === 2) {
          const month = parseInt(value);
          if (month > 12) value = '12';
          if (month < 1) value = '01';
        }
        
        e.target.value = value;
        
        // Auto-focus to year input when month is complete
        if (value.length === 2 && expYearInput) {
          expYearInput.focus();
        }
      });
    }

    if (expYearInput) {
      expYearInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 2) value = value.slice(0, 2);
        e.target.value = value;
      });
    }

    // Initialize CVV input
    const cvvInput = document.getElementById('cvv');
    if (cvvInput) {
      cvvInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 3) value = value.slice(0, 3);
        e.target.value = value;
      });
    }

    // Initialize phone input
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
      window.intlTelInput(phoneInput, {
        utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
        preferredCountries: ['eg', 'us', 'gb'],
        separateDialCode: true
      });
    }

    // Form validation
    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
      checkoutForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Validate all fields
        let isValid = true;
        
        // Validate full name
        const fullName = document.getElementById('fullname').value.trim();
        const names = fullName.split(/\s+/);
        if (names.length < 2) {
          alert('Please enter your full name (at least two names)');
          document.getElementById('fullname').focus();
          return;
        }

        // Validate country and city
        const country = countrySelect.value;
        const city = citySelect.value;
        if (!country || !city) {
          alert('Please select both country and city');
          return;
        }

        // Validate card number
        let cardNumber = '';
        let isCardValid = true;
        const cardSegments = document.querySelectorAll('.card-number-segment');
        cardSegments.forEach(segment => {
          if (segment.value.length !== 4) {
            isCardValid = false;
            segment.classList.add('error');
          } else {
            cardNumber += segment.value;
          }
        });

        if (!isCardValid) {
          alert('Please enter a valid card number');
          cardSegments[0].focus();
          return;
        }
        
        // Validate expiry
        if (!validateExpiry(expMonthInput, expYearInput)) {
          alert('Please enter a valid expiration date');
          expMonthInput.focus();
          return;
        }
        
        // Validate CVV
        if (!validateCVV(cvvInput)) {
          alert('Please enter a valid CVV');
          cvvInput.focus();
          return;
        }

        // Get booking details from localStorage
        const carDetails = JSON.parse(localStorage.getItem('selectedCar') || '{}');
        const rentalDates = JSON.parse(localStorage.getItem('rentalDates') || '{}');

        // Prepare booking data
        const bookingData = {
          customer: {
            name: fullName,
            email: document.getElementById('email').value,
            phone: phoneInput.value
          },
          car: {
            name: carDetails.name || '',
            specifications: carDetails.specifications || '',
            rate: carDetails.rate || 0
          },
          rental: {
            pickupDate: rentalDates.pickup || '',
            returnDate: rentalDates.return || ''
          },
          payment: {
            cardLastFour: cardNumber.slice(-4)
          }
        };

        try {
          // Submit booking to backend
          const response = await fetch('/api/checkout/process', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(bookingData)
          });

          const result = await response.json();

          if (result.success) {
            // Store booking reference for success page
            localStorage.setItem('bookingDetails', JSON.stringify({
              bookingReference: result.booking.bookingReference,
              customerName: bookingData.customer.name,
              email: bookingData.customer.email,
              carName: bookingData.car.name,
              pickupDate: bookingData.rental.pickupDate,
              returnDate: bookingData.rental.returnDate,
              totalAmount: result.booking.totalAmount
            }));

            // Redirect to success page
            window.location.href = '/success';
          } else {
            throw new Error(result.message || 'Failed to process booking');
          }
        } catch (error) {
          console.error('Error processing booking:', error);
          alert('There was an error processing your booking. Please try again.');
        }
      });
    }

    // Helper functions
    function validateExpiry(monthInput, yearInput) {
      if (monthInput.value.length !== 2 || yearInput.value.length !== 2) return false;
      
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear() % 100;
      const currentMonth = currentDate.getMonth() + 1;
      
      const inputYear = parseInt(yearInput.value);
      const inputMonth = parseInt(monthInput.value);
      
      if (inputMonth < 1 || inputMonth > 12) return false;
      
      if (inputYear < currentYear || 
          (inputYear === currentYear && inputMonth < currentMonth)) {
        return false;
      }
      
      return true;
    }

    function validateCVV(cvvInput) {
      return cvvInput.value.length === 3 && /^\d+$/.test(cvvInput.value);
    }

    // Auto-focus functionality for card number segments
    function setupCardNumberAutoFocus() {
        const cardSegments = document.querySelectorAll('.card-number-segment');
        
        cardSegments.forEach((segment, index) => {
            // Only allow numbers
            segment.addEventListener('input', (e) => {
                // Remove any non-digit characters
                e.target.value = e.target.value.replace(/\D/g, '');
                
                // If we have 4 digits and there's a next segment, move to it
                if (e.target.value.length === 4 && index < cardSegments.length - 1) {
                    cardSegments[index + 1].focus();
                }
            });

            // Handle backspace
            segment.addEventListener('keydown', (e) => {
                if (e.key === 'Backspace' && e.target.value.length === 0 && index > 0) {
                    cardSegments[index - 1].focus();
                }
            });

            // Handle left/right arrow keys
            segment.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft' && index > 0) {
                    e.preventDefault();
                    cardSegments[index - 1].focus();
                }
                if (e.key === 'ArrowRight' && index < cardSegments.length - 1) {
                    e.preventDefault();
                    cardSegments[index + 1].focus();
                }
            });

            // Select all text when focusing
            segment.addEventListener('focus', (e) => {
                e.target.select();
            });
        });
    }

    setupCardNumberAutoFocus();

  } catch (error) {
    console.error('Error initializing checkout page:', error);
  }
}); 