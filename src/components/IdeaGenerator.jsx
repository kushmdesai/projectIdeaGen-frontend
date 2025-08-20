import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function IdeaGenerator() {
  const [prompt, setPrompt] = useState("");
  const [idea, setIdea] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const generateIdea = async () => {
    if (!prompt.trim()) {
      setError("Please enter a prompt!");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");
    setIdea(null);

    try {
      const res = await fetch("https://projectideagen-backend.onrender.com/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) throw new Error(`Error: ${res.status}`);
      const data = await res.json();
      setIdea(data.idea);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const saveIdea = async () => {
    if (!idea) return;

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("https://projectideagen-backend.onrender.com/ideas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: idea.title,
          description: idea.description,
          category: idea.category,
          difficulty: idea.difficulty,
          tech_stack: idea.techStack?.join(", "),
          theme: prompt
        }),
      });

      if (!res.ok) throw new Error(`Error saving idea: ${res.status}`);
      await res.json();
      setSuccess("Idea saved successfully! ✅");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const renderTag = (label, value, colorClass) => (
    <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${colorClass}`}>
      {label}: {value}
    </span>
  );

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-gray-900 flex flex-col items-center p-4 text-slate-800 dark:text-slate-200 transition-colors duration-300">
      
      <div className="text-center mb-8 md:mb-10 mt-8">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-3 bg-gradient-to-r from-teal-500 to-cyan-600 bg-clip-text text-transparent">
          💡 Generate a Creative Project Idea
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Enter a theme or keyword and get a unique project idea instantly.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-8 w-full max-w-xl">
        <input
          type="text"
          placeholder="Enter a theme or keyword..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors duration-200"
        />
        <button
          onClick={generateIdea}
          disabled={loading}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-bold rounded-lg shadow-md hover:from-teal-600 hover:to-cyan-700 focus:outline-none focus:ring-4 focus:ring-teal-300 dark:focus:ring-teal-800 transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Generating..." : "Generate"}
        </button>
      </div>

      {error && <p className="text-red-600 mb-4">{error}</p>}
      {success && <p className="text-green-600 mb-4">{success}</p>}

      {idea && (
        <div className="w-full max-w-xl bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{idea.title}</h2>
          <p className="text-slate-600 dark:text-slate-300 mb-4 text-base leading-relaxed">{idea.description}</p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {idea.category && renderTag("Category", idea.category, "bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-300")}
            {idea.difficulty && renderTag("Difficulty", idea.difficulty, "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300")}
            {idea.techStack?.length > 0 && renderTag("Tech", idea.techStack.join(", "), "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300")}
          </div>

          <button
            onClick={saveIdea}
            disabled={saving}
            className="px-5 py-2 bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold rounded-lg shadow-md hover:from-green-600 hover:to-teal-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? "Adding..." : "Add to Database"}
          </button>
          <button
            onClick={() => navigate("/planner", { state: { idea } })}
            className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg shadow-md hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
          >
            Get Started
          </button>
        </div>
      )}
    </div>
  );
}
