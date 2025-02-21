import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/animations.css";
import Layout from "../layout/layout";

export default function OnboardingPage() {
  const [isLaunching, setIsLaunching] = useState(false);
  const navigate = useNavigate();

  const handleStart = () => {
    setIsLaunching(true);
    setTimeout(() => {
      navigate("/setup");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-purple-600 flex flex-col items-center justify-around p-8">
      <Layout>
        <h2 className="text-2xl text-white mb-16">Welcome To Quiz App</h2>

        <div
          onClick={handleStart}
          className="flex flex-col items-center cursor-pointer"
        >
          <p className="text-white mb-4">GET START</p>
          <button
            className={`w-16 h-16 transition-transform ${
              isLaunching ? "rocket-launch" : "hover:scale-110"
            }`}
          >
            <img
              src="https://ugokawaii.com/wp-content/uploads/2023/12/rocket.gif"
              alt="Rocket"
              className="w-full h-full object-contain"
            />
          </button>
        </div>
      </Layout>
    </div>
  );
}
