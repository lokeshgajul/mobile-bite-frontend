import "./App.css";
import Navbar from "./components/Navbar";
import Mobiles from "./components/Mobiles";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MobileDetailsPage from "./components/MobileDetailsPage";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Mobiles />} />
          <Route
            path="/mobiles/:mobileId"
            exact
            element={<MobileDetailsPage />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
