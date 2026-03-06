/**
 * @file regex.js
 * @description Centralized regular expressions for data validation
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
   * Used for: Postcode
   * Examples: "3000", "2000" ✓ | "300", "30000", "3A00" ✗
   */
  NUMERIC_EXACT_4: /^\d{4}$/,

  /**
   * Exactly 8 numeric digits
   * Used for: Mobile number suffix (after 04 prefix)
   * Examples: "12345678", "98765432" ✓ | "1234567", "123456789" ✗
   */
  NUMERIC_EXACT_8: /^\d{8}$/,
}
