// import ChatGPTIntegration from "../components/gpt";

export default function Result() {
  const tdee = localStorage.getItem("tdee");
  const macros = JSON.parse(localStorage.getItem("macros"));
  const proteins = macros.protein.toFixed(0);
  const carbs = macros.carbs.toFixed(0);
  const fat = macros.fat.toFixed(0);
  const foodOptions = localStorage.selectedFood;
  console.log(proteins, carbs, fat);
  console.log(foodOptions);
  return (
    <div>
      {tdee >= 800 && (
        <div className="border border-base-200 p-6 text-center">
          <h2 className="my-12 text-xl">Your need {tdee}kcal every day !</h2>
          <div>
            <p className="mb-6">Perfect daily macro for you : </p>
            <ul>
              <li>Protein - {proteins}g</li>
              <li>Carbs - {carbs}g</li>
              <li>Fat - {fat}g</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
// ("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");
