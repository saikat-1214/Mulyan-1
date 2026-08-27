import { CheckCircle, AlertTriangle, ShieldOff, Clock, MapPin, AlertCircle as AlertCircleIcon, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Dashboard = () => {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto pb-28 md:pb-8 flex flex-col gap-6 md:gap-8 min-h-screen relative">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-[#0052ff]/5 to-transparent pointer-events-none -z-10"></div>
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-2">
        <div>
          <h2 className="font-extrabold text-gray-900 text-2xl md:text-3xl tracking-tight flex items-center">
            Authority Dashboard
            <span className="ml-3 px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] uppercase font-bold rounded flex items-center shadow-sm">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse mr-1.5"></div>
              Live
            </span>
          </h2>
          <p className="text-sm md:text-base text-gray-500 mt-1 font-medium">Active Operations & Compliance Overview</p>
        </div>
      </div>

      {/* Resolved vs. Pending Chart */}
      <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-extrabold text-gray-900 flex items-center">
            <Activity size={18} className="text-[#0052ff] mr-2" />
            Resolution Velocity
          </h3>
          <div className="flex items-center gap-4 text-xs font-bold text-gray-500">
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-md bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-sm"></div> Resolved</div>
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-md bg-gradient-to-br from-orange-400 to-orange-500 shadow-sm"></div> Pending</div>
          </div>
        </div>
        
        <div className="relative h-56 w-full flex items-end justify-between px-2 md:px-8 border-l-2 border-b-2 border-gray-100 pb-2 ml-4">
          {/* Y-axis labels */}
          <div className="absolute left-[-24px] bottom-2 top-0 flex flex-col justify-between text-[10px] text-gray-400 font-bold h-full pb-6">
            <span>90</span><span>80</span><span>70</span><span>60</span><span>50</span><span>40</span><span>30</span><span>20</span><span>10</span><span>0</span>
          </div>
          {/* Grid lines */}
          <div className="absolute left-0 right-0 top-0 bottom-8 flex flex-col justify-between pointer-events-none z-0">
             {[...Array(9)].map((_, i) => <div key={i} className="w-full h-px bg-gray-50"></div>)}
          </div>
          
          {/* Bars */}
          {[
            { month: 'Jan', res: 65, pen: 28 },
            { month: 'Feb', res: 58, pen: 48 },
            { month: 'Mar', res: 80, pen: 40 },
            { month: 'Apr', res: 81, pen: 18 },
            { month: 'May', res: 55, pen: 35 },
            { month: 'Jun', res: 82, pen: 24 }
          ].map((data, idx) => (
            <div key={idx} className="flex flex-col items-center gap-3 z-10 w-[12%] group">
              <div className="flex items-end gap-1.5 w-full justify-center h-44">
                <div className="w-4 md:w-6 bg-gradient-to-t from-emerald-500 to-emerald-300 rounded-t-xl transition-all duration-300 group-hover:opacity-100 opacity-90 shadow-sm relative overflow-hidden" style={{ height: `${data.res}%` }}>
                  <div className="absolute top-0 left-0 w-full h-1/2 bg-white/20"></div>
                </div>
                <div className="w-4 md:w-6 bg-gradient-to-t from-orange-500 to-orange-300 rounded-t-xl transition-all duration-300 group-hover:opacity-100 opacity-90 shadow-sm relative overflow-hidden" style={{ height: `${data.pen}%` }}>
                  <div className="absolute top-0 left-0 w-full h-1/2 bg-white/20"></div>
                </div>
              </div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{data.month}</span>
            </div>
          ))}
        </div>
      </div>

      {/* KPI Stack */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {/* New Cases */}
        <div className="bg-white p-5 rounded-[1.5rem] border border-blue-100/50 flex flex-col items-start relative shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,82,255,0.08)] transition-all group overflow-hidden">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-blue-50 rounded-full blur-2xl group-hover:bg-blue-100 transition-colors pointer-events-none"></div>
          <div className="w-10 h-10 rounded-[0.8rem] bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white mb-4 shadow-lg shadow-blue-500/30">
            <CheckCircle size={18} strokeWidth={2.5} />
          </div>
          <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">New Cases</span>
          <span className="text-3xl font-black text-gray-900 leading-none">24</span>
        </div>

        {/* High Priority */}
        <div className="bg-white p-5 rounded-[1.5rem] border border-red-100/50 flex flex-col items-start relative shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(225,29,72,0.08)] transition-all group overflow-hidden">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-red-50 rounded-full blur-2xl group-hover:bg-red-100 transition-colors pointer-events-none"></div>
          <div className="w-10 h-10 rounded-[0.8rem] bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center text-white mb-4 shadow-lg shadow-red-500/30">
            <AlertCircleIcon size={18} strokeWidth={2.5} />
          </div>
          <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">High Priority</span>
          <span className="text-3xl font-black text-red-600 leading-none">7</span>
        </div>

        {/* SLA Breached */}
        <div className="bg-white p-5 rounded-[1.5rem] border border-orange-100/50 flex flex-col items-start relative shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(234,88,12,0.08)] transition-all group overflow-hidden">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-orange-50 rounded-full blur-2xl group-hover:bg-orange-100 transition-colors pointer-events-none"></div>
          <div className="w-10 h-10 rounded-[0.8rem] bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-white mb-4 shadow-lg shadow-orange-500/30">
            <ShieldOff size={18} strokeWidth={2.5} />
          </div>
          <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">SLA Breached</span>
          <span className="text-3xl font-black text-orange-600 leading-none">3</span>
        </div>

        {/* Resolved */}
        <div className="bg-white p-5 rounded-[1.5rem] border border-emerald-100/50 flex flex-col items-start relative shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(16,185,129,0.08)] transition-all group overflow-hidden">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-emerald-50 rounded-full blur-2xl group-hover:bg-emerald-100 transition-colors pointer-events-none"></div>
          <div className="w-10 h-10 rounded-[0.8rem] bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white mb-4 shadow-lg shadow-emerald-500/30">
            <CheckCircle size={18} strokeWidth={2.5} />
          </div>
          <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">Resolved</span>
          <span className="text-3xl font-black text-emerald-600 leading-none">82</span>
        </div>
      </div>

      {/* Urgent Violations Overview */}
      <div className="mt-4 md:mt-6">
        <h3 className="font-extrabold text-gray-900 text-xl mb-4 md:mb-6">Urgent Violations</h3>
        
        <div className="flex flex-col gap-5 md:gap-6">
          
          {/* Complaint Card 1 (HIGH) */}
          <div className="bg-white p-6 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 relative flex flex-col overflow-hidden group hover:shadow-[0_12px_40px_rgb(0,0,0,0.06)] transition-all">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-red-500 to-rose-600"></div>
            
            <div className="flex flex-wrap items-center gap-2 mb-4 ml-1">
              <span className="bg-gray-50 text-gray-600 text-[10px] font-bold px-2.5 py-1 rounded-lg border border-gray-200 uppercase tracking-wide">CMP10291</span>
              <span className="bg-red-50 border border-red-100 text-red-600 text-[10px] font-bold px-2.5 py-1 rounded-lg flex items-center shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-red-500/10 animate-[pulse-glow_2s_infinite]"></div>
                <AlertTriangle size={10} className="mr-1 relative z-10" /> 
                <span className="relative z-10 uppercase tracking-wide">HIGH</span>
              </span>
              <span className="bg-white border border-gray-200 text-gray-700 text-[10px] font-bold px-2.5 py-1 rounded-lg shadow-sm">Overcharging</span>
            </div>
            
            <div className="mb-3 ml-1">
              <span className="inline-flex items-center gap-1.5 text-orange-600 text-[11px] font-bold uppercase tracking-wider"><MapPin size={12}/> North District</span>
            </div>
            
            <h4 className="font-extrabold text-gray-900 text-lg md:text-xl leading-tight mb-2 ml-1">Retailer Weight Discrepancy & MRP Violation</h4>
            <p className="text-sm text-gray-500 leading-relaxed mb-6 ml-1 font-medium">Citizen report indicates deliberate tampering of electronic scales and charging above declared retail price...</p>
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-gray-50/50 rounded-2xl p-2 gap-4 border border-gray-100 ml-1">
              <div className="bg-orange-50 rounded-xl p-3 flex items-center gap-3 flex-1 border border-orange-100 shadow-inner">
                <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                  <Clock size={16} className="text-orange-600" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-bold text-orange-600 uppercase tracking-widest">SLA REMAINING</span>
                  <span className="text-lg font-black text-orange-700 tracking-tight">04:59:32</span>
                </div>
              </div>
              <button className="bg-gradient-to-r from-gray-900 to-gray-800 text-white text-sm font-bold px-8 py-4 rounded-xl shadow-lg shadow-gray-900/20 hover:shadow-xl hover:shadow-gray-900/30 transition-all hover:-translate-y-0.5 whitespace-nowrap sm:ml-auto">
                Investigate Case
              </button>
            </div>
          </div>

          {/* Complaint Card 2 (MEDIUM) */}
          <div className="bg-white p-6 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 relative flex flex-col overflow-hidden group hover:shadow-[0_12px_40px_rgb(0,0,0,0.06)] transition-all">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-orange-400 to-amber-500"></div>
            
            <div className="flex flex-wrap items-center gap-2 mb-4 ml-1">
              <span className="bg-gray-50 text-gray-600 text-[10px] font-bold px-2.5 py-1 rounded-lg border border-gray-200 uppercase tracking-wide">CMP10292</span>
              <span className="bg-orange-50 border border-orange-100 text-orange-600 text-[10px] font-bold px-2.5 py-1 rounded-lg flex items-center shadow-sm">
                <AlertTriangle size={10} className="mr-1" /> 
                <span className="uppercase tracking-wide">MEDIUM</span>
              </span>
              <span className="bg-white border border-gray-200 text-gray-700 text-[10px] font-bold px-2.5 py-1 rounded-lg shadow-sm">Packaging</span>
            </div>
            
            <div className="mb-3 ml-1">
              <span className="inline-flex items-center gap-1.5 text-orange-600 text-[11px] font-bold uppercase tracking-wider"><MapPin size={12}/> East District</span>
            </div>
            
            <h4 className="font-extrabold text-gray-900 text-lg md:text-xl leading-tight mb-2 ml-1">Missing Mandatory Declarations</h4>
            <p className="text-sm text-gray-500 leading-relaxed mb-6 ml-1 font-medium">Imported electronics lacking required manufacturer details and date of packaging on the outer carton...</p>
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-gray-50/50 rounded-2xl p-2 gap-4 border border-gray-100 ml-1">
              <div className="bg-white rounded-xl p-3 flex items-center gap-3 flex-1 border border-gray-200 shadow-inner">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                  <Clock size={16} className="text-gray-500" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">SLA REMAINING</span>
                  <span className="text-lg font-black text-gray-800 tracking-tight">112:15:00</span>
                </div>
              </div>
              <button className="bg-white border-2 border-gray-200 text-gray-700 text-sm font-bold px-8 py-3.5 rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-all shadow-sm whitespace-nowrap sm:ml-auto">
                Review Evidence
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-24 md:bottom-8 right-6 z-50">
        <Link to="/heatmap" className="group bg-gradient-to-r from-orange-500 to-amber-600 shadow-[0_8px_20px_rgba(249,115,22,0.4)] hover:shadow-[0_12px_25px_rgba(249,115,22,0.5)] text-white rounded-full py-4 px-6 flex items-center justify-center gap-2 transition-all hover:-translate-y-1">
          <MapPin size={20} className="group-hover:animate-bounce" />
          <span className="text-sm font-extrabold tracking-wide">View Scam Heatmap</span>
        </Link>
      </div>

    </div>
  );
};
