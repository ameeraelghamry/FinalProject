// Function to check booking status
async function checkBookingStatus(showLoadingState = false) {
    try {
        // Get the booking reference from the meta tag
        const bookingId = document.querySelector('meta[name="booking-reference"]').content;
        if (!bookingId) {
            console.error('No booking reference found');
            return;
        }
        
        // Show loading state if requested
        const checkButton = document.getElementById('check-status-btn');
        if (showLoadingState && checkButton) {
            checkButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Checking...';
            checkButton.disabled = true;
        }
        
        console.log('Checking status for booking:', bookingId);
        
        // Call the API to check status
        const response = await fetch(`/api/booking/status/${bookingId}`);
        const data = await response.json();
        
        if (response.ok) {
            console.log('Status check response:', data);
            
            // Handle different statuses
            if (data.status === 'confirmed') {
                window.location.href = `/success?ref=${bookingId}`;
                return;
            } else if (data.status === 'declined' || data.status === 'cancelled') {
                window.location.href = `/declined?ref=${bookingId}`;
                return;
            }
            
            // Reset button state if still pending
            if (showLoadingState && checkButton) {
                checkButton.innerHTML = '<i class="fas fa-sync"></i> Check Status';
                checkButton.disabled = false;
            }
        } else {
            console.error('Error checking status:', data.error);
            if (showLoadingState && checkButton) {
                checkButton.innerHTML = '<i class="fas fa-exclamation-circle"></i> Error Checking Status';
                checkButton.disabled = false;
                setTimeout(() => {
                    checkButton.innerHTML = '<i class="fas fa-sync"></i> Check Status';
                }, 3000);
            }
        }
    } catch (error) {
        console.error('Error checking booking status:', error);
        if (showLoadingState && checkButton) {
            checkButton.innerHTML = '<i class="fas fa-exclamation-circle"></i> Error Checking Status';
            checkButton.disabled = false;
            setTimeout(() => {
                checkButton.innerHTML = '<i class="fas fa-sync"></i> Check Status';
            }, 3000);
        }
    }
}

// Add event listener for the check status button
document.addEventListener('DOMContentLoaded', () => {
    const checkButton = document.getElementById('check-status-btn');
    if (checkButton) {
        checkButton.addEventListener('click', () => checkBookingStatus(true));
    }
    
    // Check status immediately and then every 5 seconds
    checkBookingStatus();
    const intervalId = setInterval(checkBookingStatus, 5000);
    
    // Clean up interval when page is unloaded
    window.addEventListener('unload', () => {
        clearInterval(intervalId);
    });
}); 