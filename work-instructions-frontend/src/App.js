import "./App.css";
import WorkInstructions from "./components/WorkInstructions";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import NavBar from "./components/NavBar";
import Editor from "./components/Editor";

import { WorkInstructionContextProvider } from "./contexts/WorkInstruction";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Router>
        <Routes>
          <Route path="/" element={<WorkInstructions />} />
          <Route path="editor" element={<Editor />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
