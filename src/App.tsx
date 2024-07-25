// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ModelList } from "./components/ModelList";
import { ModelView } from "./pages/ModelView";

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <header className="bg-gray-800 text-white py-4">
          <div className="container mx-auto px-4">
            <h1 className="text-2xl font-bold">3D Model Viewer</h1>
          </div>
        </header>
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<ModelList />} />
            <Route path="/model/:id" element={<ModelView />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
