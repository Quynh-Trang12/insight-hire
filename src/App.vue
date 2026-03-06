<template>
  <div id="app">
    <!-- Skip to main content link for keyboard users -->
    <a href="#main-content" class="skip-link">Skip to main content</a>

    <header class="site-header bg-dark text-white p-3 mb-4 shadow-sm">
      <div
        class="container d-flex flex-column flex-md-row justify-content-between align-items-center"
      >
        <h1 class="h3 mb-3 mb-md-0 fw-bold d-flex align-items-center">
          <span class="text-primary me-2">Insight</span>Hire
        </h1>

        <nav aria-label="Main navigation">
          <ul class="nav-list d-flex gap-3 gap-md-4 list-unstyled mb-0">
            <li>
              <router-link
                to="/jobs"
                class="text-white text-decoration-none"
                active-class="fw-bold border-bottom border-primary border-3 pb-1"
                aria-current="page"
              >
                Job Explorer
              </router-link>
            </li>

            <li>
              <router-link
                to="/apply"
                class="text-white text-decoration-none"
                active-class="fw-bold border-bottom border-primary border-3 pb-1"
              >
                Job Application
              </router-link>
            </li>

            <li>
              <router-link
                to="/todos"
                class="text-white text-decoration-none"
                active-class="fw-bold border-bottom border-primary border-3 pb-1"
              >
                To-Do List
              </router-link>
            </li>
          </ul>
        </nav>
      </div>
    </header>

    <!-- Main content area - landmark is now properly in child components -->
    <div id="main-content">
      <router-view />
    </div>

    <footer class="site-footer text-center text-muted mt-5 py-4 border-top">
      <div class="container">
        <p class="footer-text mb-0">&copy; 2025 Insight Hire. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
/**
 * @file App.vue
 * @description Root component providing global layout structure
 * 
 * Architecture:
 * - Single header with primary navigation
 * - Router view for dynamic content (contains <main> landmark in child views)
 * - Single footer with copyright information
 * 
 * Accessibility:
 * - Proper landmark structure (<header>, <nav>, <footer>)
 * - Skip link for keyboard users
 * - ARIA labels on navigation
 * - Semantic HTML throughout
 */
</script>

<style scoped>
/* ==================================================================
   HEADER STYLES
   ================================================================== */

.site-header {
  position: sticky;
  top: 0;
  z-index: 1000;
  background-color: #212529 !important;
}

/* Navigation list styling */
.nav-list li {
  display: inline-block;
}


/* ==================================================================
   FOOTER STYLES  
   ================================================================== */

.site-footer {
  margin-top: auto;
  background-color: #f8f9fa;
}

/* 
 * Footer text color override to meet AAA standards
 * Original text-muted is too light, this darker color has 10.5:1 contrast
 */
.footer-text {
  color: #3d4144 !important;
  font-size: 0.875rem;
}


/* ==================================================================
   RESPONSIVE NAVIGATION
   ================================================================== */

@media (max-width: 767.98px) {
  .nav-list {
    flex-direction: column;
    align-items: center;
    gap: 1rem !important;
  }
  
  .nav-list li {
    width: 100%;
    text-align: center;
  }
}
</style>
