import { useEffect, useState } from 'react';
import { Code, Palette, Rocket, Terminal, Zap } from 'lucide-react';
import profileImage from '@/assets/profile.jpg';

const HeroLoader = () => {
  const [currentBioIndex, setCurrentBioIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showSkills, setShowSkills] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const bioTexts = [
    "A Seventeen year old tech enthusiast with innovative dreams and endless curiosity.",
    "Building the future, one line of code at a time.",
    "Passionate about creating tools that matter.",
    "Full-stack developer turning ideas into reality.",
    "Exploring the endless possibilities of technology.",
  ];

  const currentText = bioTexts[currentBioIndex];

  const skills = [
    { icon: Terminal, label: 'JavaScript', color: 'from-yellow-400 to-orange-500' },
    { icon: Code, label: 'TypeScript', color: 'from-blue-400 to-blue-600' },
    { icon: Palette, label: 'React', color: 'from-cyan-400 to-blue-500' },
    { icon: Rocket, label: 'Next.js', color: 'from-gray-400 to-gray-600' },
    { icon: Zap, label: 'Vite', color: 'from-purple-400 to-violet-600' },
  ];
  
  useEffect(() => {
    const typeSpeed = isDeleting ? 30 : 60;
    
    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (charIndex < currentText.length) {
          setCharIndex(prev => prev + 1);
        } else {
          // Pause at full text, then start deleting
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (charIndex > 0) {
          setCharIndex(prev => prev - 1);
        } else {
          // Move to next bio
          setIsDeleting(false);
          setCurrentBioIndex(prev => (prev + 1) % bioTexts.length);
        }
      }
    }, typeSpeed);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, currentText, bioTexts.length]);

  useEffect(() => {
    // Show skills after first bio cycle
    const skillsTimer = setTimeout(() => {
      setShowSkills(true);
    }, 3000);

    // Simulate image load
    const imageTimer = setTimeout(() => {
      setImageLoaded(true);
    }, 300);
    
    return () => {
      clearTimeout(skillsTimer);
      clearTimeout(imageTimer);
    };
  }, []);

  return (
    <div className="flex flex-col items-center gap-8 max-w-4xl mx-auto px-4">
      {/* Profile Picture with enhanced animations */}
      <div className="relative group">
        {/* Pulsing glow background */}
        <div className="absolute -inset-8 rounded-full bg-gradient-to-r from-primary/30 via-secondary/30 to-primary/30 blur-2xl animate-pulse opacity-60" />
        
        {/* Rotating ring 1 */}
        <div className="absolute -inset-6 rounded-full border-2 border-dashed border-primary/40 animate-spin-slow" />
        
        {/* Rotating ring 2 - reverse */}
        <div className="absolute -inset-10 rounded-full border border-secondary/30 animate-spin-reverse" />
        
        {/* Orbiting particles */}
        <div className="absolute inset-0 w-48 h-48 md:w-64 md:h-64 -translate-x-4 -translate-y-4 md:-translate-x-4 md:-translate-y-4">
          {/* Particle 1 */}
          <div className="absolute inset-0 animate-orbit">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary shadow-lg shadow-primary/50" />
          </div>
          {/* Particle 2 */}
          <div className="absolute inset-0 animate-orbit-reverse" style={{ animationDelay: '-2s' }}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-secondary shadow-lg shadow-secondary/50" />
          </div>
          {/* Particle 3 */}
          <div className="absolute inset-0 animate-orbit-fast">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 blur-[1px]" />
          </div>
          {/* Particle 4 */}
          <div className="absolute inset-0 animate-orbit" style={{ animationDelay: '-4s' }}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-purple-400 shadow-lg shadow-purple-400/50" />
          </div>
          {/* Particle 5 - outer orbit */}
          <div className="absolute -inset-4 animate-orbit-reverse" style={{ animationDelay: '-1s' }}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-pink-400" />
          </div>
        </div>

        {/* Animated gradient ring */}
        <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-primary via-secondary to-primary animate-spin-slow opacity-75 blur-sm" />
        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-secondary via-primary to-secondary animate-spin-reverse opacity-60" />
        
        {/* Hexagon overlay effect */}
        <div className="absolute -inset-4 animate-pulse-glow opacity-40">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <polygon 
              points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5" 
              fill="none" 
              stroke="hsl(var(--primary))" 
              strokeWidth="0.5"
              className="animate-spin-slow"
              style={{ transformOrigin: 'center' }}
            />
          </svg>
        </div>
        
        {/* Profile container with bounce */}
        <div className={`relative w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-background transition-all duration-700 group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-primary/30 animate-bounce-slow ${imageLoaded ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}>
          <img 
            src={profileImage} 
            alt="Nabees profile picture"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            onLoad={() => setImageLoaded(true)}
          />
          {/* Shine effect on hover */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-x-full group-hover:translate-x-full" style={{ transition: 'transform 0.8s ease, opacity 0.3s ease' }} />
        </div>
        
        {/* Floating particles around profile */}
        <div className="absolute -top-4 -right-4 w-4 h-4 rounded-full bg-primary animate-float shadow-lg shadow-primary/50" />
        <div className="absolute -bottom-2 -left-4 w-3 h-3 rounded-full bg-secondary animate-float shadow-lg shadow-secondary/50" style={{ animationDelay: '0.5s' }} />
        <div className="absolute top-1/2 -right-6 w-2 h-2 rounded-full bg-cyan-400 animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/4 -left-5 w-2.5 h-2.5 rounded-full bg-purple-400 animate-float" style={{ animationDelay: '1.5s' }} />
        <div className="absolute -bottom-4 right-1/4 w-2 h-2 rounded-full bg-pink-400 animate-pulse" />
      </div>
      
      {/* Name */}
      <div className="text-center mt-4">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-wider animate-fade-in relative text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
          Bmb Tech
        </h1>
        
        {/* Role badge */}
        <div className="inline-block gradient-border px-8 py-3 mt-6 animate-scale-in" style={{ animationDelay: '0.3s' }}>
          <p className="text-xl md:text-2xl font-semibold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
            Full-Stack Developer & Creator
          </p>
        </div>
      </div>
      
      {/* Animated bio with typewriter effect - cycles through messages */}
      <div className="text-center mt-4 min-h-[80px] max-w-2xl">
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
          {currentText.slice(0, charIndex)}
          <span className="typing-cursor">|</span>
        </p>
      </div>

      {/* Skills showcase */}
      <div className={`flex flex-wrap justify-center gap-4 mt-6 transition-all duration-700 ${showSkills ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {skills.map((skill, index) => (
          <div
            key={skill.label}
            className="group relative px-4 py-2 rounded-full bg-card/50 border border-border/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 hover:scale-105 cursor-default"
            style={{ 
              animationDelay: `${index * 100}ms`,
              opacity: showSkills ? 1 : 0,
              transform: showSkills ? 'translateY(0)' : 'translateY(20px)',
              transition: `all 0.5s ease ${index * 100}ms`
            }}
          >
            <div className="flex items-center gap-2">
              <skill.icon className={`w-4 h-4 bg-gradient-to-r ${skill.color} bg-clip-text`} style={{ color: 'transparent', background: `linear-gradient(to right, var(--tw-gradient-stops))`, WebkitBackgroundClip: 'text' }} />
              <span className="text-sm font-medium text-foreground/80 group-hover:text-foreground transition-colors">
                {skill.label}
              </span>
            </div>
            
            {/* Hover glow */}
            <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${skill.color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300`} />
          </div>
        ))}
      </div>

      {/* Scroll indicator */}
      <div className={`mt-12 transition-all duration-700 ${showSkills ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex flex-col items-center gap-2 animate-bounce">
          <span className="text-xs text-muted-foreground uppercase tracking-widest">Explore My Work</span>
          <div className="w-6 h-10 rounded-full border-2 border-primary/50 flex justify-center pt-2">
            <div className="w-1.5 h-3 rounded-full bg-primary animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroLoader;
