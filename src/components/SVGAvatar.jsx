import { useState, useEffect } from 'react';
import styles from './SVGAvatar.module.css';

function SVGAvatar() {
  const [codeLines, setCodeLines] = useState([
    { width: 40, speed: 1.5 },
    { width: 60, speed: 2 },
    { width: 30, speed: 1 },
    { width: 50, speed: 1.8 },
    { width: 45, speed: 2.2 }
  ]);

  const [activeTech, setActiveTech] = useState(0);
  const techIcons = ['react', 'node', 'ai', 'db', 'cloud'];

  // Animate code lines
  useEffect(() => {
    const interval = setInterval(() => {
      setCodeLines(prev => prev.map(line => ({
        ...line,
        width: 30 + Math.sin(Date.now() / 1000 * line.speed) * 30
      })));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // Cycle through tech icons
  useEffect(() => {
    const techInterval = setInterval(() => {
      setActiveTech((prev) => (prev + 1) % techIcons.length);
    }, 3000);

    return () => clearInterval(techInterval);
  }, []);

  return (
    <div className={styles.avatarContainer}>
      <svg 
        width="400" 
        height="400" 
        viewBox="0 0 400 400" 
        className={styles.avatarSVG}
      >
        {/* Background Glow */}
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="blur"/>
            <feMerge>
              <feMergeNode in="blur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          
          <linearGradient id="headGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
          
          <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#5b21b6" />
          </linearGradient>
          
          <radialGradient id="screenGlow">
            <stop offset="0%" stopColor="#06d6a0" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#059669" stopOpacity="0.4" />
          </radialGradient>
          
          {/* Tech Icon Patterns */}
          <pattern id="reactPattern" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="4" fill="none" stroke="#61dafb" strokeWidth="1.5" />
            <circle cx="10" cy="10" r="8" fill="none" stroke="#61dafb" strokeWidth="0.8" opacity="0.7" />
            <circle cx="10" cy="10" r="12" fill="none" stroke="#61dafb" strokeWidth="0.5" opacity="0.5" />
          </pattern>
          
          <pattern id="nodePattern" width="20" height="20" patternUnits="userSpaceOnUse">
            <polygon points="10,2 18,6 18,14 10,18 2,14 2,6" fill="#3c873a" opacity="0.8" />
            <circle cx="10" cy="10" r="4" fill="#68a063" />
          </pattern>
          
          <pattern id="aiPattern" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M5,10 L15,10 M10,5 L10,15" stroke="#f472b6" strokeWidth="2" />
            <circle cx="10" cy="10" r="6" fill="none" stroke="#f472b6" strokeWidth="1" />
          </pattern>
          
          <pattern id="dbPattern" width="20" height="20" patternUnits="userSpaceOnUse">
            <ellipse cx="10" cy="6" rx="8" ry="3" fill="#10b981" opacity="0.8" />
            <rect x="2" y="6" width="16" height="8" fill="#10b981" opacity="0.6" />
            <ellipse cx="10" cy="14" rx="8" ry="3" fill="#10b981" opacity="0.8" />
          </pattern>
          
          <pattern id="cloudPattern" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M5,12 Q8,8 12,8 Q16,8 15,12 Q18,12 18,15 Q18,18 15,18 Q12,18 8,18 Q5,18 5,15 Q2,15 2,12 Q2,9 5,12" 
                  fill="#38bdf8" opacity="0.7" />
          </pattern>
        </defs>

        {/* Main Avatar */}
        <g className={styles.avatarGroup}>
          {/* Head with tech pattern overlay */}
          <circle 
            cx="200" 
            cy="150" 
            r="60" 
            fill="url(#headGradient)"
            className={styles.head}
          />
          
          {/* Dynamic tech pattern overlay on head */}
          <circle 
            cx="200" 
            cy="150" 
            r="58" 
            fill={`url(#${techIcons[activeTech]}Pattern)`}
            opacity="0.3"
            className={styles.techOverlay}
          >
            <animate
              attributeName="opacity"
              values="0.2;0.4;0.2"
              dur="3s"
              repeatCount="indefinite"
            />
          </circle>
          
          {/* Glasses */}
          <g className={styles.glasses}>
            <rect x="155" y="135" width="30" height="12" rx="6" fill="none" stroke="#1e293b" strokeWidth="2" />
            <rect x="215" y="135" width="30" height="12" rx="6" fill="none" stroke="#1e293b" strokeWidth="2" />
            <path d="M185,141 L195,141 M205,141 L215,141" stroke="#1e293b" strokeWidth="2" />
            <path d="M170,138 Q165,136 160,138" stroke="#1e293b" strokeWidth="1" fill="none" />
            <path d="M240,138 Q245,136 250,138" stroke="#1e293b" strokeWidth="1" fill="none" />
          </g>
          
          {/* Eyes with tech glow */}
          <g className={styles.eyes}>
            <circle cx="170" cy="140" r="8" fill="#ffffff">
              <animate
                attributeName="cy"
                values="140;138;140"
                dur="2s"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="230" cy="140" r="8" fill="#ffffff">
              <animate
                attributeName="cy"
                values="140;138;140"
                dur="2s"
                repeatCount="indefinite"
                begin="0.1s"
              />
            </circle>
            
            {/* Eye pupils with tech glow */}
            <circle cx="170" cy="140" r="4" fill="#0f172a">
              <animate
                attributeName="fill"
                values="#0f172a;#06d6a0;#0f172a"
                dur="4s"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="230" cy="140" r="4" fill="#0f172a">
              <animate
                attributeName="fill"
                values="#0f172a;#06d6a0;#0f172a"
                dur="4s"
                repeatCount="indefinite"
                begin="0.5s"
              />
            </circle>
            
            {/* Eye highlights */}
            <circle cx="168" cy="138" r="1.5" fill="#ffffff" opacity="0.8" />
            <circle cx="228" cy="138" r="1.5" fill="#ffffff" opacity="0.8" />
          </g>
          
          {/* Mouth - Tech-inspired */}
          <g className={styles.mouth}>
            <path 
              d="M170,170 Q200,180 230,170" 
              stroke="#06d6a0" 
              strokeWidth="3" 
              fill="none"
              strokeLinecap="round"
            >
              <animate
                attributeName="d"
                values="M170,170 Q200,180 230,170; M170,175 Q200,185 230,175; M170,170 Q200,180 230,170"
                dur="4s"
                repeatCount="indefinite"
              />
            </path>
            <path 
              d="M175,173 Q200,178 225,173" 
              stroke="#10b981" 
              strokeWidth="1" 
              fill="none"
              strokeDasharray="3,2"
              opacity="0.7"
            />
          </g>
          
          {/* Body with tech elements */}
          <rect 
            x="160" 
            y="210" 
            width="80" 
            height="100" 
            rx="20" 
            fill="url(#bodyGradient)"
            className={styles.body}
          />
          
          {/* Tech circuit pattern on body */}
          <g className={styles.circuitPattern}>
            <path d="M170,230 L190,230 M210,230 L230,230" stroke="#a78bfa" strokeWidth="1.5" strokeDasharray="2,2" />
            <path d="M170,250 L230,250" stroke="#a78bfa" strokeWidth="1" opacity="0.7" />
            <path d="M180,270 L220,270" stroke="#a78bfa" strokeWidth="1" strokeDasharray="3,2" />
            <circle cx="200" cy="290" r="3" fill="#8b5cf6">
              <animate
                attributeName="fill"
                values="#8b5cf6;#06d6a0;#8b5cf6"
                dur="2s"
                repeatCount="indefinite"
              />
            </circle>
          </g>
          
          {/* Laptop */}
          <g className={styles.laptop}>
            <rect 
              x="130" 
              y="230" 
              width="140" 
              height="80" 
              rx="12" 
              fill="#1e293b"
              className={styles.laptopBase}
            />
            
            {/* Screen bezel */}
            <rect 
              x="135" 
              y="235" 
              width="130" 
              height="50" 
              rx="8" 
              fill="#0f172a"
              className={styles.screenBezel}
            />
            
            {/* Screen */}
            <rect 
              x="140" 
              y="240" 
              width="120" 
              height="40" 
              rx="6" 
              fill="url(#screenGlow)"
              className={styles.screen}
            >
              <animate
                attributeName="opacity"
                values="0.7;1;0.7"
                dur="2s"
                repeatCount="indefinite"
              />
            </rect>
            
            {/* Code Lines */}
            {codeLines.map((line, index) => (
              <rect
                key={index}
                x="145"
                y={247 + index * 7}
                width={`${line.width}%`}
                height="2"
                fill="#ffffff"
                className={styles.codeLine}
              >
                <animate
                  attributeName="width"
                  values={`${line.width}%;${line.width + 20}%;${line.width}%`}
                  dur={`${line.speed}s`}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="fill"
                  values="#ffffff;#06d6a0;#ffffff"
                  dur={`${line.speed * 2}s`}
                  repeatCount="indefinite"
                />
              </rect>
            ))}
            
            {/* Cursor */}
            <rect 
              x="148" 
              y="277" 
              width="3" 
              height="2" 
              fill="#06d6a0"
              className={styles.cursor}
            >
              <animate
                attributeName="opacity"
                values="1;0;1"
                dur="1s"
                repeatCount="indefinite"
              />
            </rect>
            
            {/* Keyboard */}
            <rect 
              x="140" 
              y="285" 
              width="120" 
              height="10" 
              rx="4" 
              fill="#334155"
              className={styles.keyboard}
            />
            
            {/* Keyboard Keys */}
            {[0, 1, 2, 3, 4, 5, 6].map(i => (
              <rect
                key={i}
                x={142 + i * 16}
                y="287"
                width="10"
                height="6"
                rx="1.5"
                fill="#475569"
                className={styles.key}
              >
                <animate
                  attributeName="fill"
                  values="#475569;#06d6a0;#475569"
                  dur="1.5s"
                  repeatCount="indefinite"
                  begin={`${i * 0.15}s`}
                />
                <animate
                  attributeName="y"
                  values="287;286;287"
                  dur="1.5s"
                  repeatCount="indefinite"
                  begin={`${i * 0.15}s`}
                />
              </rect>
            ))}
            
            {/* Trackpad */}
            <rect 
              x="170" 
              y="295" 
              width="60" 
              height="4" 
              rx="2" 
              fill="#4b5563"
              className={styles.trackpad}
            />
          </g>
        </g>
        
        {/* Floating Tech Icons - Custom Designed */}
        <g className={styles.floatingIcons}>
          {/* React Icon */}
          <g className={styles.floatingIcon} style={{ '--delay': '0s' }}>
            <circle cx="50" cy="100" r="28" fill="rgba(97, 218, 251, 0.1)" stroke="#61dafb" strokeWidth="1" />
            <circle cx="50" cy="100" r="18" fill="none" stroke="#61dafb" strokeWidth="1.5" />
            <circle cx="50" cy="100" r="12" fill="none" stroke="#61dafb" strokeWidth="2" />
            <circle cx="50" cy="100" r="6" fill="#61dafb" />
          </g>
          
          {/* Node.js Icon */}
          <g className={styles.floatingIcon} style={{ '--delay': '1s' }}>
            <circle cx="350" cy="150" r="28" fill="rgba(60, 135, 58, 0.1)" stroke="#3c873a" strokeWidth="1" />
            <polygon points="350,130 365,140 365,160 350,170 335,160 335,140" fill="#68a063" />
            <text x="350" y="157" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">JS</text>
          </g>
          
          {/* AI/Brain Icon */}
          <g className={styles.floatingIcon} style={{ '--delay': '2s' }}>
            <circle cx="80" cy="300" r="28" fill="rgba(244, 114, 182, 0.1)" stroke="#f472b6" strokeWidth="1" />
            <path d="M70,295 Q80,285 90,295 Q95,305 90,315 Q80,325 70,315 Q65,305 70,295" 
                  fill="#f472b6" opacity="0.8" />
            <circle cx="75" cy="300" r="2" fill="white" />
            <circle cx="85" cy="310" r="2" fill="white" />
          </g>
          
          {/* Database Icon */}
          <g className={styles.floatingIcon} style={{ '--delay': '3s' }}>
            <circle cx="320" cy="280" r="28" fill="rgba(16, 185, 129, 0.1)" stroke="#10b981" strokeWidth="1" />
            <ellipse cx="320" cy="275" rx="15" ry="5" fill="#10b981" />
            <rect x="305" y="275" width="30" height="10" fill="#10b981" opacity="0.8" />
            <ellipse cx="320" cy="285" rx="15" ry="5" fill="#10b981" />
            <line x1="305" y1="280" x2="305" y2="285" stroke="white" strokeWidth="1" />
            <line x1="335" y1="280" x2="335" y2="285" stroke="white" strokeWidth="1" />
          </g>
          
          {/* Cloud/API Icon */}
          <g className={styles.floatingIcon} style={{ '--delay': '4s' }}>
            <circle cx="280" cy="100" r="28" fill="rgba(56, 189, 248, 0.1)" stroke="#38bdf8" strokeWidth="1" />
            <path d="M265,105 Q270,95 280,95 Q290,95 295,105 Q300,105 300,110 Q300,115 295,115 Q290,125 280,125 Q270,125 265,115 Q260,115 260,110 Q260,105 265,105" 
                  fill="#38bdf8" opacity="0.8" />
            <circle cx="270" cy="105" r="2" fill="white" />
            <circle cx="290" cy="115" r="2" fill="white" />
          </g>
        </g>
        
        {/* Connection Lines with animation */}
        <path 
          d="M200,210 Q200,190 180,170" 
          stroke="rgba(139, 92, 246, 0.4)" 
          strokeWidth="2" 
          fill="none"
          strokeDasharray="5,5"
          className={styles.connectionLine}
        >
          <animate
            attributeName="stroke-dashoffset"
            values="0;20;0"
            dur="2s"
            repeatCount="indefinite"
          />
        </path>
        
        <path 
          d="M200,210 Q200,190 220,170" 
          stroke="rgba(139, 92, 246, 0.4)" 
          strokeWidth="2" 
          fill="none"
          strokeDasharray="5,5"
          className={styles.connectionLine}
        >
          <animate
            attributeName="stroke-dashoffset"
            values="0;20;0"
            dur="2s"
            repeatCount="indefinite"
            begin="0.5s"
          />
        </path>
        
        {/* Data flow lines from laptop */}
        <path 
          d="M270,260 Q300,250 330,240" 
          stroke="rgba(6, 214, 160, 0.3)" 
          strokeWidth="1.5" 
          fill="none"
          strokeDasharray="3,3"
        >
          <animate
            attributeName="stroke-dashoffset"
            values="0;10;0"
            dur="1.5s"
            repeatCount="indefinite"
          />
        </path>
        
        <path 
          d="M270,270 Q300,280 330,290" 
          stroke="rgba(139, 92, 246, 0.3)" 
          strokeWidth="1.5" 
          fill="none"
          strokeDasharray="3,3"
        >
          <animate
            attributeName="stroke-dashoffset"
            values="0;10;0"
            dur="1.5s"
            repeatCount="indefinite"
            begin="0.7s"
          />
        </path>
      </svg>
      
      {/* Enhanced CSS Glow Effect */}
      <div className={styles.cssGlow}></div>
      
      {/* Status Indicator */}
      <div className={styles.statusIndicator}>
        <div className={styles.statusLight}></div>
        <span className={styles.statusText}>
          {techIcons[activeTech].toUpperCase()}
        </span>
      </div>
    </div>
  );
}

export default SVGAvatar;