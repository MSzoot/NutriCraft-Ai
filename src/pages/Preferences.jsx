import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Preferences = () => {
  const navigate = useNavigate();

  const [selectedPreference, setSelectedPreference] = useState("");

  // set a new state and save this to local storage
  const handlePreferenceSelection = (preference) => {
    setSelectedPreference(preference);
    localStorage.setItem("foodPreference", preference);
  };

  const handleNextPage = () => {
    navigate("/protein");
  };

  return (
    <div>
      <h1 className="mb-10 py-6 text-center text-2xl">Who you are ??</h1>
      <div className="flex flex-col items-center justify-center gap-10">
        <button
          onClick={() => handlePreferenceSelection("meat")}
          className={
            selectedPreference === "meat" ? "btn-primary btn w-32" : "btn w-32"
          }
        >
          Meat Eater
        </button>
        <button
          onClick={() => handlePreferenceSelection("vegetarian")}
          className={
            selectedPreference === "vegetarian"
              ? "btn-primary btn w-32"
              : "btn w-32"
          }
        >
          Vegetarian
        </button>
        <button
          onClick={() => handlePreferenceSelection("vegan")}
          className={
            selectedPreference === "vegan" ? "btn-primary btn w-32" : "btn w-32"
          }
        >
          Vegan
        </button>
      </div>
      <div className="mt-20 flex justify-center">
        {selectedPreference && (
          <button className="btn-success btn" onClick={handleNextPage}>
            Choose you food
          </button>
        )}
      </div>
    </div>
  );
};

export default Preferences;
