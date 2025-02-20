import { useNavigate } from "react-router-dom";

export default function OnboardingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-purple-600 flex flex-col items-center px-4">
      {/* Quiz Title */}
      <h1 className="text-6xl font-bold text-yellow-500 mt-16 tracking-wider">
        QUIZ
      </h1>

      {/* Welcome Message */}
      <h2 className="text-4xl font-bold text-white mt-32 text-center">
        Welcome To Quiz App
      </h2>

      {/* Get Start Button and Rocket */}
      <div className="mt-auto mb-32 flex flex-col items-center gap-8">
        <button
          onClick={() => navigate("/setup-quiz")}
          className="text-2xl font-bold text-white cursor-pointer hover:scale-105 transition-transform"
        >
          GET START
        </button>

        {/* Rocket Icon */}
        <div className="w-16 h-16">
          <img
            src="/rocket.png"
            alt="Rocket"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
}
