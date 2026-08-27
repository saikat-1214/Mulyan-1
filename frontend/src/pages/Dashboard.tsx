import { CheckCircle, AlertTriangle, ShieldOff, Clock, MapPin, AlertCircle as AlertCircleIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Dashboard = () => {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto pb-24 md:pb-8 flex flex-col gap-6 md:gap-8 bg-[#f8fafc] min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-2">
        <div>
          <h2 className="font-extrabold text-[#0f2e4a] text-2xl md:text-3xl tracking-tight">Authority Dashboard</h2>
          <p className="text-sm md:text-base text-gray-600 mt-1 font-medium">Active Operations & Compliance Overview</p>
        </div>
      </div>

      {/* Resolved vs. Pending Chart */}
      <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
        <h3 className="font-bold text-gray-900 mb-4">Resolved vs. Pending</h3>
        <div className="flex items-center gap-4 text-xs font-bold text-gray-500 mb-6">
          <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-[#86efac]"></div> Resolved</div>
          <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-[#fb923c]"></div> Pending</div>
        </div>
        
        <div className="relative h-48 w-full flex items-end justify-between px-2 md:px-8 border-l border-b border-gray-200 pb-2 ml-4">
          {/* Y-axis labels */}
          <div className="absolute left-[-24px] bottom-2 top-0 flex flex-col justify-between text-[10px] text-gray-400 font-medium h-full pb-6">
            <span>90</span><span>80</span><span>70</span><span>60</span><span>50</span><span>40</span><span>30</span><span>20</span><span>10</span><span>0</span>
          </div>
          {/* Grid lines */}
          <div className="absolute left-0 right-0 top-0 bottom-8 flex flex-col justify-between pointer-events-none">
             {[...Array(9)].map((_, i) => <div key={i} className="w-full h-px bg-gray-100"></div>)}
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
            <div key={idx} className="flex flex-col items-center gap-2 z-10 w-[12%]">
              <div className="flex items-end gap-1.5 w-full justify-center h-40">
                <div className="w-3 md:w-5 bg-[#86efac] rounded-t-sm" style={{ height: `${data.res}%` }}></div>
                <div className="w-3 md:w-5 bg-[#fb923c] rounded-t-sm" style={{ height: `${data.pen}%` }}></div>
              </div>
              <span className="text-[10px] font-medium text-gray-500">{data.month}</span>
            </div>
          ))}
        </div>
      </div>

      {/* KPI Stack */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {/* New Cases */}
        <div className="bg-[#eff6ff] p-5 rounded-xl border border-blue-100 flex flex-col items-start relative shadow-sm">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-[#0052ff] mb-4">
            <CheckCircle size={16} />
          </div>
          <span className="text-[11px] font-semibold text-gray-600 mb-1">New Cases</span>
          <span className="text-2xl font-bold text-gray-900 leading-none">24</span>
        </div>

        {/* High Priority */}
        <div className="bg-[#fee2e2] p-5 rounded-xl border border-red-100 flex flex-col items-start relative shadow-sm">
          <div className="w-8 h-8 rounded-full bg-[#bc1b1b] flex items-center justify-center text-white mb-4">
            <AlertCircleIcon size={16} />
          </div>
          <span className="text-[11px] font-semibold text-[#bc1b1b] mb-1">High Priority</span>
          <span className="text-2xl font-bold text-[#bc1b1b] leading-none">7</span>
        </div>

        {/* SLA Breached */}
        <div className="bg-[#ffedd5] p-5 rounded-xl border border-orange-200 flex flex-col items-start relative shadow-sm">
          <div className="w-8 h-8 rounded-full bg-[#9a3412] flex items-center justify-center text-white mb-4">
            <ShieldOff size={16} />
          </div>
          <span className="text-[11px] font-semibold text-[#9a3412] mb-1">SLA Breached</span>
          <span className="text-2xl font-bold text-[#9a3412] leading-none">3</span>
        </div>

        {/* Resolved */}
        <div className="bg-[#a7f3d0] p-5 rounded-xl border border-emerald-200 flex flex-col items-start relative shadow-sm">
          <div className="w-8 h-8 rounded-full bg-[#065f46] flex items-center justify-center text-white mb-4">
            <CheckCircle size={16} />
          </div>
          <span className="text-[11px] font-semibold text-[#065f46] mb-1">Resolved</span>
          <span className="text-2xl font-bold text-[#065f46] leading-none">82</span>
        </div>
      </div>

      {/* Urgent Violations Overview */}
      <div className="mt-2 md:mt-4">
        <h3 className="font-bold text-[#0f2e4a] text-xl mb-4 md:mb-6">Urgent Violations</h3>
        
        <div className="flex flex-col gap-5 md:gap-6">
          
          {/* Complaint Card 1 (HIGH) */}
          <div className="bg-white p-5 md:p-6 rounded-xl shadow-sm border border-gray-200 relative flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-gray-100 text-gray-700 text-[10px] font-bold px-2 py-0.5 rounded border border-gray-200">CMP10291</span>
              <span className="bg-[#bc1b1b] text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center"><AlertTriangle size={10} className="mr-1" /> HIGH</span>
              <span className="bg-white border border-gray-300 text-gray-700 text-[10px] font-bold px-2 py-0.5 rounded">Overcharging</span>
            </div>
            <div className="mb-3">
              <span className="inline-flex items-center gap-1 bg-orange-50 text-[#9a3412] border border-[#9a3412]/30 text-[10px] font-bold px-2 py-0.5 rounded-full"><MapPin size={10}/> North District</span>
            </div>
            <h4 className="font-bold text-gray-900 text-base md:text-lg leading-tight mb-2">Retailer Weight Discrepancy & MRP Violation</h4>
            <p className="text-[13px] text-gray-500 leading-relaxed mb-6">Citizen report indicates deliberate tampering of electronic scales and charging above...</p>
            
            <div className="flex flex-col sm:flex-row sm:items-end justify-between border-t border-gray-100 pt-4 gap-4">
              <div className="bg-[#fff7ed] border border-[#ffedd5] rounded-lg p-3 flex items-center gap-3 md:w-1/2 lg:w-1/3">
                <Clock size={20} className="text-[#c2410c]" />
                <div className="flex flex-col">
                  <span className="text-[9px] font-bold text-gray-500 uppercase tracking-wider">SLA REMAINING</span>
                  <span className="text-lg font-black text-[#9a3412]">04:59:32</span>
                </div>
              </div>
              <button className="bg-[#0f172a] text-white text-sm font-bold px-8 py-3 rounded-xl hover:bg-slate-800 transition-colors shadow-sm whitespace-nowrap">
                Investigate
              </button>
            </div>
          </div>

          {/* Complaint Card 2 (MEDIUM) */}
          <div className="bg-white p-5 md:p-6 rounded-xl shadow-sm border-l-4 border-l-[#f59e0b] border-y border-r border-gray-200 relative flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-gray-100 text-gray-700 text-[10px] font-bold px-2 py-0.5 rounded border border-gray-200">CMP10292</span>
              <span className="bg-[#f59e0b] text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center"><AlertTriangle size={10} className="mr-1" /> MEDIUM</span>
              <span className="bg-white border border-gray-300 text-gray-700 text-[10px] font-bold px-2 py-0.5 rounded">Packaging</span>
            </div>
            <div className="mb-3">
              <span className="inline-flex items-center gap-1 bg-orange-50 text-[#9a3412] border border-[#9a3412]/30 text-[10px] font-bold px-2 py-0.5 rounded-full"><MapPin size={10}/> East District</span>
            </div>
            <h4 className="font-bold text-gray-900 text-base md:text-lg leading-tight mb-2">Missing Mandatory Declarations</h4>
            <p className="text-[13px] text-gray-500 leading-relaxed mb-6">Imported electronics lacking required manufacturer details and date of packaging...</p>
            
            <div className="flex flex-col sm:flex-row sm:items-end justify-between border-t border-gray-100 pt-4 gap-4">
              <div className="bg-gray-100 border border-gray-200 rounded-lg p-3 flex items-center gap-3 md:w-1/2 lg:w-1/3">
                <Clock size={20} className="text-gray-600" />
                <div className="flex flex-col">
                  <span className="text-[9px] font-bold text-gray-500 uppercase tracking-wider">SLA REMAINING</span>
                  <span className="text-lg font-black text-gray-900">112:15:00</span>
                </div>
              </div>
              <button className="bg-white border-2 border-[#0f172a] text-[#0f172a] text-sm font-bold px-8 py-2.5 rounded-xl hover:bg-gray-50 transition-colors whitespace-nowrap">
                Review Evidence
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button (Mobile/Desktop) */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-30">
        <Link to="/heatmap" className="bg-[#92400e] shadow-lg shadow-orange-900/30 text-white rounded-xl py-3 px-6 flex items-center justify-center gap-2 hover:bg-[#78350f] transition-colors border border-[#78350f]">
          <MapPin size={18} />
          <span className="text-sm font-bold tracking-wide">View Scam Heatmap</span>
        </Link>
      </div>

    </div>
  );
};
