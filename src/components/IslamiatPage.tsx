import React from "react";
import { motion } from "framer-motion";
import {
  Video,
  FlaskConical,
  UserCheck,
  BookOpen,
  GraduationCap,
  Users,
  MessageSquareText,
  FileQuestion,
  Brain,
  Map,
  ArrowLeft,
  Instagram,
  Facebook,
  Twitter,
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
      className="text-center py-10 relative bg-gradient-to-b from-purple-50 to-white" // reduced padding from py-16 to py-10
    >
      <button
        onClick={onBack}
        className="absolute left-8 top-6 flex items-center text-black hover:text-purple-600 transition-all hover:translate-x-[-5px]" // adjusted top position to match reduced padding
      >
        <ArrowLeft className="mr-1" size={20} />
        <span>Back to Home</span>
      </button>
      <motion.h2
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-5xl font-extrabold font-display bg-clip-text text-transparent bg-gradient-to-r from-purple-800 to-indigo-600 mt-2" // added small top margin
      >
        O Level Islamiat
      </motion.h2>
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-lg mt-2 font-display text-gray-700 max-w-2xl mx-auto" // reduced margin-top from mt-3 to mt-2
      >
        Master Islamic Studies with our AI-powered O Level Islamiat assistant
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
          src="/islamiat1.png"
          alt="Islamiat AI assistant preview"
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
          <span className="text-purple-600"> O Level Islamiat</span>
        </h2>
        <p className="mt-6 text-lg text-gray-600 font-display leading-relaxed">
          Our O Level Islamiat AI assistant combines traditional teaching wisdom
          with cutting-edge AI technology. Explore the Quran, Hadith, and
          Islamic history through interactive lessons, personalized AI guidance,
          and comprehensive study materials designed to help you achieve top
          grades in your exams.
        </p>
        <div className="mt-8 flex gap-4 flex-wrap">
          <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all">
            Try for free
          </button>
          <button className="px-8 py-3 border-2 border-purple-600 text-purple-600 font-bold rounded-full hover:bg-purple-50 transition-all">
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
          <span className="text-purple-600"> Islamic studies accessible</span>
        </h2>
        <p className="mt-6 text-lg text-gray-600 font-display leading-relaxed">
          We've reimagined how O Level Islamiat is taught with our advanced AI
          teacher. Our assistant breaks down complex theological concepts into
          clear, digestible segments. You can ask questions, explore topics in
          depth, and receive personalized guidance throughout your learning
          journey, just like having a dedicated Islamiat teacher available 24/7.
        </p>
        <div className="mt-8 flex gap-4 flex-wrap">
          <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all">
            Try for free
          </button>
          <button className="px-8 py-3 border-2 border-purple-600 text-purple-600 font-bold rounded-full hover:bg-purple-50 transition-all">
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
          src="/islamiat2.png"
          alt="AI-powered Islamiat assistant"
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
      icon: <MessageSquareText className="h-12 w-12 text-purple-500" />,
      title: "Personal AI Teacher",
      description:
        "Get instant answers to your questions about Islamic concepts, history, and practices from your dedicated AI teacher.",
    },
    {
      icon: <FileQuestion className="h-12 w-12 text-indigo-500" />,
      title: "Past Paper AI Assistant",
      description:
        "Our AI analyzes past papers and provides personalized guidance for exam preparation.",
    },
    {
      icon: <Brain className="h-12 w-12 text-violet-500" />,
      title: "Interactive Quizzes",
      description:
        "Test your knowledge with adaptive quizzes generated by the AI that focus on your improvement areas.",
    },
    {
      icon: <Map className="h-12 w-12 text-blue-500" />,
      title: "Topic Explorer",
      description:
        "Navigate through Islamic topics with our AI-guided interactive concept maps.",
    },
    {
      icon: <Video className="h-12 w-12 text-purple-500" />,
      title: "Video Explanations",
      description:
        "Request AI-generated explanations on any topic in the O Level syllabus.",
    },
    {
      icon: <BookOpen className="h-12 w-12 text-indigo-500" />,
      title: "AI-Generated Study Materials",
      description:
        "Access detailed study materials and revision guides tailored to your learning pace.",
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
          Your <span className="text-purple-600">AI Islamiat teacher</span> at
          your fingertips
        </h2>
        <p className="mt-6 text-lg text-gray-600 mx-auto max-w-3xl">
          Our innovative approach combines traditional Islamic scholarship with
          modern AI technology to create a teaching experience that's both
          authentic and effective.
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
            className="p-8 rounded-2xl text-left flex items-start gap-5 bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-purple-100 transition-all duration-300"
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

// Islamiat Page Component
interface IslamiatPageProps {
  onBack: () => void;
  onLogin?: () => void;
  onSignup?: () => void;
}

const IslamiatPage: React.FC<IslamiatPageProps> = ({
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

export default IslamiatPage;
