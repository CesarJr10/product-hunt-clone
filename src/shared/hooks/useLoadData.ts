import { useState, useEffect } from "react";

interface UseLoadDataResult <Type> {
    data: Type | null;
    loading: boolean;
    error: string | null;
}

const useLoadData = <Type>(fetchData: ()=> Promise<Type>): UseLoadDataResult<Type> => {
    const [data, setData] = useState<Type | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() =>{
        const loadData = async () => {
            try {
                const result = await fetchData();
                setData(result);
            } catch (error) {
                setError("Error fetching data");
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [fetchData]);

    return { data, loading, error };
}

export default useLoadData;