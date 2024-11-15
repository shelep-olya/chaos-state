import React from "react";
import { useNavigate } from "react-router-dom";

import { useCreateTest } from "../../hooks/useCreateTest"; 
import styles from "./CreateTest.module.css";

function CreateTest() {
    const navigate = useNavigate();
    const {
        testName,
        description,
        numberQuestions,
        numberResults,
        questions,
        results,
        currentStep,
        handleTestInfoChange,
        handleQuestionInfoChange,
        handleQuestionChange,
        handleResultChange,
        handleNextStep,
        handleBackStep,
        handleSubmit,
    } = useCreateTest(navigate);

    return (
        <form onSubmit={handleSubmit} className={styles.createTestForm} data-testid="createTestForm">
            {currentStep === 1 && (
                <div className={styles.testInfo} data-testid="testInfo">
                    <h2>створити тест</h2>
                    <label>
                        назва тесту:
                        <input
                            type="text"
                            name="testName"
                            value={testName}
                            onChange={handleTestInfoChange}
                            required
                            data-testid="testNameInput" 
                        />
                    </label>
                    <label>
                        опис тесту:
                        <textarea
                            name="description"
                            value={description}
                            onChange={handleTestInfoChange}
                            required
                            data-testid="descriptionInput" 
                        />
                    </label>
                    <button type="button" onClick={handleNextStep} className={styles.nextInfoBtn} data-testid="nextInfoBtn">
                        далі
                    </button>
                </div>
            )}

            {currentStep === 2 && (
                <div className={styles.questionInfo} data-testid="questionInfo">
                    <label>
                        кількість запитань:
                        <input
                            type="number"
                            name="numQuestions"
                            value={numberQuestions}
                            onChange={handleQuestionInfoChange}
                            required
                            min="1"
                            data-testid="numQuestionsInput" 
                        />
                    </label>
                    <label>
                        кількість відповідей:
                        <input
                            type="number"
                            name="numResults"
                            value={numberResults}
                            onChange={handleQuestionInfoChange}
                            required
                            min="2"
                            data-testid="numResultsInput" 
                        />
                    </label>
                    <button type="button" onClick={handleBackStep} className={styles.prevBtn} data-testid="prevBtn">
                        назад
                    </button>
                    <button type="button" onClick={handleNextStep} className={styles.nextBtn} data-testid="nextBtn">
                        далі
                    </button>
                </div>
            )}

            {currentStep > 2 && currentStep <= 2 + numberQuestions && (
                <div className={styles.questionContainer} data-testid="questionContainer">
                    <h4>запитання {currentStep - 2}</h4>
                    <label>
                        <input
                            type="text"
                            placeholder="запитання"
                            value={questions[currentStep - 3]?.question || ""}
                            onChange={(e) => handleQuestionChange(currentStep - 3, "question", e.target.value)}
                            required
                            data-testid={`questionInput-${currentStep - 3}`} 
                        />
                    </label>
                    <label>
                        <input
                            type="text"
                            placeholder="відповідь 1"
                            value={questions[currentStep - 3]?.answer1 || ""}
                            onChange={(e) => handleQuestionChange(currentStep - 3, "answer1", e.target.value)}
                            required
                            data-testid={`answer1Input-${currentStep - 3}`} 
                        />
                    </label>
                    <label>
                        <input
                            type="text"
                            placeholder="відповідь 2"
                            value={questions[currentStep - 3]?.answer2 || ""}
                            onChange={(e) => handleQuestionChange(currentStep - 3, "answer2", e.target.value)}
                            required
                            data-testid={`answer2Input-${currentStep - 3}`}
                        />
                    </label>
                    <label>
                        <input
                            type="text"
                            placeholder="відповідь 3"
                            value={questions[currentStep - 3]?.answer3 || ""}
                            onChange={(e) => handleQuestionChange(currentStep - 3, "answer3", e.target.value)}
                            required
                            data-testid={`answer3Input-${currentStep - 3}`} 
                        />
                    </label>
                    <div className={styles.btnGroup}>
                        <button type="button" onClick={handleBackStep} className={styles.prevBtn} data-testid="prevQuestionBtn">
                            назад
                        </button>
                        <button type="button" onClick={handleNextStep} className={styles.nextBtn} data-testid="nextQuestionBtn">
                            далі
                        </button>
                    </div>
                </div>
            )}

            {currentStep === 2 + numberQuestions + 1 && (
                <div className={styles.resultContainer} data-testid="resultContainer">
                    <h3>результати</h3>
                    {Array.from({ length: numberResults }, (_, index) => (
                        <label key={index}>
                            <input
                                type="text"
                                value={results[index]}
                                onChange={(e) => handleResultChange(index, e.target.value)}
                                required
                                placeholder="відповідь"
                                data-testid={`resultInput-${index}`} 
                            />
                        </label>
                    ))}
                    <div className={styles.btnGroup}>
                        <button type="button" onClick={handleBackStep} className={styles.prevResBtn} data-testid="prevResultBtn">
                            назад
                        </button>
                        <button type="submit" className={styles.nextResBtn} data-testid="finishBtn">
                            завершити
                        </button>
                    </div>
                </div>
            )}
        </form>
    );
}

export default CreateTest;
