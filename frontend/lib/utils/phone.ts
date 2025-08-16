/**
 * Clean mobile number by removing spaces only (preserves + sign and other characters)
 * @param mobileNumber - The mobile number to clean
 * @returns Cleaned mobile number without spaces but with + sign preserved
 */
export function cleanMobileNumber(mobileNumber: string): string {
  return mobileNumber.replace(/\s/g, "");
}

/**
 * Format mobile number for display (optional utility for future use)
 * @param mobileNumber - The mobile number to format
 * @returns Formatted mobile number
 */
export function formatMobileNumber(mobileNumber: string): string {
  // Remove all non-digit characters first
  const cleaned = mobileNumber.replace(/\D/g, "");

  // Format as needed (this is just an example format)
  if (cleaned.startsWith("63")) {
    // Philippine format: +63 9XX XXX XXXX
    return `+${cleaned.slice(0, 2)} ${cleaned.slice(2, 5)} ${cleaned.slice(
      5,
      8
    )} ${cleaned.slice(8)}`;
  }

  return mobileNumber; // Return original if format is unknown
}
