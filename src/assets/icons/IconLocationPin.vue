<template>
  <!--
    Location-pin icon – indicates a geographic location.
    Rendered as a stroked (outline) SVG; colour inherits
    from the parent's `color` via `currentColor`.
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
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
</template>

<script setup>
/**
 * @file IconLocationPin.vue
 * @description Reusable "location pin" SVG icon component.
 *
 * Props:
 * - size (Number|String): Width & height in px. Default 14.
 * - strokeWidth (Number|String): SVG stroke-width. Default 2.5.
 *
 * Accessibility:
 * - aria-hidden="true" (decorative – parent badge provides text label)
 * - focusable="false"
 */
defineProps({
  size: { type: [Number, String], default: 14 },
  strokeWidth: { type: [Number, String], default: 2.5 },
});
</script>
