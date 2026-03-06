<template>
  <form
    method="post"
    action="http://mercury.swin.edu.au/it000000/formtest.php"
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
      <button type="button" class="btn btn-outline-secondary btn-sm" @click="toggleTerms">
        {{ showTerms ? 'Hide' : 'View' }} Terms and Conditions
      </button>
      <div v-show="showTerms" class="terms-text p-3 bg-light border rounded small text-dark mt-2">
        By submitting this application, you agree that all information provided is accurate and true
        to the best of your knowledge.
      </div>
    </div>

    <div class="d-flex align-items-center gap-3 mt-4 flex-wrap">
      <button type="submit" class="btn btn-primary px-5 py-2 fw-bold shadow-sm">
        Submit Application
      </button>
      <span v-if="hasSubmissionAttempted && hasErrors" class="text-danger fw-bold">
        Please fix the highlighted errors above.
      </span>
      <span v-if="isSuccess" class="text-success fw-bold">
        Application validated successfully!
      </span>
    </div>
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
 * 
 * Validation Strategy:
 * - Field-level validation on blur/input
 * - Form-level validation on submit
 * - Regex patterns from centralized constants
 * - Real-time error feedback
 */

import { reactive, ref, computed } from 'vue'
import FieldsetPersonal from './FieldsetPersonal.vue'
import FieldsetAccount from './FieldsetAccount.vue'
import FieldsetAddress from './FieldsetAddress.vue'
import FieldsetPreferences from './FieldsetPreferences.vue'
import { REGEX } from '../../constants/regex.js'

/* ==================================================================
   STATE MANAGEMENT
   ================================================================== */

const form = reactive({
  firstName: '',
  lastName: '',
  dob: '',
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  street: '',
  suburb: '',
  postcode: '',
  mobile: '',
  category: '',
})

const errors = reactive({})
const showTerms = ref(false)
const hasSubmissionAttempted = ref(false)
const isSuccess = ref(false)

const hasErrors = computed(() => Object.keys(errors).length > 0)


/* ==================================================================
   VALIDATION FUNCTIONS
   ================================================================== */

/**
 * Validates a single form field
 * @param {string} field - Field name to validate
 * @param {any} value - Current field value
 * @param {Object} formState - Complete form state (for cross-field validation)
 */
const validateField = (field, value, formState) => {
  // Clear existing error for this field
  delete errors[field]

  // Required field check
  if (!value || (typeof value === 'string' && !value.trim())) {
    errors[field] = 'This field is required.'
    return
  }

  // Field-specific validation
  switch (field) {
    case 'firstName':
    case 'lastName':
      if (!REGEX.ALPHA_ONLY.test(value)) {
        errors[field] = 'Must contain letters only.'
      }
      break

    case 'email':
      if (!REGEX.EMAIL.test(value)) {
        errors[field] = 'Please enter a valid email address.'
      }
      break

    case 'password':
      if (!REGEX.PASSWORD_SPECIAL_CHAR.test(value)) {
        errors[field] = 'Must contain at least one special character ($%^&*).'
      }
      break

    case 'confirmPassword':
      if (value !== formState.password) {
        errors[field] = 'Passwords do not match.'
      }
      break

    case 'postcode':
      if (!REGEX.NUMERIC_EXACT_4.test(value)) {
        errors[field] = 'Postcode must be exactly 4 digits.'
      }
      break

    case 'mobile':
      if (!REGEX.NUMERIC_EXACT_8.test(value)) {
        errors[field] = 'Mobile suffix must be exactly 8 digits.'
      }
      break
  }
}

/**
 * Validates all form fields
 * @param {Object} formState - Complete form state
 */
const validateAll = (formState) => {
  Object.keys(formState).forEach((field) => {
    validateField(field, formState[field], formState)
  })
}


/* ==================================================================
   EVENT HANDLERS
   ================================================================== */

/**
 * Toggles terms and conditions visibility
 */
const toggleTerms = () => {
  showTerms.value = !showTerms.value
}

/**
 * Handles validation events from child components
 * @param {string} field - Field name to validate
 */
const handleValidate = (field) => {
  validateField(field, form[field], form)
}

/**
 * Validates and submits the form
 * @param {Event} event - Submit event
 */
const validateAndSubmit = (event) => {
  hasSubmissionAttempted.value = true
  isSuccess.value = false

  // Run full validation
  validateAll(form)

  if (hasErrors.value) {
    event.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } else {
    // Prevent default for local testing (remove for production)
    event.preventDefault()
    isSuccess.value = true
    console.log('Form validated successfully!', form)
    alert('Success! Form is ready for submission.')
  }
}
</script>

<style scoped>
/* ==================================================================
   FORM STYLING
   ================================================================== */

.application-form {
  max-width: 100%;
}

.terms-text {
  color: #000000 !important; /* AAA compliance */
  line-height: 1.6;
}


/* ==================================================================
   SUCCESS/ERROR MESSAGES
   ================================================================== */

.text-success {
  color: #198754 !important; /* Bootstrap success with AAA contrast */
}

.text-danger {
  color: #a71d2a !important; /* AAA-compliant danger color */
}
</style>
