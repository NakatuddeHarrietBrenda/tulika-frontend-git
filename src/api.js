const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://127.0.0.1:5000"
    : "https://nyumbaniconstruct.com/api.tulikatoursandtravels.com";

export const apiFetch = (url, options = {}) => {
  const token = localStorage.getItem("token");

  return fetch(BASE_URL + url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
      ...options.headers,
    },
  });
};