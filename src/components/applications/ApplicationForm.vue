<template>
  <form
    method="post"
    action="https://mercury.swin.edu.au/it000000/formtest.php"
    @submit="validateAndSubmit"
    class="application-form bg-white p-4 p-md-5 rounded shadow-sm border"
    novalidate
    autocomplete="on"
  >
    <FieldsetPersonal
      v-model:firstName="form.firstName"
      v-model:lastName="form.lastName"
      v-model:dob="form.dob"
      :errors="errors"
      @validate="handleValidate"
    />

    <FieldsetAccount
      v-model:username="form.username"
      v-model:email="form.email"
      v-model:password="form.password"
      v-model:confirmPassword="form.confirmPassword"
      :errors="errors"
      @validate="handleValidate"
    />

    <FieldsetAddress
      v-model:street="form.street"
      v-model:suburb="form.suburb"
      v-model:postcode="form.postcode"
      v-model:mobile="form.mobile"
      :errors="errors"
      @validate="handleValidate"
    />

    <FieldsetPreferences
      v-model:category="form.category"
      :errors="errors"
      @validate="handleValidate"
    />

    <div class="mb-4 p-3 border rounded bg-white">
      <button
        type="button"
        class="btn btn-outline-secondary btn-sm"
        @click="toggleTerms"
      >
        {{ showTerms ? "Hide" : "View" }} Terms and Conditions
      </button>
      <div
        v-show="showTerms"
        class="terms-text p-3 bg-light border rounded small text-dark mt-2"
      >
        By submitting this application, you agree that all information provided
        is accurate and true to the best of your knowledge.
      </div>
    </div>

    <div class="d-flex align-items-center gap-3 mt-4 flex-wrap">
      <button type="submit" class="btn btn-primary px-5 py-2 fw-bold shadow-sm">
        Submit Application
      </button>
    </div>

    <!-- Modal Dialog for form feedback -->
    <ModalDialog
      :visible="modal.visible"
      :title="modal.title"
      :message="modal.message"
      :variant="modal.variant"
      :errors="modal.errors"
      @close="closeModal"
    />
  </form>
</template>

<script setup>
/**
 * @file ApplicationForm.vue
 * @description Smart parent component managing form state and validation
 *
 * Architecture:
 * - Centralized state management (reactive form object)
 * - Validation coordinated through handleValidate method
 * - Child fieldsets are presentational (emit events, display errors)
 * - Modal dialog for success/error feedback
 *
 * Validation Strategy:
 * - Field-level validation on blur/input/change
 * - Form-level validation on submit
 * - Regex patterns and length constants from centralized constants
 * - Optional fields (street, suburb) skip the required check
 * - Real-time error feedback via child component error props
 */

import { reactive, ref, computed } from "vue";
import FieldsetPersonal from "./FieldsetPersonal.vue";
import FieldsetAccount from "./FieldsetAccount.vue";
import FieldsetAddress from "./FieldsetAddress.vue";
import FieldsetPreferences from "./FieldsetPreferences.vue";
import ModalDialog from "./ModalDialog.vue";
import {
  REGEX,
  MIN_LENGTH,
  MAX_LENGTH,
  OPTIONAL_FIELDS,
} from "../../constants/regex.js";

/* ==================================================================
   STATE MANAGEMENT
   ================================================================== */

const form = reactive({
  firstName: "",
  lastName: "",
  dob: "",
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  street: "",
  suburb: "",
  postcode: "",
  mobile: "",
  category: "",
});

const errors = reactive({});
const showTerms = ref(false);

const hasErrors = computed(() => Object.keys(errors).length > 0);

/* ==================================================================
   MODAL STATE
   ================================================================== */

const modal = reactive({
  visible: false,
  title: "",
  message: "",
  variant: "success",
  errors: [],
});

/* ==================================================================
   FIELD-SPECIFIC ERROR MESSAGES
   ================================================================== */

/** Human-readable labels for each field (used in modal error list) */
const FIELD_LABELS = {
  firstName: "First Name",
  lastName: "Last Name",
  dob: "Date of Birth",
  username: "Username",
  email: "Email Address",
  password: "Password",
  confirmPassword: "Confirm Password",
  street: "Street Address",
  suburb: "Suburb",
  postcode: "Postcode",
  mobile: "Mobile Number",
  category: "Preferred Job Category",
};

/* ==================================================================
   VALIDATION FUNCTIONS
   ================================================================== */

/**
 * Calculates age from a date-of-birth string
 * @param {string} dobStr - Date string (YYYY-MM-DD)
 * @returns {number} Age in years
 */
const calculateAge = (dobStr) => {
  const dob = new Date(dobStr);
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age--;
  }
  return age;
};

/**
 * Validates a single form field
 * @param {string} field - Field name to validate
 * @param {any} value - Current field value
 * @param {Object} formState - Complete form state (for cross-field validation)
 */
const validateField = (field, value, formState) => {
  // Clear existing error for this field
  delete errors[field];

  const trimmed = typeof value === "string" ? value.trim() : value;

  // Skip required check for optional fields
  if (OPTIONAL_FIELDS.has(field)) {
    // If optional and empty, no further validation needed
    if (!trimmed) return;
  } else {
    // Required field check
    if (!trimmed) {
      errors[field] = "This field is required.";
      return;
    }
  }

  // Field-specific validation
  switch (field) {
    case "firstName":
    case "lastName":
      if (!REGEX.ALPHA_ONLY.test(trimmed)) {
        errors[field] = "Must contain letters only.";
      }
      break;

    case "username":
      if (trimmed.length < MIN_LENGTH.USERNAME) {
        errors[field] = `Must be at least ${MIN_LENGTH.USERNAME} characters.`;
      }
      break;

    case "email":
      if (!REGEX.EMAIL.test(trimmed)) {
        errors[field] = "Please enter a valid email address.";
      }
      break;

    case "password":
      if (trimmed.length < MIN_LENGTH.PASSWORD) {
        errors[field] = `Must be at least ${MIN_LENGTH.PASSWORD} characters.`;
      } else if (!REGEX.PASSWORD_SPECIAL_CHAR.test(trimmed)) {
        errors[field] =
          "Must contain at least one special character ($, %, ^, &, *).";
      }
      // Re-validate confirmPassword when password changes
      if (formState.confirmPassword) {
        validateField("confirmPassword", formState.confirmPassword, formState);
      }
      break;

    case "confirmPassword":
      if (trimmed !== formState.password) {
        errors[field] = "Passwords do not match.";
      }
      break;

    case "street":
      if (trimmed.length > MAX_LENGTH.STREET) {
        errors[field] = `Maximum ${MAX_LENGTH.STREET} characters allowed.`;
      }
      break;

    case "suburb":
      if (trimmed.length > MAX_LENGTH.SUBURB) {
        errors[field] = `Maximum ${MAX_LENGTH.SUBURB} characters allowed.`;
      }
      break;

    case "postcode":
      if (!REGEX.NUMERIC_EXACT_4.test(trimmed)) {
        errors[field] = "Postcode must be exactly 4 digits.";
      }
      break;

    case "mobile":
      if (!REGEX.NUMERIC_EXACT_8.test(trimmed)) {
        errors[field] = "Mobile suffix must be exactly 8 digits.";
      }
      break;

    case "dob": {
      const dobDate = new Date(trimmed);
      if (isNaN(dobDate.getTime())) {
        errors[field] = "Please enter a valid date.";
      } else if (calculateAge(trimmed) < 16) {
        errors[field] = "You must be at least 16 years old to apply.";
      }
      break;
    }

    // category: only requires non-empty (handled above)
  }
};

/**
 * Validates all form fields
 * @param {Object} formState - Complete form state
 */
const validateAll = (formState) => {
  // Validate each field except confirmPassword first (to avoid double-trigger from password)
  Object.keys(formState).forEach((field) => {
    if (field !== "confirmPassword") {
      validateField(field, formState[field], formState);
    }
  });
  // Validate confirmPassword last (needs up-to-date password error state)
  validateField("confirmPassword", formState.confirmPassword, formState);
};

/* ==================================================================
   MODAL HELPERS
   ================================================================== */

/**
 * Shows the modal dialog with the given configuration
 */
const showModal = (title, message, variant, errorList = []) => {
  modal.title = title;
  modal.message = message;
  modal.variant = variant;
  modal.errors = errorList;
  modal.visible = true;
};

/**
 * Closes the modal dialog
 */
const closeModal = () => {
  modal.visible = false;
};

/* ==================================================================
   EVENT HANDLERS
   ================================================================== */

/**
 * Toggles terms and conditions visibility
 */
const toggleTerms = () => {
  showTerms.value = !showTerms.value;
};

/**
 * Handles validation events from child components
 * @param {string} field - Field name to validate
 */
const handleValidate = (field) => {
  validateField(field, form[field], form);
};

/**
 * Validates and submits the form
 * @param {Event} event - Submit event
 */
const validateAndSubmit = (event) => {
  // Always prevent default — we control submission via modal flow
  event.preventDefault();

  // Run full validation
  validateAll(form);

  if (hasErrors.value) {
    // Build human-readable error list for the modal
    const errorList = Object.entries(errors).map(
      ([field, msg]) => `${FIELD_LABELS[field] || field}: ${msg}`,
    );
    showModal(
      "Validation Errors",
      "Please fix the following errors before submitting:",
      "error",
      errorList,
    );
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    showModal(
      "Application Submitted",
      "Your application has been validated successfully and is ready for submission.",
      "success",
    );
  }
};
</script>

<style scoped>
/* ==================================================================
   FORM STYLING
   ================================================================== */

.application-form {
  max-width: 100%;
}

.terms-text {
  color: var(--bs-secondary) !important; /* AAA compliance */
  line-height: 1.6;
}
</style>
