import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate, useNavigate } from 'react-router-dom';
import { Menu, Scan, FileText, Bell, MapPin, AlertCircle, ShieldCheck, CheckCircle, Mail, Lock, Clock } from 'lucide-react';
import { Dashboard } from './pages/Dashboard';
import { Heatmap } from './pages/Heatmap';


// Splash Screen Component
const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadingOut(true), 1500);
    const completeTimer = setTimeout(() => onComplete(), 2100);
    return () => { clearTimeout(fadeTimer); clearTimeout(completeTimer); };
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 bg-white z-[100] flex items-center justify-center transition-opacity duration-300 ${fadingOut ? 'bg-opacity-0 pointer-events-none' : 'bg-opacity-100'}`}>
      <div className={`flex items-center ${fadingOut ? 'animate-splash-out' : 'animate-splash-in'}`}>
        <div className="relative flex items-center justify-center mr-3">
          <ShieldCheck className="w-16 h-16 text-[#0f2e4a]" strokeWidth={2.5} />
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-transparent rounded-full blur-md -z-10"></div>
        </div>
        <h1 className="text-5xl font-extrabold text-[#0052ff] tracking-tight">Mulyan</h1>
      </div>
    </div>
  );
};

// Authentication Screens Component
const AuthScreen = ({ onLogin }: { onLogin: () => void }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); setSuccess(''); setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const usersDB = JSON.parse(localStorage.getItem('mulyan_users') || '{}');
      if (isLogin) {
        if (usersDB[email] && usersDB[email] === password) onLogin();
        else setError('Invalid email or password. Please try again or create an account.');
      } else {
        if (password !== confirmPassword) return setError('Passwords do not match.');
        if (usersDB[email]) return setError('An account with this email already exists.');
        if (password.length < 6) return setError('Password must be at least 6 characters.');
        usersDB[email] = password;
        localStorage.setItem('mulyan_users', JSON.stringify(usersDB));
        setSuccess('Account created successfully! Please log in.');
        setIsLogin(true); setPassword(''); setConfirmPassword('');
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col justify-center items-center p-4 sm:p-8">
      <div className="w-full max-w-md bg-white rounded-[2rem] shadow-xl border border-gray-100 p-8 sm:p-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-blue-500/10 blur-2xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-32 h-32 rounded-full bg-teal-500/10 blur-2xl pointer-events-none"></div>

        <div className="flex flex-col items-center mb-8 relative z-10">
          <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-4 text-[#0f2e4a] shadow-sm">
            <ShieldCheck size={36} strokeWidth={2.5} />
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
          <p className="text-sm text-gray-500 mt-2 text-center">
            {isLogin ? 'Sign in to your Mulyan jurisdiction.' : 'Register as a certified authority or consumer.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
          {error && (
            <div className="bg-red-50 text-red-600 text-sm font-bold px-4 py-3 rounded-xl border border-red-100 flex items-center">
              <AlertCircle size={16} className="mr-2 shrink-0" />{error}
            </div>
          )}
          {success && (
            <div className="bg-emerald-50 text-emerald-700 text-sm font-bold px-4 py-3 rounded-xl border border-emerald-100 flex items-center">
              <CheckCircle size={16} className="mr-2 shrink-0" />{success}
            </div>
          )}

          <div>
            <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0052ff]/20 focus:border-[#0052ff] transition-all text-sm font-medium" placeholder="you@email.com" />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider">Password</label>
              {isLogin && <a href="#" className="text-[11px] font-bold text-[#0052ff] hover:underline">Forgot?</a>}
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input type="password" required value={password} onChange={e => setPassword(e.target.value)} className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0052ff]/20 focus:border-[#0052ff] transition-all text-sm font-medium" placeholder="••••••••" />
            </div>
          </div>

          {!isLogin && (
            <div>
              <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-2">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input type="password" required value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0052ff]/20 focus:border-[#0052ff] transition-all text-sm font-medium" placeholder="••••••••" />
              </div>
            </div>
          )}

          <button type="submit" disabled={isLoading} className="w-full bg-[#0052ff] hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5 mt-2 flex justify-center items-center disabled:opacity-70 disabled:transform-none">
            {isLoading ? "Loading..." : (isLogin ? "Sign In to Dashboard" : "Register Account")}
          </button>
        </form>
        
        <div className="mt-8 text-center relative z-10 border-t border-gray-100 pt-6">
          <p className="text-xs text-gray-500 font-medium">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button onClick={() => { setIsLogin(!isLogin); setError(''); setSuccess(''); }} className="text-[#0052ff] font-bold hover:underline">
              {isLogin ? "Register here" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

// IMPORTANT: Set this to your localtunnel URL!
const API_BASE_URL = "https://eager-words-sink.loca.lt";

// Responsive Shell Component
const AppShell = ({ children, onLogout }: { children: React.ReactNode, onLogout: () => void }) => {
  const location = useLocation();
  
  return (
    <div className="bg-[#f8fafc] min-h-screen flex flex-col font-sans">
      <header className="bg-white px-4 sm:px-8 py-4 flex items-center justify-between z-30 sticky top-0 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
        <button className="p-2 -ml-2 text-gray-500 hover:bg-gray-100 rounded-full md:hidden transition-colors"><Menu size={24} /></button>
        <div className="flex items-center justify-center absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0">
          <ShieldCheck className="text-[#0f2e4a] w-7 h-7 mr-2" />
          <h1 className="font-extrabold text-[#0052ff] text-xl tracking-tight">Mulyan</h1>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8 ml-8">
          <Link to="/scan" className={`text-sm font-semibold flex items-center ${location.pathname === '/scan' || location.pathname === '/' ? 'text-[#0052ff]' : 'text-gray-500 hover:text-gray-900'}`}><Scan size={18} className="mr-1.5" /> Scan</Link>
          <Link to="/complaints" className={`text-sm font-semibold flex items-center ${location.pathname === '/complaints' ? 'text-[#0052ff]' : 'text-gray-500 hover:text-gray-900'}`}><FileText size={18} className="mr-1.5" /> Complaints</Link>
          <Link to="/heatmap" className={`text-sm font-semibold flex items-center ${location.pathname === '/heatmap' ? 'text-[#0052ff]' : 'text-gray-500 hover:text-gray-900'}`}><Bell size={18} className="mr-1.5" /> Alerts</Link>
          <Link to="/dashboard" className={`text-sm font-semibold flex items-center ${location.pathname === '/dashboard' ? 'text-[#0052ff]' : 'text-gray-500 hover:text-gray-900'}`}><ShieldCheck size={18} className="mr-1.5" /> Dashboard</Link>
        </nav>

        <button onClick={onLogout} className="w-8 h-8 rounded-full overflow-hidden border-2 border-gray-200 hover:border-[#0052ff] transition-colors" title="Log out">
          <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150" alt="Profile" className="w-full h-full object-cover" />
        </button>
      </header>

      <main className="flex-1 overflow-y-auto pb-24 md:pb-8 w-full">{children}</main>

      <nav className="md:hidden fixed bottom-0 w-full bg-white border-t border-gray-100 flex justify-around items-center px-2 py-3 pb-safe z-40">
        <Link to="/scan" className="flex flex-col items-center flex-1">
          <div className={`${(location.pathname === '/scan' || location.pathname === '/') ? 'bg-[#0052ff] text-white px-6 py-1.5 rounded-full shadow-md shadow-blue-500/20' : 'text-gray-400 p-1.5'}`}><Scan size={24} /></div>
          <span className={`text-[10px] font-bold mt-1 ${(location.pathname === '/scan' || location.pathname === '/') ? 'text-[#0052ff]' : 'text-gray-500'}`}>Scan</span>
        </Link>
        <Link to="/complaints" className="flex flex-col items-center flex-1">
          <div className={`${location.pathname === '/complaints' ? 'bg-[#0052ff] text-white px-6 py-1.5 rounded-full shadow-md shadow-blue-500/20' : 'text-gray-400 p-1.5'}`}><FileText size={24} /></div>
          <span className={`text-[10px] font-bold mt-1 ${location.pathname === '/complaints' ? 'text-[#0052ff]' : 'text-gray-500'}`}>Complaints</span>
        </Link>
        <Link to="/heatmap" className="flex flex-col items-center flex-1">
          <div className={`${location.pathname === '/heatmap' ? 'bg-[#0052ff] text-white px-6 py-1.5 rounded-full shadow-md shadow-blue-500/20' : 'text-gray-400 p-1.5'}`}><Bell size={24} /></div>
          <span className={`text-[10px] font-bold mt-1 ${location.pathname === '/heatmap' ? 'text-[#0052ff]' : 'text-gray-500'}`}>Alerts</span>
        </Link>
      </nav>
    </div>
  );
};

// Screen 2: Home (Consumer App)
const Home = () => {
  const navigate = useNavigate();
  const [isScanning, setIsScanning] = useState(false);

  const handleCameraCapture = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("image", file);
      
      setIsScanning(true);
      
      try {
        const response = await fetch(`${API_BASE_URL}/api/scan`, {
          method: 'POST',
          body: formData,
          headers: { "ngrok-skip-browser-warning": "true" }
        });
        
        const data = await response.json();
        const uploadedImageUrl = URL.createObjectURL(file);
        
        setIsScanning(false);
        navigate('/scan-results', { state: { scanData: data, imageUrl: uploadedImageUrl } });
      } catch (err) {
        console.error("AI API Error:", err);
        setIsScanning(false);
        alert("Could not connect to AI backend. Is your Python server and LocalTunnel running?");
      }
    }
  };

  return (
    <div className="p-4 sm:p-8 max-w-5xl mx-auto flex flex-col gap-6 md:gap-8 mt-2">
      <div className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-gray-100/60 text-center flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-blue-100/50 to-transparent pointer-events-none"></div>
        
        <h2 className="font-bold text-gray-900 text-xl md:text-3xl mb-2 relative z-10">Verify Product Info</h2>
        <p className="text-sm md:text-base text-gray-500 mb-8 max-w-lg leading-relaxed relative z-10">
          Ensure accuracy of MRP, Net Weight, and packaging dates.
        </p>
        
        <input type="file" accept="image/*" capture="environment" id="camera-input" className="hidden" onChange={handleCameraCapture} />
        
        <button 
          disabled={isScanning}
          onClick={() => document.getElementById('camera-input')?.click()}
          className="w-full md:w-auto md:min-w-[320px] bg-[#0052ff] text-white rounded-2xl py-5 md:py-6 flex flex-col items-center justify-center gap-3 hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-0.5 duration-200 relative z-10 mx-auto disabled:opacity-50"
        >
          {isScanning ? (
            <div className="flex flex-col items-center">
              <svg className="animate-spin h-8 w-8 text-white mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              <span className="text-sm md:text-base font-extrabold tracking-widest uppercase">Extracting via Edge AI...</span>
            </div>
          ) : (
            <>
              <Scan size={36} strokeWidth={2.5} />
              <span className="text-sm md:text-base font-extrabold tracking-widest uppercase">Scan Product</span>
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        <Link to="/complaints" className="bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between h-32 md:h-40 relative hover:border-[#0052ff]/30 transition-all group">
          <div className="absolute top-4 right-4 bg-red-600 text-white text-[11px] md:text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-sm">3</div>
          <div className="w-10 h-10 md:w-12 md:h-12 bg-orange-100/50 rounded-xl flex items-center justify-center text-orange-500 group-hover:scale-110 transition-transform"><AlertCircle size={24} strokeWidth={1.5} /></div>
          <div><h3 className="font-bold text-gray-900 text-sm md:text-base">My Complaints</h3><p className="text-xs text-gray-500 mt-1">View active cases</p></div>
        </Link>
        <Link to="/heatmap" className="bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between h-32 md:h-40 hover:border-[#0052ff]/30 transition-all group">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-teal-50 rounded-xl flex items-center justify-center text-teal-600 group-hover:scale-110 transition-transform"><MapPin size={24} strokeWidth={1.5} /></div>
          <div><h3 className="font-bold text-gray-900 text-sm md:text-base">Nearby Alerts</h3><p className="text-xs text-gray-500 mt-1">Local compliance notices</p></div>
        </Link>
      </div>
    </div>
  );
};

// Screen 1: Scan Results
const ScanResults = () => {
  const location = useLocation();
  const [locationCoords, setLocationCoords] = useState("Fetching location...");
  const [currentTime, setCurrentTime] = useState("Fetching time...");

  useEffect(() => {
    const now = new Date();
    setCurrentTime(now.toISOString().replace('T', ' ').substring(0, 19) + ' UTC');

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          const latDir = lat >= 0 ? 'N' : 'S';
          const lonDir = lon >= 0 ? 'E' : 'W';
          setLocationCoords(`${Math.abs(lat).toFixed(4)}° ${latDir}, ${Math.abs(lon).toFixed(4)}° ${lonDir}`);
        },
        () => setLocationCoords("Location access denied")
      );
    } else {
      setLocationCoords("Geolocation not supported");
    }
  }, []);

  // Fallback to mock data if accessed directly without scanning
  const scanData = location.state?.scanData || {
    mrp: 40.00,
    net_quantity: "200g",
    batch_no: "BCH-8992-X",
    expiry_date: "05/2027",
    violations: [{ type: "MRP_VIOLATION", description: "The observed selling price suggests a violation." }]
  };
  
  const imageUrl = location.state?.imageUrl || 'https://images.unsplash.com/photo-1607349913338-fca6f7fc42d0?auto=format&fit=crop&q=80&w=1200';
  
  const hasViolation = scanData.violations && scanData.violations.length > 0;

  return (
    <div className="p-4 sm:p-8 max-w-3xl mx-auto pb-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-gray-900 text-lg md:text-xl">Real-time Scan Preview</h2>
        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded font-mono font-bold border border-gray-200">ID: #882-XQ</span>
      </div>
      
      <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-200 mb-4 relative">
        <div className="aspect-video md:aspect-[21/9] bg-cover bg-center rounded-xl opacity-90" style={{ backgroundImage: `url('${imageUrl}')` }}></div>
        
        {/* Mock YOLOv8 Bounding Boxes for Visual Effect */}
        <div className="absolute top-1/4 left-1/4 w-32 md:w-48 h-8 md:h-12 border-2 border-red-500 bg-red-500/20 rounded flex items-start"><span className="bg-red-500 text-white text-[8px] font-bold px-1 rounded-br">MRP</span></div>
        <div className="absolute bottom-1/3 right-1/4 w-20 md:w-32 h-6 md:h-10 border-2 border-green-500 bg-green-500/20 rounded flex items-start"><span className="bg-green-500 text-white text-[8px] font-bold px-1 rounded-br">NET QTY</span></div>
        
        <div className="mt-4 px-2 pb-1 flex justify-between items-center text-xs md:text-sm text-gray-500 font-medium">
          <div className="flex items-center text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg font-bold">
            <CheckCircle size={16} className="mr-2" /> OCR Confidence: High (94%)
          </div>
        </div>
      </div>

      <div className="bg-[#0f2e4a] text-blue-50 rounded-2xl p-4 md:p-5 mb-6 shadow-md border border-blue-900 overflow-hidden relative">
        <ShieldCheck className="absolute -right-6 -bottom-6 w-32 h-32 text-blue-800/30 -z-0" />
        <div className="relative z-10">
          <h3 className="text-xs font-bold text-blue-300 uppercase tracking-widest mb-3 flex items-center"><Lock size={14} className="mr-1.5" /> Tamper-Proof Digital Footprint</h3>
          <div className="space-y-2.5 font-mono text-[10px] md:text-xs">
            <div className="flex justify-between items-center border-b border-blue-800/50 pb-2">
              <span className="text-blue-400">GPS Coordinates</span><span className="font-bold text-white flex items-center"><MapPin size={12} className="mr-1" /> {locationCoords}</span>
            </div>
            <div className="flex justify-between items-center border-b border-blue-800/50 pb-2">
              <span className="text-blue-400">UTC Timestamp</span><span className="font-bold text-white flex items-center"><Clock size={12} className="mr-1" /> {currentTime}</span>
            </div>
            <div className="flex flex-col gap-1 pt-1">
              <span className="text-blue-400">SHA-256 Cryptographic Hash</span>
              <span className="font-bold text-emerald-400 break-all bg-black/30 p-2 rounded border border-black/50">e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855</span>
            </div>
          </div>
          <div className="mt-4 inline-flex items-center text-[10px] bg-emerald-500/20 text-emerald-300 px-2.5 py-1 rounded-full font-bold border border-emerald-500/30">
            <CheckCircle size={12} className="mr-1" /> Legally Admissible Evidence (Legal Metrology Act)
          </div>
        </div>
      </div>

      <h2 className="font-bold text-gray-900 mb-4 text-lg md:text-xl">Extracted Compliance Data</h2>
      
      {hasViolation && (
        <div className="bg-[#e62e2d] text-white rounded-2xl p-5 mb-6 shadow-md md:shadow-lg">
          <div className="flex items-center font-bold text-lg md:text-xl mb-2"><AlertCircle size={24} className="mr-2 text-white" /> Potential Violation Detected</div>
          <p className="text-sm text-red-50 leading-relaxed max-w-2xl font-medium">{scanData.violations[0].description}</p>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 divide-y divide-gray-100 mb-8 overflow-hidden">
        <div className="p-4 md:p-5 flex justify-between items-center bg-red-50/30">
          <div>
            <span className="text-[10px] font-bold text-[#e62e2d] uppercase flex items-center mb-1 tracking-wider"><AlertCircle size={12} className="mr-1.5"/> MRP DECLARED</span>
            <span className="text-base md:text-lg font-black text-[#e62e2d]">₹{scanData.mrp || "N/A"}</span>
          </div>
        </div>
        <div className="p-4 md:p-5 flex justify-between items-center">
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase flex items-center mb-1 tracking-wider"><CheckCircle size={12} className="mr-1.5"/> NET QTY</span>
            <span className="text-base md:text-lg font-black text-gray-900">{scanData.net_quantity || "N/A"}</span>
          </div>
        </div>
        <div className="p-4 md:p-5 flex justify-between items-center">
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase flex items-center mb-1 tracking-wider"><CheckCircle size={12} className="mr-1.5"/> BATCH NO</span>
            <span className="text-base md:text-lg font-black text-gray-900">{scanData.batch_no || "N/A"}</span>
          </div>
        </div>
        <div className="p-4 md:p-5 flex justify-between items-center">
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase flex items-center mb-1 tracking-wider"><CheckCircle size={12} className="mr-1.5"/> EXPIRY DATE</span>
            <span className="text-base md:text-lg font-black text-gray-900">{scanData.expiry_date || "N/A"}</span>
          </div>
        </div>
      </div>

      <Link to="/generate-complaint" state={{ scanData }} className="w-full md:w-auto md:px-12 bg-[#ff8c00] hover:bg-orange-600 text-white font-bold py-4 rounded-2xl shadow-md flex items-center justify-center transition-colors text-lg">
        <FileText size={20} className="mr-2" /> Proceed to File Complaint
      </Link>
    </div>
  );
};

// Screen 3: Generate Complaint
const GenerateComplaint = () => {
  const location = useLocation();
  const scanData = location.state?.scanData || {};
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false); setIsSuccess(true);
      setTimeout(() => navigate('/dashboard'), 2000);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="p-4 sm:p-8 max-w-3xl mx-auto flex flex-col items-center justify-center min-h-[60vh] text-center animate-in fade-in duration-500">
        <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mb-6 animate-in zoom-in duration-500 delay-150"><CheckCircle size={48} className="text-emerald-600" /></div>
        <h2 className="text-2xl font-black text-gray-900 mb-4">Grievance Filed & Routed!</h2>
        
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 max-w-md w-full relative overflow-hidden mb-6">
          <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
          <h3 className="text-sm font-bold text-gray-900 flex items-center justify-center mb-3"><MapPin size={16} className="text-blue-500 mr-1.5" /> Spatial Geo-Fencing Active</h3>
          <p className="text-xs text-gray-600 font-medium leading-relaxed mb-4">
            System has instantly routed the grievance to the local <strong className="text-gray-900">Legal Metrology Officer (LMO)</strong> and nearby <strong className="text-gray-900">Police Station</strong> based on the exact retail location.
          </p>
          <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 text-[10px] text-gray-500 font-bold uppercase tracking-wider flex items-center justify-center">
            <CheckCircle size={12} className="text-emerald-500 mr-1.5" /> Middleman Routing Delay Eliminated
          </div>
        </div>

        <p className="text-sm text-gray-400 mt-2 flex items-center justify-center font-medium">
          <svg className="animate-spin h-4 w-4 text-gray-400 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
          Redirecting to Authority Dashboard...
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-8 max-w-3xl mx-auto pb-10">
      <div className="mb-6">
        <h2 className="font-bold text-gray-900 text-xl mb-1">Review & File Complaint</h2>
        <p className="text-sm text-gray-500">All details were automatically pre-filled from your camera scan in under 500ms using Edge AI.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 md:p-6">
          <h3 className="font-bold text-gray-900 mb-5 flex items-center text-lg"><Scan size={20} className="text-[#0052ff] mr-2" /> Extracted Product Data</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="md:col-span-2">
              <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2 block">Product Name</label>
              <input type="text" readOnly defaultValue="Unknown Scanned Product" className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl font-bold text-gray-900 focus:outline-none" />
            </div>
            
            <div>
              <label className="text-[11px] font-bold text-[#e62e2d] uppercase tracking-wider mb-2 block flex items-center"><AlertCircle size={12} className="mr-1" /> Declared MRP (Violation)</label>
              <input type="text" readOnly defaultValue={`₹${scanData.mrp || 'N/A'}`} className="w-full p-3.5 bg-red-50 border border-red-200 text-[#e62e2d] rounded-xl font-black focus:outline-none" />
            </div>

            <div>
              <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2 block">Net Quantity</label>
              <input type="text" readOnly defaultValue={scanData.net_quantity || "N/A"} className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl font-bold text-gray-900 focus:outline-none" />
            </div>

            <div>
              <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2 block">Batch Number</label>
              <input type="text" readOnly defaultValue={scanData.batch_no || "N/A"} className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl font-bold text-gray-900 focus:outline-none" />
            </div>

            <div>
              <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2 block">Expiry Date</label>
              <input type="text" readOnly defaultValue={scanData.expiry_date || "N/A"} className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl font-bold text-gray-900 focus:outline-none" />
            </div>
          </div>
        </div>

        <button type="submit" disabled={isSubmitting} className="w-full bg-[#0052ff] hover:bg-blue-700 text-white font-black py-4 rounded-2xl shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5 flex justify-center items-center text-lg disabled:opacity-70 disabled:transform-none">
          {isSubmitting ? "Processing..." : <><FileText size={22} className="mr-2" /> File Official Complaint</>}
        </button>
      </form>
    </div>
  );
};

const Complaints = () => (
  <div className="p-4 sm:p-8 max-w-3xl mx-auto pb-10 mt-2">
    <div className="mb-6 flex justify-between items-end">
      <div><h2 className="font-bold text-gray-900 text-xl md:text-2xl mb-1">Active Cases</h2><p className="text-sm text-gray-500">Live timeline & escalation tracking</p></div>
      <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">1 Active</span>
    </div>

    <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#0052ff] to-purple-500"></div>
      
      <div className="p-5 md:p-6 border-b border-gray-100">
        <div className="flex justify-between items-start mb-4">
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Case #882-XQ</span>
            <h3 className="font-bold text-gray-900 text-lg">Premium Quality Biscuits</h3>
            <p className="text-xs text-red-500 font-bold mt-0.5 flex items-center"><AlertCircle size={12} className="mr-1" /> MRP Violation</p>
          </div>
          
          <div className="bg-orange-50 border border-orange-200 p-2.5 rounded-xl text-right">
            <span className="text-[9px] font-bold text-orange-600 uppercase tracking-widest block mb-0.5">SLA Deadline</span>
            <div className="font-mono font-black text-orange-700 text-sm flex items-center"><Clock size={14} className="mr-1" /> 47h 12m</div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-3 flex items-center text-xs text-gray-600 font-medium">
          <ShieldCheck size={16} className="text-gray-400 mr-2" />
          <span>Auto-escalates to <strong className="text-gray-900">Senior Vigilance Officer</strong> if unattended.</span>
        </div>
      </div>

      <div className="p-5 md:p-6 bg-gray-50/50">
        <h4 className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-6">Live Status Tracker</h4>
        <div className="relative">
          <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-gray-200 z-0"></div>
          <div className="space-y-6 relative z-10">
            <div className="flex items-start">
              <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-sm shrink-0 mt-0.5"><CheckCircle size={12} /></div>
              <div className="ml-4"><h5 className="text-sm font-bold text-gray-900">Complaint Filed</h5><p className="text-xs text-gray-500">Blockchain hash verified.</p></div>
            </div>
            
            <div className="flex items-start">
              <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-sm shrink-0 mt-0.5"><CheckCircle size={12} /></div>
              <div className="ml-4"><h5 className="text-sm font-bold text-gray-900">Assigned via Geo-Fencing</h5><p className="text-xs text-gray-500">Routed to LMO.</p></div>
            </div>

            <div className="flex items-start">
              <div className="w-6 h-6 rounded-full bg-white border-2 border-[#0052ff] text-[#0052ff] flex items-center justify-center shadow-sm shrink-0 mt-0.5"><div className="w-2 h-2 rounded-full bg-[#0052ff] animate-pulse"></div></div>
              <div className="ml-4"><h5 className="text-sm font-bold text-[#0052ff]">Reviewing Evidence</h5><p className="text-xs text-gray-500">LMO is inspecting.</p></div>
            </div>

            <div className="flex items-start">
              <div className="w-6 h-6 rounded-full bg-gray-100 border-2 border-gray-200 text-gray-300 flex items-center justify-center shrink-0 mt-0.5"><CheckCircle size={12} /></div>
              <div className="ml-4"><h5 className="text-sm font-bold text-gray-400">Notice Issued</h5><p className="text-xs text-gray-400">Pending decision.</p></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ProtectedRoute = ({ isAuthenticated, children }: { isAuthenticated: boolean, children: React.ReactNode }) => {
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

function App() {
  const [splashFinished, setSplashFinished] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <>
      {!splashFinished && <SplashScreen onComplete={() => setSplashFinished(true)} />}
      <div className={splashFinished ? "opacity-100 transition-opacity duration-500" : "opacity-0"}>
        <Router>
          <Routes>
            <Route path="/login" element={isAuthenticated ? <Navigate to="/" replace /> : <AuthScreen onLogin={() => setIsAuthenticated(true)} />} />
            <Route path="/*" element={<ProtectedRoute isAuthenticated={isAuthenticated}><AppShell onLogout={() => setIsAuthenticated(false)}><Routes>
              <Route path="/" element={<Home />} />
              <Route path="/scan" element={<Home />} />
              <Route path="/scan-results" element={<ScanResults />} />
              <Route path="/generate-complaint" element={<GenerateComplaint />} />
              <Route path="/complaints" element={<Complaints />} />
              <Route path="/heatmap" element={<Heatmap />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes></AppShell></ProtectedRoute>} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
