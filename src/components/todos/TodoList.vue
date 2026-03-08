<template>
  <div class="todo-list-container bg-white p-4 p-md-5 rounded shadow-sm border">
    <TodoInput @add="addTask" />

    <div class="mt-5">
      <!-- Changed from h5 to h3 for correct heading hierarchy -->
      <h3 class="fw-bold text-dark mb-3 border-bottom pb-2">Your Tasks</h3>

      <ul v-if="tasks.length > 0" class="list-group shadow-sm" role="list">
        <TransitionGroup name="list">
          <TodoItem
            v-for="task in tasks"
            :key="task.id"
            :task="task"
            @toggle="togglePriority"
            @delete="deleteTask"
          />
        </TransitionGroup>
      </ul>

      <div
        v-else
        class="empty-state text-center p-5 bg-light rounded border border-dashed"
        role="status"
        aria-live="polite"
      >
        <p class="text-dark mb-0">No tasks remaining. You are all caught up!</p>
      </div>
    </div>

    <!-- Undo Delete Toast Notification -->
    <Transition name="toast">
      <div
        v-if="showUndoToast"
        class="toast-notification"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div class="toast-content">
          <span class="toast-message">Task deleted</span>
          <button
            @click="undoDelete"
            class="btn btn-sm btn-primary toast-action"
            aria-label="Undo task deletion"
          >
            Undo
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
/**
 * @file TodoList.vue
 * @description Task management component with undo delete functionality
 *
 * Features:
 * - Add new tasks (prepended to list)
 * - Delete tasks with 5-second undo window
 * - Toggle priority (High/Low)
 * - Smooth animations for add/remove
 * - Toast notifications for user feedback
 *
 * State Management:
 * - tasks: Active task list
 * - deletedTasks: Stack of recently deleted tasks (for undo)
 * - showUndoToast: Controls toast visibility
 * - undoTimeoutId: Manages auto-dismissal timer
 *
 * Accessibility:
 * - ARIA live regions for dynamic updates
 * - Semantic HTML throughout
 * - Keyboard-accessible undo button
 * - Clear visual feedback
 */

import { ref, watch } from "vue";
import TodoInput from "./TodoInput.vue";
import TodoItem from "./TodoItem.vue";

/* ==================================================================
   STATE MANAGEMENT
   ================================================================== */

const STORAGE_KEY = "insighthire_todos";
const UNDO_TIMEOUT_MS = 5000; // 5 seconds to undo deletion

/**
 * Loads persisted tasks from localStorage
 * Returns an empty array if no data exists or data is corrupted
 */
const loadTasks = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const tasks = ref(loadTasks());
const deletedTasks = ref([]);
const showUndoToast = ref(false);
const undoTimeoutId = ref(null);

/**
 * Persists tasks to localStorage whenever the array changes
 * Deep watch catches property changes (e.g. priority toggle)
 */
watch(
  tasks,
  (newTasks) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newTasks));
  },
  { deep: true },
);

/* ==================================================================
   TASK MANAGEMENT FUNCTIONS
   ================================================================== */

/**
 * Adds a new task to the beginning of the list
 * @param {string} taskText - The task description
 */
const addTask = (taskText) => {
  if (!taskText || !taskText.trim()) return;

  const newTask = {
    id: Date.now(), // Simple unique ID generator
    text: taskText.trim(),
    isHighPriority: false, // New tasks default to low priority
  };

  tasks.value.unshift(newTask); // Prepend to start of array
};

/**
 * Deletes a task with undo capability
 * @param {number} id - Task ID to delete
 *
 * Algorithm:
 * 1. Find and store the task in deletedTasks stack
 * 2. Remove task from active list
 * 3. Show undo toast with timeout
 * 4. Auto-clear undo option after 5 seconds
 */
const deleteTask = (id) => {
  const task = tasks.value.find((t) => t.id === id);
  if (!task) return;

  // Store deleted task with timestamp
  deletedTasks.value.push({
    task: { ...task }, // Clone to avoid reference issues
    timestamp: Date.now(),
  });

  // Remove from active list
  tasks.value = tasks.value.filter((t) => t.id !== id);

  // Show undo notification
  showUndoToast.value = true;

  // Clear any existing timeout
  if (undoTimeoutId.value) {
    clearTimeout(undoTimeoutId.value);
  }

  // Auto-hide toast after timeout
  undoTimeoutId.value = setTimeout(() => {
    showUndoToast.value = false;

    // Clean up old deleted tasks (keep only those within timeout window)
    deletedTasks.value = deletedTasks.value.filter(
      (d) => Date.now() - d.timestamp < UNDO_TIMEOUT_MS,
    );
  }, UNDO_TIMEOUT_MS);
};

/**
 * Restores the most recently deleted task
 *
 * Algorithm:
 * 1. Pop last deleted task from stack
 * 2. Restore to beginning of active list
 * 3. Hide toast notification
 */
const undoDelete = () => {
  if (deletedTasks.value.length === 0) return;

  const { task } = deletedTasks.value.pop();
  tasks.value.unshift(task); // Restore to beginning

  showUndoToast.value = false;

  // Clear timeout since user manually undid
  if (undoTimeoutId.value) {
    clearTimeout(undoTimeoutId.value);
    undoTimeoutId.value = null;
  }
};

/**
 * Toggles a task between high and low priority
 * @param {number} id - Task ID to toggle
 */
const togglePriority = (id) => {
  const task = tasks.value.find((t) => t.id === id);
  if (task) {
    task.isHighPriority = !task.isHighPriority;
  }
};
</script>

<style scoped>
/* ==================================================================
   LIST ANIMATIONS
   ================================================================== */

/**
 * Vue TransitionGroup animations for smooth add/remove effects
 * Provides premium, app-like feel
 */
.list-enter-active,
.list-leave-active {
  transition: all 0.4s ease;
}

.list-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-move {
  transition: transform 0.4s ease;
}

/* ==================================================================
   EMPTY STATE
   ================================================================== */

.border-dashed {
  border-style: dashed !important;
}

.empty-state p {
  color: var(--bs-secondary) !important; /* AAA-compliant muted text */
  font-size: 1rem;
}

/* ==================================================================
   TOAST NOTIFICATION STYLES (Undo Delete Feature)
   ================================================================== */

/**
 * Fixed position toast in bottom-right corner
 * Ensures visibility without blocking content
 */
.toast-notification {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 1050;
  min-width: 320px;
  max-width: 400px;
  background-color: #ffffff;
  border: 2px solid var(--bs-primary); /* AAA-compliant primary color */
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding: 16px;
}

.toast-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}

.toast-message {
  flex: 1;
  color: #1e293b; /* Slate 800 for maximum contrast */
  font-weight: 500;
  font-size: 0.95rem;
}

.toast-action {
  flex-shrink: 0;
}

/* ==================================================================
   TOAST ANIMATIONS (Undo Delete Feature)
   ================================================================== */

/**
 * Slide in from bottom-right with fade
 */
.toast-enter-active {
  animation: toast-in 0.3s ease-out;
}

.toast-leave-active {
  animation: toast-out 0.3s ease-in;
}

@keyframes toast-in {
  from {
    opacity: 0;
    transform: translateY(100%) translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0) translateX(0);
  }
}

@keyframes toast-out {
  from {
    opacity: 1;
    transform: translateY(0) translateX(0);
  }
  to {
    opacity: 0;
    transform: translateY(20px) translateX(20px);
  }
}

/* ==================================================================
   HEADING COLOR OVERRIDE
   ================================================================== */

.text-dark {
  color: #1e293b !important;
}

/* ==================================================================
   RESPONSIVE ADJUSTMENTS
   ================================================================== */

@media (max-width: 575.98px) {
  .toast-notification {
    left: 16px;
    right: 16px;
    bottom: 16px;
    min-width: auto;
  }
}
</style>
