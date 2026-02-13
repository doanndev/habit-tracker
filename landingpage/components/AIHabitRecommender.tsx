
import React, { useState } from 'react';
import { getHabitRecommendations, HabitRecommendation } from '../services/geminiService';

const AIHabitRecommender: React.FC = () => {
  const [goal, setGoal] = useState('');
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<HabitRecommendation[]>([]);

  const handleSuggest = async (e: React.FormEvent) => {
    e.preventDefault();
    // if (!goal.trim()) return;
    // setLoading(true);
    // const results = await getHabitRecommendations(goal);
    // setRecommendations(results);
    // setLoading(false);
  };

  return (
    <section className="py-24 px-6 bg-blue-600 scroll-reveal">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-1.5 bg-blue-500 text-white text-xs font-bold uppercase tracking-widest rounded-full mb-6">
            Powered by Gemini
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Not sure where to start?</h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Tell us your main goal, and our AI will suggest the perfect atomic habits to get you there.
          </p>
        </div>

        <form onSubmit={handleSuggest} className="flex flex-col md:flex-row gap-4 mb-12">
          <input
            type="text"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            placeholder="e.g. Become a better runner, learn French, write a book..."
            className="flex-1 px-6 py-4 rounded-2xl border-none text-slate-900 focus:ring-2 focus:ring-blue-400 placeholder:text-slate-400"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-4 bg-white text-blue-600 font-bold rounded-2xl hover:bg-blue-50 transition-all disabled:opacity-50 shadow-xl"
          >
            {loading ? 'Thinking...' : 'Get AI Suggestions'}
          </button>
        </form>

        {recommendations.length > 0 && (
          <div className="grid md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {recommendations.map((rec, i) => (
              <div key={i} className="bg-blue-700/50 backdrop-blur-sm p-6 rounded-2xl border border-blue-400/30 text-white">
                <h4 className="text-lg font-bold mb-2">✨ {rec.habit}</h4>
                <p className="text-blue-100 text-sm leading-relaxed">{rec.reason}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AIHabitRecommender;
