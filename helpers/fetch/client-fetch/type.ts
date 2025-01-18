export type TApiResponse<T> = {
    data: T;
    status: number;
    message: string;
};

export type TDynamicApiResponse<T> = {
    data: T | null;
    status: number;
    message: string;
    isError: boolean;
  };