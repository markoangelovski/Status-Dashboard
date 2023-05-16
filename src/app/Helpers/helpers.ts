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
