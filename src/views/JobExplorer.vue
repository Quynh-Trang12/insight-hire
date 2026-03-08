<template>
  <div class="container my-3">
    <div class="row g-3 align-items-start">
      <!-- Sidebar navigation for job listings -->
      <aside class="col-12 col-md-4 col-lg-3" aria-label="Job listings sidebar">
        <div class="card shadow-sm border-0">
          <div class="card-header py-3">
            <h2 class="mb-0 fw-bold fs-6 text-white">Job Explorer</h2>
          </div>

          <JobList />
        </div>
      </aside>

      <!-- Job detail content area -->
      <section class="col-12 col-md-8 col-lg-9" aria-label="Job details">
        <router-view />
      </section>
    </div>
  </div>
</template>

<script setup>
/**
 * @file JobExplorer.vue
 * @description Layout view for the job browsing feature
 *
 * Architecture:
 * - Sidebar (<aside>) contains navigable job list
 * - Main content (<section>) displays job details via nested routing
 *
 * Routing Structure:
 * /jobs → JobOverview (welcome screen)
 * /jobs/:id → JobDetail (specific job details)
 *
 * Accessibility:
 * - Single <section> landmark per page
 * - <aside> with aria-label for sidebar
 * - Sticky sidebar for better UX without losing context
 * - Correct heading hierarchy (h1 → h2 → h3)
 */

import JobList from "../components/jobs/JobList.vue";
</script>

<style scoped>
/* ==================================================================
   SIDEBAR HEADER - distinct from active nav items
   ================================================================== */

.card-header {
  background-color: var(--bs-primary);
  border-color: var(--bs-primary);
}

/* ==================================================================
   LAYOUT STYLES
   ================================================================== */

.container {
  min-height: 70vh;
}

/* ==================================================================
   STICKY SIDEBAR PATTERN
   ================================================================== */

/**
 * Sticky positioning keeps the job list visible while scrolling
 * through long job descriptions. This provides context and easy
 * navigation without page jumps.
 */
aside {
  position: sticky;
  top: 80px; /* Offset to account for fixed header */
  align-self: flex-start;
  z-index: 10;
  max-height: calc(100vh - 100px);
  overflow-y: auto;
}

/* Custom scrollbar for sidebar (webkit browsers) */
aside::-webkit-scrollbar {
  width: 8px;
}

aside::-webkit-scrollbar-track {
  background: #f1f1f1;
}

aside::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

aside::-webkit-scrollbar-thumb:hover {
  background: #555;
}

/* ==================================================================
   RESPONSIVE ADJUSTMENTS
   ================================================================== */

/* On tablets and mobile, sidebar is no longer sticky */
@media (max-width: 767.98px) {
  aside {
    position: static;
    max-height: none;
  }
}
</style>
