import React, { useState, useEffect } from 'react';
import { 
  Trophy, Wallet, User, Bell, Flame, Shield, Search, Filter, 
  ChevronRight, Calendar, Clock, Users, Play, CheckCircle, 
  AlertCircle, DollarSign, ShoppingBag, Settings, LogOut, Menu, X, ArrowUpRight, Copy, Check
} from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTournament, setSelectedTournament] = useState(null);
  const [walletBalance, setWalletBalance] = useState(1250);
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Welcome to Legends of Fire!', time: '2h ago', read: false },
    { id: 2, title: 'Slot Confirmed for Squad Bermuda #42', time: '5h ago', read: false }
  ]);
  const [userProfile, setUserProfile] = useState({
    username: 'NOVA_Alpha',
    uid: '8492049182',
    email: 'admin@legendsoffire.com',
    matches: 42,
    wins: 14,
    kills: 188,
    earnings: 4500,
    role: 'admin'
  });
  
  // Navigation helper
  const navigateTo = (tab, category = null, tournament = null) => {
    setCurrentTab(tab);
    if (category !== undefined) setSelectedCategory(category);
    if (tournament !== undefined) setSelectedTournament(tournament);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#080808] text-[#f8fafc] font-['Rajdhani',sans-serif] pb-24">
      {/* Top Navigation Header */}
      <header className="sticky top-0 z-50 bg-[#080808]/90 backdrop-blur-md border-b border-[#222] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigateTo('home')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#FF6A00] to-[#008CFF] flex items-center justify-center shadow-neon">
            <Flame className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-['Orbitron'] font-black text-lg tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#FF6A00] to-[#ffa500]">
              LEGENDS OF FIRE
            </h1>
            <p className="text-[10px] text-zinc-400 tracking-widest uppercase">Esports Platform</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div 
            onClick={() => navigateTo('wallet')}
            className="flex items-center space-x-1.5 bg-[#151515] border border-[#333] px-3 py-1.5 rounded-full cursor-pointer hover:border-[#FF6A00] transition"
          >
            <Wallet className="w-4 h-4 text-[#FF6A00]" />
            <span className="font-['Orbitron'] font-bold text-xs">৳{walletBalance}</span>
          </div>

          <div 
            onClick={() => navigateTo('notifications')}
            className="relative p-2 bg-[#151515] border border-[#333] rounded-full cursor-pointer hover:border-[#FF6A00] transition"
          >
            <Bell className="w-4 h-4 text-zinc-300" />
            {notifications.some(n => !n.read) && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#FF6A00] rounded-full animate-pulse"></span>
            )}
          </div>

          <div 
            onClick={() => navigateTo('profile')}
            className="w-9 h-9 rounded-full bg-[#222] border border-[#FF6A00] flex items-center justify-center overflow-hidden cursor-pointer"
          >
            <User className="w-5 h-5 text-zinc-300" />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        {currentTab === 'home' && <HomePage navigateTo={navigateTo} />}
        {currentTab === 'categories' && <TournamentListing category={selectedCategory} navigateTo={navigateTo} />}
        {currentTab === 'tournament-detail' && <TournamentDetails tournament={selectedTournament} navigateTo={navigateTo} setWalletBalance={setWalletBalance} walletBalance={walletBalance} />}
        {currentTab === 'matches' && <MyMatches navigateTo={navigateTo} />}
        {currentTab === 'wallet' && <WalletPage walletBalance={walletBalance} setWalletBalance={setWalletBalance} />}
        {currentTab === 'shop' && <ShopPage />}
        {currentTab === 'profile' && <ProfilePage userProfile={userProfile} navigateTo={navigateTo} />}
        {currentTab === 'notifications' && <NotificationsPage notifications={notifications} setNotifications={setNotifications} />}
        {currentTab === 'admin' && <AdminDashboard />}
      </main>

      {/* Floating Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#121212]/95 backdrop-blur-lg border-t border-[#222] px-6 py-3">
        <div className="max-w-md mx-auto flex justify-around items-center">
          <NavItem 
            icon={<Flame className="w-5 h-5" />} 
            label="Home" 
            active={currentTab === 'home'} 
            onClick={() => navigateTo('home')} 
          />
          <NavItem 
            icon={<Trophy className="w-5 h-5" />} 
            label="My Matches" 
            active={currentTab === 'matches'} 
            onClick={() => navigateTo('matches')} 
          />
          <NavItem 
            icon={<ShoppingBag className="w-5 h-5" />} 
            label="Shop" 
            active={currentTab === 'shop'} 
            onClick={() => navigateTo('shop')} 
          />
          <NavItem 
            icon={<User className="w-5 h-5" />} 
            label="Profile" 
            active={currentTab === 'profile'} 
            onClick={() => navigateTo('profile')} 
          />
          {userProfile.role === 'admin' && (
            <NavItem 
              icon={<Shield className="w-5 h-5" />} 
              label="Admin" 
              active={currentTab === 'admin'} 
              onClick={() => navigateTo('admin')} 
            />
          )}
        </div>
      </nav>
    </div>
  );
}

function NavItem({ icon, label, active, onClick }) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center space-y-1 transition duration-200 ${active ? 'text-[#FF6A00]' : 'text-zinc-400 hover:text-zinc-200'}`}
    >
      <div className={`p-1.5 rounded-xl ${active ? 'bg-[#FF6A00]/10 shadow-neon' : ''}`}>
        {icon}
      </div>
      <span className="text-[10px] font-['Orbitron'] tracking-wider">{label}</span>
    </button>
  );
}

// 1. HOME PAGE
function HomePage({ navigateTo }) {
  const [activeBanner, setActiveBanner] = useState(0);
  const banners = [
    { title: 'LEGENDS OF FIRE SEASON 4', prize: '৳50,000 PRIZE POOL', subtitle: 'Squad Bermuda Championship', bg: 'from-[#FF6A00] to-[#b32d00]' },
    { title: 'LONE WOLF DUEL BATTLE', prize: '৳10,000 PRIZE POOL', subtitle: '1v1 & 2v2 Ultimate Showdown', bg: 'from-[#008CFF] to-[#004488]' },
    { title: 'VIP PASS GIVEAWAY', prize: 'FREE ENTRY TOURNAMENTS', subtitle: 'Win Exclusive Rewards Every Day', bg: 'from-[#8b5cf6] to-[#4c1d95]' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveBanner(prev => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const categories = [
    { id: 'br', title: 'BR MATCH', count: '12 Tournaments', icon: '🔥', color: 'from-[#FF6A00]/20 to-[#151515]' },
    { id: 'esports', title: 'E-SPORTS MODE', count: '8 Tournaments', icon: '⚡', color: 'from-[#008CFF]/20 to-[#151515]' },
    { id: 'lonewolf', title: 'LONE WOLF', count: '15 Tournaments', icon: '🎯', color: 'from-purple-500/20 to-[#151515]' },
    { id: 'lost', title: 'LOST TO WIN', count: '6 Tournaments', icon: '🏆', color: 'from-amber-500/20 to-[#151515]' },
    { id: 'solo', title: 'SOLO TOURNAMENT', count: '10 Tournaments', icon: '👤', color: 'from-emerald-500/20 to-[#151515]' },
    { id: 'duo', title: 'DUO TOURNAMENT', count: '9 Tournaments', icon: '👥', color: 'from-rose-500/20 to-[#151515]' },
    { id: 'squad', title: 'SQUAD TOURNAMENT', count: '18 Tournaments', icon: '🛡️', color: 'from-cyan-500/20 to-[#151515]' },
    { id: 'custom', title: 'CUSTOM ROOM', count: '20+ Active', icon: '🎮', color: 'from-indigo-500/20 to-[#151515]' },
  ];

  return (
    <div className="space-y-6">
      {/* Promotional Banner Slider */}
      <div className="relative overflow-hidden rounded-2xl border border-[#333] shadow-lg">
        <div 
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${activeBanner * 100}%)` }}
        >
          {banners.map((banner, index) => (
            <div key={index} className={`min-w-full p-6 bg-gradient-to-r ${banner.bg} text-white flex flex-col justify-between`}>
              <div className="space-y-1">
                <span className="bg-black/40 px-2.5 py-1 rounded-md text-[10px] font-['Orbitron'] tracking-widest uppercase font-bold">{banner.prize}</span>
                <h2 className="text-2xl font-black font-['Orbitron'] mt-2">{banner.title}</h2>
                <p className="text-sm opacity-90">{banner.subtitle}</p>
              </div>
              <div className="mt-6 flex items-center justify-between">
                <button 
                  onClick={() => navigateTo('categories', 'squad')}
                  className="bg-black text-white px-5 py-2.5 rounded-xl font-['Orbitron'] text-xs font-bold tracking-wider hover:bg-zinc-900 transition flex items-center space-x-2 shadow-lg"
                >
                  <span>JOIN TOURNAMENT</span>
                  <ChevronRight className="w-4 h-4 text-[#FF6A00]" />
                </button>
                <div className="flex space-x-1.5">
                  {banners.map((_, i) => (
                    <div key={i} className={`w-2 h-2 rounded-full ${activeBanner === i ? 'bg-white' : 'bg-white/40'}`} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Announcement Bar */}
      <div className="bg-[#151515] border border-[#333] rounded-xl p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF6A00] animate-ping" />
          <p className="text-xs font-medium text-zinc-300">Welcome to LEGENDS OF FIRE! Join our community for live updates.</p>
        </div>
        <div className="flex space-x-2">
          <a href="https://telegram.org" target="_blank" rel="noreferrer" className="bg-[#008CFF]/20 text-[#008CFF] border border-[#008CFF]/40 px-3 py-1.5 rounded-lg text-xs font-['Orbitron'] font-bold hover:bg-[#008CFF]/30 transition">
            Telegram
          </a>
        </div>
      </div>

      {/* Tournament Categories Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-['Orbitron'] font-bold text-lg text-white">Tournament Categories</h3>
          <span className="text-xs text-[#FF6A00] cursor-pointer hover:underline">View All</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {categories.map((cat) => (
            <div 
              key={cat.id}
              onClick={() => navigateTo('categories', cat.id)}
              className={`bg-gradient-to-b ${cat.color} border border-[#262626] p-4 rounded-xl cursor-pointer hover:border-[#FF6A00] transition transform hover:-translate-y-1 shadow-md`}
            >
              <div className="text-3xl mb-2">{cat.icon}</div>
              <h4 className="font-['Orbitron'] font-bold text-sm text-white">{cat.title}</h4>
              <p className="text-xs text-zinc-400 mt-1">{cat.count}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 2. TOURNAMENT LISTING
function TournamentListing({ category, navigateTo }) {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const tournaments = [
    { id: 1, name: 'SQUAD BERMUDA CHAMPIONSHIP #42', mode: 'Squad', date: 'May 18, 2026', time: '08:00 PM', entryFee: 50, prizePool: 5000, totalSlots: 48, availableSlots: 6, status: 'Registration Open', banner: 'bg-gradient-to-r from-orange-600 to-red-700' },
    { id: 2, name: 'LONE WOLF 1V1 DUEL TOURNAMENT', mode: 'Lone Wolf', date: 'May 19, 2026', time: '04:00 PM', entryFee: 30, prizePool: 1500, totalSlots: 16, availableSlots: 0, status: 'Slots Full', banner: 'bg-gradient-to-r from-blue-600 to-indigo-700' },
    { id: 3, name: 'SOLO KALAHARI SURVIVAL #12', mode: 'Solo', date: 'May 20, 2026', time: '07:30 PM', entryFee: 0, prizePool: 1000, totalSlots: 48, availableSlots: 18, status: 'Upcoming', banner: 'bg-gradient-to-r from-purple-600 to-pink-700' },
    { id: 4, name: 'DUO PURGATORY CLASH #09', mode: 'Duo', date: 'May 15, 2026', time: '09:00 PM', entryFee: 40, prizePool: 3000, totalSlots: 24, availableSlots: 0, status: 'Completed', banner: 'bg-gradient-to-r from-emerald-600 to-teal-700' },
  ];

  const filteredTournaments = tournaments.filter(t => {
    if (filter === 'free' && t.entryFee > 0) return false;
    if (filter === 'paid' && t.entryFee === 0) return false;
    if (filter === 'upcoming' && t.status !== 'Upcoming' && t.status !== 'Registration Open') return false;
    if (filter === 'completed' && t.status !== 'Completed') return false;
    if (searchQuery && !t.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-['Orbitron'] font-bold text-xl text-white uppercase">{category ? `${category} Tournaments` : 'All Tournaments'}</h2>
        <button onClick={() => navigateTo('home')} className="text-xs text-[#FF6A00] hover:underline">Back to Home</button>
      </div>

      {/* Search and Filters */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-3 w-4 h-4 text-zinc-400" />
          <input 
            type="text" 
            placeholder="Search tournaments by name..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#151515] border border-[#333] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#FF6A00]"
          />
        </div>

        <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-none">
          {['all', 'free', 'paid', 'upcoming', 'completed'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-lg text-xs font-['Orbitron'] font-bold uppercase whitespace-nowrap transition ${filter === f ? 'bg-[#FF6A00] text-white shadow-neon' : 'bg-[#151515] text-zinc-400 border border-[#333]'}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Tournament Cards List */}
      <div className="space-y-4">
        {filteredTournaments.map((t) => (
          <div 
            key={t.id}
            onClick={() => navigateTo('tournament-detail', null, t)}
            className="bg-[#151515] border border-[#262626] rounded-2xl overflow-hidden cursor-pointer hover:border-[#FF6A00] transition group shadow-lg"
          >
            <div className={`h-24 ${t.banner} p-4 flex flex-col justify-between relative`}>
              <div className="flex justify-between items-start">
                <span className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-['Orbitron'] font-bold text-white uppercase">{t.mode}</span>
                <span className={`px-2.5 py-1 rounded-md text-[10px] font-['Orbitron'] font-bold uppercase ${t.status === 'Registration Open' ? 'bg-emerald-500 text-white' : t.status === 'Slots Full' ? 'bg-red-500 text-white' : 'bg-zinc-700 text-zinc-200'}`}>
                  {t.status}
                </span>
              </div>
              <h4 className="font-['Orbitron'] font-bold text-base text-white group-hover:text-[#FF6A00] transition">{t.name}</h4>
            </div>

            <div className="p-4 space-y-3">
              <div className="grid grid-cols-2 gap-2 text-xs text-zinc-300">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-[#FF6A00]" />
                  <span>{t.date} | {t.time}</span>
                </div>
                <div className="flex items-center space-x-2 justify-end">
                  <Trophy className="w-4 h-4 text-amber-400" />
                  <span className="font-bold text-amber-400">Prize: ৳{t.prizePool}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[#222]">
                <div>
                  <span className="text-[10px] text-zinc-400 uppercase">Entry Fee</span>
                  <p className="font-['Orbitron'] font-bold text-sm text-white">{t.entryFee === 0 ? 'FREE' : `৳${t.entryFee}`}</p>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-400 uppercase">Slots Available</span>
                  <p className="font-['Orbitron'] font-bold text-sm text-[#008CFF]">{t.availableSlots} / {t.totalSlots}</p>
                </div>
                <button className="bg-[#FF6A00] hover:bg-[#e05d00] text-white px-4 py-2 rounded-xl text-xs font-['Orbitron'] font-bold transition">
                  Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// 3. TOURNAMENT DETAILS & REGISTRATION MODAL
function TournamentDetails({ tournament, navigateTo, setWalletBalance, walletBalance }) {
  const [showRegModal, setShowRegModal] = useState(false);
  const [teamName, setTeamName] = useState('');
  const [playerUid, setPlayerUid] = useState('');
  const [teammates, setTeammates] = useState('');
  const [registered, setRegistered] = useState(false);

  if (!tournament) return <div>Tournament not found</div>;

  const handleRegister = (e) => {
    e.preventDefault();
    if (tournament.entryFee > walletBalance) {
      alert('Insufficient wallet balance! Please add funds.');
      navigateTo('wallet');
      return;
    }
    if (tournament.entryFee > 0) {
      setWalletBalance(prev => prev - tournament.entryFee);
    }
    setRegistered(true);
    setShowRegModal(false);
    alert('Tournament registration successful! Your slot is confirmed.');
  };

  return (
    <div className="space-y-6">
      <button onClick={() => navigateTo('categories')} className="text-xs text-[#FF6A00] hover:underline">← Back to Tournaments</button>

      <div className={`rounded-2xl p-6 ${tournament.banner} text-white space-y-4 shadow-lg`}>
        <div className="flex justify-between items-center">
          <span className="bg-black/60 px-3 py-1 rounded-md text-xs font-['Orbitron'] font-bold">{tournament.mode}</span>
          <span className="bg-emerald-500 text-white px-3 py-1 rounded-md text-xs font-['Orbitron'] font-bold">{tournament.status}</span>
        </div>
        <h2 className="text-2xl font-black font-['Orbitron']">{tournament.name}</h2>
        <div className="grid grid-cols-2 gap-4 pt-2">
          <div>
            <span className="text-xs opacity-80 uppercase">Prize Pool</span>
            <p className="text-xl font-black font-['Orbitron'] text-amber-300">৳{tournament.prizePool}</p>
          </div>
          <div>
            <span className="text-xs opacity-80 uppercase">Entry Fee</span>
            <p className="text-xl font-black font-['Orbitron']">{tournament.entryFee === 0 ? 'FREE' : `৳${tournament.entryFee}`}</p>
          </div>
        </div>
      </div>

      <div className="bg-[#151515] border border-[#262626] rounded-2xl p-6 space-y-4 shadow-lg">
        <h3 className="font-['Orbitron'] font-bold text-lg text-white border-b border-[#222] pb-2">Tournament Information</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-xs text-zinc-400">Match Date</span>
            <p className="font-semibold text-white">{tournament.date}</p>
          </div>
          <div>
            <span className="text-xs text-zinc-400">Match Time</span>
            <p className="font-semibold text-white">{tournament.time}</p>
          </div>
          <div>
            <span className="text-xs text-zinc-400">Map</span>
            <p className="font-semibold text-white">Bermuda / Kalahari</p>
          </div>
          <div>
            <span className="text-xs text-zinc-400">Slots Available</span>
            <p className="font-semibold text-[#008CFF]">{tournament.availableSlots} / {tournament.totalSlots}</p>
          </div>
        </div>

        <div className="pt-4 border-t border-[#222]">
          <h4 className="font-['Orbitron'] font-bold text-sm text-[#FF6A00] mb-2">Prize Distribution</h4>
          <ul className="text-xs text-zinc-300 space-y-1">
            <li>🥇 1st Place: ৳{Math.round(tournament.prizePool * 0.5)} + Trophy</li>
            <li>🥈 2nd Place: ৳{Math.round(tournament.prizePool * 0.3)}</li>
            <li>🥉 3rd Place: ৳{Math.round(tournament.prizePool * 0.2)}</li>
          </ul>
        </div>

        <div className="pt-4 border-t border-[#222]">
          <h4 className="font-['Orbitron'] font-bold text-sm text-[#FF6A00] mb-2">Tournament Rules</h4>
          <ul className="text-xs text-zinc-300 space-y-1 list-disc list-inside">
            <li>Emulators are strictly prohibited unless specified.</li>
            <li>No teaming up with opponents. Fair play mandatory.</li>
            <li>Room ID and Password will be shared 15 minutes before match time in My Matches.</li>
          </ul>
        </div>

        <button 
          onClick={() => setShowRegModal(true)}
          disabled={registered || tournament.status === 'Slots Full'}
          className={`w-full py-3.5 rounded-xl font-['Orbitron'] font-bold text-sm tracking-wider transition shadow-lg ${registered ? 'bg-emerald-600 text-white cursor-not-allowed' : tournament.status === 'Slots Full' ? 'bg-zinc-700 text-zinc-400 cursor-not-allowed' : 'bg-[#FF6A00] hover:bg-[#e05d00] text-white shadow-neon'}`}
        >
          {registered ? '✓ REGISTERED (SLOT CONFIRMED)' : tournament.status === 'Slots Full' ? 'SLOTS FULL' : 'JOIN TOURNAMENT NOW'}
        </button>
      </div>

      {/* Registration Modal */}
      {showRegModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#151515] border border-[#333] rounded-2xl w-full max-w-md p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-[#222] pb-3">
              <h3 className="font-['Orbitron'] font-bold text-lg text-white">Tournament Registration</h3>
              <X className="w-5 h-5 cursor-pointer text-zinc-400 hover:text-white" onClick={() => setShowRegModal(false)} />
            </div>

            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="text-xs text-zinc-400 uppercase font-bold">Team Name / Player Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="Enter Team Name"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  className="w-full mt-1 bg-[#080808] border border-[#333] rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#FF6A00]"
                />
              </div>

              <div>
                <label className="text-xs text-zinc-400 uppercase font-bold">Free Fire UID / In-Game ID</label>
                <input 
                  type="text" 
                  required
                  placeholder="Enter your Free Fire UID"
                  value={playerUid}
                  onChange={(e) => setPlayerUid(e.target.value)}
                  className="w-full mt-1 bg-[#080808] border border-[#333] rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#FF6A00]"
                />
              </div>

              {tournament.mode === 'Squad' && (
                <div>
                  <label className="text-xs text-zinc-400 uppercase font-bold">Teammates (UIDs or Names)</label>
                  <textarea 
                    placeholder="Enter teammate names & UIDs (comma separated)"
                    value={teammates}
                    onChange={(e) => setTeammates(e.target.value)}
                    className="w-full mt-1 bg-[#080808] border border-[#333] rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#FF6A00]"
                    rows={2}
                  />
                </div>
              )}

              <div className="bg-[#080808] p-3 rounded-xl border border-[#222] flex justify-between items-center text-xs">
                <span className="text-zinc-400">Entry Fee:</span>
                <span className="font-['Orbitron'] font-bold text-[#FF6A00]">{tournament.entryFee === 0 ? 'FREE' : `৳${tournament.entryFee}`}</span>
              </div>

              <button 
                type="submit"
                className="w-full bg-[#FF6A00] hover:bg-[#e05d00] text-white py-3 rounded-xl font-['Orbitron'] font-bold text-xs uppercase tracking-wider shadow-neon transition"
              >
                Confirm & Pay ৳{tournament.entryFee}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// 4. MY MATCHES
function MyMatches({ navigateTo }) {
  const [tab, setTab] = useState('upcoming');

  const matches = [
    { id: 1, name: 'SQUAD BERMUDA CHAMPIONSHIP #42', time: 'May 18, 2026 | 08:00 PM', status: 'upcoming', roomId: '9482014', roomPass: 'LGF42', result: null },
    { id: 2, name: 'SOLO KALAHARI SURVIVAL #10', time: 'May 10, 2026 | 07:00 PM', status: 'completed', roomId: '3920194', roomPass: 'LGF10', result: { position: '#1', kills: '9 Kills', points: '39 Pts' } }
  ];

  const filteredMatches = matches.filter(m => m.status === tab);

  return (
    <div className="space-y-6">
      <h2 className="font-['Orbitron'] font-bold text-xl text-white">My Matches Dashboard</h2>

      <div className="flex bg-[#151515] p-1 rounded-xl border border-[#333]">
        {['upcoming', 'live', 'completed'].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-2 rounded-lg text-xs font-['Orbitron'] font-bold uppercase transition ${tab === t ? 'bg-[#FF6A00] text-white shadow-neon' : 'text-zinc-400 hover:text-white'}`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filteredMatches.length === 0 ? (
          <div className="text-center py-12 bg-[#151515] rounded-2xl border border-[#222]">
            <Trophy className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
            <p className="text-sm text-zinc-400 font-medium">No {tab} matches found.</p>
            <button onClick={() => navigateTo('categories')} className="mt-4 bg-[#FF6A00] text-white px-5 py-2 rounded-xl text-xs font-['Orbitron'] font-bold shadow-neon">
              Browse Tournaments
            </button>
          </div>
        ) : (
          filteredMatches.map((m) => (
            <div key={m.id} className="bg-[#151515] border border-[#262626] rounded-2xl p-5 space-y-4 shadow-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-['Orbitron'] font-bold text-base text-white">{m.name}</h4>
                  <p className="text-xs text-zinc-400 mt-1">{m.time}</p>
                </div>
                <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-2.5 py-1 rounded-md text-[10px] font-['Orbitron'] font-bold uppercase">
                  Slot Confirmed
                </span>
              </div>

              {m.status === 'upcoming' && (
                <div className="bg-[#080808] border border-[#333] p-4 rounded-xl flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-zinc-400 uppercase">Room Credentials</span>
                    <div className="flex space-x-4 mt-1 font-['Orbitron'] text-sm">
                      <span>ID: <strong className="text-[#FF6A00]">{m.roomId}</strong></span>
                      <span>Pass: <strong className="text-[#008CFF]">{m.roomPass}</strong></span>
                    </div>
                  </div>
                  <button onClick={() => alert('Credentials Copied!')} className="bg-[#222] hover:bg-[#333] text-white p-2.5 rounded-lg border border-[#4488ff]/30">
                    <Copy className="w-4 h-4 text-[#008CFF]" />
                  </button>
                </div>
              )}

              {m.status === 'completed' && m.result && (
                <div className="bg-[#080808] border border-[#333] p-4 rounded-xl flex justify-around text-center">
                  <div>
                    <span className="text-[10px] text-zinc-400 uppercase">Position</span>
                    <p className="font-['Orbitron'] font-bold text-amber-400 text-base">{m.result.position}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-400 uppercase">Kills</span>
                    <p className="font-['Orbitron'] font-bold text-[#FF6A00] text-base">{m.result.kills}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-400 uppercase">Total Points</span>
                    <p className="font-['Orbitron'] font-bold text-[#008CFF] text-base">{m.result.points}</p>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// 5. WALLET SYSTEM
function WalletPage({ walletBalance, setWalletBalance }) {
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('bKash');
  const [trxId, setTrxId] = useState('');
  const [transactions, setTransactions] = useState([
    { id: 1, type: 'Deposit', amount: 500, method: 'bKash', status: 'Approved', date: 'May 14, 2026' },
    { id: 2, type: 'Entry Fee', amount: -50, method: 'Wallet', status: 'Completed', date: 'May 12, 2026' },
    { id: 3, type: 'Prize Winning', amount: 1500, method: 'System', status: 'Completed', date: 'May 10, 2026' }
  ]);

  const handleDeposit = (e) => {
    e.preventDefault();
    if (!amount || !trxId) {
      alert('Please enter amount and transaction ID.');
      return;
    }
    const newTx = {
      id: transactions.length + 1,
      type: 'Deposit',
      amount: Number(amount),
      method: method,
      status: 'Pending Admin Verification',
      date: 'Just now'
    };
    setTransactions([newTx, ...transactions]);
    setWalletBalance(prev => prev + Number(amount));
    setAmount('');
    setTrxId('');
    alert('Deposit request submitted! Admin will verify and approve.');
  };

  return (
    <div className="space-y-6">
      <h2 className="font-['Orbitron'] font-bold text-xl text-white">Wallet & Payments</h2>

      {/* Balance Card */}
      <div className="bg-gradient-to-r from-[#FF6A00] to-[#b32d00] rounded-2xl p-6 text-white shadow-neon space-y-3">
        <span className="text-xs uppercase font-['Orbitron'] tracking-widest opacity-90">Available Balance</span>
        <h3 className="text-4xl font-black font-['Orbitron']">৳{walletBalance}</h3>
        <div className="flex space-x-3 pt-2">
          <button onClick={() => alert('Withdrawal request feature open.')} className="bg-black text-white px-4 py-2 rounded-xl text-xs font-['Orbitron'] font-bold hover:bg-zinc-900 transition">
            Withdraw Funds
          </button>
        </div>
      </div>

      {/* Add Funds Form */}
      <div className="bg-[#151515] border border-[#262626] rounded-2xl p-6 space-y-4 shadow-lg">
        <h3 className="font-['Orbitron'] font-bold text-base text-white">Add Funds (bKash / Nagad / Rocket)</h3>
        <form onSubmit={handleDeposit} className="space-y-4">
          <div>
            <label className="text-xs text-zinc-400 uppercase font-bold">Select Payment Method</label>
            <select 
              value={method} 
              onChange={(e) => setMethod(e.target.value)}
              className="w-full mt-1 bg-[#080808] border border-[#333] rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#FF6A00]"
            >
              <option value="bKash">bKash Personal: 018XXXXXXXX</option>
              <option value="Nagad">Nagad Personal: 018XXXXXXXX</option>
              <option value="Rocket">Rocket Personal: 018XXXXXXXX</option>
            </select>
          </div>

          <div>
            <label className="text-xs text-zinc-400 uppercase font-bold">Amount (BDT)</label>
            <input 
              type="number" 
              placeholder="Enter amount (e.g. 500)"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full mt-1 bg-[#080808] border border-[#333] rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#FF6A00]"
            />
          </div>

          <div>
            <label className="text-xs text-zinc-400 uppercase font-bold">Transaction ID (TrxID)</label>
            <input 
              type="text" 
              placeholder="Enter TrxID after payment"
              value={trxId}
              onChange={(e) => setTrxId(e.target.value)}
              className="w-full mt-1 bg-[#080808] border border-[#333] rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#FF6A00]"
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-[#008CFF] hover:bg-[#0070cc] text-white py-3 rounded-xl font-['Orbitron'] font-bold text-xs uppercase tracking-wider shadow-blueNeon transition"
          >
            Verify & Add Deposit
          </button>
        </form>
      </div>

      {/* Transaction History */}
      <div className="bg-[#151515] border border-[#262626] rounded-2xl p-6 space-y-4 shadow-lg">
        <h3 className="font-['Orbitron'] font-bold text-base text-white">Transaction History</h3>
        <div className="space-y-3">
          {transactions.map((tx) => (
            <div key={tx.id} className="flex items-center justify-between p-3 bg-[#080808] border border-[#222] rounded-xl">
              <div>
                <p className="font-['Orbitron'] font-bold text-sm text-white">{tx.type} ({tx.method})</p>
                <span className="text-[10px] text-zinc-400">{tx.date}</span>
              </div>
              <div className="text-right">
                <p className={`font-['Orbitron'] font-bold text-sm ${tx.amount > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {tx.amount > 0 ? `+৳${tx.amount}` : `-৳${Math.abs(tx.amount)}`}
                </p>
                <span className="text-[10px] text-zinc-400 uppercase">{tx.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 6. ESPORTS SHOP
function ShopPage() {
  const products = [
    { id: 1, name: 'VIP Tournament Pass', price: 199, desc: 'Free entry to all daily custom rooms & priority slot booking for 30 days.', badge: 'POPULAR' },
    { id: 2, name: 'Elite Squad Bundle', price: 499, desc: 'Includes custom guild banner design, profile badge, and 500 bonus wallet credits.', badge: 'BEST VALUE' },
    { id: 3, name: 'Pro Custom Room Creation', price: 99, desc: 'Host your own custom room with custom rules and custom room ID/Password support.', badge: 'HOST' },
  ];

  return (
    <div className="space-y-6">
      <h2 className="font-['Orbitron'] font-bold text-xl text-white">Esports Shop & Passes</h2>

      <div className="grid grid-cols-1 gap-4">
        {products.map((p) => (
          <div key={p.id} className="bg-[#151515] border border-[#262626] rounded-2xl p-6 space-y-4 shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-['Orbitron'] font-bold text-lg text-white">{p.name}</h3>
                <span className="bg-[#FF6A00]/20 text-[#FF6A00] border border-[#FF6A00]/40 px-2.5 py-1 rounded-md text-[10px] font-['Orbitron'] font-bold uppercase">
                  {p.badge}
                </span>
              </div>
              <p className="text-xs text-zinc-400">{p.desc}</p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[#222]">
              <span className="font-['Orbitron'] font-bold text-xl text-amber-400">৳{p.price}</span>
              <button 
                onClick={() => alert(`Successfully purchased ${p.name}!`)}
                className="bg-[#FF6A00] hover:bg-[#e05d00] text-white px-5 py-2.5 rounded-xl text-xs font-['Orbitron'] font-bold uppercase tracking-wider shadow-neon transition"
              >
                Purchase Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// 7. PLAYER PROFILE
function ProfilePage({ userProfile, navigateTo }) {
  return (
    <div className="space-y-6">
      <h2 className="font-['Orbitron'] font-bold text-xl text-white">Player Profile</h2>

      <div className="bg-[#151515] border border-[#262626] rounded-2xl p-6 text-center space-y-4 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-r from-[#FF6A00] to-[#008CFF] opacity-30" />
        <div className="relative z-10">
          <div className="w-20 h-20 rounded-full bg-[#080808] border-2 border-[#FF6A00] mx-auto flex items-center justify-center shadow-neon mb-3">
            <User className="w-10 h-10 text-white" />
          </div>
          <h3 className="font-['Orbitron'] font-bold text-lg text-white">{userProfile.username}</h3>
          <p className="text-xs text-zinc-400">UID: {userProfile.uid}</p>
          <span className="inline-block mt-2 bg-[#FF6A00]/20 text-[#FF6A00] border border-[#FF6A00]/40 px-3 py-1 rounded-full text-[10px] font-['Orbitron'] font-bold uppercase">
            Verified Pro Player
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[#151515] border border-[#262626] p-4 rounded-xl text-center shadow-md">
          <span className="text-xs text-zinc-400 uppercase font-bold">Total Matches</span>
          <p className="text-2xl font-black font-['Orbitron'] text-white mt-1">{userProfile.matches}</p>
        </div>
        <div className="bg-[#151515] border border-[#262626] p-4 rounded-xl text-center shadow-md">
          <span className="text-xs text-zinc-400 uppercase font-bold">Total Wins</span>
          <p className="text-2xl font-black font-['Orbitron'] text-amber-400 mt-1">{userProfile.wins}</p>
        </div>
        <div className="bg-[#151515] border border-[#262626] p-4 rounded-xl text-center shadow-md">
          <span className="text-xs text-zinc-400 uppercase font-bold">Total Kills</span>
          <p className="text-2xl font-black font-['Orbitron'] text-[#FF6A00] mt-1">{userProfile.kills}</p>
        </div>
        <div className="bg-[#151515] border border-[#262626] p-4 rounded-xl text-center shadow-md">
          <span className="text-xs text-zinc-400 uppercase font-bold">Total Earnings</span>
          <p className="text-2xl font-black font-['Orbitron'] text-emerald-400 mt-1">৳{userProfile.earnings}</p>
        </div>
      </div>

      <div className="bg-[#151515] border border-[#262626] rounded-2xl p-6 space-y-3 shadow-lg">
        <h4 className="font-['Orbitron'] font-bold text-sm text-white border-b border-[#222] pb-2">Account Settings</h4>
        <button onClick={() => alert('Profile update modal opened.')} className="w-full text-left py-2 text-xs text-zinc-300 hover:text-[#FF6A00] transition flex items-center justify-between">
          <span>Edit In-Game IGN & UID</span>
          <ChevronRight className="w-4 h-4 text-zinc-500" />
        </button>
        <button onClick={() => alert('Password change link sent.')} className="w-full text-left py-2 text-xs text-zinc-300 hover:text-[#FF6A00] transition flex items-center justify-between">
          <span>Change Password</span>
          <ChevronRight className="w-4 h-4 text-zinc-500" />
        </button>
        <button onClick={() => alert('Logged out successfully.')} className="w-full text-left py-2 text-xs text-rose-400 hover:text-rose-300 transition flex items-center justify-between border-t border-[#222] pt-3">
          <span>Log Out</span>
          <LogOut className="w-4 h-4 text-rose-400" />
        </button>
      </div>
    </div>
  );
}

// 8. NOTIFICATIONS
function NotificationsPage({ notifications, setNotifications }) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="font-['Orbitron'] font-bold text-xl text-white">Notifications</h2>
        <button 
          onClick={() => setNotifications(notifications.map(n => ({ ...n, read: true })))} 
          className="text-xs text-[#FF6A00] hover:underline"
        >
          Mark all as read
        </button>
      </div>

      <div className="space-y-3">
        {notifications.map((n) => (
          <div key={n.id} className={`p-4 rounded-2xl border flex items-start space-x-3 ${n.read ? 'bg-[#151515] border-[#222]' : 'bg-[#151515]/90 border-[#FF6A00]/40 shadow-neon'}`}>
            <div className="w-2.5 h-2.5 rounded-full bg-[#FF6A00] mt-1.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm text-white font-medium">{n.title}</p>
              <span className="text-[10px] text-zinc-400">{n.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// 9. ADMIN DASHBOARD
function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('tournaments');

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-zinc-900 to-[#151515] border border-[#333] rounded-2xl p-6">
        <div className="flex items-center space-x-3">
          <Shield className="w-8 h-8 text-[#FF6A00]" />
          <div>
            <h2 className="font-['Orbitron'] font-bold text-xl text-white">Admin Control Dashboard</h2>
            <p className="text-xs text-zinc-400">Complete platform management for Legends of Fire</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="bg-[#151515] border border-[#262626] p-4 rounded-xl text-center shadow-md">
          <span className="text-[10px] text-zinc-400 uppercase font-bold">Total Users</span>
          <p className="text-xl font-black font-['Orbitron'] text-white mt-1">1,480</p>
        </div>
        <div className="bg-[#151515] border border-[#262626] p-4 rounded-xl text-center shadow-md">
          <span className="text-[10px] text-zinc-400 uppercase font-bold">Active Tourneys</span>
          <p className="text-xl font-black font-['Orbitron'] text-[#FF6A00] mt-1">12</p>
        </div>
        <div className="bg-[#151515] border border-[#262626] p-4 rounded-xl text-center shadow-md">
          <span className="text-[10px] text-zinc-400 uppercase font-bold">Pending Dep.</span>
          <p className="text-xl font-black font-['Orbitron'] text-[#008CFF] mt-1">3</p>
        </div>
      </div>

      <div className="flex bg-[#151515] p-1 rounded-xl border border-[#333]">
        {['tournaments', 'deposits', 'results'].map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={`flex-1 py-2 rounded-lg text-xs font-['Orbitron'] font-bold uppercase transition ${activeTab === t ? 'bg-[#FF6A00] text-white shadow-neon' : 'text-zinc-400 hover:text-white'}`}
          >
            {t}
          </button>
        ))}
      </div>

      {activeTab === 'tournaments' && (
        <div className="bg-[#151515] border border-[#262626] rounded-2xl p-6 space-y-4 shadow-lg">
          <div className="flex justify-between items-center">
            <h3 className="font-['Orbitron'] font-bold text-base text-white">Tournament Management</h3>
            <button onClick={() => alert('Create tournament modal opened.')} className="bg-[#FF6A00] text-white px-4 py-2 rounded-xl text-xs font-['Orbitron'] font-bold shadow-neon">
              + Create New
            </button>
          </div>
          <div className="space-y-3">
            <div className="p-4 bg-[#080808] border border-[#222] rounded-xl flex justify-between items-center">
              <div>
                <h4 className="font-['Orbitron'] font-bold text-sm text-white">Squad Bermuda #42</h4>
                <p className="text-xs text-zinc-400">Slots: 42 / 48 | Fee: ৳50</p>
              </div>
              <div className="flex space-x-2">
                <button onClick={() => alert('Tournament edited.')} className="bg-[#222] text-xs px-3 py-1.5 rounded-lg border border-[#333] hover:border-[#FF6A00]">Edit</button>
                <button onClick={() => alert('Tournament deleted.')} className="bg-rose-500/20 text-rose-400 text-xs px-3 py-1.5 rounded-lg border border-rose-500/40">Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'deposits' && (
        <div className="bg-[#151515] border border-[#262626] rounded-2xl p-6 space-y-4 shadow-lg">
          <h3 className="font-['Orbitron'] font-bold text-base text-white">Pending Deposits & Verifications</h3>
          <div className="space-y-3">
            <div className="p-4 bg-[#080808] border border-[#222] rounded-xl flex justify-between items-center">
              <div>
                <h4 className="font-['Orbitron'] font-bold text-sm text-white">NOVA_Alpha (৳500)</h4>
                <p className="text-xs text-zinc-400">bKash | TrxID: 9X8402918</p>
              </div>
              <div className="flex space-x-2">
                <button onClick={() => alert('Deposit Approved & Credited.')} className="bg-emerald-600 text-white text-xs px-3 py-1.5 rounded-lg font-bold">Approve</button>
                <button onClick={() => alert('Deposit Rejected.')} className="bg-rose-600 text-white text-xs px-3 py-1.5 rounded-lg font-bold">Reject</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'results' && (
        <div className="bg-[#151515] border border-[#262626] rounded-2xl p-6 space-y-4 shadow-lg">
          <h3 className="font-['Orbitron'] font-bold text-base text-white">Publish Match Results & Room ID</h3>
          <form onSubmit={(e) => { e.preventDefault(); alert('Match results published successfully!'); }} className="space-y-4">
            <div>
              <label className="text-xs text-zinc-400 uppercase font-bold">Select Tournament</label>
              <select className="w-full mt-1 bg-[#080808] border border-[#333] rounded-xl px-3 py-2 text-sm text-white">
                <option>Squad Bermuda Championship #42</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-zinc-400 uppercase font-bold">Room ID</label>
                <input type="text" placeholder="e.g. 948201" className="w-full mt-1 bg-[#080808] border border-[#333] rounded-xl px-3 py-2 text-sm text-white" />
              </div>
              <div>
                <label className="text-xs text-zinc-400 uppercase font-bold">Room Password</label>
                <input type="text" placeholder="e.g. LGF42" className="w-full mt-1 bg-[#080808] border border-[#333] rounded-xl px-3 py-2 text-sm text-white" />
              </div>
            </div>
            <button type="submit" className="w-full bg-[#FF6A00] hover:bg-[#e05d00] text-white py-3 rounded-xl font-['Orbitron'] font-bold text-xs uppercase tracking-wider shadow-neon transition">
              Publish Room Info & Results
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
