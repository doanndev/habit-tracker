
import React from 'react';

const ProblemSection: React.FC = () => {
  const problems = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Losing Motivation",
      desc: "Without visual progress, it's easy to lose interest after the first few days of starting a new routine.",
      color: "text-red-600",
      bg: "bg-red-50"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      title: "Forgetting Tasks",
      desc: "Out of sight, out of mind. Life gets busy and habits slip through the cracks when not reminded.",
      color: "text-amber-600",
      bg: "bg-amber-50"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
      title: "Lack of Visibility",
      desc: "Traditional apps overwhelm you. You need a clear bird's-eye view of your consistency over time.",
      color: "text-blue-600",
      bg: "bg-blue-50"
    }
  ];

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto text-center mb-16 scroll-reveal">
        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">Stop breaking the chain</h2>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
          Traditional habit tracking is boring and tedious. HabitFlow makes progress visual and rewarding.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
        {problems.map((p, i) => (
          <div
            key={i}
            className="group p-10 bg-white border border-slate-100 rounded-3xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-slate-200 scroll-reveal"
          >
            <div className={`w-14 h-14 ${p.bg} ${p.color} rounded-2xl flex items-center justify-center mb-8 transition-transform group-hover:scale-110`}>
              {p.icon}
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">{p.title}</h3>
            <p className="text-slate-500 leading-relaxed">{p.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProblemSection;
