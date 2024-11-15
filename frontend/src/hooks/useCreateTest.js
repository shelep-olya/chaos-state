import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

import { createTest } from "../services/testService";

export const useCreateTest = (navigate) => {
    const [testName, setTestName] = useState("");
    const [description, setDescription] = useState("");
    const [numberQuestions, setNumberQuestions] = useState(0);
    const [numberResults, setNumberResults] = useState(0);
    const [questions, setQuestions] = useState([]);
    const [results, setResults] = useState([]);
    const [authorId, setAuthorId] = useState(null);
    const [currentStep, setCurrentStep] = useState(1);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const decodedToken = jwtDecode(token);
            setAuthorId(decodedToken._id);
        }
    }, []);

    const validateStep = () => {
        const newErrors = {};

        if (currentStep === 1) {
            if (!testName) newErrors.testName = "Test name is required";
            if (!description) newErrors.description = "Description is required";
        } else if (currentStep === 2) {
            if (numberQuestions <= 0) newErrors.numberQuestions = "Number of questions is required";
            if (numberResults <= 0) newErrors.numberResults = "Number of results is required";
        } else if (currentStep > 2 && currentStep <= 2 + numberQuestions) {
            const questionIndex = currentStep - 3;
            const question = questions[questionIndex] || {};
            if (!question.question) newErrors[`question${questionIndex}`] = "Question text is required";
            if (!question.answer1) newErrors[`answer1_${questionIndex}`] = "Answer 1 is required";
            if (!question.answer2) newErrors[`answer2_${questionIndex}`] = "Answer 2 is required";
            if (!question.answer3) newErrors[`answer3_${questionIndex}`] = "Answer 3 is required";
        } else if (currentStep === 2 + numberQuestions + 1) {
            results.forEach((result, index) => {
                if (!result) newErrors[`result${index}`] = `Result ${index + 1} is required`;
            });
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleTestInfoChange = (e) => {
        const { name, value } = e.target;
        if (name === "testName") setTestName(value);
        if (name === "description") setDescription(value);
    };

    const handleQuestionInfoChange = (e) => {
        const { name, value } = e.target;
        if (name === "numQuestions") {
            setNumberQuestions(Number(value));
            setQuestions(Array.from({ length: Number(value) }, () => ({})));
        } else if (name === "numResults") {
            setNumberResults(Number(value));
            setResults(Array.from({ length: Number(value) }).fill(""));
        }
    };

    const handleQuestionChange = (index, field, value) => {
        setQuestions((prevQuestions) => {
            const updatedQuestions = [...prevQuestions];
            updatedQuestions[index] = {
                ...updatedQuestions[index],
                [field]: value,
            };
            return updatedQuestions;
        });
    };

    const handleResultChange = (index, value) => {
        const updatedResults = [...results];
        updatedResults[index] = value;
        setResults(updatedResults);
    };

    const handleNextStep = () => {
        if (validateStep()) {
            setCurrentStep((prevStep) => prevStep + 1);
        }
    };

    const handleBackStep = () => {
        setCurrentStep((prevStep) => prevStep - 1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateStep()) return;

        const testData = {
            name: testName,
            description,
            numberOfQuestions: numberQuestions,
            numberOfResults: numberResults,
            testBlocks: questions.map((q) => ({
                question: q.question,
                answers: [q.answer1, q.answer2, q.answer3],
            })),
            author: authorId,
            results,
        };

        try {
            const token = localStorage.getItem("token");
            await createTest(testData, token);
            navigate("/me");
        } catch (error) {
            console.error("Error creating test:", error);
        }
    };

    return {
        testName,
        setTestName,
        description,
        setDescription,
        numberQuestions,
        numberResults,
        questions,
        results,
        authorId,
        currentStep,
        errors,
        handleTestInfoChange,
        handleQuestionInfoChange,
        handleQuestionChange,
        handleResultChange,
        handleNextStep,
        handleBackStep,
        handleSubmit,
    };
};
