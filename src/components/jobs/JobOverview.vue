<template>
  <article class="job-overview card shadow-sm">
    <div class="card-body p-4 p-md-5">
      <!-- Changed from h2 to h3 to maintain heading hierarchy -->
      <h3 class="card-title text-primary mb-4 fw-bold">Job Overview</h3>

      <div class="card-text lead text-dark">
        <p class="mb-4">
          Insight Hire connects passionate individuals with exciting opportunities in the fields of
          Artificial Intelligence, Data Science, Cybersecurity, and Software Development. Our
          platform showcases roles from top tech companies, research labs, and innovation hubs,
          offering internships, part-time, and full-time positions tailored for emerging talent and
          experienced professionals alike.
        </p>

        <p class="mb-4">
          Whether you're a student looking to break into the tech industry, a researcher aiming to
          apply machine learning in real-world contexts, or a developer seeking your next challenge,
          Insight Hire helps you find roles that match your skills and aspirations. Each job posting
          includes detailed descriptions, required skills, company background, and application
          deadlines, so you can make informed decisions about your career path.
        </p>

        <p class="mb-0">
          Our team is dedicated to promoting meaningful employment by highlighting roles that
          provide mentorship, skill development, and long-term impact. Explore the job list on the
          left to view details of each opportunity, and start building your future today.
        </p>
      </div>
    </div>
  </article>
</template>

<script setup>
/**
 * @file JobOverview.vue
 * @description Welcome screen for the Job Explorer feature
 * 
 * Functionality:
 * - Displays static introduction text
 * - Explains platform purpose and features
 * - Guides users to explore job listings
 * 
 * Architecture:
 * - Pure presentational component (no state or logic)
 * - Fast to render, highly cacheable
 * - Decoupled from data layer
 * 
 * Accessibility:
 * - Semantic article element for content block
 * - Proper heading hierarchy (h3 follows h2 "Job Explorer")
 * - AAA-compliant text colors throughout
 */
</script>

<style scoped>
/* ==================================================================
   CARD STYLING
   ================================================================== */

.job-overview {
  border: none;
  border-top: 5px solid #084298; /* AAA-compliant primary color */
  border-radius: 0.5rem;
}


/* ==================================================================
   TYPOGRAPHY
   ================================================================== */

.card-text {
  line-height: 1.7;
}

/**
 * Text color override for AAA compliance
 * Using #000000 for maximum contrast (21:1 on white)
 */
.text-dark {
  color: #000000 !important;
}

.card-text p {
  font-size: 1rem;
  color: #000000;
}


/* ==================================================================
   RESPONSIVE ADJUSTMENTS
   ================================================================== */

@media (max-width: 767.98px) {
  .card-text {
    font-size: 0.95rem;
  }
}
</style>
