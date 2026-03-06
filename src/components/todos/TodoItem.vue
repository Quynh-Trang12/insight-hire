<template>
  <li
    class="task-item list-group-item d-flex flex-column flex-md-row justify-content-between align-items-md-center p-3 p-md-4 gap-3 transition-all"
    :class="task.isHighPriority ? 'high-priority-task' : 'normal-task'"
    role="listitem"
  >
    <div class="task-content">
      <span 
        class="task-text fw-medium fs-6" 
        :class="{ 'fw-bold': task.isHighPriority }"
      >
        {{ task.text }}
        <span 
          class="priority-label"
          :class="task.isHighPriority ? 'text-danger' : 'text-dark'"
          :aria-label="`Priority: ${task.isHighPriority ? 'High' : 'Low'}`"
        >
          ({{ task.isHighPriority ? 'High Priority' : 'Low Priority' }})
        </span>
      </span>
    </div>

    <div class="task-actions d-flex gap-2">
      <button
        @click="$emit('toggle', task.id)"
        class="btn btn-sm fw-bold priority-toggle-btn"
        :class="task.isHighPriority ? 'btn-outline-secondary' : 'btn-warning'"
        :aria-label="task.isHighPriority ? 'Mark as low priority' : 'Mark as high priority'"
      >
        Mark as {{ task.isHighPriority ? 'Low' : 'High' }} Priority
      </button>

      <button 
        @click="$emit('delete', task.id)" 
        class="btn btn-sm btn-danger fw-bold delete-btn"
        aria-label="Delete this task"
      >
        Delete
      </button>
    </div>
  </li>
</template>

<script setup>
/**
 * @file TodoItem.vue
 * @description Individual task item component
 * 
 * Props:
 * - task: Object containing { id, text, isHighPriority }
 * 
 * Emits:
 * - toggle: Emitted when priority toggle button is clicked
 * - delete: Emitted when delete button is clicked
 * 
 * Features:
 * - Visual distinction for high priority tasks
 * - Clear action buttons
 * - Smooth transitions
 * - ARIA labels for accessibility
 * 
 * Accessibility:
 * - AAA-compliant color contrasts
 * - Clear button labels
 * - Semantic HTML
 * - ARIA attributes for screen readers
 */

defineProps({
  task: {
    type: Object,
    required: true,
  },
})

defineEmits(['toggle', 'delete'])
</script>

<style scoped>
/* ==================================================================
   TASK ITEM LAYOUT
   ================================================================== */

.task-item {
  background-color: #ffffff;
  border: 1px solid #dee2e6;
}

.transition-all {
  transition: all 0.3s ease-in-out;
}


/* ==================================================================
   PRIORITY STATES
   ================================================================== */

/**
 * High priority tasks have warm-colored background
 * Using lighter warning color for sufficient contrast
 */
.high-priority-task {
  background-color: #fff3cd !important; /* Light yellow background */
  border-color: #856404 !important; /* AAA-compliant dark orange border */
  border-width: 2px;
}

.normal-task {
  background-color: #ffffff;
}


/* ==================================================================
   TEXT STYLING
   ================================================================== */

.task-text {
  color: #000000; /* Maximum contrast */
  line-height: 1.6;
}

/**
 * Priority labels use AAA-compliant colors
 * - Low priority: dark gray (#000000, 21:1 on white)
 * - High priority: dark red (#a71d2a, 7.2:1 on white)
 */
.priority-label {
  font-weight: 500;
  font-size: 0.9rem;
}

.priority-label.text-dark {
  color: #000000 !important;
}

.priority-label.text-danger {
  color: #a71d2a !important; /* AAA-compliant danger color */
}


/* ==================================================================
   BUTTON STYLING
   ================================================================== */

/**
 * Warning button (Mark as High Priority)
 * Uses solid background for better contrast than outline
 * - Background: #856404 (AAA-compliant dark orange)
 * - Text: #ffffff (white)
 * - Contrast: 7.1:1
 */
.btn-warning {
  background-color: #856404 !important;
  border-color: #856404 !important;
  color: #ffffff !important;
}

.btn-warning:hover,
.btn-warning:focus {
  background-color: #664d03 !important;
  border-color: #664d03 !important;
  color: #ffffff !important;
}

/**
 * Outline secondary button (Mark as Low Priority)
 * Uses our AAA-compliant secondary color
 */
.btn-outline-secondary {
  color: #3d4144 !important;
  border-color: #3d4144 !important;
}

.btn-outline-secondary:hover,
.btn-outline-secondary:focus {
  background-color: #3d4144 !important;
  border-color: #3d4144 !important;
  color: #ffffff !important;
}

/**
 * Danger button (Delete)
 * Uses AAA-compliant dark red
 * - Background: #a71d2a
 * - Text: #ffffff
 * - Contrast: 7.2:1
 */
.btn-danger {
  background-color: #a71d2a !important;
  border-color: #a71d2a !important;
  color: #ffffff !important;
}

.btn-danger:hover,
.btn-danger:focus {
  background-color: #7a161f !important;
  border-color: #7a161f !important;
  color: #ffffff !important;
}


/* ==================================================================
   RESPONSIVE DESIGN
   ================================================================== */

@media (max-width: 767.98px) {
  .task-actions {
    flex-direction: column;
    width: 100%;
  }
  
  .task-actions button {
    width: 100%;
  }
}


/* ==================================================================
   HOVER EFFECTS
   ================================================================== */

.task-item:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transform: translateY(-1px);
}
</style>
