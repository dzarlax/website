// Web Vitals monitoring for performance optimization
// This script tracks Core Web Vitals and other performance metrics

class PerformanceMonitor {
    constructor() {
        this.metrics = {};
        this.init();
    }

    init() {
        // Only run in production and if browser supports the APIs
        if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
            return;
        }

        this.observePerformance();
        this.trackUserInteractions();
    }

    observePerformance() {
        // Largest Contentful Paint (LCP)
        if ('PerformanceObserver' in window) {
            try {
                new PerformanceObserver((list) => {
                    const entries = list.getEntries();
                    const lastEntry = entries[entries.length - 1];
                    this.metrics.lcp = Math.round(lastEntry.startTime);
                    this.reportMetric('LCP', this.metrics.lcp);
                }).observe({ entryTypes: ['largest-contentful-paint'] });
            } catch (e) {
                // Observer not supported
            }

            // First Input Delay (FID)
            try {
                new PerformanceObserver((list) => {
                    const entries = list.getEntries();
                    entries.forEach((entry) => {
                        this.metrics.fid = Math.round(entry.processingStart - entry.startTime);
                        this.reportMetric('FID', this.metrics.fid);
                    });
                }).observe({ entryTypes: ['first-input'] });
            } catch (e) {
                // Observer not supported
            }

            // Cumulative Layout Shift (CLS)
            try {
                let clsValue = 0;
                new PerformanceObserver((list) => {
                    for (const entry of list.getEntries()) {
                        if (!entry.hadRecentInput) {
                            clsValue += entry.value;
                        }
                    }
                    this.metrics.cls = Math.round(clsValue * 1000) / 1000;
                    this.reportMetric('CLS', this.metrics.cls);
                }).observe({ entryTypes: ['layout-shift'] });
            } catch (e) {
                // Observer not supported
            }

            // Time to First Byte (TTFB)
            try {
                new PerformanceObserver((list) => {
                    const entries = list.getEntries();
                    entries.forEach((entry) => {
                        this.metrics.ttfb = Math.round(entry.responseStart - entry.requestStart);
                        this.reportMetric('TTFB', this.metrics.ttfb);
                    });
                }).observe({ entryTypes: ['navigation'] });
            } catch (e) {
                // Observer not supported
            }
        }

        // Fallback for browsers without PerformanceObserver
        window.addEventListener('load', () => {
            setTimeout(() => {
                const navigation = performance.getEntriesByType('navigation')[0];
                if (navigation) {
                    this.metrics.loadTime = Math.round(navigation.loadEventEnd - navigation.fetchStart);
                    this.metrics.domContentLoaded = Math.round(navigation.domContentLoadedEventEnd - navigation.fetchStart);
                    this.reportMetric('Page Load Time', this.metrics.loadTime);
                    this.reportMetric('DOM Content Loaded', this.metrics.domContentLoaded);
                }
            }, 0);
        });
    }

    trackUserInteractions() {
        // Track scroll depth
        let maxScrollDepth = 0;
        let isScrollTracked = false;

        window.addEventListener('scroll', () => {
            const scrollDepth = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
            if (scrollDepth > maxScrollDepth) {
                maxScrollDepth = Math.min(scrollDepth, 100);
            }
            
            // Report scroll milestones
            if (!isScrollTracked && maxScrollDepth >= 75) {
                this.reportEvent('User Engagement', 'Scroll Depth', '75%');
                isScrollTracked = true;
            }
        });

        // Track time on page
        let startTime = Date.now();
        window.addEventListener('beforeunload', () => {
            const timeOnPage = Math.round((Date.now() - startTime) / 1000);
            this.reportMetric('Time on Page', timeOnPage);
        });

        // Track language changes
        document.addEventListener('languageChanged', (event) => {
            this.reportEvent('User Interaction', 'Language Change', event.detail.language);
        });

        // Track theme changes
        const themeToggle = document.querySelector('.theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                const isDark = document.documentElement.hasAttribute('dark-mode');
                this.reportEvent('User Interaction', 'Theme Change', isDark ? 'Light' : 'Dark');
            });
        }
    }

    reportMetric(name, value) {
        // Only report if we have a reasonable value
        if (value && value > 0 && value < 60000) {
            // Send to analytics (could be Google Analytics, custom endpoint, etc.)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'web_vitals', {
                    event_category: 'Performance',
                    event_label: name,
                    value: Math.round(value),
                    custom_map: { metric_value: value }
                });
            }

            // Log for development
            if (process?.env?.NODE_ENV === 'development') {
                console.log(`Performance: ${name} = ${value}ms`);
            }
        }
    }

    reportEvent(category, action, label) {
        if (typeof gtag !== 'undefined') {
            gtag('event', action, {
                event_category: category,
                event_label: label
            });
        }

        // Log for development
        if (process?.env?.NODE_ENV === 'development') {
            console.log(`Event: ${category} > ${action} > ${label}`);
        }
    }

    // Get current metrics (for debugging)
    getMetrics() {
        return this.metrics;
    }
}

// Initialize performance monitoring when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.performanceMonitor = new PerformanceMonitor();
});

// Export for potential use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PerformanceMonitor;
}