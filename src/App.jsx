import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Input from "./pages/Input.jsx";
import Result from "./pages/Result.jsx";
import Preferences from "./pages/Preferences.jsx";
import Header from "./components/Header.jsx";
import Protein from "./pages/protein.jsx";
import Carbs from "./pages/carbs.jsx";
import Fats from "./pages/fats.jsx";
import food from "./img/food.jpg";

export const App = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${food})`,
      }}
    >
      <BrowserRouter>
        <Header />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/input" element={<Input />} />
          <Route path="/preferences" element={<Preferences />} />
          <Route path="/protein" element={<Protein />} />
          <Route path="/carbs" element={<Carbs />} />
          <Route path="/fats" element={<Fats />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
