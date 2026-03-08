<template>
  <div class="todo-input mb-4">
    <label for="new_task" class="form-label fw-bold text-primary mb-3">
      <!-- Changed from h5 to strong for semantic correctness -->
      <strong class="fs-5">Enter a new task</strong>
    </label>

    <div class="input-group input-group-lg shadow-sm">
      <input
        type="text"
        id="new_task"
        v-model="newTaskText"
        @keyup.enter="submitTask"
        class="form-control fs-6 border-primary border-opacity-25"
        placeholder="e.g., Update resume and LinkedIn profile"
        aria-describedby="task-input-help"
        aria-label="Enter new task description"
      />
      <button
        @click="submitTask"
        class="btn btn-primary px-4 fw-bold"
        type="button"
        :disabled="!newTaskText.trim()"
        :aria-label="
          newTaskText.trim()
            ? 'Add task to list'
            : 'Enter task text to enable adding'
        "
      >
        Add
      </button>
    </div>

    <div id="task-input-help" class="form-text sr-only">
      Enter a task description and press Enter or click Add to create a new task
    </div>
  </div>
</template>

<script setup>
/**
 * @file TodoInput.vue
 * @description Input component for creating new tasks
 *
 * Features:
 * - Text input with placeholder guidance
 * - Enter key submission
 * - Button disabled when input is empty
 * - Auto-clears after submission
 *
 * Emits:
 * - add: Emitted with task text when submitted
 *
 * Accessibility:
 * - Explicit label association
 * - ARIA descriptions for screen readers
 * - Disabled state clearly indicated
 * - Keyboard accessible (Enter to submit)
 */

import { ref } from "vue";

const newTaskText = ref("");
const emit = defineEmits(["add"]);

/**
 * Submits the task if text is present
 * Prevents empty submissions and clears input on success
 */
const submitTask = () => {
  const trimmedText = newTaskText.value.trim();

  if (trimmedText) {
    emit("add", trimmedText);
    newTaskText.value = ""; // Clear input after successful submission
  }
};
</script>

<style scoped>
/* ==================================================================
   LABEL STYLING
   ================================================================== */

.form-label strong {
  color: var(--bs-primary); /* AAA-compliant primary color */
  display: block;
}

/* ==================================================================
   INPUT STYLING
   ================================================================== */

.form-control:focus {
  border-color: var(--bs-primary);
  box-shadow: 0 0 0 0.25rem rgba(15, 23, 42, 0.15);
}

/* ==================================================================
   BUTTON STYLING
   ================================================================== */

.btn-primary:hover:not(:disabled),
.btn-primary:focus:not(:disabled) {
  background-color: #1e293b !important;
  border-color: #1e293b !important;
}

.btn-primary:disabled {
  background-color: var(--bs-secondary) !important;
  border-color: var(--bs-secondary) !important;
  opacity: 0.65;
  cursor: not-allowed;
}
</style>
