import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Input from "./pages/Input.jsx";
import Result from "./pages/Result.jsx";
import Preferences from "./pages/Preferences.jsx";
import Header from "./components/Header.jsx";
import Protein from "./pages/protein.jsx";
import Carbs from "./pages/carbs.jsx";
import Fats from "./pages/fats.jsx";

// import { Layout } from "./general/Layout.jsx";

export const App = () => {
  return (
    <div>
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
