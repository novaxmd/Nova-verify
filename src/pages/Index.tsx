import { Video, Facebook, Code, Users, Upload, Sparkles, Film, Globe, ImageOff } from 'lucide-react';
import { useEffect, useRef } from 'react';
import FloatingMenu from '@/components/FloatingMenu';
import UserMenu from '@/components/UserMenu';
import DeviceInfo from '@/components/DeviceInfo';
import WebsiteStatus from '@/components/WebsiteStatus';
import TechBackground from '@/components/TechBackground';
import HeroLoader from '@/components/HeroLoader';
import Footer from '@/components/Footer';

const Index = () => {
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      sectionsRef.current.forEach((section) => {
        if (!section) return;
        
        const rect = section.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Add animation class when section comes into view
        if (rect.top < windowHeight * 0.9 && rect.bottom > 0) {
          section.classList.add('animate-in');
        }
      });
    };

    // Initial check after a short delay to ensure elements are rendered
    setTimeout(handleScroll, 100);
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const setSectionRef = (index: number) => (el: HTMLDivElement | null) => {
    sectionsRef.current[index] = el;
  };
  const tools = [
    {
      icon: Video,
      title: 'YouTube Downloader',
      description: 'Download high-quality videos from YouTube with ease. Fast, secure, and reliable.',
      url: 'https://bmb-music.zone.id/',
      tech: 'Html + CSS + JavaScript',
    },
    {
      icon: Facebook,
      title: 'Facebook Downloader',
      description: 'Save your favorite Facebook videos in multiple quality options instantly.',
      url: 'https://bmb-fb-dl-site.vercel.app/',
      tech: 'Htnl + Css + JavaScript',
    },
    {
      icon: Code,
      title: 'Bmb Movie Web site',
      description: 'Live smarter.',
      url: 'http://movie-site-tz.zone.id/',
      tech: 'Html +Css + JavaScript',
    },
    {
      icon: Users,
      title: 'Social Media Download',
      description: 'Social Download videos without watermark.',
      url: 'https://bmbtech-site.vercel.app/',
      tech: 'Next.js + Vite + React + Css',
    },
    {
      icon: Video,
      title: 'TikTok Downloader',
      description: 'Download TikTok videos without watermarks in seconds.',
      url: 'https://bmb-tiktok.vercel.app/',
      tech: 'React + Vite',
    },
    {
      icon: Upload,
      title: 'File-to-URL Uploader',
      description: 'Upload files and get shareable URLs instantly. Simple and fast.',
      url: 'https://url.bmbtech.site',
      tech: 'Next.js + API',
    },
    {
      icon: Film,
      title: 'Bmb Tech Ai',
      description: 'Enjoy getting answers from bmb tech ai technology.',
      url: 'https://bmb-ai.vercel.app/',
      tech: 'Next.js + AI',
    },
    {
      icon: Globe,
      title: 'Bmb Web site',
      description: 'Extract data from websites efficiently with our powerful scraping tool.',
      url: 'https://bmb-tech-website-code.vercel.app/',
      tech: 'Next.js + API',
    },
    {
      icon: ImageOff,
      title: 'download APK file',
      description: 'Get to download files that are not available in the Play Store .',
      url: 'https://bmb-apk-site-wine.vercel.app/',
      tech: 'Next.js + AI',
    },
    {
      icon: Film,
      title: 'Bmb Tech Movies',
      description: 'Get all kinds of movies, enjoy life and movies.',
      url: 'https://bmb-movies.vercel.app',
      tech: 'Next.js + Streaming',
      isNew: true,
    },
    {
      icon: Sparkles,
      title: 'More Tools Coming',
      description: 'Exciting new tools are in development. Stay tuned for innovation!',
      isComingSoon: true,
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground relative" style={{ overflowX: 'hidden', overflowY: 'auto' }}>
      <TechBackground />
      <FloatingMenu />
      <UserMenu />

      {/* Hero Section - unfolds first */}
      <section id="home" className="relative min-h-screen flex items-center justify-center px-4 py-20 animate-unfold">
        <div className="relative z-10">
          <HeroLoader />
        </div>
        
        {/* Corner decorations */}
        <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-primary/50" />
        <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-primary/50" />
        <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-secondary/50" />
        <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-secondary/50" />
      </section>

      {/* Tools & Status Combined - scroll unfold */}
      <div id="tools" ref={setSectionRef(0)} className="scroll-unfold">
        <WebsiteStatus tools={tools} />
      </div>

      {/* Device Info Section - scroll unfold */}
      <div id="device" ref={setSectionRef(1)} className="scroll-unfold">
        <DeviceInfo />
      </div>

      {/* About Section - scroll unfold */}
      <section ref={setSectionRef(2)} id="about" className="relative px-4 py-20 scroll-unfold">
        <div className="max-w-4xl mx-auto">
          <div className="gradient-border p-12">
            <h2 className="text-4xl font-bold mb-6 text-center gradient-text tracking-wider">
              About Bmb Tech Team
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed text-center">
              We're dedicated to building innovative tools that empower users worldwide. 
              Our mission is to make technology accessible, efficient, and beautiful. 
              Each tool is crafted with precision and passion to deliver exceptional experiences.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
