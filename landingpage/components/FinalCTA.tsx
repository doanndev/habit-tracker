
import React from 'react';

const FinalCTA: React.FC = () => {
  return (
    <section className="py-24 px-6 bg-white scroll-reveal">
      <div className="max-w-5xl mx-auto relative overflow-hidden bg-slate-900 rounded-[3rem] p-12 md:p-24 text-center">
        {/* Decorator */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10">
          <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-8 tracking-tight">Consistency beats motivation.</h2>
          <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Don’t wait for inspiration. Start building the systems that lead to success.
          </p>
          
          <button className="bg-blue-600 text-white px-10 py-5 rounded-2xl text-lg font-bold hover:bg-blue-700 transition-all shadow-2xl shadow-blue-500/20 transform hover:-translate-y-1">
            Create Your First Habit
          </button>
          
          <p className="mt-8 text-sm text-slate-500">
            Free forever for up to 3 habits. No credit card required.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
