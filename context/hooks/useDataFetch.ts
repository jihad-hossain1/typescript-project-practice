import { dynamicFetchData } from "@/helpers/fetch/client-fetch/dynamicFetch";
import React from "react";

const useDataFetch = <T>({ url }: { url: string }) => {
    const [loading, setLoading] = React.useState<boolean>(true);
    const [error, setError] = React.useState<string | null>(null);
    const [data, setData] = React.useState<T | null>(null);

    const dataFeting = React.useCallback(async () => {
        setLoading(true);
        setError(null);
        setData(null);

        const response = await dynamicFetchData<T>(url);

        setLoading(false);

        if (response.data) {
            setData(response.data);
        } else {
            setError(response.message);
        }
    }, [url]);

    React.useEffect(() => {
        dataFeting();
    }, [dataFeting]);

    return { loading, error, data };
};

export default useDataFetch;
