const apiUrl = process.env.REACT_APP_API_URL;

export const fetchResultData = async (testId) => {
    const response = await fetch(`${apiUrl}/results/${testId}`);
    if (!response.ok) {
        throw new Error("Failed to fetch results");
    }
    const { data } = await response.json();
    return data;
};
