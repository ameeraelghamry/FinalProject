document.addEventListener('DOMContentLoaded', function() {
    // Get booking details from localStorage
    const bookingDetails = JSON.parse(localStorage.getItem('bookingDetails') || '{}');
    const carDetails = JSON.parse(localStorage.getItem('selectedCar') || '{}');
    const rentalDates = JSON.parse(localStorage.getItem('rentalDates') || '{}');

    // Fill in the booking details
    if (bookingDetails.bookingReference) {
        document.getElementById('booking-id').textContent = bookingDetails.bookingReference;
    }

    // Car Details
    if (carDetails.name) {
        document.getElementById('car-name').textContent = carDetails.name;
    }
    if (carDetails.specifications) {
        document.getElementById('car-specs').textContent = carDetails.specifications;
    }
    if (carDetails.image) {
        const carImage = document.getElementById('car-image');
        carImage.src = carDetails.image;
        carImage.alt = carDetails.name;
    }
    if (carDetails.passengers) {
        document.getElementById('passengers').textContent = `${carDetails.passengers} Passengers`;
    }
    if (carDetails.luggage) {
        document.getElementById('luggage').textContent = `${carDetails.luggage} Bags`;
    }
    if (carDetails.transmission) {
        document.getElementById('transmission').textContent = carDetails.transmission;
    }

    // Rental Information
    if (rentalDates.pickup) {
        const pickupDate = new Date(rentalDates.pickup);
        document.getElementById('pickup-date').textContent = pickupDate.toLocaleDateString();
        document.getElementById('pickup-time').textContent = pickupDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    if (rentalDates.return) {
        const returnDate = new Date(rentalDates.return);
        document.getElementById('return-date').textContent = returnDate.toLocaleDateString();
    }
    if (bookingDetails.pickupLocation) {
        document.getElementById('pickup-location').textContent = bookingDetails.pickupLocation;
    }

    // Payment Summary
    if (bookingDetails.rentalRate) {
        document.getElementById('rental-rate').textContent = `$${bookingDetails.rentalRate.toFixed(2)}`;
    }
    if (bookingDetails.insuranceFee) {
        document.getElementById('insurance-fee').textContent = `$${bookingDetails.insuranceFee.toFixed(2)}`;
    }
    if (bookingDetails.taxes) {
        document.getElementById('taxes').textContent = `$${bookingDetails.taxes.toFixed(2)}`;
    }
    if (bookingDetails.totalAmount) {
        document.getElementById('total-amount').textContent = `$${bookingDetails.totalAmount.toFixed(2)}`;
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

    // Clear the booking details from localStorage after displaying everything
    localStorage.removeItem('bookingDetails');
    localStorage.removeItem('selectedCar');
    localStorage.removeItem('rentalDates');
});

// Function to generate and download confirmation
function generateAndDownloadConfirmation(bookingDetails, carDetails, rentalDates) {
    const content = `
BOOKING CONFIRMATION
===================

Booking Reference: ${bookingDetails.bookingReference}
Date: ${new Date().toLocaleDateString()}

VEHICLE DETAILS
--------------
Car: ${carDetails.name}
Specifications: ${carDetails.specifications}
Passengers: ${carDetails.passengers}
Luggage Capacity: ${carDetails.luggage} Bags
Transmission: ${carDetails.transmission}

RENTAL INFORMATION
-----------------
Pickup Date: ${new Date(rentalDates.pickup).toLocaleDateString()}
Pickup Time: ${new Date(rentalDates.pickup).toLocaleTimeString()}
Return Date: ${new Date(rentalDates.return).toLocaleDateString()}
Location: ${bookingDetails.pickupLocation || 'Not specified'}

PAYMENT SUMMARY
--------------
Rental Rate: $${bookingDetails.rentalRate?.toFixed(2) || '0.00'}
Insurance: $${bookingDetails.insuranceFee?.toFixed(2) || '0.00'}
Taxes & Fees: $${bookingDetails.taxes?.toFixed(2) || '0.00'}
Total Paid: $${bookingDetails.totalAmount?.toFixed(2) || '0.00'}

CUSTOMER INFORMATION
-------------------
Name: ${bookingDetails.customerName}
Email: ${bookingDetails.email}

Thank you for choosing our service!
`;

    // Create blob and download
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `booking-confirmation-${bookingDetails.bookingReference}.txt`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
} 