import { useState, FormEvent } from 'react';
import { Navigate } from 'react-router-dom';
import { Zap, Loader2, ArrowLeft, Mail, ShieldCheck } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { useToast } from '@/hooks/use-toast';
import TechBackground from '@/components/TechBackground';

type Step = 'email' | 'otp';

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5">
    <path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.54-.2-2.27H12v4.3h6.47c-.28 1.5-1.13 2.77-2.41 3.62v3.01h3.86c2.26-2.09 3.57-5.17 3.57-8.66z" />
    <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3.01c-1.07.72-2.45 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96H1.27v3.1C3.25 21.3 7.31 24 12 24z" />
    <path fill="#FBBC05" d="M5.27 14.27A7.6 7.6 0 0 1 4.87 12c0-.79.14-1.55.4-2.27v-3.1H1.27A11.97 11.97 0 0 0 0 12c0 1.93.46 3.76 1.27 5.37l4-3.1z" />
    <path fill="#EA4335" d="M12 4.77c1.76 0 3.34.6 4.58 1.78l3.42-3.42C17.94 1.19 15.24 0 12 0 7.31 0 3.25 2.7 1.27 6.63l4 3.1C6.22 6.88 8.87 4.77 12 4.77z" />
  </svg>
);

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58 0-.29-.01-1.04-.02-2.04-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.21.08 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6.01 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.6-2.81 5.62-5.49 5.92.43.37.81 1.1.81 2.22 0 1.6-.02 2.89-.02 3.28 0 .32.22.7.83.58A12.01 12.01 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const Auth = () => {
  const { user, loading, sendOtp, verifyOtp, signInWithProvider } = useAuth();
  const { toast } = useToast();

  const [step, setStep] = useState<Step>('email');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Already logged in -> straight to the homepage
  if (!loading && user) {
    return <Navigate to="/" replace />;
  }

  const handleSendOtp = async (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);
    const { error } = await sendOtp(email);
    setSubmitting(false);

    if (error) {
      toast({ title: 'Hitilafu', description: error, variant: 'destructive' });
      return;
    }
    toast({ title: 'Code imetumwa ✅', description: `Angalia email yako ${email} kwa code ya tarakimu 6.` });
    setStep('otp');
  };

  const handleVerifyOtp = async (e: FormEvent) => {
    e.preventDefault();
    if (code.length !== 6) return;
    setSubmitting(true);
    const { error } = await verifyOtp(email, code);
    setSubmitting(false);

    if (error) {
      toast({ title: 'Code si sahihi', description: error, variant: 'destructive' });
      return;
    }
    toast({ title: 'Umeingia kikamilifu 🎉' });
  };

  const handleProvider = async (provider: 'google' | 'github') => {
    const { error } = await signInWithProvider(provider);
    if (error) {
      toast({ title: 'Hitilafu', description: error, variant: 'destructive' });
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4 py-12">
      <TechBackground />

      <div className="relative z-10 w-full max-w-md">
        <div className="gradient-border p-8 backdrop-blur-sm bg-card/60">
          {/* Logo */}
          <div className="flex flex-col items-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center glow-primary mb-4">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <p className="text-secondary font-semibold tracking-wide text-sm">
              Tools . Hosting . Innovation
            </p>
          </div>

          {step === 'email' ? (
            <>
              <h1 className="text-2xl md:text-3xl font-bold text-center mb-2 tracking-wide">Let's Login</h1>
              <p className="text-muted-foreground text-sm text-center mb-8">
                Ingia kwenye account yako ili kuendelea
              </p>

              <form onSubmit={handleSendOtp} className="space-y-5">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground tracking-widest uppercase mb-2 block">
                    Email
                  </label>
                  <Input
                    type="email"
                    required
                    placeholder="Weka email yako"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12"
                  />
                </div>

                <Button type="submit" disabled={submitting} className="w-full h-12 text-base font-semibold">
                  {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Mail className="w-5 h-5" />}
                  Tuma Code (OTP)
                </Button>
              </form>

              <div className="flex items-center gap-3 my-6">
                <div className="flex-1 h-px bg-border" />
                <span className="text-xs text-muted-foreground uppercase tracking-widest">au tumia</span>
                <div className="flex-1 h-px bg-border" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="h-12" onClick={() => handleProvider('google')}>
                  <GoogleIcon /> Google
                </Button>
                <Button variant="outline" className="h-12" onClick={() => handleProvider('github')}>
                  <GithubIcon /> GitHub
                </Button>
              </div>
            </>
          ) : (
            <>
              <button
                onClick={() => setStep('email')}
                className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-4"
              >
                <ArrowLeft className="w-4 h-4" /> Badilisha email
              </button>

              <div className="flex justify-center mb-4">
                <ShieldCheck className="w-10 h-10 text-secondary" />
              </div>

              <h1 className="text-2xl font-bold text-center mb-2 tracking-wide">Weka Code</h1>
              <p className="text-muted-foreground text-sm text-center mb-8">
                Tumetuma code ya tarakimu 6 kwenye <span className="text-foreground font-medium">{email}</span>
              </p>

              <form onSubmit={handleVerifyOtp} className="space-y-6">
                <div className="flex justify-center">
                  <InputOTP maxLength={6} value={code} onChange={setCode}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>

                <Button type="submit" disabled={submitting || code.length !== 6} className="w-full h-12 text-base font-semibold">
                  {submitting && <Loader2 className="w-5 h-5 animate-spin" />}
                  Thibitisha &amp; Ingia
                </Button>

                <button
                  type="button"
                  onClick={handleSendOtp}
                  className="w-full text-center text-sm text-secondary hover:underline"
                >
                  Sijapokea code? Tuma tena
                </button>
              </form>
            </>
          )}
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6 tracking-wide">
          Kwa kuingia, unakubaliana na{' '}
          <a href="/terms" className="text-secondary hover:underline">Terms</a> na{' '}
          <a href="/privacy" className="text-secondary hover:underline">Privacy Policy</a> zetu.
        </p>
      </div>
    </div>
  );
};

export default Auth;
