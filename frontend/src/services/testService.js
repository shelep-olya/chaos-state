const apiUrl = process.env.REACT_APP_API_URL;

export const createTest = async (testData, token) => {
    const response = await fetch(`${apiUrl}/tests`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(testData),
    });

    if (!response.ok) throw new Error("Network response was not ok");

    return await response.json();
};

export const fetchMoreTests = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${apiUrl}/tests/more-tests`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch tests: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    return data.data.tests;
};

export const fetchTestData = async (testId) => {
    const token = localStorage.getItem("token");

    const response = await fetch(`${apiUrl}/tests/${testId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch test data: ${response.status} ${errorText}`);
    }

    const { data } = await response.json();
    return data.test;
};
