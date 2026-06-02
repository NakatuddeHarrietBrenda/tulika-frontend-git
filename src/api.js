const BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:5000";

export const apiFetch = (url, options = {}) => {
  const token = localStorage.getItem("token");

  return fetch(BASE_URL + url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options.headers
    }
  });
};