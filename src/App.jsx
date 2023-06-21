import { BrowserRouter, Routes, Route } from "react-router-dom"
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/navbar";

function App() {
  return (
      <BrowserRouter>
      <Navbar>

      </Navbar>
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;