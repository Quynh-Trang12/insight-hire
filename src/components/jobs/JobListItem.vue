<template>
  <li role="listitem">
    <router-link
      :to="`/jobs/${job.job_id}`"
      class="job-list-item list-group-item list-group-item-action p-3 transition-all"
      active-class="active"
      :aria-label="`View details for ${job.job_title} at ${job.company}`"
      :aria-current="$route.params.id === job.job_id ? 'page' : false"
    >
      <!-- Changed from h6 to h3 for correct heading hierarchy -->
      <h3
        class="mb-1 fw-bold text-truncate fs-6"
        :title="`${job.job_id} - ${job.job_title}`"
      >
        {{ job.job_id }} - {{ job.job_title }}
      </h3>

      <div class="d-flex justify-content-between align-items-center mt-2 gap-2">
        <span
          class="company-name text-truncate text-dark"
          :title="job.company"
          aria-label="Company name"
        >
          {{ job.company }}
        </span>
        <span
          class="badge text-nowrap bg-primary"
          :aria-label="`Employment type: ${job.employment_type}`"
        >
          {{ job.employment_type }}
        </span>
      </div>
    </router-link>
  </li>
</template>

<script setup>
/**
 * @file JobListItem.vue
 * @description Individual job listing component for sidebar navigation
 *
 * Props:
 * - job: Complete job object with all details
 *
 * Functionality:
 * - Displays job ID, title, company, and employment type
 * - Highlights when currently active
 * - Provides hover feedback
 * - Truncates long text to prevent overflow
 *
 * Accessibility:
 * - ARIA labels for screen reader context
 * - aria-current for active page indication
 * - Semantic heading (h3) for structure
 * - Title attributes for full text on hover
 */

defineProps({
  job: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
/* ==================================================================
   TRANSITION EFFECTS
   ================================================================== */

.transition-all {
  transition: all 0.2s ease-in-out;
}

/* ==================================================================
   HOVER AND FOCUS STATES
   ================================================================== */

.job-list-item:hover:not(.active) {
  background-color: #f1f5f9;
  border-left: 4px solid #94a3b8;
}

/* ==================================================================
   TEXT STYLING
   ================================================================== */

/**
 * Heading styling to match original h6 visual appearance
 * while maintaining semantic h3 for accessibility
 * Color: var(--bs-secondary) = #334155 = 7.6:1 on white (AAA compliant)
 */
.job-list-item h3 {
  font-size: 1rem; /* h6 equivalent size */
  line-height: 1.4;
  color: var(--bs-secondary);
}

/* When active, left-border accent with light background (matching Overview) */
.list-group-item.job-list-item.active {
  background-color: #f1f5f9 !important;
  border-top: none !important;
  border-right: none !important;
  border-bottom: 1px solid #e9ecef !important;
  border-left: 4px solid var(--bs-primary) !important;
  border-radius: 0 !important;
  color: var(--bs-secondary) !important;
}

.job-list-item.active h3 {
  color: var(--bs-primary) !important;
}

.job-list-item.active .company-name {
  color: var(--bs-secondary) !important;
}

.job-list-item.active .badge {
  background-color: var(--bs-primary) !important;
  color: #ffffff !important;
}

/**
 * Company name color override for AAA compliance
 * - Inactive: text-secondary (Slate 700: 7.6:1 contrast on white)
 * - Active: #ffffff (inherits from parent)
 */
.company-name {
  font-size: 0.875rem;
  max-width: 60%;
  font-weight: 500;
}

.company-name.text-dark {
  color: var(--bs-secondary) !important;
}
</style>
