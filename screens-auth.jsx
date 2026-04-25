// Re'Loren v2 — pre-auth + onboarding screens.

// ── Splash ───────────────────────────────────────────────────
const SplashScreen = ({ onDone }) => {
  useEffect(() => { const t = setTimeout(() => onDone && onDone(), 1600); return () => clearTimeout(t); }, []);
  return (
    <div style={{
      flex: 1, display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      background: T.color.navyBg,
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{
          fontFamily: T.fontSans, fontWeight: 700, fontSize: 44,
          color: T.color.gold500, letterSpacing: '-1%',
        }}>Re<span style={{ color: T.color.gold700 }}>'</span>Loren</div>
        <Txt variant="caption" color={T.color.textMuted} style={{ marginTop: 8 }}>
          Jobs that fit your day
        </Txt>
      </div>
      <div style={{ position: 'absolute', bottom: 80, display: 'flex', gap: 6 }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{
            width: 8, height: 8, borderRadius: 4, background: T.color.gold500,
            opacity: 0.4, animation: `pulseDot 1.2s ease-in-out ${i * 0.2}s infinite`,
          }} />
        ))}
      </div>
    </div>
  );
};

// ── Landing (full-bleed slider) ─────────────────────────────
const LandingScreen = ({ onSignUp, onLogin }) => {
  const [slide, setSlide] = useState(0);
  const slides = [
    { eyebrow: 'Post', title: 'Post a job in your own words', body: 'Bangla, Banglish or English — workers find you.' },
    { eyebrow: 'Work', title: 'Earn on your own schedule', body: 'Get daily job matches at your preferred time.' },
    { eyebrow: 'Trust', title: 'Identity-verified marketplace', body: 'NID + live photo checks on every worker.' },
  ];
  const s = slides[slide];
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: T.color.navyBg }}>
      {/* Illustration */}
      <div style={{
        flex: 1, position: 'relative', overflow: 'hidden',
        background: `radial-gradient(1000px 400px at 50% 20%, ${T.color.navyHover}, ${T.color.navyBg} 60%)`,
      }}>
        {/* Abstract mark */}
        <svg viewBox="0 0 200 200" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
          <circle cx="100" cy="100" r="60" fill="none" stroke={T.color.gold500} strokeWidth="0.6" opacity="0.5" />
          <circle cx="100" cy="100" r="40" fill="none" stroke={T.color.gold500} strokeWidth="0.6" opacity="0.3" />
          <circle cx="100" cy="100" r="20" fill="none" stroke={T.color.gold500} strokeWidth="0.6" opacity="0.15" />
          <circle cx="100" cy="100" r={slide === 0 ? 10 : slide === 1 ? 14 : 8} fill={T.color.gold500} opacity="0.9" />
          <g stroke={T.color.gold500} strokeWidth="0.4" opacity="0.4">
            <line x1="100" y1="40" x2="100" y2="160" />
            <line x1="40" y1="100" x2="160" y2="100" />
          </g>
        </svg>
        <div style={{ position: 'absolute', bottom: 32, left: 0, right: 0, padding: '0 24px' }}>
          <Txt variant="caption" color={T.color.gold500} style={{ fontWeight: 700, marginBottom: 8 }}>
            {s.eyebrow}
          </Txt>
          <Txt variant="headline" style={{ marginBottom: 8, fontSize: 26 }}>{s.title}</Txt>
          <Txt variant="body" color={T.color.textSecondary}>{s.body}</Txt>
          <div style={{ display: 'flex', gap: 6, marginTop: 20 }}>
            {slides.map((_, i) => (
              <button key={i} onClick={() => setSlide(i)}
                style={{
                  width: i === slide ? 24 : 8, height: 6, borderRadius: 3,
                  background: i === slide ? T.color.gold500 : T.color.navyBorder,
                  border: 'none', cursor: 'pointer', transition: 'width 150ms',
                }} />
            ))}
          </div>
        </div>
      </div>
      {/* Footer wordmark + CTAs */}
      <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div>
          <Txt variant="display" style={{ fontSize: 28 }}>Re'Loren</Txt>
          <Txt variant="bodySm" color={T.color.textSecondary}>
            Jobs that fit your day — in Bangla, Banglish or English.
          </Txt>
        </div>
        <PrimaryButton onClick={onSignUp}>Sign Up</PrimaryButton>
        <SecondaryButton onClick={onLogin}>Log In</SecondaryButton>
      </div>
    </div>
  );
};

// ── PhoneOtpEntry ────────────────────────────────────────────
const PhoneOtpEntryScreen = ({ onSendOtp, onCreate, onForgot }) => {
  const [phone, setPhone] = useState('1711-234567');
  const [loading, setLoading] = useState(false);
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: T.color.navyBg }}>
      <div style={{ padding: '20px 16px 0' }}>
        <Txt variant="display" style={{ fontSize: 26, marginBottom: 4 }}>Re'Loren</Txt>
      </div>
      <div style={{ flex: 1, padding: 16, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ marginTop: 24 }}>
          <Txt variant="headline" style={{ fontSize: 24, marginBottom: 6 }}>Sign in with your phone</Txt>
          <Txt variant="body" color={T.color.textSecondary}>We'll send a 4-digit OTP via SMS.</Txt>
        </div>
        <PhoneNumberField value={phone} onChange={setPhone} />
        <PrimaryButton onClick={() => { setLoading(true); setTimeout(onSendOtp, 400); }} disabled={phone.length < 10}>
          {loading ? 'Sending…' : 'Send OTP'}
        </PrimaryButton>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 8 }}>
          <div style={{ flex: 1, height: 1, background: T.color.navyBorder }} />
          <Txt variant="caption" color={T.color.textMuted} style={{ letterSpacing: 0 }}>OR</Txt>
          <div style={{ flex: 1, height: 1, background: T.color.navyBorder }} />
        </div>
        <div style={{ textAlign: 'center' }}>
          <Txt variant="bodySm" color={T.color.textSecondary}>New to Re'Loren?</Txt>
          <SecondaryButton onClick={onCreate} style={{ marginTop: 8 }}>Create account</SecondaryButton>
          <button onClick={onForgot} style={{
            background: 'none', border: 'none', color: T.color.textSecondary,
            fontFamily: T.fontSans, fontSize: 13, marginTop: 14, textDecoration: 'underline', cursor: 'pointer',
          }}>Use email instead</button>
        </div>
      </div>
    </div>
  );
};

// ── OtpVerify ────────────────────────────────────────────────
const OtpVerifyScreen = ({ onBack, onVerify }) => {
  const [code, setCode] = useState('37');
  const [error, setError] = useState(false);
  const [countdown, setCountdown] = useState(42);
  useEffect(() => {
    if (countdown <= 0) return;
    const t = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: T.color.navyBg }}>
      <AppBarElevated title="Verify OTP" left={<BackButton onClick={onBack} />} />
      <div style={{ flex: 1, padding: 20, display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div>
          <Txt variant="body" color={T.color.textSecondary}>Enter the 4-digit code sent to</Txt>
          <Txt variant="subtitle" style={{ marginTop: 4 }}>+880 1711-234567</Txt>
        </div>
        <OtpInput length={4} value={code} onChange={v => { setCode(v); setError(false); }} error={error} />
        {error && <Banner variant="error" title="Wrong code">Check the SMS and try again. 2 attempts left.</Banner>}
        <div style={{ textAlign: 'center' }}>
          {countdown > 0 ? (
            <Txt variant="bodySm" color={T.color.textSecondary}>
              Resend OTP in 00:{String(countdown).padStart(2, '0')}
            </Txt>
          ) : (
            <button onClick={() => setCountdown(42)} style={{
              background: 'none', border: 'none', color: T.color.gold500,
              fontFamily: T.fontSans, fontSize: 14, fontWeight: 600, cursor: 'pointer',
            }}>Resend OTP</button>
          )}
        </div>
        <PrimaryButton onClick={() => code.length === 4 ? onVerify() : setError(true)} disabled={code.length !== 4}>
          Verify
        </PrimaryButton>
        <SecondaryButton onClick={onBack}>Change number</SecondaryButton>
      </div>
    </div>
  );
};

// ── RegisterForm ─────────────────────────────────────────────
const RegisterFormScreen = ({ onBack, onNext }) => {
  const [name, setName] = useState('Karim Ahmed');
  const [email, setEmail] = useState('karim@example.com');
  const [pw, setPw] = useState('');
  const [cpw, setCpw] = useState('');
  const [show, setShow] = useState(false);
  const ok = name && pw.length >= 8 && pw === cpw;
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: T.color.navyBg }}>
      <AppBarElevated title="Create your account" left={<BackButton onClick={onBack} />} />
      <div style={{ flex: 1, padding: 16, display: 'flex', flexDirection: 'column', gap: 14, overflow: 'auto' }}>
        <Banner variant="success" title="Phone verified">+880 1711-234567</Banner>
        <TextField label="Full name" value={name} onChange={setName} />
        <TextField label="Email (optional)" value={email} onChange={setEmail} type="email" />
        <TextField label="Password" value={pw} onChange={setPw} type={show ? 'text' : 'password'}
          helper="Minimum 8 characters"
          suffix={<IconButton name="eye" size={32} iconSize={18} onClick={() => setShow(s => !s)} />} />
        <TextField label="Confirm password" value={cpw} onChange={setCpw} type={show ? 'text' : 'password'}
          error={cpw && cpw !== pw ? 'Passwords do not match' : ''} />
        <div style={{ marginTop: 8 }}>
          <PrimaryButton onClick={onNext} disabled={!ok}>Create account</PrimaryButton>
          <Txt variant="caption" color={T.color.textMuted} style={{ textAlign: 'center', marginTop: 12, letterSpacing: 0 }}>
            By continuing you agree to our Terms & Privacy.
          </Txt>
        </div>
      </div>
    </div>
  );
};

// ── Mode select onboarding ───────────────────────────────────
const ModeSelectOnboardingScreen = ({ onContinue }) => {
  const [mode, setMode] = useState('employer');
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: T.color.navyBg }}>
      <AppBarElevated title="Welcome, Karim" />
      <div style={{ flex: 1, padding: 16, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <Txt variant="headline" style={{ fontSize: 24, marginBottom: 4 }}>How do you want to start?</Txt>
          <Txt variant="bodySm" color={T.color.textSecondary}>You can switch anytime from your profile.</Txt>
        </div>
        <Radio
          checked={mode === 'employer'}
          label="Employer"
          sub="Post jobs and hire Workers. No verification needed to post."
          onClick={() => setMode('employer')}
        />
        <Radio
          checked={mode === 'worker'}
          label="Worker"
          sub="Get job notifications and earn. Needs identity verification."
          onClick={() => setMode('worker')}
        />
        <div style={{ marginTop: 'auto' }}>
          <PrimaryButton onClick={() => onContinue(mode)}>
            Continue as {mode === 'worker' ? 'Worker' : 'Employer'}
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

// ── Forgot password entry ────────────────────────────────────
const ForgotPasswordEntryScreen = ({ onBack, onSend, onSwitchOtp }) => {
  const [email, setEmail] = useState('karim@example.com');
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: T.color.navyBg }}>
      <AppBarElevated title="Forgot password" left={<BackButton onClick={onBack} />} />
      <div style={{ flex: 1, padding: 16, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <Txt variant="subtitle" style={{ marginBottom: 4 }}>Enter your registered email</Txt>
          <Txt variant="bodySm" color={T.color.textSecondary}>We'll send a reset link.</Txt>
        </div>
        <TextField label="Email" value={email} onChange={setEmail} type="email" />
        <Banner variant="info">Check your inbox and spam folder. Link expires in 30 minutes.</Banner>
        <PrimaryButton onClick={onSend}>Send reset link</PrimaryButton>
        <button onClick={onSwitchOtp} style={{
          background: 'none', border: 'none', color: T.color.gold500,
          fontFamily: T.fontSans, fontSize: 14, cursor: 'pointer',
          textAlign: 'center', textDecoration: 'underline', marginTop: 4,
        }}>Sign in with OTP instead</button>
      </div>
    </div>
  );
};

// ── Password reset ───────────────────────────────────────────
const PasswordResetScreen = ({ onDone }) => {
  const [pw, setPw] = useState('');
  const [cpw, setCpw] = useState('');
  const ok = pw.length >= 8 && pw === cpw;
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: T.color.navyBg }}>
      <AppBarElevated title="Reset password" />
      <div style={{ flex: 1, padding: 16, display: 'flex', flexDirection: 'column', gap: 14 }}>
        <Txt variant="bodySm" color={T.color.textSecondary}>For: karim@example.com</Txt>
        <TextField label="New password" value={pw} onChange={setPw} type="password" helper="Minimum 8 characters" />
        <TextField label="Confirm new password" value={cpw} onChange={setCpw} type="password"
          error={cpw && cpw !== pw ? 'Passwords do not match' : ''} />
        <Banner variant="warning">This link expires in 30 minutes.</Banner>
        <div style={{ marginTop: 'auto' }}>
          <PrimaryButton onClick={onDone} disabled={!ok}>Set new password</PrimaryButton>
        </div>
      </div>
    </div>
  );
};

Object.assign(window, {
  SplashScreen, LandingScreen, PhoneOtpEntryScreen, OtpVerifyScreen,
  RegisterFormScreen, ModeSelectOnboardingScreen,
  ForgotPasswordEntryScreen, PasswordResetScreen,
});
