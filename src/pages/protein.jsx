import { useState } from "react";
import proteinOptions from "../components/ProteinOptions";
import FoodPreferencePage from "./preferences";

export default function Protein() {
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

  const dietType = localStorage.getItem("foodPreference");

  return (
    <div>
      <h2>Choose Your Food Preferences</h2>
      <div>
        {proteinOptions[dietType].map((preference, index) => (
          <button
            key={index}
            className={`btn${
              selectedPreferences[preference] ? " btn-primary" : ""
            }`}
            onClick={() => handlePreferenceClick(preference)}
          >
            {preference}
          </button>
        ))}
      </div>
      {/* <h3>Selected Food Preferences:</h3>
      <ul>
        {Object.keys(selectedPreferences).map((preference) => (
          <li key={preference}>{preference}</li>
        ))}
      </ul> */}
    </div>
  );
}
