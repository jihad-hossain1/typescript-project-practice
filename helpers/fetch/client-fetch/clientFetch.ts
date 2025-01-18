import { isError } from "@/helpers/error-handler/isError";
import { TApiResponse } from "./type";

export const fetchData = async<T> (url: string): Promise<TApiResponse<T>> =>{
   try {
     const res = await fetch(url, { cache: "no-store" });
     const data = await res.json();
     return {
         data: data,
         message: res.statusText,
         status: res.status
     }
   } catch (error) {
     return {
         data: null as any,
         message: isError(error) ? error.message : "Unknown error",
         status: 500
     }
   }
}