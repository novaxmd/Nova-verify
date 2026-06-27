import FloatingMenu from '@/components/FloatingMenu';
import UserMenu from '@/components/UserMenu';
import TechBackground from '@/components/TechBackground';
import Footer from '@/components/Footer';

const RefundPolicy = () => {
  return (
    <div className="min-h-screen bg-background text-foreground relative" style={{ overflowX: 'hidden', overflowY: 'auto' }}>
      <TechBackground />
      <FloatingMenu />
      <UserMenu />

      <section className="relative px-4 py-28">
        <div className="max-w-3xl mx-auto gradient-border p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 gradient-text tracking-wider">Refund Policy</h1>
          <p className="text-sm text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString()}</p>

          <div className="space-y-6 text-muted-foreground leading-relaxed">
            {/* TODO: weka masharti halisi ya refund kwa huduma za kulipia (VPS, panels, n.k) */}
            <p>Sera hii inaeleza ni lini na jinsi gani unaweza kupata refund kwa huduma za malipo za Bmb Tech.</p>
            <h2 className="text-xl font-semibold text-foreground">Huduma Zinazoweza Kurudishiwa</h2>
            <p>Baadhi ya huduma za VPS/Panel zinaweza kurudishiwa ndani ya muda fulani kama hazijatumika.</p>
            <h2 className="text-xl font-semibold text-foreground">Jinsi ya Kuomba Refund</h2>
            <p>Wasiliana nasi kupitia WhatsApp au email iliyo kwenye footer ukiwa na maelezo ya malipo yako.</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default RefundPolicy;
