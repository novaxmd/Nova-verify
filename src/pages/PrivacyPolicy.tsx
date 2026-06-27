import FloatingMenu from '@/components/FloatingMenu';
import UserMenu from '@/components/UserMenu';
import TechBackground from '@/components/TechBackground';
import Footer from '@/components/Footer';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background text-foreground relative" style={{ overflowX: 'hidden', overflowY: 'auto' }}>
      <TechBackground />
      <FloatingMenu />
      <UserMenu />

      <section className="relative px-4 py-28">
        <div className="max-w-3xl mx-auto gradient-border p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 gradient-text tracking-wider">Privacy Policy</h1>
          <p className="text-sm text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString()}</p>

          <div className="space-y-6 text-muted-foreground leading-relaxed">
            <p>
              {/* TODO: weka maelezo halisi ya jinsi Bmb Tech inavyokusanya, kutumia, na kulinda taarifa za watumiaji. */}
              Bmb Tech inaheshimu faragha ya watumiaji wake. Sehemu hii inaelezea jinsi tunavyokusanya, kutumia na
              kulinda taarifa zako wakati unapotumia tovuti na tools zetu.
            </p>
            <h2 className="text-xl font-semibold text-foreground">Taarifa Tunazokusanya</h2>
            <p>Tunaweza kukusanya email yako wakati wa kujisajili (login) na taarifa za matumizi ya tools zetu.</p>
            <h2 className="text-xl font-semibold text-foreground">Jinsi Tunavyotumia Taarifa</h2>
            <p>Taarifa zako zinatumika kuboresha huduma, kuwasiliana nawe, na kulinda usalama wa account yako.</p>
            <h2 className="text-xl font-semibold text-foreground">Mawasiliano</h2>
            <p>Kwa maswali yoyote kuhusu faragha, wasiliana nasi kupitia maelezo yaliyo chini ya tovuti.</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
