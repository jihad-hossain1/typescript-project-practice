import { dynamicFetchData } from "@/helpers/fetch/client-fetch/dynamicFetch";
import React from "react";

const useDataFetchDepend = <T>({
    url,
    dependencies = [],
    shouldDepend = true,
    queryParams = {},
}: {
    url: string;
    dependencies?: string[];
    shouldDepend?: boolean;
    queryParams?: Record<string, string>;
}) => {
    const dep = dependencies.join(",");
    const [loading, setLoading] = React.useState<boolean>(true);
    const [error, setError] = React.useState<string | null>(null);
    const [data, setData] = React.useState<T | null>(null);
    const getQueryParams = new URLSearchParams(queryParams).toString();

    const dataFeting = React.useCallback(async () => {
        setLoading(true);
        setError(null);
        setData(null);

        const response = await dynamicFetchData<T>(url + "?" + getQueryParams);

        setLoading(false);

        if (response.data) {
            setData(response.data);
        } else {
            setError(response.message);
        }
    }, [url, dep]);

    React.useEffect(() => {
        if (shouldDepend) {
            dataFeting();
        }
    }, [dataFeting]);

    return { loading, error, data };
};

export default useDataFetchDepend;
