import FloatingMenu from '@/components/FloatingMenu';
import UserMenu from '@/components/UserMenu';
import TechBackground from '@/components/TechBackground';
import Footer from '@/components/Footer';

const About = () => {
  return (
    <div className="min-h-screen bg-background text-foreground relative" style={{ overflowX: 'hidden', overflowY: 'auto' }}>
      <TechBackground />
      <FloatingMenu />
      <UserMenu />

      {/* About Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="gradient-border p-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center gradient-text tracking-wider">
              About Bmb-Tech Team
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed text-center mb-8">
              We're dedicated to building innovative tools that empower users worldwide. 
              Our mission is to make technology accessible, efficient, and beautiful. 
              Each tool is crafted with precision and passion to deliver exceptional experiences.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="text-center p-6 rounded-xl bg-primary/5 border border-primary/20">
                <p className="text-3xl font-bold gradient-text mb-2">10+</p>
                <p className="text-muted-foreground">Tools Built</p>
              </div>
              <div className="text-center p-6 rounded-xl bg-primary/5 border border-primary/20">
                <p className="text-3xl font-bold gradient-text mb-2">1000+</p>
                <p className="text-muted-foreground">Users Served</p>
              </div>
              <div className="text-center p-6 rounded-xl bg-primary/5 border border-primary/20">
                <p className="text-3xl font-bold gradient-text mb-2">24/7</p>
                <p className="text-muted-foreground">Availability</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Corner decorations */}
        <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-primary/50" />
        <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-primary/50" />
        <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-secondary/50" />
        <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-secondary/50" />
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default About;
