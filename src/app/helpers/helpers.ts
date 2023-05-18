export const verifyBearerToken = (token: string): boolean => {
  if (!token) return false;
  // Token is passed as Bearer MjAyMzA1MTU3 where the token is in format YYYYMMDDN where N is a control number divisible by 7
  token = token.split(" ")[1];

  // Today = 20230515
  const today = new Date().toISOString().substring(0, 10).replaceAll("-", "");

  // Token passed in base64 encoding, decoded to ascii
  const buffer = Buffer.from(token, "base64");
  const decodedToken = buffer.toString("ascii");

  // Compare today's date with date in token
  const isDateValid = today === decodedToken.slice(0, 8);

  // Parse control number from token
  const controlNum = parseInt(decodedToken.slice(8));

  // Check if control number is divisible by 7
  const isControlNumValid = !isNaN(controlNum) && controlNum % 7 === 0;

  return isDateValid && isControlNumValid;
};

export const verifyToken = (token: string): boolean => {
  if (!token) return false;
  // Token is passed in format YYYYMMDDN where N is a control number divisible by 7

  // Today = 20230515
  const today = new Date().toISOString().substring(0, 10).replaceAll("-", "");

  // Compare today's date with date in token
  const isDateValid = today === token.slice(0, 8);

  // Parse control number from token
  const controlNum = parseInt(token.slice(8));

  // Check if control number is divisible by 7
  const isControlNumValid = !isNaN(controlNum) && controlNum % 7 === 0;

  return isDateValid && isControlNumValid;
};

export const toBase64 = (token: string): string =>
  Buffer.from(token).toString("base64").replaceAll("=", "");

export const timeDist = (date: string): string => {
  let isInPast;
  let totalMilisDiffFloat = new Date().getTime() - new Date(date).getTime();

  // Check if the passed date is in the past or future
  if (totalMilisDiffFloat > 0) {
    isInPast = true;
  } else {
    isInPast = false;
    totalMilisDiffFloat = totalMilisDiffFloat * -1;
  }

  const totalSecondsDiffFloat = totalMilisDiffFloat / 1000;
  const totalMinutesDiffFloat = totalSecondsDiffFloat / 60;
  const totalHoursDiffFloat = totalMinutesDiffFloat / 60;

  const hoursDiffInt = Math.floor(totalHoursDiffFloat);

  const minutesDiffFloat = totalHoursDiffFloat - hoursDiffInt;
  const minutesDiffInt = Math.floor(minutesDiffFloat * 60);

  if (isInPast) {
    // TODO: rewrite to Switch statement?
    // Time ago
    if (hoursDiffInt > 0 && minutesDiffInt > 0) {
      return `${hoursDiffInt}h ${minutesDiffInt} min ago`;
    } else if (hoursDiffInt > 0 && minutesDiffInt === 0) {
      return `${hoursDiffInt}h ago`;
    } else if (minutesDiffInt > 0) {
      return `${minutesDiffInt} min ago`;
    } else {
      return "Now";
    }
  } else {
    // Time in the future
    if (hoursDiffInt > 0 && minutesDiffInt > 0) {
      return `in ${hoursDiffInt}h ${minutesDiffInt} min`;
    } else if (hoursDiffInt > 0 && minutesDiffInt === 0) {
      return `in ${hoursDiffInt}h`;
    } else if (minutesDiffInt > 0) {
      return `in ${minutesDiffInt} min`;
    } else {
      return "Now";
    }
  }
};

export const timeInHandMin = (date: string): string => {
  const time = new Date(date);
  return `${time.getHours()}:${time.getMinutes()}`;
};
