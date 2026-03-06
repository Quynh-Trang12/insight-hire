<template>
  <div class="application-view container my-5">
    <div class="row justify-content-center">
      <div class="col-12 col-lg-10">
        <header class="page-header mb-4 text-center">
          <h2 class="fw-bold text-primary">Job Application</h2>
          <p class="subtitle text-muted">
            Please fill out the form below to apply for a position. All required fields must be
            completed correctly before submission.
          </p>
        </header>

        <!-- No <main> here - parent view (JobExplorer or App) provides it -->
        <div class="form-container">
          <ApplicationForm />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
/**
 * @file ApplicationView.vue
 * @description Page layout for job application form
 * 
 * Architecture:
 * - Presentational view component
 * - Centers form on page
 * - Provides page title and instructions
 * 
 * Accessibility:
 * - No nested <main> landmark (parent provides it)
 * - Semantic <header> for page title
 * - Clear instructions for form completion
 */

import ApplicationForm from '../components/applications/ApplicationForm.vue'
</script>

<style scoped>
/* ==================================================================
   LAYOUT STYLES
   ================================================================== */

.application-view {
  padding-bottom: 3rem;
  min-height: 60vh;
}

.page-header {
  margin-bottom: 2rem;
}

/* 
 * Subtitle color override for AAA compliance
 * Using darker gray (#3d4144) for 10.5:1 contrast ratio
 */
.subtitle {
  color: #3d4144 !important;
  font-size: 1rem;
  line-height: 1.6;
}


/* ==================================================================
   FORM CONTAINER
   ================================================================== */

.form-container {
  max-width: 100%;
}
</style>
