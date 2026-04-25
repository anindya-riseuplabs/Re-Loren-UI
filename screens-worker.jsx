// Re'Loren v2 — worker onboarding, verification, skill/asset declaration.

// ── Worker Onboarding Intro ──────────────────────────────────
const WorkerOnboardingIntroScreen = ({ onNext, onSkip }) => {
  const steps = [
    { title: 'National ID', sub: 'Front and back photo of your NID card', icon: 'file' },
    { title: 'Face Verification', sub: 'Live photos to confirm your identity', icon: 'user' },
    { title: 'Skill Selection', sub: 'Tell us what you can do best', icon: 'star' },
  ];
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: T.color.navyBg }}>
      <AppBarElevated title="Worker Verification" />
      <div style={{ flex: 1, padding: 24, display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div style={{ textAlign: 'center', marginTop: 12 }}>
          <div style={{ 
            width: 80, height: 80, borderRadius: 40, background: 'rgba(212,175,55,0.1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px',
            border: `1.5px solid ${T.color.gold500}`
          }}>
            <Icon name="shield" size={40} color={T.color.gold500} />
          </div>
          <Txt variant="headline" style={{ marginBottom: 8 }}>Get Verified</Txt>
          <Txt variant="body" color={T.color.textSecondary}>Complete these steps to start receiving high-value jobs and daily payments.</Txt>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 12 }}>
          {steps.map((s, i) => (
            <div key={i} style={{ 
              display: 'flex', gap: 16, alignItems: 'center', padding: 16, 
              background: T.color.navyDeep, borderRadius: T.radius.l, border: `1px solid ${T.color.navyBorder}`
            }}>
              <div style={{ 
                width: 44, height: 44, borderRadius: 22, background: 'rgba(212,175,55,0.06)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none'
              }}>
                <Icon name={s.icon} size={22} color={T.color.gold500} />
              </div>
              <div style={{ flex: 1 }}>
                <Txt variant="body" style={{ fontWeight: 600 }}>{s.title}</Txt>
                <Txt variant="caption" color={T.color.textMuted}>{s.sub}</Txt>
              </div>
              <Icon name="chevron" size={16} color={T.color.navyBorder} />
            </div>
          ))}
        </div>

        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Banner variant="info" style={{ marginBottom: 10 }}>Your data is encrypted and only used for identity verification.</Banner>
          <PrimaryButton onClick={onNext}>Start Verification</PrimaryButton>
          <SecondaryButton onClick={onSkip}>Skip for now</SecondaryButton>
        </div>
      </div>
    </div>
  );
};

// ── Profile edit ─────────────────────────────────────────────
const ProfileEditScreen = ({ onBack, onSave }) => {
  const [name, setName] = useState('Karim Ahmed');
  const [email, setEmail] = useState('karim@example.com');
  const [lang, setLang] = useState('English');
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: T.color.navyBg }}>
      <AppBarElevated title="Edit Profile" left={<BackButton onClick={onBack} />} />
      <div style={{ flex: 1, padding: 16, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{
            width: 72, height: 72, borderRadius: 36,
            background: T.color.navyDeep, border: `2px solid ${T.color.gold500}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: T.fontSans, fontSize: 24, fontWeight: 700, color: T.color.gold500,
          }}>KA</div>
          <SecondaryButton icon="image" style={{ width: 'auto' }}>Change photo</SecondaryButton>
        </div>
        <TextField label="Full name" value={name} onChange={setName} />
        <TextField label="Email (optional)" value={email} onChange={setEmail} />
        <div>
          <Txt variant="bodySm" color={T.color.gold500} style={{ fontWeight: 500, marginBottom: 8 }}>Language preference</Txt>
          <div style={{ display: 'flex', gap: 8 }}>
            {['Bangla', 'English'].map(l => (
              <button key={l} onClick={() => setLang(l)}
                style={{
                  flex: 1, minHeight: 44, border: `1px solid ${lang === l ? T.color.gold500 : T.color.navyBorder}`,
                  background: lang === l ? 'rgba(212,175,55,0.10)' : 'transparent',
                  color: T.color.gold500, borderRadius: T.radius.m, fontFamily: T.fontSans,
                  fontSize: 14, fontWeight: 500, cursor: 'pointer',
                }}>{l}</button>
            ))}
          </div>
        </div>
        <div>
          <Txt variant="bodySm" color={T.color.gold500} style={{ fontWeight: 500, marginBottom: 6 }}>Timezone</Txt>
          <div style={{
            padding: 14, background: T.color.navyRaised, borderRadius: T.radius.m,
            border: `1px solid ${T.color.navyBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <Txt variant="body">Asia/Dhaka (GMT+6:00)</Txt>
            <Icon name="chevronDown" size={18} color={T.color.textMuted} />
          </div>
        </div>

      </div>
    </div>
  );
};

// ── Progress bar for verification steps ─────────────────────
const StepProgress = ({ step, total = 3 }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
    <Txt variant="caption" color={T.color.textMuted} style={{ letterSpacing: 0 }}>Step {step} of {total}</Txt>
    <div style={{ flex: 1, height: 4, background: T.color.navyBorder, borderRadius: 2, overflow: 'hidden' }}>
      <div style={{ width: `${(step / total) * 100}%`, height: '100%', background: T.color.gold500 }} />
    </div>
  </div>
);

// ── NID upload ───────────────────────────────────────────────
const NidUploadScreen = ({ onBack, onNext, onSkip }) => {
  const [front, setFront] = useState(false);
  const [back, setBack] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  if (showPopup) return (
    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: T.color.navyBg, padding: 24 }}>
      <Card style={{ textAlign: 'center', padding: 32 }}>
        <Icon name="checkCircle" size={64} color={T.color.success} style={{ marginBottom: 16 }} />
        <Txt variant="title" style={{ marginBottom: 8 }}>Documents Received!</Txt>
        <Txt variant="bodySm" color={T.color.textSecondary} style={{ marginBottom: 24 }}>
          We've received your NID. Our team will verify it within 24 hours.
        </Txt>
        <PrimaryButton onClick={onNext}>Continue to face verification</PrimaryButton>
      </Card>
    </div>
  );

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: T.color.navyBg }}>
      <AppBarElevated title="Upload NID" left={<BackButton onClick={onBack} />} />
      <div style={{ flex: 1, padding: 16, display: 'flex', flexDirection: 'column', gap: 16, overflow: 'auto' }}>
        <div style={{ height: 8 }} />
        <div>
          <Txt variant="subtitle" style={{ marginBottom: 4 }}>Upload a clear photo of your NID</Txt>
          <Txt variant="bodySm" color={T.color.textSecondary}>National ID card — both sides required.</Txt>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          {[
            { k: 'front', label: 'Front side', filled: front, set: setFront },
            { k: 'back', label: 'Back side', filled: back, set: setBack },
          ].map(s => (
            <button key={s.k} onClick={() => s.set(true)}
              style={{
                flex: 1, aspectRatio: '3/4', border: `1.5px dashed ${s.filled ? T.color.gold500 : T.color.navyBorder}`,
                background: s.filled ? 'rgba(212,175,55,0.06)' : T.color.navyRaised,
                borderRadius: T.radius.l, cursor: 'pointer',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8,
              }}>
              {s.filled ? (
                <div style={{ width: '100%', height: '100%', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                  <Icon name="checkCircle" size={32} color={T.color.success} />
                  <Txt variant="bodySm" color={T.color.gold500}>{s.label}</Txt>
                  <Txt variant="caption" color={T.color.textMuted} style={{ letterSpacing: 0 }}>nid_{s.k}.jpg</Txt>
                  <div style={{ 
                    position: 'absolute', bottom: 12, left: '50%', transform: 'translateX(-50%)',
                    padding: '4px 12px', background: 'rgba(212,175,55,0.2)', borderRadius: 12,
                    border: `1px solid ${T.color.gold500}`, color: T.color.gold500, fontSize: 10, fontWeight: 600
                  }} onClick={(e) => { e.stopPropagation(); s.set(false); }}>UPDATE</div>
                </div>
              ) : (
                <>
                  <Icon name="camera" size={28} color={T.color.gold500} />
                  <Txt variant="bodySm" color={T.color.gold500}>{s.label}</Txt>
                  <Txt variant="caption" color={T.color.textMuted} style={{ letterSpacing: 0 }}>Tap to add</Txt>
                </>
              )}
            </button>
          ))}
        </div>
        <Banner variant="info">Accepts JPG, PNG, PDF — max 5 MB per file.</Banner>
        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <PrimaryButton onClick={() => setShowPopup(true)} disabled={!front || !back}>Submit NID</PrimaryButton>
          <SecondaryButton onClick={onSkip}>Skip for later</SecondaryButton>
        </div>
      </div>
    </div>
  );
};

// ── Facial capture ───────────────────────────────────────────
const FacialCaptureScreen = ({ onBack, onNext }) => {
  const [captured, setCaptured] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const poses = ['Look straight at camera', 'Turn head slightly left', 'Turn head slightly right'];

  if (showPopup) return (
    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: T.color.navyBg, padding: 24 }}>
      <Card style={{ textAlign: 'center', padding: 32 }}>
        <Icon name="checkCircle" size={64} color={T.color.success} style={{ marginBottom: 16 }} />
        <Txt variant="title" style={{ marginBottom: 8 }}>Verification Complete!</Txt>
        <Txt variant="bodySm" color={T.color.textSecondary} style={{ marginBottom: 24 }}>
          Your identity verification is being reviewed. You can now access worker features.
        </Txt>
        <PrimaryButton onClick={onNext}>Go to dashboard</PrimaryButton>
      </Card>
    </div>
  );

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: T.color.navyBg }}>
      {/* Top bar */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '12px 16px', color: '#fff',
      }}>
        <IconButton name="close" onClick={onBack} color="#fff" />
        <Txt variant="caption" color="#fff" style={{ letterSpacing: 0 }}>
          Verification · Photo {Math.min(captured + 1, 3)}/3
        </Txt>
        <div style={{ width: 48 }} />
      </div>

      {/* Camera view */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 24 }}>
        <div style={{
          width: 240, height: 300, borderRadius: '50%',
          border: `3px solid ${T.color.gold500}`,
          background: 'radial-gradient(circle, rgba(30,40,60,0.6), rgba(0,0,0,0.8))',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon name="user" size={96} color="rgba(212,175,55,0.2)" />
        </div>
        <div style={{ textAlign: 'center', padding: '0 24px' }}>
          <Txt variant="body" color={T.color.gold500} style={{ fontWeight: 600 }}>
            {captured < 3 ? poses[captured] : 'All photos captured ✓'}
          </Txt>
          <Txt variant="caption" color="rgba(255,255,255,0.5)" style={{ letterSpacing: 0, marginTop: 4 }}>
            Gallery is disabled — camera only
          </Txt>
        </div>
      </div>

      {/* Thumbnails */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 10, padding: 16 }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{
            width: 48, height: 48, borderRadius: T.radius.s,
            background: i < captured ? T.color.gold500 : 'rgba(255,255,255,0.08)',
            border: `1px solid ${i === captured ? T.color.gold500 : 'rgba(255,255,255,0.2)'}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: i < captured ? T.color.textOnGold : '#fff',
            fontFamily: T.fontSans, fontSize: 14, fontWeight: 600,
          }}>{i < captured ? '✓' : i + 1}</div>
        ))}
      </div>

      {/* Capture button */}
      <div style={{ padding: 16, display: 'flex', justifyContent: 'center' }}>
        {captured < 3 ? (
          <button onClick={() => setCaptured(c => c + 1)}
            style={{
              width: 72, height: 72, borderRadius: 36, border: `4px solid ${T.color.gold500}`,
              background: '#fff', cursor: 'pointer',
            }} />
        ) : (
          <PrimaryButton onClick={() => setShowPopup(true)} style={{ maxWidth: 320 }}>Complete</PrimaryButton>
        )}
      </div>
    </div>
  );
};

// ── Mode toggle (on profile) ─────────────────────────────────
const ModeToggleScreen = ({ mode, onBack, onSwitch }) => {
  const isWorker = mode === 'worker';
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: T.color.navyBg }}>
      <AppBarElevated title="Profile" left={<BackButton onClick={onBack} />} />
      <div style={{ flex: 1, padding: 16, display: 'flex', flexDirection: 'column', gap: 16, overflow: 'auto' }}>
        <Txt variant="caption" color={T.color.textMuted} style={{ letterSpacing: '2%' }}>ACTIVE MODE</Txt>
        <Segmented
          options={[{ value: 'employer', label: 'Employer' }, { value: 'worker', label: 'Worker' }]}
          value={mode} onChange={onSwitch} />
        <Txt variant="bodySm" color={T.color.textSecondary}>
          {isWorker ? "You're ready to bid on jobs and earn." : "You're currently posting jobs. Switch to Worker mode to receive job notifications and place bids."}
        </Txt>
        <Banner variant="info">
          Worker mode requires identity verification. Your verification is approved ✓
        </Banner>
        <div style={{ marginTop: 'auto' }}>
          <PrimaryButton onClick={() => onSwitch(isWorker ? 'employer' : 'worker')}>
            Switch to {isWorker ? 'Employer' : 'Worker'} mode
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

// ── Skill declaration ────────────────────────────────────────
const SkillDeclarationScreen = ({ onBack, onSave }) => {
  const [selected, setSelected] = useState(new Set(['Bike delivery', 'General handyman']));
  const [search, setSearch] = useState('');
  const [free, setFree] = useState('');
  const toggle = s => {
    const n = new Set(selected);
    if (n.has(s)) n.delete(s); else n.add(s);
    setSelected(n);
  };
  const sections = [
    { title: 'Popular right now', items: SAMPLE.skills.popular },
    { title: 'Transport & Delivery', items: SAMPLE.skills.transport },
    { title: 'Handyman', items: SAMPLE.skills.handyman },
  ];
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: T.color.navyBg }}>
      <AppBarElevated title="Declare Skills" left={<BackButton onClick={onBack} />} />
      <div style={{ flex: 1, padding: 16, display: 'flex', flexDirection: 'column', gap: 16, overflow: 'auto' }}>
        <div>
          <Txt variant="subtitle" style={{ marginBottom: 4 }}>Add what you can do</Txt>
          <Txt variant="bodySm" color={T.color.textSecondary}>
            Describe in your own words — Bangla, Banglish or English all work.
          </Txt>
        </div>
        <TextField placeholder="e.g. Bike riding for delivery" value={free} onChange={setFree}
          suffix={<IconButton name="plus" size={32} iconSize={18} color={T.color.gold500} />} />
        {sections.map(sec => (
          <div key={sec.title}>
            <Txt variant="caption" color={T.color.textMuted} style={{ marginBottom: 8 }}>{sec.title.toUpperCase()}</Txt>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {sec.items.filter(i => i.toLowerCase().includes(search.toLowerCase())).map(s => (
                <Checkbox key={s} checked={selected.has(s)} label={s} onClick={() => toggle(s)} />
              ))}
            </div>
          </div>
        ))}
        {selected.size > 0 && (
          <Card style={{ background: T.color.navyDeep }}>
            <Txt variant="caption" color={T.color.textMuted} style={{ marginBottom: 8 }}>
              YOUR SKILLS ({selected.size} SELECTED)
            </Txt>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {[...selected].map(s => <CapabilityTag key={s} onRemove={() => toggle(s)}>{s}</CapabilityTag>)}
            </div>
          </Card>
        )}
        <div style={{ marginTop: 8 }}>
          <PrimaryButton onClick={onSave} disabled={selected.size === 0}>Save skills</PrimaryButton>
        </div>
      </div>
    </div>
  );
};

// ── Asset declaration ────────────────────────────────────────
const AssetDeclarationScreen = ({ onBack, onSave }) => {
  const [assets, setAssets] = useState([
    { id: 1, name: 'Hero Honda 150cc', type: 'Motorbike', isPrimary: true },
  ]);
  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState('');
  const [newType, setNewType] = useState('Bicycle');

  const addAsset = () => {
    if (!newName) return;
    setAssets([...assets, { id: Date.now(), name: newName, type: newType, isPrimary: false }]);
    setNewName('');
    setIsAdding(false);
  };

  const setPrimary = (id) => {
    setAssets(assets.map(a => ({ ...a, isPrimary: a.id === id })));
  };

  const removeAsset = (id) => {
    setAssets(assets.filter(a => a.id !== id));
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: T.color.navyBg }}>
      <AppBarElevated title="My Assets" left={<BackButton onClick={onBack} />} />
      <div style={{ flex: 1, padding: 16, display: 'flex', flexDirection: 'column', gap: 16, overflow: 'auto' }}>
        <Txt variant="caption" color={T.color.textMuted}>YOUR ASSETS</Txt>
        
        {assets.map(a => (
          <Card key={a.id} style={{ border: a.isPrimary ? `1.5px solid ${T.color.gold500}` : undefined }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: 20, background: T.color.navyDeep, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon name={a.type === 'Motorbike' ? 'truck' : 'globe'} size={20} color={T.color.gold500} />
                </div>
                <div>
                  <Txt variant="bodySm" style={{ fontWeight: 600 }}>{a.name}</Txt>
                  <Txt variant="caption" color={T.color.textMuted}>{a.type}</Txt>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {a.isPrimary ? (
                  <StatusPill variant="success">Primary</StatusPill>
                ) : (
                  <button onClick={() => setPrimary(a.id)} style={{ background: 'none', border: 'none', color: T.color.gold500, fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Set Primary</button>
                )}
                <IconButton name="x" size={32} iconSize={16} onClick={() => removeAsset(a.id)} />
              </div>
            </div>
          </Card>
        ))}

        {isAdding ? (
          <Card style={{ background: T.color.navyDeep, border: `1px dashed ${T.color.gold500}` }}>
            <Txt variant="bodySm" style={{ fontWeight: 600, marginBottom: 12 }}>Add New Asset</Txt>
            <TextField label="Asset name" placeholder="e.g. Yamaha FZ" value={newName} onChange={setNewName} />
            <div style={{ marginTop: 12 }}>
              <Txt variant="caption" color={T.color.textMuted} style={{ marginBottom: 6, display: 'block' }}>TYPE</Txt>
              <select 
                value={newType} 
                onChange={e => setNewType(e.target.value)}
                style={{ width: '100%', height: 44, background: T.color.navyRaised, border: `1px solid ${T.color.navyBorder}`, borderRadius: T.radius.m, color: '#fff', padding: '0 10px', outline: 'none' }}
              >
                <option>Motorbike</option>
                <option>Bicycle</option>
                <option>Car</option>
                <option>Van/Truck</option>
                <option>Other Tools</option>
              </select>
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
              <SecondaryButton style={{ flex: 1 }} onClick={() => setIsAdding(false)}>Cancel</SecondaryButton>
              <PrimaryButton style={{ flex: 1 }} onClick={addAsset}>Add</PrimaryButton>
            </div>
          </Card>
        ) : (
          <SecondaryButton icon="plus" onClick={() => setIsAdding(true)}>Add another asset</SecondaryButton>
        )}

        <div style={{ marginTop: 'auto', paddingBottom: 20 }}>
          <PrimaryButton onClick={() => onSave(assets)}>Save & Continue</PrimaryButton>
        </div>
      </div>
    </div>
  );
};

// ── Language preference ──────────────────────────────────────
const LanguagePreferenceScreen = ({ onBack, onSave }) => {
  const [lang, setLang] = useState('English');
  const [sameNotif, setSameNotif] = useState(true);
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: T.color.navyBg }}>
      <AppBarElevated title="Language" left={<BackButton onClick={onBack} />} />
      <div style={{ flex: 1, padding: 16, display: 'flex', flexDirection: 'column', gap: 18, overflow: 'auto' }}>
        <div>
          <Txt variant="caption" color={T.color.textMuted} style={{ marginBottom: 10 }}>INTERFACE LANGUAGE</Txt>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {['Bangla', 'English'].map(l => (
              <Radio key={l} checked={lang === l} label={l} onClick={() => setLang(l)} />
            ))}
          </div>
        </div>
        <Card style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ flex: 1 }}>
            <Txt variant="body" style={{ fontWeight: 500 }}>Use same language for notifications</Txt>
            <Txt variant="caption" color={T.color.textMuted} style={{ letterSpacing: 0, marginTop: 2 }}>
              Push and SMS will match
            </Txt>
          </div>
          <Toggle checked={sameNotif} onChange={setSameNotif} />
        </Card>
        <div>
          <Txt variant="caption" color={T.color.textMuted} style={{ marginBottom: 6 }}>SEND ME NOTIFICATIONS AT</Txt>
          <div style={{
            padding: 14, background: T.color.navyRaised, borderRadius: T.radius.m,
            border: `1px solid ${T.color.navyBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <Txt variant="body">10:00 AM (Asia/Dhaka)</Txt>
            <Icon name="chevronDown" size={18} color={T.color.textMuted} />
          </div>
        </div>
        <div style={{ height: 40 }} />
      </div>
    </div>
  );
};

Object.assign(window, {
  WorkerOnboardingIntroScreen,
  ProfileEditScreen, NidUploadScreen, FacialCaptureScreen,
  ModeToggleScreen,
  SkillDeclarationScreen, AssetDeclarationScreen, LanguagePreferenceScreen,
});
