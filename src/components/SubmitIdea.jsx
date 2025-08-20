import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SubmitIdea() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [techStack, setTechStack] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage("");

    try {
      const res = await fetch("http://127.0.0.1:8000/ideas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          category,
          difficulty,
          tech_stack: techStack
        })
      });
      const data = await res.json();
      if (res.ok) {
        setSuccessMessage("✅ Idea submitted successfully!");
        setTitle("");
        setDescription("");
        setCategory("");
        setDifficulty("");
        setTechStack("");
      } else {
        console.error("Submission failed:", data);
      }
    } catch (err) {
      console.error("Error submitting idea:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-gray-900 flex flex-col items-center p-4 text-slate-800 dark:text-slate-200 transition-colors duration-300">
      
      <div className="text-center mb-8 md:mb-10 mt-8">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-3 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
          Submit Your Project Idea
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Share your creative idea with the community.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-8 transition-all duration-300 ease-in-out transform"
      >
        <input
          type="text"
          placeholder="Idea Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full px-4 py-3 rounded-lg mb-4 border border-gray-300 dark:border-gray-700 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors duration-200"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="w-full px-4 py-3 rounded-lg mb-4 border border-gray-300 dark:border-gray-700 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors duration-200"
        />
        <input
          type="text"
          placeholder="Category (e.g., Web App, AI, Hardware)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="w-full px-4 py-3 rounded-lg mb-4 border border-gray-300 dark:border-gray-700 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors duration-200"
        />
        <input
          type="text"
          placeholder="Difficulty (Beginner, Intermediate, Advanced)"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          required
          className="w-full px-4 py-3 rounded-lg mb-4 border border-gray-300 dark:border-gray-700 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors duration-200"
        />
        <input
          type="text"
          placeholder="Tech Stack (comma separated)"
          value={techStack}
          onChange={(e) => setTechStack(e.target.value)}
          required
          className="w-full px-4 py-3 rounded-lg mb-6 border border-gray-300 dark:border-gray-700 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors duration-200"
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-lg shadow-lg hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Submitting..." : "Submit Idea"}
        </button>

        {successMessage && (
          <p className="mt-4 text-center text-green-500 font-semibold">{successMessage}</p>
        )}
      </form>
    </div>
  );
}
