<template>
  <nav aria-label="Available job positions">
    <ul class="list-group list-group-flush" role="list">
      <li role="listitem">
        <router-link
          to="/jobs"
          class="list-group-item list-group-item-action p-3"
          exact-active-class="active shadow-sm"
          aria-label="View job overview page"
        >
          <div class="d-flex align-items-center">
            <h3 class="mb-0 fw-bold">Overview</h3>
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
   WCAG AAA COMPLIANCE OVERRIDES FOR OVERVIEW LINK
   ================================================================== */

/**
 * Overview Link Styling
 * Default state must have sufficient contrast for all text
 */
.list-group-item {
  background-color: #ffffff !important;
  color: var(--bs-secondary) !important;
  border-bottom: 1px solid #e9ecef !important;
}

/* Overview heading font size */
.list-group-item h3 {
  font-size: 1.15rem;
}
</style>
