// Cookie Analytics Usage Examples
// NileWay Rentals - How to use the analytics system

// Example usage for car rental tracking

// 1. Track when user views a car
function onCarView(carElement) {
    const carData = {
        id: carElement.dataset.carId || 'unknown',
        name: carElement.querySelector('.car-name')?.textContent || 'Unknown Car',
        category: carElement.dataset.category || 'unknown',
        brand: carElement.dataset.brand || 'unknown',
        price: carElement.dataset.price || '0'
    };
    
    // Use the global analytics function
    if (window.carRentalAnalytics) {
        window.carRentalAnalytics.trackCarView(carData);
    }
}

// 2. Track when user selects a car for booking
function onCarSelection(carData) {
    if (window.carRentalAnalytics) {
        window.carRentalAnalytics.trackCarSelection({
            id: carData.id,
            name: carData.name,
            category: carData.category,
            brand: carData.brand,
            price: carData.price,
            duration: carData.rentalDays || 1
        });
    }
}

// 3. Track booking process steps
function onBookingStep(stepName, carData) {
    if (window.carRentalAnalytics) {
        window.carRentalAnalytics.trackBookingStart({
            id: carData.id,
            name: carData.name,
            category: carData.category,
            brand: carData.brand,
            price: carData.dailyPrice,
            totalPrice: carData.totalPrice,
            startDate: carData.pickupDate,
            endDate: carData.returnDate,
            duration: carData.rentalDays
        });
    }
}

// 4. Track successful booking completion
function onBookingComplete(bookingData) {
    if (window.carRentalAnalytics) {
        window.carRentalAnalytics.trackBookingComplete({
            bookingId: bookingData.id,
            carId: bookingData.vehicle.id,
            carName: bookingData.vehicle.name,
            carCategory: bookingData.vehicle.category,
            carBrand: bookingData.vehicle.brand,
            carPrice: bookingData.vehicle.dailyPrice,
            totalPrice: bookingData.totalAmount,
            startDate: bookingData.pickupDate,
            endDate: bookingData.returnDate,
            duration: bookingData.rentalDays,
            pickupLocation: bookingData.pickupLocation,
            returnLocation: bookingData.returnLocation,
            coupon: bookingData.couponCode || ''
        });
    }
}

// 5. Track search queries
function onSearch(searchForm) {
    const formData = new FormData(searchForm);
    
    if (window.carRentalAnalytics) {
        window.carRentalAnalytics.trackSearch({
            query: formData.get('search') || '',
            pickup: formData.get('pickup_location') || '',
            return: formData.get('return_location') || '',
            startDate: formData.get('pickup_date') || '',
            endDate: formData.get('return_date') || '',
            vehicleType: formData.get('vehicle_type') || ''
        });
    }
}

// 6. Track filter usage
function onFilterChange(filterElement) {
    const filterType = filterElement.name || filterElement.id;
    const filterValue = filterElement.value;
    const resultsCount = document.querySelectorAll('.car-card, .vehicle-card').length;
    
    if (window.carRentalAnalytics) {
        window.carRentalAnalytics.trackFilter({
            type: filterType,
            value: filterValue,
            resultsCount: resultsCount
        });
    }
}

// 7. Auto-initialize tracking for common elements
document.addEventListener('DOMContentLoaded', function() {
    
    // Track car card clicks
    document.addEventListener('click', function(e) {
        const carCard = e.target.closest('.car-card, .vehicle-card, .rental-car');
        if (carCard) {
            onCarView(carCard);
        }
        
        // Track CTA button clicks
        const ctaButton = e.target.closest('.book-now, .reserve-now, .cta-button');
        if (ctaButton) {
            const carData = {
                id: ctaButton.dataset.carId || 'unknown',
                name: ctaButton.dataset.carName || 'Unknown',
                price: ctaButton.dataset.price || '0'
            };
            onCarSelection(carData);
        }
    });
    
    // Track form submissions
    document.addEventListener('submit', function(e) {
        const form = e.target;
        
        if (form.classList.contains('search-form') || form.id === 'car-search') {
            onSearch(form);
        }
        
        if (form.classList.contains('booking-form') || form.id === 'booking-form') {
            // Get booking data from form
            const formData = new FormData(form);
            const bookingData = {
                vehicle: {
                    id: formData.get('car_id') || 'unknown',
                    name: formData.get('car_name') || 'Unknown',
                    category: formData.get('car_category') || 'unknown',
                    brand: formData.get('car_brand') || 'unknown',
                    dailyPrice: formData.get('daily_price') || '0'
                },
                totalAmount: formData.get('total_amount') || '0',
                pickupDate: formData.get('pickup_date') || '',
                returnDate: formData.get('return_date') || '',
                rentalDays: formData.get('rental_days') || '1',
                pickupLocation: formData.get('pickup_location') || '',
                returnLocation: formData.get('return_location') || '',
                couponCode: formData.get('coupon_code') || ''
            };
            
            onBookingStep('booking_submit', bookingData);
        }
    });
    
    // Track filter changes
    document.addEventListener('change', function(e) {
        const filterElement = e.target;
        
        if (filterElement.closest('.filters, .search-filters, .vehicle-filters')) {
            onFilterChange(filterElement);
        }
    });
    
    // Track page-specific events
    const currentPage = window.location.pathname;
    
    if (currentPage.includes('success') || currentPage.includes('confirmation')) {
        // Track booking completion on success page
        const bookingData = getBookingDataFromPage();
        if (bookingData) {
            onBookingComplete(bookingData);
        }
    }
});

// Helper function to extract booking data from success page
function getBookingDataFromPage() {
    try {
        // Try to get data from page elements or localStorage
        const bookingId = document.querySelector('[data-booking-id]')?.dataset.bookingId ||
                         new URLSearchParams(window.location.search).get('booking_id') ||
                         localStorage.getItem('booking_id');
        
        if (!bookingId) return null;
        
        return {
            id: bookingId,
            vehicle: {
                id: localStorage.getItem('selected_car_id') || 'unknown',
                name: localStorage.getItem('selected_car_name') || 'Unknown',
                category: localStorage.getItem('selected_car_category') || 'unknown',
                brand: localStorage.getItem('selected_car_brand') || 'unknown',
                dailyPrice: localStorage.getItem('selected_car_price') || '0'
            },
            totalAmount: localStorage.getItem('booking_total') || '0',
            pickupDate: localStorage.getItem('pickup_date') || '',
            returnDate: localStorage.getItem('return_date') || '',
            rentalDays: localStorage.getItem('rental_days') || '1',
            pickupLocation: localStorage.getItem('pickup_location') || '',
            returnLocation: localStorage.getItem('return_location') || '',
            couponCode: localStorage.getItem('coupon_code') || ''
        };
    } catch (error) {
        console.error('Error getting booking data from page:', error);
        return null;
    }
}

// Utility function to check if analytics is enabled
function isAnalyticsEnabled() {
    return window.cookieConsentUtils && window.cookieConsentUtils.canUseAnalytics();
}

// Utility function to manually track custom events
function trackCustomEvent(eventName, eventData) {
    if (isAnalyticsEnabled() && window.cookieAnalytics) {
        window.cookieAnalytics.trackEvent(eventName, eventData);
    }
}

// Export functions for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        onCarView,
        onCarSelection,
        onBookingStep,
        onBookingComplete,
        onSearch,
        onFilterChange,
        trackCustomEvent,
        isAnalyticsEnabled
    };
} 