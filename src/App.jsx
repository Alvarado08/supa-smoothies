import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Create from "./pages/Create";
import Update from "./pages/Update";

export default function App() {
  return (
    <BrowserRouter>
      <nav className="flex justify-between items-center p-5">
        <h1 className="text-lg md:text-3xl font-bold">Supa Smoothies</h1>
        <div className="flex gap-3 font-semibold text-sm md:text-lg">
          <Link to="/">Home</Link>
          <Link to="/create">Create Smoothie</Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/:id" element={<Update />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
