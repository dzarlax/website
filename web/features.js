/**
 * Feature Toggle Management System
 * Allows enabling/disabling sections of the website
 */

class FeatureManager {
    constructor() {
        this.config = null;
        this.featureStates = new Map();
        this.observers = new Map();
        this.init();
    }

    async init() {
        try {
            await this.loadConfig();
            this.initializeFeatures();
            this.updateNavigation();
            this.logDebugInfo();
        } catch (error) {
            console.error('Failed to initialize FeatureManager:', error);
            // Fallback: enable all features
            this.enableAllFeatures();
        }
    }

    async loadConfig() {
        const response = await fetch('./config/features.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        this.config = await response.json();
    }

    initializeFeatures() {
        if (!this.config || !this.config.features) {
            this.enableAllFeatures();
            return;
        }

        Object.entries(this.config.features).forEach(([featureName, featureConfig]) => {
            this.setFeature(featureName, featureConfig.enabled);
        });
    }

    enableAllFeatures() {
        const defaultFeatures = ['intro', 'skills', 'experience', 'achievements', 'projects', 'contact'];
        defaultFeatures.forEach(feature => {
            this.setFeature(feature, true);
        });
    }

    setFeature(featureName, enabled) {
        const wasEnabled = this.featureStates.get(featureName);
        this.featureStates.set(featureName, enabled);

        // Update DOM
        this.updateFeatureVisibility(featureName, enabled);
        
        // Notify observers
        if (this.observers.has(featureName)) {
            this.observers.get(featureName).forEach(callback => {
                callback(enabled, wasEnabled);
            });
        }

        // Log if debug is enabled
        if (this.config?.debug?.logToggleActions) {
            console.log(`Feature "${featureName}" ${enabled ? 'enabled' : 'disabled'}`);
        }
    }

    updateFeatureVisibility(featureName, enabled) {
        const section = document.getElementById(featureName);
        const navLink = document.querySelector(`a[href="#${featureName}"]`);

        if (section) {
            if (enabled) {
                section.style.display = '';
                section.classList.remove('feature-disabled');
                if (this.config?.navigation?.animateToggle) {
                    section.style.opacity = '0';
                    section.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                        section.style.opacity = '1';
                        section.style.transform = 'translateY(0)';
                    }, 50);
                }
            } else {
                section.style.display = 'none';
                section.classList.add('feature-disabled');
            }
        }

        if (navLink) {
            if (enabled || this.config?.navigation?.showDisabledSections) {
                navLink.style.display = '';
                navLink.classList.toggle('nav-disabled', !enabled);
            } else {
                navLink.style.display = 'none';
            }
        }
    }

    updateNavigation() {
        // Update navigation based on enabled features
        this.featureStates.forEach((enabled, featureName) => {
            this.updateFeatureVisibility(featureName, enabled);
        });
    }

    isFeatureEnabled(featureName) {
        return this.featureStates.get(featureName) || false;
    }

    toggleFeature(featureName) {
        const currentState = this.isFeatureEnabled(featureName);
        this.setFeature(featureName, !currentState);
        return !currentState;
    }

    enableFeature(featureName) {
        this.setFeature(featureName, true);
    }

    disableFeature(featureName) {
        this.setFeature(featureName, false);
    }

    // Observer pattern for feature changes
    onFeatureChange(featureName, callback) {
        if (!this.observers.has(featureName)) {
            this.observers.set(featureName, []);
        }
        this.observers.get(featureName).push(callback);
    }

    getEnabledFeatures() {
        const enabled = [];
        this.featureStates.forEach((isEnabled, featureName) => {
            if (isEnabled) enabled.push(featureName);
        });
        return enabled;
    }

    getDisabledFeatures() {
        const disabled = [];
        this.featureStates.forEach((isEnabled, featureName) => {
            if (!isEnabled) disabled.push(featureName);
        });
        return disabled;
    }

    getFeatureConfig() {
        return this.config;
    }

    logDebugInfo() {
        if (this.config?.debug?.showFeatureStatus) {
            console.group('🔧 Feature Toggle Status');
            this.featureStates.forEach((enabled, feature) => {
                console.log(`${enabled ? '✅' : '❌'} ${feature}: ${enabled ? 'enabled' : 'disabled'}`);
            });
            console.groupEnd();
        }
    }

    // Admin panel methods (for development)
    createAdminPanel() {
        if (this.config?.debug?.showFeatureStatus) {
            this.renderAdminPanel();
        }
    }

    renderAdminPanel() {
        const panel = document.createElement('div');
        panel.id = 'feature-admin-panel';
        panel.style.cssText = `
            position: fixed;
            top: 10px;
            left: 10px;
            background: rgba(0, 0, 0, 0.9);
            color: white;
            padding: 15px;
            border-radius: 8px;
            font-family: monospace;
            font-size: 12px;
            z-index: 10000;
            max-width: 300px;
        `;

        let panelHTML = '<h4>🔧 Feature Toggles</h4>';
        this.featureStates.forEach((enabled, feature) => {
            panelHTML += `
                <label style="display: block; margin: 5px 0;">
                    <input type="checkbox" ${enabled ? 'checked' : ''} 
                           onchange="window.featureManager.toggleFeature('${feature}')">
                    ${feature}
                </label>
            `;
        });

        panel.innerHTML = panelHTML;
        document.body.appendChild(panel);
    }
}

// Global instance
window.featureManager = new FeatureManager();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FeatureManager;
} 