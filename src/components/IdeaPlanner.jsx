import { FingerPrintIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function IdeaPlanner() {
    const location = useLocation();
    const idea = location.state?.idea;
    const [plan, setPlan] = useState(false);
    const [isLoading, setIsloading] = useState(false);
    const navigate = useNavigate();

    const handlePrint = () => {
      window.print();
    };

    const generatePlan = async () => {
        if (!idea) return;
        setIsloading(true);
        setPlan(null);

        try {
            const res = await fetch("https://projectideagen-backend.onrender.com/ai/expand", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(idea)
            });
            const data = await res.json();
            setPlan(data.plan);
        } catch (err) {
            console.error(err)
        } finally {
            setIsloading(false)
        }
    };

    return (
        <div className="min-h-screen bg-slate-100 dark:bg-gray-900 flex flex-col items-center p-4 text-slate-200 transition-colors duration-300">
            <h1 className="text-3xl md:text-4xl font-extrabold mb-6 bg-gradient-to-r from-teal-500 to-cyan-600 bg-clip-text text-transparent">
                Idea Planner
            </h1>

                  {idea ? (
        <>
          <h2 className="text-xl font-bold mb-4">{idea.title}</h2>
          <button
            onClick={generatePlan}
            disabled={isLoading}
            className="px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-bold rounded-lg shadow-md hover:from-teal-600 hover:to-cyan-700 focus:outline-none focus:ring-4 focus:ring-teal-300 dark:focus:ring-teal-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Generating Plan..." : "Generate Plan"}
          </button>

          {plan && (
            <div className="w-full max-w-xl p-6 mt-6 bg-white dark:bg-slate-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 transition-all duration-300">
              <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">
                {plan.title} - Mini Plan
              </h3>
              <div className="mb-3">
                <p className="font-semibold text-slate-700 dark:text-slate-200">Features:</p>
                <p className="text-slate-600 dark:text-slate-300 whitespace-pre-line">{plan.features}</p>
              </div>
              <div className="mb-3">
                <p className="font-semibold text-slate-700 dark:text-slate-200">Tech Stack:</p>
                <p className="text-slate-600 dark:text-slate-300">{plan.tech_stack}</p>
              </div>
              <div className="mb-3">
                <p className="font-semibold text-slate-700 dark:text-slate-200">Difficulty:</p>
                <p className="text-slate-600 dark:text-slate-300">{plan.difficulty}</p>
              </div>
              {plan.first_steps && (
                <div className="mb-3">
                  <p className="font-semibold text-slate-700 dark:text-slate-200">First Steps:</p>
                  <p className="text-slate-600 dark:text-slate-300 whitespace-pre-line">{plan.first_steps}</p>
                </div>

              )}
                <button
                    onClick={handlePrint}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Export as PDF
                </button>
                <button
                    onClick={() => navigate("/")}
                    className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg shadow-md hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
                >
                    Go Back
                </button>
            </div>
          )}
        </>
      ) : (
        <p className="text-slate-600 dark:text-slate-400">No idea selected.</p>
      )}
    </div>
  );
}