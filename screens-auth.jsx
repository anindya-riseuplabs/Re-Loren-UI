// Re'Loren v2 — pre-auth + onboarding screens.

// ── Splash ───────────────────────────────────────────────────
const SplashScreen = ({ onDone }) => {
  useEffect(() => { const t = setTimeout(() => onDone && onDone(), 3000); return () => clearTimeout(t); }, []);
  return (
    <div style={{
      width: '100%', height: '100%',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'space-between',
      background: `#0B0F1A url('splash-bg.png') center/cover no-repeat`,
      padding: '60px 24px 80px',
      position: 'relative',
    }}>
      {/* Dark overlay for depth */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, transparent 0%, rgba(11,15,26,0.4) 100%)', pointerEvents: 'none' }} />

      <div style={{ zIndex: 1, textAlign: 'center' }}>
        <BrandLogo height={100} style={{ filter: 'drop-shadow(0 0 20px rgba(212,175,55,0.5))' }} />
      </div>

      {/* Tagline sits BELOW the world map, near the bottom of the frame */}
      <div style={{ zIndex: 1, width: '100%', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingBottom: 8 }}>
        <Txt variant="headline" style={{
          fontFamily: "'Allura', cursive",
          fontWeight: 400,
          fontSize: 54,
          lineHeight: 0.95,
          letterSpacing: 'normal',
          whiteSpace: 'nowrap',
          color: '#FDFBF7',
          textShadow: '0 2px 12px rgba(0,0,0,0.65)',
        }}>
          Be the chooser,
        </Txt>
        <Txt variant="headline" style={{
          fontFamily: "'Playfair Display', serif",
          fontStyle: 'italic',
          fontWeight: 700,
          fontSize: 38,
          lineHeight: 1.05,
          letterSpacing: 'normal',
          whiteSpace: 'nowrap',
          marginTop: 4,
          background: T.color.goldGradient,
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          color: 'transparent',
          filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.7))',
        }}>
          Take the lead.
        </Txt>
        <div style={{
          width: 130, height: 3, borderRadius: 2, marginTop: 12,
          background: T.color.goldGradient, boxShadow: '0 0 10px rgba(212,175,55,0.5)',
        }} />
        <div style={{ display: 'flex', gap: 8, marginTop: 28 }}>
          {[0, 1, 2].map(i => (
            <div key={i} style={{
              width: 6, height: 6, borderRadius: 3, background: '#D4AF37',
              boxShadow: '0 0 8px rgba(212,175,55,0.8)',
              animation: `pulseDot 1.2s ease-in-out ${i * 0.2}s infinite`,
            }} />
          ))}
        </div>
      </div>
    </div>
  );
};

// ── Landing (full-bleed slider) ─────────────────────────────
const LandingScreen = ({ onSignUp, onLogin }) => {
  const [slide, setSlide] = useState(0);
  const slides = [
    { eyebrow: 'Post', title: 'Post a job in your own words', body: 'Bangla, Banglish or English — workers find you.', img: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=800' },
    { eyebrow: 'Work', title: 'Earn on your own schedule', body: 'Get daily job matches at your preferred time.', img: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800' },
    { eyebrow: 'Trust', title: 'Identity-verified marketplace', body: 'NID + live photo checks on every worker.', img: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800' },
  ];

  useEffect(() => {
    const timer = setInterval(() => setSlide(s => (s + 1) % slides.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const s = slides[slide];
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: T.color.navyBg }}>
      {/* Illustration / Slider Area */}
      <div style={{
        flex: 1, position: 'relative', overflow: 'hidden',
        background: `radial-gradient(1000px 400px at 50% 20%, ${T.color.navyHover}, ${T.color.navyBg} 60%)`,
      }}>
        {/* Animated Background Slide */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.3,
          backgroundImage: `url(${s.img})`, backgroundSize: 'cover', backgroundPosition: 'center',
          transition: 'all 1s ease-in-out',
        }} />
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to bottom, transparent 0%, ${T.color.navyBg} 90%)` }} />

        {/* Abstract mark */}
        <svg viewBox="0 0 200 200" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 1 }}>
          <circle cx="100" cy="100" r="60" fill="none" stroke={T.color.gold500} strokeWidth="0.6" opacity="0.5" />
          <circle cx="100" cy="100" r="40" fill="none" stroke={T.color.gold500} strokeWidth="0.6" opacity="0.3" />
          <circle cx="100" cy="100" r="20" fill="none" stroke={T.color.gold500} strokeWidth="0.6" opacity="0.15" />
          <circle cx="100" cy="100" r={slide === 0 ? 10 : slide === 1 ? 14 : 8} fill={T.color.gold500} opacity="0.9" style={{ transition: 'r 0.5s cubic-bezier(0.4, 0, 0.2, 1)' }} />
        </svg>

        <div style={{ position: 'absolute', bottom: 32, left: 0, right: 0, padding: '0 24px', zIndex: 2 }}>
          <div style={{ transform: `translateY(${0}px)`, transition: 'all 0.5s ease' }}>
            <Txt variant="caption" color={T.color.gold500} style={{ fontWeight: 700, marginBottom: 8, display: 'block', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              {s.eyebrow}
            </Txt>
            <Txt variant="headline" style={{ marginBottom: 8, fontSize: 26, lineHeight: 1.2 }}>{s.title}</Txt>
            <Txt variant="body" color={T.color.textSecondary}>{s.body}</Txt>
          </div>
          <div style={{ display: 'flex', gap: 6, marginTop: 20 }}>
            {slides.map((_, i) => (
              <button key={i} onClick={() => setSlide(i)}
                style={{
                  width: i === slide ? 24 : 8, height: 6, borderRadius: 3,
                  background: i === slide ? T.color.gold500 : T.color.navyBorder,
                  border: 'none', cursor: 'pointer', transition: 'width 300ms',
                }} />
            ))}
          </div>
        </div>
      </div>
      {/* Footer wordmark + CTAs */}
      <div style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: 12, background: T.color.navyDeep, borderTop: `1px solid ${T.color.navyBorder}` }}>
        <div style={{ marginBottom: 4 }}>
          <BrandLogo height={36} style={{ marginBottom: 8 }} />
          <Txt variant="bodySm" color={T.color.textSecondary}>
            Premium workforce marketplace for Bangladesh.
          </Txt>
        </div>
        <PrimaryButton onClick={onSignUp}>Create Account</PrimaryButton>
        <SecondaryButton onClick={onLogin}>Sign In</SecondaryButton>
      </div>
    </div>
  );
};

// ── Phone + Password login ───────────────────────────────────
const PhoneOtpEntryScreen = ({ onSendOtp, onCreate, onForgot }) => {
  const [phone, setPhone] = useState('1711-234567');
  const [pw, setPw] = useState('');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const ok = phone.length >= 10 && pw.length >= 1;
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: T.color.navyBg }}>
      <div style={{ padding: '20px 16px 0' }}>
        <BrandLogo height={40} style={{ marginBottom: 8 }} />
      </div>
      <div style={{ flex: 1, padding: 16, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ marginTop: 24 }}>
          <Txt variant="headline" style={{ fontSize: 24, marginBottom: 6 }}>Sign in</Txt>
          <Txt variant="body" color={T.color.textSecondary}>Enter your mobile number and password.</Txt>
        </div>
        <PhoneNumberField label="Phone number" value={phone} onChange={setPhone} />
        <TextField label="Password" value={pw} onChange={setPw} type={show ? 'text' : 'password'}
          placeholder="Enter your password"
          suffix={<IconButton name={show ? 'eye' : 'eye'} size={32} iconSize={18} onClick={() => setShow(s => !s)} />} />
        <div style={{ textAlign: 'right', marginTop: -6 }}>
          <button onClick={onForgot} style={{
            background: 'none', border: 'none', color: T.color.teal500,
            fontFamily: T.fontSans, fontSize: 13, fontWeight: 500, cursor: 'pointer', padding: 0,
          }}>Forgot password?</button>
        </div>
        <PrimaryButton onClick={() => { setLoading(true); setTimeout(() => onSendOtp && onSendOtp(), 400); }} disabled={!ok}>
          {loading ? 'Signing in…' : 'Sign in'}
        </PrimaryButton>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 8 }}>
          <div style={{ flex: 1, height: 1, background: T.color.navyBorder }} />
          <Txt variant="caption" color={T.color.textMuted} style={{ letterSpacing: 0 }}>OR</Txt>
          <div style={{ flex: 1, height: 1, background: T.color.navyBorder }} />
        </div>
        <div style={{ textAlign: 'center' }}>
          <Txt variant="bodySm" color={T.color.textSecondary}>New to Re'Loren?</Txt>
          <SecondaryButton onClick={onCreate} style={{ marginTop: 8 }}>Create account</SecondaryButton>
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
              {window.getLang() === 'bn'
                ? `00:${String(countdown).padStart(2, '0')} পরে OTP আবার পাঠান`
                : `Resend OTP in 00:${String(countdown).padStart(2, '0')}`}
            </Txt>
          ) : (
            <button onClick={() => setCountdown(42)} style={{
              background: 'none', border: 'none', color: T.color.teal500,
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
const RegisterFormScreen = ({ onBack, onNext, role = 'employer' }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('1711-234567');
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [otpOpen, setOtpOpen] = useState(false);
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [cpw, setCpw] = useState('');
  const [photo, setPhoto] = useState(false);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);

  // Worker-only details
  const [profession, setProfession] = useState('');
  const [professionQuery, setProfessionQuery] = useState('');
  const [showProfDD, setShowProfDD] = useState(false);
  const [age, setAge] = useState('');
  const [cert, setCert] = useState(false);

  const professions =['Driver', 'Delivery rider', 'Domestic helper', 'Cook', 'Electrician', 'Plumber', 'Carpenter', 'Painter', 'Cleaner', 'Security guard', 'Gardener', 'Mechanic', 'Tailor', 'Mover / Loader'];
  const filteredProfessions = professionQuery
    ? professions.filter(p => p.toLowerCase().includes(professionQuery.toLowerCase()))
    : professions;

  const baseOk = name && phone.length >= 10 && phoneVerified && pw.length >= 8 && pw === cpw;
  const ok = role === 'worker'
    ? baseOk && profession && age
    : baseOk;

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: T.color.navyBg }}>
      <AppBarElevated title="Create account" left={<BackButton onClick={onBack} />} />
      <div style={{ flex: 1, padding: 16, display: 'flex', flexDirection: 'column', gap: 16, overflow: 'auto' }}>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <button onClick={() => setPhoto(p => !p)} style={{
            width: 80, height: 80, borderRadius: 40,
            background: photo ? `linear-gradient(135deg, ${T.color.navyDeep}, ${T.color.navyHover})` : T.color.navyDeep,
            border: `2px dashed ${photo ? T.color.gold500 : T.color.navyBorder}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', flexShrink: 0,
          }}>
            <Icon name={photo ? 'checkCircle' : 'camera'} size={28} color={photo ? T.color.success : T.color.gold500} />
          </button>
          <div>
            <Txt variant="bodySm" style={{ fontWeight: 600 }}>Profile photo</Txt>
            <Txt variant="caption" color={T.color.textMuted} style={{ letterSpacing: 0 }}>
              {photo ? 'Photo added' : 'Tap to upload'}
            </Txt>
          </div>
        </div>

        <TextField label="Full name" value={name} onChange={setName} placeholder="Enter your name" />

        <div>
          <Txt variant="bodySm" color={T.color.gold500} style={{ marginBottom: 6, fontWeight: 500 }}>Phone number</Txt>
          <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
            <div style={{ flex: 1 }}>
              <PhoneNumberField value={phone} onChange={(v) => { setPhone(v); setPhoneVerified(false); }} />
            </div>
            {phoneVerified ? (
              <div style={{
                minHeight: 48, padding: '0 14px', borderRadius: T.radius.m,
                background: 'rgba(102,187,106,0.16)', border: `1px solid ${T.color.success}`,
                display: 'flex', alignItems: 'center', gap: 6,
              }}>
                <Icon name="checkCircle" size={16} color={T.color.success} />
                <Txt variant="caption" color={T.color.success} style={{ letterSpacing: 0, fontWeight: 600 }}>Verified</Txt>
              </div>
            ) : (
              <button onClick={() => setOtpOpen(true)} disabled={phone.length < 10} style={{
                minHeight: 48, padding: '0 14px', borderRadius: T.radius.m,
                background: phone.length < 10 ? T.color.navyDeep : T.color.teal500,
                border: 'none', color: phone.length < 10 ? T.color.textMuted : T.color.textOnGold,
                fontFamily: T.fontSans, fontSize: 13, fontWeight: 600, cursor: phone.length < 10 ? 'not-allowed' : 'pointer',
              }}>Verify</button>
            )}
          </div>
        </div>

        <TextField label="Email (optional)" value={email} onChange={setEmail} type="email" placeholder="email@example.com" />

        <TextField label="Password" value={pw} onChange={setPw} type={show ? 'text' : 'password'}
          helper="Minimum 8 characters"
          suffix={<IconButton name="eye" size={32} iconSize={18} onClick={() => setShow(s => !s)} />} />

        <TextField label="Retype password" value={cpw} onChange={setCpw} type={show2 ? 'text' : 'password'}
          error={cpw && cpw !== pw ? 'Passwords do not match' : ''}
          suffix={<IconButton name="eye" size={32} iconSize={18} onClick={() => setShow2(s => !s)} />} />

        {role === 'worker' && (
          <>
            <Txt variant="caption" color={T.color.textMuted}>WORKER DETAILS</Txt>

            <div style={{ position: 'relative' }}>
              <TextField label="Profession type" value={profession || professionQuery}
                onChange={(v) => { setProfession(''); setProfessionQuery(v); setShowProfDD(true); }}
                placeholder="Type or search..."
                suffix={
                  <IconButton name="chevronDown" size={32} iconSize={16}
                    onClick={() => setShowProfDD(d => !d)} />
                } />
              {showProfDD && (
                <div style={{
                  position: 'absolute', top: '100%', left: 0, right: 0, marginTop: 4,
                  background: T.color.navyDeep, border: `1px solid ${T.color.navyBorder}`,
                  borderRadius: T.radius.m, maxHeight: 180, overflow: 'auto', zIndex: 10,
                  boxShadow: T.elevation.lg,
                }}>
                  {filteredProfessions.length === 0 ? (
                    <div style={{ padding: 14 }}>
                      <Txt variant="bodySm" color={T.color.textMuted}>
                        No match. Use "{professionQuery}" as custom profession.
                      </Txt>
                      <button onClick={() => { setProfession(professionQuery); setShowProfDD(false); }} style={{
                        marginTop: 8, background: 'none', border: 'none', color: T.color.teal500,
                        fontFamily: T.fontSans, fontSize: 13, fontWeight: 600, cursor: 'pointer', padding: 0,
                      }}>Use custom →</button>
                    </div>
                  ) : filteredProfessions.map(p => (
                    <button key={p} onClick={() => { setProfession(p); setProfessionQuery(''); setShowProfDD(false); }} style={{
                      display: 'block', width: '100%', textAlign: 'left',
                      padding: 12, background: 'transparent', border: 'none', cursor: 'pointer',
                      color: T.color.textPrimary, fontFamily: T.fontSans, fontSize: 14,
                    }}>{p}</button>
                  ))}
                </div>
              )}
            </div>

            <TextField label="Age" value={age} onChange={(v) => setAge(v.replace(/\D/g, ''))}
              placeholder="e.g. 28"
              helper="Auto-verified from your NID where available — or type it in." />

            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <button onClick={() => setCert(c => !c)} style={{
                width: 64, height: 64, borderRadius: T.radius.m,
                background: cert ? `linear-gradient(135deg, ${T.color.navyDeep}, ${T.color.navyHover})` : T.color.navyDeep,
                border: `2px dashed ${cert ? T.color.success : T.color.navyBorder}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', flexShrink: 0,
              }}>
                <Icon name={cert ? 'checkCircle' : 'award'} size={26} color={cert ? T.color.success : T.color.gold500} />
              </button>
              <div>
                <Txt variant="bodySm" style={{ fontWeight: 600 }}>Work certificate (optional)</Txt>
                <Txt variant="caption" color={T.color.textMuted} style={{ letterSpacing: 0 }}>
                  {cert ? 'Certificate added' : 'Tap to upload (if any)'}
                </Txt>
              </div>
            </div>
          </>
        )}

        <div style={{ marginTop: 8, paddingBottom: 20 }}>
          <PrimaryButton onClick={onNext} disabled={!ok}>Create account</PrimaryButton>
          <Txt variant="caption" color={T.color.textMuted} style={{ textAlign: 'center', marginTop: 12, display: 'block', letterSpacing: 0 }}>
            By continuing you agree to our <span style={{ color: T.color.gold500, textDecoration: 'underline' }}>Terms & Privacy</span>.
          </Txt>
        </div>
      </div>

      {otpOpen && (
        <BottomSheet onClose={() => setOtpOpen(false)} title="Verify your phone">
          <Txt variant="bodySm" color={T.color.textSecondary} style={{ marginBottom: 4 }}>
            We sent a 4-digit code to
          </Txt>
          <Txt variant="subtitle" style={{ marginBottom: 16 }}>+880 {phone}</Txt>
          <OtpInput length={4} value={otp} onChange={setOtp} />
          <div style={{ height: 16 }} />
          <PrimaryButton onClick={() => { setPhoneVerified(true); setOtpOpen(false); setOtp(''); }} disabled={otp.length !== 4}>
            Verify
          </PrimaryButton>
        </BottomSheet>
      )}
    </div>
  );
};

// ── Forgot password entry ────────────────────────────────────
const ForgotPasswordEntryScreen = ({ onBack, onSend, onSwitchOtp }) => {
  const [phone, setPhone] = useState('1711-234567');
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: T.color.navyBg }}>
      <AppBarElevated title="Forgot password" left={<BackButton onClick={onBack} />} />
      <div style={{ flex: 1, padding: 16, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <Txt variant="subtitle" style={{ marginBottom: 4 }}>Enter your phone number</Txt>
          <Txt variant="bodySm" color={T.color.textSecondary}>We'll send an OTP to reset your password.</Txt>
        </div>
        <PhoneNumberField label="Phone number" value={phone} onChange={setPhone} />
        <PrimaryButton onClick={() => onSend && onSend('phone')} disabled={phone.length < 10}>Send OTP</PrimaryButton>
      </div>
    </div>
  );
};

// ── Password reset ───────────────────────────────────────────
const PasswordResetScreen = ({ onDone, identity = 'karim@example.com' }) => {
  const [pw, setPw] = useState('');
  const [cpw, setCpw] = useState('');
  const ok = pw.length >= 8 && pw === cpw;
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: T.color.navyBg }}>
      <AppBarElevated title="New Password" />
      <div style={{ flex: 1, padding: 16, display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{ marginBottom: 8 }}>
          <Txt variant="headline" style={{ fontSize: 24, marginBottom: 4 }}>Create new password</Txt>
          <Txt variant="bodySm" color={T.color.textSecondary}>{window.getLang() === 'bn' ? `এর জন্য: ${identity}` : `For: ${identity}`}</Txt>
        </div>
        <TextField label="New password" value={pw} onChange={setPw} type="password" placeholder="Min 8 characters" />
        <TextField label="Confirm password" value={cpw} onChange={setCpw} type="password"
          error={cpw && cpw !== pw ? 'Passwords do not match' : ''} placeholder="Re-enter password" />
        <Banner variant="info">Use a strong password that you haven't used before.</Banner>
        <div style={{ marginTop: 'auto' }}>
          <PrimaryButton onClick={onDone} disabled={!ok}>Confirm Password</PrimaryButton>
        </div>
      </div>
    </div>
  );
};

// ── Registration complete (verification under review) ───────
const RegistrationCompleteScreen = ({ onContinue }) => (
  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: T.color.navyBg,
    alignItems: 'center', justifyContent: 'center', padding: 24, gap: 16 }}>
    <div style={{
      width: 96, height: 96, borderRadius: 48, background: 'rgba(102,187,106,0.15)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <Icon name="checkCircle" size={56} color={T.color.success} />
    </div>
    <Txt variant="h2" style={{ textAlign: 'center' }}>Registration complete</Txt>
    <Txt variant="body" color={T.color.textSecondary} style={{ textAlign: 'center', maxWidth: 280 }}>
      Welcome to Re'Loren! Your account is ready. Complete worker verification next to start bidding.
    </Txt>
    <div style={{ width: '100%', marginTop: 'auto' }}>
      <PrimaryButton onClick={onContinue}>Continue to dashboard</PrimaryButton>
    </div>
  </div>
);

// ── Path selection + language (first run → choose Client / Worker) ──
// Shown after splash, before the landing page. The user picks their
// language preference and their path; then the landing page appears.
const PathSelectionScreen = ({ onContinue }) => {
  // Drive the global language from this picker, and reflect external changes.
  const uiLang = useLang();
  const lang = uiLang === 'bn' ? 'Bangla' : 'English';
  const setLang = (v) => window.setLang(v === 'Bangla' ? 'bn' : 'en');
  const [path, setPath] = useState('client');
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: T.color.navyBg }}>
      <div style={{ padding: '20px 16px 0' }}>
        <BrandLogo height={40} />
      </div>
      <div style={{ flex: 1, padding: 16, display: 'flex', flexDirection: 'column', gap: 18, overflow: 'auto' }}>
        <div style={{ marginTop: 8 }}>
          <Txt variant="headline" style={{ fontSize: 24, marginBottom: 4 }}>Welcome to Re'Loren</Txt>
          <Txt variant="bodySm" color={T.color.textSecondary}>
            Pick your language and how you want to start. You can switch anytime from your profile.
          </Txt>
        </div>

        <div>
          <Txt variant="caption" color={T.color.textMuted} style={{ marginBottom: 10 }}>LANGUAGE PREFERENCE</Txt>
          <Segmented
            options={[{ value: 'Bangla', label: 'বাংলা' }, { value: 'English', label: 'English' }]}
            value={lang} onChange={setLang} />
        </div>

        <div>
          <Txt variant="caption" color={T.color.textMuted} style={{ marginBottom: 10 }}>CHOOSE YOUR PATH</Txt>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Radio checked={path === 'client'} label="Client" sub="Post jobs and hire workers. No verification needed to post." onClick={() => setPath('client')} />
            <Radio checked={path === 'worker'} label="Worker" sub="Find jobs and earn. Needs identity verification." onClick={() => setPath('worker')} />
          </div>
        </div>

        <div style={{ marginTop: 'auto', paddingBottom: 16 }}>
          <PrimaryButton onClick={() => onContinue && onContinue({ path, lang })}>
            {window.getLang() === 'bn'
              ? `${path === 'worker' ? 'কর্মী' : 'ক্লায়েন্ট'} হিসেবে চালিয়ে যান`
              : `Continue as ${path === 'worker' ? 'Worker' : 'Client'}`}
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

Object.assign(window, {
  SplashScreen, PathSelectionScreen, LandingScreen, PhoneOtpEntryScreen, OtpVerifyScreen,
  RegisterFormScreen,
  ForgotPasswordEntryScreen, PasswordResetScreen,
  RegistrationCompleteScreen,
});
