import React from "react";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import StatsFeatures from "./StatsFeatures";
import FeaturesSection from "./FeaturesSection";
import { ThreeStepsSection } from "./ThreeStepsSection";
import { TransformSection } from "./TransformSection";
import { SuccessStoriesSection } from "./SuccessStoriesSection";
import { QuestionsSection } from "./QuestionsSection";

interface HomePageProps {
  onLogin: () => void;
  onSignup: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onLogin, onSignup }) => {
  return (
    <div>
      <Navbar onLogin={onLogin} onSignup={onSignup} />
      <HeroSection />
      <StatsFeatures />
      <FeaturesSection />
      <ThreeStepsSection />
      <TransformSection />
      <SuccessStoriesSection />
      <QuestionsSection />
    </div>
  );
};

export default HomePage;
