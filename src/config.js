export const config = {
  API_URL: window?.__env__?.API_URL || "localhost/api",
  APP_STAGE: window?.__env__?.APP_STAGE || "dev",
};
