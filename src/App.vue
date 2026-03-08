<template>
  <div id="app">
    <!-- Skip to main content link for keyboard users -->
    <a href="#main-content" class="skip-link">Skip to main content</a>

    <header class="bg-white border-bottom p-3 mb-4 shadow-sm">
      <div
        class="container d-flex flex-column flex-md-row justify-content-between align-items-center"
      >
        <h1 class="h3 mb-3 mb-md-0 fw-bold d-flex align-items-center">
          <svg
            class="text-primary me-2"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5Z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
          <span class="text-primary fw-bolder">Insight</span
          ><span class="text-secondary fw-semibold">Hire</span>
        </h1>

        <nav aria-label="Main navigation">
          <ul class="nav-list d-flex gap-3 gap-md-4 list-unstyled mb-0">
            <li>
              <router-link
                to="/jobs"
                class="text-secondary fw-medium text-decoration-none"
                active-class="text-primary fw-bold active-nav"
                aria-current="page"
              >
                Job Explorer
              </router-link>
            </li>

            <li>
              <router-link
                to="/apply"
                class="text-secondary fw-medium text-decoration-none"
                active-class="text-primary fw-bold active-nav"
              >
                Job Application
              </router-link>
            </li>

            <li>
              <router-link
                to="/todos"
                class="text-secondary fw-medium text-decoration-none"
                active-class="text-primary fw-bold active-nav"
              >
                To-Do List
              </router-link>
            </li>
          </ul>
        </nav>
      </div>
    </header>

    <!-- Main content area - single <main> landmark for the page -->
    <main id="main-content">
      <router-view />
    </main>

    <footer class="text-center mt-5 py-4 border-top">
      <div class="container">
        <p class="mb-0 fw-medium">
          &copy; 2026 Insight Hire. All rights reserved.
        </p>
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

header {
  position: sticky;
  top: 0;
  z-index: 1000;
}

/* Navigation list styling */
.nav-list li {
  display: inline-block;
  position: relative;
}

/* ==================================================================
   FOOTER STYLES  
   ================================================================== */

footer {
  margin-top: auto;
  background-color: #f8f9fa;
}

/* 
 * Footer text color override to meet AAA standards
 * Original text-muted is too light, this darker color has AAA contrast
 */
footer p {
  color: var(--bs-secondary) !important;
  font-size: 0.875rem;
}

h1 {
  letter-spacing: -0.025em;
}

.text-decoration-none {
  transition:
    color 0.3s ease-in-out,
    border-color 0.3s ease-in-out;
}

.text-decoration-none:hover {
  color: #000000 !important;
}

.active-nav {
  position: relative;
}

.active-nav::after {
  content: "";
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 100%;
  height: 3px;
  background-color: var(--bs-primary);
  border-radius: 2px;
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
