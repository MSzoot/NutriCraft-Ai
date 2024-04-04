import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/input");
  };

  localStorage.clear();

  return (
    <div className="text-center">
      <h1 className="mb-20 py-6 text-center text-2xl">
        Fuel your desires, shape your body – Let AI tailor your tasty diet for
        today
      </h1>
      <button className="btn-primary btn" onClick={handleGetStarted}>
        Get Started
      </button>
    </div>
  );
}
