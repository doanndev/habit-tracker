
import React from 'react';

const FeaturesSection: React.FC = () => {
  const features = [
    { title: "Daily Tracking", desc: "One-click check-ins for your daily habits. Lightning fast and satisfying.", icon: "⚡" },
    { title: "Streak Visualization", desc: "Gamify your progress with streak counters that motivate you to keep going.", icon: "🔥" },
    { title: "Progress Analytics", desc: "Deep dive into your monthly patterns with beautiful, actionable charts.", icon: "📊" },
    { title: "Smart Reminders", desc: "Gentle nudges when you're about to miss a habit. Custom schedule supported.", icon: "🔔" },
    { title: "Privacy First", desc: "Your data is yours. End-to-end encrypted and never sold to third parties.", icon: "🛡️" },
    { title: "Sync Across Devices", desc: "Access your habits on desktop, tablet, or mobile. Always in sync.", icon: "🔄" }
  ];

  return (
    <section id="features" className="py-24 px-6 bg-slate-50">
      <div className="max-w-7xl mx-auto text-center mb-20 scroll-reveal">
        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">Everything you need to succeed</h2>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto">
          Thoughtfully designed features to keep you moving toward your goals, without the clutter.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <div
            key={i}
            className="p-8 bg-white rounded-3xl border border-slate-100 hover:border-blue-200 hover:shadow-xl transition-all group scroll-reveal"
          >
            <div className="text-4xl mb-6 group-hover:scale-110 transition-transform inline-block">{f.icon}</div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">{f.title}</h3>
            <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
