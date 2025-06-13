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

    // Initialize card number segments
    const cardSegments = document.querySelectorAll('.card-number-segment');
    
    cardSegments.forEach((segment, index) => {
      segment.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        // Limit to 4 digits per segment
        if (value.length > 4) {
          value = value.slice(0, 4);
        }
        
        e.target.value = value;
        
        // Auto-focus to next segment when current is full
        if (value.length === 4 && index < cardSegments.length - 1) {
          cardSegments[index + 1].focus();
        }
      });

      // Handle backspace to go to previous segment
      segment.addEventListener('keydown', function(e) {
        if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
          cardSegments[index - 1].focus();
        }
      });
    });

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

    // Initialize payment method selection
    initializePaymentMethods();

    // Initialize phone input if intlTelInput is available
    const phoneInputField = document.querySelector("#phone");
    if (phoneInputField && window.intlTelInput) {
      const phoneInput = window.intlTelInput(phoneInputField, {
        utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
      });
    }

    // Form validation
    const form = document.getElementById('checkout-form');
    if (form) {
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
          // Form is valid, submit it
          form.submit();
        }
      });
    }

  } catch (error) {
    console.error('Error initializing checkout form:', error);
  }
});

// Form validation function
function validateForm() {
  let isValid = true;
  const errors = [];

  // Validate full name
  const fullName = document.getElementById('fullname');
  if (fullName && fullName.value.trim().split(' ').length < 2) {
    isValid = false;
    errors.push('Please enter your full name (first and last name)');
    fullName.classList.add('error');
  } else if (fullName) {
    fullName.classList.remove('error');
  }

  // Validate email
  const email = document.getElementById('email');
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email && !emailPattern.test(email.value)) {
    isValid = false;
    errors.push('Please enter a valid email address');
    email.classList.add('error');
  } else if (email) {
    email.classList.remove('error');
  }

  // Validate phone
  const phone = document.getElementById('phone');
  if (phone && phone.value.trim().length < 10) {
    isValid = false;
    errors.push('Please enter a valid phone number');
    phone.classList.add('error');
  } else if (phone) {
    phone.classList.remove('error');
  }

  // Validate address fields
  const requiredFields = ['country', 'city', 'address'];
  requiredFields.forEach(fieldId => {
    const field = document.getElementById(fieldId);
    if (field && !field.value.trim()) {
      isValid = false;
      errors.push(`Please fill in the ${fieldId} field`);
      field.classList.add('error');
    } else if (field) {
      field.classList.remove('error');
    }
  });

  // Check payment method and validate accordingly
  const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked');
  
  if (paymentMethod && paymentMethod.value === 'card') {
    // Validate card number
    const cardSegments = document.querySelectorAll('.card-number-segment');
    let cardNumber = '';
    cardSegments.forEach(segment => {
      cardNumber += segment.value;
      if (segment.value.length !== 4) {
        isValid = false;
        segment.classList.add('error');
      } else {
        segment.classList.remove('error');
      }
    });

    if (cardNumber.length !== 16) {
      isValid = false;
      errors.push('Please enter a valid 16-digit card number');
    }

    // Validate expiration date
    const expMonth = document.getElementById('expMonth');
    const expYear = document.getElementById('expYear');
    
    if (expMonth && expYear) {
      const month = parseInt(expMonth.value);
      const year = parseInt(expYear.value);
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear() % 100;
      const currentMonth = currentDate.getMonth() + 1;

      if (!month || month < 1 || month > 12) {
        isValid = false;
        errors.push('Please enter a valid expiration month');
        expMonth.classList.add('error');
      } else {
        expMonth.classList.remove('error');
      }

      if (!year || year < currentYear || (year === currentYear && month < currentMonth)) {
        isValid = false;
        errors.push('Please enter a valid expiration date');
        expYear.classList.add('error');
      } else {
        expYear.classList.remove('error');
      }
    }

    // Validate CVV
    const cvv = document.getElementById('cvv');
    if (cvv && cvv.value.length !== 3) {
      isValid = false;
      errors.push('Please enter a valid 3-digit CVV');
      cvv.classList.add('error');
    } else if (cvv) {
      cvv.classList.remove('error');
    }

    // Validate card name
    const cardName = document.getElementById('cardName');
    if (cardName && !cardName.value.trim()) {
      isValid = false;
      errors.push('Please enter the name on the card');
      cardName.classList.add('error');
    } else if (cardName) {
      cardName.classList.remove('error');
    }
  } else if (!paymentMethod) {
    isValid = false;
    errors.push('Please select a payment method');
  }

  // Validate identity image
  const identityImage = document.getElementById('identity-image');
  if (identityImage && !identityImage.files.length) {
    isValid = false;
    errors.push('Please upload your identity document');
    identityImage.parentElement.classList.add('error');
  } else if (identityImage) {
    identityImage.parentElement.classList.remove('error');
  }

  // Show errors if any
  if (!isValid) {
    alert('Please fix the following errors:\n\n' + errors.join('\n'));
  }

  return isValid;
}

// Identity Image Upload Functionality
function removeIdentityFile() {
    const fileInput = document.getElementById('identity-image');
    const preview = document.querySelector('.file-upload-preview');
    const placeholder = document.querySelector('.file-upload-placeholder');
    const container = document.querySelector('.file-upload-container');
    
    fileInput.value = '';
    preview.style.display = 'none';
    placeholder.style.display = 'flex';
    container.classList.remove('has-file');
}

// Handle file upload for identity document
document.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.getElementById('identity-image');
    const uploadDisplay = document.querySelector('.file-upload-display');
    const placeholder = document.querySelector('.file-upload-placeholder');
    const preview = document.querySelector('.file-upload-preview');
    const previewImg = document.getElementById('identity-preview');
    const fileName = document.querySelector('.file-name');
    const container = document.querySelector('.file-upload-container');

    if (fileInput && uploadDisplay) {
        // Handle file selection
        fileInput.addEventListener('change', handleFileSelect);

        // Handle drag and drop
        uploadDisplay.addEventListener('dragover', handleDragOver);
        uploadDisplay.addEventListener('dragleave', handleDragLeave);
        uploadDisplay.addEventListener('drop', handleDrop);

        function handleFileSelect(e) {
            const file = e.target.files[0];
            if (file) {
                processFile(file);
            }
        }

        function handleDragOver(e) {
            e.preventDefault();
            uploadDisplay.classList.add('drag-over');
        }

        function handleDragLeave(e) {
            e.preventDefault();
            uploadDisplay.classList.remove('drag-over');
        }

        function handleDrop(e) {
            e.preventDefault();
            uploadDisplay.classList.remove('drag-over');
            
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                const file = files[0];
                if (file.type.startsWith('image/')) {
                    fileInput.files = files;
                    processFile(file);
                } else {
                    alert('Please select a valid image file (PNG, JPG, JPEG)');
                }
            }
        }

        function processFile(file) {
            // Check file size (5MB limit)
            if (file.size > 5 * 1024 * 1024) {
                alert('File size must be less than 5MB');
                fileInput.value = '';
                return;
            }

            // Check file type
            if (!file.type.startsWith('image/')) {
                alert('Please select a valid image file (PNG, JPG, JPEG)');
                fileInput.value = '';
                return;
            }

            // Show preview
            const reader = new FileReader();
            reader.onload = function(e) {
                if (previewImg && fileName && preview && placeholder && container) {
                    previewImg.src = e.target.result;
                    fileName.textContent = file.name;
                    placeholder.style.display = 'none';
                    preview.style.display = 'flex';
                    container.classList.add('has-file');
                }
            };
            reader.readAsDataURL(file);
        }
    }
});

// Payment Method Functions
function initializePaymentMethods() {
    const paymentCardRadio = document.getElementById('payment-card');
    const paymentCashRadio = document.getElementById('payment-cash');
    const cardPaymentSection = document.getElementById('card-payment-section');
    const cashPaymentSection = document.getElementById('cash-payment-section');
    
    if (paymentCardRadio && paymentCashRadio && cardPaymentSection && cashPaymentSection) {
        // Add event listeners for payment method change
        paymentCardRadio.addEventListener('change', function() {
            if (this.checked) {
                showCardPayment();
            }
        });
        
        paymentCashRadio.addEventListener('change', function() {
            if (this.checked) {
                showCashPayment();
            }
        });
        
        // Initialize with card payment selected
        showCardPayment();
    }
}

function showCardPayment() {
    const cardPaymentSection = document.getElementById('card-payment-section');
    const cashPaymentSection = document.getElementById('cash-payment-section');
    
    if (cardPaymentSection && cashPaymentSection) {
        cardPaymentSection.style.display = 'block';
        cashPaymentSection.style.display = 'none';
        
        // Make card fields required
        setCardFieldsRequired(true);
    }
}

function showCashPayment() {
    const cardPaymentSection = document.getElementById('card-payment-section');
    const cashPaymentSection = document.getElementById('cash-payment-section');
    
    if (cardPaymentSection && cashPaymentSection) {
        cardPaymentSection.style.display = 'none';
        cashPaymentSection.style.display = 'block';
        
        // Make card fields not required
        setCardFieldsRequired(false);
    }
}

function setCardFieldsRequired(required) {
    const cardFields = [
        ...document.querySelectorAll('.card-number-segment'),
        document.getElementById('expMonth'),
        document.getElementById('expYear'),
        document.getElementById('cvv'),
        document.getElementById('cardName')
    ];
    
    cardFields.forEach(field => {
        if (field) {
            field.required = required;
            if (!required) {
                field.classList.remove('error');
            }
        }
    });
} 