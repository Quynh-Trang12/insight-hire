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
        <input
          type="password"
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
        <div id="password-help" class="form-text text-dark">
          Must contain at least one of: $ % ^ & *
        </div>
        <div class="invalid-feedback">{{ errors.password }}</div>
      </div>

      <div class="col-md-6">
        <label
          for="confirm_password"
          class="form-label fw-bold small text-dark"
        >
          Confirm Password *
        </label>
        <input
          type="password"
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
        <div class="invalid-feedback">{{ errors.confirmPassword }}</div>
      </div>
    </div>
  </fieldset>
</template>

<script setup>
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
</script>

<style scoped>
.form-text {
  font-size: 0.875rem;
}
</style>
