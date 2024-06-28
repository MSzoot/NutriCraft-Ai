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
      <div className="px-6 text-center">
        <Chat />
      </div>
    </div>
  );
}
