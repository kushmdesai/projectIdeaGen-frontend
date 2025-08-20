import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { HandThumbUpIcon, HandThumbDownIcon, FunnelIcon } from "@heroicons/react/24/solid";

export default function FilteredIdeas() {
  const [ideas, setIdeas] = useState([]);
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); // 1. State for the search term
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Function to render styled tags (Category, Difficulty, Tech Stack)
  const renderTag = (label, value, colorClass) => (
    <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${colorClass}`}>
      {label}: {value}
    </span>
  );

  const fetchIdeas = async () => {
    setIsLoading(true);
    try {
      let url = "https://projectideagen-backend.onrender.com/ideas";
      const params = [];

      // 3. Add search term to the API request if it exists
      if (searchTerm) params.push(`search=${encodeURIComponent(searchTerm)}`);
      if (category) params.push(`category=${encodeURIComponent(category)}`);
      if (difficulty) params.push(`difficulty=${encodeURIComponent(difficulty)}`);
      
      if (params.length > 0) url += "?" + params.join("&");

      const res = await fetch(url);
      const data = await res.json();
      setIdeas(data);
    } catch (error) {
      console.error("Error fetching ideas:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch ideas on initial load
  useEffect(() => {
    fetchIdeas();
  }, []); // Empty dependency array means it runs once on mount

  const handleUpvote = async (id) => {
    try {
      const res = await fetch(`https://projectideagen-backend.onrender.com/ideas/${id}/upvote`, {
        method: "POST",
      });
      const updatedIdea = await res.json();
      setIdeas((prevIdeas) =>
        prevIdeas.map((idea) => (idea.id === id ? updatedIdea : idea))
      );
    } catch (err) {
      console.error("Error upvoting:", err);
    }
  };

  const handleDownvote = async (id) => {
    try {
      const res = await fetch(`https://projectideagen-backend.onrender.com/ideas/${id}/downvote`, {
        method: "POST",
      });
      const updatedIdea = await res.json();
      setIdeas((prevIdeas) =>
        prevIdeas.map((idea) => (idea.id === id ? updatedIdea : idea))
      );
    } catch (err) {
      console.error("Error downvoting:", err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-gray-900 flex flex-col items-center p-4 text-slate-800 dark:text-slate-200 transition-colors duration-300">
      
      <div className="text-center mb-8 md:mb-10 mt-8">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-3 bg-gradient-to-r from-teal-500 to-cyan-600 bg-clip-text text-transparent">
          Find Your Next Big Idea
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Filter through exciting project ideas to spark your creativity.
        </p>
      </div>

      {/* Search Textarea */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4 w-full max-w-xl">
        {/* 2. Connect the textarea to the state */}
        <textarea 
          name="ideaDescription" 
          id="ideaDescription" 
          placeholder="Search by title or description..." 
          className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 appearance-none transition-colors duration-200"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        ></textarea>
      </div>

      {/* Filter Dropdowns and Button */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8 w-full max-w-xl">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 appearance-none transition-colors duration-200"
        >
          <option value="">All Categories</option>
          <option value="Web app">Web app</option>
          <option value="Hardware">Hardware</option>
          <option value="AI">AI</option>
          <option value="Mobile App">Mobile App</option>
          <option value="Game">Game</option>
        </select>

        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 appearance-none transition-colors duration-200"
        >
          <option value="">All Difficulties</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>

        <button
          onClick={fetchIdeas}
          disabled={isLoading}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-bold rounded-lg shadow-md hover:from-teal-600 hover:to-cyan-700 focus:outline-none focus:ring-4 focus:ring-teal-300 dark:focus:ring-teal-800 transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FunnelIcon className={`h-5 w-5 ${isLoading ? 'animate-bounce' : ''}`} />
          <span>{isLoading ? 'Searching...' : 'Apply Filters'}</span>
        </button>
      </div>

      {/* Ideas List */}
      <div className="w-full max-w-xl space-y-5">
        {ideas.length === 0 && !isLoading && (
          <p className="text-center text-slate-600 dark:text-slate-400 text-lg">
            No ideas found with the selected filters. Try adjusting your search!
          </p>
        )}

        {isLoading && (
          <div className="text-center text-lg text-teal-600 dark:text-teal-400">
            Loading ideas...
          </div>
        )}

        {ideas.map((idea) => (
          <div 
            key={idea.id} 
            className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl border border-gray-200 dark:border-gray-700"
          >
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{idea.title}</h2>
            <p className="text-slate-600 dark:text-slate-300 mb-4 text-base leading-relaxed">{idea.description}</p>
            
            <div className="flex flex-wrap gap-2 mb-4">
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
                  onClick={() => handleUpvote(idea.id)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-green-700 bg-green-100 dark:text-green-300 dark:bg-green-500/20 hover:bg-green-200 dark:hover:bg-green-500/30 transition-colors duration-200"
                >
                  <HandThumbUpIcon className="h-5 w-5" />
                  <span>{idea.upvotes}</span>
                </button>
                <button
                  onClick={() => handleDownvote(idea.id)}
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
        ))}
      </div>
    </div>
  );
}
