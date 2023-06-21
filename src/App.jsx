import { BrowserRouter, Routes, Route } from "react-router-dom"
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/navbar";
import EventView from "./components/events/EventView";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/:id" element={<EventView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;