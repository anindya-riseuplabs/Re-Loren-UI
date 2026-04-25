// Re'Loren v2 — worker onboarding, verification, skill/asset declaration.

// ── Profile edit ─────────────────────────────────────────────
const ProfileEditScreen = ({ onBack, onSave }) => {
  const [name, setName] = useState('Karim Ahmed');
  const [email, setEmail] = useState('karim@example.com');
  const [lang, setLang] = useState('Banglish');
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
            {['Bangla', 'Banglish', 'English'].map(l => (
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
        <div style={{ marginTop: 8 }}>
          <PrimaryButton onClick={onSave}>Save changes</PrimaryButton>
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
const NidUploadScreen = ({ onBack, onNext }) => {
  const [front, setFront] = useState(false);
  const [back, setBack] = useState(false);
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: T.color.navyBg }}>
      <AppBarElevated title="Upload NID" left={<BackButton onClick={onBack} />} />
      <div style={{ flex: 1, padding: 16, display: 'flex', flexDirection: 'column', gap: 16, overflow: 'auto' }}>
        <StepProgress step={1} />
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
                <>
                  <Icon name="checkCircle" size={32} color={T.color.success} />
                  <Txt variant="bodySm" color={T.color.gold500}>{s.label}</Txt>
                  <Txt variant="caption" color={T.color.textMuted} style={{ letterSpacing: 0 }}>nid_{s.k}.jpg</Txt>
                </>
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
          <PrimaryButton onClick={onNext} disabled={!front || !back}>Continue</PrimaryButton>
          <SecondaryButton onClick={onBack}>Skip for later</SecondaryButton>
        </div>
      </div>
    </div>
  );
};

// ── Facial capture ───────────────────────────────────────────
const FacialCaptureScreen = ({ onBack, onNext }) => {
  const [captured, setCaptured] = useState(0);
  const poses = ['Look straight at camera', 'Turn head slightly left', 'Turn head slightly right'];
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#000' }}>
      {/* Top bar */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '12px 16px', color: '#fff',
      }}>
        <IconButton name="close" onClick={onBack} color="#fff" />
        <Txt variant="caption" color="#fff" style={{ letterSpacing: 0 }}>
          Step 2 of 3 · Photo {Math.min(captured + 1, 3)}/3
        </Txt>
        <div style={{ width: 48 }} />
      </div>

      {/* Camera view */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <div style={{
          width: 240, height: 300, borderRadius: '50%',
          border: `3px solid ${T.color.gold500}`,
          background: 'radial-gradient(circle, rgba(30,40,60,0.6), rgba(0,0,0,0.8))',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon name="user" size={96} color="rgba(212,175,55,0.2)" />
        </div>
        <div style={{ position: 'absolute', bottom: 16, left: 16, right: 16, textAlign: 'center' }}>
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
          <PrimaryButton onClick={onNext} style={{ maxWidth: 320 }}>Continue</PrimaryButton>
        )}
      </div>
    </div>
  );
};

// ── Cert upload ──────────────────────────────────────────────
const CertUploadScreen = ({ onBack, onNext, onSkip }) => {
  const [type, setType] = useState('Driving License');
  const [file, setFile] = useState(false);
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: T.color.navyBg }}>
      <AppBarElevated title="Certificates (optional)" left={<BackButton onClick={onBack} />} />
      <div style={{ flex: 1, padding: 16, display: 'flex', flexDirection: 'column', gap: 16, overflow: 'auto' }}>
        <StepProgress step={3} />
        <div>
          <Txt variant="subtitle" style={{ marginBottom: 4 }}>Add any skill certificates you hold.</Txt>
          <Txt variant="bodySm" color={T.color.textSecondary}>This can help you match higher-value jobs.</Txt>
        </div>
        <div>
          <Txt variant="bodySm" color={T.color.gold500} style={{ fontWeight: 500, marginBottom: 6 }}>Certificate type</Txt>
          <div style={{
            padding: 14, background: T.color.navyRaised, borderRadius: T.radius.m,
            border: `1px solid ${T.color.navyBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <Txt variant="body">{type}</Txt>
            <Icon name="chevronDown" size={18} color={T.color.textMuted} />
          </div>
        </div>
        <button onClick={() => setFile(true)}
          style={{
            aspectRatio: '2/1', border: `1.5px dashed ${file ? T.color.gold500 : T.color.navyBorder}`,
            background: file ? 'rgba(212,175,55,0.06)' : T.color.navyRaised,
            borderRadius: T.radius.l, cursor: 'pointer',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}>
          {file ? (
            <>
              <Icon name="file" size={32} color={T.color.gold500} />
              <Txt variant="bodySm" color={T.color.gold500}>driving_license.pdf</Txt>
              <Txt variant="caption" color={T.color.textMuted} style={{ letterSpacing: 0 }}>2.4 MB</Txt>
            </>
          ) : (
            <>
              <Icon name="upload" size={28} color={T.color.gold500} />
              <Txt variant="bodySm" color={T.color.gold500}>Tap to add file</Txt>
            </>
          )}
        </button>
        <Txt variant="caption" color={T.color.textMuted} style={{ letterSpacing: 0, textAlign: 'center' }}>
          Accepts JPG, PNG, PDF — max 10 MB
        </Txt>
        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <PrimaryButton onClick={onNext}>Submit for review</PrimaryButton>
          <SecondaryButton onClick={onSkip}>Skip — I don't have one</SecondaryButton>
        </div>
      </div>
    </div>
  );
};

// ── Verification status screens ──────────────────────────────
const VerificationStatusPendingScreen = ({ onBack, onNav }) => (
  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: T.color.navyBg }}>
    <AppBarElevated title="Verification Status" left={<BackButton onClick={onBack} />} />
    <div style={{ flex: 1, padding: 16, display: 'flex', flexDirection: 'column', gap: 16, overflow: 'auto' }}>
      <Banner variant="warning" title="Review in progress">
        Our team usually responds within 24 hours.
      </Banner>
      <div>
        <StatusPill variant="pending">Pending review</StatusPill>
      </div>
      <Card>
        <Txt variant="caption" color={T.color.textMuted} style={{ letterSpacing: 0, marginBottom: 4 }}>SUBMITTED</Txt>
        <Txt variant="body" style={{ marginBottom: 12 }}>24/04/2026 · 10:12 AM</Txt>
        <Txt variant="caption" color={T.color.textMuted} style={{ letterSpacing: 0, marginBottom: 4 }}>EXPECTED DECISION</Txt>
        <Txt variant="body">By 25/04/2026 · 10:12 AM</Txt>
      </Card>
      <Card>
        <Txt variant="bodySm" style={{ fontWeight: 600, marginBottom: 10 }}>Documents received</Txt>
        {['NID (front + back)', '3 facial photos', 'Driving License'].map(d => (
          <div key={d} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <Icon name="checkCircle" size={16} color={T.color.success} />
            <Txt variant="bodySm" color={T.color.textPrimary}>{d}</Txt>
          </div>
        ))}
      </Card>
      <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <SecondaryButton onClick={() => onNav && onNav('approved')}>View my profile</SecondaryButton>
        <button style={{
          background: 'none', border: 'none', color: T.color.gold500,
          fontFamily: T.fontSans, fontSize: 14, cursor: 'pointer', padding: 12,
        }}>Contact support</button>
      </div>
    </div>
  </div>
);

const VerificationStatusApprovedScreen = ({ onBack, onActivate }) => (
  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: T.color.navyBg }}>
    <AppBarElevated title="Verification Status" left={<BackButton onClick={onBack} />} />
    <div style={{ flex: 1, padding: 16, display: 'flex', flexDirection: 'column', gap: 16, overflow: 'auto' }}>
      <Banner variant="success" title="You're verified">
        You can now declare skills and accept jobs.
      </Banner>
      <div><VerifiedBadge label="Identity verified" /></div>
      <Card>
        <Txt variant="caption" color={T.color.textMuted} style={{ letterSpacing: 0, marginBottom: 4 }}>APPROVED</Txt>
        <Txt variant="body">25/04/2026 · 9:04 AM</Txt>
      </Card>
      <Card>
        <Txt variant="bodySm" style={{ fontWeight: 600, marginBottom: 10 }}>Next steps</Txt>
        {['Declare your skills', 'List your assets (optional)', 'Start receiving jobs'].map((d, i) => (
          <div key={d} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <div style={{
              width: 22, height: 22, borderRadius: 11, background: T.color.gold500,
              color: T.color.textOnGold, fontFamily: T.fontSans, fontSize: 12, fontWeight: 700,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>{i + 1}</div>
            <Txt variant="bodySm">{d}</Txt>
          </div>
        ))}
      </Card>
      <div style={{ marginTop: 'auto' }}>
        <PrimaryButton onClick={onActivate}>Activate Worker mode</PrimaryButton>
      </div>
    </div>
  </div>
);

const VerificationStatusRejectedScreen = ({ onBack, onResubmit }) => (
  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: T.color.navyBg }}>
    <AppBarElevated title="Verification Status" left={<BackButton onClick={onBack} />} />
    <div style={{ flex: 1, padding: 16, display: 'flex', flexDirection: 'column', gap: 16, overflow: 'auto' }}>
      <Banner variant="error" title="Review didn't pass">
        Reason: NID photo was too blurry to read.
      </Banner>
      <Card>
        <Txt variant="bodySm" style={{ fontWeight: 600, marginBottom: 10 }}>What to do next</Txt>
        {[
          'Retake your NID photo in good light',
          'Make sure all four corners are visible',
          'Submit again for review',
        ].map(d => (
          <div key={d} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 8 }}>
            <div style={{ width: 4, height: 4, borderRadius: 2, background: T.color.gold500, marginTop: 8 }} />
            <Txt variant="bodySm">{d}</Txt>
          </div>
        ))}
      </Card>
      <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <PrimaryButton onClick={onResubmit}>Re-submit documents</PrimaryButton>
        <SecondaryButton>Contact support</SecondaryButton>
      </div>
    </div>
  </div>
);

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
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ flex: 1, height: 1, background: T.color.navyBorder }} />
          <Txt variant="caption" color={T.color.textMuted} style={{ letterSpacing: 0 }}>OR</Txt>
          <div style={{ flex: 1, height: 1, background: T.color.navyBorder }} />
        </div>
        <TextField placeholder="Search skills…" value={search} onChange={setSearch}
          prefix={<Icon name="search" size={18} color={T.color.textMuted} />} />
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
  const catalog = ['Motorbike', 'Bicycle', 'Car', 'Delivery bag', 'Toolkit', 'Rooms to rent'];
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: T.color.navyBg }}>
      <AppBarElevated title="My Assets" left={<BackButton onClick={onBack} />} />
      <div style={{ flex: 1, padding: 16, display: 'flex', flexDirection: 'column', gap: 16, overflow: 'auto' }}>
        <div>
          <Txt variant="caption" color={T.color.textMuted}>PICK FROM CATALOG</Txt>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>
            {catalog.map(c => <CapabilityTag key={c}>{c}</CapabilityTag>)}
          </div>
        </div>
        <div>
          <Txt variant="caption" color={T.color.textMuted} style={{ marginBottom: 8 }}>MY ASSETS</Txt>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {SAMPLE.assets.map(a => (
              <Card key={a.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                  <Txt variant="bodySm" style={{ fontWeight: 600 }}>{a.name}</Txt>
                  {a.verified ? <VerifiedBadge /> : <StatusPill variant="pending">Pending</StatusPill>}
                </div>
                <Txt variant="caption" color={T.color.textSecondary} style={{ letterSpacing: 0 }}>{a.sub}</Txt>
              </Card>
            ))}
          </div>
        </div>
        <SecondaryButton icon="plus">Add custom asset</SecondaryButton>
        <div style={{ marginTop: 'auto' }}>
          <PrimaryButton onClick={onSave}>Submit for verification</PrimaryButton>
        </div>
      </div>
    </div>
  );
};

// ── Language preference ──────────────────────────────────────
const LanguagePreferenceScreen = ({ onBack, onSave }) => {
  const [lang, setLang] = useState('Banglish');
  const [sameNotif, setSameNotif] = useState(true);
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: T.color.navyBg }}>
      <AppBarElevated title="Language" left={<BackButton onClick={onBack} />} />
      <div style={{ flex: 1, padding: 16, display: 'flex', flexDirection: 'column', gap: 18, overflow: 'auto' }}>
        <div>
          <Txt variant="caption" color={T.color.textMuted} style={{ marginBottom: 10 }}>INTERFACE LANGUAGE</Txt>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {['Bangla', 'Banglish', 'English'].map(l => (
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
        <div style={{ marginTop: 'auto' }}>
          <PrimaryButton onClick={onSave}>Save</PrimaryButton>
        </div>
      </div>
    </div>
  );
};

Object.assign(window, {
  ProfileEditScreen, NidUploadScreen, FacialCaptureScreen, CertUploadScreen,
  VerificationStatusPendingScreen, VerificationStatusApprovedScreen, VerificationStatusRejectedScreen,
  ModeToggleScreen,
  SkillDeclarationScreen, AssetDeclarationScreen, LanguagePreferenceScreen,
});
