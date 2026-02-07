
import React from 'react';

const UseCases: React.FC = () => {
  const cases = [
    { label: "Students", desc: "Track study hours, daily assignments, and focus sessions.", color: "bg-blue-50 text-blue-700" },
    { label: "Developers", desc: "Stay consistent with LeetCode, side projects, and documentation.", color: "bg-indigo-50 text-indigo-700" },
    { label: "Fitness", desc: "Log gym sessions, hydration, and meal prepping routines.", color: "bg-emerald-50 text-emerald-700" },
    { label: "Personal Growth", desc: "Cultivate meditation, reading, and journaling habits.", color: "bg-amber-50 text-amber-700" }
  ];

  return (
    <section id="solutions" className="py-24 px-6 bg-slate-50 scroll-reveal">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">Tailored for your journey</h2>
          <p className="text-xl text-slate-500">Whether you’re coding, studying, or creating, we’ve got you covered.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cases.map((c, i) => (
            <div key={i} className={`p-8 rounded-3xl ${c.color.split(' ')[0]} border border-white transition-all hover:scale-[1.02] cursor-default`}>
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6 ${c.color.split(' ')[1]} bg-white/50`}>
                {c.label}
              </span>
              <p className="font-medium text-slate-700 leading-relaxed">
                {c.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCases;
