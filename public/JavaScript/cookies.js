// Cookie Consent Management System with MongoDB Integration
// NileWay Rentals - GDPR Compliant Cookie Management

class CookieConsentManager {
    constructor() {
        this.sessionId = this.generateSessionId();
        this.apiEndpoint = '/api/cookie-consent';
        this.consentData = {
            necessary: true,
            analytics: false,
            marketing: false,
            functional: false
        };
        this.isInitialized = false;
        
        // Initialize when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
    }

    // Generate unique session ID
    generateSessionId() {
        return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    // Initialize the cookie consent system
    async init() {
        if (this.isInitialized) return;
        
        try {
            console.log('Initializing Cookie Consent Manager...');
            
            // Check if consent already exists
            const existingConsent = await this.checkExistingConsent();
            
            if (existingConsent) {
                this.applyConsentSettings(existingConsent.consentData);
                this.showCookieSettingsButton();
            } else {
                this.showConsentBanner();
            }
            
            this.attachEventListeners();
            this.isInitialized = true;
            
            console.log('Cookie Consent Manager initialized successfully');
        } catch (error) {
            console.error('Error initializing Cookie Consent Manager:', error);
            // Fallback to local storage only
            this.initializeFallback();
        }
    }

    // Check for existing consent in both localStorage and server
    async checkExistingConsent() {
        try {
            // First check localStorage for quick response
            const localConsent = localStorage.getItem('cookieConsent');
            
            if (localConsent) {
                const parsed = JSON.parse(localConsent);
                
                // Check if consent is still valid (not expired)
                if (new Date(parsed.expiresAt) > new Date()) {
                    return parsed;
                }
            }
            
            // Check server for consent data
            const response = await fetch(`${this.apiEndpoint}/${this.sessionId}`);
            
            if (response.ok) {
                const serverConsent = await response.json();
                
                if (serverConsent.success && serverConsent.data) {
                    // Update localStorage with server data
                    localStorage.setItem('cookieConsent', JSON.stringify(serverConsent.data));
                    return serverConsent.data;
                }
            }
            
            return null;
        } catch (error) {
            console.error('Error checking existing consent:', error);
            
            // Fallback to localStorage only
            const localConsent = localStorage.getItem('cookieConsent');
            return localConsent ? JSON.parse(localConsent) : null;
        }
    }

    // Fallback initialization when server is not available
    initializeFallback() {
        console.log('Falling back to localStorage-only mode');
        
        const localConsent = localStorage.getItem('cookieConsent');
        
        if (localConsent) {
            const parsed = JSON.parse(localConsent);
            
            if (new Date(parsed.expiresAt) > new Date()) {
                this.applyConsentSettings(parsed.consentData);
                this.showCookieSettingsButton();
                return;
            }
        }
        
        this.showConsentBanner();
        this.attachEventListeners();
    }

    // Show the cookie consent banner
    showConsentBanner() {
        const banner = document.getElementById('cookie-consent-banner');
        if (banner) {
            banner.style.display = 'flex';
            banner.classList.add('cookie-banner-show');
        }
    }

    // Hide the cookie consent banner
    hideConsentBanner() {
        const banner = document.getElementById('cookie-consent-banner');
        if (banner) {
            banner.classList.add('cookie-banner-hide');
            setTimeout(() => {
                banner.style.display = 'none';
                banner.classList.remove('cookie-banner-hide');
            }, 300);
        }
    }

    // Show the cookie settings button
    showCookieSettingsButton() {
        const settingsBtn = document.getElementById('cookie-settings-btn');
        if (settingsBtn) {
            settingsBtn.style.display = 'flex';
            settingsBtn.classList.add('cookie-settings-show');
        }
    }

    // Attach event listeners to all cookie consent elements
    attachEventListeners() {
        // Accept all cookies button
        const acceptAllBtn = document.getElementById('accept-all-cookies');
        if (acceptAllBtn) {
            acceptAllBtn.addEventListener('click', () => this.acceptAllCookies());
        }

        // Accept selected cookies button
        const acceptSelectedBtn = document.getElementById('accept-selected-cookies');
        if (acceptSelectedBtn) {
            acceptSelectedBtn.addEventListener('click', () => this.acceptSelectedCookies());
        }

        // Decline all cookies button
        const declineBtn = document.getElementById('decline-cookies');
        if (declineBtn) {
            declineBtn.addEventListener('click', () => this.declineAllCookies());
        }

        // Cookie settings button (floating)
        const settingsBtn = document.getElementById('cookie-settings-btn');
        if (settingsBtn) {
            settingsBtn.addEventListener('click', () => this.showPreferencesModal());
        }

        // Preferences modal controls
        const savePreferencesBtn = document.getElementById('save-cookie-preferences');
        if (savePreferencesBtn) {
            savePreferencesBtn.addEventListener('click', () => this.savePreferences());
        }

        const acceptAllModalBtn = document.getElementById('accept-all-modal');
        if (acceptAllModalBtn) {
            acceptAllModalBtn.addEventListener('click', () => this.acceptAllFromModal());
        }

        const closeModalBtn = document.getElementById('close-cookie-modal');
        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', () => this.hidePreferencesModal());
        }

        // Sync banner checkboxes with modal checkboxes
        this.syncCheckboxes();
    }

    // Sync checkbox states between banner and modal
    syncCheckboxes() {
        const bannerCheckboxes = ['analytics-cookies', 'marketing-cookies', 'functional-cookies'];
        const modalCheckboxes = ['modal-analytics', 'modal-marketing', 'modal-functional'];

        bannerCheckboxes.forEach((bannerId, index) => {
            const bannerCheckbox = document.getElementById(bannerId);
            const modalCheckbox = document.getElementById(modalCheckboxes[index]);

            if (bannerCheckbox && modalCheckbox) {
                // Sync banner to modal
                bannerCheckbox.addEventListener('change', () => {
                    modalCheckbox.checked = bannerCheckbox.checked;
                });

                // Sync modal to banner
                modalCheckbox.addEventListener('change', () => {
                    bannerCheckbox.checked = modalCheckbox.checked;
                });
            }
        });
    }

    // Accept all cookies
    async acceptAllCookies() {
        this.consentData = {
            necessary: true,
            analytics: true,
            marketing: true,
            functional: true
        };

        await this.saveConsent('banner_accept_all');
        this.applyConsentSettings(this.consentData);
        this.hideConsentBanner();
        this.showCookieSettingsButton();
        this.showConsentMessage('All cookies accepted. Thank you!', 'success');
    }

    // Accept selected cookies
    async acceptSelectedCookies() {
        this.consentData = {
            necessary: true,
            analytics: document.getElementById('analytics-cookies')?.checked || false,
            marketing: document.getElementById('marketing-cookies')?.checked || false,
            functional: document.getElementById('functional-cookies')?.checked || false
        };

        await this.saveConsent('banner_accept_selected');
        this.applyConsentSettings(this.consentData);
        this.hideConsentBanner();
        this.showCookieSettingsButton();
        this.showConsentMessage('Cookie preferences saved successfully!', 'success');
    }

    // Decline all cookies (except necessary)
    async declineAllCookies() {
        this.consentData = {
            necessary: true,
            analytics: false,
            marketing: false,
            functional: false
        };

        await this.saveConsent('banner_decline');
        this.applyConsentSettings(this.consentData);
        this.hideConsentBanner();
        this.showCookieSettingsButton();
        this.showConsentMessage('Only necessary cookies are enabled.', 'info');
    }

    // Show preferences modal
    showPreferencesModal() {
        const modal = document.getElementById('cookie-preferences-modal');
        if (modal) {
            // Load current settings into modal
            this.loadCurrentSettingsIntoModal();
            modal.style.display = 'flex';
            modal.classList.add('cookie-modal-show');
            document.body.style.overflow = 'hidden';
        }
    }

    // Hide preferences modal
    hidePreferencesModal() {
        const modal = document.getElementById('cookie-preferences-modal');
        if (modal) {
            modal.classList.add('cookie-modal-hide');
            setTimeout(() => {
                modal.style.display = 'none';
                modal.classList.remove('cookie-modal-hide', 'cookie-modal-show');
                document.body.style.overflow = '';
            }, 300);
        }
    }

    // Load current settings into modal
    loadCurrentSettingsIntoModal() {
        const currentConsent = JSON.parse(localStorage.getItem('cookieConsent') || '{}');
        const consentData = currentConsent.consentData || this.consentData;

        const modalCheckboxes = {
            'modal-analytics': consentData.analytics,
            'modal-marketing': consentData.marketing,
            'modal-functional': consentData.functional
        };

        Object.entries(modalCheckboxes).forEach(([id, checked]) => {
            const checkbox = document.getElementById(id);
            if (checkbox) {
                checkbox.checked = checked;
            }
        });
    }

    // Save preferences from modal
    async savePreferences() {
        this.consentData = {
            necessary: true,
            analytics: document.getElementById('modal-analytics')?.checked || false,
            marketing: document.getElementById('modal-marketing')?.checked || false,
            functional: document.getElementById('modal-functional')?.checked || false
        };

        await this.saveConsent('preferences_modal');
        this.applyConsentSettings(this.consentData);
        this.hidePreferencesModal();
        this.showConsentMessage('Cookie preferences updated successfully!', 'success');
    }

    // Accept all from modal
    async acceptAllFromModal() {
        this.consentData = {
            necessary: true,
            analytics: true,
            marketing: true,
            functional: true
        };

        await this.saveConsent('preferences_modal');
        this.applyConsentSettings(this.consentData);
        this.hidePreferencesModal();
        this.showConsentMessage('All cookies accepted. Thank you!', 'success');
    }

    // Save consent to both localStorage and server
    async saveConsent(method) {
        const consentRecord = {
            sessionId: this.sessionId,
            ipAddress: await this.getClientIP(),
            userAgent: navigator.userAgent,
            browserInfo: this.getBrowserInfo(),
            location: await this.getLocationInfo(),
            consentData: this.consentData,
            consentMethod: method,
            consentVersion: '1.0',
            consentTimestamp: new Date().toISOString(),
            expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(), // 1 year
            source: 'website',
            referrer: document.referrer,
            consentPage: window.location.href,
            gdprCompliant: true
        };

        // Save to localStorage immediately
        localStorage.setItem('cookieConsent', JSON.stringify(consentRecord));

        // Save to server (non-blocking)
        try {
            const response = await fetch(this.apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(consentRecord)
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Consent saved to server:', result);
                
                // Update sessionId if server returned one
                if (result.sessionId) {
                    this.sessionId = result.sessionId;
                    consentRecord.sessionId = result.sessionId;
                    localStorage.setItem('cookieConsent', JSON.stringify(consentRecord));
                }
            } else {
                console.warn('Failed to save consent to server, using localStorage only');
            }
        } catch (error) {
            console.error('Error saving consent to server:', error);
            // Continue with localStorage only
        }

        return consentRecord;
    }

    // Apply consent settings (load scripts, set cookies, etc.)
    applyConsentSettings(consentData) {
        console.log('Applying consent settings:', consentData);

        // Analytics cookies
        if (consentData.analytics) {
            this.loadAnalyticsScripts();
        } else {
            this.removeAnalyticsCookies();
        }

        // Marketing cookies
        if (consentData.marketing) {
            this.loadMarketingScripts();
        } else {
            this.removeMarketingCookies();
        }

        // Functional cookies
        if (consentData.functional) {
            this.loadFunctionalScripts();
        } else {
            this.removeFunctionalCookies();
        }

        // Update current consent data
        this.consentData = consentData;
    }

    // Load analytics scripts (Google Analytics, etc.)
    loadAnalyticsScripts() {
        if (window.gtag) return; // Already loaded

        try {
            // Load the analytics JavaScript file
            const analyticsScript = document.createElement('script');
            analyticsScript.src = '/JavaScript/cookie-analytics.js';
            analyticsScript.async = true;
            document.head.appendChild(analyticsScript);
            
            // Initialize analytics when script loads
            analyticsScript.onload = () => {
                if (window.cookieAnalytics) {
                    console.log('Cookie Analytics system loaded');
                }
            };
            
            console.log('Analytics scripts loading...');
        } catch (error) {
            console.error('Error loading analytics scripts:', error);
        }
    }

    // Load marketing scripts
    loadMarketingScripts() {
        // Facebook Pixel, Google Ads, etc.
        console.log('Loading marketing scripts...');
        
        // Example: Facebook Pixel
        // !function(f,b,e,v,n,t,s)
        // {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        // n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        // ...
    }

    // Load functional scripts
    loadFunctionalScripts() {
        // Chat widgets, preference storage, etc.
        console.log('Loading functional scripts...');
    }

    // Remove analytics cookies
    removeAnalyticsCookies() {
        // Google Analytics cookies
        this.deleteCookie('_ga');
        this.deleteCookie('_ga_*');
        this.deleteCookie('_gid');
        this.deleteCookie('_gat');
        this.deleteCookie('_gat_*');
        this.deleteCookie('_dc_gtm_*');
        this.deleteCookie('_gcl_*');
        
        // Universal Analytics (legacy)
        this.deleteCookie('__utma');
        this.deleteCookie('__utmb');
        this.deleteCookie('__utmc');
        this.deleteCookie('__utmz');
        this.deleteCookie('__utmv');
        
        // Hotjar
        this.deleteCookie('_hjid');
        this.deleteCookie('_hjFirstSeen');
        this.deleteCookie('_hjIncludedInSessionSample');
        this.deleteCookie('_hjSessionUser_*');
        this.deleteCookie('_hjSession_*');
        
        // Clear dataLayer
        if (window.dataLayer) {
            window.dataLayer.length = 0;
        }
        
        console.log('Analytics cookies removed');
    }

    // Remove marketing cookies
    removeMarketingCookies() {
        this.deleteCookie('_fbp');
        this.deleteCookie('_fbc');
        console.log('Marketing cookies removed');
    }

    // Remove functional cookies
    removeFunctionalCookies() {
        this.deleteCookie('preferences');
        this.deleteCookie('theme');
        console.log('Functional cookies removed');
    }

    // Utility: Delete a cookie
    deleteCookie(name) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname};`;
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${window.location.hostname};`;
    }

    // Get client IP address
    async getClientIP() {
        try {
            const response = await fetch('https://api.ipify.org?format=json');
            const data = await response.json();
            return data.ip;
        } catch (error) {
            console.error('Error getting IP address:', error);
            return 'unknown';
        }
    }

    // Get browser information
    getBrowserInfo() {
        const ua = navigator.userAgent;
        const browserInfo = {
            name: 'Unknown',
            version: 'Unknown',
            platform: navigator.platform,
            isMobile: /Mobi|Android/i.test(ua),
            language: navigator.language
        };

        // Detect browser
        if (ua.includes('Chrome')) {
            browserInfo.name = 'Chrome';
            browserInfo.version = ua.match(/Chrome\/(\d+)/)?.[1] || 'Unknown';
        } else if (ua.includes('Firefox')) {
            browserInfo.name = 'Firefox';
            browserInfo.version = ua.match(/Firefox\/(\d+)/)?.[1] || 'Unknown';
        } else if (ua.includes('Safari') && !ua.includes('Chrome')) {
            browserInfo.name = 'Safari';
            browserInfo.version = ua.match(/Version\/(\d+)/)?.[1] || 'Unknown';
        } else if (ua.includes('Edge')) {
            browserInfo.name = 'Edge';
            browserInfo.version = ua.match(/Edge\/(\d+)/)?.[1] || 'Unknown';
        }

        return browserInfo;
    }

    // Get location information (approximate)
    async getLocationInfo() {
        try {
            const response = await fetch('https://ipapi.co/json/');
            const data = await response.json();
            return {
                country: data.country_name,
                region: data.region,
                city: data.city,
                timezone: data.timezone
            };
        } catch (error) {
            console.error('Error getting location info:', error);
            return {
                country: 'Unknown',
                region: 'Unknown',
                city: 'Unknown',
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
            };
        }
    }

    // Show consent message
    showConsentMessage(message, type = 'info') {
        // Create and show a temporary message
        const messageDiv = document.createElement('div');
        messageDiv.className = `cookie-consent-message cookie-message-${type}`;
        messageDiv.innerHTML = `
            <div class="cookie-message-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
        `;

        document.body.appendChild(messageDiv);

        // Show with animation
        setTimeout(() => messageDiv.classList.add('cookie-message-show'), 100);

        // Hide after 3 seconds
        setTimeout(() => {
            messageDiv.classList.remove('cookie-message-show');
            setTimeout(() => messageDiv.remove(), 300);
        }, 3000);
    }

    // Public API methods

    // Get current consent status
    getConsentStatus() {
        const consent = localStorage.getItem('cookieConsent');
        return consent ? JSON.parse(consent) : null;
    }

    // Check if specific consent is granted
    hasConsent(type) {
        const consent = this.getConsentStatus();
        return consent?.consentData?.[type] || false;
    }

    // Update specific consent
    async updateConsent(type, granted) {
        if (type === 'necessary') return; // Cannot change necessary cookies

        const currentConsent = this.getConsentStatus();
        if (currentConsent) {
            currentConsent.consentData[type] = granted;
            this.consentData = currentConsent.consentData;
            await this.saveConsent('api_update');
            this.applyConsentSettings(this.consentData);
        }
    }

    // Withdraw all consent
    async withdrawConsent() {
        this.consentData = {
            necessary: true,
            analytics: false,
            marketing: false,
            functional: false
        };

        await this.saveConsent('api_withdrawal');
        this.applyConsentSettings(this.consentData);
        this.showConsentMessage('All consent withdrawn. Only necessary cookies remain.', 'info');
    }
}

// Initialize the cookie consent manager
const cookieManager = new CookieConsentManager();

// Expose global API
window.CookieConsent = {
    getStatus: () => cookieManager.getConsentStatus(),
    hasConsent: (type) => cookieManager.hasConsent(type),
    updateConsent: (type, granted) => cookieManager.updateConsent(type, granted),
    withdrawConsent: () => cookieManager.withdrawConsent(),
    showPreferences: () => cookieManager.showPreferencesModal()
};

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CookieConsentManager;
} 