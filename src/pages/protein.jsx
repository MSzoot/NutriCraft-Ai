import { useState } from "react";
import proteinOptions from "../components/ProteinOptions";
import { useNavigate } from "react-router-dom";

export default function Protein() {
  const navigate = useNavigate();
  const dietType = localStorage.getItem("foodPreference");
  const [selectedPreferences, setSelectedPreferences] = useState({});

  const handlePreferenceClick = (preference) => {
    // Toggle the preference selection
    setSelectedPreferences((prevPreferences) => {
      if (prevPreferences[preference]) {
        const { [preference]: removed, ...rest } = prevPreferences;
        return rest;
      } else {
        return { ...prevPreferences, [preference]: true };
      }
    });
  };

  const handleNextPage = () => {
    navigate("/protein");
  };

  console.log(selectedPreferences);
  return (
    <div>
      <h1 className="mb-10 py-6 text-center text-2xl">
        Choose protein sources you enjoy:
      </h1>
      <div className="mx-auto flex w-10/12 flex-wrap justify-center gap-4">
        {proteinOptions[dietType].map((preference, index) => (
          <button
            key={index}
            className={`btn ${
              selectedPreferences[preference] ? " btn-primary" : ""
            }`}
            onClick={() => handlePreferenceClick(preference)}
          >
            {preference}
          </button>
        ))}
      </div>
      <div className="mt-10 flex justify-center">
        <button className="btn-secondary btn" onClick={handleNextPage}>
          Let me choose some carbs now !
        </button>
      </div>
    </div>
  );
}
