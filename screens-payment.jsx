// Re'Loren v2 — payment, escrow, progress, cancel flows.

// ── Contact page (employer view of accepted bid) ─────────────
const ContactPageEmployerScreen = ({ onBack, onChat, onCall, onPay }) => (
  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: T.color.navyBg }}>
    <AppBarElevated title="Your worker" left={<BackButton onClick={onBack} />} />
    <div style={{ flex: 1, padding: 16, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Banner variant="success" title="Bid accepted">
        Rahim Uddin accepted at ৳1,500. Payment secures the booking.
      </Banner>
      <Card>
        <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 14 }}>
          <div style={{
            width: 64, height: 64, borderRadius: 32, background: T.color.navyDeep,
            border: `2px solid ${T.color.gold500}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: T.fontSans, fontSize: 22, fontWeight: 700, color: T.color.gold500,
          }}>RU</div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Txt variant="subtitle">Rahim Uddin</Txt>
              <VerifiedBadge />
            </div>
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
      <Banner variant="warning" title="Payment not started">
        Work can't begin until you pay or choose Cash on Delivery.
      </Banner>
      <div style={{ marginTop: 'auto' }}>
        <PrimaryButton onClick={onPay}>Pay now</PrimaryButton>
      </div>
    </div>
  </div>
);

// ── Payment page ─────────────────────────────────────────────
const PaymentPageScreen = ({ onBack, onSelect }) => {
  const [choice, setChoice] = useState('online');
  const opts = [
    { id: 'online', title: 'Pay online now', sub: 'bKash, card, or bank', badge: 'Instant' },
    { id: 'installment', title: 'Pay in 2 installments', sub: '৳750 now · ৳750 on completion', badge: 'Flexible' },
    { id: 'cash', title: 'Cash on Delivery', sub: 'Pay worker in cash, confirm in app', badge: 'Informal' },
  ];
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: T.color.navyBg }}>
      <AppBarElevated title="Payment" left={<BackButton onClick={onBack} />} />
      <div style={{ flex: 1, padding: 16, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <Card style={{ background: T.color.navyDeep }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <Txt variant="bodySm" color={T.color.textSecondary}>Amount due</Txt>
            <Txt variant="subtitle" color={T.color.gold500}>৳1,500</Txt>
          </div>
          <Txt variant="caption" color={T.color.textMuted} style={{ letterSpacing: 0 }}>
            Medicine delivery · Rahim Uddin
          </Txt>
        </Card>
        <Txt variant="caption" color={T.color.textMuted}>PAYMENT METHOD</Txt>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {opts.map(o => (
            <button key={o.id} onClick={() => setChoice(o.id)}
              style={{
                padding: 16, borderRadius: T.radius.m, cursor: 'pointer', textAlign: 'left',
                background: choice === o.id ? 'rgba(212,175,55,0.08)' : T.color.navyRaised,
                border: `1.5px solid ${choice === o.id ? T.color.gold500 : T.color.navyBorder}`,
              }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <div style={{
                  width: 22, height: 22, borderRadius: 11, marginTop: 2, flexShrink: 0,
                  border: `2px solid ${choice === o.id ? T.color.gold500 : T.color.navyBorder}`,
                  background: choice === o.id ? T.color.gold500 : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {choice === o.id && <div style={{ width: 8, height: 8, borderRadius: 4, background: T.color.textOnGold }} />}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Txt variant="bodySm" style={{ fontWeight: 600 }}>{o.title}</Txt>
                    <span style={{
                      padding: '2px 8px', borderRadius: 10, fontSize: 10, fontWeight: 600,
                      fontFamily: T.fontSans, letterSpacing: '0.05em',
                      background: 'rgba(212,175,55,0.15)', color: T.color.gold500,
                    }}>{o.badge.toUpperCase()}</span>
                  </div>
                  <Txt variant="caption" color={T.color.textSecondary} style={{ letterSpacing: 0, marginTop: 4 }}>
                    {o.sub}
                  </Txt>
                </div>
              </div>
            </button>
          ))}
        </div>
        <Banner variant="info">Your money is held in escrow and released when the job is marked complete.</Banner>
        <div style={{ marginTop: 'auto' }}>
          <PrimaryButton onClick={() => onSelect(choice)}>Continue</PrimaryButton>
        </div>
      </div>
    </div>
  );
};

// ── Gateway picker ───────────────────────────────────────────
const GatewayPickerSheet = ({ onClose, onPick }) => {
  const [pick, setPick] = useState('bkash');
  const gateways = [
    { id: 'bkash', name: 'bKash', sub: 'Most popular in Bangladesh', color: '#E2136E', initials: 'b' },
    { id: 'nagad', name: 'Nagad', sub: 'Mobile financial services', color: '#EE3124', initials: 'N' },
    { id: 'rocket', name: 'Rocket', sub: 'Dutch-Bangla mobile banking', color: '#8C3D90', initials: 'R' },
    { id: 'card', name: 'Debit / Credit card', sub: 'Visa, Mastercard, local cards', color: T.color.info, initials: '💳' },
    { id: 'bank', name: 'Bank transfer', sub: 'All major BD banks', color: T.color.gold500, initials: '🏦' },
  ];
  return (
    <BottomSheet onClose={onClose} title="Choose a gateway">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {gateways.map(g => (
          <button key={g.id} onClick={() => setPick(g.id)}
            style={{
              padding: 14, borderRadius: T.radius.m, cursor: 'pointer', textAlign: 'left',
              background: pick === g.id ? 'rgba(212,175,55,0.08)' : T.color.navyRaised,
              border: `1.5px solid ${pick === g.id ? T.color.gold500 : T.color.navyBorder}`,
              display: 'flex', alignItems: 'center', gap: 12,
            }}>
            <div style={{
              width: 40, height: 40, borderRadius: T.radius.s, flexShrink: 0,
              background: g.color, display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontFamily: T.fontSans, fontSize: 18, fontWeight: 700,
            }}>{g.initials}</div>
            <div style={{ flex: 1 }}>
              <Txt variant="bodySm" style={{ fontWeight: 600 }}>{g.name}</Txt>
              <Txt variant="caption" color={T.color.textMuted} style={{ letterSpacing: 0, marginTop: 2 }}>
                {g.sub}
              </Txt>
            </div>
            {pick === g.id && <Icon name="checkCircle" size={20} color={T.color.gold500} />}
          </button>
        ))}
      </div>
      <div style={{ marginTop: 16 }}>
        <PrimaryButton onClick={() => onPick(pick)}>Continue to gateway</PrimaryButton>
      </div>
    </BottomSheet>
  );
};

// ── Gateway redirect (fake bKash splash) ─────────────────────
const GatewayRedirectScreen = ({ onBack, onSuccess }) => {
  useEffect(() => { const t = setTimeout(onSuccess, 2400); return () => clearTimeout(t); }, []);
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#E2136E' }}>
      <div style={{ display: 'flex', alignItems: 'center', padding: '12px 16px' }}>
        <IconButton name="close" onClick={onBack} color="#fff" />
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
        <div style={{
          width: 80, height: 80, borderRadius: 20, background: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#E2136E', fontFamily: T.fontSans, fontSize: 44, fontWeight: 800,
        }}>b</div>
        <Txt variant="h2" color="#fff">bKash</Txt>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#fff' }}>
          <div style={{
            width: 16, height: 16, borderRadius: 8, border: '2px solid rgba(255,255,255,0.3)',
            borderTopColor: '#fff', animation: 'spin 0.8s linear infinite',
          }} />
          <Txt variant="bodySm" color="#fff">Processing payment…</Txt>
        </div>
        <Txt variant="caption" color="rgba(255,255,255,0.7)" style={{ letterSpacing: 0 }}>
          ৳1,500 to Re'Loren Escrow
        </Txt>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

// ── Payment success ──────────────────────────────────────────
const PaymentSuccessScreen = ({ onContinue }) => (
  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: T.color.navyBg,
    alignItems: 'center', justifyContent: 'center', padding: 24, gap: 16 }}>
    <div style={{
      width: 96, height: 96, borderRadius: 48, background: 'rgba(102,187,106,0.15)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <Icon name="checkCircle" size={56} color={T.color.success} />
    </div>
    <Txt variant="h2" style={{ textAlign: 'center' }}>Payment secured</Txt>
    <Txt variant="body" color={T.color.textSecondary} style={{ textAlign: 'center', maxWidth: 280 }}>
      ৳1,500 is held in escrow. Rahim can now start the job.
    </Txt>
    <Card style={{ width: '100%' }}>
      {[
        ['Amount', '৳1,500'],
        ['Gateway', 'bKash'],
        ['Transaction ID', 'TXN-20260424-9847'],
        ['Paid at', '24/04/2026 · 10:55 AM'],
      ].map(([k, v]) => (
        <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: `1px solid ${T.color.navyBorder}` }}>
          <Txt variant="bodySm" color={T.color.textSecondary}>{k}</Txt>
          <Txt variant="bodySm" style={{ fontWeight: 500 }}>{v}</Txt>
        </div>
      ))}
    </Card>
    <div style={{ width: '100%', marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 10 }}>
      <PrimaryButton onClick={onContinue}>Track the job</PrimaryButton>
      <SecondaryButton>Download receipt</SecondaryButton>
    </div>
  </div>
);

// ── Installment tracker ──────────────────────────────────────
const InstallmentTrackerScreen = ({ onBack, onPayNext }) => {
  const inst = [
    { label: 'Installment 1', amount: 750, status: 'paid', date: '24/04/2026' },
    { label: 'Installment 2', amount: 750, status: 'pending', date: 'On completion' },
  ];
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: T.color.navyBg }}>
      <AppBarElevated title="Installments" subtitle="2 payments" left={<BackButton onClick={onBack} />} />
      <div style={{ flex: 1, padding: 16, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Card style={{ background: T.color.navyDeep }}>
          <Txt variant="caption" color={T.color.textMuted} style={{ marginBottom: 6 }}>TOTAL</Txt>
          <Txt variant="h2" color={T.color.gold500}>৳1,500</Txt>
          <div style={{ height: 8, background: T.color.navyBorder, borderRadius: 4, marginTop: 14, overflow: 'hidden' }}>
            <div style={{ width: '50%', height: '100%', background: T.color.gold500 }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
            <Txt variant="caption" color={T.color.textMuted} style={{ letterSpacing: 0 }}>৳750 paid</Txt>
            <Txt variant="caption" color={T.color.textMuted} style={{ letterSpacing: 0 }}>৳750 remaining</Txt>
          </div>
        </Card>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {inst.map((x, i) => (
            <Card key={i}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 32, height: 32, borderRadius: 16, flexShrink: 0,
                  background: x.status === 'paid' ? 'rgba(102,187,106,0.15)' : 'rgba(255,167,38,0.15)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Icon name={x.status === 'paid' ? 'checkCircle' : 'clock'} size={18}
                    color={x.status === 'paid' ? T.color.success : T.color.warning} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Txt variant="bodySm" style={{ fontWeight: 600 }}>{x.label}</Txt>
                    <Txt variant="bodySm" color={T.color.gold500} style={{ fontWeight: 600 }}>{fmtBDT(x.amount)}</Txt>
                  </div>
                  <Txt variant="caption" color={T.color.textMuted} style={{ letterSpacing: 0, marginTop: 2 }}>
                    {x.status === 'paid' ? `Paid ${x.date}` : x.date}
                  </Txt>
                </div>
              </div>
            </Card>
          ))}
        </div>
        <Banner variant="info">The second installment auto-releases when you confirm completion.</Banner>
        <div style={{ marginTop: 'auto' }}>
          <PrimaryButton onClick={onPayNext} disabled>Next installment after completion</PrimaryButton>
        </div>
      </div>
    </div>
  );
};

// ── Cash on delivery log (employer confirms) ─────────────────
const CashConfirmationScreen = ({ onBack, onConfirm }) => {
  const [amount, setAmount] = useState('1500');
  const [ack, setAck] = useState(false);
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: T.color.navyBg }}>
      <AppBarElevated title="Log cash payment" left={<BackButton onClick={onBack} />} />
      <div style={{ flex: 1, padding: 16, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Banner variant="warning" title="Cash = limited protection">
          Re'Loren can't verify cash payments. Only log what you actually handed over.
        </Banner>
        <TextField label="Amount you paid (BDT)" value={amount}
          onChange={v => setAmount(v.replace(/\D/g, ''))}
          prefix={<span style={{ color: T.color.gold500, fontWeight: 600 }}>৳</span>} />
        <div>
          <Txt variant="caption" color={T.color.textMuted} style={{ marginBottom: 6 }}>PAID TO</Txt>
          <Card style={{ padding: 12, display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 40, height: 40, borderRadius: 20, background: T.color.navyDeep,
              border: `1.5px solid ${T.color.gold500}`, display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: T.color.gold500, fontFamily: T.fontSans, fontSize: 14, fontWeight: 700,
            }}>RU</div>
            <div>
              <Txt variant="bodySm" style={{ fontWeight: 500 }}>Rahim Uddin</Txt>
              <Txt variant="caption" color={T.color.textMuted} style={{ letterSpacing: 0 }}>Worker</Txt>
            </div>
          </Card>
        </div>
        <Checkbox checked={ack} label="I confirm this amount was handed to the worker in cash."
          onClick={() => setAck(!ack)} />
        <div style={{ marginTop: 'auto' }}>
          <PrimaryButton onClick={onConfirm} disabled={!amount || !ack}>Log payment</PrimaryButton>
        </div>
      </div>
    </div>
  );
};

Object.assign(window, {
  ContactPageEmployerScreen, PaymentPageScreen, GatewayPickerSheet,
  GatewayRedirectScreen, PaymentSuccessScreen,
  InstallmentTrackerScreen, CashConfirmationScreen,
});
