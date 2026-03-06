<template>
  <nav aria-label="Available job positions" class="job-list-nav">
    <ul class="list-group list-group-flush" role="list">
      <li role="listitem">
        <router-link
          to="/jobs"
          class="list-group-item list-group-item-action p-3 transition-all overview-link"
          exact-active-class="active shadow-sm"
          aria-label="View job overview page"
        >
          <div class="d-flex align-items-center">
            <!-- Changed from h6 to h3 to fix heading hierarchy -->
            <h3 class="mb-0 fw-bold fs-6">Overview</h3>
          </div>
        </router-link>
      </li>

      <JobListItem v-for="job in jobs" :key="job.job_id" :job="job" />
    </ul>
  </nav>
</template>

<script setup>
/**
 * @file JobList.vue
 * @description Navigation component for job listings
 *
 * Functionality:
 * - Displays all available jobs from local data file
 * - Provides navigation to job details
 * - Highlights currently selected job
 *
 * Accessibility:
 * - Wrapped in <nav> with aria-label for screen readers
 * - Uses semantic <ul> for list structure
 * - Correct heading hierarchy (h2 → h3)
 * - ARIA labels on links
 */

import JobListItem from "./JobListItem.vue";
import { jobsData as jobs } from "../../assets/data/jobs.js";
</script>

<style scoped>
/* ==================================================================
   TRANSITION EFFECTS
   ================================================================== */

.transition-all {
  transition: all 0.2s ease-in-out;
}

/* ==================================================================
   WCAG AAA COMPLIANCE OVERRIDES FOR JOB LIST
   ================================================================== */

/**
 * Overview Link Styling
 * Default state must have sufficient contrast for all text
 */
.overview-link {
  background-color: #f8f9fa !important;
  color: #000000 !important;
  border-bottom: 2px solid #e9ecef !important;
}

/**
 * Active state uses our AAA-compliant primary color
 * - Background: var(--bs-primary)
 * - Text: #ffffff (white)
 * - Contrast: 15.6:1 (exceeds 7:1 requirement)
 */
.overview-link.active {
  background-color: var(--bs-primary) !important;
  border-color: var(--bs-primary) !important;
  color: #ffffff !important;
}

/**
 * Ensure heading inherits the link color
 * This prevents Bootstrap defaults from overriding our AAA colors
 */
.overview-link h3 {
  color: inherit !important;
  font-size: 1rem; /* Match original h6 visual size */
}

/* ==================================================================
   HOVER STATES
   ================================================================== */

.overview-link:hover:not(.active) {
  background-color: #e9ecef !important;
  transform: translateX(2px);
}
</style>
