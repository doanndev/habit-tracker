
import React from 'react';

const HowItWorks: React.FC = () => {
  const steps = [
    { num: 1, title: "Create Habits", desc: "Define your goals, frequency, and custom reminders in seconds." },
    { num: 2, title: "Check In Daily", desc: "Open the app for 5 seconds a day to log your completed activities." },
    { num: 3, title: "Review Progress", desc: "Watch your grid fill up and analyze your streaks to stay motivated." }
  ];

  return (
    <section id="how-it-works" className="py-24 px-6 bg-white scroll-reveal">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">Three steps to a better you</h2>
          <p className="text-xl text-slate-500">Simplicity is at the core of everything we build.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-16 relative">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-slate-100 -translate-y-12 z-0" />
          
          {steps.map((s, i) => (
            <div key={i} className="relative z-10 text-center flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-white border-2 border-blue-600 flex items-center justify-center text-3xl font-extrabold text-blue-600 mb-8 shadow-xl shadow-blue-50">
                {s.num}
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">{s.title}</h3>
              <p className="text-slate-500 leading-relaxed px-4">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
