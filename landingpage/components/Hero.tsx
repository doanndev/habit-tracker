
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-blue-50/50 to-transparent -z-10 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div className="animate-in fade-in slide-in-from-left-4 duration-1000">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 rounded-full border border-blue-100 mb-8">
            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">New</span>
            <span className="w-1 h-1 bg-blue-400 rounded-full"></span>
            <span className="text-xs font-medium text-blue-700">VISUAL HABIT MAP 2.0</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 leading-[1.1] mb-6">
            Build habits.<br />
            Track progress.<br />
            <span className="text-blue-600">Stay consistent.</span>
          </h1>

          <p className="text-xl text-slate-600 mb-10 max-w-lg leading-relaxed">
            A simple, visual habit tracker that helps you stay accountable every day. Inspired by productivity power-users.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <button className="px-8 py-4 bg-blue-600 text-white font-bold rounded-xl shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all transform hover:-translate-y-0.5">
              Start Tracking for Free
            </button>
            <button className="px-8 py-4 border border-slate-200 text-slate-700 font-bold rounded-xl bg-white hover:bg-slate-50 transition-all transform hover:-translate-y-0.5">
              View Demo
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <img
                  key={i}
                  src={`https://picsum.photos/seed/${i + 10}/100/100`}
                  alt="User"
                  className="w-8 h-8 rounded-full border-2 border-white"
                />
              ))}
            </div>
            <span className="text-sm text-slate-500 font-medium">Join 10,000+ habit builders</span>
          </div>
        </div>

        <div className="relative animate-in fade-in zoom-in duration-1000 delay-300">
          <div className="absolute inset-0 bg-blue-200/20 blur-[100px] rounded-full" />
          <div className="relative bg-white p-4 rounded-2xl shadow-2xl border border-slate-100 transform rotate-1 hover:rotate-0 transition-transform duration-500">
            <div className="bg-slate-50 rounded-lg overflow-hidden border border-slate-100">
              <img
                src="https://picsum.photos/seed/mockup/1200/800"
                alt="App Mockup"
                className="w-full h-auto"
              />
            </div>
          </div>
          {/* Floating Card */}
          <div className="absolute -bottom-10 -left-10 bg-white p-6 rounded-xl shadow-xl border border-slate-100 hidden md:block animate-bounce-slow">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">Weekly Goal</p>
                <p className="text-sm font-bold text-slate-800">12 Day Streak!</p>
              </div>
            </div>
            <div className="w-48 h-2 bg-slate-100 rounded-full">
              <div className="w-4/5 h-full bg-blue-600 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
