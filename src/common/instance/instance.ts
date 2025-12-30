import axios from "axios";

const isGitHubPages = window.location.hostname.includes("github.io");

const getBaseURL = () => {
  if (isGitHubPages) {
    const apiUrl = "https://social-network.samuraijs.com/api/1.1/";
    const apiKey = import.meta.env.VITE_API_KEY || "ваш-api-ключ";

    return `https://api.allorigins.win/get?url=${encodeURIComponent(apiUrl + `?API-KEY=${apiKey}`)}`;
  }

  return import.meta.env.VITE_BASE_URL || "https://social-network.samuraijs.com/api/1.1/";
};

export const instance = axios.create({
  baseURL: getBaseURL(),

  headers: !isGitHubPages
    ? {
        "API-KEY": import.meta.env.VITE_API_KEY || "",
        Authorization: import.meta.env.VITE_AUTH_TOKEN ? `Bearer ${import.meta.env.VITE_AUTH_TOKEN}` : undefined,
      }
    : undefined,

  withCredentials: !isGitHubPages,
});