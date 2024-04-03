import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/input");
  };

  return (
    <div className="text-center">
      <p className="p-6">
        Fuel your desires, shape your body – Let AI tailor your tasty diet for
        today
      </p>
      <button className="btn-primary btn" onClick={handleGetStarted}>
        Get Started
      </button>
    </div>
  );
}
