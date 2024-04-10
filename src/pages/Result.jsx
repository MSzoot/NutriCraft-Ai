// import ChatGPTIntegration from "../components/gpt";

import Chat from "../components/Chat";

export default function Result() {
  const tdee = localStorage.getItem("tdee");
  const macros = JSON.parse(localStorage.getItem("macros"));
  const proteins = macros.protein.toFixed(0);
  const carbs = macros.carbs.toFixed(0);
  const fat = macros.fat.toFixed(0);

  return (
    <div>
      <div className="p-6 text-center">
        <h2 className="my-12 text-xl">Your diet plan for today:</h2>
        <h2 className="my-12 text-xl">{tdee}kcal</h2>
        <div>
          <ul>
            <li>Protein - {proteins}g</li>
            <li>Carbs - {carbs}g</li>
            <li>Fat - {fat}g</li>
          </ul>
        </div>
        <Chat />
      </div>
    </div>
  );
}
