import React, { useState } from 'react';
import { Book, Search, Tag } from 'lucide-react';
import { Topic } from '../types';
import { subjectTopics } from '../data/topics';

interface PracticeModeProps {
  subject: string;
  onBack: () => void;
  onStartPractice: (topic: Topic) => void;
}

const PracticeMode: React.FC<PracticeModeProps> = ({ subject, onBack, onStartPractice }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const topics = subjectTopics[subject] || [];

  const filteredTopics = topics.filter(topic =>
    topic.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    topic.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-[calc(100vh-12rem)]">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">{subject} Practice Mode</h2>
        <button
          onClick={onBack}
          className="text-gray-600 hover:text-gray-900 text-sm font-medium"
        >
          ← Back to Dashboard
        </button>
      </div>
      
      <div className="bg-white rounded-2xl shadow-sm border p-6">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-indigo-100 rounded-xl text-indigo-600">
              <Book className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Topic-Based Practice</h3>
              <p className="text-sm text-gray-600">Select a topic to generate practice questions</p>
            </div>
          </div>

          <div className="relative mb-6">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search topics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="grid gap-4">
            {filteredTopics.map((topic) => (
              <button
                key={topic.id}
                onClick={() => onStartPractice(topic)}
                className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 hover:border-indigo-200 hover:bg-indigo-50 transition-colors text-left group"
              >
                <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600 group-hover:bg-indigo-200">
                  <Tag className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{topic.name}</h4>
                  <p className="text-sm text-gray-600">{topic.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PracticeMode;