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

// ── Profile edit (account section, not verification flow) ───
const ProfileEditScreen = ({ onBack, onSave }) => {
  const [name, setName] = useState('Karim Ahmed');
  const [phone, setPhone] = useState('1711-234567');
  const [email, setEmail] = useState('karim@example.com');
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
        <PhoneNumberField label="Phone number" value={phone} onChange={setPhone} />
        <TextField label="Email (optional)" value={email} onChange={setEmail} />
        <div style={{ marginTop: 'auto' }}>
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
const SkillDeclarationScreen = ({ onBack, onSave, onDeclareAssets }) => {
  const [selected, setSelected] = useState(new Set(['Bike delivery']));
  const [search, setSearch] = useState('');
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [assetPromptOpen, setAssetPromptOpen] = useState(false);

  const toggle = s => {
    const n = new Set(selected);
    if (n.has(s)) n.delete(s); else n.add(s);
    setSelected(n);
  };

  const allItems = [...SAMPLE.skills.popular, ...SAMPLE.skills.transport, ...SAMPLE.skills.handyman];
  const q = search.trim();
  const available = allItems.filter(s => !selected.has(s));
  const filtered = q ? available.filter(i => i.toLowerCase().includes(q.toLowerCase())) : available;
  const exactMatch = q && allItems.some(i => i.toLowerCase() === q.toLowerCase());
  const showAddCustom = q && !exactMatch;

  const addSkill = (s) => {
    const n = new Set(selected);
    n.add(s.trim());
    setSelected(n);
    setSearch('');
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: T.color.navyBg }}>
      <AppBarElevated title="Declare Skills" left={<BackButton onClick={onBack} />} />
      <div style={{ flex: 1, padding: 16, display: 'flex', flexDirection: 'column', gap: 14, overflow: 'auto' }}>
        <div>
          <Txt variant="subtitle" style={{ marginBottom: 4 }}>Add what you can do</Txt>
          <Txt variant="bodySm" color={T.color.textSecondary}>
            Search the list, or add a custom skill if not found.
          </Txt>
        </div>

        <input value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder="Search or type a skill..."
          style={{
            width: '100%', minHeight: 48, background: T.color.navyRaised,
            border: `1.5px solid ${T.color.navyBorder}`, borderRadius: T.radius.m,
            color: T.color.textPrimary, padding: '0 14px', fontFamily: T.fontSans, fontSize: 15,
            outline: 'none',
          }} />

        <div style={{
          display: 'flex', flexDirection: 'column', gap: 6, maxHeight: 220, overflow: 'auto',
          border: `1px solid ${T.color.navyBorder}`, borderRadius: T.radius.m,
          background: T.color.navyDeep, padding: 6,
        }}>
          {filtered.length === 0 && !showAddCustom && (
            <Txt variant="caption" color={T.color.textMuted} style={{ padding: 14, letterSpacing: 0, textAlign: 'center' }}>
              All matching skills already added.
            </Txt>
          )}
          {filtered.map(s => (
            <button key={s} onClick={() => addSkill(s)} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '12px 14px', background: 'transparent', border: 'none', cursor: 'pointer',
              color: T.color.textPrimary, fontFamily: T.fontSans, fontSize: 14, textAlign: 'left',
              borderRadius: T.radius.s,
            }}>
              <span>{s}</span>
              <Icon name="plus" size={16} color={T.color.gold500} />
            </button>
          ))}
          {showAddCustom && (
            <button onClick={() => addSkill(q)} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '12px 14px', margin: 4,
              background: 'rgba(212,175,55,0.08)', border: `1.5px dashed ${T.color.gold500}`,
              borderRadius: T.radius.s, cursor: 'pointer',
              color: T.color.gold500, fontFamily: T.fontSans, fontSize: 14, fontWeight: 600,
              textAlign: 'left',
            }}>
              <Icon name="plus" size={16} color={T.color.gold500} />
              Add skill: "{q}"
            </button>
          )}
        </div>

        {selected.size > 0 && (
          <Card style={{ background: T.color.navyDeep }}>
            <Txt variant="caption" color={T.color.textMuted} style={{ marginBottom: 8 }}>
              YOUR SKILLS ({selected.size} ADDED)
            </Txt>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {[...selected].map(s => <CapabilityTag key={s} onRemove={() => toggle(s)}>{s}</CapabilityTag>)}
            </div>
          </Card>
        )}

        <div style={{ marginTop: 8 }}>
          <PrimaryButton onClick={() => setConfirmOpen(true)} disabled={selected.size === 0}>Save skills</PrimaryButton>
        </div>
      </div>

      {confirmOpen && (
        <BottomSheet onClose={() => setConfirmOpen(false)} title="Confirm your skills">
          <Txt variant="bodySm" color={T.color.textSecondary} style={{ marginBottom: 14 }}>
            You have these skills. Please confirm to proceed further.
          </Txt>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 18 }}>
            {[...selected].map(s => <CapabilityTag key={s} onRemove={() => toggle(s)}>{s}</CapabilityTag>)}
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <SecondaryButton style={{ flex: 1 }} onClick={() => setConfirmOpen(false)}>Update</SecondaryButton>
            <PrimaryButton style={{ flex: 1 }} onClick={() => { setConfirmOpen(false); setAssetPromptOpen(true); }}>Confirm</PrimaryButton>
          </div>
        </BottomSheet>
      )}

      {assetPromptOpen && (
        <Dialog
          onClose={() => setAssetPromptOpen(false)}
          title="Declare your assets?"
          actions={[
            <SecondaryButton key="skip" onClick={() => { setAssetPromptOpen(false); onSave && onSave([...selected]); }}>Skip for now</SecondaryButton>,
            <PrimaryButton key="add" onClick={() => { setAssetPromptOpen(false); onDeclareAssets ? onDeclareAssets() : onSave && onSave([...selected]); }}>Declare assets</PrimaryButton>,
          ]}>
          <Txt variant="bodySm" color={T.color.textSecondary}>
            Adding assets (motorbike, tools, etc.) helps you match more jobs. You can add them later from your profile.
          </Txt>
        </Dialog>
      )}
    </div>
  );
};

// ── Asset list (declaration entry) ──────────────────────────
const AssetDeclarationScreen = ({ onBack, onSave, onAddAsset, onViewDetails }) => {
  const [assets, setAssets] = useState([
    { id: 1, name: 'Hero Honda 150cc', type: 'Motorbike', description: 'Honda CB 150 · BD-12-3456', pics: 1 },
  ]);
  const [removeTarget, setRemoveTarget] = useState(null);

  const confirmRemove = () => {
    setAssets(assets.filter(a => a.id !== removeTarget.id));
    setRemoveTarget(null);
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: T.color.navyBg }}>
      <AppBarElevated title="My Assets" left={<BackButton onClick={onBack} />} />
      <div style={{ flex: 1, padding: 16, display: 'flex', flexDirection: 'column', gap: 12, overflow: 'auto' }}>
        <Txt variant="caption" color={T.color.textMuted}>YOUR ASSETS</Txt>

        {assets.map(a => (
          <Card key={a.id}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: 20, background: T.color.navyDeep, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon name="truck" size={20} color={T.color.gold500} />
                </div>
                <div>
                  <Txt variant="bodySm" style={{ fontWeight: 600 }}>{a.name}</Txt>
                  <Txt variant="caption" color={T.color.textMuted}>{a.type}</Txt>
                </div>
              </div>
              <IconButton name="x" size={32} iconSize={16} onClick={() => setRemoveTarget(a)} />
            </div>
            <SecondaryButton style={{ minHeight: 36, fontSize: 13 }} onClick={() => onViewDetails && onViewDetails(a)}>View details</SecondaryButton>
          </Card>
        ))}

        <SecondaryButton icon="plus" onClick={onAddAsset}>Add asset</SecondaryButton>

        <div style={{ marginTop: 'auto', paddingBottom: 20 }}>
          <PrimaryButton onClick={() => onSave && onSave(assets)}>Save & Continue</PrimaryButton>
        </div>
      </div>

      {removeTarget && (
        <Dialog
          onClose={() => setRemoveTarget(null)}
          title="Remove this asset?"
          actions={[
            <SecondaryButton key="cancel" onClick={() => setRemoveTarget(null)}>Cancel</SecondaryButton>,
            <DestructiveButton key="confirm" onClick={confirmRemove}>Remove</DestructiveButton>,
          ]}>
          <Txt variant="bodySm" color={T.color.textSecondary}>
            Are you sure you want to remove <span style={{ color: T.color.gold500, fontWeight: 600 }}>{removeTarget.name}</span>? This cannot be undone.
          </Txt>
        </Dialog>
      )}
    </div>
  );
};

// ── Asset detail form (add new) ──────────────────────────────
const AssetDetailFormScreen = ({ onBack, onPreview }) => {
  const [name, setName] = useState('Yamaha FZ');
  const [type, setType] = useState('');
  const [typeQuery, setTypeQuery] = useState('');
  const [showTypeDD, setShowTypeDD] = useState(false);
  const [desc, setDesc] = useState('');
  const [pics, setPics] = useState([]);

  const types = ['Motorbike', 'Bicycle', 'Car', 'Van', 'Truck', 'Pickup', 'Power tools', 'Hand tools', 'Sewing machine', 'Camera'];
  const filteredTypes = typeQuery
    ? types.filter(t => t.toLowerCase().includes(typeQuery.toLowerCase()))
    : types;

  const ok = name && type && desc;

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: T.color.navyBg }}>
      <AppBarElevated title="Add Asset" left={<BackButton onClick={onBack} />} />
      <div style={{ flex: 1, padding: 16, display: 'flex', flexDirection: 'column', gap: 14, overflow: 'auto' }}>
        <TextField label="Asset name" value={name} onChange={setName} placeholder="e.g. Yamaha FZ" />

        <div style={{ position: 'relative' }}>
          <TextField label="Asset type" value={type || typeQuery}
            onChange={(v) => { setType(''); setTypeQuery(v); setShowTypeDD(true); }}
            placeholder="Type or search..."
            suffix={
              <IconButton name="chevronDown" size={32} iconSize={16}
                onClick={() => setShowTypeDD(d => !d)} />
            } />
          {showTypeDD && (
            <div style={{
              position: 'absolute', top: '100%', left: 0, right: 0, marginTop: 4,
              background: T.color.navyDeep, border: `1px solid ${T.color.navyBorder}`,
              borderRadius: T.radius.m, maxHeight: 180, overflow: 'auto', zIndex: 10,
              boxShadow: T.elevation.lg,
            }}>
              {filteredTypes.length === 0 ? (
                <div style={{ padding: 14 }}>
                  <Txt variant="bodySm" color={T.color.textMuted}>
                    No match. Use "{typeQuery}" as custom type.
                  </Txt>
                  <button onClick={() => { setType(typeQuery); setShowTypeDD(false); }} style={{
                    marginTop: 8, background: 'none', border: 'none', color: T.color.gold500,
                    fontFamily: T.fontSans, fontSize: 13, fontWeight: 600, cursor: 'pointer', padding: 0,
                  }}>Use custom →</button>
                </div>
              ) : filteredTypes.map(t => (
                <button key={t} onClick={() => { setType(t); setTypeQuery(''); setShowTypeDD(false); }} style={{
                  display: 'block', width: '100%', textAlign: 'left',
                  padding: 12, background: 'transparent', border: 'none', cursor: 'pointer',
                  color: T.color.textPrimary, fontFamily: T.fontSans, fontSize: 14,
                }}>{t}</button>
              ))}
            </div>
          )}
        </div>

        <TextField label="Description" multiline rows={3} value={desc} onChange={setDesc}
          placeholder="Make, model, registration, condition..." />

        <div>
          <Txt variant="bodySm" color={T.color.gold500} style={{ marginBottom: 6, fontWeight: 500 }}>Pictures</Txt>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {pics.map((_, i) => (
              <div key={i} style={{
                width: 70, height: 70, borderRadius: T.radius.m,
                background: `linear-gradient(135deg, ${T.color.navyDeep}, ${T.color.navyHover})`,
                border: `1px solid ${T.color.gold500}`, position: 'relative',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Icon name="image" size={20} color={T.color.gold500} />
                <button onClick={() => setPics(pics.filter((_, j) => j !== i))} style={{
                  position: 'absolute', top: -6, right: -6, width: 20, height: 20, borderRadius: 10,
                  background: T.color.error, border: 'none', cursor: 'pointer', color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0,
                }}>×</button>
              </div>
            ))}
            <button onClick={() => setPics([...pics, 1])} style={{
              width: 70, height: 70, borderRadius: T.radius.m,
              background: T.color.navyRaised, border: `1.5px dashed ${T.color.navyBorder}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
            }}>
              <Icon name="plus" size={20} color={T.color.gold500} />
            </button>
          </div>
        </div>

        <div style={{ marginTop: 'auto', paddingBottom: 20 }}>
          <PrimaryButton onClick={() => onPreview && onPreview({ name, type, desc, pics: pics.length })} disabled={!ok}>
            Preview asset
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

// ── Asset preview (editable before commit) ──────────────────
const AssetPreviewScreen = ({ asset = { name: 'Yamaha FZ', type: 'Motorbike', desc: 'Black, 2024 model, registered', pics: 2 }, onBack, onEdit, onConfirm }) => (
  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: T.color.navyBg }}>
    <AppBarElevated title="Preview Asset" left={<BackButton onClick={onBack} />} />
    <div style={{ flex: 1, padding: 16, display: 'flex', flexDirection: 'column', gap: 14, overflow: 'auto' }}>
      <Banner variant="info">Review before adding to your assets list. You can edit if needed.</Banner>
      <Card>
        {asset.pics > 0 && (
          <div style={{ display: 'flex', gap: 8, marginBottom: 14, overflowX: 'auto' }}>
            {Array.from({ length: asset.pics }).map((_, i) => (
              <div key={i} style={{
                minWidth: 100, height: 100, borderRadius: T.radius.m, flexShrink: 0,
                background: `linear-gradient(135deg, ${T.color.navyDeep}, ${T.color.navyHover})`,
                border: `1px solid ${T.color.navyBorder}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Icon name="image" size={24} color={T.color.gold500} />
              </div>
            ))}
          </div>
        )}
        <Txt variant="caption" color={T.color.textMuted} style={{ marginBottom: 4 }}>NAME</Txt>
        <Txt variant="subtitle" style={{ marginBottom: 12 }}>{asset.name}</Txt>
        <Txt variant="caption" color={T.color.textMuted} style={{ marginBottom: 4 }}>TYPE</Txt>
        <Txt variant="bodySm" style={{ marginBottom: 12 }}>{asset.type}</Txt>
        <Txt variant="caption" color={T.color.textMuted} style={{ marginBottom: 4 }}>DESCRIPTION</Txt>
        <Txt variant="bodySm">{asset.desc}</Txt>
      </Card>
      <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 10, paddingBottom: 20 }}>
        <PrimaryButton onClick={onConfirm}>Add to my assets</PrimaryButton>
        <SecondaryButton onClick={onEdit}>Edit details</SecondaryButton>
      </div>
    </div>
  </div>
);

// ── Asset added success ─────────────────────────────────────
const AssetAddedSuccessScreen = ({ onContinue, onAddAnother }) => (
  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: T.color.navyBg,
    alignItems: 'center', justifyContent: 'center', padding: 24, gap: 16 }}>
    <div style={{
      width: 96, height: 96, borderRadius: 48, background: 'rgba(102,187,106,0.15)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <Icon name="checkCircle" size={56} color={T.color.success} />
    </div>
    <Txt variant="h2" style={{ textAlign: 'center' }}>Asset added</Txt>
    <Txt variant="body" color={T.color.textSecondary} style={{ textAlign: 'center', maxWidth: 280 }}>
      Your asset has been added. It's now available for matching jobs.
    </Txt>
    <div style={{ width: '100%', marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 10 }}>
      <PrimaryButton onClick={onContinue}>Done</PrimaryButton>
      <SecondaryButton onClick={onAddAnother}>Add another</SecondaryButton>
    </div>
  </div>
);

// ── Asset details view ──────────────────────────────────────
const AssetDetailsViewScreen = ({ asset = { name: 'Hero Honda 150cc', type: 'Motorbike', description: 'Honda CB 150 · BD-12-3456 · Black, 2023 model, regularly serviced.', pics: 2 }, onBack }) => (
  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: T.color.navyBg }}>
    <AppBarElevated title="Asset Details" left={<BackButton onClick={onBack} />} />
    <div style={{ flex: 1, padding: 16, display: 'flex', flexDirection: 'column', gap: 14, overflow: 'auto' }}>
      {asset.pics > 0 && (
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto' }}>
          {Array.from({ length: asset.pics }).map((_, i) => (
            <div key={i} style={{
              minWidth: 240, height: 180, borderRadius: T.radius.l, flexShrink: 0,
              background: `linear-gradient(135deg, ${T.color.navyDeep}, ${T.color.navyHover})`,
              border: `1px solid ${T.color.navyBorder}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Icon name="image" size={48} color={T.color.gold500} />
            </div>
          ))}
        </div>
      )}
      <Card>
        <Txt variant="caption" color={T.color.textMuted} style={{ marginBottom: 4 }}>NAME</Txt>
        <Txt variant="subtitle" style={{ marginBottom: 12 }}>{asset.name}</Txt>
        <Txt variant="caption" color={T.color.textMuted} style={{ marginBottom: 4 }}>TYPE</Txt>
        <Txt variant="bodySm" style={{ marginBottom: 12 }}>{asset.type}</Txt>
        <Txt variant="caption" color={T.color.textMuted} style={{ marginBottom: 4 }}>DESCRIPTION</Txt>
        <Txt variant="bodySm" style={{ lineHeight: 1.6 }}>{asset.description}</Txt>
      </Card>
    </div>
  </div>
);

// ── Language preference ──────────────────────────────────────
const LanguagePreferenceScreen = ({ onBack, onSave }) => {
  const [lang, setLang] = useState('English');
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
        <div style={{ marginTop: 'auto' }}>
          <PrimaryButton onClick={onSave}>Save</PrimaryButton>
        </div>
      </div>
    </div>
  );
};

Object.assign(window, {
  WorkerOnboardingIntroScreen,
  ProfileEditScreen, NidUploadScreen, FacialCaptureScreen,
  ModeToggleScreen,
  SkillDeclarationScreen, AssetDeclarationScreen, LanguagePreferenceScreen,
  AssetDetailFormScreen, AssetPreviewScreen, AssetAddedSuccessScreen, AssetDetailsViewScreen,
});
