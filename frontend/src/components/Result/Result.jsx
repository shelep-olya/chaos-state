import React from "react";
import { Link } from "react-router-dom";

import ResultImage from "../../../assets/result.jpg"; 
import useResult from "../../hooks/useResult";
import styles from './Result.module.css';


function Result() {
    const { results, error, isLoggedIn } = useResult();

    if (error) {
        return <div className={styles.error} data-testid="error-message">Error: {error}</div>;
    }

    if (!results) {
        return <div className={styles.loading} data-testid="loading-message">завантаження результатів...</div>;
    }

    return (
        <div className={styles.resultsContainer}>
            <h1 className={styles.resultsTitle} data-testid="results-title">результати</h1>
            <div className={styles.resultsContent}>
                <p className={styles.resultText}  data-testid="results-content">{results}</p>
            </div>
            <div className={styles.actionsContainer}>
                {!isLoggedIn && (
                    <>
                        <Link to="/" className={styles.homeLink} data-testid="home-link">ви можете повернутись додому</Link>
                        <span>або</span>
                        <Link to="/auth/register" className={styles.signupLink} data-testid="signup-link">
                            <span>зареєструватись</span> і продовжити
                        </Link>
                    </>
                )}
            </div>
            <div className={styles.imageContainer}>
                <img src={ResultImage} alt="Result Illustration" data-testid="result-image" />
            </div>
        </div>
    );
}

export default Result;
