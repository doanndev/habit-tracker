
import React from 'react';

const HabitGridSection: React.FC = () => {
  const habits = [
    { name: "Morning Meditation", color: "bg-blue-600", lightColor: "bg-blue-100", data: [1,1,1,0,1,1,1,1,0,1,1,1,0,0,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1] },
    { name: "Read 20 Pages", color: "bg-emerald-500", lightColor: "bg-emerald-100", data: [1,0,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,0,1,1,1,1,1,1,1,0,1,1,1,1] },
    { name: "Exercise", color: "bg-indigo-500", lightColor: "bg-indigo-100", data: [0,1,1,0,1,1,0,1,1,0,1,1,0,1,1,0,1,1,0,1,1,0,1,1,0,1,1,0,1,1,0] },
  ];

  return (
    <section className="py-24 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto scroll-reveal">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">See your progress at a glance</h2>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto">
            The "contribution" style grid provides immediate visual satisfaction for your hard work.
          </p>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-[2rem] p-8 md:p-12 shadow-inner">
          <div className="overflow-x-auto">
            <div className="min-w-[800px] space-y-8">
              {habits.map((h, i) => (
                <div key={i} className="flex items-center gap-6">
                  <div className="w-40 shrink-0">
                    <span className="text-sm font-semibold text-slate-600 uppercase tracking-wider">{h.name}</span>
                  </div>
                  <div className="flex gap-1">
                    {h.data.map((day, di) => (
                      <div
                        key={di}
                        className={`w-4 h-4 rounded-sm transition-all duration-300 hover:scale-150 cursor-pointer ${
                          day === 1 ? h.color : day === 0 ? h.lightColor : 'bg-slate-200'
                        }`}
                        title={`Day ${di + 1}: ${day === 1 ? 'Completed' : 'Missed'}`}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm font-medium text-slate-500 pt-8 border-t border-slate-200">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-blue-600"></div>
              <span>Completed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-blue-100"></div>
              <span>Missed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-slate-200"></div>
              <span>Pending</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HabitGridSection;
