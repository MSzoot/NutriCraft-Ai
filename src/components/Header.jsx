import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="mb-20 mt-20 flex justify-center bg-base-100">
      <button
        className="text-center text-5xl font-bold text-primary"
        onClick={handleGoHome}
      >
        NutriCraft AI
      </button>
    </div>
  );
}
