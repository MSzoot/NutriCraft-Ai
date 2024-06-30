import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="flex justify-center pt-20">
      <button
        className="text-center text-5xl font-bold text-primary"
        onClick={handleGoHome}
      >
        NutriCraft AI
      </button>
    </div>
  );
}
