import { useEffect, useState } from "react";

import { fetchUserData } from "../services/authService";

const TESTS_PER_PAGE = 3;

function usePaginatedTests() {
    const [tests, setTests] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const totalPages = Math.ceil(tests.length / TESTS_PER_PAGE);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            fetchUserData(token)
                .then((data) => {
                    if (data.status === "success") {
                        setTests(data.data.tests);
                    } else {
                        console.error("Failed to fetch user data.");
                    }
                })
                .catch((error) => console.error(error));
        }
    }, []);

    const displayedTests = tests.slice(currentPage * TESTS_PER_PAGE, (currentPage + 1) * TESTS_PER_PAGE);

    const nextPage = () => {
        if (currentPage < totalPages - 1) setCurrentPage((prev) => prev + 1);
    };

    const previousPage = () => {
        if (currentPage > 0) setCurrentPage((prev) => prev - 1);
    };

    return { displayedTests, currentPage, totalPages, nextPage, previousPage };
}

export default usePaginatedTests;
