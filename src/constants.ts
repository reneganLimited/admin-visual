/* eslint-disable @typescript-eslint/no-non-null-assertion */
export const joinFullName = (fullName: {
  FirstName: string;
  MiddleName?: string;
  LastName: string;
}) => `${fullName.FirstName} ${fullName.MiddleName || ""} ${fullName.LastName}`;

export const getDateTime = (date: string | number) => {
  const dateObj = new Date(date);
  const day = dateObj.getDate();
  const today = new Date();
  const currentDate = today.getDate();
  const currentMonthandYear = today
    .toLocaleDateString()
    .split("/")
    .slice(1)
    .join("/");
  const monthandYear = dateObj
    .toLocaleDateString()
    .split("/")
    .slice(1)
    .join("/");

  if (day === currentDate && currentMonthandYear === monthandYear) {
    return dateObj.toLocaleTimeString();
  }
  if (day === currentDate - 1 && currentMonthandYear === monthandYear) {
    return "Yesterday";
  }
  return dateObj.toLocaleDateString();
}



export const getAddress = (address: {
  StreetAddress?: string;
  SecondStreetAddress?: string;
  City?: string;
  Country?: string;
  Zipcode?: string;
  LGA?: string;
  StateOrTerritory?: string;
}) => {
  const streetAddress = address.StreetAddress
    ? `${address.StreetAddress},`
    : "";
  const secondStreetAddress = address.SecondStreetAddress
    ? `${address.SecondStreetAddress},`
    : "";
  const city = address.City ? `${address.City},` : "";
  const lga = address.LGA ? `${address.LGA},` : "";
  const zipcode = address.Zipcode ? `${address.Zipcode},` : "";
  const country = address.Country ? `${address.Country}` : "";
  const stateOrTerritory = address.StateOrTerritory
    ? `${address.StateOrTerritory},`
    : "";
  return `${streetAddress} ${secondStreetAddress} ${lga} ${zipcode} ${city} ${stateOrTerritory} ${country}`;
};

export const AWS_CREDS = {
  ADMIN_API_URL: process.env.REACT_APP_INTERNAL_APIGATEWAY_URL!,
  USER_API_URL: process.env.REACT_APP_APIGATEWAY_URL!,
  ADMIN_API_URL_V4: process.env.REACT_APP_INTERNAL_APIGATEWAY_URL_V4!,
  ADMIN_API_URL_V2: process.env.REACT_APP_INTERNAL_APIGATEWAY_URL_V2!
};

export const MAX_TRANSACTIONS_LIMIT = 500;
export const MAX_KYC_RESULT = 100;

export const DenyReasons = [
  "ID looks tampered or fake",
  "Flagged based on location",
  "Flagged based on user's email",
  "Flagged based on ID and images",
  "User too young",
  "User is older but information doesn't quite fit",
  "Generally a suspicious account",
  "Duplicate user"
]

export const FailedReasons = [
  "Missing a selfie. Please upload a clear photo of your face",
  "Images are blurry",
  "Document not accepted. Must be a Passport, NIN, Driver's License, or Voter's Card",
  "Document is expired",
  "Information on the document does not match what is on your BVN",
  "Document is a temporary ID, which is not accepted",
  "The details you entered don't match what is on your BVN. Please contact your bank to update your BVN.",
  "The date of birth on your document doesn't match what is on your BVN"
]


export const RetryReasons = [
  "Missing a selfie. Please upload a clear photo of your face",
  "Missing a picture of your document",
  "Images are blurry",
  "Document not accepted. Must be a Passport, NIN, Driver's License, or Voter's Card",
  "Document is expired",
  "Information on the document does not match what is on your BVN",
  "Document is a temporary ID, which is not accepted",
  "The details you entered don't match what is on your BVN. Please contact your bank to update your BVN.",
  "The date of birth on your document doesn't match what is on your BVN"
]

export const getPreconditionCheckMessage = (checks: Record<string, boolean>): string[] => {
  const messages: Record<string, string> = {
    hasPassedBVN: "The user has not passed BVN verification",
    isBadEmail: "The user's email is flagged as bad",
    isBlackListedAddress: "The user's address is blacklisted",
    isNotActive: "The user's account is not active",
    hasDuplicate: "Other accounts with similar facial features found (duplicates).",
    hasEmptyState: "The user's StateOrTerritory is missing from address",
  };

  return Object.entries(checks)
    .filter(([key, value]) => key === 'hasPassedBVN' ? !value : value)
    .map(([key]) => messages[key] || "Unknown check failed")
    .filter(message => message !== "KycFlagged");
};

export const getAutoVerifyCheckDetails = (checks: Record<string, boolean>): string[] => {
  const checkMessages: Record<string, string> = {
    duplicateImagesFound: "Other accounts with similar facial features found (duplicates).",
    nameMatched: "Name on ID does not match name on BVN",
    selfieMatchesID: "Selfie does not match BVN Image",
    imagePassedQualityCheck: "Image failed quality check",
    requiresManualReview: "Requires manual review",
    isBlackListedAddress: "Blacklisted address detected",
    idIsValidAndNotExpired: "ID is invalid or expired",
    hasEmptyState: "StateOrTerritory is missing from address",
  };

  return Object.entries(checks)
    .filter(([key, value]) => {
      if (key === 'duplicateImagesFound' || key === 'isBlackListedAddress') {
        return value; 
      }
      return !value && key !== 'autoVerifyButNeedsPolicy' && key !== 'autoVerifyWithDefaultPolicy' && key !== 'requiresManualReview' && key !== 'KycFlagged';
    })
    .map(([key]) => {
      return checkMessages[key] || `${key.charAt(0).toUpperCase() + key.slice(1)}: Failed`;
    })
    .filter((message): message is string => message !== null && message !== "KycFlagged: Failed"); 
};

