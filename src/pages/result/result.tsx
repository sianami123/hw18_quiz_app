import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../context/context";

export default function Result() {
  const navigate = useNavigate();
  const contextData = useContext(Context);
  const { questionsState } = contextData;

  const score = Math.round(
    (questionsState.filter(
      (question: any) => question.selectedAnswer === question.correct_answer
    ).length /
      questionsState.length) *
      100
  );

  const getEmoji = (score: number) => {
    if (score < 30) return "😤";
    if (score < 50) return "😕";
    if (score < 70) return "🙂";
    if (score < 90) return "😊";
    return "🎉";
  };

  return (
    <div className="flex flex-col items-center justify-around min-h-screen bg-violet-500 p-8 gap-8">
      <h1 className="text-4xl font-bold text-zinc-300">QUIZ</h1>
      <div>
        <div className="bg-white rounded-full w-[120px] h-[120px] flex items-center justify-center">
          <div className="text-6xl">{getEmoji(score)}</div>
        </div>
        <div className="text-2xl font-bold text-white">TRY MORE</div>
      </div>

      <div className="text-2xl font-bold text-white">
        YOUR SCORE = {score} %
        <div className="text-2xl font-bold text-white max-h-[40vh] overflow-y-auto">
          {questionsState.map((question: any) => (
            <div
              key={question.question}
              className="flex items-center gap-2 text-lg h-4 overflow-hidden"
            >
              {question.question} -
              <span
                className={`${
                  question.selectedAnswer !== question.correct_answer
                    ? "text-red-500"
                    : "text-green-500"
                }`}
              >
                {question.selectedAnswer}
              </span>{" "}
              -{" "}
              <span className="text-green-500">
                {question.selectedAnswer !== question.correct_answer
                  ? question.correct_answer
                  : ""}
              </span>
            </div>
          ))}
        </div>
      </div>

      <button
        className="bg-white px-8 py-3 rounded-lg text-xl font-bold cursor-pointer transition-transform hover:scale-105"
        onClick={() => navigate("/setup")}
      >
        Again
      </button>
    </div>
  );
}
