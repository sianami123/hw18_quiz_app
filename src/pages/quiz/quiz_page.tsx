import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function QuizPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  const count = queryParams.get("amount");
  const categoryId = queryParams.get("categoryId");
  const difficulty = queryParams.get("difficulty");

  if (!count || !categoryId || !difficulty) {
    navigate("/setup-quiz");
  }

  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const url = `https://opentdb.com/api.php?amount=${count}&category=${categoryId}&difficulty=${difficulty}&type=multiple`;
        console.log("url", url);
        const questionData = await axios.get(url);
        setQuestions(questionData.data.results);
        console.log(questionData.data);
      } catch (error: any) {
        console.log(error);
      }
    }

    fetchQuestions();
  }, [count, categoryId, difficulty]);

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-[#8A4FFF] p-5">
        <div className="max-w-[800px] mx-auto">Loading...</div>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const answers = [...question.incorrect_answers, question.correct_answer].sort(
    () => Math.random() - 0.5
  );

  const handleAnswerClick = (answer: string) => {
    if (question.length === currentQuestion + 1) {
      // navigate("/results");
      return;
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

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
              className="w-full p-4 bg-[#7FFFD4] text-black rounded-[10px] 
                       text-left hover:scale-[1.02] transition-transform"
            >
              {index + 1}. {answer}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
