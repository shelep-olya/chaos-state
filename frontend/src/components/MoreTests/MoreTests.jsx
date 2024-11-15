import React from "react";
import { useNavigate } from "react-router-dom";

import useMoreTests from "../../hooks/useMoreTests";
import styles from "./MoreTests.module.css";

function MoreTests() {
    const navigate = useNavigate();
    const {
        loading,
        error,
        currentPage,
        totalPages,
        displayedTests,
        handleNextPage,
        handlePreviousPage,
    } = useMoreTests();

    const handleTakeTest = (testId) => {
        navigate(`/tests/${testId}`);
    };

    if (loading) {
        return <div data-testid="loading-message">Loading...</div>;
    }

    if (error) {
        return <div data-testid="error-message">Error: {error}</div>;
    }

    return (
        <div className={styles.moreTestsContainer} data-testid="more-tests-container">
            <div className={styles.testsRow} data-testid="tests-row">
                {displayedTests.map((test, index) => (
                    <div
                        className={test ? styles.testContainer : styles.placeholderContainer}
                        key={test ? test._id : `placeholder-${index}`}
                        data-testid={test ? `test-container-${test._id}` : `placeholder-container-${index}`}
                    >
                        {test ? (
                            <div className={styles.test} data-testid={`test-${test._id}`}>
                                <h3 className={styles.testName} data-testid={`test-name-${test._id}`}>{test.name}</h3>
                                <p className={styles.testDescription} data-testid={`test-description-${test._id}`}>{test.description}</p>
                                <button
                                    className={styles.testBtn}
                                    onClick={() => handleTakeTest(test._id)}
                                    data-testid={`take-test-button-${test._id}`}
                                >
                                    Take this test
                                </button>
                            </div>
                        ) : null}
                    </div>
                ))}
            </div>

            <div className={styles.paginationControls} data-testid="pagination-controls">
                <button
                    className={styles.arrowButton}
                    onClick={handlePreviousPage}
                    disabled={currentPage === 0}
                    data-testid="previous-button"
                >
                    &lt; Previous
                </button>
                <span data-testid="pagination-info">{currentPage + 1} of {totalPages}</span>
                <button
                    className={styles.arrowButton}
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages - 1}
                    data-testid="next-button"
                >
                    Next &gt;
                </button>
            </div>
        </div>
    );
}

export default MoreTests;
