import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { fetchTestData } from "../services/testService";

const useTestLogic = () => {
    const { testId } = useParams();
    const navigate = useNavigate();
    const [testData, setTestData] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);

    useEffect(() => {
        if (!testId) {
            console.error("No test ID provided.");
            return;
        }

        const getData = async () => {
            try {
                const test = await fetchTestData(testId);
                setTestData(test);
            } catch (error) {
                console.error("Error fetching test data:", error);
            }
        };

        getData();
    }, [testId]);

    const handleAnswerSelection = (index) => {
        setSelectedAnswerIndex(index);
    };

    const handleNextQuestion = () => {
        if (selectedAnswerIndex === null) {
            alert("Please select an answer before proceeding.");
            return;
        }
        if (currentQuestionIndex < testData.testBlocks.length - 1) {
            setCurrentQuestionIndex((previous) => previous + 1);
            setSelectedAnswerIndex(null);
        } else {
            navigate(`/results/${testId}`);
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex((previous) => previous - 1);
            setSelectedAnswerIndex(null);
        }
    };

    const currentQuestion = testData ? testData.testBlocks[currentQuestionIndex] : null;

    return {
        testData,
        currentQuestion,
        currentQuestionIndex,
        selectedAnswerIndex,
        handleAnswerSelection,
        handleNextQuestion,
        handlePreviousQuestion,
    };
};

export default useTestLogic;
