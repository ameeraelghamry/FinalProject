document.addEventListener('DOMContentLoaded', function() {
    // Generate a random booking ID each time
    const generateBookingId = () => {
        const year = new Date().getFullYear();
        const randomNumber = Math.floor(Math.random() * 900000) + 100000; // 6-digit random number
        return `NW-${year}-${randomNumber}`;
    };

    // Get booking details from localStorage
    const bookingDetails = JSON.parse(localStorage.getItem('bookingDetails') || '{}');
    const carDetails = JSON.parse(localStorage.getItem('selectedCar') || '{}');
    const rentalDates = JSON.parse(localStorage.getItem('rentalDates') || '{}');

    // Generate and display random booking ID
    const randomBookingId = generateBookingId();
    const bookingIdElement = document.getElementById('booking-id');
    if (bookingIdElement) {
        bookingIdElement.textContent = randomBookingId;
    }

    // Store the generated booking ID for potential future use
    bookingDetails.bookingReference = randomBookingId;

    // Car Details
    if (carDetails.name) {
        const carNameElement = document.getElementById('car-name');
        if (carNameElement) {
            carNameElement.textContent = carDetails.name;
        }
    }
    if (carDetails.specifications) {
        const carSpecsElement = document.getElementById('car-specs');
        if (carSpecsElement) {
            carSpecsElement.textContent = carDetails.specifications;
        }
    }
    if (carDetails.image) {
        const carImageElement = document.getElementById('car-image');
        if (carImageElement) {
            carImageElement.src = carDetails.image;
            carImageElement.alt = carDetails.name;
        }
    }
    if (carDetails.passengers) {
        const passengersElement = document.getElementById('passengers');
        if (passengersElement) {
            passengersElement.textContent = `${carDetails.passengers} Passengers`;
        }
    }
    if (carDetails.luggage) {
        const luggageElement = document.getElementById('luggage');
        if (luggageElement) {
            luggageElement.textContent = `${carDetails.luggage} Bags`;
        }
    }
    if (carDetails.transmission) {
        const transmissionElement = document.getElementById('transmission');
        if (transmissionElement) {
            transmissionElement.textContent = carDetails.transmission;
        }
    }

    // Rental Information
    if (rentalDates.pickup) {
        const pickupDate = new Date(rentalDates.pickup);
        const pickupDateElement = document.getElementById('pickup-date');
        const pickupTimeElement = document.getElementById('pickup-time');
        
        if (pickupDateElement) {
            pickupDateElement.textContent = pickupDate.toLocaleDateString();
        }
        if (pickupTimeElement) {
            pickupTimeElement.textContent = pickupDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        }
    }
    if (rentalDates.return) {
        const returnDate = new Date(rentalDates.return);
        const returnDateElement = document.getElementById('return-date');
        if (returnDateElement) {
            returnDateElement.textContent = returnDate.toLocaleDateString();
        }
    }
    if (bookingDetails.pickupLocation) {
        const pickupLocationElement = document.getElementById('pickup-location');
        if (pickupLocationElement) {
            pickupLocationElement.textContent = bookingDetails.pickupLocation;
        }
    }

    // Payment Summary
    if (bookingDetails.rentalRate) {
        const rentalRateElement = document.getElementById('rental-rate');
        if (rentalRateElement) {
            rentalRateElement.textContent = `$${bookingDetails.rentalRate.toFixed(2)}`;
        }
    }
    if (bookingDetails.insuranceFee) {
        const insuranceFeeElement = document.getElementById('insurance-fee');
        if (insuranceFeeElement) {
            insuranceFeeElement.textContent = `$${bookingDetails.insuranceFee.toFixed(2)}`;
        }
    }
    if (bookingDetails.taxes) {
        const taxesElement = document.getElementById('taxes');
        if (taxesElement) {
            taxesElement.textContent = `$${bookingDetails.taxes.toFixed(2)}`;
        }
    }
    if (bookingDetails.totalAmount) {
        const totalAmountElement = document.getElementById('total-amount');
        if (totalAmountElement) {
            totalAmountElement.textContent = `$${bookingDetails.totalAmount.toFixed(2)}`;
        }
    }

    // Handle download confirmation button
    const downloadButton = document.getElementById('download-confirmation');
    if (downloadButton) {
        downloadButton.addEventListener('click', function(e) {
            e.preventDefault();
            generateAndDownloadConfirmation(bookingDetails, carDetails, rentalDates);
        });
    }

    // Handle the return to home button click
    const homeButton = document.querySelector('.secondary-button');
    if (homeButton) {
        homeButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = '/';
        });
    }

    // Navigation functionality for mobile menu
    const navToggle = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Clear the booking details from localStorage after displaying everything
    // Note: We might want to keep this data for a while in case user refreshes
    // setTimeout(() => {
    //     localStorage.removeItem('bookingDetails');
    //     localStorage.removeItem('selectedCar');
    //     localStorage.removeItem('rentalDates');
    // }, 5000); // Clear after 5 seconds
});

// Function to generate and download confirmation
function generateAndDownloadConfirmation(bookingDetails, carDetails, rentalDates) {
    const content = `
BOOKING CONFIRMATION
===================

Booking Reference: ${bookingDetails.bookingReference || 'N/A'}
Date: ${new Date().toLocaleDateString()}

VEHICLE DETAILS
--------------
Car: ${carDetails.name || 'N/A'}
Specifications: ${carDetails.specifications || 'N/A'}
Passengers: ${carDetails.passengers || 'N/A'}
Luggage Capacity: ${carDetails.luggage || 'N/A'} Bags
Transmission: ${carDetails.transmission || 'N/A'}

RENTAL INFORMATION
-----------------
Pickup Date: ${rentalDates.pickup ? new Date(rentalDates.pickup).toLocaleDateString() : 'N/A'}
Pickup Time: ${rentalDates.pickup ? new Date(rentalDates.pickup).toLocaleTimeString() : 'N/A'}
Return Date: ${rentalDates.return ? new Date(rentalDates.return).toLocaleDateString() : 'N/A'}
Location: ${bookingDetails.pickupLocation || 'Not specified'}

PAYMENT SUMMARY
--------------
Rental Rate: $${bookingDetails.rentalRate?.toFixed(2) || '0.00'}
Insurance: $${bookingDetails.insuranceFee?.toFixed(2) || '0.00'}
Taxes & Fees: $${bookingDetails.taxes?.toFixed(2) || '0.00'}
Total Paid: $${bookingDetails.totalAmount?.toFixed(2) || '0.00'}

CUSTOMER INFORMATION
-------------------
Name: ${bookingDetails.customerName || 'N/A'}
Email: ${bookingDetails.email || 'N/A'}

Thank you for choosing NileWay Rentals!
`;

    // Create blob and download
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `booking-confirmation-${bookingDetails.bookingReference || 'unknown'}.txt`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
} 