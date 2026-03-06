/**
 * @file main.js
 * @description Application entry point
 * 
 * Initialization order:
 * 1. Bootstrap CSS (base styles)
 * 2. Bootstrap JS (interactive components)
 * 3. Global CSS (application-wide styles)
 * 4. Accessibility CSS (WCAG 2.2 AAA overrides)
 * 
 * This order ensures accessibility overrides take precedence
 * over Bootstrap defaults while maintaining all functionality.
 */

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

/* Local Bootstrap imports (NO CDNs per assignment requirements) */
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

/* Global application styles */
import './assets/css/main.css'

/* WCAG 2.2 AAA accessibility overrides */
import './assets/css/accessibility.css'

/* Create and mount the Vue application */
const app = createApp(App)

/* Register router for SPA navigation */
app.use(router)

/* Mount to DOM */
app.mount('#app')
