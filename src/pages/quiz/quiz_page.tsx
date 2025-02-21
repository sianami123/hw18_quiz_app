import { useState, useEffect, useReducer, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Context } from "../../context/context";

export default function QuizPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const contextData = useContext(Context);
  const { questionsState, dispatch } = contextData;

  const count = queryParams.get("amount");
  const categoryId = queryParams.get("categoryId");
  const difficulty = queryParams.get("difficulty");

  if (!count || !categoryId || !difficulty) {
    navigate("/setup");
  }

  const [currentQuestion, setCurrentQuestion] = useState(0);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const url = `https://opentdb.com/api.php?amount=${count}&category=${categoryId}&difficulty=${difficulty}&type=multiple`;
        console.log("url", url);
        const questionData = await axios.get(url);
        dispatch({ type: "ADD_QUESTIONS", payload: questionData.data.results });
      } catch (error: any) {
        console.log(error);
      }
    }

    fetchQuestions();
  }, [count, categoryId, difficulty]);

  if (questionsState.length === 0) {
    return (
      <div className="min-h-screen bg-[#8A4FFF] p-5">
        <div className="max-w-[800px] mx-auto">Loading...</div>
      </div>
    );
  }

  const question = questionsState[currentQuestion];
  const answers = [...question.incorrect_answers, question.correct_answer].sort(
    () => Math.random() - 0.5
  );

  const handleAnswerClick = (selectedAnswer: string) => {
    const isCorrect = selectedAnswer === question.correct_answer;
    dispatch({
      type: "ADD_ANSWER",
      payload: {
        ...question,
        selectedAnswer,
        isCorrect,
      },
    });
    if (questionsState.length === currentQuestion + 1) {
      navigate("/results");
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  console.log(questionsState);

  return (
    <div className="min-h-screen bg-[#8A4FFF] p-5">
      <div className="max-w-[800px] mx-auto">
        <h1 className="text-[#FFD700] text-center text-4xl mb-10">QUIZ</h1>

        <div className="bg-white text-black p-6 rounded-[15px] mb-8">
          {currentQuestion + 1} - {question.question}
        </div>

        <div className="space-y-3">
          {answers.map((answer, index) => (
            <button
              onClick={() => handleAnswerClick(answer)}
              key={index}
              className={`w-full p-4 text-black rounded-[10px] 
                       text-left hover:scale-[1.02] transition-transform ${
                         question.selectedAnswer !== answer
                           ? "bg-[#7FFFD4]"
                           : "bg-[#FFD700]"
                       }`}
            >
              {index + 1}. {answer}
            </button>
          ))}
        </div>
        <div className="flex justify-between items-center mt-10">
          <button
            onClick={() => {
              if (currentQuestion > 0) {
                setCurrentQuestion(currentQuestion - 1);
              }
            }}
            className="bg-[#FFD700] text-black p-4 rounded-[10px]"
          >
            Previous
          </button>
          <button
            onClick={() => {
              if (currentQuestion < questionsState.length - 1) {
                setCurrentQuestion(currentQuestion + 1);
              }
            }}
            className="bg-[#FFD700] text-black p-4 rounded-[10px]"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
