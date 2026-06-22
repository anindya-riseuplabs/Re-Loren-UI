// Re'Loren v2 — round-2 additions:
//   WorkerHomeScreen, OnlineJobFeedScreen, ClientPostedJobsScreen, ComplaintsReportsScreen.
// Depends on globals from components.jsx / data.jsx (loaded earlier).

// ── Worker home window (dedicated) ───────────────────────────
// Worker landing with profile summary + two job-mode entries
// (Online · Physical/Asset). Each button shows the available-job count.
const WorkerHomeScreen = ({ onOpenOnline, onOpenPhysical, onNav, verified = true }) => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const counts = { online: 12, physical: 8 };
  const modeBtn = {
    position: 'relative', flex: 1, minHeight: 110, borderRadius: T.radius.l, cursor: 'pointer',
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10,
    background: T.color.navyRaised, border: `1.5px solid ${T.color.navyBorder}`,
    color: T.color.textPrimary, fontFamily: T.fontSans, fontSize: 14, fontWeight: 600, padding: 10, textAlign: 'center',
  };
  const badge = {
    position: 'absolute', top: 8, right: 8, minWidth: 24, height: 22, padding: '0 7px',
    borderRadius: 11, background: T.color.gold500, color: T.color.textOnGold,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontFamily: T.fontSans, fontSize: 12, fontWeight: 800,
  };
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: T.color.navyBg }}>
      <Drawer isOpen={isDrawerOpen} onClose={() => setDrawerOpen(false)} onNav={onNav} />
      <AppBarElevated
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
            <div style={{ width: 36, height: 36, borderRadius: 18, background: T.color.navyDeep, border: `1px solid ${T.color.gold500}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: T.color.gold500, fontSize: 13, fontWeight: 700, flexShrink: 0 }}>RU</div>
            <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Txt variant="bodySm" style={{ fontWeight: 600, lineHeight: 1.2, whiteSpace: 'nowrap' }}>Rahim Uddin</Txt>
                <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Icon name="starFill" size={10} color={T.color.gold500} />
                  <Txt variant="caption" color={T.color.gold500} style={{ fontSize: 10 }}>4.9</Txt>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 3, marginTop: 1 }}>
                <Icon name="location" size={10} color={T.color.textMuted} />
                <Txt variant="caption" color={T.color.textMuted} style={{ letterSpacing: 0, fontSize: 10, whiteSpace: 'nowrap' }}>Motijheel, Dhaka</Txt>
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
        {/* worker summary */}
        <Card style={{ background: T.color.navyDeep }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 52, height: 52, borderRadius: 26, background: T.color.navyRaised, border: `2px solid ${T.color.gold500}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: T.color.gold500, fontFamily: T.fontSans, fontSize: 18, fontWeight: 700 }}>RU</div>
            <div style={{ flex: 1 }}>
              <Txt variant="subtitle">Rahim Uddin</Txt>
              <RatingStars value={4.9} count={87} compact />
            </div>
            {verified
              ? <VerifiedBadge label="NID verified" />
              : <StatusPill variant="pending">Under review</StatusPill>}
          </div>
          <div style={{ display: 'flex', marginTop: 14, paddingTop: 14, borderTop: `1px solid ${T.color.navyBorder}` }}>
            <div style={{ flex: 1, textAlign: 'center' }}>
              <Txt variant="bodySm" color={T.color.gold500} style={{ fontWeight: 700 }}>14</Txt>
              <Txt variant="caption" color={T.color.textMuted} style={{ letterSpacing: 0 }}>Jobs done</Txt>
            </div>
            <div style={{ flex: 1, textAlign: 'center', borderLeft: `1px solid ${T.color.navyBorder}` }}>
              <Txt variant="bodySm" color={T.color.gold500} style={{ fontWeight: 700 }}>{fmtBDT(12485)}</Txt>
              <Txt variant="caption" color={T.color.textMuted} style={{ letterSpacing: 0 }}>Earned</Txt>
            </div>
            <div style={{ flex: 1, textAlign: 'center', borderLeft: `1px solid ${T.color.navyBorder}` }}>
              <Txt variant="bodySm" color={T.color.gold500} style={{ fontWeight: 700 }}>2</Txt>
              <Txt variant="caption" color={T.color.textMuted} style={{ letterSpacing: 0 }}>Active bids</Txt>
            </div>
          </div>
        </Card>

        {!verified && (
          <Banner variant="warning" title="Verification under review">
            Your NID is being reviewed. You can browse jobs but can't accept offers or bid until it's approved.
          </Banner>
        )}

        <Txt variant="caption" color={T.color.textMuted}>FIND WORK</Txt>
        <div style={{ display: 'flex', gap: 12 }}>
          <button onClick={onOpenOnline} style={modeBtn}>
            <span style={badge}>{counts.online}</span>
            <Icon name="globe" size={30} color={T.color.gold500} />
            Online
          </button>
          <button onClick={onOpenPhysical} style={modeBtn}>
            <span style={badge}>{counts.physical}</span>
            <Icon name="truck" size={30} color={T.color.gold500} />
            Physical Job / Asset Service
          </button>
        </div>

        <Card onClick={() => onNav && onNav('bids')}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <Txt variant="bodySm" style={{ fontWeight: 600 }}>My bidded jobs</Txt>
              <Txt variant="caption" color={T.color.textMuted} style={{ letterSpacing: 0 }}>2 active · view all</Txt>
            </div>
            <Icon name="chevron" size={18} color={T.color.textMuted} />
          </div>
        </Card>
      </div>
    </div>
  );
};

// ── Online job feed (no map) ─────────────────────────────────
// Separate from the physical feed: no map, "Immediately Hiring" vs
// "Still Active" segments, country shown bottom-right of each card.
// Long-duration jobs appear under "Still Active". Accept gated by NID.
const ONLINE_JOBS = [
  { id: 'o1', title: 'Logo design for a Dhaka cafe', price: 4500, type: 'instant', country: 'Bangladesh' },
  { id: 'o2', title: 'Translate 5 documents (EN → Arabic)', price: 3000, type: 'instant', country: 'UAE' },
  { id: 'o3', title: 'Data entry — 200 product rows', price: 1200, type: 'regular', country: 'Bangladesh' },
  { id: 'o4', title: 'French voice-over — 2 min script', price: 5200, type: 'regular', country: 'France' },
  { id: 'o5', title: 'Social media captions (10 posts)', price: 1800, type: 'instant', country: 'Bangladesh' },
];

const OnlineJobCard = ({ job, onClick, onAccept, verified }) => (
  <Card onClick={onClick}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10, gap: 8 }}>
      <Txt variant="subtitle" style={{ fontSize: 17, fontWeight: 700, flex: 1 }}>{job.title}</Txt>
      <Txt variant="subtitle" color={T.color.gold500}>{fmtBDT(job.price)}</Txt>
    </div>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <Icon name="globe" size={14} color={T.color.textMuted} />
        <Txt variant="caption" color={T.color.textMuted} style={{ letterSpacing: 0 }}>
          {job.type === 'regular' ? 'Long duration' : 'Online · remote'}
        </Txt>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <Icon name="location" size={14} color={T.color.gold500} />
        <Txt variant="caption" color={T.color.gold500} style={{ letterSpacing: 0, fontWeight: 600 }}>{job.country}</Txt>
      </div>
    </div>
    <div style={{ display: 'flex', gap: 10 }}>
      <SecondaryButton style={{ flex: 1, minHeight: 40, fontSize: 14 }} onClick={(e) => { e.stopPropagation(); onClick(); }}>View details</SecondaryButton>
      <PrimaryButton style={{ flex: 1, minHeight: 40, fontSize: 14, opacity: verified ? 1 : 0.5, cursor: verified ? 'pointer' : 'not-allowed' }}
        onClick={(e) => { e.stopPropagation(); if (verified) onAccept && onAccept(job); }}>
        Accept offer
      </PrimaryButton>
    </div>
  </Card>
);

const OnlineJobFeedScreen = ({ onOpenJob, onNav, onBack, verified = true }) => {
  const [seg, setSeg] = useState('immediate');
  const jobs = ONLINE_JOBS.filter(j => seg === 'immediate' ? j.type === 'instant' : j.type === 'regular');
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: T.color.navyBg }}>
      <AppBarElevated title="Online Jobs" left={onBack ? <BackButton onClick={onBack} /> : undefined}
        right={<IconButton name="bell" onClick={() => onNav && onNav('notifications')} />} />
      <div style={{ flex: 1, padding: 16, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <Segmented
          options={[{ value: 'immediate', label: 'Immediately Hiring' }, { value: 'active', label: 'Still Active' }]}
          value={seg} onChange={setSeg} />

        {!verified && (
          <Banner variant="warning" title="Verification under review">
            You can browse online jobs, but you can't accept offers until your NID is verified.
          </Banner>
        )}

        <Txt variant="caption" color={T.color.textMuted} style={{ letterSpacing: 0 }}>{jobs.length} online jobs available</Txt>
        {jobs.map(j => (
          <OnlineJobCard key={j.id} job={j} verified={verified}
            onClick={() => onOpenJob && onOpenJob(j)} onAccept={() => onOpenJob && onOpenJob(j)} />
        ))}
        {jobs.length === 0 && <EmptyState icon="globe" title="No online jobs here" body="Check the other tab or come back soon." />}
      </div>
    </div>
  );
};

// ── Client posted jobs (dedicated) ──────────────────────────
// All of a client's jobs in one place, grouped by status:
// active (skill + asset), waiting for acceptance, accepted, long
// duration, and history.
const ClientPostedJobsScreen = ({ onBack, onOpenJob }) => {
  const groups = [
    {
      key: 'active', label: 'ACTIVE', jobs: [
        { id: 'p1', title: 'Medicine delivery — Motijheel', kind: 'Skill', price: 1500, status: 'bidding', meta: '4 bids · posted 12 min ago' },
        { id: 'p2', title: 'Need a car for airport drop', kind: 'Asset', price: 1800, status: 'bidding', meta: '2 bids · posted 40 min ago' },
      ],
    },
    {
      key: 'waiting', label: 'WAITING FOR ACCEPTANCE', jobs: [
        { id: 'p3', title: 'Move single sofa — Gulshan', kind: 'Skill', price: 2000, status: 'posted', meta: 'Offer sent · awaiting worker' },
      ],
    },
    {
      key: 'accepted', label: 'ACCEPTED', jobs: [
        { id: 'p4', title: 'Fix kitchen sink — Banani', kind: 'Skill', price: 1200, status: 'accepted', meta: 'Rahim Uddin · in progress' },
      ],
    },
    {
      key: 'long', label: 'LONG DURATION', jobs: [
        { id: 'p5', title: 'Weekly grocery run', kind: 'Skill', price: 900, status: 'posted', meta: 'Time-flexible · deadline 05/05/2026' },
      ],
    },
    {
      key: 'history', label: 'HISTORY', jobs: [
        { id: 'p6', title: 'Drop documents — Agargaon', kind: 'Skill', price: 800, status: 'complete', meta: 'Completed 20/04/2026' },
        { id: 'p7', title: 'Camera rental — 1 day', kind: 'Asset', price: 0, status: 'cancelled', meta: 'Cancelled 18/04/2026' },
      ],
    },
  ];
  const pill = (s) =>
    s === 'bidding' ? 'bidding' : s === 'accepted' ? 'accepted' :
    s === 'complete' ? 'complete' : s === 'cancelled' ? 'cancelled' : 'posted';
  const pillTxt = (s) =>
    s === 'bidding' ? 'Bidding' : s === 'accepted' ? 'Accepted' :
    s === 'complete' ? 'Completed' : s === 'cancelled' ? 'Cancelled' : 'Waiting';
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: T.color.navyBg }}>
      <AppBarElevated title="Posted Jobs" left={<BackButton onClick={onBack} />} />
      <div style={{ flex: 1, padding: 16, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {groups.map(g => (
          <div key={g.key}>
            <Txt variant="caption" color={T.color.textMuted} style={{ marginBottom: 8 }}>{g.label}</Txt>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {g.jobs.map(j => (
                <Card key={j.id} onClick={() => onOpenJob && onOpenJob(j)}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, marginBottom: 8 }}>
                    <Txt variant="bodySm" style={{ fontWeight: 600, flex: 1 }}>{j.title}</Txt>
                    <StatusPill variant={pill(j.status)}>{pillTxt(j.status)}</StatusPill>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', gap: 5, padding: '3px 9px', borderRadius: T.radius.full,
                      background: j.kind === 'Asset' ? 'rgba(15,167,163,0.12)' : 'rgba(255, 255, 255,0.10)',
                      border: `1px solid ${j.kind === 'Asset' ? T.color.teal500 : T.color.gold500}`,
                      color: j.kind === 'Asset' ? T.color.teal500 : T.color.gold500,
                      fontFamily: T.fontSans, fontSize: 11, fontWeight: 700,
                    }}>
                      <Icon name={j.kind === 'Asset' ? 'truck' : 'briefcase'} size={12} color={j.kind === 'Asset' ? T.color.teal500 : T.color.gold500} />
                      {j.kind}
                    </span>
                    <Txt variant="bodySm" color={T.color.gold500} style={{ fontWeight: 700 }}>
                      {j.status === 'cancelled' ? '—' : fmtBDT(j.price)}
                    </Txt>
                  </div>
                  <Txt variant="caption" color={T.color.textMuted} style={{ letterSpacing: 0, marginTop: 8 }}>{j.meta}</Txt>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ── Complaints & reports (message admin) ────────────────────
const ComplaintsReportsScreen = ({ onBack }) => {
  const [against, setAgainst] = useState('worker');
  const [job, setJob] = useState('Medicine delivery — Motijheel → Dhanmondi');
  const [msg, setMsg] = useState('');
  const [sent, setSent] = useState(false);
  const past = [
    { id: 1, ref: '#RP-2041', about: 'Worker · Late delivery', status: 'In review', day: '26/04/2026' },
    { id: 2, ref: '#RP-1987', about: 'Client · Payment dispute', status: 'Resolved', day: '14/04/2026' },
  ];

  if (sent) return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: T.color.navyBg }}>
      <AppBarElevated title="Complaints & Reports" left={<BackButton onClick={onBack} />} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24, textAlign: 'center', gap: 14 }}>
        <div style={{ width: 90, height: 90, borderRadius: 45, background: 'rgba(102,187,106,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name="checkCircle" size={52} color={T.color.success} />
        </div>
        <Txt variant="h2">Report submitted</Txt>
        <Txt variant="body" color={T.color.textSecondary} style={{ maxWidth: 280 }}>
          Our admin team will review your report and message you here. Reference #RP-2042.
        </Txt>
        <div style={{ width: '100%', marginTop: 8 }}>
          <PrimaryButton onClick={() => setSent(false)}>Back to reports</PrimaryButton>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: T.color.navyBg }}>
      <AppBarElevated title="Complaints & Reports" left={<BackButton onClick={onBack} />} />
      <div style={{ flex: 1, padding: 16, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <Banner variant="info">Message the admin team to report a problem with a client or worker.</Banner>

        <div>
          <Txt variant="bodySm" color={T.color.gold500} style={{ marginBottom: 6, fontWeight: 500 }}>Report against</Txt>
          <Segmented
            options={[{ value: 'worker', label: 'A Worker' }, { value: 'client', label: 'A Client' }]}
            value={against} onChange={setAgainst} />
        </div>

        <div>
          <Txt variant="bodySm" color={T.color.gold500} style={{ marginBottom: 6, fontWeight: 500 }}>Related job</Txt>
          <select value={job} onChange={(e) => setJob(e.target.value)}
            style={{
              width: '100%', minHeight: 48, background: T.color.navyRaised,
              border: `1.5px solid ${T.color.navyBorder}`, borderRadius: T.radius.m,
              color: T.color.textPrimary, padding: '0 14px', fontFamily: T.fontSans, fontSize: 15, outline: 'none',
            }}>
            {['Medicine delivery — Motijheel → Dhanmondi', 'Move single sofa — Gulshan', 'Not job-related'].map(o => <option key={o} value={o}>{o}</option>)}
          </select>
        </div>

        <TextField label="Message to admin" multiline rows={4} value={msg} onChange={setMsg}
          placeholder="Describe what happened…" />

        <SecondaryButton icon="image">Attach screenshot (optional)</SecondaryButton>

        <PrimaryButton onClick={() => setSent(true)} disabled={!msg.trim()}>Submit report</PrimaryButton>

        <Txt variant="caption" color={T.color.textMuted} style={{ marginTop: 8 }}>YOUR REPORTS</Txt>
        {past.map(p => (
          <Card key={p.id}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <Txt variant="bodySm" style={{ fontWeight: 600 }}>{p.about}</Txt>
                <Txt variant="caption" color={T.color.textMuted} style={{ letterSpacing: 0, marginTop: 2 }}>{p.ref} · {p.day}</Txt>
              </div>
              <StatusPill variant={p.status === 'Resolved' ? 'complete' : 'pending'}>{p.status}</StatusPill>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

Object.assign(window, {
  WorkerHomeScreen, OnlineJobFeedScreen, ClientPostedJobsScreen, ComplaintsReportsScreen,
});
