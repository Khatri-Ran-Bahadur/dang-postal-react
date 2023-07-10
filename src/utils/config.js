export const API_URL = "https://dang.postalservice.gov.np/";
export const APP_URL = "https://dang.postalservice.gov.np";
export const header = () => {
  // Get token from state

  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  };

  return config;
};

export const APP_NAME = "जिल्ला हुलाक कार्यालय दाङ";
export const FB_ID = "1234facebookid";
