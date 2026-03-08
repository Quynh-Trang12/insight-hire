<template>
  <fieldset class="mb-4 p-4 border rounded bg-light">
    <legend class="visually-hidden">Address and Contact</legend>

    <h3
      class="fw-bold text-primary border-bottom border-primary border-opacity-25 pb-2 mb-3 fs-5"
    >
      Address & Contact
    </h3>

    <div class="row g-3">
      <div class="col-12">
        <label for="street" class="form-label fw-bold small text-dark"
          >Street Address</label
        >
        <input
          type="text"
          id="street"
          name="street"
          v-model="street"
          @input="$emit('validate', 'street')"
          @blur="$emit('validate', 'street')"
          class="form-control form-control-lg fs-6"
          :class="{ 'is-invalid': errors.street }"
          placeholder="Optional (Max 40 characters)"
          maxlength="40"
          autocomplete="street-address"
        />
        <div class="invalid-feedback">{{ errors.street }}</div>
      </div>

      <div class="col-md-4">
        <label for="suburb" class="form-label fw-bold small text-dark"
          >Suburb</label
        >
        <input
          type="text"
          id="suburb"
          name="suburb"
          v-model="suburb"
          @input="$emit('validate', 'suburb')"
          @blur="$emit('validate', 'suburb')"
          class="form-control form-control-lg fs-6"
          :class="{ 'is-invalid': errors.suburb }"
          placeholder="Optional (Max 20 chars)"
          maxlength="20"
          autocomplete="address-level2"
        />
        <div class="invalid-feedback">{{ errors.suburb }}</div>
      </div>

      <div class="col-md-4">
        <label for="postcode" class="form-label fw-bold small text-dark"
          >Postcode *</label
        >
        <input
          type="text"
          id="postcode"
          name="postcode"
          v-model="postcode"
          @input="$emit('validate', 'postcode')"
          @blur="$emit('validate', 'postcode')"
          class="form-control form-control-lg fs-6"
          :class="{ 'is-invalid': errors.postcode }"
          placeholder="e.g., 3000"
          maxlength="4"
          autocomplete="postal-code"
          aria-required="true"
        />
        <div class="invalid-feedback">{{ errors.postcode }}</div>
      </div>

      <div class="col-md-4">
        <label for="mobile_visible" class="form-label fw-bold small text-dark">
          Mobile Number *
        </label>

        <!-- Hidden field for form submission (includes 04 prefix) -->
        <input type="hidden" name="mobile" :value="'04' + (mobile || '')" />

        <div class="input-group input-group-lg has-validation">
          <span
            class="input-group-text bg-white fw-bold fs-6 border-end-0"
            :class="errors.mobile ? 'border-danger text-danger' : 'text-dark'"
            id="mobile-prefix"
          >
            04
          </span>
          <input
            type="text"
            id="mobile_visible"
            v-maska
            data-maska="## ### ###"
            :value="mobile"
            @maska="onMaska"
            @blur="$emit('validate', 'mobile')"
            class="form-control fs-6 border-start-0"
            :class="{ 'is-invalid': errors.mobile }"
            placeholder="12 345 678"
            aria-describedby="mobile-prefix"
            aria-required="true"
            autocomplete="tel-national"
          />
          <div class="invalid-feedback">{{ errors.mobile }}</div>
        </div>
      </div>
    </div>
  </fieldset>
</template>

<script setup>
/**
 * @file FieldsetAddress.vue
 * @description Address and contact fieldset (presentational component)
 *
 * Props:
 * - street (v-model): String
 * - suburb (v-model): String
 * - postcode (v-model): String
 * - mobile (v-model): String (8 digits, 04 prefix hidden)
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
 * - Mobile prefix clearly associated with input
 */

import { vMaska } from "maska/vue";

const street = defineModel("street");
const suburb = defineModel("suburb");
const postcode = defineModel("postcode");
const mobile = defineModel("mobile");

defineProps({ errors: { type: Object, required: true } });
const emit = defineEmits(["validate"]);

const onMaska = (event) => {
  if (mobile.value !== event.detail.unmasked) {
    // Only update if mobile.value actually changed.
    mobile.value = event.detail.unmasked;
  }
};
</script>
