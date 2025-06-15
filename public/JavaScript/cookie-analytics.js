// Cookie Analytics Manager
// NileWay Rentals - Analytics tracking with GDPR compliance

class CookieAnalytics {
    constructor() {
        this.isInitialized = false;
        this.trackingId = 'G-XXXXXXXX'; // Replace with your Google Analytics 4 tracking ID
        this.gtmId = 'GTM-XXXXXXX'; // Replace with your Google Tag Manager ID
        this.sessionStartTime = Date.now();
        this.pageViews = 0;
        this.events = [];
        
        // Initialize analytics when consent is available
        this.init();
    }

    // Initialize analytics system
    async init() {
        try {
            // Wait for cookie consent to be available
            this.waitForConsent();
            
            // Track session start
            this.trackSessionStart();
            
            console.log('Cookie Analytics initialized');
        } catch (error) {
            console.error('Error initializing Cookie Analytics:', error);
        }
    }

    // Wait for cookie consent and initialize based on user preferences
    waitForConsent() {
        const checkConsent = () => {
            if (window.cookieConsentUtils && typeof window.cookieConsentUtils.canUseAnalytics === 'function') {
                if (window.cookieConsentUtils.canUseAnalytics()) {
                    this.enableAnalytics();
                } else {
                    this.disableAnalytics();
                }
                
                // Listen for consent changes
                window.addEventListener('cookieConsentApplied', (event) => {
                    const consent = event.detail;
                    if (consent.analytics) {
                        this.enableAnalytics();
                    } else {
                        this.disableAnalytics();
                    }
                });
                
                return true;
            }
            return false;
        };

        // Check immediately or wait for consent system
        if (!checkConsent()) {
            const interval = setInterval(() => {
                if (checkConsent()) {
                    clearInterval(interval);
                }
            }, 100);
            
            // Stop checking after 10 seconds
            setTimeout(() => clearInterval(interval), 10000);
        }
    }

    // Enable analytics tracking
    enableAnalytics() {
        if (this.isInitialized) return;
        
        try {
            this.loadGoogleAnalytics();
            this.loadGoogleTagManager();
            this.setupCustomTracking();
            this.isInitialized = true;
            
            console.log('Analytics tracking enabled');
            
            // Track page view
            this.trackPageView();
            
            // Track user engagement
            this.trackUserEngagement();
            
        } catch (error) {
            console.error('Error enabling analytics:', error);
        }
    }

    // Disable analytics tracking
    disableAnalytics() {
        this.isInitialized = false;
        this.removeAnalyticsCookies();
        this.removeAnalyticsScripts();
        
        console.log('Analytics tracking disabled');
    }

    // Load Google Analytics 4
    loadGoogleAnalytics() {
        // Create gtag script
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', this.trackingId, {
            page_title: document.title,
            page_location: window.location.href,
            custom_map: {
                'dimension1': 'user_type',
                'dimension2': 'booking_stage'
            }
        });

        // Load GA4 script
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${this.trackingId}`;
        document.head.appendChild(script);
        
        // Make gtag globally available
        window.gtag = gtag;
    }

    // Load Google Tag Manager
    loadGoogleTagManager() {
        // GTM script
        const script = document.createElement('script');
        script.innerHTML = `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${this.gtmId}');
        `;
        document.head.appendChild(script);

        // GTM noscript iframe
        const noscript = document.createElement('noscript');
        noscript.innerHTML = `
            <iframe src="https://www.googletagmanager.com/ns.html?id=${this.gtmId}"
                    height="0" width="0" style="display:none;visibility:hidden"></iframe>
        `;
        document.body.appendChild(noscript);
    }

    // Setup custom tracking for car rental business
    setupCustomTracking() {
        // Track form interactions
        this.trackFormInteractions();
        
        // Track car selection
        this.trackCarSelection();
        
        // Track booking process
        this.trackBookingProcess();
        
        // Track user journey
        this.trackUserJourney();
        
        // Track scroll depth
        this.trackScrollDepth();
        
        // Track time on page
        this.trackTimeOnPage();
    }

    // Track page views
    trackPageView() {
        if (!this.isInitialized) return;
        
        this.pageViews++;
        
        if (window.gtag) {
            gtag('event', 'page_view', {
                page_title: document.title,
                page_location: window.location.href,
                page_path: window.location.pathname,
                content_group1: this.getPageCategory(),
                content_group2: this.getPageType()
            });
        }
        
        this.logEvent('page_view', {
            url: window.location.href,
            title: document.title,
            timestamp: new Date().toISOString()
        });
    }

    // Track custom events
    trackEvent(eventName, parameters = {}) {
        if (!this.isInitialized) return;
        
        const eventData = {
            event_name: eventName,
            timestamp: new Date().toISOString(),
            page_url: window.location.href,
            ...parameters
        };
        
        // Send to Google Analytics
        if (window.gtag) {
            gtag('event', eventName, parameters);
        }
        
        // Log locally
        this.logEvent(eventName, eventData);
        
        console.log('Analytics event tracked:', eventName, parameters);
    }

    // Track form interactions
    trackFormInteractions() {
        // Track form submissions
        document.addEventListener('submit', (event) => {
            const form = event.target;
            const formId = form.id || form.className || 'unknown_form';
            
            this.trackEvent('form_submit', {
                form_id: formId,
                form_action: form.action || window.location.href
            });
        });

        // Track form field interactions
        document.addEventListener('focus', (event) => {
            if (event.target.tagName === 'INPUT' || event.target.tagName === 'SELECT' || event.target.tagName === 'TEXTAREA') {
                const fieldName = event.target.name || event.target.id || 'unknown_field';
                this.trackEvent('form_field_focus', {
                    field_name: fieldName,
                    field_type: event.target.type || event.target.tagName.toLowerCase()
                });
            }
        }, true);
    }

    // Track car selection events
    trackCarSelection() {
        // Track car card clicks
        document.addEventListener('click', (event) => {
            const carCard = event.target.closest('.car-card, .vehicle-card, .rental-car');
            if (carCard) {
                const carName = carCard.querySelector('.car-name, .vehicle-name')?.textContent || 'Unknown Car';
                const carPrice = carCard.querySelector('.price, .rental-price')?.textContent || 'Unknown Price';
                
                this.trackEvent('car_selection', {
                    car_name: carName,
                    car_price: carPrice,
                    selection_method: 'card_click'
                });
            }
        });

        // Track filter usage
        document.addEventListener('change', (event) => {
            if (event.target.closest('.filter-section, .search-filters')) {
                const filterType = event.target.name || event.target.id || 'unknown_filter';
                const filterValue = event.target.value;
                
                this.trackEvent('filter_usage', {
                    filter_type: filterType,
                    filter_value: filterValue
                });
            }
        });
    }

    // Track booking process
    trackBookingProcess() {
        // Track booking steps
        const bookingSteps = ['car_selection', 'customer_info', 'payment', 'confirmation'];
        
        bookingSteps.forEach(step => {
            const stepElement = document.querySelector(`[data-step="${step}"], .${step}, #${step}`);
            if (stepElement) {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            this.trackEvent('booking_step_view', {
                                step_name: step,
                                step_progress: bookingSteps.indexOf(step) + 1,
                                total_steps: bookingSteps.length
                            });
                        }
                    });
                });
                observer.observe(stepElement);
            }
        });

        // Track booking completion
        if (window.location.pathname.includes('success') || window.location.pathname.includes('confirmation')) {
            this.trackEvent('booking_complete', {
                booking_id: this.getBookingId(),
                completion_time: new Date().toISOString()
            });
        }
    }

    // Track user journey and behavior
    trackUserJourney() {
        // Track navigation
        let previousPage = document.referrer;
        this.trackEvent('user_journey', {
            from_page: previousPage,
            to_page: window.location.href,
            navigation_type: performance.navigation.type === 1 ? 'reload' : 'navigate'
        });

        // Track external link clicks
        document.addEventListener('click', (event) => {
            const link = event.target.closest('a');
            if (link && link.hostname !== window.location.hostname) {
                this.trackEvent('external_link_click', {
                    link_url: link.href,
                    link_text: link.textContent.trim()
                });
            }
        });
    }

    // Track scroll depth
    trackScrollDepth() {
        let maxScroll = 0;
        const trackingThresholds = [25, 50, 75, 90, 100];
        const trackedThresholds = new Set();

        window.addEventListener('scroll', () => {
            const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
            
            if (scrollPercent > maxScroll) {
                maxScroll = scrollPercent;
                
                trackingThresholds.forEach(threshold => {
                    if (scrollPercent >= threshold && !trackedThresholds.has(threshold)) {
                        trackedThresholds.add(threshold);
                        this.trackEvent('scroll_depth', {
                            scroll_percentage: threshold,
                            page_url: window.location.href
                        });
                    }
                });
            }
        });
    }

    // Track time on page
    trackTimeOnPage() {
        let startTime = Date.now();
        let isActive = true;

        // Track when user becomes active/inactive
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'visible') {
                startTime = Date.now();
                isActive = true;
            } else {
                if (isActive) {
                    const timeSpent = Date.now() - startTime;
                    this.trackEvent('time_on_page', {
                        time_spent_seconds: Math.round(timeSpent / 1000),
                        page_url: window.location.href
                    });
                }
                isActive = false;
            }
        });

        // Track on page unload
        window.addEventListener('beforeunload', () => {
            if (isActive) {
                const timeSpent = Date.now() - startTime;
                this.trackEvent('session_end', {
                    total_time_seconds: Math.round(timeSpent / 1000),
                    page_views: this.pageViews
                });
            }
        });
    }

    // Track session start
    trackSessionStart() {
        this.trackEvent('session_start', {
            user_agent: navigator.userAgent,
            screen_resolution: `${screen.width}x${screen.height}`,
            language: navigator.language,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
        });
    }

    // Track user engagement
    trackUserEngagement() {
        // Track clicks on important elements
        document.addEventListener('click', (event) => {
            const target = event.target;
            
            // Track CTA button clicks
            if (target.matches('.cta-button, .book-now, .reserve-now, .btn-primary')) {
                this.trackEvent('cta_click', {
                    button_text: target.textContent.trim(),
                    button_location: this.getElementLocation(target)
                });
            }
            
            // Track navigation clicks
            if (target.matches('nav a, .nav-link')) {
                this.trackEvent('navigation_click', {
                    link_text: target.textContent.trim(),
                    link_url: target.href
                });
            }
        });
    }

    // Utility functions
    getPageCategory() {
        const path = window.location.pathname;
        if (path.includes('explore') || path.includes('cars')) return 'vehicle_browsing';
        if (path.includes('checkout') || path.includes('booking')) return 'booking_process';
        if (path.includes('about')) return 'company_info';
        if (path.includes('contact')) return 'contact';
        if (path === '/') return 'homepage';
        return 'other';
    }

    getPageType() {
        const path = window.location.pathname;
        if (path.includes('success') || path.includes('confirmation')) return 'confirmation';
        if (path.includes('checkout')) return 'checkout';
        if (path.includes('details')) return 'product_detail';
        return 'general';
    }

    getBookingId() {
        // Extract booking ID from URL or localStorage
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('booking_id') || localStorage.getItem('booking_id') || 'unknown';
    }

    getElementLocation(element) {
        const rect = element.getBoundingClientRect();
        return {
            x: Math.round(rect.left),
            y: Math.round(rect.top),
            section: this.getElementSection(element)
        };
    }

    getElementSection(element) {
        const sections = ['header', 'nav', 'main', 'footer', 'sidebar'];
        for (const section of sections) {
            if (element.closest(section)) return section;
        }
        return 'unknown';
    }

    // Local event logging
    logEvent(eventName, eventData) {
        this.events.push({
            name: eventName,
            data: eventData,
            timestamp: new Date().toISOString()
        });
        
        // Keep only last 100 events
        if (this.events.length > 100) {
            this.events = this.events.slice(-100);
        }
    }

    // Remove analytics cookies
    removeAnalyticsCookies() {
        const cookiesToRemove = [
            '_ga', '_ga_*', '_gid', '_gat', '_gat_*',
            '__utma', '__utmb', '__utmc', '__utmz', '__utmv',
            '_dc_gtm_*', '_gcl_*'
        ];
        
        cookiesToRemove.forEach(cookieName => {
            this.deleteCookie(cookieName);
        });
    }

    // Remove analytics scripts
    removeAnalyticsScripts() {
        // Remove GA scripts
        const scripts = document.querySelectorAll('script[src*="googletagmanager.com"], script[src*="google-analytics.com"]');
        scripts.forEach(script => script.remove());
        
        // Clear dataLayer
        if (window.dataLayer) {
            window.dataLayer.length = 0;
        }
        
        // Remove GTM noscript
        const noscript = document.querySelector('noscript iframe[src*="googletagmanager.com"]');
        if (noscript) noscript.parentElement.remove();
    }

    // Delete cookie helper
    deleteCookie(name) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname};`;
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${window.location.hostname};`;
    }

    // Get analytics status
    getAnalyticsStatus() {
        return {
            isInitialized: this.isInitialized,
            pageViews: this.pageViews,
            eventsTracked: this.events.length,
            sessionDuration: Date.now() - this.sessionStartTime
        };
    }
}

// Initialize analytics when DOM is ready and after cookie system is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Wait for CookieConsentManager to be available
    const initializeAnalytics = () => {
        if (window.CookieConsentManager) {
            window.cookieAnalytics = new CookieAnalytics();
            console.log('🍪 Cookie Analytics initialized with consent manager');
        } else {
            // Retry after a short delay
            setTimeout(initializeAnalytics, 100);
        }
    };
    
    initializeAnalytics();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CookieAnalytics;
} 