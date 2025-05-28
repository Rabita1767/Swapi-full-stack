import "./App.css";
import Home from "./pages/Home/home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SingleProductView from "./pages/SingleProductView/singleProductView";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/character/:id" element={<SingleProductView/>} />
      </Routes>
    </Router>
  );
}

export default App
