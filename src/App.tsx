import { Routes, Route } from "react-router-dom";
import OnboardingPage from "./pages/onboarding/onboarding_page";
import SetupQuizPage from "./pages/setup_quiz/setup_quiz_page";
import QuizPage from "./pages/quiz/quiz_page";
import Result from "./pages/result/result";
import { ContextProvider } from "./context/context";
function App() {
  return (
    <ContextProvider>
      <div className="bg-red-500">
        <Routes>
          <Route path="/" element={<OnboardingPage />} />
          <Route path="/setup-quiz" element={<SetupQuizPage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/results" element={<Result />} />
        </Routes>
      </div>
    </ContextProvider>
  );
}

export default App;
