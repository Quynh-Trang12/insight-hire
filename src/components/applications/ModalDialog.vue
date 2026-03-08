<template>
  <Teleport to="body">
    <div
      v-if="visible"
      class="modal-overlay"
      role="dialog"
      aria-modal="true"
      :aria-labelledby="titleId"
      :aria-describedby="bodyId"
      @keydown.escape="$emit('close')"
      @click.self="$emit('close')"
    >
      <div
        ref="dialogRef"
        class="modal-dialog-box bg-white rounded shadow-lg border"
        tabindex="-1"
      >
        <!-- Modal Header -->
        <div
          class="modal-header-section p-3 border-bottom d-flex align-items-center justify-content-between"
          :class="headerClass"
        >
          <h4 :id="titleId" class="mb-0 fw-bold fs-5">{{ title }}</h4>
          <button
            type="button"
            class="btn-close"
            :aria-label="'Close ' + title + ' dialog'"
            @click="$emit('close')"
          ></button>
        </div>

        <!-- Modal Body -->
        <div :id="bodyId" class="modal-body-section p-4">
          <!-- Success message -->
          <template v-if="variant === 'success'">
            <p class="mb-0 fw-bold text-success">
              <span aria-hidden="true">✓</span>
              {{ message }}
            </p>
          </template>

          <!-- Error message with field list -->
          <template v-else-if="variant === 'error'">
            <p class="mb-2 fw-bold text-danger">{{ message }}</p>
            <ul
              v-if="errors.length"
              class="mb-0 ps-3"
              role="list"
              aria-label="Validation errors"
            >
              <li
                v-for="(error, index) in errors"
                :key="index"
                class="small mb-1 text-danger"
              >
                {{ error }}
              </li>
            </ul>
          </template>
        </div>

        <!-- Modal Footer -->
        <div
          class="modal-footer-section p-3 border-top d-flex justify-content-end"
        >
          <button
            ref="closeBtnRef"
            type="button"
            class="btn px-4 py-2 fw-bold"
            :class="buttonClass"
            @click="$emit('close')"
          >
            {{ variant === "success" ? "OK" : "Close" }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
/**
 * @file ModalDialog.vue
 * @description Accessible modal dialog for form feedback messages
 *
 * Props:
 * - visible (Boolean): Controls visibility
 * - title (String): Modal heading text
 * - message (String): Main message body
 * - variant (String): 'success' or 'error'
 * - errors (Array): List of error strings (for error variant)
 *
 * Emits:
 * - close: Fired when modal should be dismissed
 *
 * Accessibility:
 * - role="dialog" with aria-modal="true"
 * - aria-labelledby and aria-describedby
 * - Focus trap within modal
 * - Escape key closes modal
 * - Backdrop click closes modal
 * - Scroll lock on body when open
 * - Focus returned to trigger element on close
 */

import { ref, watch, nextTick, computed, onBeforeUnmount } from "vue";

const props = defineProps({
  visible: { type: Boolean, required: true },
  title: { type: String, required: true },
  message: { type: String, default: "" },
  variant: {
    type: String,
    default: "success",
    validator: (v) => ["success", "error"].includes(v),
  },
  errors: { type: Array, default: () => [] },
});

defineEmits(["close"]);

const dialogRef = ref(null);
const closeBtnRef = ref(null);

/* ==================================================================
   COMPUTED IDS & CLASSES
   ================================================================== */

const titleId = computed(() => `modal-title-${props.variant}`);
const bodyId = computed(() => `modal-body-${props.variant}`);

const headerClass = computed(() =>
  props.variant === "success"
    ? "bg-success bg-opacity-10"
    : "bg-danger bg-opacity-10",
);

const buttonClass = computed(() =>
  props.variant === "success" ? "btn-primary" : "btn-danger",
);

/* ==================================================================
   FOCUS MANAGEMENT & SCROLL LOCK
   ================================================================== */

let previousActiveElement = null;

watch(
  () => props.visible,
  async (isVisible) => {
    if (isVisible) {
      // Save trigger element for focus restoration
      previousActiveElement = document.activeElement;

      // Lock body scroll
      document.body.style.overflow = "hidden";

      await nextTick();

      // Focus the close button inside the modal
      closeBtnRef.value?.focus();
    } else {
      // Restore body scroll
      document.body.style.overflow = "";

      // Restore focus to the trigger element
      previousActiveElement?.focus();
      previousActiveElement = null;
    }
  },
);

// Cleanup on unmount
onBeforeUnmount(() => {
  document.body.style.overflow = "";
});
</script>

<style scoped>
/* ==================================================================
   MODAL OVERLAY
   ================================================================== */

.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 1055;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
}

/* ==================================================================
   MODAL DIALOG BOX
   ================================================================== */

.modal-dialog-box {
  width: 90%;
  max-width: 500px;
  max-height: 80vh;
  overflow-y: auto;
  outline: none;
}
</style>
