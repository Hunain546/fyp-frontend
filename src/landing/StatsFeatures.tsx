import React from "react";
import { motion } from "framer-motion";
import { Trophy, Users, Clock, GraduationCap } from "lucide-react";

const StatsFeatures = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  const stats = [
    {
      value: "101",
      label: "Countries Reached",
      icon: Users,
      gradient: "from-blue-500 to-purple-600",
      lightGradient: "from-blue-50 to-purple-50",
    },
    {
      value: "94%",
      label: "Student Success Rate",
      icon: Trophy,
      gradient: "from-orange-500 to-pink-600",
      lightGradient: "from-orange-50 to-pink-50",
    },
    {
      value: "29M",
      label: "Learning Minutes",
      icon: Clock,
      gradient: "from-green-500 to-teal-600",
      lightGradient: "from-green-50 to-teal-50",
    },
    {
      value: "20+",
      label: "Years Experience",
      icon: GraduationCap,
      gradient: "from-purple-500 to-indigo-600",
      lightGradient: "from-purple-50 to-indigo-50",
    },
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-purple-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4 font-display">
            Trusted by Students{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent font-display">
              Worldwide
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-display">
            Join thousands of students who have already transformed their
            learning journey with our platform
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                variants={item}
                className={`relative group`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${stat.lightGradient} rounded-2xl transform rotate-1 transition-transform group-hover:rotate-2`}
                />
                <div className="relative p-8 bg-white rounded-2xl shadow-lg border border-gray-100 transform transition-transform group-hover:-translate-y-1">
                  <div
                    className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${stat.gradient} mb-4`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3
                    className={`text-4xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-2 font-display`}
                  >
                    {stat.value}
                  </h3>
                  <p className="text-gray-600 font-medium font-display">
                    {stat.label}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-sm text-gray-500 mb-4 font-display">
            TRUSTED BY TOP INSTITUTIONS
          </p>
          <div className="flex flex-wrap justify-center items-center gap-14">
            {[
              "/logo1.png",
              "/logo2.png",
              "/logo3.png",
              "/logo4.png",
              "/logo5.png",
            ].map((logo, i) => (
              <img
                key={i}
                src={logo}
                alt={`Logo ${i + 1}`}
                className="w-42 h-14 object-contain animate-pulse"
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StatsFeatures;
