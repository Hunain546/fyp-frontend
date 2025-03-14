import React, { useState } from "react";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import StatsFeatures from "./StatsFeatures";
import FeaturesSection from "./FeaturesSection";
import { ThreeStepsSection } from "./ThreeStepsSection";
import { TransformSection } from "./TransformSection";
import { SuccessStoriesSection } from "./SuccessStoriesSection";
import { QuestionsSection } from "./QuestionsSection";
import Footer from "./Footer";
import IslamiatPage from "../components/IslamiatPage";
import HistoryPage from "../components/HistoryPage";
import GeographyPage from "../components/GeographyPage";

interface HomePageProps {
  onLogin: () => void;
  onSignup: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onLogin, onSignup }) => {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  const handleSubjectSelect = (subject: string) => {
    setSelectedSubject(subject);
  };

  const handleBackToHome = () => {
    setSelectedSubject(null);
  };

  // Render specific subject page based on selection
  if (selectedSubject === "Islamiat") {
    return <IslamiatPage onBack={handleBackToHome} />;
  }

  if (selectedSubject === "History") {
    return <HistoryPage onBack={handleBackToHome} />;
  }

  if (selectedSubject === "Geography") {
    return <GeographyPage onBack={handleBackToHome} />;
  }

  return (
    <div>
      <Navbar
        onLogin={onLogin}
        onSignup={onSignup}
        onSubjectSelect={handleSubjectSelect}
      />
      <HeroSection />
      <StatsFeatures />
      <FeaturesSection />
      <ThreeStepsSection />
      <TransformSection />
      <SuccessStoriesSection />
      <QuestionsSection />
      <Footer />
    </div>
  );
};

export default HomePage;
