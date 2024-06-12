import { useState, useCallback } from "react";

export const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const request = useCallback(async (url, method = 'GET', body = null, headers = {'Content-Type': 'application/json'}) => {
        setLoading(true)
        try {
            const response = await fetch(url, {method, body, headers});
            if (!response.ok) {
                throw new Error("Please sorry your URL in error")
            }
            const data = await response.json();
            setLoading(false)
            return data;
        } catch(e) {
            setLoading(false);
            setError(e.message);
        }  
    }, []);
    const clearError = useCallback(() => setError(null), []);
    return {loading, error, request, clearError}
}