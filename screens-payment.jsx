// Re'Loren v2 — payment, escrow, progress, cancel flows.

// ── Contact page (employer view of accepted bid) ─────────────
const ContactPageEmployerScreen = ({ onBack, onChat, onCall, onPay }) => {
  const [showToast, setShowToast] = useState(true);
  const [secondsLeft, setSecondsLeft] = useState(180); // 3 minutes

  useEffect(() => {
    if (showToast) {
      const t = setTimeout(() => setShowToast(false), 2400);
      return () => clearTimeout(t);
    }
  }, [showToast]);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const t = setInterval(() => setSecondsLeft(s => s - 1), 1000);
    return () => clearInterval(t);
  }, [secondsLeft]);

  const fmtTime = s => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: T.color.navyBg, position: 'relative' }}>
      <AppBarElevated title="Your worker" left={<BackButton onClick={onBack} />} />
      <div style={{ flex: 1, padding: 16, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 16 }}>

        {/* 3-min timer prominent */}
        <Card style={{
          background: 'rgba(239,83,80,0.08)', border: `1.5px solid ${T.color.error}`,
          textAlign: 'center', padding: 20,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 6 }}>
            <Icon name="clock" size={20} color={T.color.error} />
            <Txt variant="display" color={T.color.error} style={{ fontSize: 36, fontWeight: 800, fontVariantNumeric: 'tabular-nums' }}>
              {fmtTime(secondsLeft)}
            </Txt>
          </div>
          <Txt variant="bodySm" color={T.color.error} style={{ fontWeight: 600 }}>
            Continue within {fmtTime(secondsLeft)}
          </Txt>
          <Txt variant="caption" color={T.color.textSecondary} style={{ letterSpacing: 0, marginTop: 6, lineHeight: 1.5 }}>
            If you do not continue within the time, this job will be automatically cancelled.
          </Txt>
        </Card>

        <Card>
          <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 14 }}>
            <div style={{
              width: 64, height: 64, borderRadius: 32, background: T.color.navyDeep,
              border: `2px solid ${T.color.gold500}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: T.fontSans, fontSize: 22, fontWeight: 700, color: T.color.gold500,
            }}>RU</div>
            <div style={{ flex: 1 }}>
              <Txt variant="subtitle">Rahim Uddin</Txt>
              <RatingStars value={4.9} count={87} compact />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <SecondaryButton onClick={onChat} icon="chat" style={{ flex: 1 }}>Chat</SecondaryButton>
            <SecondaryButton onClick={onCall} icon="phone" style={{ flex: 1 }}>Call</SecondaryButton>
          </div>
        </Card>

        <Card>
          <Txt variant="caption" color={T.color.textMuted} style={{ marginBottom: 10 }}>JOB</Txt>
          <Txt variant="bodySm" style={{ marginBottom: 12 }}>Medicine delivery — Motijheel → Dhanmondi</Txt>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderTop: `1px solid ${T.color.navyBorder}` }}>
            <Txt variant="bodySm" color={T.color.textSecondary}>Agreed price</Txt>
            <Txt variant="bodySm" color={T.color.gold500} style={{ fontWeight: 600 }}>৳1,500</Txt>
          </div>
        </Card>

        <div style={{ marginTop: 'auto' }}>
          <PrimaryButton onClick={onPay}>Continue</PrimaryButton>
        </div>
      </div>

      {showToast && <Toast text="Bid accepted at ৳1,500" onDone={() => setShowToast(false)} />}
    </div>
  );
};

// ── Payment page (bKash, Nagad, or Cash) ────────────────────
const PaymentPageScreen = ({ onBack, onSelect }) => {
  const [choice, setChoice] = useState('bkash');
  const opts = [
    { id: 'bkash', title: 'bKash', sub: 'Held in escrow until job complete', color: '#E2136E', initial: 'b' },
    { id: 'nagad', title: 'Nagad', sub: 'Held in escrow until job complete', color: '#EE3124', initial: 'N' },
    { id: 'cash', title: 'Cash', sub: 'Pay worker directly in cash on delivery', color: T.color.navyDeep, initial: '৳' },
  ];
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: T.color.navyBg }}>
      <AppBarElevated title="Payment" left={<BackButton onClick={onBack} />} />
      <div style={{ flex: 1, padding: 16, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <Card style={{ background: T.color.navyDeep, textAlign: 'center', padding: 24 }}>
          <Txt variant="caption" color={T.color.textMuted} style={{ marginBottom: 6 }}>AMOUNT TO BE PAID</Txt>
          <Txt variant="display" color={T.color.gold500} style={{ fontSize: 36, fontWeight: 800 }}>৳1,500</Txt>
        </Card>
        <Txt variant="caption" color={T.color.textMuted}>PAYMENT METHOD</Txt>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {opts.map(o => (
            <button key={o.id} onClick={() => setChoice(o.id)}
              style={{
                padding: 14, borderRadius: T.radius.m, cursor: 'pointer', textAlign: 'left',
                background: choice === o.id ? 'rgba(212,175,55,0.08)' : T.color.navyRaised,
                border: `1.5px solid ${choice === o.id ? T.color.gold500 : T.color.navyBorder}`,
              }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: T.radius.s, flexShrink: 0,
                  background: o.color,
                  border: o.id === 'cash' ? `1px solid ${T.color.gold500}` : 'none',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: o.id === 'cash' ? T.color.gold500 : '#fff',
                  fontFamily: T.fontSans, fontSize: 18, fontWeight: 700,
                }}>{o.initial}</div>
                <div style={{ flex: 1 }}>
                  <Txt variant="bodySm" style={{ fontWeight: 600 }}>{o.title}</Txt>
                  <Txt variant="caption" color={T.color.textSecondary} style={{ letterSpacing: 0, marginTop: 2 }}>
                    {o.sub}
                  </Txt>
                </div>
                <div style={{
                  width: 22, height: 22, borderRadius: 11, flexShrink: 0,
                  border: `2px solid ${choice === o.id ? T.color.gold500 : T.color.navyBorder}`,
                  background: choice === o.id ? T.color.gold500 : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {choice === o.id && <div style={{ width: 8, height: 8, borderRadius: 4, background: T.color.textOnGold }} />}
                </div>
              </div>
            </button>
          ))}
        </div>
        <div style={{ marginTop: 'auto' }}>
          <PrimaryButton onClick={() => onSelect && onSelect(choice)}>Continue</PrimaryButton>
        </div>
      </div>
    </div>
  );
};

// ── Payment success popup ────────────────────────────────────
const PaymentSuccessScreen = ({ onContinue, onClose, onDownload }) => (
  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: T.color.navyBg, position: 'relative' }}>
    <AppBarElevated title="Payment" />
    <div style={{ padding: 16, opacity: 0.4 }}>
      <div style={{ height: 80, background: T.color.navyRaised, borderRadius: 12 }} />
      <div style={{ height: 100, background: T.color.navyRaised, borderRadius: 12, marginTop: 12 }} />
    </div>
    <Overlay onClose={onClose} align="center">
      <div style={{ padding: '0 20px' }}>
        <div style={{
          background: T.color.navyDeep, borderRadius: T.radius.xl,
          border: `1px solid ${T.color.navyBorder}`, padding: 24, position: 'relative',
          boxShadow: T.elevation.lg,
        }}>
          <button onClick={onClose} style={{
            position: 'absolute', top: 12, right: 12, background: 'transparent', border: 'none',
            cursor: 'pointer', padding: 6, display: 'flex',
          }}>
            <Icon name="close" size={20} color={T.color.textMuted} />
          </button>
          <div style={{ textAlign: 'center', marginBottom: 18 }}>
            <div style={{
              width: 80, height: 80, borderRadius: 40, background: 'rgba(102,187,106,0.15)',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14,
            }}>
              <Icon name="checkCircle" size={48} color={T.color.success} />
            </div>
            <Txt variant="h2" style={{ marginBottom: 8 }}>Payment secured</Txt>
            <Txt variant="bodySm" color={T.color.textSecondary} style={{ maxWidth: 280, margin: '0 auto' }}>
              ৳1,500 is held in escrow.
            </Txt>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <PrimaryButton onClick={onDownload}>Download receipt</PrimaryButton>
          </div>
        </div>
      </div>
    </Overlay>
  </div>
);

// ── Job progress (online/installment) ───────────────────────
const InstallmentTrackerScreen = ({ onBack, onDisburse, onCancel, onChat, onCall }) => {
  const inst = [
    { label: 'Installment 1', pct: 20, amount: 300, status: 'active' },
    { label: 'Installment 2', pct: 60, amount: 900, status: 'disabled' },
    { label: 'Installment 3', pct: 20, amount: 300, status: 'disabled' },
  ];
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: T.color.navyBg }}>
      <AppBarElevated title="Job Progress" left={<BackButton onClick={onBack} />} />
      <div style={{ flex: 1, padding: 16, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <Card>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 48, height: 48, borderRadius: 24, background: T.color.navyDeep,
              border: `1.5px solid ${T.color.gold500}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: T.color.gold500, fontFamily: T.fontSans, fontSize: 16, fontWeight: 700,
            }}>RU</div>
            <div style={{ flex: 1 }}>
              <Txt variant="bodySm" style={{ fontWeight: 600 }}>Rahim Uddin</Txt>
              <RatingStars value={4.9} count={87} compact />
            </div>
            <IconButton name="phone" onClick={onCall} />
            <IconButton name="chat" onClick={onChat} />
          </div>
        </Card>

        <Card style={{ background: T.color.navyDeep }}>
          <Txt variant="caption" color={T.color.textMuted} style={{ marginBottom: 6 }}>TOTAL</Txt>
          <Txt variant="h2" color={T.color.gold500}>৳1,500</Txt>
        </Card>

        <Txt variant="caption" color={T.color.textMuted}>INSTALLMENTS</Txt>
        {inst.map((x, i) => {
          const active = x.status === 'active';
          return (
            <Card key={i} style={{
              opacity: active ? 1 : 0.5,
              border: active ? `1.5px solid ${T.color.gold500}` : `1px solid ${T.color.navyBorder}`,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: active ? 14 : 0 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 18, flexShrink: 0,
                  background: active ? 'rgba(212,175,55,0.15)' : T.color.navyRaised,
                  border: `1.5px solid ${active ? T.color.gold500 : T.color.navyBorder}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: active ? T.color.gold500 : T.color.textMuted, fontFamily: T.fontSans, fontSize: 13, fontWeight: 700,
                }}>{i + 1}</div>
                <div style={{ flex: 1 }}>
                  <Txt variant="bodySm" style={{ fontWeight: 600 }}>{x.label}</Txt>
                  <Txt variant="caption" color={T.color.textMuted} style={{ letterSpacing: 0, marginTop: 2 }}>
                    {x.pct}% · {fmtBDT(x.amount)}
                  </Txt>
                </div>
                <StatusPill variant={active ? 'bidding' : 'pending'}>{active ? 'Active' : 'Pending'}</StatusPill>
              </div>
              {active && (
                <div style={{ display: 'flex', gap: 10 }}>
                  <DestructiveButton style={{ flex: 1, minHeight: 40, fontSize: 14 }} onClick={onCancel}>Cancel job</DestructiveButton>
                  <PrimaryButton style={{ flex: 1, minHeight: 40, fontSize: 14 }} onClick={onDisburse}>Disburse amount</PrimaryButton>
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
};

// ── Job progress (cash) ─────────────────────────────────────
const CashConfirmationScreen = ({ onBack, onConfirm, onCancel, onChat, onCall }) => {
  const [code, setCode] = useState('');
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: T.color.navyBg }}>
      <AppBarElevated title="Job Progress" left={<BackButton onClick={onBack} />} />
      <div style={{ flex: 1, padding: 16, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <Card>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 48, height: 48, borderRadius: 24, background: T.color.navyDeep,
              border: `1.5px solid ${T.color.gold500}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: T.color.gold500, fontFamily: T.fontSans, fontSize: 16, fontWeight: 700,
            }}>RU</div>
            <div style={{ flex: 1 }}>
              <Txt variant="bodySm" style={{ fontWeight: 600 }}>Rahim Uddin</Txt>
              <RatingStars value={4.9} count={87} compact />
            </div>
            <IconButton name="phone" onClick={onCall} />
            <IconButton name="chat" onClick={onChat} />
          </div>
        </Card>

        <Card style={{ background: T.color.navyDeep, textAlign: 'center', padding: 20 }}>
          <Txt variant="caption" color={T.color.textMuted} style={{ marginBottom: 6 }}>AMOUNT TO BE PAID</Txt>
          <Txt variant="display" color={T.color.gold500} style={{ fontSize: 36, fontWeight: 800 }}>৳1,500</Txt>
        </Card>

        <div>
          <Txt variant="caption" color={T.color.textMuted} style={{ marginBottom: 8, textAlign: 'center', display: 'block' }}>
            ENTER 4-DIGIT CODE FROM WORKER
          </Txt>
          <OtpInput length={4} value={code} onChange={setCode} />
        </div>

        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 10, paddingBottom: 16 }}>
          <PrimaryButton onClick={onConfirm} disabled={code.length < 4}>Complete this Job</PrimaryButton>
          <DestructiveButton onClick={onCancel}>Cancel job</DestructiveButton>
        </div>
      </div>
    </div>
  );
};

// ── Job start code page (employer post-payment) ─────────────
const JobStartCodeScreen = ({ onBack, onStart, onChat, onCall }) => {
  const [code, setCode] = useState('4821');
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: T.color.navyBg }}>
      <AppBarElevated title="Start Job" left={<BackButton onClick={onBack} />} />
      <div style={{ flex: 1, padding: 16, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <Card style={{ background: T.color.navyDeep }}>
          <Txt variant="caption" color={T.color.textMuted} style={{ marginBottom: 4 }}>JOB</Txt>
          <Txt variant="bodySm" style={{ fontWeight: 600, marginBottom: 8 }}>Medicine delivery — Motijheel → Dhanmondi</Txt>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderTop: `1px solid ${T.color.navyBorder}` }}>
            <Txt variant="caption" color={T.color.textSecondary}>Amount</Txt>
            <Txt variant="bodySm" color={T.color.gold500} style={{ fontWeight: 600 }}>৳1,500</Txt>
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
              <Txt variant="bodySm" style={{ fontWeight: 600 }}>Rahim Uddin</Txt>
              <RatingStars value={4.9} count={87} compact />
            </div>
            <IconButton name="phone" onClick={onCall} />
            <IconButton name="chat" onClick={onChat} />
          </div>
        </Card>

        <Card style={{ textAlign: 'center', padding: 20 }}>
          <Txt variant="caption" color={T.color.textMuted} style={{ marginBottom: 10 }}>SHARE THIS 4-DIGIT CODE WITH WORKER</Txt>
          <div style={{
            background: T.color.navyDeep, border: `2px dashed ${T.color.gold500}`,
            padding: '16px 24px', borderRadius: T.radius.m, marginBottom: 8,
          }}>
            <Txt variant="display" color={T.color.gold500} style={{ fontSize: 36, fontWeight: 800, letterSpacing: 8 }}>{code}</Txt>
          </div>
          <Txt variant="caption" color={T.color.textMuted} style={{ letterSpacing: 0 }}>
            Worker enters this code to start the job
          </Txt>
        </Card>

        <div style={{ marginTop: 'auto', paddingBottom: 16 }}>
          <PrimaryButton onClick={onStart}>Start Job</PrimaryButton>
        </div>
      </div>
    </div>
  );
};

// ── Worker contact page (offer accepted) ────────────────────
const WorkerContactPageScreen = ({ onBack, onChat, onCall, onViewReview, onStart }) => {
  const [showToast, setShowToast] = useState(true);
  const [code, setCode] = useState('');

  useEffect(() => {
    if (showToast) {
      const t = setTimeout(() => setShowToast(false), 2400);
      return () => clearTimeout(t);
    }
  }, [showToast]);

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: T.color.navyBg, position: 'relative' }}>
      <AppBarElevated title="Your employer" left={<BackButton onClick={onBack} />} />
      <div style={{ flex: 1, padding: 16, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <Banner variant="success" title="Offer accepted">
          The employer accepted your offer. Get the 4-digit code from them to start.
        </Banner>

        <Card>
          <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 12 }}>
            <div style={{
              width: 64, height: 64, borderRadius: 32, background: T.color.navyDeep,
              border: `2px solid ${T.color.gold500}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: T.fontSans, fontSize: 22, fontWeight: 700, color: T.color.gold500,
            }}>KA</div>
            <div style={{ flex: 1 }}>
              <Txt variant="subtitle">Karim Ahmed</Txt>
              <RatingStars value={4.8} count={142} compact />
            </div>
          </div>
          <button onClick={onViewReview} style={{
            background: 'none', border: 'none', color: T.color.gold500,
            fontFamily: T.fontSans, fontSize: 13, fontWeight: 600, cursor: 'pointer', padding: 0,
            textDecoration: 'underline', marginBottom: 12, display: 'block',
          }}>View reviews →</button>
          <div style={{ display: 'flex', gap: 10 }}>
            <SecondaryButton onClick={onChat} icon="chat" style={{ flex: 1 }}>Chat</SecondaryButton>
            <SecondaryButton onClick={onCall} icon="phone" style={{ flex: 1 }}>Call</SecondaryButton>
          </div>
        </Card>

        <Card>
          <Txt variant="caption" color={T.color.textMuted} style={{ marginBottom: 8 }}>JOB</Txt>
          <Txt variant="bodySm" style={{ fontWeight: 600, marginBottom: 8 }}>Medicine delivery — Motijheel → Dhanmondi</Txt>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderTop: `1px solid ${T.color.navyBorder}` }}>
            <Txt variant="bodySm" color={T.color.textSecondary}>Budget</Txt>
            <Txt variant="bodySm" color={T.color.gold500} style={{ fontWeight: 600 }}>৳1,500</Txt>
          </div>
        </Card>

        <div>
          <Txt variant="caption" color={T.color.textMuted} style={{ marginBottom: 8, textAlign: 'center', display: 'block' }}>
            ENTER 4-DIGIT CODE FROM EMPLOYER
          </Txt>
          <OtpInput length={4} value={code} onChange={setCode} />
        </div>

        <div style={{ marginTop: 'auto', paddingBottom: 16 }}>
          <PrimaryButton onClick={onStart} disabled={code.length < 4}>Start Job</PrimaryButton>
        </div>
      </div>
      {showToast && <Toast text="Offer accepted by Karim Ahmed" onDone={() => setShowToast(false)} />}
    </div>
  );
};

// ── Worker job progress (online — installments) ─────────────
const WorkerJobProgressOnlineScreen = ({ onBack, onCancel, onChat, onCall }) => {
  const inst = [
    { label: 'Installment 1', pct: 20, amount: 300, status: 'paid' },
    { label: 'Installment 2', pct: 60, amount: 900, status: 'active' },
    { label: 'Installment 3', pct: 20, amount: 300, status: 'pending' },
  ];
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: T.color.navyBg }}>
      <AppBarElevated title="Job Progress" left={<BackButton onClick={onBack} />} />
      <div style={{ flex: 1, padding: 16, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <Card>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 48, height: 48, borderRadius: 24, background: T.color.navyDeep,
              border: `1.5px solid ${T.color.gold500}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: T.color.gold500, fontFamily: T.fontSans, fontSize: 16, fontWeight: 700,
            }}>KA</div>
            <div style={{ flex: 1 }}>
              <Txt variant="bodySm" style={{ fontWeight: 600 }}>Karim Ahmed</Txt>
              <RatingStars value={4.8} count={142} compact />
            </div>
            <IconButton name="phone" onClick={onCall} />
            <IconButton name="chat" onClick={onChat} />
          </div>
        </Card>

        <Card style={{ background: T.color.navyDeep }}>
          <Txt variant="caption" color={T.color.textMuted}>JOB</Txt>
          <Txt variant="bodySm" style={{ marginTop: 4, marginBottom: 8 }}>Medicine delivery — Motijheel → Dhanmondi</Txt>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Txt variant="caption" color={T.color.textSecondary}>Budget</Txt>
            <Txt variant="bodySm" color={T.color.gold500} style={{ fontWeight: 600 }}>৳1,500</Txt>
          </div>
        </Card>

        <Txt variant="caption" color={T.color.textMuted}>INSTALLMENTS</Txt>
        {inst.map((x, i) => {
          const active = x.status === 'active' || x.status === 'paid';
          const isPaid = x.status === 'paid';
          return (
            <Card key={i} style={{
              opacity: active ? 1 : 0.5,
              border: x.status === 'active' ? `1.5px solid ${T.color.gold500}` : `1px solid ${T.color.navyBorder}`,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 18, flexShrink: 0,
                  background: isPaid ? 'rgba(102,187,106,0.15)' : x.status === 'active' ? 'rgba(212,175,55,0.15)' : T.color.navyRaised,
                  border: `1.5px solid ${isPaid ? T.color.success : x.status === 'active' ? T.color.gold500 : T.color.navyBorder}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Icon name={isPaid ? 'check' : 'clock'} size={16} color={isPaid ? T.color.success : x.status === 'active' ? T.color.gold500 : T.color.textMuted} />
                </div>
                <div style={{ flex: 1 }}>
                  <Txt variant="bodySm" style={{ fontWeight: 600 }}>{x.label}</Txt>
                  <Txt variant="caption" color={T.color.textMuted} style={{ letterSpacing: 0, marginTop: 2 }}>
                    {x.pct}% · {fmtBDT(x.amount)}
                  </Txt>
                </div>
                <StatusPill variant={isPaid ? 'success' : x.status === 'active' ? 'bidding' : 'pending'}>
                  {isPaid ? 'Completed' : x.status === 'active' ? 'In progress' : 'Pending'}
                </StatusPill>
              </div>
            </Card>
          );
        })}

        <div style={{ marginTop: 'auto', paddingBottom: 16 }}>
          <DestructiveButton onClick={onCancel}>Cancel this job</DestructiveButton>
        </div>
      </div>
    </div>
  );
};

// ── Worker job progress (cash) ──────────────────────────────
const WorkerJobProgressCashScreen = ({ onBack, onSubmit, onCancel, onChat, onCall }) => {
  const [code, setCode] = useState('');
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: T.color.navyBg }}>
      <AppBarElevated title="Job Progress" left={<BackButton onClick={onBack} />} />
      <div style={{ flex: 1, padding: 16, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <Card>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 48, height: 48, borderRadius: 24, background: T.color.navyDeep,
              border: `1.5px solid ${T.color.gold500}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: T.color.gold500, fontFamily: T.fontSans, fontSize: 16, fontWeight: 700,
            }}>KA</div>
            <div style={{ flex: 1 }}>
              <Txt variant="bodySm" style={{ fontWeight: 600 }}>Karim Ahmed</Txt>
              <RatingStars value={4.8} count={142} compact />
            </div>
            <IconButton name="phone" onClick={onCall} />
            <IconButton name="chat" onClick={onChat} />
          </div>
        </Card>

        <Card style={{ background: T.color.navyDeep }}>
          <Txt variant="caption" color={T.color.textMuted}>JOB</Txt>
          <Txt variant="bodySm" style={{ marginTop: 4, marginBottom: 8 }}>Medicine delivery — Motijheel → Dhanmondi</Txt>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Txt variant="caption" color={T.color.textSecondary}>Budget (cash)</Txt>
            <Txt variant="bodySm" color={T.color.gold500} style={{ fontWeight: 600 }}>৳1,500</Txt>
          </div>
        </Card>

        <Txt variant="bodySm" color={T.color.textSecondary} style={{ textAlign: 'center', lineHeight: 1.5 }}>
          Put a 4 digit and complete the job if you received the amount
        </Txt>
        <OtpInput length={4} value={code} onChange={setCode} />

        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 10, paddingBottom: 16 }}>
          <PrimaryButton onClick={onSubmit} disabled={code.length < 4}>Submit</PrimaryButton>
          <DestructiveButton onClick={onCancel}>Cancel this job</DestructiveButton>
        </div>
      </div>
    </div>
  );
};

// ── Cash job — no payment method warning ────────────────────
const CashJobNoMethodWarningScreen = ({ onClose, onAddMethod }) => (
  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: T.color.navyBg, position: 'relative' }}>
    <AppBarElevated title="Active Job" />
    <div style={{ padding: 16, opacity: 0.4 }}>
      <div style={{ height: 80, background: T.color.navyRaised, borderRadius: 12 }} />
      <div style={{ height: 100, background: T.color.navyRaised, borderRadius: 12, marginTop: 12 }} />
    </div>
    <Overlay onClose={onClose} align="center">
      <div style={{ padding: '0 20px' }}>
        <div style={{
          background: T.color.navyDeep, borderRadius: T.radius.xl,
          border: `1px solid ${T.color.warning}`, padding: 24,
          boxShadow: T.elevation.lg,
        }}>
          <div style={{ textAlign: 'center', marginBottom: 18 }}>
            <div style={{
              width: 72, height: 72, borderRadius: 36, background: 'rgba(255,167,38,0.15)',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14,
            }}>
              <Icon name="warning" size={40} color={T.color.warning} />
            </div>
            <Txt variant="title" style={{ marginBottom: 8 }}>No payment method</Txt>
            <Txt variant="bodySm" color={T.color.textSecondary} style={{ lineHeight: 1.5 }}>
              You don't have a payment method added. To receive cash payments, you need bKash or Nagad linked so the platform commission can be deducted.
            </Txt>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <PrimaryButton onClick={onAddMethod}>Add payment method</PrimaryButton>
            <SecondaryButton onClick={onClose}>Not now</SecondaryButton>
          </div>
        </div>
      </div>
    </Overlay>
  </div>
);

// ── Add payment method picker (Bkash or Nagad) ──────────────
const AddPaymentMethodPickerScreen = ({ onBack, onProceed }) => {
  const [pick, setPick] = useState('bkash');
  const opts = [
    { id: 'bkash', name: 'bKash', sub: 'Most popular in Bangladesh', color: '#E2136E', initial: 'b' },
    { id: 'nagad', name: 'Nagad', sub: 'Bangladesh Post Office MFS', color: '#EE3124', initial: 'N' },
  ];
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: T.color.navyBg }}>
      <AppBarElevated title="Add Payment Method" left={<BackButton onClick={onBack} />} />
      <div style={{ flex: 1, padding: 16, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <Txt variant="caption" color={T.color.textMuted}>CHOOSE PROVIDER</Txt>
        {opts.map(o => (
          <button key={o.id} onClick={() => setPick(o.id)} style={{
            padding: 16, borderRadius: T.radius.m, cursor: 'pointer', textAlign: 'left',
            background: pick === o.id ? 'rgba(212,175,55,0.08)' : T.color.navyRaised,
            border: `1.5px solid ${pick === o.id ? T.color.gold500 : T.color.navyBorder}`,
            display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <div style={{
              width: 44, height: 44, borderRadius: T.radius.s, flexShrink: 0,
              background: o.color, display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontFamily: T.fontSans, fontSize: 18, fontWeight: 700,
            }}>{o.initial}</div>
            <div style={{ flex: 1 }}>
              <Txt variant="bodySm" style={{ fontWeight: 600 }}>{o.name}</Txt>
              <Txt variant="caption" color={T.color.textMuted} style={{ letterSpacing: 0, marginTop: 2 }}>
                {o.sub}
              </Txt>
            </div>
            {pick === o.id && <Icon name="checkCircle" size={20} color={T.color.gold500} />}
          </button>
        ))}
        <Banner variant="info">You will be redirected to the provider's portal to authorize.</Banner>
        <div style={{ marginTop: 'auto', paddingBottom: 16 }}>
          <PrimaryButton onClick={() => onProceed && onProceed(pick)}>Proceed to {opts.find(o => o.id === pick).name}</PrimaryButton>
        </div>
      </div>
    </div>
  );
};

// ── Payment method added success ────────────────────────────
const PaymentMethodAddedSuccessScreen = ({ provider = 'bKash', onDone }) => (
  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: T.color.navyBg,
    alignItems: 'center', justifyContent: 'center', padding: 24, gap: 16 }}>
    <div style={{
      width: 96, height: 96, borderRadius: 48, background: 'rgba(102,187,106,0.15)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <Icon name="checkCircle" size={56} color={T.color.success} />
    </div>
    <Txt variant="h2" style={{ textAlign: 'center' }}>Payment method added</Txt>
    <Txt variant="body" color={T.color.textSecondary} style={{ textAlign: 'center', maxWidth: 280 }}>
      Your {provider} account is now linked. You can use it for payments and disbursements.
    </Txt>
    <div style={{ width: '100%', marginTop: 'auto' }}>
      <PrimaryButton onClick={onDone}>Done</PrimaryButton>
    </div>
  </div>
);

Object.assign(window, {
  ContactPageEmployerScreen, PaymentPageScreen,
  PaymentSuccessScreen,
  InstallmentTrackerScreen, CashConfirmationScreen,
  JobStartCodeScreen,
  WorkerContactPageScreen,
  WorkerJobProgressOnlineScreen, WorkerJobProgressCashScreen,
  CashJobNoMethodWarningScreen,
  AddPaymentMethodPickerScreen, PaymentMethodAddedSuccessScreen,
});
