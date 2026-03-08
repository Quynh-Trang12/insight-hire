<template>
  <div id="app">
    <!-- Skip to main content link for keyboard users -->
    <a href="#main-content" class="skip-link">Skip to main content</a>

    <header class="bg-white border-bottom p-3 mb-4 shadow-sm">
      <div
        class="container d-flex flex-column flex-md-row justify-content-between align-items-center"
      >
        <h1 class="h3 mb-3 mb-md-0 fw-bold d-flex align-items-center">
          <svg
            class="text-primary me-2"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5Z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
          <span class="text-primary fw-bolder">Insight</span
          ><span class="text-secondary fw-semibold">Hire</span>
        </h1>

        <nav ref="navRef" aria-label="Main navigation" class="nav-wrapper">
          <ul class="nav-list d-flex gap-3 gap-md-4 list-unstyled mb-0">
            <li>
              <router-link
                to="/jobs"
                data-text="Job Explorer"
                class="nav-link-item text-secondary fw-medium text-decoration-none"
                active-class="text-primary fw-bold active-nav"
                aria-current="page"
              >
                Job Explorer
              </router-link>
            </li>

            <li>
              <router-link
                to="/apply"
                data-text="Job Application"
                class="nav-link-item text-secondary fw-medium text-decoration-none"
                active-class="text-primary fw-bold active-nav"
              >
                Job Application
              </router-link>
            </li>

            <li>
              <router-link
                to="/todos"
                data-text="To-Do List"
                class="nav-link-item text-secondary fw-medium text-decoration-none"
                active-class="text-primary fw-bold active-nav"
              >
                To-Do List
              </router-link>
            </li>
          </ul>

          <!-- Sliding indicator — outside <ul> for valid HTML -->
          <span
            ref="indicatorRef"
            class="nav-indicator"
            :class="{ 'nav-indicator--ready': isReady }"
            :style="indicatorStyle"
            aria-hidden="true"
          ></span>
        </nav>
      </div>
    </header>

    <!-- Main content area - single <main> landmark for the page -->
    <main id="main-content">
      <router-view />
    </main>

    <footer class="text-center mt-5 py-4 border-top">
      <div class="container">
        <p class="mb-0 fw-medium">
          &copy; 2026 Insight Hire. All rights reserved.
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup>
/**
 * @file App.vue
 * @description Root component providing global layout structure
 *
 * Architecture:
 * - Single header with primary navigation
 * - Sliding indicator bar that animates between active nav items
 * - Router view for dynamic content (contains <main> landmark in child views)
 * - Single footer with copyright information
 *
 * Accessibility:
 * - Proper landmark structure (<header>, <nav>, <footer>)
 * - Skip link for keyboard users
 * - ARIA labels on navigation
 * - Semantic HTML throughout
 * - Indicator is aria-hidden (decorative only)
 */
import { ref, onMounted, onBeforeUnmount, watch, nextTick } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const navRef = ref(null);
const indicatorRef = ref(null);

/** Whether the initial position has been set (enables CSS transitions) */
const isReady = ref(false);

/** Inline styles applied to the indicator element */
const indicatorStyle = ref({
  width: "0px",
  transform: "translateX(0px)",
  opacity: 0,
});

/**
 * Measures the active nav link relative to the <nav> wrapper
 * and updates the indicator's position and width.
 */
function updateIndicator() {
  if (!navRef.value) return;

  const activeLink = navRef.value.querySelector(".active-nav");
  if (!activeLink) {
    indicatorStyle.value = { ...indicatorStyle.value, opacity: 0 };
    return;
  }

  const navRect = navRef.value.getBoundingClientRect();
  const linkRect = activeLink.getBoundingClientRect();

  indicatorStyle.value = {
    width: `${linkRect.width}px`,
    transform: `translateX(${linkRect.left - navRect.left}px)`,
    opacity: 1,
  };
}

/**
 * Debounced version of updateIndicator for resize events.
 * Prevents layout thrashing during continuous resize.
 */
let resizeTimerId = null;
function debouncedUpdate() {
  if (resizeTimerId !== null) {
    cancelAnimationFrame(resizeTimerId);
  }
  resizeTimerId = requestAnimationFrame(() => {
    updateIndicator();
    resizeTimerId = null;
  });
}

// Re-calculate on route change
watch(
  () => route.path,
  () => {
    nextTick(updateIndicator);
  },
);

// Lifecycle
let resizeObserver = null;

onMounted(() => {
  // Initial positioning without transition
  nextTick(() => {
    updateIndicator();

    // Enable transitions after the browser has painted the initial position.
    // Using double rAF is replaced by a class toggle:
    // first frame = paint with no transition, second frame = add the class.
    requestAnimationFrame(() => {
      isReady.value = true;
    });
  });

  // ResizeObserver for layout shifts (e.g. font loading, container resize)
  if (window.ResizeObserver && navRef.value) {
    resizeObserver = new ResizeObserver(debouncedUpdate);
    resizeObserver.observe(navRef.value);
  }

  window.addEventListener("resize", debouncedUpdate);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", debouncedUpdate);
  if (resizeObserver) resizeObserver.disconnect();
  if (resizeTimerId !== null) cancelAnimationFrame(resizeTimerId);
});
</script>

<style scoped>
/* ==================================================================
   HEADER STYLES
   ================================================================== */

header {
  position: sticky;
  top: 0;
  z-index: 1000;
}

/* Navigation list styling */
.nav-link-item {
  display: inline-block;
  position: relative;
}

/* ==================================================================
   FOOTER STYLES  
   ================================================================== */

footer {
  margin-top: auto;
  background-color: #f8f9fa;
}

/* 
 * Footer text color override to meet AAA standards
 * Original text-muted is too light, this darker color has AAA contrast
 */
footer p {
  color: var(--bs-secondary) !important;
  font-size: 0.875rem;
}

h1 {
  letter-spacing: -0.025em;
}

/* ==================================================================
   NAV LINK STYLES
   ================================================================== */

.nav-link-item {
  transition: color 0.3s ease-in-out;
}

.nav-link-item:hover {
  color: #000000 !important;
}

/*
 * Pre-reserve bold text width to prevent layout shift.
 * Each link has an invisible ::after with the same text rendered in bold.
 * This ensures the <li> always occupies the bold-width, so switching
 * from fw-medium to fw-bold doesn't shift neighbouring items.
 */
.nav-link-item::after {
  content: attr(data-text);
  content: attr(data-text) / "";
  height: 0;
  visibility: hidden;
  overflow: hidden;
  pointer-events: none;
  font-weight: 700;
  display: block;
}

/* ==================================================================
   SLIDING INDICATOR
   ================================================================== */

.nav-wrapper {
  position: relative;
}

.nav-indicator {
  position: absolute;
  bottom: -4px;
  left: 0;
  height: 3px;
  background-color: var(--bs-primary);
  border-radius: 2px;
  pointer-events: none;
  will-change: transform, width;
  /* No transition initially — set by .nav-indicator--ready */
}

.nav-indicator--ready {
  transition:
    transform 0.35s cubic-bezier(0.4, 0, 0.2, 1),
    width 0.35s cubic-bezier(0.4, 0, 0.2, 1),
    opacity 0.2s ease;
}

/* ==================================================================
   RESPONSIVE NAVIGATION
   ================================================================== */

@media (max-width: 767.98px) {
  .nav-list {
    flex-direction: column;
    align-items: center;
    gap: 1rem !important;
  }

  .nav-link-item {
    width: 100%;
    text-align: center;
  }

  /* Hide the sliding indicator on mobile vertical layout */
  .nav-indicator {
    display: none;
  }

  /* Static underline fallback for the active nav item on mobile */
  .active-nav {
    box-shadow: 0 3px 0 0 var(--bs-primary);
    padding-bottom: 4px;
  }
}
</style>
