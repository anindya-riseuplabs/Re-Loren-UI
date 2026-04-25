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

// ── In-progress (employer, online-paid) ──────────────────────
const ProgressEmployerOnlineScreen = ({ onBack, onCancel, onComplete, onChat }) => {
  const steps = ['Worker en route', 'Pickup in progress', 'En route to drop-off', 'Completed'];
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: T.color.navyBg }}>
      <AppBarElevated title="Job in progress" left={<BackButton onClick={onBack} />}
        right={<IconButton name="chat" onClick={onChat} />} />
      <div style={{ flex: 1, padding: 16, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Card style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{
            height: 140, background: `linear-gradient(135deg, ${T.color.navyDeep}, ${T.color.navyHover})`,
            position: 'relative',
          }}>
            <svg viewBox="0 0 300 140" style={{ width: '100%', height: '100%', opacity: 0.4 }}>
              <path d="M20 110 Q80 40 160 70 T280 30" stroke={T.color.gold500} strokeWidth="2" fill="none" strokeDasharray="4 4" />
            </svg>
            <div style={{ position: 'absolute', left: 28, top: 100 }}>
              <div style={{ width: 12, height: 12, borderRadius: 6, background: T.color.success, border: '2px solid #fff' }} />
            </div>
            <div style={{ position: 'absolute', right: 28, top: 24 }}>
              <div style={{ width: 12, height: 12, borderRadius: 6, background: T.color.error, border: '2px solid #fff' }} />
            </div>
            <div style={{ position: 'absolute', left: '45%', top: '45%' }}>
              <div style={{
                width: 32, height: 32, borderRadius: 16, background: T.color.gold500,
                border: '3px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 0 0 6px rgba(212,175,55,0.25)',
              }}>
                <Icon name="location" size={16} color={T.color.textOnGold} />
              </div>
            </div>
          </div>
          <div style={{ padding: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <Txt variant="caption" color={T.color.textMuted} style={{ letterSpacing: 0 }}>ETA</Txt>
              <Txt variant="subtitle" color={T.color.gold500}>14 min</Txt>
            </div>
            <div style={{ textAlign: 'right' }}>
              <Txt variant="caption" color={T.color.textMuted} style={{ letterSpacing: 0 }}>Distance</Txt>
              <Txt variant="bodySm" style={{ fontWeight: 600 }}>2.1 km away</Txt>
            </div>
          </div>
        </Card>
        <Card>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 48, height: 48, borderRadius: 24, background: T.color.navyDeep,
              border: `1.5px solid ${T.color.gold500}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: T.color.gold500, fontFamily: T.fontSans, fontSize: 16, fontWeight: 700,
            }}>RU</div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Txt variant="bodySm" style={{ fontWeight: 600 }}>Rahim Uddin</Txt>
                <VerifiedBadge />
              </div>
              <Txt variant="caption" color={T.color.textMuted} style={{ letterSpacing: 0 }}>Motorbike · BD-12-3456</Txt>
            </div>
            <IconButton name="phone" />
            <IconButton name="chat" onClick={onChat} />
          </div>
        </Card>
        <Card>
          <Txt variant="caption" color={T.color.textMuted} style={{ marginBottom: 14 }}>PROGRESS</Txt>
          <ProgressSteps steps={steps} currentIdx={1} />
        </Card>
        <Banner variant="success" title="Payment held in escrow">
          ৳1,500 releases to Rahim when you mark complete.
        </Banner>
        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <PrimaryButton onClick={onComplete}>Mark complete</PrimaryButton>
          <button onClick={onCancel} style={{
            background: 'none', border: 'none', color: T.color.error,
            fontFamily: T.fontSans, fontSize: 14, fontWeight: 500, cursor: 'pointer', padding: 12,
          }}>Cancel this job</button>
        </div>
      </div>
    </div>
  );
};

// ── In-progress (worker side) ────────────────────────────────
const ProgressWorkerScreen = ({ onBack, onAdvance, onChat }) => {
  const [step, setStep] = useState(1);
  const [showCodeEntry, setShowCodeEntry] = useState(false);
  const [code, setCode] = useState('');
  const steps = ['Accepted', 'Heading to pickup', 'Job started', 'Dropped off', 'Completed'];
  const ctas = [null, 'Arrived at pickup', 'Start Job (Enter Code)', 'Mark dropped off', 'Awaiting confirmation'];
  
  const isCashJob = true; // Example

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: T.color.navyBg }}>
      <AppBarElevated title="Active Job" left={<BackButton onClick={onBack} />} />
      <div style={{ flex: 1, padding: 16, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Card style={{ background: T.color.navyDeep }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <Txt variant="caption" color={T.color.textMuted} style={{ marginBottom: 4 }}>YOU'LL RECEIVE (NET)</Txt>
              <Txt variant="h2" color={T.color.gold500}>৳1,275</Txt>
            </div>
            <div style={{ textAlign: 'right' }}>
              <StatusPill variant={isCashJob ? 'warning' : 'success'}>{isCashJob ? 'CASH' : 'ONLINE PAID'}</StatusPill>
            </div>
          </div>
          <Txt variant="caption" color={T.color.textMuted} style={{ letterSpacing: 0, marginTop: 4 }}>
            Gross ৳1,500 − 15% commission
          </Txt>
        </Card>

        <Card>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 44, height: 44, borderRadius: 22, background: T.color.navyRaised, display: 'flex', alignItems: 'center', justifyContent: 'center', color: T.color.gold500, fontWeight: 700 }}>KA</div>
            <div style={{ flex: 1 }}>
              <Txt variant="bodySm" style={{ fontWeight: 600 }}>Karim Ahmed</Txt>
              <RatingStars value={4.8} count={142} compact />
            </div>
            <IconButton name="phone" onClick={() => {}} />
            <IconButton name="chat" onClick={onChat} />
          </div>
        </Card>

        <Card>
          <Txt variant="caption" color={T.color.textMuted} style={{ marginBottom: 4 }}>JOB</Txt>
          <Txt variant="bodySm" style={{ marginBottom: 10 }}>Medicine delivery — Motijheel → Dhanmondi</Txt>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Icon name="checkCircle" size={16} color={T.color.success} />
            <Txt variant="caption" color={T.color.textMuted} style={{ letterSpacing: 0 }}>
              {isCashJob ? 'Collect ৳1,500 cash from employer' : 'Payment held in escrow'}
            </Txt>
          </div>
        </Card>

        {isCashJob && step === 2 && (
          <Banner variant="info" title="Cash Collection">
            Please collect the total amount from the employer before starting the journey.
          </Banner>
        )}

        <Card>
          <Txt variant="caption" color={T.color.textMuted} style={{ marginBottom: 14 }}>STATUS</Txt>
          <ProgressSteps steps={steps} currentIdx={step} />
        </Card>

        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 10, paddingBottom: 20 }}>
          {step === 2 && !showCodeEntry ? (
            <PrimaryButton onClick={() => setShowCodeEntry(true)}>Start Job</PrimaryButton>
          ) : step === 2 && showCodeEntry ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <Txt variant="bodySm" color={T.color.gold500} style={{ textAlign: 'center', fontWeight: 600 }}>ENTER 4-DIGIT CODE FROM EMPLOYER</Txt>
              <OtpInput value={code} onChange={setCode} length={4} />
              <div style={{ display: 'flex', gap: 10 }}>
                <SecondaryButton style={{ flex: 1 }} onClick={() => setShowCodeEntry(false)}>Back</SecondaryButton>
                <PrimaryButton style={{ flex: 1 }} disabled={code.length < 4} onClick={() => { setStep(3); setCode(''); setShowCodeEntry(false); }}>Verify & Start</PrimaryButton>
              </div>
            </div>
          ) : step < 4 ? (
            <PrimaryButton onClick={() => setStep(s => s + 1)}>{ctas[step]}</PrimaryButton>
          ) : (
            <div style={{ textAlign: 'center', padding: 12 }}>
              <Icon name="checkCircle" size={32} color={T.color.success} style={{ marginBottom: 8 }} />
              <Txt variant="bodySm" color={T.color.success}>Job completed!</Txt>
              <SecondaryButton style={{ marginTop: 16 }} onClick={onBack}>Back to dashboard</SecondaryButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ── Cancel reason (sheet) ────────────────────────────────────
const CancelReasonSheet = ({ onClose, onConfirm, context = 'employer' }) => {
  const [reason, setReason] = useState(null);
  const opts = context === 'employer'
    ? ['Worker not responding', 'Changed my mind', 'Worker asked for more money', 'Other']
    : ['Employer not responding', 'Address was wrong', 'Unsafe situation', 'Other'];
  return (
    <BottomSheet onClose={onClose} title="Cancel this job?">
      <Banner variant="warning" title="Cancellation affects your rating">
        {context === 'employer'
          ? 'Cash jobs: refund not guaranteed. Online: refund issued if cancelled before work starts.'
          : 'Repeated cancellations reduce your match score.'}
      </Banner>
      <Txt variant="caption" color={T.color.textMuted} style={{ marginTop: 18, marginBottom: 10 }}>
        WHY ARE YOU CANCELLING?
      </Txt>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {opts.map(o => (
          <Radio key={o} checked={reason === o} label={o} onClick={() => setReason(o)} />
        ))}
      </div>
      {reason === 'Other' && (
        <div style={{ marginTop: 12 }}>
          <TextField multiline rows={3} placeholder="Tell us what happened…" />
        </div>
      )}
      <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
        <SecondaryButton onClick={onClose}>Never mind</SecondaryButton>
        <DestructiveButton onClick={() => onConfirm(reason)}>Cancel job</DestructiveButton>
      </div>
    </BottomSheet>
  );
};

// ── Job completion (employer) ────────────────────────────────
const JobCompletionScreen = ({ onBack, onRate }) => (
  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: T.color.navyBg,
    alignItems: 'center', justifyContent: 'center', padding: 24, gap: 16 }}>
    <div style={{
      width: 96, height: 96, borderRadius: 48, background: 'rgba(102,187,106,0.15)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <Icon name="checkCircle" size={56} color={T.color.success} />
    </div>
    <Txt variant="h2" style={{ textAlign: 'center' }}>Job complete</Txt>
    <Txt variant="body" color={T.color.textSecondary} style={{ textAlign: 'center', maxWidth: 280 }}>
      ৳1,275 released to Rahim. ৳225 went to platform.
    </Txt>
    <Card style={{ width: '100%' }}>
      {[
        ['Job', 'Medicine delivery'],
        ['Worker', 'Rahim Uddin'],
        ['Gross', '৳1,500'],
        ['Platform fee', '−৳225'],
        ['Released to worker', '৳1,275'],
        ['Duration', '1h 12m'],
      ].map(([k, v]) => (
        <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: `1px solid ${T.color.navyBorder}` }}>
          <Txt variant="bodySm" color={T.color.textSecondary}>{k}</Txt>
          <Txt variant="bodySm" style={{ fontWeight: 500 }}>{v}</Txt>
        </div>
      ))}
    </Card>
    <div style={{ width: '100%', marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 10 }}>
      <PrimaryButton onClick={onRate}>Rate Rahim</PrimaryButton>
      <SecondaryButton onClick={onBack}>Done for now</SecondaryButton>
    </div>
  </div>
);

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
                <Txt variant="caption" color={T.color.textMuted}>EARNED (30 DAYS)</Txt>
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

// ── Payment methods ──────────────────────────────────────────
const PaymentMethodsScreen = ({ onBack }) => {
  const methods = [
    { id: 1, type: 'bKash', number: '+880 1711•••567', primary: true, color: '#E2136E', initial: 'b' },
    { id: 2, type: 'Card', number: 'Visa •••• 4821', primary: false, color: T.color.info, initial: 'V' },
  ];
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: T.color.navyBg }}>
      <AppBarElevated title="Payment Methods" left={<BackButton onClick={onBack} />} />
      <div style={{ flex: 1, padding: 16, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {methods.map(m => (
          <Card key={m.id}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 44, height: 44, borderRadius: T.radius.s, flexShrink: 0,
                background: m.color, display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontFamily: T.fontSans, fontSize: 18, fontWeight: 700,
              }}>{m.initial}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Txt variant="bodySm" style={{ fontWeight: 600 }}>{m.type}</Txt>
                  {m.primary && <StatusPill variant="bidding">Primary</StatusPill>}
                </div>
                <Txt variant="caption" color={T.color.textMuted} style={{ letterSpacing: 0, marginTop: 2 }}>{m.number}</Txt>
              </div>
              <IconButton name="moreVert" />
            </div>
          </Card>
        ))}
        <SecondaryButton icon="plus">Add payment method</SecondaryButton>
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
        <Card onClick={() => {}}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <div style={{
              width: 40, height: 40, borderRadius: 20, background: 'rgba(212,175,55,0.12)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Icon name="chat" size={18} color={T.color.gold500} />
            </div>
            <div style={{ flex: 1 }}>
              <Txt variant="bodySm" style={{ fontWeight: 600 }}>Chat with support</Txt>
              <Txt variant="caption" color={T.color.textMuted} style={{ letterSpacing: 0 }}>Usually responds within 15 min</Txt>
            </div>
            <Icon name="chevron" size={18} color={T.color.textMuted} />
          </div>
        </Card>
        <Txt variant="caption" color={T.color.textMuted} style={{ marginTop: 8 }}>FAQ</Txt>
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
  const items = [
    { id: 'edit', icon: 'user', label: 'Edit profile' },
    { id: 'skills', icon: 'briefcase', label: 'My skills', badge: mode === 'worker' ? '3 declared' : null },
    { id: 'assets', icon: 'truck', label: 'My assets', badge: mode === 'worker' ? 'Honda 150cc' : null },
    { id: 'verification', icon: 'shield', label: 'Verification', badge: 'Verified', badgeColor: T.color.success },
    { id: 'payment', icon: 'creditCard', label: 'Payment methods' },
    { id: 'language', icon: 'globe', label: 'Language', badge: 'English' },
    { id: 'help', icon: 'help', label: 'Help & support' },
    { id: 'terms', icon: 'file', label: 'Terms & Privacy' },
  ].filter(i => mode === 'worker' || (i.id !== 'skills' && i.id !== 'assets' && i.id !== 'verification'));
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
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
            <Txt variant="subtitle">Karim Ahmed</Txt>
            <VerifiedBadge />
          </div>
          <Txt variant="caption" color={T.color.textMuted} style={{ letterSpacing: 0 }}>+880 1711-234567</Txt>
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
            <div key={i.id} onClick={() => onNav(i.id)}
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
                <Txt variant="caption" color={i.badgeColor || T.color.textMuted} style={{ letterSpacing: 0 }}>
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
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 16, background: T.color.navyDeep, border: `1px solid ${T.color.gold500}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: T.color.gold500, fontSize: 12, fontWeight: 700 }}>KA</div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Txt variant="bodySm" style={{ fontWeight: 600, lineHeight: 1.2 }}>Karim Ahmed</Txt>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <Icon name="starFill" size={10} color={T.color.gold500} />
                <Txt variant="caption" color={T.color.gold500} style={{ fontSize: 10 }}>4.8</Txt>
              </div>
            </div>
          </div>
        }
        modePill={<ModePill mode={mode} onToggle={() => onSwitchMode && onSwitchMode(mode === 'employer' ? 'worker' : 'employer')} />}
        right={
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ position: 'relative' }}>
              <IconButton name="bell" onClick={() => onNav('notifications')} />
              <div style={{ position: 'absolute', top: 10, right: 10, width: 8, height: 8, borderRadius: 4, background: T.color.error, border: `1.5px solid ${T.color.navyBg}` }} />
            </div>
            <IconButton name="menu" onClick={() => setDrawerOpen(true)} />
          </div>
        } 
      />
      <div style={{ flex: 1, padding: 16, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', gap: 12 }}>
          <Card style={{ flex: 1, textAlign: 'center', padding: '12px 8px' }}>
            <Txt variant="h2" color={T.color.gold500}>12</Txt>
            <Txt variant="caption" color={T.color.textMuted}>TOTAL JOBS</Txt>
          </Card>
          <Card style={{ flex: 1, textAlign: 'center', padding: '12px 8px' }}>
            <Txt variant="h2" color={T.color.gold500}>2</Txt>
            <Txt variant="caption" color={T.color.textMuted}>ACTIVE JOBS</Txt>
          </Card>
        </div>

        <Banner variant="warning" title="Under verification" style={{ marginBottom: 4 }}>
          Your profile is being reviewed. This usually takes less than 24 hours.
          <button style={{ 
            background: 'none', border: 'none', color: T.color.gold500, 
            textDecoration: 'underline', padding: 0, marginLeft: 8, cursor: 'pointer' 
          }}>Check status</button>
        </Banner>

        <Card style={{
          background: `linear-gradient(135deg, ${T.color.gold500}, ${T.color.gold600})`,
          border: 'none',
        }}>
          <Txt variant="caption" color="rgba(15,25,45,0.7)" style={{ letterSpacing: '0.05em' }}>GOOD MORNING, KARIM</Txt>
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
              <Txt variant="caption" color={T.color.textMuted}>ACTIVE JOBS</Txt>
              <Txt variant="caption" color={T.color.gold500} style={{ letterSpacing: 0, cursor: 'pointer' }}>View all</Txt>
            </div>
            <Card onClick={() => onNav('jobdetail')}>
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

Object.assign(window, {
  ProgressSteps, ProgressEmployerOnlineScreen, ProgressWorkerScreen,
  CancelReasonSheet, JobCompletionScreen,
  WorkHistoryScreen, PaymentMethodsScreen, HelpScreen, TermsScreen,
  ProfileHubScreen, EmployerHomeScreen, PaymentSelectionScreen,
});
