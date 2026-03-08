<template>
  <li role="listitem">
    <router-link
      :to="`/jobs/${job.job_id}`"
      class="list-group-item list-group-item-action p-3"
      active-class="active"
      :aria-label="`View details for ${job.job_title} at ${job.company}`"
      :aria-current="$route.params.id === job.job_id ? 'page' : false"
    >
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
   TEXT STYLING
   ================================================================== */

.list-group-item.active h3 {
  color: var(--bs-primary) !important;
}

.badge {
  background-color: var(--bs-primary) !important;
  color: #ffffff !important;
}

/**
 * Company name color override for AAA compliance
 */
.company-name {
  font-size: 0.875rem;
  max-width: 60%;
  font-weight: 500;
}
</style>
