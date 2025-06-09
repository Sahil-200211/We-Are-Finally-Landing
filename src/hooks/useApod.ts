import { useState, useEffect } from "react";
import axios from "axios";

export const useApod = (date?: string) => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchApod = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`https://api.nasa.gov/planetary/apod`, {
                    params: {
                        api_key: import.meta.env.VITE_NASA_API_KEY,
                        date,
                    },
                });
                setData(res.data);
                setError(null);
            } catch (error: any) {
                setError('Failed to Fetch APOD')
                console.error('APOD fetch Failed', error);
            } finally {
                setLoading(false);
            }
        };

        fetchApod();
    }, [date]);

    return { data, loading, error };
};