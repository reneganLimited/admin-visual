import { FlagIcon, FlagIconCode } from "react-flag-kit";
import { DepositType, TransactionStateEnum } from "../types";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json"; // Load the English locale
import getSymbolFromCurrency from "currency-symbol-map";

const threeMonthsAgo = new Date();
threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
const year = threeMonthsAgo.getFullYear();
const month = String(threeMonthsAgo.getMonth() + 1).padStart(2, "0");
const day = String(threeMonthsAgo.getDate()).padStart(2, "0");
export const threeMonthAgoStartDate = `${year}-${month}-${day}`;

export const getCurrencySymbol = (currencyCode: string): string | null => {
  // Get the currency symbol based on the currency code
  const symbol = getSymbolFromCurrency(currencyCode);
  return symbol || null; // Return null if no symbol is found
};
// Initialize the locale for the library
countries.registerLocale(enLocale);

export const getCountryCode = (countryName: string): string | null => {
  // Convert the full country name to an ISO alpha-2 code
  const countryCode = countries.getAlpha2Code(countryName, "en");
  return countryCode || null; // Return null if the country isn't found
};

export const StateColor = (state: string) => {
  if (!state) {
    return;
  }
  if (
    state.includes("FAILED") ||
    state.includes("DENIED") ||
    state.includes("SUSPENDED") ||
    state.includes("DOCUMENT_FAILED") ||
    state.includes("ADMIN_CLOSED") ||
    state.includes("PAUSED") ||
    state.includes("DISABLED_LOGIN") ||
    state.includes("DELETION_PLANNED") ||
    state.includes("BLOCKED") ||
    state.includes("USD_ACCOUNT_EXPIRED") ||
    state.includes("FLAGGED") ||
    state.includes("REJECTED") ||
    state.includes("rejected") ||
    state.includes("FURTHER_REVIEW")
  ) {
    return "danger";
  } else if (
    state.includes("INVALID") ||
    state.includes("MISMATCH") ||
    state.includes("incomplete") ||
    state.includes("NOT_STARTED") ||
    state.includes("VERIFICATION_STARTED")
  ) {
    return "yellow";
  } else if (
    state.includes("VERIFIED") ||
    state.includes("ACTIVE") ||
    state.includes("active") ||
    state.includes("PASSED") ||
    state.includes("COMPLETED") ||
    state.includes("USD_ACCOUNT_ACTIVE") ||
    state.includes("activated")
  ) {
    return "green";
  } else if (
    state.includes("RETRY") ||
    state.includes("DOCUMENT") ||
    state.includes("FROZEN") ||
    state.includes("IN_TRANSIT") ||
    state.includes("DUPLICATE") ||
    state.includes("REVIEW") ||
    state.includes("PENDING") ||
    state.includes("PROGRESS") ||
    state.includes("BIOMETRIC") ||
    state.includes("MANUAL_REVIEW") ||
    state.includes("manual_review")
  ) {
    return "blue";
  } else {
    return "black";
  }
};

export function convertToUpperCase(str: any) {
  return str?.toUpperCase();
}

export const getTransactionClass = (
  state: TransactionStateEnum,
):
  | "error"
  | "inherit"
  | "grey"
  | "primary"
  | "secondary"
  | "success"
  | "info"
  | "warning" => {
  switch (state) {
    case TransactionStateEnum.PENDING:
    case TransactionStateEnum.KYC_PENDING:
      return "warning"; // Indicates that it's awaiting action

    case TransactionStateEnum.TRANSIT:
      return "info"; // Indicates progress or movement

    case TransactionStateEnum.COMPLETED:
    case TransactionStateEnum.PASSED_REVIEW:
      return "success"; // Indicates success or completion

    case TransactionStateEnum.FAILED:
    case TransactionStateEnum.CANCELLED:
    case TransactionStateEnum.KYC_FAILED:
    case TransactionStateEnum.REJECTED:
    case TransactionStateEnum.FURTHER_REVIEW:
    case TransactionStateEnum.FAILED_REVIEW:
      return "error"; // Indicates failure or rejection

    case TransactionStateEnum.DELAYED:
    case TransactionStateEnum.DAILY_LIMIT_EXCEEDED:
    case TransactionStateEnum.WEEKLY_LIMIT_EXCEEDED:
    case TransactionStateEnum.MONTHLY_LIMIT_EXCEEDED:
      return "grey"; // Indicates a neutral or throttling state

    case TransactionStateEnum.IN_REVIEW:
      return "primary"; // Indicates it's under review

    case TransactionStateEnum.RETURNED:
      return "secondary"; // Indicates a returned state

    case TransactionStateEnum.AMOUNT_TOO_LOW:
      return "inherit"; // Could represent an edge case or unchanged state

    default:
      return "grey"; // Default for unknown or unhandled states
  }
};

export const DepositColor = (type: string) => {
  switch (type) {
    case DepositType.ACH:
      return "bg-green-100 text-green-900";
    case DepositType.SWIFT:
      return "bg-blue-100 text-blue-900";
    case DepositType.WIRE:
      return "bg-red-100 text-red-900";
    case DepositType.ACH_MICRODEPOSIT:
      return "bg-yellow-100 text-yellow-900";
    default:
      return "bg-black-100 text-white-900";
  }
};
export const CountryFlag = ({
  country,
  currency,
  className,
}: {
  country?: string;
  currency?: string;
  className?: string;
}) => {
  let countryCode = null;

  if (country !== undefined && country !== "*") {
    console.log("country", country);
    countryCode = getCountryCode(country);
  } else if (currency) {
    console.log("currency", currency);
    // Assuming you have a mapping of currency to country
    const currencyToCountryMap: { [key: string]: string } = {
      USD: "US",
      EUR: "Germany",
      GBP: "UK",
      NGN: "Nigeria",
      // Add more mappings as needed
    };
    const countryName = currencyToCountryMap[currency];
    countryCode = countryName ? getCountryCode(countryName) : null;
  }

  return (
    <div>
      {countryCode ? (
        <FlagIcon
          className={`${className} mt-1 mr-2`}
          code={countryCode as FlagIconCode}
          size={15}
        />
      ) : (
        <span></span> // Fallback if the country code isn't found
      )}
    </div>
  );
};

export function calculateAge(dateOfBirth: any) {
  const birthDate = new Date(dateOfBirth);
  const currentDate = new Date();

  const age = currentDate.getFullYear() - birthDate.getFullYear();

  // Check if the birthday hasn't occurred this year yet
  if (
    currentDate.getMonth() < birthDate.getMonth() ||
    (currentDate.getMonth() === birthDate.getMonth() &&
      currentDate.getDate() < birthDate.getDate())
  ) {
    return age - 1; // Subtract 1 year if the birthday hasn't occurred yet
  }

  return age;
}

export const truncateUrl = (url: string | undefined, maxLength = 66) => {
  if (!url) {
    return null;
  } else if (url!.length <= maxLength) {
    return url;
  } else {
    const truncatedUrl = url!.substring(0, maxLength) + "...";
    return truncatedUrl;
  }
};

export const ButtonColor = (state: string) => {
  switch (state) {
    case "DOCUMENT_RETRY":
      return "hover:bg-gray-400 bg-black text-white";
    case "DENIED":
      return "bg-danger text-white";
    case "FAILED":
      return "bg-[#E96709] text-white";
    default:
      break;
  }
};

export const getFormattedDate = (daysAgo: number) => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const getSeasonalLogo = () => {
  const currentMonth = new Date().getMonth();
  if (currentMonth === 11) {
    // December
    return require("../assets/santa-icon.png");
  }
  if (currentMonth === 1) {
    // February
    return require("../assets/icon.png");
  } else {
    return require("../assets/icon.png");
  }
};
