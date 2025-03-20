import React from "react";
import { motion } from "framer-motion";
import {
  Video,
  BookOpen,
  Globe,
  Map,
  Mountain,
  ArrowLeft,
  Instagram,
  Facebook,
  Twitter,
  FileQuestion,
  Brain,
  Cloud,
  TrendingUp,
  LineChart,
} from "lucide-react";
import Navbar from "../landing/Navbar";
import Footer from "../landing/Footer";

// Hero Section Component with Back Button
const HeroSection: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center py-10 relative bg-gradient-to-b from-green-50 to-white"
    >
      <button
        onClick={onBack}
        className="absolute left-8 top-6 flex items-center text-black hover:text-green-600 transition-all hover:translate-x-[-5px]"
      >
        <ArrowLeft className="mr-1" size={20} />
        <span>Back to Home</span>
      </button>
      <motion.h2
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-5xl font-extrabold font-display bg-clip-text text-transparent bg-gradient-to-r from-green-800 to-teal-600 mt-2"
      >
        O Level Geography
      </motion.h2>
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-lg mt-2 font-display text-gray-700 max-w-2xl mx-auto"
      >
        Discover our planet with our AI-powered O Level Geography assistant
      </motion.p>
    </motion.section>
  );
};

// Course Section Component
const CourseSection: React.FC = () => {
  return (
    <section className="py-20 px-10 flex flex-col md:flex-row items-center justify-between bg-white">
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="w-full md:w-1/2 mb-10 md:mb-0"
      >
        <img
          src="/geography1.png"
          alt="Geography AI assistant preview"
          className="w-full rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
        />
      </motion.div>
      <motion.div
        initial={{ x: 50, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="w-full md:w-1/2 md:pl-16"
      >
        <h2 className="text-3xl md:text-4xl font-extrabold font-display">
          Your path to excellence in
          <span className="text-green-600"> O Level Geography</span>
        </h2>
        <p className="mt-6 text-lg text-gray-600 font-display leading-relaxed">
          Our O Level Geography AI assistant combines physical and human
          geography concepts with interactive learning experiences. From
          landforms to urban settlements, climate patterns to economic
          development, our AI guides you through comprehensive materials
          designed to help you achieve top grades in your exams.
        </p>
        <div className="mt-8 flex gap-4 flex-wrap">
          <button className="px-8 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white font-bold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all">
            Try for free
          </button>
          <button className="px-8 py-3 border-2 border-green-600 text-green-600 font-bold rounded-full hover:bg-green-50 transition-all">
            Get Started
          </button>
        </div>
      </motion.div>
    </section>
  );
};

// Video Lessons Section Component
const VideoLessonSection: React.FC = () => {
  return (
    <section className="py-20 px-10 flex flex-col-reverse md:flex-row items-center justify-between bg-gray-50">
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="w-full md:w-1/2 md:pr-16 mt-10 md:mt-0"
      >
        <h2 className="text-3xl md:text-4xl font-extrabold font-display">
          AI teacher makes
          <span className="text-green-600"> geographic concepts visual</span>
        </h2>
        <p className="mt-6 text-lg text-gray-600 font-display leading-relaxed">
          We've transformed how O Level Geography is taught with our advanced AI
          teacher. Complex geographical processes are visualized through
          interactive maps, diagrams, and models. Ask questions about any
          geographical topic, analyze case studies, and receive personalized
          guidance – like having a dedicated Geography teacher available 24/7.
        </p>
        <div className="mt-8 flex gap-4 flex-wrap">
          <button className="px-8 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white font-bold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all">
            Try for free
          </button>
          <button className="px-8 py-3 border-2 border-green-600 text-green-600 font-bold rounded-full hover:bg-green-50 transition-all">
            Get Started
          </button>
        </div>
      </motion.div>
      <motion.div
        initial={{ x: 50, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="w-full md:w-1/2"
      >
        <img
          src="/geography2.png"
          alt="AI-powered Geography assistant"
          className="w-full rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
        />
      </motion.div>
    </section>
  );
};

// Features Section Component
const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: <Globe className="h-12 w-12 text-green-500" />,
      title: "Interactive World Maps",
      description:
        "Explore dynamic maps that visualize demographic, economic, and environmental patterns across the globe.",
    },
    {
      icon: <FileQuestion className="h-12 w-12 text-teal-500" />,
      title: "Past Paper AI Assistant",
      description:
        "Our AI analyzes past exam papers to provide targeted practice and personalized feedback for exam preparation.",
    },
    {
      icon: <Brain className="h-12 w-12 text-green-500" />,
      title: "Case Study Analysis",
      description:
        "Learn to analyze and apply geographical case studies to exam questions with AI guidance.",
    },
    {
      icon: <Mountain className="h-12 w-12 text-teal-500" />,
      title: "Landform Visualizer",
      description:
        "Interactive 3D models help you understand erosion processes, tectonic activity, and landscape formation.",
    },
    {
      icon: <Cloud className="h-12 w-12 text-green-500" />,
      title: "Climate Pattern Simulator",
      description:
        "Visualize weather systems, climate zones, and atmospheric processes with our interactive tools.",
    },
    {
      icon: <LineChart className="h-12 w-12 text-teal-500" />,
      title: "Data Interpretation Skills",
      description:
        "Develop skills to analyze geographical data, statistics, and trends with guided practice.",
    },
  ];

  return (
    <section className="py-20 px-10 bg-white text-center">
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl md:text-4xl font-extrabold font-display">
          Your <span className="text-green-600">AI Geography teacher</span> at
          your fingertips
        </h2>
        <p className="mt-6 text-lg text-gray-600 mx-auto max-w-3xl">
          Our innovative approach combines geographical expertise with
          cutting-edge AI technology to create a learning experience that's both
          visual and effective.
        </p>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="p-8 rounded-2xl text-left flex items-start gap-5 bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-green-100 transition-all duration-300"
            whileHover={{ y: -5 }}
          >
            <div className="p-3 rounded-xl bg-gray-50">{feature.icon}</div>
            <div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

// Geography Page Component
interface GeographyPageProps {
  onBack: () => void;
  onLogin?: () => void;
  onSignup?: () => void;
}

const GeographyPage: React.FC<GeographyPageProps> = ({
  onBack,
  onLogin,
  onSignup,
}) => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar
        onLogin={onLogin || (() => {})}
        onSignup={onSignup || (() => {})}
        onSubjectSelect={(subject) => {}}
      />
      <HeroSection onBack={onBack} />
      <CourseSection />
      <VideoLessonSection />
      <FeaturesSection />
      <Footer />
    </div>
  );
};

export default GeographyPage;
