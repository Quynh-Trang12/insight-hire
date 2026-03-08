<template>
  <fieldset class="mb-4 p-4 border rounded bg-light">
    <legend class="visually-hidden">Account Details</legend>

    <h3
      class="fw-bold text-primary border-bottom border-primary border-opacity-25 pb-2 mb-3 fs-5"
    >
      Account Details
    </h3>

    <div class="row g-3">
      <div class="col-md-6">
        <label for="username" class="form-label fw-bold small text-dark"
          >Username *</label
        >
        <input
          type="text"
          id="username"
          name="username"
          v-model="username"
          @blur="$emit('validate', 'username')"
          class="form-control form-control-lg fs-6"
          :class="{ 'is-invalid': errors.username }"
          placeholder="Choose a username"
          autocomplete="username"
          aria-required="true"
        />
        <div class="invalid-feedback">{{ errors.username }}</div>
      </div>

      <div class="col-md-6">
        <label for="email" class="form-label fw-bold small text-dark"
          >Email Address *</label
        >
        <input
          type="email"
          id="email"
          name="email"
          v-model="email"
          @blur="$emit('validate', 'email')"
          class="form-control form-control-lg fs-6"
          :class="{ 'is-invalid': errors.email }"
          placeholder="name@example.com"
          autocomplete="email"
          aria-required="true"
        />
        <div class="invalid-feedback">{{ errors.email }}</div>
      </div>

      <div class="col-md-6">
        <label for="password" class="form-label fw-bold small text-dark"
          >Password *</label
        >
        <div class="input-group">
          <input
            :type="showPassword ? 'text' : 'password'"
            id="password"
            name="password"
            v-model="password"
            @blur="$emit('validate', 'password')"
            @input="$emit('validate', 'password')"
            class="form-control form-control-lg fs-6"
            :class="{ 'is-invalid': errors.password }"
            placeholder="Min 8 chars, incl. 1 special ($, %, ^, &, *)"
            autocomplete="new-password"
            aria-required="true"
            aria-describedby="password-help"
          />
          <button
            type="button"
            class="btn rounded-end password-toggle-btn"
            @click="showPassword = !showPassword"
            @mousedown.prevent
            :aria-label="showPassword ? 'Hide password' : 'Show password'"
            tabindex="-1"
          >
            <svg
              v-if="!showPassword"
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 16 16"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"
              />
              <path
                d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"
              />
            </svg>
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 16 16"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"
              />
              <path
                d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299l.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"
              />
              <path
                d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884l-12-12 .708-.708 12 12-.708.708z"
              />
            </svg>
          </button>
          <div class="invalid-feedback">{{ errors.password }}</div>
        </div>
        <div id="password-help" class="form-text text-dark">
          Must contain at least one of: $ % ^ & *
        </div>
      </div>

      <div class="col-md-6">
        <label
          for="confirm_password"
          class="form-label fw-bold small text-dark"
        >
          Confirm Password *
        </label>
        <div class="input-group">
          <input
            :type="showConfirmPassword ? 'text' : 'password'"
            id="confirm_password"
            name="confirm_password"
            v-model="confirmPassword"
            @input="$emit('validate', 'confirmPassword')"
            class="form-control form-control-lg fs-6"
            :class="{ 'is-invalid': errors.confirmPassword }"
            placeholder="Re-enter password"
            autocomplete="new-password"
            aria-required="true"
          />
          <button
            type="button"
            class="btn rounded-end password-toggle-btn"
            @click="showConfirmPassword = !showConfirmPassword"
            @mousedown.prevent
            :aria-label="
              showConfirmPassword
                ? 'Hide confirm password'
                : 'Show confirm password'
            "
            tabindex="-1"
          >
            <!-- Eye icon (visible when password is hidden) -->
            <svg
              v-if="!showConfirmPassword"
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 16 16"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"
              />
              <path
                d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"
              />
            </svg>
            <!-- Eye-slash icon (visible when password is shown) -->
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 16 16"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"
              />
              <path
                d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299l.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"
              />
              <path
                d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884l-12-12 .708-.708 12 12-.708.708z"
              />
            </svg>
          </button>
          <div class="invalid-feedback">{{ errors.confirmPassword }}</div>
        </div>
      </div>
    </div>
  </fieldset>
</template>

<script setup>
import { ref } from "vue";

/**
 * @file FieldsetAccount.vue
 * @description Account details fieldset (presentational component)
 *
 * Props:
 * - username (v-model): String
 * - email (v-model): String
 * - password (v-model): String
 * - confirmPassword (v-model): String
 * - errors: Object with error messages
 *
 * Emits:
 * - validate: Field name to validate
 *
 * Accessibility:
 * - h4 heading for proper hierarchy
 * - Explicit labels for all inputs
 * - Autocomplete attributes
 * - ARIA required and describedby attributes
 * - Password help text
 */

const username = defineModel("username");
const email = defineModel("email");
const password = defineModel("password");
const confirmPassword = defineModel("confirmPassword");

defineProps({ errors: { type: Object, required: true } });
defineEmits(["validate"]);

const showPassword = ref(false);
const showConfirmPassword = ref(false);
</script>

<style scoped>
.form-text {
  font-size: 0.875rem;
}

.password-toggle-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.375rem 0.75rem;
  border-color: var(--bs-border-color);
  background-color: var(--bs-white);
  transition:
    background-color 0.15s ease-in-out,
    color 0.15s ease-in-out;
}
</style>
