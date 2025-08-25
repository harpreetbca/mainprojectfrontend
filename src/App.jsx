import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddEditProduct from "./components/AddEditProduct.jsx";
import Home from "./components/Home.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />          {/* Homepage */}
        <Route path="/add" element={<AddEditProduct />} />   {/* Add/Edit Product page */}
      </Routes>
    </Router>
  );
}

export default App;
