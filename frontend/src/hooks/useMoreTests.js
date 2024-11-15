import { useEffect, useState } from "react";

import { fetchMoreTests } from "../services/testService";

const TESTS_PER_PAGE = 3;

const useMoreTests = () => {
    const [tests, setTests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        const getTests = async () => {
            try {
                const tests = await fetchMoreTests();
                setTests(tests);
            } catch (error_) {
                console.error(error_);
                setError(error_.message);
            } finally {
                setLoading(false);
            }
        };

        getTests();
    }, []);

    const totalPages = Math.ceil(tests.length / TESTS_PER_PAGE);

    const handleNextPage = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage((previousPage) => previousPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage((previousPage) => previousPage - 1);
        }
    };

    const displayedTests = tests.slice(currentPage * TESTS_PER_PAGE, (currentPage + 1) * TESTS_PER_PAGE);

    while (displayedTests.length < TESTS_PER_PAGE) {
        displayedTests.push(null);
    }

    return {
        tests,
        loading,
        error,
        currentPage,
        totalPages,
        displayedTests,
        handleNextPage,
        handlePreviousPage,
    };
};

export default useMoreTests;
