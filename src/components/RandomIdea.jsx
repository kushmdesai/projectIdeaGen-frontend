import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowPathIcon, HandThumbUpIcon, HandThumbDownIcon } from "@heroicons/react/24/solid";

export default function RandomIdea() {
    const [idea, setIdea] = useState(null);
    const [isLoading, setIsLoading] = useState(false); // Changed to false initially for clarity
    const navigate = useNavigate();

    // Helper function to render styled tags
    const renderTag = (label, value, colorClass) => (
        <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${colorClass}`}>
            {label}: {value}
        </span>
    );

    const fetchRandomIdea = async () => {
        setIsLoading(true);
        try {
            const res = await fetch("https://projectideagen-backend.onrender.com/ideas/random");
            const data = await res.json();
            setIdea(data);
        } catch(err) {
            console.error("Error fetching random idea:", err); // More descriptive error
            // You might want to display a user-friendly error message here
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleVote = async (id, type) => {
        try {
            const res = await fetch(`https://projectideagen-backend.onrender.com/ideas/${id}/${type}`,
                { method: "POST" }
            );
            const updatedIdea = await res.json();
            setIdea(updatedIdea); // Update the current idea with new vote counts
        } catch(err) {
            console.error(`Error ${type === 'upvote' ? 'upvoting' : 'downvoting'}:`, err);
        }
    };

    return (
        <div className="min-h-screen bg-slate-100 dark:bg-gray-900 flex flex-col items-center justify-center p-4 text-slate-800 dark:text-slate-200 transition-colors duration-300 font-inter">
            
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-3 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                    Project Idea Generator
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-400">
                    Discover your next great project with a single click.
                </p>
            </div>

            <button
                onClick={fetchRandomIdea}
                disabled={isLoading}
                className="flex items-center gap-3 px-8 py-4 mb-10 text-lg font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg shadow-lg transform hover:-translate-y-1 transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <ArrowPathIcon className={`h-6 w-6 ${isLoading ? 'animate-spin' : ''}`} />
                <span>{isLoading ? 'Thinking...' : 'Give me an Idea!'}</span>
            </button>

            {idea && (
                <div className="w-full max-w-xl bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-8 transition-all duration-500 ease-in-out transform animate-fade-in">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">{idea.title}</h2>
                    <p className="text-slate-600 dark:text-slate-300 mb-6">{idea.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                        {/* Corrected calls to renderTag */}
                        {renderTag("Category", idea.category, "bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-300")}
                        {renderTag("Difficulty", idea.difficulty, "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300")}
                        {renderTag("Tech", idea.tech_stack, "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300")}
                    </div>

                    <div className="flex items-center justify-between border-t border-slate-200 dark:border-slate-700 pt-4">
                        <span className="text-xl font-bold text-slate-700 dark:text-slate-200">
                            Score: {idea.upvotes - idea.downvotes}
                        </span>
                        <div className="flex gap-3">
                            <button
                                onClick={() => handleVote(idea.id, 'upvote')}
                                className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-green-700 bg-green-100 dark:text-green-300 dark:bg-green-500/20 hover:bg-green-200 dark:hover:bg-green-500/30 transition-colors duration-200"
                            >
                                <HandThumbUpIcon className="h-5 w-5" />
                                <span>{idea.upvotes}</span>
                            </button>
                            <button
                                onClick={() => handleVote(idea.id, 'downvote')}
                                className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-red-700 bg-red-100 dark:text-red-300 dark:bg-red-500/20 hover:bg-red-200 dark:hover:bg-red-500/30 transition-colors duration-200"
                            >
                                <HandThumbDownIcon className="h-5 w-5" />
                                <span>{idea.downvotes}</span>
                            </button>
                            <button
                                onClick={() => navigate("/planner", { state: { idea } })}
                                className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg shadow-md hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
                            >
                                Get Started
                            </button>
                            
                        </div>
                    </div>
                </div>
            )}
            <div>
                <button
                    onClick={() => navigate("/leaderboard", { state: { idea } })}
                    className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg shadow-md hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
                >
                    See the leaderboard
                </button>
            </div>
            
        </div>
    );
}
