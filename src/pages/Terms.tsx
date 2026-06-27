import FloatingMenu from '@/components/FloatingMenu';
import UserMenu from '@/components/UserMenu';
import TechBackground from '@/components/TechBackground';
import Footer from '@/components/Footer';

const Terms = () => {
  return (
    <div className="min-h-screen bg-background text-foreground relative" style={{ overflowX: 'hidden', overflowY: 'auto' }}>
      <TechBackground />
      <FloatingMenu />
      <UserMenu />

      <section className="relative px-4 py-28">
        <div className="max-w-3xl mx-auto gradient-border p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 gradient-text tracking-wider">Terms & Conditions</h1>
          <p className="text-sm text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString()}</p>

          <div className="space-y-6 text-muted-foreground leading-relaxed">
            {/* TODO: weka masharti halisi ya matumizi ya Bmb Tech */}
            <p>Kwa kutumia tovuti na huduma za Bmb Tech, unakubaliana na masharti yafuatayo.</p>
            <h2 className="text-xl font-semibold text-foreground">Matumizi ya Huduma</h2>
            <p>Tools na huduma zetu zinatolewa "as is" na zinaweza kubadilika bila taarifa ya awali.</p>
            <h2 className="text-xl font-semibold text-foreground">Account</h2>
            <p>Una jukumu la kulinda taarifa za login zako na shughuli zote zinazofanyika kwenye account yako.</p>
            <h2 className="text-xl font-semibold text-foreground">Mabadiliko</h2>
            <p>Tunaweza kubadilisha masharti haya wakati wowote; mabadiliko makubwa yatatangazwa kwenye tovuti.</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Terms;
