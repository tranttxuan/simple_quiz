import axios from "axios";
import { shuffleArray } from "./Utils";

export enum Category {
    MUSIC = 12,
    FILM = 11,
    BOOK = 10,
    ALL = 0,
}
export enum Difficulty {
    EASY = "easy",
    MEDIUM = "medium",
    HARD = "hard",
}

export type Question={
    category:string;
    correct_answer:string;
    difficulty:string;
    incorrect_answers:string[];
    question:string,
    type:string
}


//create option list that contains correct and incorrect answers.
export type QuestionState = Question & {answers:string[]};

export const fetchQuizQuestions = async (
    amount: number,
    category: Category.ALL,
    difficulty: Difficulty.EASY
) => {
    const endpoint = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`;

    try {
        const data = await axios(endpoint);
        console.log("in api", data.data.results)
       return data.data.results.map((question:Question)=>({
           ...question,
           answers:shuffleArray([...question.incorrect_answers, question.correct_answer])
       }));
    } catch (err) {
        console.log(err);
    }
};
