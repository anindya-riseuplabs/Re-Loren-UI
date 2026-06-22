// Re'Loren v2 — employer/worker job flow screens.

// ── Job post composer (ChatGPT-style free text) ─────────────
const JobPostFreeTextScreen = ({ onBack, onReview, opportunity = false }) => {
  const [desc, setDesc] = useState('Need someone to pick up medicine from Motijheel pharmacy and deliver to Dhanmondi before 6 PM.');
  const [jobType, setJobType] = useState('instant'); // 'instant' or 'regular'
  const [deadline, setDeadline] = useState('2026-05-01');
  const [relocate, setRelocate] = useState('yes'); // 'yes' or 'no'
  const [from, setFrom] = useState('Motijheel, Dhaka');
  const [to, setTo] = useState('Dhanmondi, Dhaka');
  const [budget, setBudget] = useState('1500');
  const [radius, setRadius] = useState(3);
  const [priceBlock, setPriceBlock] = useState(false);
  const [fromMap, setFromMap] = useState(false);
  const [toMap, setToMap] = useState(false);

  const needsRoute = relocate === 'yes';
  const allFilled = desc && budget
    && (jobType === 'instant' || deadline)
    && (!needsRoute || (from && to));

  const onSubmit = () => {
    if (/\b\d{3,}\b|taka|tk|৳/i.test(desc)) { setPriceBlock(true); return; }
    onReview && onReview({ desc, jobType, deadline, relocate, from: needsRoute ? from : '', to: needsRoute ? to : '', budget });
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: T.color.navyBg }}>
      <AppBarElevated title={opportunity ? 'Post an Opportunity' : 'Post a Job'} left={<BackButton onClick={onBack} />} />
      <div style={{ flex: 1, padding: 16, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 16 }}>

        {opportunity && (
          <Banner variant="info" title="AI reminder" icon="info">
            You already have an active Skill job. You can post one Asset Service now, but you can't post another Skill job until the current one is completed or cancelled.
          </Banner>
        )}

        <div>
          <Txt variant="caption" color={T.color.textMuted} style={{ marginBottom: 8, display: 'block' }}>DESCRIBE YOUR JOB <span style={{ color: T.color.gold500 }}>(Don't mention price)</span></Txt>
          <div style={{
            background: T.color.navyRaised, border: `1.5px solid ${T.color.navyBorder}`,
            borderRadius: T.radius.l, padding: 14,
          }}>
            <textarea value={desc} onChange={(e) => setDesc(e.target.value)}
              placeholder="Describe what needs to be done..."
              rows={5}
              style={{
                width: '100%', background: 'transparent', border: 'none', outline: 'none',
                color: T.color.textPrimary, fontFamily: T.fontSans, fontSize: 15, lineHeight: 1.5,
                resize: 'none',
              }} />
          </div>
          {priceBlock && <Banner variant="error" title="Don't mention a price" style={{ marginTop: 10 }}>
            Workers will bid on your job — prices happen in bids, not descriptions.
          </Banner>}
        </div>

        <div>
          <Txt variant="bodySm" color={T.color.gold500} style={{ marginBottom: 6, fontWeight: 500 }}>Job type</Txt>
          <select value={jobType} onChange={(e) => setJobType(e.target.value)}
            style={{
              width: '100%', minHeight: 48, background: T.color.navyRaised,
              border: `1.5px solid ${T.color.navyBorder}`, borderRadius: T.radius.m,
              color: T.color.textPrimary, padding: '0 14px', fontFamily: T.fontSans, fontSize: 15,
              outline: 'none',
            }}>
            <option value="instant">Instant</option>
            <option value="regular">Long duration / flexible timing</option>
          </select>
        </div>

        {jobType === 'regular' && (
          <div>
            <Txt variant="bodySm" color={T.color.gold500} style={{ marginBottom: 6, fontWeight: 500 }}>Deadline</Txt>
            <TextField type="datetime-local" value={deadline} onChange={setDeadline} />
          </div>
        )}

        <div>
          <Txt variant="bodySm" color={T.color.gold500} style={{ marginBottom: 8, fontWeight: 500 }}>
            Does the worker need to be relocated?
          </Txt>
          <div style={{ display: 'flex', gap: 10 }}>
            {[{ v: 'yes', l: 'Yes' }, { v: 'no', l: 'No' }].map(o => (
              <button key={o.v} onClick={() => setRelocate(o.v)} style={{
                flex: 1, minHeight: 44, borderRadius: T.radius.m, cursor: 'pointer',
                background: relocate === o.v ? 'rgba(255, 255, 255,0.10)' : T.color.navyRaised,
                border: `1.5px solid ${relocate === o.v ? T.color.gold500 : T.color.navyBorder}`,
                color: relocate === o.v ? T.color.gold500 : T.color.textSecondary,
                fontFamily: T.fontSans, fontSize: 14, fontWeight: 600,
              }}>{o.l}</button>
            ))}
          </div>
        </div>

        {needsRoute && (
          <>
            <div>
              <TextField label="From" value={from} onChange={setFrom} placeholder="Pickup location..."
                suffix={<IconButton name="location" size={32} iconSize={18} onClick={() => setFromMap(m => !m)} />} />
              <button onClick={() => setFromMap(m => !m)} style={{
                marginTop: 6, background: 'none', border: 'none', color: T.color.teal500,
                fontFamily: T.fontSans, fontSize: 12, fontWeight: 600, cursor: 'pointer', padding: 0,
              }}>{fromMap ? 'Hide map' : 'Drop pin manually on map'}</button>
              {fromMap && (
                <MapPreview height={130} label={from || 'Pickup'} marker="Drag to set pickup"
                  caption="Drag the pin to set the exact pickup location" style={{ marginTop: 8 }} />
              )}
            </div>
            <div>
              <TextField label="To" value={to} onChange={setTo} placeholder="Drop-off location..."
                suffix={<IconButton name="location" size={32} iconSize={18} onClick={() => setToMap(m => !m)} />} />
              <button onClick={() => setToMap(m => !m)} style={{
                marginTop: 6, background: 'none', border: 'none', color: T.color.teal500,
                fontFamily: T.fontSans, fontSize: 12, fontWeight: 600, cursor: 'pointer', padding: 0,
              }}>{toMap ? 'Hide map' : 'Drop pin manually on map'}</button>
              {toMap && (
                <MapPreview height={130} label={to || 'Drop-off'} marker="Drag to set drop-off" pinColor={T.color.error}
                  caption="Drag the pin to set the exact drop-off location" style={{ marginTop: 8 }} />
              )}
            </div>
          </>
        )}

        <TextField label="Budget" value={budget} onChange={v => setBudget(v.replace(/\D/g, ''))}
          prefix={<span style={{ color: T.color.gold500, fontWeight: 600 }}>৳</span>}
          placeholder="1,500" />

        <div>
          <Txt variant="bodySm" color={T.color.gold500} style={{ marginBottom: 6, fontWeight: 500 }}>Service area</Txt>
          <MapPreview height={150} label="Motijheel, Dhaka" radiusKm={radius} caption={`Drag the pin · ${radius} km service radius`} />
          <input type="range" min={1} max={15} value={radius} onChange={e => setRadius(Number(e.target.value))}
            style={{ width: '100%', accentColor: T.color.gold500, marginTop: 10 }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 2 }}>
            <Txt variant="caption" color={T.color.textMuted}>1 km</Txt>
            <Txt variant="caption" color={T.color.gold500}>{`${radius} km`}</Txt>
            <Txt variant="caption" color={T.color.textMuted}>15 km</Txt>
          </div>
        </div>

        <div style={{ marginTop: 'auto', paddingBottom: 20 }}>
          <PrimaryButton onClick={onSubmit} disabled={!allFilled}>Post a job</PrimaryButton>
        </div>
      </div>
    </div>
  );
};

// ── Job post review (confirmation) ──────────────────────────
const JobPostReviewScreen = ({ data = {}, onBack, onPost }) => {
  const { desc, jobType = 'instant', deadline, relocate = 'yes', from, to, budget, caption = 'Medicine delivery — Motijheel → Dhanmondi' } = data;
  const needsRoute = relocate === 'yes' && from && to;
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: T.color.navyBg }}>
      <AppBarElevated title="Confirm your job" left={<BackButton onClick={onBack} />} />
      <div style={{ flex: 1, padding: 16, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <Banner variant="info">Please review the details before posting.</Banner>
        <Card style={{ background: T.color.navyDeep }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <Txt variant="caption" color={T.color.textMuted}>CAPTION</Txt>
            <div style={{
              padding: '1px 6px', borderRadius: T.radius.full,
              background: 'rgba(255, 255, 255,0.10)', border: `1px solid ${T.color.gold500}`,
              color: T.color.gold500, fontFamily: T.fontSans, fontSize: 9, fontWeight: 700,
              letterSpacing: '2%', textTransform: 'uppercase',
            }}>Auto-generated</div>
          </div>
          <Txt variant="subtitle" color={T.color.gold500}>{caption}</Txt>
        </Card>
        <Card>
          <Txt variant="caption" color={T.color.textMuted} style={{ marginBottom: 8 }}>DESCRIPTION</Txt>
          <Txt variant="body" style={{ lineHeight: 1.5 }}>"{desc}"</Txt>
        </Card>
        <Card>
          {[
            ['Job type', jobType === 'instant' ? 'Instant' : 'Long duration / flexible timing'],
            jobType === 'regular' ? ['Deadline', deadline] : null,
            ['Relocation', relocate === 'yes' ? 'Yes' : 'No'],
            needsRoute ? ['From', from] : null,
            needsRoute ? ['To', to] : null,
            ['Budget', fmtBDT(budget)],
          ].filter(Boolean).map(([k, v]) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: `1px solid ${T.color.navyBorder}` }}>
              <Txt variant="bodySm" color={T.color.textSecondary}>{k}</Txt>
              <Txt variant="bodySm" style={{ fontWeight: 500 }}>{v}</Txt>
            </div>
          ))}
        </Card>
        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 10, paddingBottom: 20 }}>
          <PrimaryButton onClick={() => onPost && onPost(data)}>Confirm & post</PrimaryButton>
          <SecondaryButton onClick={onBack}>Edit</SecondaryButton>
        </div>
      </div>
    </div>
  );
};

const JobPostSuccessScreen = ({ data = {}, onDone, onAnother }) => {
  const isHireNow = data.jobType === 'instant';
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: T.color.navyBg, alignItems: 'center', justifyContent: 'center', padding: 24, textAlign: 'center' }}>
      <div style={{
        width: 100, height: 100, borderRadius: 50, background: 'rgba(102,187,106,0.15)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24,
      }}>
        <Icon name="checkCircle" size={60} color={T.color.success} />
      </div>
      <Txt variant="h2" style={{ marginBottom: 12 }}>Job Posted!</Txt>
      <Txt variant="body" color={T.color.textSecondary} style={{ marginBottom: 32, maxWidth: 280 }}>
        Your job has been successfully published. {isHireNow ? 'We are now matching you with nearby workers.' : 'Workers can now see and bid on your job.'}
      </Txt>
      
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <PrimaryButton onClick={() => onDone(isHireNow ? 'processing' : 'home')}>
          {isHireNow ? 'View processing' : 'Go to Home'}
        </PrimaryButton>
        <SecondaryButton onClick={() => onAnother ? onAnother() : onDone('opportunity')} icon="plus">Make another post</SecondaryButton>
      </div>
    </div>
  );
};

// ── Instant cancel prompt (dialog) ───────────────────────────
const InstantCancelPromptDialog = ({ onClose, onCancel }) => {
  const [reason, setReason] = useState('other');
  return (
    <Dialog
      onClose={onClose}
      title="Cancel this instant job?"
      actions={[
        <SecondaryButton key="k" onClick={onClose}>Keep job</SecondaryButton>,
        <DestructiveButton key="c" onClick={onCancel}>Cancel job</DestructiveButton>,
      ]}>
      <Txt variant="bodySm" color={T.color.textSecondary} style={{ marginBottom: 12 }}>Why are you cancelling?</Txt>
      {[
        { v: 'mind', l: 'Changed my mind' },
        { v: 'offline', l: 'Found worker offline' },
        { v: 'other', l: 'Other' },
      ].map(o => (
        <Radio key={o.v} checked={reason === o.v} label={o.l} onClick={() => setReason(o.v)} />
      ))}
      {reason === 'other' && (
        <div style={{ marginTop: 12 }}>
          <TextField multiline rows={2} placeholder="Tell us more (optional)" />
        </div>
      )}
    </Dialog>
  );
};

// ── Job card ─────────────────────────────────────────────────
const JobCard = ({ job, onClick, onAccept, verified = true, segment = 'immediate' }) => (
  <Card onClick={onClick}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
      <Txt variant="subtitle" style={{ fontSize: 18, fontWeight: 700, flex: 1, paddingRight: 8 }}>{job.title}</Txt>
      <Txt variant="subtitle" color={T.color.gold500}>{fmtBDT(job.price)}</Txt>
    </div>

    <div style={{ display: 'flex', gap: 12, marginBottom: 12, flexWrap: 'wrap' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <Icon name="location" size={14} color={T.color.textMuted} />
        <Txt variant="caption" color={T.color.textMuted}>{job.location || 'Dhaka'}</Txt>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <Icon name="truck" size={14} color={T.color.textMuted} />
        <Txt variant="caption" color={T.color.textMuted}>{job.distance}</Txt>
      </div>
      {segment === 'active' && job.deadline && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <Icon name="clock" size={14} color={T.color.warning} />
          <Txt variant="caption" color={T.color.warning}>Deadline {job.deadline}</Txt>
        </div>
      )}
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

// ── Job-density map (worker feed) ───────────────────────────
// Mock explore-map: worker at centre, a teal radius circle from the
// distance filter, and "N jobs" pins per area. Pins inside the radius are
// biddable; pins outside are view-only. Tapping a pin opens that area's
// posts. Counts refresh on a slow cadence (≈1h) — simulated by a ticking
// label only. radiusKm is owned by the feed (shared with the filter).
const JOB_CLUSTERS = [
  { id: 'hellskitchen', label: "Hell's Kitchen", jobs: 5, ang: 295, dist: 1.8 },
  { id: 'soho',         label: 'SoHo',            jobs: 2, ang: 172, dist: 1.4 },
  { id: 'eastvillage',  label: 'East Village',    jobs: 3, ang: 22,  dist: 2.6 },
  { id: 'greenwich',    label: 'Greenwich Village',jobs: 3, ang: 208, dist: 2.4 },
  { id: 'newport',      label: 'Newport',         jobs: 3, ang: 232, dist: 3.7 },
  { id: 'hoboken',      label: 'Hoboken',         jobs: 3, ang: 196, dist: 4.6 },
  { id: 'longisland',   label: 'Long Island City',jobs: 4, ang: 36,  dist: 5.3 },
];
const CLUSTER_TITLES = ['Medicine delivery', 'Move single sofa', 'Fix kitchen sink leak', 'Drop documents — rush', 'Grocery pickup', 'Furniture assembly'];
const CLUSTER_PRICES = [1500, 2000, 1200, 800, 1100, 1750];

const JobAreaMap = ({ radiusKm, verified, onBid, onOpenFilter, historyMode = false }) => {
  const [selected, setSelected] = useState(null);
  const pxPerKm = 18, cap = 104;
  const circlePx = Math.min(cap, radiusKm * pxPerKm);
  const cluster = JOB_CLUSTERS.find(c => c.id === selected);
  const selInside = cluster && cluster.dist <= radiusKm;
  const inRange = JOB_CLUSTERS.filter(c => c.dist <= radiusKm).reduce((n, c) => n + c.jobs, 0);

  return (
    <Card style={{ padding: 0, overflow: 'hidden' }}>
      <div style={{ position: 'relative', width: '100%', height: 230, background: T.color.navyDeep }}>
        {/* faux map tiles */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #0d2440 0%, #10325c 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, opacity: 0.6, backgroundImage:
          `repeating-linear-gradient(0deg, transparent 0 38px, rgba(160,174,192,0.10) 38px 40px),
           repeating-linear-gradient(90deg, transparent 0 46px, rgba(160,174,192,0.10) 46px 48px)` }} />
        <div style={{ position: 'absolute', top: '52%', left: 0, right: 0, height: 5, background: 'rgba(255, 255, 255,0.16)' }} />
        <div style={{ position: 'absolute', top: 0, bottom: 0, left: '40%', width: 5, background: 'rgba(15,167,163,0.18)' }} />

        {/* selected-radius circle (teal, like the reference's blue) */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
          width: circlePx * 2, height: circlePx * 2, borderRadius: '50%',
          background: 'rgba(15,167,163,0.16)', border: `2px solid ${T.color.teal500}`,
          transition: 'width 0.25s, height 0.25s', pointerEvents: 'none',
        }} />

        {/* worker centre */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', pointerEvents: 'none' }}>
          <div style={{ width: 14, height: 14, borderRadius: 7, background: T.color.teal500, border: '2px solid #fff', boxShadow: '0 0 0 4px rgba(15,167,163,0.3)' }} />
        </div>

        {/* PRIVACY history mode — diffuse 500m demand blobs, no exact pins / counts */}
        {historyMode && JOB_CLUSTERS.map(c => {
          const r = c.ang * Math.PI / 180;
          const dx = Math.cos(r) * c.dist * pxPerKm;
          const dy = Math.sin(r) * c.dist * pxPerKm;
          const blob = 30 + (c.jobs * 6); // denser areas look bigger, not exact
          return (
            <div key={c.id} style={{
              position: 'absolute', top: `calc(50% + ${dy}px)`, left: `calc(50% + ${dx}px)`,
              transform: 'translate(-50%,-50%)', width: blob, height: blob, borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255, 255, 255,0.42) 0%, rgba(255, 255, 255,0.10) 60%, transparent 75%)',
              pointerEvents: 'none',
            }} />
          );
        })}

        {/* area pins (interactive bid map) */}
        {!historyMode && JOB_CLUSTERS.map(c => {
          const r = c.ang * Math.PI / 180;
          const dx = Math.cos(r) * c.dist * pxPerKm;
          const dy = Math.sin(r) * c.dist * pxPerKm;
          const inside = c.dist <= radiusKm;
          return (
            <button key={c.id} onClick={() => setSelected(c.id)} style={{
              position: 'absolute', top: `calc(50% + ${dy}px)`, left: `calc(50% + ${dx}px)`,
              transform: 'translate(-50%,-100%)', zIndex: selected === c.id ? 6 : 4,
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              background: 'none', border: 'none', cursor: 'pointer', padding: 0,
            }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 3, padding: '2px 7px', borderRadius: T.radius.full,
                background: inside ? T.color.gold500 : 'rgba(7,17,38,0.85)',
                border: `1px solid ${inside ? T.color.gold600 : T.color.navyBorder}`,
                color: inside ? T.color.textOnGold : T.color.textMuted,
                fontFamily: T.fontSans, fontSize: 11, fontWeight: 700, whiteSpace: 'nowrap',
                opacity: inside ? 1 : 0.85,
              }}>{c.jobs} jobs</div>
              <Icon name="location" size={inside ? 22 : 18} color={inside ? T.color.gold500 : T.color.textMuted}
                style={{ marginTop: -2, filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.5))' }} />
            </button>
          );
        })}

        {/* history-mode title bar (privacy heatmap) */}
        {historyMode && (
          <div style={{ position: 'absolute', top: 10, left: 10, right: 10, padding: '6px 10px', borderRadius: T.radius.m, background: 'rgba(7,17,38,0.85)', border: `1px solid ${T.color.navyBorder}` }}>
            <Txt variant="caption" color={T.color.textPrimary} style={{ letterSpacing: 0, lineHeight: 1.4 }}>
              Job History Area-Wise (Updated Hourly). Zoom in/out to see demanding places.
            </Txt>
          </div>
        )}

        {/* radius chip + filter (interactive map only) */}
        {!historyMode && (
          <>
            <div style={{ position: 'absolute', top: 10, left: 10, display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 10px', borderRadius: T.radius.full, background: 'rgba(7,17,38,0.82)', border: `1px solid ${T.color.teal500}` }}>
              <Icon name="location" size={12} color={T.color.teal500} />
              <Txt variant="caption" color={T.color.textPrimary} style={{ letterSpacing: 0 }}>{radiusKm} km radius · {inRange} jobs in range</Txt>
            </div>
            <button onClick={onOpenFilter} style={{
              position: 'absolute', top: 10, right: 10, display: 'inline-flex', alignItems: 'center', gap: 5,
              padding: '5px 10px', borderRadius: T.radius.full, background: 'rgba(7,17,38,0.82)',
              border: `1px solid ${T.color.navyBorder}`, cursor: 'pointer',
            }}>
              <Icon name="filter" size={12} color={T.color.gold500} />
              <Txt variant="caption" color={T.color.gold500} style={{ letterSpacing: 0 }}>Radius</Txt>
            </button>
          </>
        )}
      </div>

      <div style={{ padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 6 }}>
        <Icon name="clock" size={13} color={T.color.textMuted} />
        <Txt variant="caption" color={T.color.textMuted} style={{ letterSpacing: 0 }}>
          {historyMode
            ? 'Areas show a ~500m demand zone, not exact sites · the exact job site appears only after you accept'
            : 'Tap an area to see its posts · counts update hourly · bid only inside your radius'}
        </Txt>
      </div>

      {!historyMode && cluster && (
        <BottomSheet onClose={() => setSelected(null)} title={`${cluster.label} · ${cluster.jobs} jobs`}>
          {!selInside && (
            <Banner variant="warning" style={{ marginBottom: 12 }}>
              This area is outside your {radiusKm} km radius. You can view posts but can't bid — widen your radius to bid here.
            </Banner>
          )}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {Array.from({ length: cluster.jobs }).map((_, i) => {
              const title = CLUSTER_TITLES[i % CLUSTER_TITLES.length];
              const price = CLUSTER_PRICES[i % CLUSTER_PRICES.length];
              const canBid = selInside && verified;
              return (
                <Card key={i} style={{ background: T.color.navyDeep }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                    <Txt variant="bodySm" style={{ fontWeight: 600, flex: 1, paddingRight: 8 }}>{title}</Txt>
                    <Txt variant="bodySm" color={T.color.gold500} style={{ fontWeight: 700 }}>{fmtBDT(price)}</Txt>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 10 }}>
                    <Icon name="location" size={13} color={T.color.textMuted} />
                    <Txt variant="caption" color={T.color.textMuted} style={{ letterSpacing: 0 }}>{cluster.label} · {cluster.dist} km away</Txt>
                  </div>
                  <PrimaryButton style={{ minHeight: 38, fontSize: 13, opacity: canBid ? 1 : 0.5, cursor: canBid ? 'pointer' : 'not-allowed' }}
                    onClick={() => { if (canBid) { setSelected(null); onBid && onBid(); } }}>
                    {canBid ? 'Place a bid' : !verified ? 'Verify to bid' : 'Out of radius'}
                  </PrimaryButton>
                </Card>
              );
            })}
          </div>
        </BottomSheet>
      )}
    </Card>
  );
};

// ── Job feed (worker) — verified prop drives accept-button state ──
const JobFeedScreen = ({ onOpenJob, onNav, verified = true, opportunity = false }) => {
  const [seg, setSeg] = useState('immediate');
  const [filterOpen, setFilterOpen] = useState(false);
  const [sort, setSort] = useState('nearest');
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [radiusKm, setRadiusKm] = useState(3);
  const [radiusDraft, setRadiusDraft] = useState(3);

  const openFilter = () => { setRadiusDraft(radiusKm); setFilterOpen(true); };

  const jobs = SAMPLE.jobFeed.filter(j =>
    seg === 'immediate' ? j.type === 'instant' : j.type === 'regular'
  );

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
                  background: 'rgba(255, 255, 255,0.10)', border: `1px solid ${T.color.gold500}`,
                  color: T.color.gold500, fontFamily: T.fontSans, fontSize: 9, fontWeight: 700,
                  letterSpacing: '2%', textTransform: 'uppercase', lineHeight: 1.2,
                }}>Worker</div>
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
      <div style={{ flex: 1, padding: 16, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <Segmented
          options={[{ value: 'immediate', label: 'Immediately hiring' }, { value: 'active', label: 'Still active' }]}
          value={seg} onChange={setSeg} />

        {opportunity && (
          <Banner variant="info" title="AI reminder" icon="info">
            You have an active Skill job — only Asset Service opportunities are shown. You can't take another Skill job until the current one is completed or cancelled.
          </Banner>
        )}
        {!verified && (
          <Banner variant="warning" title="Verification under review">
            You can browse jobs, but you can't accept offers or place bids until your NID is verified.
          </Banner>
        )}

        <JobAreaMap radiusKm={radiusKm} verified={verified} historyMode
          onOpenFilter={openFilter}
          onBid={() => onOpenJob && onOpenJob(jobs[0] || SAMPLE.jobFeed[0])} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Txt variant="caption" color={T.color.textMuted} style={{ letterSpacing: 0 }}>
            {jobs.length} jobs available nearby
          </Txt>
          <IconButton name="filter" onClick={openFilter} size={32} iconSize={18} />
        </div>

        {jobs.map(j => <JobCard key={j.id} job={j} verified={verified} segment={seg} onClick={() => onOpenJob && onOpenJob(j)} />)}
        {jobs.length === 0 && <EmptyState icon="briefcase" title="No jobs match right now" body="Try adjusting your filters or check back soon." />}
      </div>

      {filterOpen && (
        <BottomSheet onClose={() => setFilterOpen(false)} title="Sort by">
          {[
            { v: 'nearest', l: 'Nearest (default)' },
            { v: 'low', l: 'Price: low → high' },
            { v: 'high', l: 'Price: high → low' },
            { v: 'latest', l: 'Latest' },
          ].map(o => (
            <div key={o.v} style={{ marginBottom: 8 }}>
              <Radio checked={sort === o.v} label={o.l} onClick={() => setSort(o.v)} />
            </div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 18, marginBottom: 8 }}>
            <Txt variant="caption" color={T.color.textMuted}>DISTANCE RADIUS</Txt>
            <Txt variant="caption" color={T.color.teal500} style={{ fontWeight: 700 }}>{radiusDraft} km</Txt>
          </div>
          <input type="range" min={1} max={8} step={0.5} value={radiusDraft}
            onChange={e => setRadiusDraft(Number(e.target.value))}
            style={{ width: '100%', accentColor: T.color.teal500 }} />
          <Txt variant="caption" color={T.color.textMuted} style={{ letterSpacing: 0, marginTop: 4 }}>
            You can place bids only on jobs inside this radius. The map updates to show the area you cover.
          </Txt>
          <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
            <SecondaryButton onClick={() => { setSort('nearest'); setRadiusDraft(3); }}>Clear all</SecondaryButton>
            <PrimaryButton onClick={() => { setRadiusKm(radiusDraft); setFilterOpen(false); }}>Apply filters</PrimaryButton>
          </div>
        </BottomSheet>
      )}
    </div>
  );
};

// ── Job detail ───────────────────────────────────────────────
const JobDetailScreen = ({ job, onBack, onBid, onVerify, onViewReview, verified = false, assetVariant = false }) => {
  const j = job || SAMPLE.jobFeed[0];
  const [reminderOpen, setReminderOpen] = useState(false);
  const [reminder, setReminder] = useState('Never');
  
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: T.color.navyBg }}>
      <AppBarElevated title="Job Detail" left={<BackButton onClick={onBack} />} />
      <div style={{ flex: 1, padding: 16, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ flex: 1 }}>
            <Txt variant="h2" style={{ marginBottom: 4 }}>{j.title}</Txt>
            <Txt variant="bodySm" color={T.color.textSecondary}>Posted {j.postedAgo || '2h'} ago</Txt>
          </div>
          <div style={{ textAlign: 'right' }}>
            <Txt variant="h2" color={T.color.gold500}>{fmtBDT(j.price)}</Txt>
            <Txt variant="caption" color={T.color.textMuted}>BUDGET</Txt>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <CapabilityTag>600m away</CapabilityTag>
        </div>

        <Txt variant="body" style={{ marginTop: 10 }}>{j.description || 'Looking for a reliable worker to help with this task. Please see details below.'}</Txt>

        {j.relocate && j.from && j.to && (
          <Card>
            <Txt variant="caption" color={T.color.textMuted} style={{ marginBottom: 12 }}>ROUTE & LOCATION</Txt>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <div style={{ width: 8, height: 8, borderRadius: 4, background: T.color.success }} />
              <Txt variant="bodySm">From: {j.from}</Txt>
            </div>
            <div style={{ height: 20, width: 2, background: T.color.navyBorder, marginLeft: 3, marginBottom: 8 }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 8, height: 8, borderRadius: 4, background: T.color.error }} />
              <Txt variant="bodySm">To: {j.to}</Txt>
            </div>
          </Card>
        )}

        <Card>
          <Txt variant="caption" color={T.color.textMuted} style={{ marginBottom: 10 }}>
            {assetVariant ? 'CLIENT & ASSET LOCATION' : verified ? 'LIVE ROUTE' : 'LOCATION ON MAP'}
          </Txt>
          {assetVariant ? (
            <>
              <RouteMap height={150} title="Client → your asset" fromLabel="Client (live)" toLabel="Your asset" />
              <Txt variant="caption" color={T.color.textMuted} style={{ letterSpacing: 0, marginTop: 8 }}>
                As the asset owner, you can see the client's live location relative to your asset.
              </Txt>
            </>
          ) : verified ? (
            <RouteMap height={150} title="Route to job site" fromLabel="You" toLabel="Job site" />
          ) : (
            <MapPreview height={150} label={j.from || j.location || 'Job location'} caption="Work location"
              marker={(j.relocate && j.to) ? 'Drop-off: ' + j.to : undefined} />
          )}
        </Card>

        <Card onClick={() => setReminderOpen(true)}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <Txt variant="caption" color={T.color.textMuted}>REMIND ME IN</Txt>
              <Txt variant="bodySm" style={{ fontWeight: 600 }}>{reminder}</Txt>
            </div>
            <Icon name="clock" size={20} color={T.color.gold500} />
          </div>
        </Card>

        <Card>
          <Txt variant="caption" color={T.color.textMuted} style={{ marginBottom: 8 }}>{assetVariant ? 'CLIENT' : 'POSTED BY'}</Txt>
          <div>
            <Txt variant="body" style={{ fontWeight: 600, marginBottom: 2 }}>Karim Ahmed</Txt>
            <RatingStars value={4.8} count={142} />
          </div>
          <button onClick={() => onViewReview && onViewReview()} style={{
            background: 'none', border: 'none', color: T.color.teal500,
            fontFamily: T.fontSans, fontSize: 13, fontWeight: 600, cursor: 'pointer', padding: 0,
            textDecoration: 'underline', marginTop: 10, display: 'block',
          }}>View client reviews →</button>
        </Card>

        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 12, paddingBottom: 20 }}>
          {!verified && (
            <>
              <Banner variant="warning">You must be verified to apply for jobs.</Banner>
              <PrimaryButton icon="shield" onClick={onVerify}>Verify now</PrimaryButton>
            </>
          )}
          <div style={{ display: 'flex', gap: 10 }}>
            <SecondaryButton style={{ flex: 1 }} onClick={onBid} disabled={!verified}>Place a bid</SecondaryButton>
            <PrimaryButton style={{ flex: 1 }} onClick={onBid} disabled={!verified}>Accept offer</PrimaryButton>
          </div>
        </div>
      </div>

      {reminderOpen && (
        <BottomSheet onClose={() => setReminderOpen(false)} title="Set a reminder">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {['1 hour', '2 hours', '3 hours', 'Never'].map(opt => (
              <Radio key={opt} checked={reminder === opt} label={opt} onClick={() => { setReminder(opt); setReminderOpen(false); }} />
            ))}
          </div>
        </BottomSheet>
      )}
    </div>
  );
};

// ── Bid submit ───────────────────────────────────────────────
const BidSubmitScreen = ({ onBack, onSubmit, onAnother }) => {
  const [amount, setAmount] = useState('1500');
  const [showPopup, setShowPopup] = useState(false);

  if (showPopup) return (
    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: T.color.navyBg, padding: 24 }}>
      <Card style={{ textAlign: 'center', padding: 32 }}>
        <Icon name="checkCircle" size={64} color={T.color.success} style={{ marginBottom: 16 }} />
        <Txt variant="title" style={{ marginBottom: 8 }}>Bid submitted</Txt>
        <Txt variant="bodySm" color={T.color.textSecondary} style={{ marginBottom: 24 }}>
          Your bid has been placed. You will be notified if the client accepts.
        </Txt>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <PrimaryButton onClick={onSubmit}>Go to dashboard</PrimaryButton>
          <SecondaryButton onClick={() => onAnother ? onAnother() : onSubmit && onSubmit()} icon="plus">Place another bid</SecondaryButton>
        </div>
      </Card>
    </div>
  );

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: T.color.navyBg }}>
      <AppBarElevated title="Place Your Bid" left={<BackButton onClick={onBack} />} />
      <div style={{ flex: 1, padding: 16, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <Txt variant="caption" color={T.color.textMuted}>JOB</Txt>
        <Txt variant="bodySm">Medicine delivery — Motijheel → Dhanmondi</Txt>
        <TextField label="Your bid amount" value={amount} onChange={v => setAmount(v.replace(/\D/g, ''))}
          prefix={<span style={{ color: T.color.gold500, fontWeight: 600 }}>৳</span>} />
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Txt variant="bodySm" style={{ fontWeight: 600 }}>Your bid amount</Txt>
            <Txt variant="subtitle" color={T.color.gold500} style={{ fontWeight: 700 }}>{fmtBDT(parseInt(amount || '0'))}</Txt>
          </div>
        </Card>
        <Banner variant="info">You can edit this bid until it's accepted.</Banner>
        <div style={{ marginTop: 'auto' }}>
          <PrimaryButton onClick={() => setShowPopup(true)} disabled={!amount}>Submit bid</PrimaryButton>
        </div>
      </div>
    </div>
  );
};

// ── Bid edit ─────────────────────────────────────────────────
const BidEditScreen = ({ onBack, onUpdate, onWithdraw }) => {
  const [amount, setAmount] = useState('1400');
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: T.color.navyBg }}>
      <AppBarElevated title="Edit Your Bid" left={<BackButton onClick={onBack} />} />
      <div style={{ flex: 1, padding: 16, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <StatusPill variant="bidding">Bidding</StatusPill>
          <Txt variant="bodySm" color={T.color.textSecondary}>— you can still edit</Txt>
        </div>

        <Card>
          <Txt variant="caption" color={T.color.textMuted} style={{ marginBottom: 8 }}>JOB DETAILS</Txt>
          <Txt variant="bodySm" style={{ fontWeight: 600, marginBottom: 6 }}>Medicine delivery — Motijheel → Dhanmondi</Txt>
          <Txt variant="caption" color={T.color.textMuted} style={{ marginBottom: 10 }}>
            Need someone to pick up medicine and deliver to Dhanmondi before 6 PM.
          </Txt>
          {[
            ['Budget', fmtBDT(1500)],
            ['Distance', '2 km'],
            ['Posted', '12 min ago'],
          ].map(([k, v]) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: `1px solid ${T.color.navyBorder}` }}>
              <Txt variant="caption" color={T.color.textSecondary}>{k}</Txt>
              <Txt variant="bodySm" style={{ fontWeight: 500 }}>{v}</Txt>
            </div>
          ))}
        </Card>

        <TextField label="Your bid amount" value={amount} onChange={v => setAmount(v.replace(/\D/g, ''))}
          prefix={<span style={{ color: T.color.gold500, fontWeight: 600 }}>৳</span>} />
        <Banner variant="warning">Once the client accepts, this bid locks.</Banner>
        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <PrimaryButton onClick={onUpdate}>Update bid</PrimaryButton>
          <DestructiveButton onClick={onWithdraw}>Withdraw bid</DestructiveButton>
        </div>
      </div>
    </div>
  );
};

// ── Asset photo carousel (hero on asset-service bid cards) ──
// Owner-uploaded asset photos with ‹ › browse controls + dots. Mock images.
const AssetPhotoCarousel = ({ rating, total = 3 }) => {
  const [i, setI] = useState(0);
  const navBtn = (side) => ({
    position: 'absolute', top: '50%', [side]: 8, transform: 'translateY(-50%)',
    width: 30, height: 30, borderRadius: 15, background: 'rgba(7,17,38,0.75)',
    border: `1px solid ${T.color.navyBorder}`, cursor: 'pointer', zIndex: 2,
    display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0,
  });
  return (
    <div style={{
      position: 'relative', width: '100%', height: 130,
      background: `linear-gradient(135deg, ${T.color.navyDeep}, ${T.color.navyHover})`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <Icon name="truck" size={48} color="rgba(255, 255, 255,0.45)" />
      <button onClick={() => setI(p => (p - 1 + total) % total)} style={navBtn('left')}><Icon name="back" size={16} color={T.color.textPrimary} /></button>
      <button onClick={() => setI(p => (p + 1) % total)} style={navBtn('right')}><Icon name="chevron" size={16} color={T.color.textPrimary} /></button>
      <div style={{
        position: 'absolute', top: 10, right: 10, background: 'rgba(7,17,38,0.82)',
        borderRadius: T.radius.full, padding: '4px 10px', display: 'flex', alignItems: 'center', gap: 4,
      }}>
        <Icon name="starFill" size={12} color={T.color.gold500} />
        <Txt variant="caption" color={T.color.gold500} style={{ letterSpacing: 0, fontWeight: 700 }}>{rating}</Txt>
      </div>
      <div style={{ position: 'absolute', bottom: 8, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 5 }}>
        {Array.from({ length: total }).map((_, d) => (
          <div key={d} style={{ width: d === i ? 16 : 6, height: 6, borderRadius: 3, background: d === i ? T.color.gold500 : 'rgba(255,255,255,0.4)', transition: 'width 0.2s' }} />
        ))}
      </div>
    </div>
  );
};

// ── Job in progress (was Manage Bids) — uber-style search → bids list ──
const RankedShortlistScreen = ({ onBack, onAccept, onViewReview, requireAsset = false, onViewAsset, noResults = false }) => {
  const [searching, setSearching] = useState(true);
  const [bids, setBids] = useState(SAMPLE.shortlist);
  const [accepted, setAccepted] = useState(null);
  const [offer, setOffer] = useState(1500);
  const entity = requireAsset ? 'asset service' : 'worker';

  useEffect(() => {
    const t = setTimeout(() => setSearching(false), 2200);
    return () => clearTimeout(t);
  }, []);

  const onDecline = (rank) => {
    setBids(bids.filter(b => b.rank !== rank));
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: T.color.navyBg }}>
      <AppBarElevated title="Job in progress" subtitle={searching ? 'Searching for workers…' : `${bids.length} bids received`} left={<BackButton onClick={onBack} />} />
      <div style={{ flex: 1, padding: 16, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 14 }}>

        {/* Uber-style searching animation */}
        <div style={{
          padding: '20px 16px', borderRadius: T.radius.l,
          background: T.color.navyDeep, border: `1px solid ${T.color.navyBorder}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14,
          minHeight: 96,
        }}>
          <div style={{ position: 'relative', width: 56, height: 56 }}>
            <div style={{
              position: 'absolute', inset: 0, borderRadius: 28,
              border: `2px solid ${T.color.gold500}`, opacity: 0.3,
              animation: 'searchPulse 1.4s ease-out infinite',
            }} />
            <div style={{
              position: 'absolute', inset: 8, borderRadius: 20,
              border: `2px solid ${T.color.gold500}`, opacity: 0.6,
              animation: 'searchPulse 1.4s ease-out 0.4s infinite',
            }} />
            <div style={{
              position: 'absolute', inset: 18, borderRadius: 10,
              background: T.color.gold500,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Icon name="search" size={14} color={T.color.textOnGold} />
            </div>
          </div>
          <div>
            <Txt variant="bodySm" style={{ fontWeight: 600 }}>
              {searching
                ? (requireAsset ? 'Searching for asset service nearby' : 'Searching for workers nearby')
                : noResults
                  ? (requireAsset ? 'No asset service found yet' : 'No worker found yet')
                  : (requireAsset ? 'Asset Service Found Nearby' : 'Workers found nearby')}
            </Txt>
            <Txt variant="caption" color={T.color.textMuted} style={{ letterSpacing: 0, marginTop: 2 }}>
              {searching
                ? 'Finding the best matches for your job'
                : noResults
                  ? 'No match in time — try one of the options below'
                  : (requireAsset ? 'Pick the asset service you want to hire' : 'Pick the worker you want to hire')}
            </Txt>
          </div>
        </div>

        <style>{`
          @keyframes searchPulse {
            0%   { transform: scale(0.6); opacity: 0.6; }
            100% { transform: scale(1.6); opacity: 0; }
          }
        `}</style>

        {/* Asset-requirement jobs use a hotel-listing style card: the asset
            photo + asset name are primary; the owner's name is secondary. */}
        {!searching && !accepted && !noResults && requireAsset && bids.map(w => (
          <Card key={w.rank} style={{ padding: 0, overflow: 'hidden' }}>
            {/* Asset photos (owner-uploaded) as the hero — browse with ‹ › */}
            <AssetPhotoCarousel rating={w.rating} />

            <div style={{ padding: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  {/* Asset name = primary */}
                  <Txt variant="subtitle" style={{ fontWeight: 700 }}>{w.asset || 'Asset'}</Txt>
                  <RatingStars value={w.rating} count={w.ratingCount} compact />
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <Txt variant="caption" color={T.color.textMuted} style={{ letterSpacing: 0 }}>Bid</Txt>
                  <Txt variant="subtitle" color={T.color.gold500}>{fmtBDT(w.bid)}</Txt>
                </div>
              </div>

              <button onClick={() => onViewReview && onViewReview(w)} style={{
                background: 'none', border: 'none', color: T.color.teal500,
                fontFamily: T.fontSans, fontSize: 13, fontWeight: 600, cursor: 'pointer', padding: 0,
                textDecoration: 'underline', margin: '8px 0', display: 'block',
              }}>View reviews →</button>

              {/* Owner name = secondary, bottom-right, smaller */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 10 }}>
                <Txt variant="caption" color={T.color.textMuted} style={{ letterSpacing: 0 }}>
                  Owner · {w.name}
                </Txt>
              </div>

              <SecondaryButton style={{ marginBottom: 10, minHeight: 38, fontSize: 13 }}
                onClick={() => onViewAsset && onViewAsset(w)} icon="truck">View asset details</SecondaryButton>

              <div style={{ display: 'flex', gap: 10 }}>
                <SecondaryButton style={{ flex: 1 }} onClick={() => onDecline(w.rank)}>Decline</SecondaryButton>
                <PrimaryButton style={{ flex: 2 }} onClick={() => setAccepted(w)}>Accept Bid</PrimaryButton>
              </div>
            </div>
          </Card>
        ))}

        {!searching && !accepted && !noResults && !requireAsset && bids.map(w => (
          <Card key={w.rank}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 20, background: T.color.navyDeep,
                  border: `1.5px solid ${T.color.gold500}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: T.color.gold500, fontFamily: T.fontSans, fontSize: 14, fontWeight: 700,
                }}>{w.name.split(' ').map(n => n[0]).join('').slice(0, 2)}</div>
                <div>
                  <Txt variant="body" style={{ fontWeight: 600 }}>{w.name}</Txt>
                  <RatingStars value={w.rating} count={w.ratingCount} compact />
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <Txt variant="caption" color={T.color.textMuted} style={{ letterSpacing: 0 }}>Bid</Txt>
                <Txt variant="subtitle" color={T.color.gold500}>{fmtBDT(w.bid)}</Txt>
              </div>
            </div>

            <button onClick={() => onViewReview && onViewReview(w)} style={{
              background: 'none', border: 'none', color: T.color.teal500,
              fontFamily: T.fontSans, fontSize: 13, fontWeight: 600, cursor: 'pointer', padding: 0,
              textDecoration: 'underline', marginBottom: 12, display: 'block',
            }}>View reviews →</button>

            <div style={{ display: 'flex', gap: 10 }}>
              <SecondaryButton style={{ flex: 1 }} onClick={() => onDecline(w.rank)}>Decline</SecondaryButton>
              <PrimaryButton style={{ flex: 2 }} onClick={() => setAccepted(w)}>Accept Bid</PrimaryButton>
            </div>
          </Card>
        ))}

        {!searching && !accepted && !noResults && bids.length === 0 && <EmptyState icon="briefcase" title="No more bids" body="Wait for more workers to bid or repost the job." />}

        {/* No match within the admin-defined window → 3 recovery options */}
        {!searching && !accepted && noResults && (
          <>
            <Banner variant="warning" title={`No ${entity} found in time`}>
              We couldn't match {requireAsset ? 'an asset service' : 'a worker'} for your job yet. Choose how you'd like to continue.
            </Banner>

            <Card>
              <Txt variant="bodySm" style={{ fontWeight: 600, marginBottom: 4 }}>1 · Change your offer</Txt>
              <Txt variant="caption" color={T.color.textMuted} style={{ letterSpacing: 0, marginBottom: 12 }}>
                A higher offer attracts more {requireAsset ? 'asset owners' : 'workers'}.
              </Txt>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 14 }}>
                <IconButton name="minus" size={40} iconSize={20} color={T.color.gold500}
                  onClick={() => setOffer(o => Math.max(100, o - 100))}
                  style={{ border: `1.5px solid ${T.color.gold500}` }} />
                <Txt variant="h2" color={T.color.gold500} style={{ minWidth: 110, textAlign: 'center' }}>{fmtBDT(offer)}</Txt>
                <IconButton name="plus" size={40} iconSize={20} color={T.color.gold500}
                  onClick={() => setOffer(o => o + 100)}
                  style={{ border: `1.5px solid ${T.color.gold500}` }} />
              </div>
              <PrimaryButton onClick={onBack}>Submit revised offer</PrimaryButton>
            </Card>

            <Card>
              <Txt variant="bodySm" style={{ fontWeight: 600, marginBottom: 4 }}>2 · Switch to Long Duration / Time Flexible</Txt>
              <Txt variant="caption" color={T.color.textMuted} style={{ letterSpacing: 0, marginBottom: 12 }}>
                The job moves to your Posted Jobs and shows in the worker feed under "Still active".
              </Txt>
              <SecondaryButton onClick={onBack}>Switch to long duration</SecondaryButton>
            </Card>

            <Card>
              <Txt variant="bodySm" style={{ fontWeight: 600, marginBottom: 4 }}>3 · Try again later</Txt>
              <Txt variant="caption" color={T.color.textMuted} style={{ letterSpacing: 0, marginBottom: 12 }}>
                Pause matching now — restart it any time from Posted Jobs.
              </Txt>
              <SecondaryButton onClick={onBack}>Try again later</SecondaryButton>
            </Card>
          </>
        )}

        {accepted && (
          <>
            {!requireAsset && <Txt variant="subtitle">Worker on the way</Txt>}
            <Card>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 20, background: T.color.navyDeep,
                    border: `1.5px solid ${T.color.gold500}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: T.color.gold500, fontFamily: T.fontSans, fontSize: 14, fontWeight: 700,
                  }}>{requireAsset ? <Icon name="truck" size={20} color={T.color.gold500} /> : accepted.name.split(' ').map(n => n[0]).join('').slice(0, 2)}</div>
                  <div>
                    <Txt variant="body" style={{ fontWeight: 600 }}>{requireAsset ? (accepted.asset || 'Asset') : accepted.name}</Txt>
                    {requireAsset
                      ? <Txt variant="caption" color={T.color.textMuted} style={{ letterSpacing: 0 }}>Owner · {accepted.name}</Txt>
                      : <RatingStars value={accepted.rating} count={accepted.ratingCount} compact />}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <Txt variant="caption" color={T.color.textMuted} style={{ letterSpacing: 0 }}>Bid</Txt>
                  <Txt variant="subtitle" color={T.color.gold500}>{fmtBDT(accepted.bid)}</Txt>
                </div>
              </div>
            </Card>
            {requireAsset
              ? <RouteMap height={180} title="Asset Live Location" fromLabel="You" toLabel={accepted.asset || 'Asset'} />
              : <RouteMap height={180} title="Worker Live Location" fromLabel={accepted.name} toLabel="Job site" />}
            <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 10, paddingBottom: 4 }}>
              <PrimaryButton onClick={() => onAccept && onAccept(accepted)}>Continue</PrimaryButton>
              <SecondaryButton onClick={() => setAccepted(null)}>Back to bids</SecondaryButton>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// ── Worker review list (drilled from shortlist) ─────────────
const WorkerReviewListScreen = ({ worker = { name: 'Rahim Uddin', rating: 4.9, ratingCount: 87 }, onBack }) => {
  const reviews = [
    { id: 1, employer: 'Karim Ahmed', employerSub: 'Motijheel · 12 jobs posted', stars: 5, date: '24/04/2026', text: 'Very professional, on time. Will hire again.' },
    { id: 2, employer: 'Salma Begum', employerSub: 'Dhanmondi · 4 jobs posted', stars: 5, date: '18/04/2026', text: 'Excellent communication and careful with the items.' },
    { id: 3, employer: 'Tareq Rahman', employerSub: 'Gulshan · 2 jobs posted', stars: 4, date: '12/04/2026', text: 'Good service, slight delay due to traffic but kept me updated.' },
    { id: 4, employer: 'Nusrat Jahan', employerSub: 'Banani · 1 job posted', stars: 5, date: '08/04/2026', text: 'Polite and quick. Recommended.' },
  ];
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: T.color.navyBg }}>
      <AppBarElevated title={`${worker.name} · Reviews`} left={<BackButton onClick={onBack} />} />
      <div style={{ flex: 1, padding: 16, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Card style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 56, height: 56, borderRadius: 28, background: T.color.navyDeep,
            border: `1.5px solid ${T.color.gold500}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: T.color.gold500, fontFamily: T.fontSans, fontSize: 18, fontWeight: 700,
          }}>{worker.name.split(' ').map(n => n[0]).join('').slice(0, 2)}</div>
          <div style={{ flex: 1 }}>
            <Txt variant="subtitle">{worker.name}</Txt>
            <RatingStars value={worker.rating} count={worker.ratingCount} compact />
          </div>
        </Card>
        {reviews.map(r => (
          <Card key={r.id}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
              <div>
                <Txt variant="bodySm" style={{ fontWeight: 600 }}>{r.employer}</Txt>
                <Txt variant="caption" color={T.color.textMuted} style={{ letterSpacing: 0, marginTop: 2 }}>{r.employerSub}</Txt>
              </div>
              <div style={{ display: 'flex', gap: 1 }}>
                {[1,2,3,4,5].map(i => (
                  <span key={i} style={{ color: i <= r.stars ? T.color.gold500 : T.color.navyBorder, fontSize: 14 }}>★</span>
                ))}
              </div>
            </div>
            <Txt variant="bodySm" color={T.color.textSecondary} style={{ lineHeight: 1.5, marginTop: 8 }}>"{r.text}"</Txt>
            <Txt variant="caption" color={T.color.textMuted} style={{ letterSpacing: 0, marginTop: 8 }}>{r.date}</Txt>
          </Card>
        ))}
      </div>
    </div>
  );
};

const EmployerReviewListScreen = ({ employer = { name: 'Karim Ahmed', sub: 'Motijheel · 142 jobs posted', rating: 4.8, ratingCount: 142 }, onBack }) => {
  const reviews = [
    { id: 1, worker: 'Rahim Uddin', workerSub: 'Mover · 87 jobs done', stars: 5, date: '24/04/2026', text: 'Clear instructions and paid promptly. Great client.' },
    { id: 2, worker: 'Jahidul Islam', workerSub: 'Electrician · 53 jobs done', stars: 5, date: '19/04/2026', text: 'Respectful and fair on price. Would work for again.' },
    { id: 3, worker: 'Sumon Mia', workerSub: 'Cleaner · 31 jobs done', stars: 4, date: '11/04/2026', text: 'Good job overall, scope changed a bit on site but sorted it out.' },
    { id: 4, worker: 'Arif Hossain', workerSub: 'Plumber · 18 jobs done', stars: 5, date: '06/04/2026', text: 'On-time payment, friendly. Recommended client.' },
  ];
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: T.color.navyBg }}>
      <AppBarElevated title={`${employer.name} · Reviews`} left={<BackButton onClick={onBack} />} />
      <div style={{ flex: 1, padding: 16, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Card style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 56, height: 56, borderRadius: 28, background: T.color.navyDeep,
            border: `1.5px solid ${T.color.gold500}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: T.color.gold500, fontFamily: T.fontSans, fontSize: 18, fontWeight: 700,
          }}>{employer.name.split(' ').map(n => n[0]).join('').slice(0, 2)}</div>
          <div style={{ flex: 1 }}>
            <Txt variant="subtitle">{employer.name}</Txt>
            <Txt variant="caption" color={T.color.textMuted} style={{ letterSpacing: 0, marginTop: 2, marginBottom: 4 }}>{employer.sub}</Txt>
            <RatingStars value={employer.rating} count={employer.ratingCount} compact />
          </div>
        </Card>
        {reviews.map(r => (
          <Card key={r.id}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
              <div>
                <Txt variant="bodySm" style={{ fontWeight: 600 }}>{r.worker}</Txt>
                <Txt variant="caption" color={T.color.textMuted} style={{ letterSpacing: 0, marginTop: 2 }}>{r.workerSub}</Txt>
              </div>
              <div style={{ display: 'flex', gap: 1 }}>
                {[1,2,3,4,5].map(i => (
                  <span key={i} style={{ color: i <= r.stars ? T.color.gold500 : T.color.navyBorder, fontSize: 14 }}>★</span>
                ))}
              </div>
            </div>
            <Txt variant="bodySm" color={T.color.textSecondary} style={{ lineHeight: 1.5, marginTop: 8 }}>"{r.text}"</Txt>
            <Txt variant="caption" color={T.color.textMuted} style={{ letterSpacing: 0, marginTop: 8 }}>{r.date}</Txt>
          </Card>
        ))}
      </div>
    </div>
  );
};

Object.assign(window, {
  JobPostFreeTextScreen, JobPostReviewScreen, JobPostSuccessScreen,
  InstantCancelPromptDialog,
  JobCard, JobFeedScreen, JobDetailScreen,
  BidSubmitScreen, BidEditScreen,
  RankedShortlistScreen, WorkerReviewListScreen, EmployerReviewListScreen,
});
