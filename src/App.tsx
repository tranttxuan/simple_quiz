import React, { useState } from "react";
import { fetchQuizQuestions, Difficulty, Category, QuestionState } from "./API";

const TOTAL_QUESTION = 10;
export type AnswerObject = {
    question: string;
    answer: string;
    correct: boolean;
    correctAnswer: string;
};

const App = () => {
    const [loading, setLoading] = useState(false);
    const [questions, setQuestions] = useState<QuestionState[]>([]);
    const [number, setNumber] = useState(0);
    const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
    const [gameOver, setGameOver] = useState(true);
    const [score, setScore] = useState(0);

    const fetchData = async () => {
        setLoading(true);
        setGameOver(false);
        try {
            const listQuestions = await fetchQuizQuestions(
                TOTAL_QUESTION,
                Category.ALL,
                Difficulty.EASY
            );
            setLoading(false);
            setQuestions(listQuestions);
            setNumber(0);
            setScore(0);
            setUserAnswers([]);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <h1>QUIZ</h1>
            
            <button onClick={fetchData} className="start">
                Start
            </button>
        </div>
    );
};
export default App;
