/**
 * Cookie Consent Management System
 * GDPR Compliant Cookie Banner for NileWay Rentals
 */

class CookieConsent {
    constructor() {
        this.cookieName = 'nileWayConsent';
        this.consentDuration = 365; // Days
        this.banner = null;
        this.modal = null;
        this.consentData = {
            necessary: true,        // Always required
            functional: false,      // Language, preferences
            analytics: false,       // Google Analytics, usage tracking
            marketing: false        // Advertising, social media
        };
        
        this.init();
    }

    init() {
        // Check if consent already given
        if (this.hasValidConsent()) {
            this.applyConsent();
            return;
        }

        // Create and show banner after page load
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                setTimeout(() => this.createBanner(), 1000);
            });
        } else {
            setTimeout(() => this.createBanner(), 1000);
        }
    }

    hasValidConsent() {
        const consent = this.getCookie(this.cookieName);
        if (!consent) return false;

        try {
            const data = JSON.parse(consent);
            // Check if consent is not expired (optional)
            return data.timestamp && data.categories;
        } catch (e) {
            return false;
        }
    }

    createBanner() {
        // Don't show if already exists
        if (document.getElementById('cookieBanner')) return;

        const banner = document.createElement('div');
        banner.id = 'cookieBanner';
        banner.className = 'cookie-banner';
        
        banner.innerHTML = `
            <div class="cookie-content">
                <div class="cookie-text">
                    <h4>
                        <i class="fas fa-cookie-bite"></i>
                        We value your privacy
                    </h4>
                    <p>
                        We use cookies to enhance your browsing experience, serve personalized content, 
                        and analyze our traffic. By clicking "Accept All", you consent to our use of cookies. 
                        <a href="/policy" target="_blank">Learn more in our Privacy Policy</a>
                    </p>
                </div>
                <div class="cookie-actions">
                    <button class="cookie-btn cookie-btn-accept" onclick="cookieConsent.acceptAll()">
                        <i class="fas fa-check"></i> Accept All
                    </button>
                    <button class="cookie-btn cookie-btn-decline" onclick="cookieConsent.rejectAll()">
                        <i class="fas fa-times"></i> Reject All
                    </button>
                    <button class="cookie-btn cookie-btn-settings" onclick="cookieConsent.showSettings()">
                        <i class="fas fa-cog"></i> Cookie Settings
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(banner);
        this.banner = banner;

        // Show banner with animation
        setTimeout(() => banner.classList.add('show'), 100);
    }

    createModal() {
        if (document.getElementById('cookieModal')) return;

        const modal = document.createElement('div');
        modal.id = 'cookieModal';
        modal.className = 'cookie-modal';
        
        modal.innerHTML = `
            <div class="cookie-modal-content">
                <button class="cookie-close" onclick="cookieConsent.hideSettings()">&times;</button>
                
                <div class="cookie-modal-header">
                    <h3>
                        <i class="fas fa-shield-alt"></i>
                        Cookie Preferences
                    </h3>
                </div>

                <div class="cookie-category">
                    <h4>
                        Necessary Cookies
                        <label class="cookie-toggle">
                            <input type="checkbox" checked disabled>
                            <span class="cookie-slider"></span>
                        </label>
                    </h4>
                    <p>
                        These cookies are essential for the website to function properly. 
                        They enable core functionality such as security, authentication, and network management.
                    </p>
                </div>

                <div class="cookie-category">
                    <h4>
                        Functional Cookies
                        <label class="cookie-toggle">
                            <input type="checkbox" id="functional-toggle">
                            <span class="cookie-slider"></span>
                        </label>
                    </h4>
                    <p>
                        These cookies allow the website to remember choices you make and provide enhanced features. 
                        They may be set by us or by third-party providers whose services we have added to our pages.
                    </p>
                </div>

                <div class="cookie-category">
                    <h4>
                        Analytics Cookies
                        <label class="cookie-toggle">
                            <input type="checkbox" id="analytics-toggle">
                            <span class="cookie-slider"></span>
                        </label>
                    </h4>
                    <p>
                        These cookies help us understand how visitors interact with our website by collecting 
                        and reporting information anonymously. This helps us improve our website's performance.
                    </p>
                </div>

                <div class="cookie-category">
                    <h4>
                        Marketing Cookies
                        <label class="cookie-toggle">
                            <input type="checkbox" id="marketing-toggle">
                            <span class="cookie-slider"></span>
                        </label>
                    </h4>
                    <p>
                        These cookies are used to track visitors across websites. The intention is to display 
                        ads that are relevant and engaging for the individual user.
                    </p>
                </div>

                <div class="cookie-modal-actions">
                    <button class="cookie-btn cookie-btn-decline" onclick="cookieConsent.rejectAll()">
                        Reject All
                    </button>
                    <button class="cookie-btn cookie-btn-settings" onclick="cookieConsent.savePreferences()">
                        Save Preferences
                    </button>
                    <button class="cookie-btn cookie-btn-accept" onclick="cookieConsent.acceptAll()">
                        Accept All
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        this.modal = modal;

        // Add click outside to close
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.hideSettings();
            }
        });
    }

    showSettings() {
        this.createModal();
        this.modal.classList.add('show');
        
        // Set current preferences
        const consent = this.getStoredConsent();
        if (consent) {
            document.getElementById('functional-toggle').checked = consent.functional;
            document.getElementById('analytics-toggle').checked = consent.analytics;
            document.getElementById('marketing-toggle').checked = consent.marketing;
        }
    }

    hideSettings() {
        if (this.modal) {
            this.modal.classList.remove('show');
        }
    }

    async acceptAll() {
        this.consentData = {
            necessary: true,
            functional: true,
            analytics: true,
            marketing: true
        };
        await this.saveConsent();
        this.hideBanner();
        this.hideSettings();
        this.applyConsent();
        this.showNotification('All cookies accepted!', 'success');
    }

    async rejectAll() {
        this.consentData = {
            necessary: true,
            functional: false,
            analytics: false,
            marketing: false
        };
        await this.saveConsent();
        this.hideBanner();
        this.hideSettings();
        this.applyConsent();
        this.showNotification('Cookie preferences saved!', 'info');
    }

    async savePreferences() {
        // Get current toggle states
        this.consentData = {
            necessary: true, // Always true
            functional: document.getElementById('functional-toggle')?.checked || false,
            analytics: document.getElementById('analytics-toggle')?.checked || false,
            marketing: document.getElementById('marketing-toggle')?.checked || false
        };
        
        await this.saveConsent();
        this.hideBanner();
        this.hideSettings();
        this.applyConsent();
        this.showNotification('Cookie preferences saved!', 'success');
    }

    async saveConsent() {
        const consentString = JSON.stringify({
            categories: this.consentData,
            timestamp: Date.now(),
            version: '1.0'
        });
        
        // Save to browser cookie
        this.setCookie(this.cookieName, consentString, this.consentDuration);
        
        // Also save to MongoDB
        try {
            await this.saveToDatabase();
        } catch (error) {
            console.warn('Failed to save consent to database:', error);
            // Continue anyway - cookie is still saved locally
        }
    }

    async saveToDatabase() {
        const sessionId = this.getOrCreateSessionId();
        
        const response = await fetch('/api/cookie-consent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                sessionId,
                consentData: this.consentData,
                source: 'banner'
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log('✅ Consent saved to database:', result);
        return result;
    }

    getOrCreateSessionId() {
        let sessionId = localStorage.getItem('nileWaySessionId');
        
        if (!sessionId) {
            // Generate a unique session ID
            sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('nileWaySessionId', sessionId);
        }
        
        return sessionId;
    }

    getStoredConsent() {
        const consent = this.getCookie(this.cookieName);
        if (!consent) return null;
        
        try {
            return JSON.parse(consent).categories;
        } catch (e) {
            return null;
        }
    }

    applyConsent() {
        const consent = this.getStoredConsent() || this.consentData;
        
        // Apply functional cookies (language, preferences)
        if (consent.functional) {
            this.enableFunctionalCookies();
        } else {
            this.disableFunctionalCookies();
        }

        // Apply analytics cookies
        if (consent.analytics) {
            this.enableAnalytics();
        } else {
            this.disableAnalytics();
        }

        // Apply marketing cookies
        if (consent.marketing) {
            this.enableMarketing();
        } else {
            this.disableMarketing();
        }

        // Trigger custom event for other scripts
        window.dispatchEvent(new CustomEvent('cookieConsentApplied', {
            detail: consent
        }));
    }

    enableFunctionalCookies() {
        // Allow language preference cookies, shopping cart, etc.
        console.log('🍪 Functional cookies enabled');
    }

    disableFunctionalCookies() {
        // Disable non-essential functional cookies
        console.log('🚫 Functional cookies disabled');
    }

    enableAnalytics() {
        // Enable Google Analytics, tracking scripts
        console.log('📊 Analytics cookies enabled');
        
        // Example: Load Google Analytics
        // if (typeof gtag !== 'undefined') {
        //     gtag('consent', 'update', {
        //         'analytics_storage': 'granted'
        //     });
        // }
    }

    disableAnalytics() {
        console.log('🚫 Analytics cookies disabled');
        
        // Example: Disable Google Analytics
        // if (typeof gtag !== 'undefined') {
        //     gtag('consent', 'update', {
        //         'analytics_storage': 'denied'
        //     });
        // }
    }

    enableMarketing() {
        console.log('📢 Marketing cookies enabled');
        
        // Example: Enable advertising cookies
        // if (typeof gtag !== 'undefined') {
        //     gtag('consent', 'update', {
        //         'ad_storage': 'granted'
        //     });
        // }
    }

    disableMarketing() {
        console.log('🚫 Marketing cookies disabled');
        
        // Example: Disable advertising cookies
        // if (typeof gtag !== 'undefined') {
        //     gtag('consent', 'update', {
        //         'ad_storage': 'denied'
        //     });
        // }
    }

    hideBanner() {
        if (this.banner) {
            this.banner.classList.remove('show');
            setTimeout(() => {
                this.banner.remove();
                this.banner = null;
            }, 400);
        }
    }

    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#27ae60' : '#3498db'};
            color: white;
            padding: 12px 20px;
            border-radius: 6px;
            z-index: 10002;
            font-size: 14px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            animation: slideInRight 0.3s ease-out;
        `;
        
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check' : 'info'}-circle"></i>
            ${message}
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-in forwards';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Cookie utility functions
    setCookie(name, value, days) {
        const expires = new Date();
        expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
    }

    getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) {
                return decodeURIComponent(c.substring(nameEQ.length, c.length));
            }
        }
        return null;
    }

    // Public method to revoke consent (for settings page)
    revokeConsent() {
        document.cookie = `${this.cookieName}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
        location.reload();
    }

    // Public method to get current consent status
    getConsentStatus() {
        return this.getStoredConsent();
    }
}

// CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Initialize cookie consent system
const cookieConsent = new CookieConsent();

// Make it globally accessible
window.cookieConsent = cookieConsent;