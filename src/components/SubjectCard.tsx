import React from "react";
import { ArrowRight } from "lucide-react";

interface SubjectCardProps {
  subject: string;
  icon: React.ReactNode;
  color: string;
  onClick: () => void;
}

const SubjectCard: React.FC<SubjectCardProps> = ({
  subject,
  icon,
  color,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`relative ${color} p-6 rounded-xl text-white w-full text-left transform transition-transform duration-300 hover:scale-105 active:scale-95 shadow-xl hover:shadow-2xl group`}
    >
      {/* Icon and Arrow Section */}
      <div className="flex justify-between items-center">
        <div className="p-4 bg-white/10 rounded-lg flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110">
          {icon}
        </div>
        <div className="p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300 flex items-center justify-center shadow-md group-hover:shadow-lg">
          <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
        </div>
      </div>

      {/* Subject Section */}
      <h3 className="text-lg font-semibold mt-4 leading-snug group-hover:tracking-wide transition-all duration-300">
        {subject}
      </h3>
    </button>
  );
};

export default SubjectCard;
