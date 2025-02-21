import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "../../context/context";
interface Category {
  id: number;
  name: string;
}

interface TriviaCategories {
  trivia_categories: Category[];
}

const BASE_CATEGORY_URL = "https://opentdb.com/api_category.php";

export default function SetupQuizPage() {
  const [numberOfQuestions, setNumberOfQuestions] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const [difficulty, setDifficulty] = useState<string>("Medium");
  const [categories, setCategories] = useState<Category[]>([]);
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    const queryParams = new URLSearchParams({
      amount: numberOfQuestions,
      categoryId: selectedCategory.toString(),
      difficulty: difficulty.toLowerCase(),
    }).toString();

    navigate(`/quiz?${queryParams}`);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await axios.get<TriviaCategories>(BASE_CATEGORY_URL);
      setCategories(response.data.trivia_categories);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const contextData = useContext(Context);
    const { dispatch } = contextData;
    dispatch({ type: "RESET_QUESTIONS" });
  }, []);

  return (
    <div className="min-h-screen bg-purple-600 flex flex-col items-center p-8">
      <h1 className="text-4xl font-bold mb-8 text-yellow-300">QUIZ</h1>

      <div className="w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-white">Setup Quiz</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-white mb-2">Number Of Question</label>
            <input
              type="number"
              value={numberOfQuestions}
              onChange={(e) => setNumberOfQuestions(e.target.value)}
              className="w-full p-3 rounded-md bg-yellow-300"
              placeholder="Please Enter A Number Between 5 And 50"
            />
          </div>

          <div>
            <label className="block text-white mb-2">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(Number(e.target.value))}
              className="w-full p-3 rounded-md bg-yellow-300"
            >
              <option value={0}>Any Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-white mb-2">Difficulty</label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full p-3 rounded-md bg-yellow-300"
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          <div className="pt-8 flex flex-col items-center">
            <p className="text-white mb-2">START</p>
            <button
              onClick={handleStartQuiz}
              className="w-12 h-12 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.636 5.636a9 9 0 1012.728 0M12 3v9"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
