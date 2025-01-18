import { isError } from "@/helpers/error-handler/isError";
import { TDynamicApiResponse } from "./type";
  
  /**
   * Type Guard for object
   * @param data 
   * @returns 
   */
  function isObject(data: unknown): data is Record<string, unknown> {
    return typeof data === "object" && data !== null && !Array.isArray(data);
  }
  
  /**
   * Type Guard for array
   * @param data 
   * @returns 
   */
  function isArray(data: unknown): data is unknown[] {
    return Array.isArray(data);
  }
  
  /**
   * Type Guard for primitive types
   * @param data 
   * @returns 
   */
  function isPrimitive(data: unknown): data is string | number | boolean {
    return ["string", "number", "boolean"].includes(typeof data);
  }
  
  /**
   * Universal fetchData with type guard handling
   * 
   * @param url as string of api endpoint
   * @returns Promise<TDynamicApiResponse<T>> 
   *  
   * */
 export const dynamicFetchData = async <T>(url: string): Promise<TDynamicApiResponse<T>> => {
    try {
      const res = await fetch(url, { cache: "no-store" });
  
      if (!res.ok) {
        return {
          data: null,
          message: `Error: ${res.status} ${res.statusText}`,
          status: res.status,
          isError: true,
        };
      }
  
      const data = await res.json();
  
      // Handle different data types dynamically
      if (
        isArray(data) ||
        isObject(data) ||
        isPrimitive(data)
      ) {
        return {
          data: data as T,
          message: "Data fetched successfully.",
          status: res.status,
          isError: false,
        };
      }
  
      return {
        data: null,
        message: "Invalid data format.",
        status: res.status,
        isError: true,
      };
    } catch (error) {
      return {
        data: null,
        message: isError(error) ? error.message : "Unknown error",
        status: 500,
        isError: true,
      };
    }
  };