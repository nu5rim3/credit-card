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

export function otpToString(data: number[]): string {
  return data.join("");
}

export function getFileValidate(fileName: string): boolean {
  const allowedTypes: string[] = ["image/jpeg", "image/png", "application/pdf"];
  const extension = fileName?.split(".").pop()?.toLowerCase();
  const mimeTypes: { [key: string]: string } = {
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    pdf: "application/pdf",
  };
  return extension && allowedTypes.includes(mimeTypes[extension])
    ? true
    : false;
}

export function parseNIC(nic: string): { Gender: string; Birthday: string } {
  function formatDate(date: Date): string {
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }

  if (nic.length === 10) {
    // Older NIC format
    const year = parseInt("19" + nic.slice(0, 2));
    let dayOfYear = parseInt(nic.slice(2, 5));
    const gender = dayOfYear <= 366 ? "Male" : "Female";
    if (gender === "Female") {
      dayOfYear -= 500;
    }
    const birthDate = new Date(year, 0, dayOfYear);
    return {
      Gender: gender,
      Birthday: formatDate(birthDate),
    };
  } else if (nic.length === 12) {
    // Newer NIC format
    const year = parseInt(nic.slice(0, 4));
    let dayOfYear = parseInt(nic.slice(4, 7));
    const gender = dayOfYear <= 366 ? "Male" : "Female";
    if (gender === "Female") {
      dayOfYear -= 500;
    }
    const birthDate = new Date(year, 0, dayOfYear);
    return {
      Gender: gender,
      Birthday: formatDate(birthDate),
    };
  } else {
    return {
      Gender: "",
      Birthday: "",
    };
  }
}
