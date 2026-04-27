// Re'Loren v2 — in-progress, cancel, completion, history, help.

// ── Progress step pill list ──────────────────────────────────
const ProgressSteps = ({ steps, currentIdx }) => (
  <div>
    {steps.map((s, i) => {
      const done = i < currentIdx;
      const active = i === currentIdx;
      return (
        <div key={s} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', paddingBottom: i < steps.length - 1 ? 16 : 0, position: 'relative' }}>
          {i < steps.length - 1 && (
            <div style={{
              position: 'absolute', left: 13, top: 28, bottom: 0,
              width: 2, background: done ? T.color.gold500 : T.color.navyBorder,
            }} />
          )}
          <div style={{
            width: 28, height: 28, borderRadius: 14, flexShrink: 0, zIndex: 1,
            background: done ? T.color.gold500 : active ? 'rgba(212,175,55,0.15)' : T.color.navyRaised,
            border: `2px solid ${done || active ? T.color.gold500 : T.color.navyBorder}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: done ? T.color.textOnGold : T.color.gold500,
            fontFamily: T.fontSans, fontSize: 12, fontWeight: 700,
          }}>{done ? '✓' : i + 1}</div>
          <div style={{ flex: 1, paddingTop: 4 }}>
            <Txt variant="bodySm" style={{ fontWeight: active ? 600 : 500, color: done || active ? T.color.textPrimary : T.color.textMuted }}>
              {s}
            </Txt>
            {active && <Txt variant="caption" color={T.color.gold500} style={{ letterSpacing: 0, marginTop: 2 }}>In progress now</Txt>}
          </div>
        </div>
      );
    })}
  </div>
);

// ── Job Cancellation Reason ─────────────────────────────────
const CancelReasonSheet = ({ onClose, onConfirm }) => {
  const [reason, setReason] = useState('');
  const [pic, setPic] = useState(false);
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: T.color.navyBg }}>
      <AppBarElevated title="Job Cancellation Reason" left={<BackButton onClick={onClose} />} />
      <div style={{ flex: 1, padding: 16, display: 'flex', flexDirection: 'column', gap: 14, overflow: 'auto' }}>
        <TextField label="Reason for cancellation" multiline rows={5} value={reason} onChange={setReason}
          placeholder="Tell us what happened..." />

        <div>
          <Txt variant="bodySm" color={T.color.gold500} style={{ marginBottom: 6, fontWeight: 500 }}>
            Image (optional)
          </Txt>
          <button onClick={() => setPic(p => !p)} style={{
            width: '100%', padding: pic ? 0 : 24, borderRadius: T.radius.m, cursor: 'pointer',
            background: pic ? `linear-gradient(135deg, ${T.color.navyDeep}, ${T.color.navyHover})` : T.color.navyRaised,
            border: `1.5px dashed ${pic ? T.color.gold500 : T.color.navyBorder}`,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8,
            minHeight: pic ? 140 : 'auto',
          }}>
            <Icon name={pic ? 'checkCircle' : 'camera'} size={28} color={pic ? T.color.success : T.color.gold500} />
            <Txt variant="caption" color={T.color.textMuted} style={{ letterSpacing: 0 }}>
              {pic ? 'Image attached' : 'Tap to add an image'}
            </Txt>
          </button>
        </div>

        <div style={{ marginTop: 'auto', paddingBottom: 10 }}>
          <PrimaryButton onClick={() => onConfirm && onConfirm(reason)} disabled={!reason.trim()}>Submit</PrimaryButton>
        </div>
      </div>
    </div>
  );
};

// ── Job completion (employer) — w/ inline rating + skip ─────
const JobCompletionScreen = ({ onBack, onRate, onSkip }) => {
  const [stars, setStars] = useState(0);
  const [review, setReview] = useState('');
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: T.color.navyBg }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '12px 16px' }}>
        <button onClick={onSkip} style={{
          background: 'none', border: 'none', color: T.color.gold500,
          fontFamily: T.fontSans, fontSize: 14, fontWeight: 600, cursor: 'pointer', padding: 6,
        }}>Skip</button>
      </div>
      <div style={{ flex: 1, padding: 24, overflow: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
        <div style={{
          width: 96, height: 96, borderRadius: 48, background: 'rgba(102,187,106,0.15)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon name="checkCircle" size={56} color={T.color.success} />
        </div>
        <Txt variant="h2" style={{ textAlign: 'center' }}>Job complete</Txt>
        <Txt variant="body" color={T.color.textSecondary} style={{ textAlign: 'center', maxWidth: 280 }}>
          Thanks for using Re'Loren. Your job has been completed.
        </Txt>

        <Card style={{ width: '100%', padding: 16 }}>
          <Txt variant="caption" color={T.color.textMuted} style={{ marginBottom: 4 }}>JOB</Txt>
          <Txt variant="subtitle" style={{ textAlign: 'center' }}>Medicine delivery — Motijheel → Dhanmondi</Txt>
        </Card>

        <Card style={{ width: '100%', textAlign: 'center', padding: 20 }}>
          <div style={{
            width: 56, height: 56, borderRadius: 28, background: T.color.navyDeep,
            border: `1.5px solid ${T.color.gold500}`, margin: '0 auto 8px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: T.color.gold500, fontFamily: T.fontSans, fontSize: 18, fontWeight: 700,
          }}>RU</div>
          <Txt variant="subtitle">Rahim Uddin</Txt>
          <Txt variant="caption" color={T.color.textMuted} style={{ letterSpacing: 0, marginTop: 4 }}>
            Rate your experience
          </Txt>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 12 }}>
            {[1,2,3,4,5].map(i => (
              <button key={i} onClick={() => setStars(i)} style={{
                background: 'transparent', border: 'none', cursor: 'pointer', padding: 4,
                fontSize: 32, color: i <= stars ? T.color.gold500 : T.color.navyBorder, lineHeight: 1,
              }}>★</button>
            ))}
          </div>
        </Card>

        <TextField multiline rows={3} value={review} onChange={setReview} placeholder="Write a review (optional)" />

        <div style={{ width: '100%', marginTop: 'auto' }}>
          <PrimaryButton onClick={() => onRate && onRate({ stars, review })} disabled={stars === 0}>Submit</PrimaryButton>
        </div>
      </div>
    </div>
  );
};

// ── Work history (worker) ────────────────────────────────────
const WorkHistoryScreen = ({ onBack }) => {
  const history = [
    { id: 1, title: 'Medicine delivery', date: '24/04/2026', amount: 1275, status: 'complete' },
    { id: 2, title: 'Move small sofa — Gulshan', date: '22/04/2026', amount: 1700, status: 'complete' },
    { id: 3, title: 'Drop documents — Agargaon', date: '20/04/2026', amount: 680, status: 'complete' },
    { id: 4, title: 'Fix kitchen sink', date: '18/04/2026', amount: 0, status: 'cancelled' },
    { id: 5, title: 'Food delivery — Banani', date: '15/04/2026', amount: 440, status: 'complete' },
  ];
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: T.color.navyBg }}>
      <AppBarElevated title="Work History" left={<BackButton onClick={onBack} />} />
      <div style={{ flex: 1, overflow: 'auto' }}>
        <div style={{ padding: 16 }}>
          <Card style={{ background: T.color.navyDeep }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <Txt variant="caption" color={T.color.textMuted}>EARNED</Txt>
                <Txt variant="h2" color={T.color.gold500}>{fmtBDT(12485)}</Txt>
              </div>
              <div style={{ textAlign: 'right' }}>
                <Txt variant="caption" color={T.color.textMuted}>JOBS DONE</Txt>
                <Txt variant="h2" color={T.color.gold500}>14</Txt>
              </div>
            </div>
          </Card>
        </div>
        {history.map(h => (
          <div key={h.id} style={{
            padding: '14px 16px', borderBottom: `1px solid ${T.color.navyBorder}`,
            display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <div style={{
              width: 40, height: 40, borderRadius: 20, flexShrink: 0,
              background: h.status === 'complete' ? 'rgba(102,187,106,0.15)' : 'rgba(239,83,80,0.15)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Icon name={h.status === 'complete' ? 'checkCircle' : 'x'} size={18}
                color={h.status === 'complete' ? T.color.success : T.color.error} />
            </div>
            <div style={{ flex: 1 }}>
              <Txt variant="bodySm" style={{ fontWeight: 500 }}>{h.title}</Txt>
              <Txt variant="caption" color={T.color.textMuted} style={{ letterSpacing: 0, marginTop: 2 }}>{h.date}</Txt>
            </div>
            <div style={{ textAlign: 'right' }}>
              <Txt variant="bodySm" color={h.status === 'complete' ? T.color.gold500 : T.color.textMuted}
                style={{ fontWeight: 600 }}>
                {h.status === 'complete' ? fmtBDT(h.amount) : 'Cancelled'}
              </Txt>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ── Worker bid history (bidded jobs) ────────────────────────
const WorkerBidHistoryScreen = ({ onBack, onOpenBid }) => {
  const [seg, setSeg] = useState('active');
  const all = [
    { id: 'b1', job: 'Medicine delivery — Motijheel → Dhanmondi', employer: 'Karim Ahmed', bid: 1500, budget: 1500, status: 'active',   date: '27/04/2026 · 12 min ago' },
    { id: 'b2', job: 'Move single sofa — Gulshan',                employer: 'Salma Begum', bid: 1900, budget: 2000, status: 'active',   date: '27/04/2026 · 38 min ago' },
    { id: 'b3', job: 'Drop documents — Agargaon',                 employer: 'Tareq Rahman',bid: 750,  budget: 800,  status: 'accepted', date: '26/04/2026' },
    { id: 'b4', job: 'Food delivery — Banani',                    employer: 'Nusrat Jahan',bid: 450,  budget: 500,  status: 'rejected', date: '25/04/2026' },
    { id: 'b5', job: 'Fix kitchen sink — Banani',                 employer: 'Imran Hossain',bid: 1100,budget: 1200, status: 'withdrawn',date: '23/04/2026' },
  ];
  const filtered = seg === 'all' ? all : all.filter(b =>
    seg === 'active' ? b.status === 'active' :
    seg === 'past'   ? b.status !== 'active' : true
  );
  const counts = {
    active: all.filter(b => b.status === 'active').length,
    past:   all.filter(b => b.status !== 'active').length,
  };
  const pillVariant = (s) =>
    s === 'active'    ? 'bidding' :
    s === 'accepted'  ? 'success' :
    s === 'rejected'  ? 'error'   :
                        'pending';
  const pillLabel = (s) => s.charAt(0).toUpperCase() + s.slice(1);

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: T.color.navyBg }}>
      <AppBarElevated title="My Bidded Jobs" left={<BackButton onClick={onBack} />} />
      <div style={{ flex: 1, padding: 16, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Card style={{ background: T.color.navyDeep }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <Txt variant="caption" color={T.color.textMuted}>ACTIVE BIDS</Txt>
              <Txt variant="h2" color={T.color.gold500}>{counts.active}</Txt>
            </div>
            <div style={{ textAlign: 'right' }}>
              <Txt variant="caption" color={T.color.textMuted}>PAST BIDS</Txt>
              <Txt variant="h2" color={T.color.gold500}>{counts.past}</Txt>
            </div>
          </div>
        </Card>

        <Segmented
          options={[
            { value: 'active', label: 'Active' },
            { value: 'past',   label: 'Past' },
            { value: 'all',    label: 'All' },
          ]}
          value={seg} onChange={setSeg} />

        {filtered.length === 0 && (
          <EmptyState icon="briefcase" title="No bids here" body="Your bids will show up once you place them on a job." />
        )}

        {filtered.map(b => (
          <Card key={b.id} onClick={() => onOpenBid && onOpenBid(b)}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8, gap: 10 }}>
              <Txt variant="bodySm" style={{ fontWeight: 600, flex: 1 }}>{b.job}</Txt>
              <StatusPill variant={pillVariant(b.status)}>{pillLabel(b.status)}</StatusPill>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
              <Icon name="user" size={12} color={T.color.textMuted} />
              <Txt variant="caption" color={T.color.textMuted} style={{ letterSpacing: 0 }}>{b.employer}</Txt>
              <span style={{ color: T.color.navyBorder }}>·</span>
              <Txt variant="caption" color={T.color.textMuted} style={{ letterSpacing: 0 }}>{b.date}</Txt>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 10, borderTop: `1px solid ${T.color.navyBorder}` }}>
              <div>
                <Txt variant="caption" color={T.color.textMuted} style={{ letterSpacing: 0 }}>Your bid</Txt>
                <Txt variant="bodySm" color={T.color.gold500} style={{ fontWeight: 700 }}>{fmtBDT(b.bid)}</Txt>
              </div>
              <div style={{ textAlign: 'right' }}>
                <Txt variant="caption" color={T.color.textMuted} style={{ letterSpacing: 0 }}>Budget</Txt>
                <Txt variant="bodySm" color={T.color.textSecondary}>{fmtBDT(b.budget)}</Txt>
              </div>
              {b.status === 'active' && (
                <Icon name="chevron" size={16} color={T.color.textMuted} />
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

// ── Payment methods ──────────────────────────────────────────
const PaymentMethodsScreen = ({ onBack, onAdd }) => {
  const [methods, setMethods] = useState([
    { id: 1, type: 'bKash', number: '+880 1711•••567', active: true, color: '#E2136E', initial: 'b' },
    { id: 2, type: 'Nagad', number: '+880 1711•••567', active: false, color: '#EE3124', initial: 'N' },
  ]);

  const toggleActive = (id) => setMethods(methods.map(m => m.id === id ? { ...m, active: !m.active } : m));
  const remove = (id) => setMethods(methods.filter(m => m.id !== id));

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: T.color.navyBg }}>
      <AppBarElevated title="Payment Methods" left={<BackButton onClick={onBack} />} />
      <div style={{ flex: 1, padding: 16, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {methods.map(m => (
          <Card key={m.id} style={m.active ? { border: `1.5px solid ${T.color.gold500}` } : undefined}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 44, height: 44, borderRadius: T.radius.s, flexShrink: 0,
                background: m.color, display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontFamily: T.fontSans, fontSize: 18, fontWeight: 700,
              }}>{m.initial}</div>
              <div style={{ flex: 1 }}>
                <Txt variant="bodySm" style={{ fontWeight: 600 }}>{m.type}</Txt>
                <Txt variant="caption" color={T.color.textMuted} style={{ letterSpacing: 0, marginTop: 2 }}>{m.number}</Txt>
              </div>
              <Toggle checked={m.active} onChange={() => toggleActive(m.id)} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 12, paddingTop: 10, borderTop: `1px solid ${T.color.navyBorder}` }}>
              <Txt variant="caption" color={m.active ? T.color.gold500 : T.color.textMuted} style={{ fontWeight: 600 }}>
                {m.active ? 'ACTIVE' : 'INACTIVE'}
              </Txt>
              <button onClick={() => remove(m.id)} style={{
                background: 'none', border: 'none', color: T.color.error,
                fontFamily: T.fontSans, fontSize: 13, fontWeight: 500, cursor: 'pointer', padding: '4px 8px',
              }}>Remove</button>
            </div>
          </Card>
        ))}
        <SecondaryButton icon="plus" onClick={onAdd}>Add payment method</SecondaryButton>
        <Banner variant="info">Your payment info is encrypted end-to-end.</Banner>
      </div>
    </div>
  );
};

// ── Help / Terms ─────────────────────────────────────────────
const HelpScreen = ({ onBack }) => {
  const faqs = [
    { q: 'How do bids work?', a: 'Workers place bids on your job. You choose who to hire based on bid amount, rating, and distance.' },
    { q: 'When is my payment released?', a: 'Payment is released to the worker only after you mark the job complete. Until then, it sits in escrow.' },
    { q: 'What if I cancel?', a: 'Before work starts: full refund on online payments. After work starts: partial refund based on progress.' },
    { q: 'How do I verify as a worker?', a: "Go to Profile → Verification and upload your NID, take 3 facial photos, and optionally a skill certificate." },
    { q: 'Why is there a 15% commission?', a: 'The platform fee covers escrow, matching, dispute resolution, and support.' },
  ];
  const [open, setOpen] = useState(null);
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: T.color.navyBg }}>
      <AppBarElevated title="Help & Support" left={<BackButton onClick={onBack} />} />
      <div style={{ flex: 1, padding: 16, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Txt variant="caption" color={T.color.textMuted}>FAQ</Txt>
        {faqs.map((f, i) => (
          <Card key={i} onClick={() => setOpen(open === i ? null : i)}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Txt variant="bodySm" style={{ fontWeight: 500, flex: 1, paddingRight: 8 }}>{f.q}</Txt>
              <div style={{ transform: open === i ? 'rotate(180deg)' : 'none', transition: 'transform 150ms' }}>
                <Icon name="chevronDown" size={18} color={T.color.textMuted} />
              </div>
            </div>
            {open === i && (
              <Txt variant="bodySm" color={T.color.textSecondary} style={{ marginTop: 10 }}>{f.a}</Txt>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

const TermsScreen = ({ onBack }) => (
  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: T.color.navyBg }}>
    <AppBarElevated title="Terms & Privacy" left={<BackButton onClick={onBack} />} />
    <div style={{ flex: 1, padding: 16, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 14 }}>
      <Txt variant="caption" color={T.color.textMuted}>LAST UPDATED 01 JAN 2026</Txt>
      {[
        { t: '1. Who we are', b: "Re'Loren Technologies Ltd. operates the Re'Loren app, a platform connecting employers and workers for informal, task-based work in Bangladesh." },
        { t: '2. Your account', b: "You must be 18 or older, provide accurate info, and keep your phone number current. One account per person." },
        { t: '3. Payments & escrow', b: "For online payments, funds are held by our licensed escrow partner until the job is marked complete. A 15% platform fee is deducted from the worker's gross bid." },
        { t: '4. Worker verification', b: "Workers must submit a valid NID, facial photos, and (optionally) skill certificates. Verification decisions are reviewed manually within 24 hours." },
        { t: '5. Disputes', b: "If something goes wrong, open a dispute within 7 days. Our team investigates within 48 hours and can release, refund, or split escrow funds." },
        { t: '6. Prohibited uses', b: "No illegal work, no harassment, no sharing of contact details outside the app, no price collusion among workers." },
      ].map(s => (
        <div key={s.t}>
          <Txt variant="bodySm" style={{ fontWeight: 600, marginBottom: 6 }}>{s.t}</Txt>
          <Txt variant="bodySm" color={T.color.textSecondary} style={{ lineHeight: 1.6 }}>{s.b}</Txt>
        </div>
      ))}
      <div style={{ padding: 16, background: T.color.navyRaised, borderRadius: T.radius.m,
        border: `1px solid ${T.color.navyBorder}`, textAlign: 'center' }}>
        <Txt variant="caption" color={T.color.textMuted} style={{ letterSpacing: 0 }}>
          Full policy available at reloren.bd/terms
        </Txt>
      </div>
    </div>
  </div>
);

// ── Profile / settings hub ──────────────────────────────────
const ProfileHubScreen = ({ mode, onNav, onSwitchMode }) => {
  const isWorker = mode === 'worker';
  const items = isWorker
    ? [
        { id: 'edit', icon: 'user', label: 'Edit profile' },
        { id: 'skills', icon: 'briefcase', label: 'My skills', badge: '3 declared' },
        { id: 'assets', icon: 'truck', label: 'My assets', badge: 'Honda 150cc' },
        { id: 'bids', icon: 'briefcase', label: 'My bidded jobs', badge: '2 active' },
        { id: 'payment', icon: 'creditCard', label: 'Payment methods' },
        { id: 'language', icon: 'globe', label: 'Language', badge: 'English' },
        { id: 'help', icon: 'help', label: 'Help & support' },
        { id: 'terms', icon: 'file', label: 'Terms & Privacy' },
      ]
    : [
        { id: 'edit', icon: 'user', label: 'Edit profile' },
        { id: 'payment', icon: 'creditCard', label: 'Payment methods' },
        { id: 'history', icon: 'history', label: 'Work history' },
        { id: 'language', icon: 'globe', label: 'Language', badge: 'English' },
        { id: 'help', icon: 'help', label: 'Help & support' },
        { id: 'terms', icon: 'file', label: 'Terms & Privacy' },
      ];
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: T.color.navyBg }}>
      <AppBarElevated title="Profile" />
      <div style={{ flex: 1, overflow: 'auto' }}>
        <div style={{ padding: 20, textAlign: 'center', borderBottom: `1px solid ${T.color.navyBorder}` }}>
          <div style={{
            width: 88, height: 88, borderRadius: 44, background: T.color.navyDeep,
            border: `2px solid ${T.color.gold500}`, margin: '0 auto 12px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: T.color.gold500, fontFamily: T.fontSans, fontSize: 28, fontWeight: 700,
          }}>KA</div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <Txt variant="subtitle">Karim Ahmed</Txt>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <Icon name="starFill" size={14} color={T.color.gold500} />
              <Txt variant="bodySm" color={T.color.gold500} style={{ fontWeight: 600 }}>4.8</Txt>
            </div>
          </div>
          <Txt variant="caption" color={T.color.textMuted} style={{ letterSpacing: 0, marginTop: 4 }}>+880 1711-234567</Txt>
        </div>
        <div style={{ padding: 16 }}>
          <Card>
            <Txt variant="caption" color={T.color.textMuted} style={{ marginBottom: 10 }}>ACTIVE MODE</Txt>
            <Segmented
              options={[{ value: 'employer', label: 'Employer' }, { value: 'worker', label: 'Worker' }]}
              value={mode} onChange={onSwitchMode} />
          </Card>
        </div>
        <div style={{ padding: '0 16px' }}>
          {items.map(i => (
            <div key={i.id} onClick={() => onNav && onNav(i.id)}
              style={{
                padding: '14px 4px', borderBottom: `1px solid ${T.color.navyBorder}`,
                display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer',
              }}>
              <div style={{
                width: 32, height: 32, borderRadius: 16, background: 'rgba(212,175,55,0.08)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Icon name={i.icon} size={16} color={T.color.gold500} />
              </div>
              <Txt variant="bodySm" style={{ fontWeight: 500, flex: 1 }}>{i.label}</Txt>
              {i.badge && (
                <Txt variant="caption" color={T.color.textMuted} style={{ letterSpacing: 0 }}>
                  {i.badge}
                </Txt>
              )}
              <Icon name="chevron" size={16} color={T.color.textMuted} />
            </div>
          ))}
        </div>
        <div style={{ padding: 20, textAlign: 'center' }}>
          <button style={{
            background: 'none', border: 'none', color: T.color.error,
            fontFamily: T.fontSans, fontSize: 14, fontWeight: 500, cursor: 'pointer', padding: 12,
          }}>Sign out</button>
          <Txt variant="caption" color={T.color.textMuted} style={{ letterSpacing: 0, marginTop: 4 }}>
            Re'Loren v2.4.1
          </Txt>
        </div>
      </div>
    </div>
  );
};

// ── Home / feed for employer (role split) ────────────────────
const EmployerHomeScreen = ({ onPost, onNav, hasPostedJob = true, mode = 'employer', onSwitchMode }) => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: T.color.navyBg }}>
      <Drawer isOpen={isDrawerOpen} onClose={() => setDrawerOpen(false)} onNav={onNav} />
      <AppBarElevated
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
            <div style={{ width: 36, height: 36, borderRadius: 18, background: T.color.navyDeep, border: `1px solid ${T.color.gold500}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: T.color.gold500, fontSize: 13, fontWeight: 700, flexShrink: 0 }}>KA</div>
            <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Txt variant="bodySm" style={{ fontWeight: 600, lineHeight: 1.2, whiteSpace: 'nowrap' }}>Karim Ahmed</Txt>
                <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Icon name="starFill" size={10} color={T.color.gold500} />
                  <Txt variant="caption" color={T.color.gold500} style={{ fontSize: 10 }}>4.8</Txt>
                </div>
                <div style={{
                  padding: '2px 6px', borderRadius: T.radius.full,
                  background: 'rgba(212,175,55,0.10)', border: `1px solid ${T.color.gold500}`,
                  color: T.color.gold500, fontFamily: T.fontSans, fontSize: 9, fontWeight: 700,
                  letterSpacing: '2%', textTransform: 'uppercase', lineHeight: 1.2,
                }}>Employer</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 3, marginTop: 1 }}>
                <Icon name="location" size={10} color={T.color.textMuted} />
                <Txt variant="caption" color={T.color.textMuted} style={{ letterSpacing: 0, fontSize: 10, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Motijheel, Dhaka</Txt>
              </div>
            </div>
          </div>
        }
        right={
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ position: 'relative' }}>
              <IconButton name="bell" onClick={() => onNav && onNav('notifications')} />
              <div style={{ position: 'absolute', top: 10, right: 10, width: 8, height: 8, borderRadius: 4, background: T.color.error, border: `1.5px solid ${T.color.navyBg}` }} />
            </div>
            <IconButton name="menu" onClick={() => setDrawerOpen(true)} />
          </div>
        }
      />
      <div style={{ flex: 1, padding: 16, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Card style={{
          background: `linear-gradient(135deg, ${T.color.gold500}, ${T.color.gold600})`,
          border: 'none',
        }}>
          <Txt variant="h2" color={T.color.textOnGold} style={{ marginTop: 4 }}>Need help today?</Txt>
          <Txt variant="bodySm" color="rgba(15,25,45,0.8)" style={{ marginTop: 6, marginBottom: 14 }}>
            Post a job and get bids in minutes.
          </Txt>
          <button onClick={onPost} style={{
            background: T.color.navyDeep, color: T.color.gold500, border: 'none',
            padding: '10px 18px', borderRadius: T.radius.m, cursor: 'pointer',
            fontFamily: T.fontSans, fontSize: 14, fontWeight: 600,
          }}>Post a job →</button>
        </Card>

        {hasPostedJob && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <Txt variant="caption" color={T.color.textMuted}>ACTIVE JOB</Txt>
            </div>
            <Card onClick={() => onNav && onNav('jobdetail')}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                <Txt variant="bodySm" style={{ fontWeight: 600 }}>Medicine delivery</Txt>
                <StatusPill variant="bidding">4 bids</StatusPill>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <Txt variant="caption" color={T.color.textMuted} style={{ letterSpacing: 0 }}>
                  Posted 12 min ago
                </Txt>
                <Txt variant="bodySm" color={T.color.gold500} style={{ fontWeight: 600 }}>৳1,500 budget</Txt>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

// ── Payment selection (employer) ─────────────────────────────
const PaymentSelectionScreen = ({ onBack, onPaid, amount = 1500 }) => {
  const [method, setMethod] = useState('online');
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [showCode, setShowCode] = useState(false);

  useEffect(() => {
    if (method !== 'online' || timeLeft <= 0) return;
    const t = setInterval(() => setTimeLeft(s => s - 1), 1000);
    return () => clearInterval(t);
  }, [method, timeLeft]);

  const fmtTime = s => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  if (showCode) return (
    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: T.color.navyBg, padding: 24 }}>
      <Card style={{ textAlign: 'center', padding: 32, maxWidth: 320 }}>
        <Icon name="shield" size={64} color={T.color.gold500} style={{ marginBottom: 16 }} />
        <Txt variant="h2" style={{ marginBottom: 8 }}>Share this code</Txt>
        <Txt variant="bodySm" color={T.color.textSecondary} style={{ marginBottom: 24 }}>
          Give this code to the worker when they arrive to start the job.
        </Txt>
        <div style={{ 
          background: T.color.navyDeep, border: `2px dashed ${T.color.gold500}`, 
          padding: '16px 32px', borderRadius: T.radius.m, marginBottom: 32
        }}>
          <Txt variant="display" color={T.color.gold500} style={{ letterSpacing: 8 }}>4821</Txt>
        </div>
        <PrimaryButton onClick={onPaid}>Continue to tracking</PrimaryButton>
      </Card>
    </div>
  );

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: T.color.navyBg }}>
      <AppBarElevated title="Payment" left={<BackButton onClick={onBack} />} />
      <div style={{ flex: 1, padding: 16, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Card style={{ background: T.color.navyDeep }}>
          <Txt variant="caption" color={T.color.textMuted}>TOTAL TO PAY</Txt>
          <Txt variant="h1" color={T.color.gold500}>{fmtBDT(amount)}</Txt>
        </Card>

        <Txt variant="caption" color={T.color.textMuted}>CHOOSE METHOD</Txt>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Radio 
            checked={method === 'online'} 
            onClick={() => setMethod('online')}
            label="Online Payment"
            sub="bKash, Nagad, or Card (Funds held in escrow)"
          />
          <Radio 
            checked={method === 'cash'} 
            onClick={() => setMethod('cash')}
            label="Cash on Delivery"
            sub="Pay the worker directly in person"
          />
        </div>

        {method === 'online' && (
          <Banner variant="warning" title="Complete within 5 minutes" style={{ marginTop: 8 }}>
            The worker's bid is reserved for you. Please pay within {fmtTime(timeLeft)} to confirm.
          </Banner>
        )}

        {method === 'cash' && (
          <Banner variant="info" title="Cash Job" style={{ marginTop: 8 }}>
            You will pay {fmtBDT(amount)} directly to the worker. Re'Loren service fee will be collected from the worker's balance.
          </Banner>
        )}

        <div style={{ marginTop: 'auto', paddingBottom: 20 }}>
          <PrimaryButton onClick={() => setShowCode(true)}>
            {method === 'online' ? 'Pay Now' : 'Confirm Cash Job'}
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

// ── Employer work history ───────────────────────────────────
const EmployerWorkHistoryScreen = ({ onBack }) => {
  const history = [
    { id: 1, title: 'Medicine delivery', date: '24/04/2026', amount: 1500, status: 'complete' },
    { id: 2, title: 'Move single sofa — Gulshan', date: '22/04/2026', amount: 2000, status: 'complete' },
    { id: 3, title: 'Drop documents — Agargaon', date: '20/04/2026', amount: 800, status: 'complete' },
    { id: 4, title: 'Fix kitchen sink', date: '18/04/2026', amount: 0, status: 'cancelled' },
    { id: 5, title: 'Food delivery — Banani', date: '15/04/2026', amount: 500, status: 'complete' },
  ];
  const completed = history.filter(h => h.status === 'complete');
  const totalDisbursed = completed.reduce((s, h) => s + h.amount, 0);
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: T.color.navyBg }}>
      <AppBarElevated title="Work History" left={<BackButton onClick={onBack} />} />
      <div style={{ flex: 1, overflow: 'auto' }}>
        <div style={{ padding: 16 }}>
          <Card style={{ background: T.color.navyDeep }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <Txt variant="caption" color={T.color.textMuted}>DISBURSED</Txt>
                <Txt variant="h2" color={T.color.gold500}>{fmtBDT(totalDisbursed)}</Txt>
              </div>
              <div style={{ textAlign: 'right' }}>
                <Txt variant="caption" color={T.color.textMuted}>COMPLETED JOBS</Txt>
                <Txt variant="h2" color={T.color.gold500}>{completed.length}</Txt>
              </div>
            </div>
          </Card>
        </div>
        {history.map(h => (
          <div key={h.id} style={{
            padding: '14px 16px', borderBottom: `1px solid ${T.color.navyBorder}`,
            display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <div style={{
              width: 40, height: 40, borderRadius: 20, flexShrink: 0,
              background: h.status === 'complete' ? 'rgba(102,187,106,0.15)' : 'rgba(239,83,80,0.15)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Icon name={h.status === 'complete' ? 'checkCircle' : 'x'} size={18}
                color={h.status === 'complete' ? T.color.success : T.color.error} />
            </div>
            <div style={{ flex: 1 }}>
              <Txt variant="bodySm" style={{ fontWeight: 500 }}>{h.title}</Txt>
              <Txt variant="caption" color={T.color.textMuted} style={{ letterSpacing: 0, marginTop: 2 }}>{h.date}</Txt>
            </div>
            <div style={{ textAlign: 'right' }}>
              <Txt variant="bodySm" color={h.status === 'complete' ? T.color.gold500 : T.color.textMuted}
                style={{ fontWeight: 600 }}>
                {h.status === 'complete' ? fmtBDT(h.amount) : 'Cancelled'}
              </Txt>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ── Employer home with location (verified profile, no greeting, no totals) ──
// (already in EmployerHomeScreen — no separate variant needed)

Object.assign(window, {
  ProgressSteps,
  CancelReasonSheet, JobCompletionScreen,
  WorkHistoryScreen, PaymentMethodsScreen, HelpScreen, TermsScreen,
  ProfileHubScreen, EmployerHomeScreen, PaymentSelectionScreen,
  EmployerWorkHistoryScreen, WorkerBidHistoryScreen,
});
