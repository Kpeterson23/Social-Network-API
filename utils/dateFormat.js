// Function to add the appropriate suffix to a date
const addDateSuffix = (date) => {
  // Special case for dates 11-13
  if (date >= 11 && date <= 13) {
    return `${date}th`;
  }

  // Determine the last digit of the date
  const lastDigit = date % 10;

  // Apply appropriate suffix based on the last digit
  if (lastDigit === 1) {
    return `${date}st`;
  } else if (lastDigit === 2) {
    return `${date}nd`;
  } else if (lastDigit === 3) {
    return `${date}rd`;
  } else {
    return `${date}th`;
  }
};

// Main function to format a timestamp into a user-friendly string
module.exports = (timestamp, { dateSuffix = true } = {}) => {
  // Array of month names
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Create a Date object from the provided timestamp
  const dateObj = new Date(timestamp);

  // Get the formatted month name
  const formattedMonth = months[dateObj.getMonth()];

  // Get the formatted day with or without suffix
  const formattedDay = dateSuffix
    ? addDateSuffix(dateObj.getDate())
    : dateObj.getDate();

  // Get the year
  const formattedYear = dateObj.getFullYear();

  // Convert military time to 12-hour format
  let hour = dateObj.getHours();
  const periodOfDay = hour >= 12 ? "pm" : "am";
  hour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;

  // Get formatted minutes with leading zero
  const minutes = String(dateObj.getMinutes()).padStart(2, "0");

  // Construct the final formatted date and time string
  const formattedTimeStamp = `${formattedMonth} ${formattedDay}, ${formattedYear} at ${hour}:${minutes} ${periodOfDay}`;

  return formattedTimeStamp;
};
