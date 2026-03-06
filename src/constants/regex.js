/**
 * @file regex.js
 * @description Centralized regular expressions and validation constants
 *
 * These patterns ensure consistent validation across the application form.
 * All patterns are tested and documented with examples.
 */

export const REGEX = {
  /**
   * Letters only (A-Z, a-z)
   * Used for: First name, Last name
   * Examples: "John", "Mary" ✓ | "John123", "Mary-Ann" ✗
   */
  ALPHA_ONLY: /^[A-Za-z]+$/,

  /**
   * Standard email validation
   * Used for: Email address
   * Examples: "user@example.com" ✓ | "invalid@", "@invalid.com" ✗
   */
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

  /**
   * Contains at least one special character from: $ % ^ & *
   * Used for: Password validation
   * Examples: "Pass$123", "abc%def" ✓ | "Password123" ✗
   */
  PASSWORD_SPECIAL_CHAR: /[$%^&*]/,

  /**
   * Exactly 4 numeric digits
   * Used for: Postcode (must accommodate postcodes starting with 0)
   * Examples: "3000", "0800" ✓ | "300", "30000", "3A00" ✗
   */
  NUMERIC_EXACT_4: /^\d{4}$/,

  /**
   * Exactly 8 numeric digits
   * Used for: Mobile number suffix (after 04 prefix)
   * Examples: "12345678", "98765432" ✓ | "1234567", "123456789" ✗
   */
  NUMERIC_EXACT_8: /^\d{8}$/,
};

/* ==================================================================
   VALIDATION LENGTH CONSTANTS
   ================================================================== */

/**
 * Minimum length requirements for form fields
 */
export const MIN_LENGTH = {
  /** Username: minimum 3 characters */
  USERNAME: 3,
  /** Password: minimum 8 characters */
  PASSWORD: 8,
};

/**
 * Maximum length requirements for form fields
 */
export const MAX_LENGTH = {
  /** Street address: maximum 40 characters */
  STREET: 40,
  /** Suburb: maximum 20 characters */
  SUBURB: 20,
};

/**
 * Set of fields that are optional (not required)
 */
export const OPTIONAL_FIELDS = new Set(["street", "suburb"]);
