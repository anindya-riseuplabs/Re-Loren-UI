// Re'Loren v2 — employer/worker job flow screens.

// ── Job post composer (consolidated) ─────────────────────────
const JobPostFreeTextScreen = ({ onBack, onReview }) => {
  const [desc, setDesc] = useState('Need someone to pick up medicine from Motijheel pharmacy and deliver to Dhanmondi before 6 PM.');
  const [type, setType] = useState('regular');
  const [deadline, setDeadline] = useState(7);
  const [sameAsFrom, setSameAsFrom] = useState(false);
  const [radius, setRadius] = useState(2);
  const [budget, setBudget] = useState('1500');
  const [priceBlock, setPriceBlock] = useState(false);
  const allFilled = desc && type && (type === 'instant' || deadline) && budget && parseInt(budget) > 0;
  const onSubmit = () => {
    if (/\b\d{3,}\b|taka|tk|৳/i.test(desc)) { setPriceBlock(true); return; }
    onReview && onReview();
  };
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: T.color.navyBg }}>
      <AppBarElevated title="Post a Job" left={<BackButton onClick={onBack} />} />
      <div style={{ flex: 1, padding: 16, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <Txt variant="caption" color={T.color.textMuted}>① DESCRIBE THE JOB · REQUIRED</Txt>
          <Txt variant="bodySm" color={T.color.textSecondary} style={{ marginTop: 4, marginBottom: 10 }}>
            Bangla, Banglish, or English — in your own words.
          </Txt>
          <TextField multiline rows={5} value={desc} onChange={setDesc} />
        </div>
        {priceBlock && <Banner variant="error" title="Don't mention a price">
          Workers will bid on your job — prices happen in bids, not descriptions.
        </Banner>}
        {!priceBlock && <Banner variant="warning">Don't mention a price here — workers bid on jobs.</Banner>}

        <div>
          <Txt variant="caption" color={T.color.textMuted} style={{ marginBottom: 10 }}>② HOW URGENT IS THIS JOB? · REQUIRED</Txt>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Radio checked={type === 'instant'} onClick={() => setType('instant')}
              label="Instant" sub="Pings nearby workers. Cancel anytime." />
            <Radio checked={type === 'regular'} onClick={() => setType('regular')}
              label="Regular" sub="Has a deadline. More bids expected." />
          </div>
        </div>

        {type === 'regular' && (
          <div>
            <Txt variant="caption" color={T.color.textMuted} style={{ marginBottom: 10 }}>③ DEADLINE · REQUIRED</Txt>
            <div style={{ display: 'flex', gap: 8 }}>
              {[3, 7, 15].map(d => (
                <button key={d} onClick={() => setDeadline(d)}
                  style={{
                    flex: 1, minHeight: 44, borderRadius: T.radius.m,
                    border: `1px solid ${deadline === d ? T.color.gold500 : T.color.navyBorder}`,
                    background: deadline === d ? 'rgba(212,175,55,0.08)' : 'transparent',
                    color: T.color.gold500, cursor: 'pointer',
                    fontFamily: T.fontSans, fontSize: 14, fontWeight: 600,
                  }}>{d} days</button>
              ))}
            </div>
          </div>
        )}

        <div>
          <Txt variant="caption" color={T.color.textMuted} style={{ marginBottom: 10 }}>④ WHERE IS THIS JOB? · REQUIRED</Txt>
          <Card style={{ padding: 0, overflow: 'hidden', marginBottom: 10 }}>
            <div style={{
              height: 120, background: `linear-gradient(135deg, ${T.color.navyDeep}, ${T.color.navyHover})`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative',
            }}>
              <svg viewBox="0 0 200 100" style={{ width: '100%', height: '100%', opacity: 0.5 }}>
                {[...Array(6)].map((_, i) => <line key={i} x1="0" x2="200" y1={15 + i * 15} y2={15 + i * 15}
                  stroke={T.color.gold500} strokeWidth="0.3" />)}
                {[...Array(8)].map((_, i) => <line key={i} y1="0" y2="100" x1={25 * i} x2={25 * i}
                  stroke={T.color.gold500} strokeWidth="0.3" />)}
              </svg>
              <Icon name="location" size={28} color={T.color.gold500} style={{ position: 'absolute' }} />
            </div>
            <div style={{ padding: 12 }}>
              <Txt variant="bodySm" style={{ fontWeight: 600 }}>From: Motijheel, Dhaka</Txt>
            </div>
          </Card>
          <Checkbox checked={sameAsFrom} label="Same as from" onClick={() => setSameAsFrom(!sameAsFrom)} />
          {!sameAsFrom && (
            <Card style={{ marginTop: 8, padding: 12 }}>
              <Txt variant="bodySm" style={{ fontWeight: 600 }}>To: Dhanmondi, Dhaka</Txt>
            </Card>
          )}
          <div style={{ marginTop: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <Txt variant="caption" color={T.color.textMuted} style={{ letterSpacing: 0 }}>Radius</Txt>
              <Txt variant="caption" color={T.color.gold500} style={{ letterSpacing: 0 }}>
                {radius < 1 ? `${radius * 1000} m` : `${radius} km`}
              </Txt>
            </div>
            <input type="range" min={0.5} max={20} step={0.5} value={radius}
              onChange={e => setRadius(parseFloat(e.target.value))}
              style={{ width: '100%', accentColor: T.color.gold500 }} />
          </div>
        </div>

        <div>
          <Txt variant="caption" color={T.color.textMuted} style={{ marginBottom: 10 }}>⑤ BUDGET · REQUIRED</Txt>
          <TextField value={budget} onChange={v => setBudget(v.replace(/\D/g, ''))}
            prefix={<span style={{ color: T.color.gold500, fontWeight: 600 }}>৳</span>}
            placeholder="1,500"
            helper="Workers see this as your ceiling while bidding." />
        </div>

        <Banner variant="info">Heads-up: posts can't be edited once published.</Banner>

        <div style={{ marginTop: 8 }}>
          <PrimaryButton onClick={onSubmit} disabled={!allFilled}>Review & post</PrimaryButton>
        </div>
      </div>
    </div>
  );
};

// ── Job post review ──────────────────────────────────────────
const JobPostReviewScreen = ({ onBack, onPost }) => (
  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: T.color.navyBg }}>
    <AppBarElevated title="Review your job" subtitle="4 of 4" left={<BackButton onClick={onBack} />} />
    <div style={{ flex: 1, padding: 16, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 14 }}>
      <Card>
        <Txt variant="caption" color={T.color.textMuted} style={{ marginBottom: 8 }}>DESCRIPTION</Txt>
        <Txt variant="body" style={{ fontStyle: 'italic' }}>
          "Need someone to pick up medicine from Motijheel pharmacy and deliver to Dhanmondi before 6 PM."
        </Txt>
      </Card>
      <Card>
        {[
          ['Type', 'Regular'], ['Deadline', '7 days · by 01/05/2026'],
          ['From', 'Motijheel, Dhaka'], ['To', 'Dhanmondi, Dhaka'],
          ['Radius', '2 km'], ['Budget ceiling', '৳1,500'],
        ].map(([k, v]) => (
          <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: `1px solid ${T.color.navyBorder}` }}>
            <Txt variant="bodySm" color={T.color.textSecondary}>{k}</Txt>
            <Txt variant="bodySm">{v}</Txt>
          </div>
        ))}
      </Card>
      <Banner variant="info">Posts cannot be edited once published.</Banner>
      <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <PrimaryButton onClick={onPost}>Post job</PrimaryButton>
        <SecondaryButton onClick={onBack}>Edit</SecondaryButton>
      </div>
    </div>
  </div>
);

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
const JobCard = ({ job, onClick }) => (
  <Card onClick={onClick}>
    <Txt variant="subtitle" style={{ marginBottom: 6, fontSize: 16 }}>{job.title}</Txt>
    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
      {job.tags.map(t => <CapabilityTag key={t}>{t}</CapabilityTag>)}
      <StatusPill variant={job.status}>{job.status.replace('_', ' ')}</StatusPill>
    </div>
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 6 }}>
      <Txt variant="bodySm" color={T.color.gold500} style={{ fontWeight: 600 }}>{fmtBDT(job.price)}</Txt>
      <Txt variant="bodySm" color={T.color.textSecondary}>· {job.distance}</Txt>
      <Txt variant="bodySm" color={T.color.textSecondary}>· {job.bids} bid{job.bids !== 1 ? 's' : ''}</Txt>
    </div>
    <Txt variant="caption" color={T.color.textMuted} style={{ letterSpacing: 0 }}>
      {job.postedAgo ? `Posted ${job.postedAgo} ago` : `Deadline: ${job.deadline}`}
    </Txt>
  </Card>
);

// ── Job feed (worker) ────────────────────────────────────────
const JobFeedScreen = ({ onOpenJob }) => {
  const [seg, setSeg] = useState('instant');
  const [filterOpen, setFilterOpen] = useState(false);
  const [sort, setSort] = useState('nearest');
  const jobs = SAMPLE.jobFeed.filter(j => j.type === seg);
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: T.color.navyBg }}>
      <AppBarElevated title="Jobs for you" right={<IconButton name="filter" onClick={() => setFilterOpen(true)} />} />
      <div style={{ flex: 1, padding: 16, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <Segmented
          options={[{ value: 'instant', label: 'Instant Work' }, { value: 'regular', label: 'Regular Work' }]}
          value={seg} onChange={setSeg} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Txt variant="caption" color={T.color.textMuted} style={{ letterSpacing: 0 }}>
            Sort: {sort === 'nearest' ? 'Nearest' : sort === 'low' ? 'Price ↑' : sort === 'high' ? 'Price ↓' : 'Latest'}
          </Txt>
          <Txt variant="caption" color={T.color.textMuted} style={{ letterSpacing: 0 }}>
            Filters: 2 km · Bangla
          </Txt>
        </div>
        {jobs.map(j => <JobCard key={j.id} job={j} onClick={() => onOpenJob(j)} />)}
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
          <Txt variant="caption" color={T.color.textMuted} style={{ marginTop: 18, marginBottom: 8 }}>DISTANCE RADIUS</Txt>
          <input type="range" min={0.5} max={20} defaultValue={2} style={{ width: '100%', accentColor: T.color.gold500 }} />
          <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
            <SecondaryButton onClick={() => setFilterOpen(false)}>Clear all</SecondaryButton>
            <PrimaryButton onClick={() => setFilterOpen(false)}>Apply filters</PrimaryButton>
          </div>
        </BottomSheet>
      )}
    </div>
  );
};

// ── Job detail ───────────────────────────────────────────────
const JobDetailScreen = ({ job, onBack, onBid }) => {
  const j = job || SAMPLE.jobFeed[0];
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: T.color.navyBg }}>
      <AppBarElevated title="Job Detail" left={<BackButton onClick={onBack} />} />
      <div style={{ flex: 1, padding: 16, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <StatusPill variant="bidding">Bidding</StatusPill>
          <Txt variant="caption" color={T.color.textSecondary} style={{ letterSpacing: 0 }}>
            Type: {j.type === 'instant' ? 'Instant' : 'Regular · 7 days'}
          </Txt>
        </div>
        <Txt variant="body" style={{ fontStyle: 'italic' }}>"{j.description || j.title}"</Txt>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {j.tags.map(t => <CapabilityTag key={t}>{t}</CapabilityTag>)}
          <CapabilityTag>Pickup / drop</CapabilityTag>
        </div>
        <Card>
          <Txt variant="caption" color={T.color.textMuted} style={{ marginBottom: 8 }}>ROUTE</Txt>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <div style={{ width: 8, height: 8, borderRadius: 4, background: T.color.success }} />
            <Txt variant="bodySm">From: Motijheel, Dhaka</Txt>
          </div>
          <div style={{ height: 16, width: 2, background: T.color.navyBorder, marginLeft: 3 }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 8, height: 8, borderRadius: 4, background: T.color.error }} />
            <Txt variant="bodySm">To: Dhanmondi, Dhaka</Txt>
          </div>
          <Txt variant="caption" color={T.color.textMuted} style={{ marginTop: 10, letterSpacing: 0 }}>Radius: 2 km</Txt>
        </Card>
        <Card>
          <Txt variant="caption" color={T.color.textMuted} style={{ marginBottom: 8 }}>POSTED BY</Txt>
          <Txt variant="body" style={{ fontWeight: 600, marginBottom: 4 }}>Karim Ahmed</Txt>
          <RatingStars value={4.8} count={142} />
          <Txt variant="caption" color={T.color.textMuted} style={{ marginTop: 6, letterSpacing: 0 }}>
            37 jobs posted · Member since 2024
          </Txt>
        </Card>
        <Txt variant="bodySm" color={T.color.textSecondary}>4 bids so far · 7 days left</Txt>
        <div style={{ marginTop: 'auto' }}>
          <PrimaryButton onClick={onBid}>Place a bid</PrimaryButton>
        </div>
      </div>
    </div>
  );
};

// ── Bid submit ───────────────────────────────────────────────
const BidSubmitScreen = ({ onBack, onSubmit }) => {
  const [amount, setAmount] = useState('1500');
  const [note, setNote] = useState("I'm 5 minutes away and can start right now.");
  const net = Math.round(parseInt(amount || '0') * 0.85);
  const commission = parseInt(amount || '0') - net;
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: T.color.navyBg }}>
      <AppBarElevated title="Place Your Bid" left={<BackButton onClick={onBack} />} />
      <div style={{ flex: 1, padding: 16, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <Txt variant="caption" color={T.color.textMuted}>JOB</Txt>
        <Txt variant="bodySm">Medicine delivery — Motijheel → Dhanmondi</Txt>
        <TextField label="Your bid amount" value={amount} onChange={v => setAmount(v.replace(/\D/g, ''))}
          prefix={<span style={{ color: T.color.gold500, fontWeight: 600 }}>৳</span>} />
        <Card>
          <Txt variant="caption" color={T.color.textMuted} style={{ marginBottom: 10 }}>PRICE BREAKDOWN</Txt>
          {[
            ['Gross (employer pays)', fmtBDT(parseInt(amount || '0'))],
            ['Platform commission 15%', '−' + fmtBDT(commission)],
          ].map(([k, v]) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0' }}>
              <Txt variant="bodySm" color={T.color.textSecondary}>{k}</Txt>
              <Txt variant="bodySm">{v}</Txt>
            </div>
          ))}
          <div style={{ height: 1, background: T.color.navyBorder, margin: '6px 0' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0' }}>
            <Txt variant="bodySm" style={{ fontWeight: 600 }}>Your payout (net)</Txt>
            <Txt variant="bodySm" color={T.color.gold500} style={{ fontWeight: 700 }}>{fmtBDT(net)}</Txt>
          </div>
        </Card>
        <TextField label="Note to employer (optional)" multiline rows={3} value={note} onChange={setNote} />
        <Banner variant="info">You can edit this bid until it's accepted.</Banner>
        <div style={{ marginTop: 'auto' }}>
          <PrimaryButton onClick={onSubmit} disabled={!amount}>Submit bid</PrimaryButton>
        </div>
      </div>
    </div>
  );
};

// ── Bid edit ─────────────────────────────────────────────────
const BidEditScreen = ({ onBack, onUpdate, onWithdraw }) => {
  const [amount, setAmount] = useState('1400');
  const net = Math.round(parseInt(amount || '0') * 0.85);
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: T.color.navyBg }}>
      <AppBarElevated title="Edit Your Bid" left={<BackButton onClick={onBack} />} />
      <div style={{ flex: 1, padding: 16, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <StatusPill variant="bidding">Bidding</StatusPill>
          <Txt variant="bodySm" color={T.color.textSecondary}>— you can still edit</Txt>
        </div>
        <TextField label="Your bid amount" value={amount} onChange={v => setAmount(v.replace(/\D/g, ''))}
          prefix={<span style={{ color: T.color.gold500, fontWeight: 600 }}>৳</span>} />
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
            <Txt variant="bodySm" color={T.color.textSecondary}>Gross</Txt>
            <Txt variant="bodySm">{fmtBDT(parseInt(amount || '0'))}</Txt>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
            <Txt variant="bodySm" color={T.color.textSecondary}>Commission 15%</Txt>
            <Txt variant="bodySm">−{fmtBDT(parseInt(amount || '0') - net)}</Txt>
          </div>
          <div style={{ height: 1, background: T.color.navyBorder, margin: '6px 0' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
            <Txt variant="bodySm" style={{ fontWeight: 600 }}>Net payout</Txt>
            <Txt variant="bodySm" color={T.color.gold500} style={{ fontWeight: 700 }}>{fmtBDT(net)}</Txt>
          </div>
        </Card>
        <TextField label="Note to employer" multiline rows={2} value="Can start right now." />
        <Banner variant="warning">Once the employer accepts, this bid locks.</Banner>
        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <PrimaryButton onClick={onUpdate}>Update bid</PrimaryButton>
          <DestructiveButton onClick={onWithdraw}>Withdraw bid</DestructiveButton>
        </div>
      </div>
    </div>
  );
};

// ── Ranked shortlist ─────────────────────────────────────────
const RankedShortlistScreen = ({ onBack, onAccept, onExplain }) => (
  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: T.color.navyBg }}>
    <AppBarElevated title="Shortlist" subtitle={`${SAMPLE.shortlist.length} workers`} left={<BackButton onClick={onBack} />} />
    <div style={{ flex: 1, padding: 16, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 14 }}>
      <Txt variant="bodySm" color={T.color.textSecondary}>
        Ranked by tag match, distance, rating, language.
      </Txt>
      {SAMPLE.shortlist.map(w => (
        <Card key={w.rank}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 28, height: 28, borderRadius: 14, background: T.color.gold500,
                color: T.color.textOnGold, fontFamily: T.fontSans, fontSize: 13, fontWeight: 700,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>#{w.rank}</div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Txt variant="body" style={{ fontWeight: 600 }}>{w.name}</Txt>
                  {w.verified && <VerifiedBadge />}
                </div>
                <div style={{ marginTop: 3 }}>
                  <RatingStars value={w.rating} count={w.ratingCount} compact />
                </div>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <Txt variant="caption" color={T.color.textMuted} style={{ letterSpacing: 0 }}>Bid</Txt>
              <Txt variant="subtitle" color={T.color.gold500}>{fmtBDT(w.bid)}</Txt>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
            {w.chips.map(c => (
              <ExplanationChip key={c} kind={c}>
                {c === 'tag-match' ? 'exact' : c === 'asset' ? (w.asset || 'Motorbike') : c === 'distance' ? w.distance : c === 'rating' ? w.rating.toFixed(1) : w.languages[0]}
              </ExplanationChip>
            ))}
          </div>
          <button onClick={onExplain}
            style={{
              background: 'none', border: 'none', color: T.color.gold500,
              fontFamily: T.fontSans, fontSize: 13, fontWeight: 500, cursor: 'pointer', padding: 0,
              marginBottom: 12, display: 'inline-flex', alignItems: 'center', gap: 4,
            }}>Why this match? <Icon name="chevron" size={14} color={T.color.gold500} /></button>
          {w.rank === 1
            ? <PrimaryButton onClick={onAccept}>Accept bid</PrimaryButton>
            : <SecondaryButton>View profile</SecondaryButton>}
        </Card>
      ))}
    </div>
  </div>
);

// ── Match explanation (bottom sheet) ─────────────────────────
const MatchExplanationDetailSheet = ({ onClose }) => (
  <BottomSheet onClose={onClose} title="Why Rahim Uddin matched">
    <Txt variant="caption" color={T.color.textMuted} style={{ marginBottom: 8 }}>TAG MATCH</Txt>
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 6 }}>
      <CapabilityTag>Bike delivery</CapabilityTag>
      <Txt variant="caption" color={T.color.textMuted} style={{ letterSpacing: 0, alignSelf: 'center' }}>← employer</Txt>
    </div>
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 10 }}>
      <CapabilityTag>Bike delivery</CapabilityTag>
      <Txt variant="caption" color={T.color.textMuted} style={{ letterSpacing: 0, alignSelf: 'center' }}>← worker</Txt>
    </div>
    <ExplanationChip kind="tag-match">exact</ExplanationChip>
    <div style={{ height: 16 }} />
    <Txt variant="caption" color={T.color.textMuted} style={{ marginBottom: 8 }}>ASSET CHECK</Txt>
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <ExplanationChip kind="asset">Motorbike</ExplanationChip>
      <VerifiedBadge />
    </div>
    <div style={{ height: 16 }} />
    <Txt variant="caption" color={T.color.textMuted} style={{ marginBottom: 8 }}>DISTANCE</Txt>
    <ExplanationChip kind="distance">600 m</ExplanationChip>
    <div style={{ height: 16 }} />
    <Txt variant="caption" color={T.color.textMuted} style={{ marginBottom: 8 }}>RATING (SOFT-WEIGHTED)</Txt>
    <ExplanationChip kind="rating">4.9 ★</ExplanationChip>
    <div style={{ height: 16 }} />
    <Txt variant="caption" color={T.color.textMuted} style={{ marginBottom: 8 }}>LANGUAGE (SOFT BOOST)</Txt>
    <ExplanationChip kind="language">Bangla + English</ExplanationChip>
    <div style={{ height: 16 }} />
    <Txt variant="caption" color={T.color.textMuted} style={{ marginBottom: 8 }}>RELEVANCE SOURCE</Txt>
    <ExplanationChip kind="relevance-source">admin table</ExplanationChip>
    <div style={{ height: 20 }} />
    <SecondaryButton onClick={onClose}>Close</SecondaryButton>
  </BottomSheet>
);

Object.assign(window, {
  JobPostFreeTextScreen, JobPostReviewScreen, InstantCancelPromptDialog,
  JobCard, JobFeedScreen, JobDetailScreen,
  BidSubmitScreen, BidEditScreen,
  RankedShortlistScreen, MatchExplanationDetailSheet,
});
