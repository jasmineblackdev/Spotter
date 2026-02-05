import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SpotFeed from "./SpotFeed";

const Index = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const hasCompletedOnboarding = localStorage.getItem("spotter_onboarding_complete");
    if (!hasCompletedOnboarding) {
      navigate("/onboarding", { replace: true });
    } else {
      setIsLoading(false);
    }
  }, [navigate]);

  if (isLoading) {
    return null;
  }

  return <SpotFeed />;
};

export default Index;
