// Cookie Consent Event Handlers and Utilities
// NileWay Rentals - Cookie Consent Management

// Initialize cookie consent manager when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the global cookie consent manager
    window.cookieConsent = new CookieConsentManager();
    
    // Listen for cookie consent changes
    window.addEventListener('cookieConsentApplied', function(event) {
        const consent = event.detail;
        console.log('Cookie consent applied:', consent);
        
        // Custom logic based on consent preferences
        handleConsentChanges(consent);
    });
});

// Handle consent changes and apply business logic
function handleConsentChanges(consent) {
    try {
        // Enable/disable language switching based on functional cookies
        if (consent.functional) {
            document.body.classList.add('functional-cookies-enabled');
            enableLanguageFeatures();
        } else {
            document.body.classList.remove('functional-cookies-enabled');
            disableLanguageFeatures();
        }
        
        // Handle analytics tracking
        if (consent.analytics) {
            enableAnalyticsTracking();
        } else {
            disableAnalyticsTracking();
        }
        
        // Handle marketing features
        if (consent.marketing) {
            enableMarketingFeatures();
        } else {
            disableMarketingFeatures();
        }
        
        // Store consent timestamp for audit purposes
        const consentTimestamp = new Date().toISOString();
        localStorage.setItem('cookieConsentTimestamp', consentTimestamp);
        
    } catch (error) {
        console.error('Error handling consent changes:', error);
    }
}

// Utility function to check consent status anywhere in the app
function hasConsentFor(category) {
    try {
        const consent = window.cookieConsent?.getConsentStatus();
        return consent && consent[category] === true;
    } catch (error) {
        console.error('Error checking consent for category:', category, error);
        return false;
    }
}

// Check if user has given consent for specific features
function canUseAnalytics() {
    return hasConsentFor('analytics');
}

function canUseMarketing() {
    return hasConsentFor('marketing');
}

function canUseFunctional() {
    return hasConsentFor('functional');
}

// Enable/disable specific features based on consent
function enableLanguageFeatures() {
    // Allow language preference cookies
    const langSwitcher = document.querySelector('.language-switcher');
    if (langSwitcher) {
        langSwitcher.style.display = 'block';
    }
}

function disableLanguageFeatures() {
    // Disable language preference cookies
    const langSwitcher = document.querySelector('.language-switcher');
    if (langSwitcher) {
        langSwitcher.style.display = 'none';
    }
}

function enableAnalyticsTracking() {
    // Analytics tracking is handled by the main CookieConsentManager
    console.log('Analytics tracking enabled');
}

function disableAnalyticsTracking() {
    // Disable analytics tracking
    console.log('Analytics tracking disabled');
}

function enableMarketingFeatures() {
    // Enable marketing features like personalized content
    console.log('Marketing features enabled');
}

function disableMarketingFeatures() {
    // Disable marketing features
    console.log('Marketing features disabled');
}

// Utility function to manually trigger consent review
function showCookiePreferences() {
    if (window.cookieConsent) {
        window.cookieConsent.showPreferencesModal();
    }
}

// Utility function to get consent data for API calls
function getConsentData() {
    try {
        return window.cookieConsent?.getConsentStatus() || {
            necessary: true,
            analytics: false,
            marketing: false,
            functional: false
        };
    } catch (error) {
        console.error('Error getting consent data:', error);
        return {
            necessary: true,
            analytics: false,
            marketing: false,
            functional: false
        };
    }
}

// Export functions for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        hasConsentFor,
        canUseAnalytics,
        canUseMarketing,
        canUseFunctional,
        showCookiePreferences,
        getConsentData
    };
}

// Make functions available globally
window.cookieConsentUtils = {
    hasConsentFor,
    canUseAnalytics,
    canUseMarketing,
    canUseFunctional,
    showCookiePreferences,
    getConsentData
}; 