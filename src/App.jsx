import React, { useState, useEffect, useRef, useCallback } from 'react';
import './App.css';
import { FaWhatsapp } from 'react-icons/fa';
import AkshayBgRemoved from "./assets/akshay-image-removebg-preview.png";
import Lenis from 'lenis';
import { 
  Mail, 
  Play, 
  X,
  User,
  Zap,
  Award,
  ArrowRight,
  Plus,
  Minus,
  CheckCircle2,
  Video,
  Camera,
  Film,
  Building2,
  Sparkles,
  Star,
  Folder,
  Wand2
} from 'lucide-react';
import logoImg from './assets/Akshay-logo.png';

/* ============================================================
   REAL ADOBE VECTOR LOGO COMPONENTS
   ============================================================ */
const PremiereProLogo = () => (
  <svg width="34" height="34" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="40" height="40" rx="8" fill="#00005B" />
    <rect x="2" y="2" width="36" height="36" rx="6" stroke="#9999FF" strokeWidth="2.5" fill="none" />
    <text x="10" y="27" fill="#9999FF" fontSize="16" fontWeight="900" fontFamily="Outfit, sans-serif">Pr</text>
  </svg>
);

const AfterEffectsLogo = () => (
  <svg width="34" height="34" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="40" height="40" rx="8" fill="#00005B" />
    <rect x="2" y="2" width="36" height="36" rx="6" stroke="#9999FF" strokeWidth="2.5" fill="none" />
    <text x="9" y="27" fill="#9999FF" fontSize="16" fontWeight="900" fontFamily="Outfit, sans-serif">Ae</text>
  </svg>
);

const PhotoshopLogo = () => (
  <svg width="34" height="34" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="40" height="40" rx="8" fill="#001E36" />
    <rect x="2" y="2" width="36" height="36" rx="6" stroke="#31A8FF" strokeWidth="2.5" fill="none" />
    <text x="9" y="27" fill="#31A8FF" fontSize="16" fontWeight="900" fontFamily="Outfit, sans-serif">Ps</text>
  </svg>
);

const IllustratorLogo = () => (
  <svg width="34" height="34" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="40" height="40" rx="8" fill="#330000" />
    <rect x="2" y="2" width="36" height="36" rx="6" stroke="#FF9A00" strokeWidth="2.5" fill="none" />
    <text x="11" y="27" fill="#FF9A00" fontSize="16" fontWeight="900" fontFamily="Outfit, sans-serif">Ai</text>
  </svg>
);

/* ============================================================
   WAVY CURVY ARC UNDERLINE COMPONENT
   ============================================================ */
const WavyUnderline = () => (
  <div className="wavy-underline-container">
    <svg className="wavy-svg" viewBox="0 0 140 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="wavyOrangeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ff5e36" />
          <stop offset="50%" stopColor="#ff8e3c" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>
      </defs>
      <path 
        d="M 5,8 Q 20,2 35,8 T 65,8 T 95,8 T 125,8" 
        stroke="url(#wavyOrangeGrad)" 
        strokeWidth="4.5" 
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  </div>
);

/* ============================================================
   SYNTHETIC CLICK AUDIO SOUND GENERATOR (WEB AUDIO API)
   ============================================================ */
const playClickSound = () => {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.04);

    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.04);
  } catch (e) {
    // Ignore audio fallback error
  }
};

/* ============================================================
   CLICK RIPPLE & AUDIO LISTENER
   ============================================================ */
const ClickEffectManager = () => {
  useEffect(() => {
    const handleDocumentClick = (e) => {
      playClickSound();

      const ripple = document.createElement('div');
      ripple.className = 'click-ripple';
      ripple.style.left = `${e.clientX}px`;
      ripple.style.top = `${e.clientY}px`;
      document.body.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 500);
    };

    document.addEventListener('click', handleDocumentClick);
    return () => document.removeEventListener('click', handleDocumentClick);
  }, []);

  return null;
};

/* ============================================================
   ANTIGRAVITY CURSOR & ZERO-G PARTICLES
   ============================================================ */
const AntigravityCursor = () => {
  const cursorRef = useRef(null);
  const particlesRef = useRef([]);
  const mouse = useRef({ x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0, y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0 });
  const pos = useRef({ x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0, y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0 });
  
  const particles = useRef([
    { x: 0, y: 0, size: 10, color: 'rgba(255, 94, 54, 0.7)' },
    { x: 0, y: 0, size: 8, color: 'rgba(255, 142, 60, 0.7)' },
    { x: 0, y: 0, size: 7, color: 'rgba(99, 102, 241, 0.7)' },
    { x: 0, y: 0, size: 5, color: 'rgba(245, 158, 11, 0.7)' },
    { x: 0, y: 0, size: 4, color: 'rgba(139, 92, 246, 0.7)' }
  ]);
  const rafId = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const onMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const animate = () => {
      pos.current.x += (mouse.current.x - pos.current.x) * 0.18;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.18;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${pos.current.x - 14}px, ${pos.current.y - 14}px)`;
      }

      particles.current.forEach((p, idx) => {
        const time = Date.now() * 0.003;
        const orbitRadius = 18 + idx * 8;
        const targetX = pos.current.x + Math.sin(time + idx * 1.2) * orbitRadius;
        const targetY = pos.current.y + Math.cos(time + idx * 1.2) * orbitRadius;

        p.x += (targetX - p.x) * (0.22 - idx * 0.03);
        p.y += (targetY - p.y) * (0.22 - idx * 0.03);

        const el = particlesRef.current[idx];
        if (el) {
          el.style.transform = `translate(${p.x - p.size / 2}px, ${p.y - p.size / 2}px)`;
        }
      });

      rafId.current = requestAnimationFrame(animate);
    };

    const addHover = () => cursorRef.current?.classList.add('hovering');
    const removeHover = () => cursorRef.current?.classList.remove('hovering');

    document.addEventListener('mousemove', onMove);
    rafId.current = requestAnimationFrame(animate);

    const attachHover = () => {
      document.querySelectorAll('a, button, .video-card, .project-tab-btn, .skill-spatial-card, .software-tile, .folder-tab').forEach(el => {
        el.addEventListener('mouseenter', addHover);
        el.addEventListener('mouseleave', removeHover);
      });
    };

    attachHover();
    const observer = new MutationObserver(attachHover);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId.current);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="antigravity-cursor-container">
      <div ref={cursorRef} className="antigravity-main-cursor" />
      {particles.current.map((p, i) => (
        <div
          key={i}
          ref={el => particlesRef.current[i] = el}
          className="antigravity-particle"
          style={{
            width: p.size,
            height: p.size,
            background: p.color,
            boxShadow: `0 0 10px ${p.color}`
          }}
        />
      ))}
    </div>
  );
};

/* ============================================================
   PRELOADER
   ============================================================ */
const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.random() * 14 + 4;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setTimeout(() => {
          setExiting(true);
          setTimeout(onComplete, 500);
        }, 250);
      }
      setProgress(Math.min(Math.round(current), 100));
    }, 70);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className={`preloader ${exiting ? 'preloader-exit' : ''}`}>
      <div className="loader-content">
        <h1 className="loader-logo">AKSHAY NAGAR</h1>
        <div className="loader-info">
          <p className="loader-tagline">Video Editor & Motion Designer</p>
          <div className="progress-container">
            <div className="progress-text-wrapper">
              <span className="progress-number">{progress}</span>
              <span className="progress-percent">%</span>
            </div>
            <div className="progress-bar-wrapper">
              <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ============================================================
   WHITE CLAYMOPHISM NAVIGATION BAR
   ============================================================ */
const FolderTabNav = ({ isMenuOpen, setIsMenuOpen, scrollToSection, activeSection }) => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const navItems = [
    { label: 'Home', target: 'home' },
    { label: 'About', target: 'about' },
    { label: 'Skills', target: 'skills' },
    { label: 'Works', target: 'works' },
    { label: 'Softwares', target: 'softwares' },
  ];

  const handleNavClick = (target) => {
    scrollToSection(target);
    setMobileNavOpen(false);
    setIsMenuOpen(false);
  };

  return (
    <nav className="folder-nav-container">
      <div className="folder-nav">
        {/* Logo */}
        <a 
          className="folder-nav-logo" 
          href="#" 
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        >
          <img src={logoImg} alt="Akshay Nagar" />
          <span className="logo-text">AKSHAY NAGAR</span>
        </a>

        {/* Navigation Tabs */}
        <ul className="folder-tabs">
          {navItems.map(item => (
            <li key={item.target}>
              <a 
                className={`folder-tab ${activeSection === item.target ? 'active' : ''}`}
                href={`#${item.target}`}
                onClick={(e) => { e.preventDefault(); handleNavClick(item.target); }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Hire Me CTA */}
        <button
          className="folder-nav-cta desktop-only"
          onClick={() => window.open("https://wa.me/917404977405?text=Hi%20Akshay,%20I%20want%20to%20hire%20you%20for%20video%20editing", "_blank")}
        >
          Hire Me
        </button>

        {/* Mobile Toggle */}
        <button 
          className={`mobile-toggle ${mobileNavOpen ? 'open' : ''}`}
          onClick={() => { setMobileNavOpen(!mobileNavOpen); setIsMenuOpen(!mobileNavOpen); }}
        >
          <span /><span /><span />
        </button>
      </div>
    </nav>
  );
};

/* ============================================================
   VIDEO MODAL LIGHTBOX
   ============================================================ */
const VideoModal = ({ activeVideo, onClose }) => {
  if (!activeVideo) return null;

  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <div className="video-modal-overlay">
      <div className="video-modal-backdrop" onClick={onClose} />
      <div className={`video-modal-content ${activeVideo.isVertical ? 'vertical' : 'horizontal'}`}>
        <button onClick={onClose} className="video-modal-close">
          <X style={{ width: 20, height: 20 }} />
        </button>
        <video src={activeVideo.src} controls autoPlay playsInline style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
      </div>
    </div>
  );
};

/* ============================================================
   HOVER VIDEO CARD (CLAYMORPHIC 3D STYLE)
   ============================================================ */
const HoverVideoCard = ({ videoSrc, isVertical, onClick, duration, showBadge }) => {
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    videoRef.current?.play().catch(() => {});
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div 
      className={`video-card ${isVertical ? 'vertical' : 'horizontal'} reveal`}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <video 
        ref={videoRef}
        src={`${videoSrc}#t=0.1`}
        muted 
        playsInline
        preload="metadata"
      />
      
      {showBadge && <div className="duration-badge">{duration}</div>}
      
      <div className="video-overlay" />
      <div className="video-play-btn">
        <div className="play-circle">
          <Play style={{ width: isVertical ? 18 : 22, height: isVertical ? 18 : 22, color: 'white', fill: 'currentColor' }} />
        </div>
      </div>
    </div>
  );
};

/* ============================================================
   MOBILE MENU OVERLAY
   ============================================================ */
const MobileMenuOverlay = ({ isOpen, onClose, scrollToSection }) => {
  if (!isOpen) return null;

  const handleClick = (target) => {
    scrollToSection(target);
    onClose();
  };

  return (
    <div className="mobile-menu-overlay">
      <button className="mobile-menu-close" onClick={onClose}>
        <X style={{ width: 32, height: 32 }} />
      </button>
      {['Home', 'About', 'Skills', 'Works', 'Softwares'].map(item => (
        <a 
          key={item} 
          href={`#${item.toLowerCase()}`}
          onClick={(e) => { e.preventDefault(); handleClick(item.toLowerCase()); }}
        >
          {item}
        </a>
      ))}
      <button 
        onClick={() => window.open("https://wa.me/917404977405", "_blank")}
        className="btn-primary"
        style={{ marginTop: '1rem' }}
      >
        Hire Me
      </button>
    </div>
  );
};

/* ============================================================
   SKILLS LIST WITH FLOATING HOVER CARD
   ============================================================ */
const skillsData = [
  {
    id: 1,
    title: 'Video Editing & Motion Graphics',
    icon: Film,
    color: '#ff5e36',
    items: ['Reels & Shorts', 'YouTube Videos', 'Ad Videos', 'Podcasts & UGC', 'Logo Animations', 'Kinetic Typography', 'Animated Intros & Outros']
  },
  {
    id: 2,
    title: 'AI Video Creator',
    icon: Wand2,
    color: '#6366f1',
    items: ['AI Video Generation', 'AI Image & Texture Synthesis', 'Text-to-Video Storyboarding', 'Modern AI Content Integration', 'High-Retention Creative Workflows', 'Custom AI Avatars & Effects']
  },
  {
    id: 3,
    title: 'Videography & Production',
    icon: Camera,
    color: '#f59e0b',
    items: ['Podcast Shoots', 'Ad Shoots', 'UGC Shoots', 'Instagram Reel Shoots', 'Camera Direction & Lighting']
  }
];

const SkillsListSection = () => {
  const [hoveredSkill, setHoveredSkill] = useState(1);

  const activeSkill = skillsData.find(s => s.id === hoveredSkill) || skillsData[0];

  return (
    <div className="skills-list-wrapper reveal">
      {/* Left: List */}
      <div className="skills-list-container">
        {skillsData.map((skill, index) => {
          const IconComp = skill.icon;
          return (
            <div
              key={skill.id}
              className={`skills-list-row ${hoveredSkill === skill.id ? 'active' : ''}`}
              onMouseEnter={() => setHoveredSkill(skill.id)}
            >
              <span className="skills-list-number" style={{ color: skill.color }}>
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className="skills-list-icon" style={{ background: `${skill.color}15`, color: skill.color }}>
                <IconComp style={{ width: 22, height: 22 }} />
              </div>
              <h3 className="skills-list-title">{skill.title}</h3>
              <div className="skills-list-arrow" style={{ color: skill.color }}>
                <ArrowRight style={{ width: 20, height: 20 }} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Right: Floating Card (fixed to right side) */}
      <div className="skills-floating-panel">
        <div
          className="skills-floating-card"
          key={activeSkill.id}
          style={{ borderTop: `3px solid ${activeSkill.color}` }}
        >
          <h4 style={{ color: activeSkill.color }}>{activeSkill.title}</h4>
          <ul>
            {activeSkill.items.map(item => (
              <li key={item}>
                <CheckCircle2 style={{ width: 14, height: 14, color: activeSkill.color, flexShrink: 0 }} />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

/* ============================================================
   TILT CARD (3D Interactive hover)
   ============================================================ */
const TiltCard = ({ children, className, style, onClick }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / centerY * -6;
    const rotateY = (x - centerX) / centerX * 6;
    card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(1200px) rotateX(0) rotateY(0) scale(1)';
    }
  };

  return (
    <div 
      ref={cardRef} 
      className={className} 
      style={{ ...style, transition: 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

/* ============================================================
   MAIN APP
   ============================================================ */
export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null);
  const [showPreloader, setShowPreloader] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  
  const INITIAL_VIDEOS = 8;
  const [visibleVideos, setVisibleVideos] = useState(INITIAL_VIDEOS);

  /* ----- Project Video Categories & Tabs Data ----- */
  const projectTabs = [
    {
      id: 'ai',
      name: 'AI Video',
      icon: <Sparkles style={{ width: 16, height: 16 }} />,
      subtitle: 'Next-gen AI visual creations and storytelling',
      videos: [
        { id: 1, videoSrc: "https://pub-03644fa742f0401d833053a6506b2229.r2.dev/Final/final%20video/ai%20%20video/Daily%20burner%20%26%20night%20burner_compressed.mp4", isVertical: true },
        { id: 2, videoSrc: "https://pub-03644fa742f0401d833053a6506b2229.r2.dev/Final/final%20video/ai%20%20video/L2%20(Rhyming%20lines)_compressed.mp4", isVertical: true },
        { id: 3, videoSrc: "https://pub-03644fa742f0401d833053a6506b2229.r2.dev/Final/final%20video/ai%20%20video/Magbliss_compressed.mp4", isVertical: true },
        { id: 4, videoSrc: "https://pub-03644fa742f0401d833053a6506b2229.r2.dev/Final/final%20video/ai%20%20video/SLEEP_compressed.mp4", isVertical: true },
      ]
    },
    {
      id: 'brand',
      name: 'Brand Video',
      icon: <Building2 style={{ width: 16, height: 16 }} />,
      subtitle: 'High-converting commercial and promo campaigns',
      videos: [
        { id: 5, videoSrc: "https://pub-03644fa742f0401d833053a6506b2229.r2.dev/Final/final%20video/brand%20video/Embark%20on%20a%20flavor%20filled%20video%20with%20our%20Peri%20Peri%20Poha.%20This%20vibrant%20and%20zesty%20dish%20combines%20th.mp4", isVertical: true },
        { id: 6, videoSrc: "https://pub-03644fa742f0401d833053a6506b2229.r2.dev/Final/final%20video/brand%20video/SaveInsta.App%20-%203027107148419002186_30172539797.mp4", isVertical: true },
        { id: 7, videoSrc: "https://pub-03644fa742f0401d833053a6506b2229.r2.dev/Final/final%20video/brand%20video/SaveInsta.App%20-%203056843051026591178.mp4", isVertical: true }
      ]
    },
    {
      id: 'podcast',
      name: 'Podcast Teaser & Ads',
      icon: <Video style={{ width: 16, height: 16 }} />,
      subtitle: 'Wide-screen podcast cuts and promo announcements',
      videos: [
        { id: 8, duration: "00:45", videoSrc: "https://pub-03644fa742f0401d833053a6506b2229.r2.dev/Final/final%20video/podcast%20teaser/pool%20ads_compressed.mp4", isVertical: false },
        { id: 9, duration: "00:33", videoSrc: "https://pub-03644fa742f0401d833053a6506b2229.r2.dev/Final/final%20video/podcast%20teaser/priyanka%20teasor%20mp4_compressed.mp4", isVertical: false },
      ]
    },
    {
      id: 'reels',
      name: 'Reels',
      icon: <Film style={{ width: 16, height: 16 }} />,
      subtitle: 'High retention Instagram reels & YouTube shorts',
      videos: [
        { id: 10, videoSrc: "https://pub-03644fa742f0401d833053a6506b2229.r2.dev/Final/final%20video/Reels/2%20ai%20video_compressed.mp4", isVertical: true },
        { id: 11, videoSrc: "https://pub-03644fa742f0401d833053a6506b2229.r2.dev/Final/final%20video/Reels/2%20reel%20priyanka_compressed.mp4", isVertical: true },
        { id: 12, videoSrc: "https://pub-03644fa742f0401d833053a6506b2229.r2.dev/Final/final%20video/Reels/4%20ad%20amongh_compressed.MP4", isVertical: true },
        { id: 13, videoSrc: "https://pub-03644fa742f0401d833053a6506b2229.r2.dev/Final/final%20video/Reels/6%20reel%20sudhir%20kove_compressed.mp4", isVertical: true },
        { id: 14, videoSrc: "https://pub-03644fa742f0401d833053a6506b2229.r2.dev/Final/final%20video/Reels/IMG_0286.MOV", isVertical: true },
        { id: 15, videoSrc: "https://pub-03644fa742f0401d833053a6506b2229.r2.dev/Final/final%20video/Reels/Om%20space%20webinar%20video%205_compressed.mp4", isVertical: true },
        { id: 16, videoSrc: "https://pub-03644fa742f0401d833053a6506b2229.r2.dev/Final/final%20video/Reels/priyanka%201_compressed.mp4", isVertical: true },
        { id: 17, videoSrc: "https://pub-03644fa742f0401d833053a6506b2229.r2.dev/Final/final%20video/Reels/sudhir_compressed.mp4", isVertical: true },
        { id: 18, videoSrc: "https://pub-03644fa742f0401d833053a6506b2229.r2.dev/Final/final%20video/Reels/traders_compressed.mp4", isVertical: true }
      ]
    },
    {
      id: 'shoot',
      name: 'Shoot',
      icon: <Camera style={{ width: 16, height: 16 }} />,
      subtitle: 'On-location videography and live camera production',
      videos: [
        { id: 19, videoSrc: "https://pub-03644fa742f0401d833053a6506b2229.r2.dev/Final/final%20video/Shoot/shoot_compressed.mp4", isVertical: true }
      ]
    },
    {
      id: 'ugc',
      name: 'UGC Video',
      icon: <User style={{ width: 16, height: 16 }} />,
      subtitle: 'User generated style content for e-commerce and brands',
      videos: [
        { id: 20, videoSrc: "https://pub-03644fa742f0401d833053a6506b2229.r2.dev/Final/final%20video/Ugc%20video/Face%20oil%20video%202_compressed.mp4", isVertical: true },
        { id: 21, videoSrc: "https://pub-03644fa742f0401d833053a6506b2229.r2.dev/Final/final%20video/Ugc%20video/MEERA%20TRADER%20SIMPLE_compressed.mp4", isVertical: true },
      ]
    }
  ];

  /* Active Tab State */
  const [activeTab, setActiveTab] = useState(projectTabs[0]);

  /* ----- Lenis Smooth Scroll ----- */
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  /* ----- Active Section Tracker ----- */
  useEffect(() => {
    const sections = ['home', 'about', 'skills', 'works', 'softwares'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [showPreloader]);

  /* ----- Intersection Observer for reveals ----- */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -40px 0px' }
    );

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [visibleVideos, activeTab, showPreloader]);

  /* ----- Scroll to section ----- */
  const scrollToSection = useCallback((id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  }, []);

  /* ----- Tab Switch Handler ----- */
  const handleTabSelect = (tab) => {
    setActiveTab(tab);
    setVisibleVideos(INITIAL_VIDEOS);
  };

  if (showPreloader) {
    return <Preloader onComplete={() => setShowPreloader(false)} />;
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', position: 'relative' }}>
      
      {/* Background Grid & Anti-Gravity Zero-G Orbs */}
      <div className="bg-grid" />
      <div className="bg-antigravity-orbs">
        <div className="antigravity-floating-orb orb-1" />
        <div className="antigravity-floating-orb orb-2" />
        <div className="antigravity-floating-orb orb-3" />
      </div>

      {/* Click Audio & Ripple Manager */}
      <ClickEffectManager />

      {/* Antigravity Magnetic Cursor */}
      <AntigravityCursor />

      {/* Video Lightbox Modal */}
      <VideoModal activeVideo={activeVideo} onClose={() => setActiveVideo(null)} />

      {/* Mobile Menu Overlay */}
      <MobileMenuOverlay 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
        scrollToSection={scrollToSection}
      />

      {/* White Clay Navigation */}
      <FolderTabNav 
        isMenuOpen={isMenuOpen} 
        setIsMenuOpen={setIsMenuOpen} 
        scrollToSection={scrollToSection}
        activeSection={activeSection}
      />

      {/* ========== 1. HERO SECTION ========== */}
      <section id="home" className="hero-section">
        <div className="hero-grid">
          <div className="hero-content">
            <div className="hero-badge">
              <Zap style={{ width: 14, height: 14, fill: 'currentColor' }} />
              3+ Years of Experience
            </div>
            
            <div className="hero-introduction">
              <span className="hero-hello">Hello, I'm</span>
              <h1 className="hero-name">Akshay Nagar</h1>
              <p className="hero-role">
                Professional <span>Video Editor</span>, <span>Motion Graphic Designer</span> & <span>Videographer</span>
              </p>
            </div>
            
            <p className="hero-desc">
              Helping brands and creators grow through high-quality video editing, motion graphics, storytelling, and cinematic content.
            </p>
            
            <div className="hero-buttons">
              <button onClick={() => scrollToSection('works')} className="btn-primary">
                View Works <ArrowRight style={{ width: 16, height: 16 }} />
              </button>
              <button onClick={() => scrollToSection('about')} className="btn-outline">
                About Me
              </button>
            </div>
          </div>

          {/* CLEAN CUTOUT PNG IMAGE — NO CARD BOX, NO BORDER, NO BACKGROUND */}
          <div className="hero-image-container">
            <img src={AkshayBgRemoved} alt="Akshay Nagar" className="hero-profile-pic" />
          </div>
        </div>
      </section>

      {/* ========== 2. EXACT USER ABOUT SECTION (RIGHT AFTER HERO) ========== */}
      <section id="about" className="section" style={{ background: 'var(--bg-secondary)', paddingTop: '4.5rem' }}>
        <div className="section-container">
          <div className="section-header reveal">
            <h2 className="section-title">
              <span className="script-accent">About Me</span>
            </h2>
            <WavyUnderline />
          </div>

          {/* EXACT PROVIDED USER TEXT & STAT COUNTERS */}
          <div className="about-story-container reveal">
            <div className="about-user-text-wrap">
              <p className="about-user-paragraph">
                I’m <strong>Akshay Nagar</strong>, a video editor and videographer with a strong foundation in graphic design, which gives me a sharp eye for visuals, composition, and storytelling.
              </p>

              <p className="about-user-paragraph">
                With over <strong>3+ years of professional experience</strong>, I’ve worked on a wide range of video projects for brands, businesses, and creators. My work includes digital ads, Instagram reels, YouTube videos, podcasts, UGC content, and food videos, all tailored to perform well on digital platforms.
              </p>

              <p className="about-user-paragraph">
                I’ve edited videos across multiple industries such as Google GMB ads, network marketing, real estate, business coaching, fashion, and Vastu Shastra, understanding the unique audience and communication style each niche requires.
              </p>

              <p className="about-user-paragraph">
                Along with traditional editing, I also integrate AI-generated videos and images into my projects wherever it adds creative value, helping brands stand out with modern and engaging content.
              </p>

              <p className="about-user-paragraph">
                In addition to editing, I actively work as a videographer, handling podcast shoots, UGC shoots, ad shoots, and Instagram reel shoots, which allows me to manage projects from concept to final delivery with a clear creative vision.
              </p>
            </div>
          </div>

          {/* Stat Counter Cards (100+ Projects, 50+ Clients) */}
          <div className="stat-row reveal" style={{ marginTop: '2.5rem' }}>
            <div className="stat-card">
              <div className="stat-icon"><Award style={{ width: 24, height: 24 }} /></div>
              <div>
                <div className="stat-val">100+ Projects</div>
                <div className="stat-label">Completed</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon"><User style={{ width: 24, height: 24 }} /></div>
              <div>
                <div className="stat-val">50+ Clients</div>
                <div className="stat-label">Globally</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon"><Star style={{ width: 24, height: 24 }} /></div>
              <div>
                <div className="stat-val">3+ Years</div>
                <div className="stat-label">Experience</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== 3. BRANDS SECTION ========== */}
      <section className="brands-section">
        <div className="section-container">
          <p className="brands-label reveal">Brands Worked With</p>
          <div className="brands-row reveal">
            <span className="brand-item">AGROPURE</span>
            <span className="brand-item">PANBRAND</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Building2 style={{ width: 20, height: 20, color: 'var(--accent-primary)' }} />
              <span className="brand-item">Creators & Businesses</span>
            </div>
          </div>
        </div>
      </section>


      {/* ========== 4. SKILLS SECTION (LIST + FLOATING HOVER CARD) ========== */}
      <section id="skills" className="section">
        <div className="section-container">
          <div className="section-header reveal">
            <span className="section-label">WHAT I DO</span>
            <h2 className="section-title">
              <span className="script-accent">My Skills</span>
            </h2>
            <WavyUnderline />
          </div>

          <SkillsListSection />
        </div>
      </section>


      {/* ========== 5. MY WORK SECTION (CLAY TABS & SHOWCASE) ========== */}
      <section id="works" className="section works-section">
        <div className="section-container">
          <div className="section-header reveal">
            <h2 className="section-title">
              <span className="script-accent">My Work</span>
            </h2>
            <WavyUnderline />
          </div>

          {/* CLAYMORPHIC CATEGORY TABS BAR */}
          <div className="projects-tab-navigation reveal">
            {projectTabs.map(tab => (
              <button
                key={tab.id}
                className={`project-tab-btn ${activeTab.id === tab.id ? 'active' : ''}`}
                onClick={() => handleTabSelect(tab)}
              >
                {tab.icon}
                <span>{tab.name}</span>
                <span className="project-tab-count">{tab.videos.length}</span>
              </button>
            ))}
          </div>

          {/* ACTIVE TAB INDIVIDUAL VIDEO SHOWCASE */}
          <div className="work-inline-content reveal">
            <div className="active-tab-header">
              <div>
                <h3 className="active-tab-title">
                  {activeTab.name}
                </h3>
                <p className="active-tab-subtitle">{activeTab.subtitle}</p>
              </div>
              <span style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--accent-primary)' }}>
                {activeTab.videos.length} Videos Available
              </span>
            </div>

            {activeTab.videos.length > 0 ? (
              <>
                <div className="video-grid">
                  {activeTab.videos.slice(0, visibleVideos).map(video => (
                    <HoverVideoCard 
                      key={video.id}
                      videoSrc={video.videoSrc}
                      isVertical={video.isVertical}
                      duration={video.duration}
                      showBadge={!!video.duration}
                      onClick={() => setActiveVideo({ src: video.videoSrc, isVertical: video.isVertical })}
                    />
                  ))}
                </div>
                
                <div className="load-more-row">
                  {activeTab.videos.length > visibleVideos && (
                    <button onClick={() => setVisibleVideos(prev => prev + 4)} className="load-btn">
                      Show More <Plus style={{ width: 16, height: 16 }} />
                    </button>
                  )}
                  {visibleVideos > INITIAL_VIDEOS && (
                    <button onClick={() => { setVisibleVideos(INITIAL_VIDEOS); scrollToSection('works'); }} className="load-btn">
                      Show Less <Minus style={{ width: 16, height: 16 }} />
                    </button>
                  )}
                </div>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '4rem 1rem', background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--clay-shadow-md)' }}>
                <Folder style={{ width: 56, height: 56, margin: '0 auto 1rem auto', color: 'var(--text-muted)' }} />
                <p style={{ fontWeight: 700, color: 'var(--text-secondary)' }}>No videos in this category yet.</p>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* ========== 6. SOFTWARES SECTION (REAL ADOBE APP LOGOS IN CLAY TILES) ========== */}
      <section id="softwares" className="section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="section-container">
          <div className="section-header reveal">
            <h2 className="section-title">
              <span className="script-accent">Softwares</span>
            </h2>
            <WavyUnderline />
          </div>

          <div className="softwares-grid">
            {/* Premiere Pro Tile */}
            <TiltCard className="software-tile reveal">
              <div className="software-logo-badge" style={{ background: '#00005B' }}>
                <PremiereProLogo />
              </div>
              <h4>Premiere Pro</h4>
              <p>Storytelling engine for high-retention long form content, ad videos, podcasts, and timeline finishing.</p>
            </TiltCard>

            {/* After Effects Tile */}
            <TiltCard className="software-tile reveal">
              <div className="software-logo-badge" style={{ background: '#00005B' }}>
                <AfterEffectsLogo />
              </div>
              <h4>After Effects</h4>
              <p>Custom keyframe-perfect motion graphics, kinetic typography, logo animations, and dynamic visual FX.</p>
            </TiltCard>

            {/* Photoshop Tile */}
            <TiltCard className="software-tile reveal">
              <div className="software-logo-badge" style={{ background: '#001E36' }}>
                <PhotoshopLogo />
              </div>
              <h4>Photoshop</h4>
              <p>Designing high-converting viral thumbnails, custom graphic overlays, and photo retouching.</p>
            </TiltCard>

            {/* Illustrator Tile */}
            <TiltCard className="software-tile reveal">
              <div className="software-logo-badge" style={{ background: '#330000' }}>
                <IllustratorLogo />
              </div>
              <h4>Adobe Illustrator</h4>
              <p>Creating high-fidelity vector graphics, custom brand logos, and scalable icon assets for motion design.</p>
            </TiltCard>
          </div>
        </div>
      </section>

      {/* ========== 7. FOOTER ========== */}
      <footer className="footer">
        <div className="section-container">
          {/* CTA Banner */}
          <div className="reveal" style={{ marginBottom: '4rem' }}>
            <div className="cta-card">
              {/* Animated background particles */}
              <div className="cta-particles">
                <div className="cta-particle cta-p1" />
                <div className="cta-particle cta-p2" />
                <div className="cta-particle cta-p3" />
                <div className="cta-particle cta-p4" />
                <div className="cta-particle cta-p5" />
              </div>
              {/* Shimmer line */}
              <div className="cta-shimmer" />
              <span className="cta-tagline">Ready to create something amazing?</span>
              <h2>Let's Go Viral</h2>
              <p className="cta-subtitle">Transform your content into scroll-stopping, audience-growing, brand-building magic.</p>
              <a 
                href="https://wa.me/917404977405" 
                target="_blank" 
                rel="noopener noreferrer"
                className="cta-btn"
              >
                <Sparkles style={{ width: 18, height: 18 }} /> Start a Project <ArrowRight style={{ width: 18, height: 18 }} />
              </a>
            </div>
          </div>

          {/* Footer Grid */}
          <div className="footer-grid">
            <div className="footer-brand">
              <a 
                className="folder-nav-logo" 
                href="#" 
                onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              >
                <img src={logoImg} alt="Akshay Nagar" />
                <span className="logo-text">AKSHAY NAGAR</span>
              </a>
              <p>Professional video post-production & motion graphics tailored for high-growth creators and brands.</p>
            </div>

            <div>
              <h4 className="footer-nav-title">Navigation</h4>
              <ul className="footer-nav-list">
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#skills">Skills</a></li>
                <li><a href="#works">Works</a></li>
                <li><a href="#softwares">Softwares</a></li>
              </ul>
            </div>

            <div>
              <h4 className="footer-nav-title">Connect</h4>
              <div className="social-row" style={{ marginBottom: '1.5rem' }}>
                <a href="https://wa.me/917404977405" target="_blank" rel="noopener noreferrer" className="social-btn">
                  <FaWhatsapp size={20} />
                </a>
                <a href="mailto:akkinagar98@gmail.com" className="social-btn">
                  <Mail size={20} />
                </a>
              </div>
              <div className="footer-bottom">
                <p>Based Globally / Working Remotely</p>
                <p style={{ marginTop: '0.25rem' }}>© 2026 / Akshay Nagar</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
