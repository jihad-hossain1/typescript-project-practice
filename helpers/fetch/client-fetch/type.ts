export type TApiResponse<T> = {
    data: T;
    status: number;
    message: string;
};
