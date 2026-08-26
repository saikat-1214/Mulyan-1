import { CheckCircle, AlertTriangle, ShieldOff, Clock, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Dashboard = () => {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto pb-24 md:pb-8 flex flex-col gap-6 md:gap-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-gray-200 pb-4">
        <div>
          <h2 className="font-extrabold text-gray-900 text-2xl md:text-3xl tracking-tight">Authority Dashboard</h2>
          <p className="text-sm md:text-base text-gray-500 mt-1 md:mt-2 font-medium">Active Operations & Compliance Overview</p>
        </div>
        <div className="hidden md:flex gap-3 mt-4">
          <Link to="/heatmap" className="bg-white border border-gray-200 text-gray-700 shadow-sm rounded-xl py-2 px-4 flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors font-semibold text-sm">
            <MapPin size={16} className="text-orange-500" />
            Scam Heatmap
          </Link>
        </div>
      </div>

      {/* KPI Stack */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {/* New Cases */}
        <div className="bg-white p-5 md:p-6 rounded-2xl md:rounded-3xl shadow-sm border border-gray-100 flex flex-col items-start relative overflow-hidden group hover:border-blue-200 transition-colors">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500 mb-3 md:mb-4 group-hover:scale-110 transition-transform">
            <CheckCircle size={20} />
          </div>
          <span className="text-xs md:text-sm font-semibold text-gray-500 uppercase tracking-wider">New Cases</span>
          <span className="text-3xl md:text-5xl font-black text-gray-900 leading-none mt-1 md:mt-2">24</span>
        </div>

        {/* High Priority */}
        <div className="bg-red-50 p-5 md:p-6 rounded-2xl md:rounded-3xl border border-red-100 flex flex-col items-start relative overflow-hidden group hover:border-red-200 transition-colors">
          <AlertTriangle className="absolute -right-4 top-1/2 -translate-y-1/2 w-24 h-24 text-red-500 opacity-[0.05] group-hover:opacity-10 transition-opacity" />
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-red-100 flex items-center justify-center text-red-600 mb-3 md:mb-4 group-hover:scale-110 transition-transform">
            <AlertTriangle size={20} />
          </div>
          <span className="text-xs md:text-sm font-bold text-red-700 uppercase tracking-wider">High Priority</span>
          <span className="text-3xl md:text-5xl font-black text-red-600 leading-none mt-1 md:mt-2">7</span>
        </div>

        {/* SLA Breached */}
        <div className="bg-orange-100 p-5 md:p-6 rounded-2xl md:rounded-3xl border border-orange-200 flex flex-col items-start relative group hover:border-orange-300 transition-colors">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-orange-200 flex items-center justify-center text-orange-700 mb-3 md:mb-4 group-hover:scale-110 transition-transform">
            <ShieldOff size={20} />
          </div>
          <span className="text-xs md:text-sm font-bold text-orange-800 uppercase tracking-wider">SLA Breached</span>
          <span className="text-3xl md:text-5xl font-black text-orange-700 leading-none mt-1 md:mt-2">3</span>
        </div>

        {/* Resolved */}
        <div className="bg-emerald-100 p-5 md:p-6 rounded-2xl md:rounded-3xl border border-emerald-200 flex flex-col items-start relative group hover:border-emerald-300 transition-colors">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-emerald-200 flex items-center justify-center text-emerald-700 mb-3 md:mb-4 group-hover:scale-110 transition-transform">
            <CheckCircle size={20} />
          </div>
          <span className="text-xs md:text-sm font-bold text-emerald-800 uppercase tracking-wider">Resolved</span>
          <span className="text-3xl md:text-5xl font-black text-emerald-700 leading-none mt-1 md:mt-2">82</span>
        </div>
      </div>

      {/* Active Complaints Overview */}
      <div className="mt-2 md:mt-4">
        <div className="flex justify-between items-end mb-4 md:mb-6">
          <h3 className="font-bold text-gray-900 text-lg md:text-xl">Active Complaints Overview</h3>
          <span className="text-sm font-medium text-gray-500 hidden md:block">Showing 10 highest priority tickets</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          
          {/* Complaint Card 1 (HIGH) */}
          <div className="bg-white p-5 md:p-6 rounded-2xl md:rounded-3xl shadow-sm border border-red-200 relative hover:shadow-md transition-shadow flex flex-col">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-gray-100 text-gray-600 text-[10px] md:text-xs font-bold px-2.5 py-1 rounded-md">CMP10291</span>
              <span className="bg-red-600 text-white text-[10px] md:text-xs font-bold px-2.5 py-1 rounded-md flex items-center"><AlertTriangle size={12} className="mr-1" /> HIGH</span>
              <span className="border border-blue-200 text-blue-700 text-[10px] md:text-xs font-bold px-2.5 py-1 rounded-md">Overcharging</span>
            </div>
            <h4 className="font-bold text-gray-900 text-base md:text-lg leading-tight mb-2">Retailer Weight Discrepancy & MRP Violation</h4>
            <p className="text-xs md:text-sm text-gray-500 leading-relaxed mb-6 flex-1">Citizen report indicates deliberate tampering of electronic scales and charging above declared retail price...</p>
            
            <div className="flex justify-between items-end border-t border-gray-100 pt-4 mt-auto">
              <div className="flex items-center text-orange-600">
                <Clock size={16} className="mr-2 md:w-5 md:h-5" />
                <div className="flex flex-col">
                  <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-wider">SLA REMAINING</span>
                  <span className="text-sm md:text-base font-black">47:59:32</span>
                </div>
              </div>
              <button className="bg-[#0f172a] text-white text-xs md:text-sm font-bold px-5 py-2.5 rounded-xl hover:bg-slate-800 transition-colors shadow-sm">
                Investigate
              </button>
            </div>
          </div>

          {/* Complaint Card 2 (MEDIUM) */}
          <div className="bg-white p-5 md:p-6 rounded-2xl md:rounded-3xl shadow-sm border border-orange-200 relative hover:shadow-md transition-shadow flex flex-col">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-gray-100 text-gray-600 text-[10px] md:text-xs font-bold px-2.5 py-1 rounded-md">CMP10292</span>
              <span className="bg-orange-500 text-white text-[10px] md:text-xs font-bold px-2.5 py-1 rounded-md flex items-center"><AlertTriangle size={12} className="mr-1" /> MEDIUM</span>
              <span className="border border-blue-200 text-blue-700 text-[10px] md:text-xs font-bold px-2.5 py-1 rounded-md">Packaging</span>
            </div>
            <h4 className="font-bold text-gray-900 text-base md:text-lg leading-tight mb-2">Missing Mandatory Declarations</h4>
            <p className="text-xs md:text-sm text-gray-500 leading-relaxed mb-6 flex-1">Imported electronics lacking required manufacturer details and date of packaging on the exterior box...</p>
            
            <div className="flex justify-between items-end border-t border-gray-100 pt-4 mt-auto">
              <div className="flex items-center text-gray-600">
                <Clock size={16} className="mr-2 md:w-5 md:h-5" />
                <div className="flex flex-col">
                  <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-wider">SLA REMAINING</span>
                  <span className="text-sm md:text-base font-black">112:15:00</span>
                </div>
              </div>
              <button className="bg-white border-2 border-[#0f172a] text-[#0f172a] text-xs md:text-sm font-bold px-5 py-2 rounded-xl hover:bg-gray-50 transition-colors">
                Investigate
              </button>
            </div>
          </div>
          
           {/* Complaint Card 3 (Placeholder for Grid) */}
           <div className="bg-white p-5 md:p-6 rounded-2xl md:rounded-3xl shadow-sm border border-orange-200 relative hover:shadow-md transition-shadow hidden lg:flex flex-col">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-gray-100 text-gray-600 text-[10px] md:text-xs font-bold px-2.5 py-1 rounded-md">CMP10293</span>
              <span className="bg-orange-500 text-white text-[10px] md:text-xs font-bold px-2.5 py-1 rounded-md flex items-center"><AlertTriangle size={12} className="mr-1" /> MEDIUM</span>
              <span className="border border-blue-200 text-blue-700 text-[10px] md:text-xs font-bold px-2.5 py-1 rounded-md">Expiry</span>
            </div>
            <h4 className="font-bold text-gray-900 text-base md:text-lg leading-tight mb-2">Expired Product on Shelves</h4>
            <p className="text-xs md:text-sm text-gray-500 leading-relaxed mb-6 flex-1">Retailer caught selling dairy products 5 days past expiry date. Verified by consumer receipt and photo...</p>
            
            <div className="flex justify-between items-end border-t border-gray-100 pt-4 mt-auto">
              <div className="flex items-center text-gray-600">
                <Clock size={16} className="mr-2 md:w-5 md:h-5" />
                <div className="flex flex-col">
                  <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-wider">SLA REMAINING</span>
                  <span className="text-sm md:text-base font-black">105:30:00</span>
                </div>
              </div>
              <button className="bg-white border-2 border-[#0f172a] text-[#0f172a] text-xs md:text-sm font-bold px-5 py-2 rounded-xl hover:bg-gray-50 transition-colors">
                Investigate
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Floating Action Button (Mobile Only) */}
      <div className="md:hidden fixed bottom-20 left-1/2 transform -translate-x-1/2 z-30 w-full max-w-[400px] px-6">
        <Link to="/heatmap" className="w-full bg-[#b45309] shadow-lg shadow-orange-900/20 text-white rounded-2xl py-4 px-4 flex items-center justify-center gap-2 hover:bg-[#92400e] transition-colors">
          <MapPin size={20} />
          <span className="text-sm font-bold tracking-wide">View Scam Heatmap</span>
        </Link>
      </div>

    </div>
  );
};
