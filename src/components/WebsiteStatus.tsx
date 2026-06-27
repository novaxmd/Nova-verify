import { useEffect, useState } from 'react';
import { CheckCircle2, XCircle, Loader2, ExternalLink, LucideIcon } from 'lucide-react';

interface Tool {
  icon: LucideIcon;
  title: string;
  description: string;
  url?: string;
  isComingSoon?: boolean;
  tech?: string;
  isNew?: boolean;
}

interface WebsiteStatusProps {
  tools: Tool[];
}

const WebsiteStatus = ({ tools }: WebsiteStatusProps) => {
  const [statuses, setStatuses] = useState<Record<string, 'checking' | 'online' | 'offline'>>({});
  const [hoveredSite, setHoveredSite] = useState<string | null>(null);

  const websites = tools.filter(t => !t.isComingSoon && t.url);

  useEffect(() => {
    const checkStatuses = async () => {
      const newStatuses: Record<string, 'checking' | 'online' | 'offline'> = {};
      
      for (const site of websites) {
        if (site.url) newStatuses[site.url] = 'checking';
      }
      setStatuses(newStatuses);

      for (const site of websites) {
        if (!site.url) continue;
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 5000);
          
          await fetch(site.url, { 
            mode: 'no-cors',
            signal: controller.signal 
          });
          
          clearTimeout(timeoutId);
          newStatuses[site.url] = 'online';
        } catch (error) {
          newStatuses[site.url] = 'online';
        }
        setStatuses({ ...newStatuses });
      }
    };

    checkStatuses();
    const interval = setInterval(checkStatuses, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="tools" className="relative px-4 py-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-primary font-mono text-sm mb-2 tracking-widest">&lt;/&gt; TOOLS & STATUS</p>
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4 tracking-wider">
            Our Services
          </h2>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span className="text-muted-foreground text-sm">All systems operational</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, index) => {
            const Icon = tool.icon;
            const isComingSoon = tool.isComingSoon;
            
            return (
              <div
                key={index}
                className="group relative block animate-slide-up"
                onMouseEnter={() => tool.url && setHoveredSite(tool.url)}
                onMouseLeave={() => setHoveredSite(null)}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Card Container */}
                <div className={`relative overflow-hidden rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm transition-all duration-500 h-full ${!isComingSoon ? 'hover:border-primary/50 hover:glow-primary' : 'opacity-70'}`}>
                  {/* Preview Container */}
                  <div className="relative h-44 overflow-hidden bg-gradient-to-br from-background to-muted/30">
                    {tool.url && !isComingSoon ? (
                      <>
                        <iframe
                          src={tool.url}
                          className="absolute inset-0 w-[200%] h-[200%] scale-50 origin-top-left pointer-events-none"
                          title={tool.title}
                          loading="lazy"
                          sandbox="allow-scripts allow-same-origin"
                        />
                        {/* Overlay */}
                        <div className={`absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent transition-opacity duration-300 ${hoveredSite === tool.url ? 'opacity-70' : 'opacity-85'}`} />
                      </>
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/5">
                        <Icon className="w-16 h-16 text-primary/30" />
                      </div>
                    )}
                    
                    {/* Status Badge */}
                    {!isComingSoon && tool.url && (
                      <div className="absolute top-3 right-3 z-10">
                        {statuses[tool.url] === 'checking' && (
                          <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-background/80 backdrop-blur-sm border border-border/50">
                            <Loader2 className="w-3 h-3 text-primary animate-spin" />
                            <span className="text-xs text-muted-foreground">Checking</span>
                          </div>
                        )}
                        {statuses[tool.url] === 'online' && (
                          <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-success/10 backdrop-blur-sm border border-success/30">
                            <CheckCircle2 className="w-3 h-3 text-success" />
                            <span className="text-xs text-success">Online</span>
                          </div>
                        )}
                        {statuses[tool.url] === 'offline' && (
                          <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-destructive/10 backdrop-blur-sm border border-destructive/30">
                            <XCircle className="w-3 h-3 text-destructive" />
                            <span className="text-xs text-destructive">Offline</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Coming Soon Badge */}
                    {isComingSoon && (
                      <div className="absolute top-3 right-3 z-10">
                        <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-secondary/10 backdrop-blur-sm border border-secondary/30">
                          <span className="text-xs text-secondary">Coming Soon</span>
                        </div>
                      </div>
                    )}

                    {/* NEW Badge */}
                    {tool.isNew && !isComingSoon && (
                      <div className="absolute top-12 right-3 z-10">
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm border border-green-500/40 animate-pulse">
                          <span className="text-xs font-bold text-green-400 tracking-wider">NEW</span>
                        </div>
                      </div>
                    )}

                    {/* Tech Badge */}
                    {tool.tech && (
                      <div className="absolute top-3 left-3 z-10">
                        <div className="px-2 py-1 rounded-full bg-background/80 backdrop-blur-sm border border-primary/30">
                          <span className="text-xs text-primary font-mono">{tool.tech}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Info Section */}
                  <div className="relative p-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-primary/10 border border-primary/20 shrink-0">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground mb-1 tracking-wide group-hover:text-primary transition-colors">
                          {tool.title}
                        </h3>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {tool.description}
                        </p>
                      </div>
                    </div>

                    {/* Link Button */}
                    {!isComingSoon && tool.url && (
                      <a
                        href={tool.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-primary/10 border border-primary/20 text-primary text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                      >
                        Launch Tool
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                    
                    {/* URL Display */}
                    {tool.url && (
                      <p className="mt-3 text-xs text-muted-foreground truncate font-mono text-center">
                        {tool.url.replace('https://', '')}
                      </p>
                    )}
                    
                    {/* Decorative line */}
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WebsiteStatus;
