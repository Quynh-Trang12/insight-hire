<template>
  <div class="job-explorer-container container my-3">
    <div class="row g-3 align-items-start">
      <!-- Sidebar navigation for job listings -->
      <aside
        class="col-12 col-md-4 col-lg-3 sticky-sidebar"
        aria-label="Job listings sidebar"
      >
        <div class="card shadow-sm border-0">
          <div class="card-header sidebar-header py-3">
            <!-- Changed from h5 to h2 for correct heading hierarchy -->
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
 * - Main content (<main>) displays job details via nested routing
 *
 * Routing Structure:
 * /jobs → JobOverview (welcome screen)
 * /jobs/:id → JobDetail (specific job details)
 *
 * Accessibility:
 * - Single <main> landmark per page (this is it!)
 * - <aside> with aria-label for sidebar
 * - Sticky sidebar for better UX without losing context
 * - Correct heading hierarchy (h1 → h2 → h3)
 */

import JobList from "../components/jobs/JobList.vue";
</script>

<style scoped>
/* ==================================================================
   SIDEBAR HEADER - distinct from active nav items
   Uses bottom accent border (not left) so it reads as a section title,
   not an active item. Contrast: #0F172A on white = 15.6:1 (AAA).
   ================================================================== */

.sidebar-header {
  background-color: var(--bs-primary);
  border-color: var(--bs-primary);
  color: #ffffff !important;
}

/* ==================================================================
   LAYOUT STYLES
   ================================================================== */

.job-explorer-container {
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
.sticky-sidebar {
  position: sticky;
  top: 80px; /* Offset to account for fixed header */
  align-self: flex-start;
  z-index: 10;
  max-height: calc(100vh - 100px);
  overflow-y: auto;
}

/* Custom scrollbar for sidebar (webkit browsers) */
.sticky-sidebar::-webkit-scrollbar {
  width: 8px;
}

.sticky-sidebar::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.sticky-sidebar::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

.sticky-sidebar::-webkit-scrollbar-thumb:hover {
  background: #555;
}

/* ==================================================================
   RESPONSIVE ADJUSTMENTS
   ================================================================== */

/* On tablets and mobile, sidebar is no longer sticky */
@media (max-width: 767.98px) {
  .sticky-sidebar {
    position: static;
    max-height: none;
  }
}
</style>
