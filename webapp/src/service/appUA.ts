export const getAppUA = () => {
  return navigator.userAgent;
};

export const isAppUA = () => {
  return getAppUA().includes("Desynk");
};

export const AppVersion = () => {
  return getAppUA().match(/DesynkApp\/([0-9.]+)/)?.[1] || "0.0.0";
};

export const getPlatform = () => {
  const ua = getAppUA();

  if (ua.includes("Android")) return "Android";
  if (ua.includes("iPhone") || ua.includes("iPad")) return "iOS";

  return "Unknown";
};
