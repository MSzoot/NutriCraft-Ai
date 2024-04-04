import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Input() {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/preferences");
  };

  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("male");
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [activityLevel, setActivityLevel] = useState("sedentary");
  const [target, setTarget] = useState("maintain");
  const [tdee, setTDEE] = useState(null);

  useEffect(() => {
    if (tdee) {
      localStorage.setItem("tdee", tdee.toFixed(0));
      localStorage.setItem("macros", JSON.stringify(calculateMacros()));
    }
  }, [tdee, target]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const tdeeValue = calculateTDEE(age, gender, weight, height, activityLevel);
    setTDEE(tdeeValue);
  };

  const calculateTDEE = (age, gender, weight, height, activityLevel) => {
    let tdeeValue = 0;
    // Calculate BMR based on age, body type, weight, and height
    let bmr;
    if (gender === "male") {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }
    // Calculate TDEE based on activity level
    if (activityLevel === "sedentary") {
      tdeeValue = bmr * 1.2;
    } else if (activityLevel === "lightlyActive") {
      tdeeValue = bmr * 1.375;
    } else if (activityLevel === "moderatelyActive") {
      tdeeValue = bmr * 1.55;
    } else if (activityLevel === "veryActive") {
      tdeeValue = bmr * 1.725;
    } else if (activityLevel === "extraActive") {
      tdeeValue = bmr * 1.9;
    }
    return tdeeValue;
  };

  const calculateMacros = () => {
    let proteinRatio, carbsRatio, fatRatio;

    if (target === "lose") {
      proteinRatio = 40;
      carbsRatio = 30;
      fatRatio = 30;
    } else if (target === "gain") {
      proteinRatio = 30;
      carbsRatio = 50;
      fatRatio = 20;
    } else {
      // maintain
      proteinRatio = 35;
      carbsRatio = 45;
      fatRatio = 20;
    }

    const protein = tdee * (proteinRatio / 100 / 4);
    const carbs = tdee * (carbsRatio / 100 / 4);
    const fat = tdee * (fatRatio / 100 / 9);

    return { protein, carbs, fat };
  };

  return (
    <div className="p-6">
      {tdee < 800 && (
        <h1 className="py-6 text-center text-2xl">
          Give us some details about yourself:
        </h1>
      )}
      <div className="flex items-center justify-center">
        {tdee < 800 && (
          <div className="border border-base-200 p-6">
            <form onSubmit={handleSubmit}>
              <label>
                Age - {age}
                <input
                  type="range"
                  min={0}
                  max="100"
                  className="range mb-4"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </label>

              <br />
              <label>
                Weight - {weight}kg
                <input
                  type="range"
                  min={0}
                  max="300"
                  className="range mb-4"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </label>
              <br />
              <label>
                Height - {height}cm
                <input
                  type="range"
                  min={0}
                  max="240"
                  className="range mb-4"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                />
              </label>
              <br />
              <label>
                Body type:
                <select
                  className="select select-sm mx-4 mb-2 w-24"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option disabled defaultValue>
                    Select Body
                  </option>
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </label>
              <br />
              <label>
                Activity Level:
                <select
                  className="select select-sm mx-4 mb-2"
                  value={activityLevel}
                  onChange={(e) => setActivityLevel(e.target.value)}
                >
                  <option disabled defaultValue>
                    How active you are ?
                  </option>
                  <option value="sedentary">Sedentary</option>
                  <option value="lightlyActive">Lightly Active</option>
                  <option value="moderatelyActive">Moderately Active</option>
                  <option value="veryActive">Very Active</option>
                  <option value="extraActive">Extra Active</option>
                </select>
              </label>
              <br />
              <label>
                Your goal :
                <select
                  className="w-42 select select-sm mx-4 "
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
                >
                  <option disabled defaultValue>
                    What is your goal ?
                  </option>
                  <option value="maintain">Maintain Weight</option>
                  <option value="lose">Lose Weight</option>
                  <option value="gain">Gain Weight</option>
                </select>
              </label>
              <br />
              <div className="flex justify-center">
                <button className="btn-primary btn mt-6" type="submit">
                  Calculate TDEE
                </button>
              </div>
            </form>
          </div>
        )}
        {tdee >= 800 && (
          <div className="border border-base-200 p-6 text-center">
            <h2 className="my-12 text-xl">
              Your need {tdee.toFixed(0)}kcal every day !
            </h2>
            <div>
              <p className="mb-6">Perfect daily macro for you : </p>
              <ul>
                <li>Protein - {calculateMacros().protein.toFixed(0)}g</li>
                <li>Carbs - {calculateMacros().carbs.toFixed(0)}g</li>
                <li>Fat - {calculateMacros().fat.toFixed(0)}g</li>
              </ul>
            </div>
            <button className="btn-primary btn my-6" onClick={handleNavigation}>
              Choose your food
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
