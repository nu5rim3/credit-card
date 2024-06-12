export function maskPhoneNumber(phoneNumber: string): string {
  // Validate the input to ensure it's in the correct format

  const phoneRegex = /^(?:\+\d{1,3}\d{10}|[0-9]{10})$/;
  if (!phoneNumber.match(phoneRegex)) {
    throw new Error("Invalid phone number format");
  }

  // Replace all but the last three digits with 'X'
  const maskedPart = phoneNumber.slice(0, -3).replace(/\d/g, "X");
  const visiblePart = phoneNumber.slice(-3);

  return maskedPart + visiblePart;
}
