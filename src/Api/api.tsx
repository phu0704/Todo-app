export const baseURL = (): string => {
  const baseURL = process.env.REACT_APP_API_URL as string;
  return baseURL + "/";
};
