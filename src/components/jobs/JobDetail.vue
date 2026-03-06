<template>
  <article v-if="job" class="job-detail card shadow-sm border-0">
    <div class="card-body p-4 p-md-5">
      <!-- Main job title - h3 to follow h2 "Job Explorer" -->
      <header class="mb-4 pb-4 border-bottom">
        <h3 class="card-title text-primary mb-3 fw-bold fs-4">{{ job.job_title }}</h3>
        
        <!-- Company name - h4 as subsection -->
        <h4 class="text-dark mb-4 fs-5">{{ job.company }}</h4>

        <div class="d-flex flex-wrap gap-2 mb-3">
          <span 
            class="badge bg-primary px-3 py-2" 
            aria-label="Job category"
          >
            {{ job.category }}
          </span>
          <span 
            class="badge bg-secondary px-3 py-2"
            aria-label="Job location"
          >
            📍 {{ job.location }}
          </span>
          <span 
            class="badge bg-info text-dark px-3 py-2"
            aria-label="Employment type"
          >
            {{ job.employment_type }}
          </span>
        </div>
      </header>

      <!-- Job details grid -->
      <section class="mb-5">
        <h4 class="sr-only">Job Information</h4>
        <div class="row g-3 mb-4">
          <div class="col-12 col-md-6 col-lg-4">
            <div class="info-card p-3 bg-light rounded border h-100">
              <p class="mb-1 small text-dark text-uppercase fw-bold tracking-wide">
                Salary Range
              </p>
              <p class="mb-0 fw-medium text-dark responsive-text">{{ job.salary_range }}</p>
            </div>
          </div>
          <div class="col-12 col-md-6 col-lg-4">
            <div class="info-card p-3 bg-light rounded border h-100">
              <p class="mb-1 small text-dark text-uppercase fw-bold tracking-wide">
                Job Level
              </p>
              <p class="mb-0 fw-medium text-dark responsive-text">{{ job.job_level }}</p>
            </div>
          </div>
          <div class="col-12 col-md-6 col-lg-4">
            <div class="info-card p-3 bg-light rounded border h-100">
              <p class="mb-1 small text-dark text-uppercase fw-bold tracking-wide">
                Positions
              </p>
              <p class="mb-0 fw-medium text-dark responsive-text">{{ job.positions_available }}</p>
            </div>
          </div>
          <div class="col-12 col-md-6 col-lg-4">
            <div class="info-card p-3 bg-light rounded border h-100">
              <p class="mb-1 small text-dark text-uppercase fw-bold tracking-wide">
                Supervisor
              </p>
              <p class="mb-0 fw-medium text-dark responsive-text">{{ job.supervisor }}</p>
            </div>
          </div>
          <div class="col-12 col-md-6 col-lg-4">
            <div class="info-card p-3 bg-light rounded border h-100">
              <p class="mb-1 small text-dark text-uppercase fw-bold tracking-wide">
                Start Date
              </p>
              <p class="mb-0 fw-medium text-dark responsive-text">{{ job.start_date }}</p>
            </div>
          </div>
          <div class="col-12 col-md-6 col-lg-4">
            <div class="info-card p-3 bg-primary bg-opacity-10 rounded border border-primary h-100">
              <p class="mb-1 small text-primary text-uppercase fw-bold tracking-wide">
                Deadline
              </p>
              <p class="mb-0 fw-bold text-dark responsive-text">{{ job.application_deadline }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Job description and requirements -->
      <section class="mb-4">
        <h4 class="fw-bold text-dark mb-3">Description</h4>
        <p class="card-text text-dark line-height-lg mb-5">{{ job.job_description }}</p>

        <h4 class="fw-bold text-dark mb-3">Required Skills</h4>
        <ul class="list-inline mb-5" role="list">
          <li 
            v-for="skill in job.required_skills" 
            :key="skill" 
            class="list-inline-item mb-2"
            role="listitem"
          >
            <span class="badge skill-badge bg-primary bg-opacity-10 text-primary border border-primary border-opacity-25 rounded-pill px-3 py-2 fw-medium">
              {{ skill }}
            </span>
          </li>
        </ul>

        <h4 class="fw-bold text-dark mb-3">Preferred Qualifications</h4>
        <ul class="list-inline mb-4" role="list">
          <li
            v-for="qual in job.preferred_qualifications"
            :key="qual"
            class="list-inline-item mb-2"
            role="listitem"
          >
            <span class="badge qualification-badge bg-secondary bg-opacity-10 text-dark border border-secondary border-opacity-25 rounded-pill px-3 py-2 fw-medium">
              {{ qual }}
            </span>
          </li>
        </ul>
      </section>

      <!-- Application button -->
      <footer class="mt-5 pt-4 border-top text-end">
        <router-link 
          to="/apply" 
          class="btn btn-primary px-5 py-2 fw-bold shadow-sm"
          aria-label="Apply for this position"
        >
          Apply for this Position
        </router-link>
      </footer>
    </div>
  </article>

  <!-- Error state for invalid job ID -->
  <div 
    v-else 
    class="alert alert-danger d-flex align-items-center p-4 shadow-sm" 
    role="alert"
    aria-live="polite"
  >
    <div>
      <h3 class="alert-heading fw-bold mb-2 fs-5">Position Not Found</h3>
      <p class="mb-0">
        We couldn't find a job matching the ID in the URL. Please select a valid position from the
        list on the left.
      </p>
    </div>
  </div>
</template>

<script setup>
/**
 * @file JobDetail.vue
 * @description Displays comprehensive details for a specific job posting
 * 
 * Functionality:
 * - Fetches job by ID from URL parameter
 * - Displays all job information in organized sections
 * - Provides "Apply" button linking to application form
 * - Shows error message for invalid job IDs
 * 
 * Accessibility:
 * - Proper heading hierarchy (h3 → h4)
 * - Semantic HTML (article, section, header, footer)
 * - ARIA labels for badges and interactive elements
 * - aria-live region for error messages
 * - Role attributes for lists
 */

import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { jobsData as jobs } from '../../assets/data/jobs.js'

const route = useRoute()

/**
 * Finds the job matching the current route parameter
 * Returns undefined if no match found (triggers error state)
 */
const job = computed(() => {
  return jobs.find((j) => j.job_id === route.params.id)
})
</script>

<style scoped>
/* ==================================================================
   TYPOGRAPHY
   ================================================================== */

.line-height-lg {
  line-height: 1.8;
}

.tracking-wide {
  letter-spacing: 0.05em;
}

/**
 * Ensure all text colors meet AAA standards
 * Using #000000 for maximum contrast (21:1 on white)
 */
.text-dark {
  color: #000000 !important;
}


/* ==================================================================
   BADGE STYLING
   ================================================================== */

/**
 * Skill badges use primary color scheme
 * Ensuring sufficient contrast for text readability
 */
.skill-badge {
  color: #084298 !important; /* AAA compliant primary color */
}

/**
 * Qualification badges use neutral color scheme
 * Dark text on light background for maximum readability
 */
.qualification-badge {
  color: #000000 !important;
  background-color: rgba(61, 65, 68, 0.1) !important;
  border-color: rgba(61, 65, 68, 0.25) !important;
}


/* ==================================================================
   INFO CARDS
   ================================================================== */

.info-card {
  transition: transform 0.2s ease-in-out;
}

.info-card:hover {
  transform: translateY(-2px);
}


/* ==================================================================
   RESPONSIVE DESIGN
   ================================================================== */

@media (max-width: 991.98px) {
  .responsive-text {
    font-size: 0.9rem;
  }
  
  .responsive-heading {
    font-size: 0.75rem;
  }
}


/* ==================================================================
   BUTTON OVERRIDES
   ================================================================== */

/**
 * Ensure "Apply" button meets AAA standards
 * Using our custom primary color defined in accessibility.css
 */
.btn-primary {
  background-color: #084298 !important;
  border-color: #084298 !important;
  color: #ffffff !important;
}

.btn-primary:hover,
.btn-primary:focus {
  background-color: #052c65 !important;
  border-color: #052c65 !important;
}
</style>
