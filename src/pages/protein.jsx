import { useState, useEffect } from "react";
import proteinOptions from "../components/ProteinOptions";
import { useNavigate } from "react-router-dom";

export default function Protein() {
  const navigate = useNavigate();

  const handleNextPage = () => {
    navigate("/Carbs");
  };
  //
  //
  //get information about preference from local stroage
  const dietType = localStorage.getItem("foodPreference");
  const [selectedFood, setSelectedFood] = useState([]);
  //
  //
  // load food preferences from local storage , this prevents choices to disappear when the user goes back to do some changes
  useEffect(() => {
    const storedFood = JSON.parse(localStorage.getItem("selectedFood"));
    if (storedFood) {
      setSelectedFood(storedFood);
    }
  }, []);
  //
  //
  // hande click on food
  const handlePreferenceClick = (preference) => {
    // check if the preference(food item) is already selected / it returns true of false
    const isAlreadySelected = selectedFood.includes(preference);

    // Toggle the preference selection , when is already selected remove it when clicked, if not selected add this to existing array
    let updatedFood;
    if (isAlreadySelected) {
      updatedFood = selectedFood.filter((item) => item !== preference);
    } else {
      updatedFood = [...selectedFood, preference];
    }

    // Update the state with the new selected food
    setSelectedFood(updatedFood);

    // Save selected food to local storage
    localStorage.setItem("selectedFood", JSON.stringify(updatedFood));
  };

  return (
    <div className="py-6">
      <h1 className="mb-10 py-6 text-center text-2xl">
        Choose protein sources you enjoy:
      </h1>
      <div className="mx-auto flex w-10/12 flex-wrap justify-center gap-4">
        {proteinOptions[dietType].map((preference, index) => (
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
          Let me choose some carbs sources now!
        </button>
      </div>
    </div>
  );
}
