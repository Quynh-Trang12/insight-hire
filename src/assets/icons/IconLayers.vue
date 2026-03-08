<template>
  <!--
    Layers icon – used as the Insight Hire brand logo.
    All presentational attributes are set via props so the
    consuming component keeps full control over size and colour.
  -->
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    :stroke-width="strokeWidth"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M12 2L2 7l10 5 10-5-10-5Z" />
    <path d="M2 17l10 5 10-5" />
    <path d="M2 12l10 5 10-5" />
  </svg>
</template>

<script setup>
/**
 * @file IconLayers.vue
 * @description Reusable "layers" SVG icon component (Insight Hire brand logo).
 *
 * Props:
 * - size (Number|String): Width & height in px. Default 24.
 * - strokeWidth (Number|String): SVG stroke-width. Default 2.5.
 *
 * Accessibility:
 * - aria-hidden="true" (decorative icon – parent provides text label)
 * - focusable="false" to prevent IE/Edge tab-stop
 */
defineProps({
  size: { type: [Number, String], default: 24 },
  strokeWidth: { type: [Number, String], default: 2.5 },
});
</script>
