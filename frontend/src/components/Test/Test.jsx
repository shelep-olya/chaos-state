import React from "react";
import useTestLogic from "../../hooks/useTest";
import styles from "./Test.module.css";

function Test() {
    const {
        testData,
        currentQuestion,
        currentQuestionIndex,
        selectedAnswerIndex,
        handleAnswerSelection,
        handleNextQuestion,
        handlePreviousQuestion,
    } = useTestLogic();

    if (!testData) {
        return <div data-testid="loading-message">Loading...</div>;
    }

    return (
        <div className={styles.testContainer} data-testid="test-container">
            <div className={styles.testBlock} data-testid="test-block">
                <div className={styles.title} data-testid="question-title">
                    <h1>{currentQuestion.question}</h1>
                </div>
                <div className={styles.answers} data-testid="answers-container">
                    {currentQuestion.answers.map((answer, index) => (
                        <button
                            key={index}
                            data-testid={`answer-button-${index}`}
                            className={
                                selectedAnswerIndex === index
                                    ? `${styles.answer} ${styles.selected}`
                                    : styles.answer
                            }
                            onClick={() => handleAnswerSelection(index)}
                        >
                            {answer}
                        </button>
                    ))}
                </div>
            </div>
            <div className={styles.btnContainer} data-testid="button-container">
                {currentQuestionIndex > 0 && (
                    <div className={styles.previousBtn} data-testid="previous-button-container">
                        <button data-testid="previous-button" onClick={handlePreviousQuestion}>
                            назад
                        </button>
                    </div>
                )}
                <div className={styles.submitBtn} data-testid="submit-button-container">
                    <button
                        data-testid="next-button"
                        onClick={handleNextQuestion}
                        disabled={selectedAnswerIndex === null}
                    >
                        {currentQuestionIndex < testData.testBlocks.length - 1
                            ? "далі"
                            : "завершити"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Test;
