import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import AddEditProduct from "./pages/AddEditProduct.jsx";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddEditProduct />} />
        <Route path="/edit/:id" element={<AddEditProduct />} />
      </Routes>
    </Router>
  );
}

export default App;
