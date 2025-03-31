import { parse, format } from "date-fns";
import { toZonedTime } from "date-fns-tz";

export const getDateTime = (date: string | number) => {
  const dateObj = new Date(date);
  const today = new Date();

  // Clear time part from today's date and the given date to ensure accurate day comparison
  today.setHours(0, 0, 0, 0); // Use local time, not UTC
  const dateDiffObj = new Date(date);
  dateDiffObj.setHours(0, 0, 0, 0); // Use local time, not UTC

  // Convert dates to timestamps
  const dateTimestamp = dateDiffObj.getTime();
  const todayTimestamp = today.getTime();

  // Get the difference in days between the given date and today
  const dayDifference = Math.floor((todayTimestamp - dateTimestamp) / (1000 * 60 * 60 * 24));

  const isToday = dayDifference === 0;
  const isYesterday = dayDifference === 1;

  const timeString = dateObj.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  if (isToday) {
    return `Today at ${timeString}`;
  } 
  if (isYesterday) {
    return `Yesterday at ${timeString}`;
  }

  return dateObj.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    timeZoneName: "short" // Optional: displays the time zone abbreviation
  });
};

// export const getDate = (date: string | number) => {
//   const dateObj = new Date(date);
//   dateObj.setUTCHours(0, 0, 0, 0); // Set time to midnight UTC
//   return dateObj.toLocaleDateString("en-US", {
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//     timeZone: "UTC" // Ensure the date is displayed in UTC
//   });
// };

export const getDate = (date: string | number) => {
  // Create a date object from the input
  const parsedDate = new Date(date);

  // Get the year, month, and day from the parsed date as UTC values
  const year = parsedDate.getFullYear();
  const month = parsedDate.getMonth(); // Month is 0-based
  const day = parsedDate.getDate();

  // Create a new Date object in UTC with time stripped
  const utcDate = new Date(Date.UTC(year, month, day));

  // Format the UTC date
  return utcDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
/**
 * Converts date of birth to readable format
 * date of birth must be in the format YYYY-MM-DD
 */
export const formatDob = ({ dateInYYYYMMDD }: { dateInYYYYMMDD: string }) => {
  console.log("Formatting date of birth:", dateInYYYYMMDD);
  try {
    const date = new Date(`${dateInYYYYMMDD}T00:00:00Z`);
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    }).format(date);
  } catch (error) {
    console.error("Error formatting date of birth:", error);
    return dateInYYYYMMDD;
  }
};