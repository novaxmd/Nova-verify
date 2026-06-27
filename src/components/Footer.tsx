import { Link } from 'react-router-dom';
import { MessageCircle, Send, Youtube, Instagram, Twitter, Facebook, MapPin, Mail, Phone } from 'lucide-react';

// TODO: badilisha hizi links/maelezo na za kweli za Bmb Tech
const socialLinks = [
  { icon: MessageCircle, label: 'WhatsApp', href: 'https://whatsapp.com/channel/0029VawO6hgF6sn7k3SuVU3z' },
  { icon: Send, label: 'Telegram', href: '#' },
  { icon: Youtube, label: 'YouTube', href: '#' },
  { icon: Instagram, label: 'Instagram', href: '#' },
  { icon: Twitter, label: 'X', href: '#' },
  { icon: Facebook, label: 'Facebook', href: '#' },
];

const serviceLinks = [
  { label: 'Tools Zote', href: '/tools' },
  { label: 'Bot Hosting', href: '/tools' },
  { label: 'Social Boosting', href: '/tools' },
  { label: 'VPS & Panels', href: '/tools' },
];

const companyLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
  { label: 'Refund Policy', href: '/refund' },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border/50 bg-card/30 backdrop-blur-sm pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Brand blurb */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center font-bold text-white text-sm shrink-0">
            B
          </div>
          <h3 className="text-lg font-bold tracking-wide gradient-text">Bmb Tech</h3>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-xl mb-10">
          Bmb Tech ni jukwaa la digital linalotoa huduma za bot hosting, social media boosting, na VPS/panel
          kwa watumiaji popote duniani.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Service */}
          <div>
            <p className="text-secondary text-xs font-bold uppercase tracking-widest mb-4">Service</p>
            <ul className="space-y-3">
              {serviceLinks.map((item) => (
                <li key={item.label}>
                  <Link to={item.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="text-secondary text-xs font-bold uppercase tracking-widest mb-4">Company</p>
            <ul className="space-y-3">
              {companyLinks.map((item) => (
                <li key={item.label}>
                  <Link to={item.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className="col-span-2 md:col-span-2">
            <p className="text-secondary text-xs font-bold uppercase tracking-widest mb-4">Our Social Media</p>
            <ul className="grid grid-cols-2 gap-3">
              {socialLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Icon className="w-4 h-4 text-primary" />
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-6 mt-12 pt-6 border-t border-border/50">
        <p className="text-center text-xs text-muted-foreground tracking-wide">
          Copyright © 2020 – {year} <span className="font-semibold text-foreground">Bmb Tech</span> • All rights reserved
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-primary" /> Tanzania
          </span>
          <span className="flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-primary" /> contact@bmbtech.site
          </span>
          <span className="flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-primary" /> +255 767 862 457
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
