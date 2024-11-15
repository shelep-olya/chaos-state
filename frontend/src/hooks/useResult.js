import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { fetchResultData } from "../services/resultService";

const useResult = () => {
    const { testId } = useParams();
    const [results, setResults] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getResults = async () => {
            try {
                const data = await fetchResultData(testId);
                setResults(data);
            } catch (error) {
                setError(error.message);
                console.error("Error fetching results:", error);
            }
        };

        getResults();
    }, [testId]);

    const isLoggedIn = !!localStorage.getItem("token");

    return { results, error, isLoggedIn };
};

export default useResult;
