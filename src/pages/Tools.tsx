import { Video, Facebook, Code, Users, Upload, Sparkles, Film, Globe, ImageOff, Bot } from 'lucide-react';
import FloatingMenu from '@/components/FloatingMenu';
import UserMenu from '@/components/UserMenu';
import TechBackground from '@/components/TechBackground';
import WebsiteStatus from '@/components/WebsiteStatus';
import Footer from '@/components/Footer';

const Tools = () => {
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
      description: 'Social Media Download videos without watermark.',
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
      icon: Bot,
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
      
      <div className="pt-20">
        <WebsiteStatus tools={tools} />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Tools;
