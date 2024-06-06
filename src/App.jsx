import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import Create from "./pages/Create";
import Update from "./pages/Update";

export default function App() {
  return (
    <BrowserRouter>
      <nav className="flex justify-between items-center p-5">
        <h1 className="text-3xl font-bold">Supa Smoothies</h1>
        <div className="flex gap-3 font-semibold">
          <Link to="/">Home</Link>
          <Link to="/create">Create Smoothie</Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/:id" element={<Update />} />
      </Routes>
    </BrowserRouter>
  );
}
