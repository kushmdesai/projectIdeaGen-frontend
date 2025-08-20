import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RandomIdea from "./components/RandomIdea";
import FilteredIdeas from "./components/FilteredIdeas";
import SubmitIdea from "./components/SubmitIdea";
import IdeaGenerator from "./components/IdeaGenerator";
import IdeaPlanner from "./components/IdeaPlanner"; // import the new page
import Leaderboard from "./components/Leaderboard";

function App() {
  return (
    <Router>
      <Routes>
        {/* Home page: render your existing components */}
        <Route
          path="/"
          element={
            <div>
              <RandomIdea />
              <FilteredIdeas />
              <SubmitIdea />
              <IdeaGenerator />
            </div>
          }
        />

        {/* Idea Planner page */}
        <Route path="/planner" element={<IdeaPlanner />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </Router>
  );
}

export default App;
