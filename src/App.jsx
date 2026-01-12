import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { FaWhatsapp } from 'react-icons/fa';
import { 
  Mail, 
  Play, 
  Menu, 
  X,
  User,
  Zap,
  Award,
  ArrowRight,
  Layers,
  Image as ImageIcon,
  Scissors,
  Plus,
  Minus,
  CheckCircle2,
  MousePointer2,
  Video,
  MessageSquare,
  Compass,
  Palette,
  Camera,
  Film,
  Building2
} from 'lucide-react';
import logoImg from './assets/Akshay-logo.png';

/**
 * CUSTOM COMPONENTS
 */

const Logo = ({ className }) => (
  <div className={`relative flex items-center justify-center select-none ${className}`}>
    <img 
      src={logoImg}
      alt="Akshay Nagar Logo" 
      className="w-full h-full object-contain scale-125" 
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = "https://via.placeholder.com/40?text=AN";
      }}
    />
  </div>
);

const DurationBadge = ({ duration }) => (
  <div className="absolute bottom-3 right-3 z-10 px-2 py-0.5 mr-2 bg-black/70 backdrop-blur-md border border-white/10 rounded text-[10px] font-bold text-white transition-opacity group-hover:opacity-0">
    {duration}
  </div>
);

const HoverVideoCard = ({ videoSrc, isVertical, onClick, duration, showBadge }) => {
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => console.log("Video play interrupted"));
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div 
      className="group cursor-pointer relative reveal" 
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={`relative overflow-hidden bg-black border border-white/5 shadow-2xl transition-all duration-500 group-hover:scale-[1.02] ${
        isVertical ? 'aspect-[9/16] rounded-2xl md:rounded-[3rem]' : 'aspect-video rounded-2xl md:rounded-[2.5rem]'
      }`}>
        <video 
          ref={videoRef}
          src={`${videoSrc}#t=0.1`} 
          className="w-full h-full object-cover" 
          muted 
          playsInline
          preload="metadata" 
        />
        
        {showBadge && <DurationBadge duration={duration} />}

        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all" />
        <div className="absolute inset-0 flex items-center justify-center transition-all duration-500">
          <div className={`${isVertical ? 'w-12 h-12' : 'w-16 h-16'} bg-orange-600 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform`}>
            <Play className={`${isVertical ? 'w-4 h-4' : 'w-6 h-6'} text-white fill-current`} />
          </div>
        </div>
      </div>
    </div>
  );
};

const StarBackground = () => (
  <div 
    className="absolute inset-[-100px] md:inset-[-150px] pointer-events-none"
    style={{
      maskImage: 'radial-gradient(circle at center, black 20%, transparent 80%)',
      WebkitMaskImage: 'radial-gradient(circle at center, black 20%, transparent 80%)',
    }}
  >
    {[...Array(30)].map((_, i) => {
      const size = Math.random() * 3 + 1.2;
      const angle = (Math.random() * 360);
      const distance = 100 + Math.random() * 120;
      const duration = 10 + Math.random() * 10; 
      const delay = Math.random() * -20;
      const x = Math.cos(angle * (Math.PI / 180)) * distance;
      const y = Math.sin(angle * (Math.PI / 180)) * distance;
      return (
        <div key={i} className="absolute rounded-full bg-gradient-to-br from-orange-400 to-red-600"
          style={{
            width: `${size}px`, height: `${size}px`, top: '50%', left: '50%', opacity: 0.6,
            boxShadow: `0 0 ${size * 4}px rgba(249, 115, 22, 0.8)`,
            animation: `slowRhythmicOrbit ${duration}s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite`,
            animationDelay: `${delay}s`, '--tx': `${x}px`, '--ty': `${y}px`,
          }}
        />
      );
    })}
  </div>
);

const VideoModal = ({ activeVideo, onClose }) => {
  if (!activeVideo) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 md:p-10">
      <div className="absolute inset-0 bg-black/95 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative bg-black border border-white/10 shadow-[0_0_50px_rgba(249,115,22,0.4)] animate-video-pop overflow-hidden ${
        activeVideo.isVertical ? 'h-[80vh] md:h-[85vh] aspect-[9/16] rounded-2xl md:rounded-[2.5rem]' : 'w-full max-w-5xl aspect-video rounded-xl md:rounded-3xl'
      }`}>
        <button onClick={onClose} className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/10 hover:bg-orange-600 text-white rounded-full flex items-center justify-center transition-colors backdrop-blur-md">
          <X className="w-6 h-6" />
        </button>
        <video src={activeVideo.src} controls autoPlay playsInline className="w-full h-full object-contain" />
      </div>
    </div>
  );
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null);
  
  const INITIAL_LONG_FORM = 2;
  const INITIAL_SHORTS = 4;
  const INITIAL_SHOOTS = 4;
  const [visibleLongForm, setVisibleLongForm] = useState(INITIAL_LONG_FORM);
  const [visibleShorts, setVisibleShorts] = useState(INITIAL_SHORTS);
  const [visibleShoots, setVisibleShoots] = useState(INITIAL_SHOOTS);

  useEffect(() => {
    const observerOptions = { threshold: 0.05, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [visibleLongForm, visibleShorts, visibleShoots]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; 
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const ytProjects = [
    { id: 1, duration: "00:45", videoSrc: "https://pub-03644fa742f0401d833053a6506b2229.r2.dev/Final/final%20video/long.mp4" },
    { id: 2, duration: "00:33", videoSrc: "https://pub-03644fa742f0401d833053a6506b2229.r2.dev/Final/final%20video/long%20(2).mp4" },
  ];

  const reelProjects = [
    { id: 19, videoSrc: "https://pub-03644fa742f0401d833053a6506b2229.r2.dev/Final/final%20video/6%20reel%20sudhir%20kove.mp4" },
    { id: 16, videoSrc: "https://pub-03644fa742f0401d833053a6506b2229.r2.dev/Final/final%20video/Sample%20r.mp4" },
    { id: 7, videoSrc: "https://pub-03644fa742f0401d833053a6506b2229.r2.dev/Final/final%20video/reel%20(3).MP4" },
    { id: 15, videoSrc: "https://pub-03644fa742f0401d833053a6506b2229.r2.dev/Final/final%20video/SaveInsta.App%20-%203027107148419002186_30172539797.mp4" },
    { id: 6, videoSrc: "https://pub-03644fa742f0401d833053a6506b2229.r2.dev/Final/final%20video/reeltwo.mp4" },
    { id: 8, videoSrc: "https://pub-03644fa742f0401d833053a6506b2229.r2.dev/Final/final%20video/reel%20(2).mp4" },
    { id: 17, videoSrc: "https://pub-03644fa742f0401d833053a6506b2229.r2.dev/Final/final%20video/Om%20space%20webinar%20video%205.mp4" },
    { id: 18, videoSrc: "https://pub-03644fa742f0401d833053a6506b2229.r2.dev/Final/final%20video/Embark%20on%20a%20flavor%20filled%20video%20with%20our%20Peri%20Peri%20Poha.%20This%20vibrant%20and%20zesty%20dish%20combines%20th.mp4" },
    { id: 5, videoSrc: "https://pub-03644fa742f0401d833053a6506b2229.r2.dev/Final/final%20video/reelone.MOV" },
  ];

  const shootproject = [
    { id: 11, videoSrc: "https://pub-03644fa742f0401d833053a6506b2229.r2.dev/Shoot/shoot/2025_07_06_16_06_IMG_2486.MOV" },
    { id: 12, videoSrc: "https://pub-03644fa742f0401d833053a6506b2229.r2.dev/Shoot/shoot/2025_07_06_16_17_IMG_2490.MOV" },
    { id: 13, videoSrc: "https://pub-03644fa742f0401d833053a6506b2229.r2.dev/Shoot/shoot/2025_07_06_16_18_IMG_2491.MOV" },
    { id: 14, videoSrc: "https://pub-03644fa742f0401d833053a6506b2229.r2.dev/Shoot/shoot/2025_07_06_16_32_IMG_2492.MOV" },
    { id: 22, videoSrc: "https://pub-03644fa742f0401d833053a6506b2229.r2.dev/Shoot/shoot/2025_07_06_16_33_IMG_2493.MOV" },
    { id: 23, videoSrc: "https://pub-03644fa742f0401d833053a6506b2229.r2.dev/Shoot/shoot/2025_07_06_16_35_IMG_2494.MOV" },
    { id: 24, videoSrc: "https://pub-03644fa742f0401d833053a6506b2229.r2.dev/Shoot/shoot/2025_07_06_16_35_IMG_2495.MOV" },
    { id: 25, videoSrc: "https://pub-03644fa742f0401d833053a6506b2229.r2.dev/Shoot/shoot/2025_07_06_16_35_IMG_2496.MOV" },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-slate-200 font-sans selection:bg-orange-500/30 overflow-x-hidden scroll-smooth">
      <style>{`
        @keyframes slowRhythmicOrbit {
          0% { transform: translate(-50%, -50%) rotate(0deg) translate(0, 0) scale(0.6); opacity: 0.1; }
          50% { transform: translate(-50%, -50%) rotate(180deg) translate(var(--tx), var(--ty)) scale(1.1); opacity: 0.9; }
          100% { transform: translate(-50%, -50%) rotate(360deg) translate(0, 0) scale(0.6); opacity: 0.1; }
        }
        @keyframes float-slow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        @keyframes glow-breathe { 0%, 100% { box-shadow: 0 0 15px rgba(249,115,22,0.4); transform: scale(1); } 50% { box-shadow: 0 0 40px rgba(249,115,22,0.6); transform: scale(1.02); } }
        @keyframes videoPop { from { opacity: 0; transform: scale(0.9) translateY(20px); } to { opacity: 1; transform: scale(1) translateY(0); } }
        .reveal { opacity: 0; transform: translateY(20px); transition: opacity 0.8s ease-out, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1); }
        .reveal-visible { opacity: 1; transform: translateY(0); }
        .hero-animate { animation: heroIn 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }
        @keyframes heroIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        section { scroll-margin-top: 80px; }
        .btn-glow { animation: glow-breathe 4s infinite ease-in-out; }
      `}</style>

      <VideoModal activeVideo={activeVideo} onClose={() => setActiveVideo(null)} />

      {/* NAVBAR */}
      <nav className="fixed w-full z-50 bg-[#0a0a0c]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">
          <div className="flex items-center gap-1 group cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className="w-14 h-14 md:w-20 md:h-20 flex items-center justify-center group-hover:scale-110 transition-all">
              <Logo className="w-full h-full" />
            </div>
            <span className="text-xl md:text-2xl font-black tracking-tighter text-white uppercase -ml-2 md:-ml-4">
              AKSHAY<span className="text-orange-500">NAGAR</span>
            </span>
          </div>
          <div className="hidden lg:flex items-center gap-8 text-sm font-medium uppercase tracking-widest text-[10px]">
            {['Home', 'About', 'Services', 'Projects', 'Tools'].map((item) => (
              <a key={item} href={`#${item.toLowerCase() === 'tools' ? 'services' : item.toLowerCase() === 'projects' ? 'longform' : item.toLowerCase()}`} className="relative hover:text-orange-500 transition-colors group">
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-orange-500 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
            <button
                onClick={() => window.open("https://wa.me/917404977405?text=Hi%20Akshay,%20I%20want%20to%20hire%20you%20for%20video%20editing", "_blank")}
                className="relative overflow-hidden cursor-pointer bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-2 rounded-full font-black shadow-lg hover:shadow-orange-500/40 transition-all duration-300 uppercase tracking-widest text-[10px]"
              >
                Hire Me
              </button>
          </div>
          <button className="lg:hidden text-white p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <div className={`fixed inset-0 z-[60] bg-[#0a0a0c] flex flex-col items-center justify-center gap-8 text-2xl font-black uppercase tracking-widest transition-all duration-500 ${isMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'}`}>
        <button className="absolute top-6 right-6 text-white" onClick={() => setIsMenuOpen(false)}><X className="w-8 h-8" /></button>
        {['Home', 'About', 'Services', 'Projects', 'Tools'].map((item) => (
          <a key={item} href={`#${item.toLowerCase() === 'tools' ? 'services' : item.toLowerCase() === 'projects' ? 'longform' : item.toLowerCase()}`} onClick={() => setIsMenuOpen(false)} className="hover:text-orange-500 transition-colors">{item}</a>
        ))}
        <button onClick={() => window.open("https://wa.me/917404977405", "_blank")} className="mt-4 bg-gradient-to-r from-orange-500 to-red-600 text-white px-10 py-4 rounded-full font-black shadow-lg">Hire Me</button>
      </div>

      {/* HERO SECTION */}
      <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-24 px-4 md:px-6 overflow-hidden min-h-[90vh] md:min-h-screen flex flex-col justify-center text-center">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-orange-600/10 blur-[80px] md:blur-[150px] rounded-full" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[250px] md:w-[500px] h-[250px] md:h-[500px] bg-red-600/10 blur-[60px] md:blur-[120px] rounded-full" />
        <div className="max-w-7xl mx-auto flex flex-col items-center relative z-10">
          <div className="hero-animate inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[8px] md:text-[10px] font-black text-orange-400 mb-6 uppercase tracking-[0.2em]">
            <Zap className="w-3 h-3 fill-current animate-bounce" /> 2.5+ Years of Experience in Ads, Reels, Podcasts & Brand Videos
          </div>
          <h1 className="hero-animate text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight mb-6 uppercase leading-[1.2]">
            PROFESSIONAL VIDEO <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-red-500 to-orange-600 uppercase italic">
              EDITOR & VIDEOGRAPHER
            </span>
          </h1>
          <p className="hero-animate max-w-xl text-sm md:text-base lg:text-lg text-slate-400 mb-8 leading-relaxed font-medium">
            Helping brands and creators grow through high-quality video editing and storytelling.
          </p>
          <div className="hero-animate flex flex-col sm:flex-row gap-4 md:gap-6 items-center">
            <button 
              onClick={() => setActiveVideo({ src: "https://www.w3schools.com/html/mov_bbb.mp4", isVertical: false })} 
              className="btn-glow px-10 md:px-12 py-4 md:py-5 bg-gradient-to-br from-orange-500 to-red-600 text-white rounded-xl md:rounded-2xl font-black shadow-xl transition-all uppercase tracking-widest text-xs md:text-sm flex items-center gap-3 hover:brightness-110 active:scale-95"
            >
              SHOWREEL <Play className="w-4 h-4 md:w-5 md:h-5 fill-current" />
            </button>
            <button onClick={() => scrollToSection('longform')} className="px-10 md:px-12 py-4 md:py-5 bg-white/5 border border-white/10 text-white rounded-xl md:rounded-2xl font-bold backdrop-blur-sm hover:bg-white/10 transition-all uppercase tracking-widest text-xs md:text-sm active:scale-95">
              VIEW PROJECTS
            </button>
          </div>
        </div>
      </section>

      {/* BRANDS WORKED WITH */}
      <section className="py-12 md:py-20 border-y border-white/5 bg-[#0a0a0c]/50">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <p className="text-center text-slate-500 text-[10px] md:text-xs font-black uppercase tracking-[0.3em] mb-12 reveal">Brands Worked With</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-20 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-700 reveal">
             <div className="flex flex-col items-center group">
                <span className="text-2xl md:text-4xl font-black text-white tracking-tighter">AGROPURE</span>
             </div>
             <div className="flex flex-col items-center group">
                <span className="text-2xl md:text-4xl font-black text-white tracking-tighter italic">PANBRAND</span>
             </div>
             <div className="flex items-center gap-2">
                <Building2 className="w-6 h-6 md:w-8 md:h-8 text-white" />
                <span className="text-lg md:text-xl font-bold text-white uppercase tracking-widest">Creators & Businesses</span>
             </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-20 md:py-32 px-4 md:px-6 relative overflow-hidden reveal">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-600/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter italic">Services</h2>
            <div className="h-1.5 w-24 bg-gradient-to-r from-orange-500 to-red-600 rounded-full mt-4 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* VIDEO EDITING */}
            <div className="group p-8 md:p-12 bg-white/5 border border-white/5 rounded-[2rem] hover:border-orange-500/30 transition-all duration-500 reveal">
              <div className="w-16 h-16 bg-orange-500/10 rounded-2xl flex items-center justify-center text-orange-500 mb-8 group-hover:bg-orange-500 group-hover:text-white transition-all duration-500">
                <Film className="w-8 h-8" />
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-white mb-6 uppercase tracking-tight">Video Editing</h3>
              <ul className="space-y-4">
                {['Reels & Shorts', 'YouTube Videos', 'Ad Videos', 'Podcasts', 'UGC', 'Teasers', 'Food Videos'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-slate-400 font-medium">
                    <CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* VIDEOGRAPHY */}
            <div className="group p-8 md:p-12 bg-white/5 border border-white/5 rounded-[2rem] hover:border-red-500/30 transition-all duration-500 reveal">
              <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center text-red-500 mb-8 group-hover:bg-red-500 group-hover:text-white transition-all duration-500">
                <Camera className="w-8 h-8" />
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-white mb-6 uppercase tracking-tight">Videography</h3>
              <ul className="space-y-4">
                {['Podcast Shoots', 'Ad Shoots', 'UGC Shoots', 'Instagram Reel Shoots'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-slate-400 font-medium">
                    <CheckCircle2 className="w-5 h-5 text-red-500 shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-10 md:py-16 px-4 md:px-6 border-t border-white/5 relative bg-[#0a0a0c] reveal">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 md:gap-20 items-center text-center lg:text-left">
          <div className="hidden lg:flex w-full lg:w-1/2 relative justify-center items-center min-h-[500px]">
            <StarBackground />
            <div className="relative z-10 w-full max-w-[420px] aspect-square flex items-center justify-center group">
              <img src="https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?auto=format&fit=crop&q=80&w=800" alt="Akshay" className="w-full h-full object-contain filter brightness-110 drop-shadow-[0_0_20px_rgba(249,115,22,0.2)]" />
            </div>
          </div>
          <div className="w-full lg:w-1/2 reveal">
            <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight">About Me</h2>
            <div className="h-1.5 w-24 bg-gradient-to-r from-orange-500 to-red-600 rounded-full mt-3 mb-8 mx-auto lg:ml-0"></div>
            <p className="text-slate-400 text-base md:text-lg mb-6 leading-relaxed">
              Akshay Nagar is a video editor and videographer with a strong foundation in graphic design. With over 2.5 years of experience, he has worked on ads, reels, YouTube videos, podcasts, UGC, and food videos.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
              {[{ icon: <Award />, val: "100+ Projects", lbl: "Completed" }, { icon: <User />, val: "50+ Clients", lbl: "Globally" }].map((stat, i) => (
                <div key={i} className="flex items-center justify-center lg:justify-start gap-4 bg-white/5 p-4 rounded-2xl border border-white/5 lg:bg-transparent lg:p-0 lg:border-0">
                  <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500 border border-orange-500/20 shrink-0">{stat.icon}</div>
                  <div className="text-left"><h4 className="text-white font-bold text-lg">{stat.val}</h4><p className="text-[10px] text-slate-500 uppercase">{stat.lbl}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE ME */}
      <section className="py-20 md:py-32 px-4 md:px-6 bg-[#0d0d0f] relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16 reveal">
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter italic">Why Work With Me?</h2>
            <div className="h-1.5 w-24 bg-gradient-to-r from-orange-500 to-red-600 rounded-full mt-4 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              { title: "Story-Driven Editing", desc: "Building emotional arcs that keep viewers hooked.", icon: <Compass /> },
              { title: "Design + Video", desc: "Combining graphic design roots with motion expertise.", icon: <MousePointer2 /> },
              { title: "Brand-Focused", desc: "Aligned with your brand voice for consistency.", icon: <CheckCircle2 /> },
              { title: "Shooting & Editing", desc: "Handling the camera and the timeline for a seamless flow.", icon: <Video /> },
              { title: "Professionalism", desc: "Clear timelines and a collaborative mindset.", icon: <MessageSquare /> },
              { title: "High Retention", desc: "Engineered specifically for modern social algorithms.", icon: <Zap /> }
            ].map((item, idx) => (
              <div key={idx} className="group p-8 bg-white/5 border border-white/5 rounded-3xl hover:bg-white/[0.08] hover:border-orange-500/50 transition-all reveal">
                <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center text-orange-500 mb-6 group-hover:bg-orange-500 group-hover:text-white transition-all">
                  {React.cloneElement(item.icon, { className: "w-6 h-6" })}
                </div>
                <h4 className="text-xl font-bold text-white mb-3 uppercase tracking-tight">{item.title}</h4>
                <p className="text-slate-400 text-sm leading-relaxed font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LONG FORM PROJECTS */}
      <section id="longform" className="py-10 md:py-16 bg-[#0d0d0f] border-y border-white/5 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 text-center reveal">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-3 uppercase tracking-tighter italic">Long Form Videos</h2>
            <div className="h-1 w-24 md:w-32 bg-gradient-to-r from-orange-500 to-red-600 rounded-full mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-10">
            {ytProjects.slice(0, visibleLongForm).map((project) => (
              <HoverVideoCard 
                key={project.id}
                videoSrc={project.videoSrc}
                isVertical={false}
                duration={project.duration}
                showBadge={true}
                onClick={() => setActiveVideo({ src: project.videoSrc, isVertical: false })}
              />
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-4 reveal">
            {ytProjects.length > visibleLongForm && <button onClick={() => setVisibleLongForm(prev => prev + 2)} className="flex items-center gap-3 px-8 py-3 bg-white/5 border border-white/10 hover:border-orange-500 text-white rounded-full font-black uppercase tracking-widest text-xs transition-all group">Show More Videos <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" /></button>}
            {visibleLongForm > INITIAL_LONG_FORM && <button onClick={() => { setVisibleLongForm(INITIAL_LONG_FORM); scrollToSection('longform'); }} className="flex items-center gap-3 px-8 py-3 bg-white/5 border border-white/10 hover:border-red-500 text-white rounded-full font-black uppercase tracking-widest text-xs transition-all">Show Less <Minus className="w-4 h-4" /></button>}
          </div>
        </div>
      </section>

      {/* REELS & SHORTS */}
      <section id="shorts" className="py-10 md:py-16 bg-[#0a0a0c] border-b border-white/5 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 text-center reveal">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-3 uppercase tracking-tighter italic">Reels & Shorts</h2>
            <div className="h-1 w-24 md:w-32 bg-gradient-to-r from-orange-500 to-red-600 rounded-full mx-auto"></div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 mb-10">
            {reelProjects.slice(0, visibleShorts).map((reel) => (
              <HoverVideoCard 
                key={reel.id}
                videoSrc={reel.videoSrc}
                isVertical={true}
                showBadge={false}
                onClick={() => setActiveVideo({ src: reel.videoSrc, isVertical: true })}
              />
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-4 reveal">
            {reelProjects.length > visibleShorts && <button onClick={() => setVisibleShorts(prev => prev + 4)} className="flex items-center gap-3 px-8 py-3 bg-white/5 border border-white/10 hover:border-orange-500 text-white rounded-full font-black uppercase tracking-widest text-xs transition-all group">Show More <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" /></button>}
            {visibleShorts > INITIAL_SHORTS && <button onClick={() => { setVisibleShorts(INITIAL_SHORTS); scrollToSection('shorts'); }} className="flex items-center gap-3 px-8 py-3 bg-white/5 border border-white/10 hover:border-red-500 text-white rounded-full font-black uppercase tracking-widest text-xs transition-all">Show Less <Minus className="w-4 h-4" /></button>}
          </div>
        </div>
      </section>

      {/* VIDEOGRAPHY */}
      <section id="videography" className="py-10 md:py-16 bg-[#0a0a0c] border-b border-white/5 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 text-center reveal">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-3 uppercase tracking-tighter italic">Videography</h2>
            <div className="h-1 w-24 md:w-32 bg-gradient-to-r from-orange-500 to-red-600 rounded-full mx-auto"></div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 mb-10">
            {shootproject.slice(0, visibleShoots).map((shoot) => (
              <HoverVideoCard 
                key={shoot.id}
                videoSrc={shoot.videoSrc}
                isVertical={true}
                showBadge={false}
                onClick={() => setActiveVideo({ src: shoot.videoSrc, isVertical: true })}
              />
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-4 reveal">
            {shootproject.length > visibleShoots && <button onClick={() => setVisibleShoots(prev => prev + 4)} className="flex items-center gap-3 px-8 py-3 bg-white/5 border border-white/10 hover:border-orange-500 text-white rounded-full font-black uppercase tracking-widest text-xs transition-all group">Show More <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" /></button>}
            {visibleShoots > INITIAL_SHOOTS && <button onClick={() => { setVisibleShoots(INITIAL_SHOOTS); scrollToSection('videography'); }} className="flex items-center gap-3 px-8 py-3 bg-white/5 border border-white/10 hover:border-red-500 text-white rounded-full font-black uppercase tracking-widest text-xs transition-all">Show Less <Minus className="w-4 h-4" /></button>}
          </div>
        </div>
      </section>

      {/* TOOLKIT - UPDATED CARDS */}
      <section className="py-20 md:py-32 px-4 md:px-6 bg-[#0a0a0c] reveal">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white uppercase mb-4 tracking-tighter italic">The Toolkit</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-orange-500 to-red-600 rounded-full mx-auto mb-16"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
            {[
              { icon: <Scissors />, title: "Premiere Pro", desc: "Storytelling engine for high-retention long form content." },
              { icon: <Layers />, title: "After Effects", desc: "Custom motion graphics and keyframe-perfect visual effects." },
              { icon: <ImageIcon />, title: "Photoshop", desc: "Designing viral-ready thumbnails and custom assets." },
              { icon: <Palette />, title: "Adobe Illustrator", desc: "Creating high-fidelity vector graphics and brand logos." }
            ].map((tool, idx) => (
              <div key={idx} className="p-8 bg-[#151518] border border-white/5 rounded-3xl hover:border-orange-500/30 transition-all text-left">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg">{React.cloneElement(tool.icon, { className: "w-6 h-6" })}</div>
                <h4 className="text-xl md:text-2xl font-bold text-white mb-4 uppercase tracking-tighter italic">{tool.title}</h4>
                <p className="text-sm md:text-base text-slate-400 leading-relaxed">{tool.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative bg-[#070708] pt-20 md:pt-32 pb-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10 text-center">
          <div className="reveal mb-20 md:mb-32">
            <div className="relative rounded-3xl md:rounded-[4rem] bg-gradient-to-br from-orange-600 to-red-800 p-10 md:p-24 text-center overflow-hidden shadow-2xl">
              <h2 className="text-3xl md:text-7xl font-black text-white mb-8 uppercase italic leading-tight">Let's Go Viral</h2>
              <div className="flex justify-center">
                <a href="https://wa.me/917404977405" target="_blank" rel="noopener noreferrer" className="px-10 md:px-14 py-4 md:py-6 bg-white text-red-600 rounded-xl md:rounded-2xl font-black text-xs md:text-sm hover:scale-105 transition-all uppercase tracking-widest flex items-center gap-3">
                  Start a Project <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 items-start text-left">
            <div className="space-y-6">
              <div className="flex items-center gap-1 group cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
                <div className="w-14 h-14 md:w-20 md:h-20 flex items-center justify-center group-hover:scale-110 transition-all">
                  <Logo className="w-full h-full" />
                </div>
                <span className="text-xl md:text-2xl font-black tracking-tighter text-white uppercase -ml-2 md:-ml-4">
                  AKSHAY<span className="text-orange-500">NAGAR</span>
                </span>
              </div>
              <p className="text-slate-500 text-sm max-w-xs font-medium leading-relaxed">Professional video post-production tailored for high-growth creators.</p>
            </div>
            <div className="grid grid-cols-2 gap-8 text-slate-400 font-bold uppercase text-[10px] tracking-widest">
              <div className="space-y-4">
                <h4 className="text-white opacity-40">Navigation</h4>
                <ul className="space-y-2">
                  <li><a href="#home" className="hover:text-orange-500 transition-colors">Home</a></li>
                  <li><a href="#about" className="hover:text-orange-500 transition-colors">About</a></li>
                  <li><a href="#longform" className="hover:text-orange-500 transition-colors">Projects</a></li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="text-white opacity-40">Social</h4>
                <div className="flex gap-4">
                  <a href="https://wa.me/917404977405" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-green-600 hover:text-white transition-all"><FaWhatsapp size={18} /></a>
                  <a href="mailto:akkinagar98@gmail.com" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-orange-600 hover:text-white transition-all"><Mail size={18} /></a>
                </div>
              </div>
            </div>
            <div className="lg:text-right">
              <p className="text-slate-600 text-[10px] font-mono uppercase font-black tracking-tighter">Based Globally / Working Remotely</p>
              <p className="text-slate-700 text-[10px] font-mono mt-4 uppercase font-black">© 2026 / Akshay Nagar</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}