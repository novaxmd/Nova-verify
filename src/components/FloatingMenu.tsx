import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Home,
  MessageCircle,
  Phone,
  Info,
  Wrench,
  Monitor,
} from 'lucide-react';

const FloatingMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: Home, label: 'Home', href: '/' },
    { icon: Wrench, label: 'Tools', href: '/tools' },
    { icon: Monitor, label: 'Device', href: '/#device' },
    { icon: MessageCircle, label: 'WhatsApp Channel', href: 'https://whatsapp.com/channel/0029VawO6hgF6sn7k3SuVU3z', external: true },
    { icon: Phone, label: 'Contact Developer', href: 'https://wa.me/255767862457', external: true },
    { icon: Info, label: 'About', href: '/about' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, external?: boolean) => {
    if (external) return;
    
    e.preventDefault();
    setIsOpen(false);
    
    // Handle hash links on current page
    if (href.startsWith('/#')) {
      const targetId = href.replace('/#', '');
      if (location.pathname === '/') {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } else {
        navigate('/');
        setTimeout(() => {
          const element = document.getElementById(targetId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      }
    } else {
      navigate(href);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Menu Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-6 right-6 z-50 w-14 h-14 rounded-full gradient-border glow-primary flex items-center justify-center group hover:scale-110 transition-transform duration-300"
        aria-label="Toggle menu"
      >
        <div className="flex flex-col items-center justify-center w-6 h-6 gap-1.5">
          <span 
            className={`block h-0.5 bg-primary transition-all duration-300 ease-out ${
              isOpen ? 'w-6 rotate-45 translate-y-2' : 'w-6'
            }`} 
          />
          <span 
            className={`block h-0.5 bg-primary transition-all duration-300 ease-out ${
              isOpen ? 'w-0 opacity-0' : 'w-4'
            }`} 
          />
          <span 
            className={`block h-0.5 bg-primary transition-all duration-300 ease-out ${
              isOpen ? 'w-6 -rotate-45 -translate-y-2' : 'w-6'
            }`} 
          />
        </div>
      </button>

      {/* Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-500 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Background */}
        <div 
          className="absolute inset-0 bg-background/95 backdrop-blur-xl"
          onClick={() => setIsOpen(false)}
        />
        
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className={`absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/10 blur-3xl transition-all duration-700 ${isOpen ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`} />
          <div className={`absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-secondary/10 blur-3xl transition-all duration-700 delay-100 ${isOpen ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`} />
        </div>

        {/* Corner Brackets */}
        <div className={`absolute top-8 left-8 w-12 h-12 border-l-2 border-t-2 border-primary/30 transition-all duration-500 ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`} style={{ transitionDelay: '100ms' }} />
        <div className={`absolute top-8 right-20 w-12 h-12 border-r-2 border-t-2 border-primary/30 transition-all duration-500 ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`} style={{ transitionDelay: '150ms' }} />
        <div className={`absolute bottom-8 left-8 w-12 h-12 border-l-2 border-b-2 border-secondary/30 transition-all duration-500 ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`} style={{ transitionDelay: '200ms' }} />
        <div className={`absolute bottom-8 right-8 w-12 h-12 border-r-2 border-b-2 border-secondary/30 transition-all duration-500 ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`} style={{ transitionDelay: '250ms' }} />

        {/* Menu Content */}
        <nav className="relative z-10 h-full flex flex-col items-center justify-center">
          {/* Header */}
          <div className={`absolute top-8 left-8 transition-all duration-500 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
            <p className="text-primary font-mono text-xs tracking-widest">&lt;NAV/&gt;</p>
          </div>

          {/* Menu Items */}
          <ul className="space-y-4">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              const delay = index * 80;
              
              return (
                <li 
                  key={index}
                  className={`transition-all duration-500 ${
                    isOpen 
                      ? 'opacity-100 translate-x-0' 
                      : 'opacity-0 -translate-x-10'
                  }`}
                  style={{ transitionDelay: isOpen ? `${delay}ms` : '0ms' }}
                >
                  <a
                    href={item.href}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                    onClick={(e) => handleNavClick(e, item.href, item.external)}
                    className="group flex items-center gap-6 py-4 px-6 rounded-xl hover:bg-primary/10 transition-all duration-300"
                  >
                    {/* Index Number */}
                    <span className="text-primary/40 font-mono text-sm w-6">
                      0{index + 1}
                    </span>
                    
                    {/* Icon */}
                    <div className="p-3 rounded-lg bg-primary/10 border border-primary/20 group-hover:bg-primary group-hover:border-primary transition-all duration-300">
                      <Icon className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors" />
                    </div>
                    
                    {/* Label */}
                    <span className="text-2xl md:text-3xl font-orbitron font-bold text-foreground group-hover:text-primary transition-colors tracking-wider">
                      {item.label}
                    </span>
                    
                    {/* Hover line */}
                    <div className="h-0.5 flex-1 max-w-24 bg-gradient-to-r from-primary to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Footer */}
          <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 text-center transition-all duration-500 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '300ms' }}>
            <p className="text-muted-foreground text-xs font-mono tracking-widest">
              B.M.B TECH WEB
            </p>
          </div>
        </nav>
      </div>
    </>
  );
};

export default FloatingMenu;
