import "./App.css";
import WorkInstructions from "./components/WorkInstructions";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Router>
        <Routes>
          <Route path="/" element={<WorkInstructions />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
