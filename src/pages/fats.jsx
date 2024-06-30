import { useState, useEffect } from "react";
import FatsOptions from "../components/FatsOptions";
import { useNavigate } from "react-router-dom";

export default function Fats() {
  const navigate = useNavigate();
  const dietType = localStorage.getItem("foodPreference");
  const [selectedFood, setSelectedFood] = useState([]);

  useEffect(() => {
    // Load selected food from local storage when component mounts
    const storedFood = JSON.parse(localStorage.getItem("selectedFood"));
    if (storedFood) {
      setSelectedFood(storedFood);
    }
  }, []);

  const handlePreferenceClick = (preference) => {
    // Toggle the preference selection
    setSelectedFood((prevSelectedFood) => {
      const updatedFood = prevSelectedFood.includes(preference)
        ? prevSelectedFood.filter((item) => item !== preference)
        : [...prevSelectedFood, preference];
      // Save selected food to local storage
      localStorage.setItem("selectedFood", JSON.stringify(updatedFood));
      return updatedFood;
    });
  };

  const handleNextPage = () => {
    navigate("/Result");
  };

  return (
    <div className="py-6">
      <h1 className="mb-10 py-6 text-center text-2xl">
        Choose some of the healthy fat sources you enjoy:
      </h1>
      <div className="mx-auto flex w-10/12 flex-wrap justify-center gap-4">
        {FatsOptions[dietType].map((preference, index) => (
          <button
            key={index}
            className={`btn ${
              selectedFood.includes(preference) ? "btn-primary" : ""
            }`}
            onClick={() => handlePreferenceClick(preference)}
          >
            {preference}
          </button>
        ))}
      </div>
      <div className="mt-10 flex justify-center">
        <button className="btn-success btn" onClick={handleNextPage}>
          Get me to my diet for today !
        </button>
      </div>
    </div>
  );
}
