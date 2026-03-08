<template>
  <article v-if="job" class="card shadow-sm border-0">
    <div class="card-body p-4 p-md-5">
      <!-- Main job title - h3 to follow h2 "Job Explorer" -->
      <header class="mb-4 pb-4 border-bottom">
        <h3 class="card-title text-primary mb-3 fw-bold fs-4">
          {{ job.job_title }}
        </h3>

        <!-- Company name - h4 as subsection -->
        <h4 class="company-name mb-4 fs-5">{{ job.company }}</h4>

        <div class="d-flex flex-wrap gap-2 mb-3">
          <span class="badge bg-primary px-3 py-2" aria-label="Job category">
            {{ job.category }}
          </span>
          <span
            class="badge bg-secondary px-3 py-2 d-inline-flex align-items-center gap-1"
            aria-label="Job location"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {{ job.location }}
          </span>
          <span
            class="badge bg-info text-white px-3 py-2"
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
              <p class="mb-1 small text-dark text-uppercase fw-bold">
                Salary Range
              </p>
              <p class="mb-0 fw-medium text-dark responsive-text">
                {{ job.salary_range }}
              </p>
            </div>
          </div>
          <div class="col-12 col-md-6 col-lg-4">
            <div class="info-card p-3 bg-light rounded border h-100">
              <p class="mb-1 small text-dark text-uppercase fw-bold">
                Job Level
              </p>
              <p class="mb-0 fw-medium text-dark responsive-text">
                {{ job.job_level }}
              </p>
            </div>
          </div>
          <div class="col-12 col-md-6 col-lg-4">
            <div class="info-card p-3 bg-light rounded border h-100">
              <p class="mb-1 small text-dark text-uppercase fw-bold">
                Avail. Positions
              </p>
              <p class="mb-0 fw-medium text-dark responsive-text">
                {{ job.positions_available }}
              </p>
            </div>
          </div>
          <div class="col-12 col-md-6 col-lg-4">
            <div class="info-card p-3 bg-light rounded border h-100">
              <p class="mb-1 small text-dark text-uppercase fw-bold">
                Supervisor
              </p>
              <p class="mb-0 fw-medium text-dark responsive-text">
                {{ job.supervisor }}
              </p>
            </div>
          </div>
          <div class="col-12 col-md-6 col-lg-4">
            <div class="info-card p-3 bg-light rounded border h-100">
              <p class="mb-1 small text-dark text-uppercase fw-bold">
                Start Date
              </p>
              <p class="mb-0 fw-medium text-dark responsive-text">
                {{ job.start_date }}
              </p>
            </div>
          </div>
          <div class="col-12 col-md-6 col-lg-4">
            <div
              class="info-card p-3 bg-light rounded border border-primary h-100"
            >
              <p class="mb-1 small text-primary text-uppercase fw-bold">
                Deadline
              </p>
              <p class="mb-0 fw-bold text-dark responsive-text">
                {{ job.application_deadline }}
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Job description and requirements -->
      <section class="mb-4">
        <h4 class="fw-bold text-dark mb-3">Description</h4>
        <p class="card-text text-dark line-height-lg mb-5">
          {{ job.job_description }}
        </p>

        <h4 class="fw-bold text-dark mb-3">Required Skills</h4>
        <ul class="list-inline mb-5" role="list">
          <li
            v-for="skill in job.required_skills"
            :key="skill"
            class="list-inline-item mb-2"
            role="listitem"
          >
            <span class="badge skill-badge rounded-pill px-3 py-2 fw-medium">
              {{ skill }}
            </span>
          </li>
        </ul>

        <h4 class="fw-bold text-dark mb-3">Preferred Qualifications</h4>
        <ul class="list-inline mb-4" role="list">
          <li
            v-for="qualification in job.preferred_qualifications"
            :key="qualification"
            class="list-inline-item mb-2"
            role="listitem"
          >
            <span
              class="badge qualification-badge rounded-pill px-3 py-2 fw-medium"
            >
              {{ qualification }}
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
        We couldn&apos;t find a job matching the ID in the URL. Please select a
        valid position from the list on the left.
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

import { computed } from "vue";
import { useRoute } from "vue-router";
import { jobsData as jobs } from "../../assets/data/jobs.js";

const route = useRoute();

/**
 * Finds the job matching the current route parameter
 * Returns undefined if no match found (triggers error state)
 */
const job = computed(() => {
  return jobs.find((j) => j.job_id === route.params.id);
});
</script>

<style scoped>
/* ==================================================================
   TYPOGRAPHY
   ================================================================== */

.card-text {
  line-height: 1.8;
}

.small {
  letter-spacing: 0.05em;
}

/* ==================================================================
   BADGE STYLING
   ================================================================== */

/**
 * Skill badges - explicit light primary background
 * Text: #0F172A (primary) on #E2E8F0 (Slate 200) = 12.3:1 ✅ AAA
 */
.skill-badge {
  color: var(--bs-primary) !important;
  background-color: #e2e8f0 !important;
  border: 1px solid #94a3b8 !important;
}

/**
 * Qualification badges - explicit light neutral background 
 * Text: #1E293B (Slate 800) on #F1F5F9 (Slate 100) = 10.3:1 ✅ AAA
 */
.qualification-badge {
  color: #1e293b !important;
  background-color: #f1f5f9 !important;
  border: 1px solid #cbd5e1 !important;
}

/* ==================================================================
   INFO CARDS
   ================================================================== */

.info-card {
  /* Establish an isolated container to scale typography dynamically based on this card's width */
  container-type: inline-size;
}

/* ==================================================================
   FLUID RESPONSIVE DESIGN
   ================================================================== */

/* Fluid text based on info-card's actual current width, completely avoiding breakpoints */
.responsive-text {
  white-space: nowrap;
  /* Fluidly scales text size between limits: clamp(min, preferred based on container %, max) */
  font-size: clamp(0.75rem, 6cqi, 1rem);
}

.info-card .small {
  /* Dynamic heading sizing */
  font-size: clamp(0.7rem, 5cqi, 0.875em);
}
</style>
