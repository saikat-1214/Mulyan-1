import { useState } from 'react';
import { MapContainer, TileLayer, Popup, CircleMarker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { ShieldAlert, Users, TrendingUp } from 'lucide-react';

const mockHeatmapData = {
  data: [
    { id: 'CMP1', latitude: 22.5726, longitude: 88.3639, violation_type: 'OVERCHARGING', severity: 'HIGH', reports: 12 },
    { id: 'CMP2', latitude: 22.5786, longitude: 88.3539, violation_type: 'EXPIRED_PRODUCT', severity: 'HIGH', reports: 5 },
    { id: 'CMP3', latitude: 22.5626, longitude: 88.3739, violation_type: 'MISSING_DECLARATION', severity: 'MEDIUM', reports: 2 },
    { id: 'CMP4', latitude: 22.5726, longitude: 88.3689, violation_type: 'OVERCHARGING', severity: 'HIGH', reports: 24 },
  ]
};

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'HIGH': return '#ef4444'; // red-500
    case 'MEDIUM': return '#f97316'; // orange-500
    default: return '#3b82f6'; // blue-500
  }
};

export const Heatmap = () => {
  const [heatmapData] = useState(mockHeatmapData.data);
  const centerPosition: [number, number] = [22.5726, 88.3639];

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-4rem)] bg-gray-50">
      
      {/* Sidebar Info */}
      <div className="w-full lg:w-96 bg-white border-r border-gray-200 shadow-sm z-10 flex flex-col">
        <div className="p-6 border-b border-gray-100">
          <h1 className="text-2xl font-extrabold text-gray-900 flex items-center mb-2">
            <ShieldAlert className="mr-2 text-purple-600 w-6 h-6" />
            Violation Heatmap
          </h1>
          <p className="text-sm text-gray-500 leading-relaxed">
            Live geographic clusters of consumer grievances. Co-sign an issue to escalate its priority for local LMOs.
          </p>
        </div>
        
        <div className="p-6 flex-1 overflow-y-auto">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Trending Scams in your area</h3>
          <div className="space-y-4">
            {heatmapData.sort((a,b) => b.reports - a.reports).map(point => (
              <div key={point.id} className="p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-purple-200 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-bold text-gray-900 text-sm">{point.violation_type.replace('_', ' ')}</span>
                  <span className="flex items-center text-xs font-bold text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                    <TrendingUp className="w-3 h-3 mr-1"/> {point.reports}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-xs text-gray-500 font-medium">Severity: <span className={point.severity === 'HIGH' ? 'text-red-500' : 'text-orange-500'}>{point.severity}</span></span>
                  <button className="text-xs font-semibold text-white bg-gray-900 hover:bg-gray-800 px-3 py-1.5 rounded-lg transition-colors shadow-sm">
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Map View */}
      <div className="flex-1 relative z-0">
        <MapContainer 
          center={centerPosition} 
          zoom={13} 
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; OpenStreetMap'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          />
          
          {heatmapData.map((point) => (
            <CircleMarker
              key={point.id}
              center={[point.latitude, point.longitude]}
              pathOptions={{ 
                color: getSeverityColor(point.severity),
                fillColor: getSeverityColor(point.severity),
                fillOpacity: 0.7,
                weight: 2
              }}
              radius={point.reports > 10 ? 14 : 8}
            >
              <Popup className="rounded-xl overflow-hidden">
                <div className="p-1">
                  <div className="font-bold text-gray-900 mb-1">{point.violation_type.replace('_', ' ')}</div>
                  <div className="flex items-center text-sm text-gray-600 mb-3">
                    <Users className="w-4 h-4 mr-1 text-purple-500" />
                    <span className="font-semibold text-gray-900 mr-1">{point.reports}</span> citizens reported this
                  </div>
                  <button className="w-full bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold py-2 rounded-lg transition-colors">
                    Co-sign Issue
                  </button>
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};
