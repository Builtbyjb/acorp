import { useCallback } from "react";
import type { FetchInstance } from "@/lib/types";
import { loadRefreshToken, getMobileHeaders } from "@shared/mobile";

const API_URL = import.meta.env.VITE_API_URL ?? "";
const RETRY_INTERVAL = 2000;

export function useFetch(): FetchInstance {
  const doGET = useCallback(async (url: string): Promise<Response | Error> => {
    let maxRetries = 3;
    while (maxRetries > 0) {
      try {
        await loadRefreshToken();
        return await fetch(`${API_URL}${url}`, {
          method: "GET",
          credentials: "include",
          headers: getMobileHeaders(),
        });
      } catch (error) {
        console.error(error);
        maxRetries -= 1;
        if (maxRetries > 0) {
          await new Promise((resolve) => setTimeout(resolve, RETRY_INTERVAL));
        }
      }
    }
    return new Error("Request failed due to a network error");
  }, []);

  const doPOST = useCallback(async (url: string, data: unknown): Promise<Response | Error> => {
    let maxRetries = 3;
    const isFormData = data instanceof FormData;

    while (maxRetries > 0) {
      try {
        await loadRefreshToken();
        return await fetch(`${API_URL}${url}`, {
          method: "POST",
          credentials: "include",
          headers: isFormData
            ? getMobileHeaders()
            : { "Content-Type": "application/json", ...getMobileHeaders() },
          body: isFormData ? data : JSON.stringify(data),
        });
      } catch (error) {
        console.error(error);
        maxRetries -= 1;
        if (maxRetries > 0) {
          await new Promise((resolve) => setTimeout(resolve, RETRY_INTERVAL));
        }
      }
    }
    return new Error("Request failed due to a network error");
  }, []);

  const doPUT = useCallback(async (url: string, data: unknown): Promise<Response | Error> => {
    let maxRetries = 3;
    const isFormData = data instanceof FormData;

    while (maxRetries > 0) {
      try {
        await loadRefreshToken();
        return await fetch(`${API_URL}${url}`, {
          method: "PUT",
          credentials: "include",
          headers: isFormData
            ? getMobileHeaders()
            : { "Content-Type": "application/json", ...getMobileHeaders() },
          body: isFormData ? data : JSON.stringify(data),
        });
      } catch (error) {
        console.error(error);
        maxRetries -= 1;
        if (maxRetries > 0) {
          await new Promise((resolve) => setTimeout(resolve, RETRY_INTERVAL));
        }
      }
    }
    return new Error("Request failed due to a network error");
  }, []);

  const doDELETE = useCallback(async (url: string): Promise<Response | Error> => {
    let maxRetries = 3;
    while (maxRetries > 0) {
      try {
        await loadRefreshToken();
        return await fetch(`${API_URL}${url}`, {
          method: "DELETE",
          credentials: "include",
          headers: getMobileHeaders(),
        });
      } catch (error) {
        console.error(error);
        maxRetries -= 1;
        if (maxRetries > 0) {
          await new Promise((resolve) => setTimeout(resolve, RETRY_INTERVAL));
        }
      }
    }
    return new Error("Request failed due to a network error");
  }, []);

  return { doGET, doPOST, doPUT, doDELETE };
}
