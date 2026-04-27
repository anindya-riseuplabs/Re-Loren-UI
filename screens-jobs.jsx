// Re'Loren v2 — employer/worker job flow screens.

// ── Job post composer (ChatGPT-style free text) ─────────────
const JobPostFreeTextScreen = ({ onBack, onReview }) => {
  const [desc, setDesc] = useState('Need someone to pick up medicine from Motijheel pharmacy and deliver to Dhanmondi before 6 PM.');
  const [jobType, setJobType] = useState('instant'); // 'instant' or 'regular'
  const [deadline, setDeadline] = useState('2026-05-01');
  const [relocate, setRelocate] = useState('yes'); // 'yes' or 'no'
  const [from, setFrom] = useState('Motijheel, Dhaka');
  const [to, setTo] = useState('Dhanmondi, Dhaka');
  const [budget, setBudget] = useState('1500');
  const [priceBlock, setPriceBlock] = useState(false);

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
      <AppBarElevated title="Post a Job" left={<BackButton onClick={onBack} />} />
      <div style={{ flex: 1, padding: 16, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 16 }}>

        <div>
          <Txt variant="caption" color={T.color.textMuted} style={{ marginBottom: 8, display: 'block' }}>DESCRIBE YOUR JOB</Txt>
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
            <option value="regular">Regular</option>
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
                background: relocate === o.v ? 'rgba(212,175,55,0.10)' : T.color.navyRaised,
                border: `1.5px solid ${relocate === o.v ? T.color.gold500 : T.color.navyBorder}`,
                color: relocate === o.v ? T.color.gold500 : T.color.textSecondary,
                fontFamily: T.fontSans, fontSize: 14, fontWeight: 600,
              }}>{o.l}</button>
            ))}
          </div>
        </div>

        {needsRoute && (
          <>
            <TextField label="From" value={from} onChange={setFrom} placeholder="Pickup location..." />
            <TextField label="To" value={to} onChange={setTo} placeholder="Drop-off location..." />
          </>
        )}

        <TextField label="Budget" value={budget} onChange={v => setBudget(v.replace(/\D/g, ''))}
          prefix={<span style={{ color: T.color.gold500, fontWeight: 600 }}>৳</span>}
          placeholder="1,500" />

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
              background: 'rgba(212,175,55,0.10)', border: `1px solid ${T.color.gold500}`,
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
            ['Job type', jobType === 'instant' ? 'Instant' : 'Regular'],
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

const JobPostSuccessScreen = ({ data = {}, onDone }) => {
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

// ── Job feed (worker) — verified prop drives accept-button state ──
const JobFeedScreen = ({ onOpenJob, onNav, verified = true }) => {
  const [seg, setSeg] = useState('immediate');
  const [filterOpen, setFilterOpen] = useState(false);
  const [sort, setSort] = useState('nearest');
  const [isDrawerOpen, setDrawerOpen] = useState(false);

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
                  background: 'rgba(212,175,55,0.10)', border: `1px solid ${T.color.gold500}`,
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

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Txt variant="caption" color={T.color.textMuted} style={{ letterSpacing: 0 }}>
            {jobs.length} jobs available nearby
          </Txt>
          <IconButton name="filter" onClick={() => setFilterOpen(true)} size={32} iconSize={18} />
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
const JobDetailScreen = ({ job, onBack, onBid, verified = false }) => {
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
          <Txt variant="caption" color={T.color.textMuted} style={{ marginBottom: 8 }}>POSTED BY</Txt>
          <div>
            <Txt variant="body" style={{ fontWeight: 600, marginBottom: 2 }}>Karim Ahmed</Txt>
            <RatingStars value={4.8} count={142} />
          </div>
        </Card>

        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 12, paddingBottom: 20 }}>
          {!verified && <Banner variant="warning">You must be verified to apply for jobs.</Banner>}
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
const BidSubmitScreen = ({ onBack, onSubmit }) => {
  const [amount, setAmount] = useState('1500');
  const [showPopup, setShowPopup] = useState(false);
  const net = Math.round(parseInt(amount || '0') * 0.85);
  const commission = parseInt(amount || '0') - net;

  if (showPopup) return (
    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: T.color.navyBg, padding: 24 }}>
      <Card style={{ textAlign: 'center', padding: 32 }}>
        <Icon name="checkCircle" size={64} color={T.color.success} style={{ marginBottom: 16 }} />
        <Txt variant="title" style={{ marginBottom: 8 }}>Bid submitted</Txt>
        <Txt variant="bodySm" color={T.color.textSecondary} style={{ marginBottom: 24 }}>
          Your bid has been placed. You will be notified if the employer accepts.
        </Txt>
        <PrimaryButton onClick={onSubmit}>Go to dashboard</PrimaryButton>
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
  const net = Math.round(parseInt(amount || '0') * 0.85);
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
        <Banner variant="warning">Once the employer accepts, this bid locks.</Banner>
        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <PrimaryButton onClick={onUpdate}>Update bid</PrimaryButton>
          <DestructiveButton onClick={onWithdraw}>Withdraw bid</DestructiveButton>
        </div>
      </div>
    </div>
  );
};

// ── Job in progress (was Manage Bids) — uber-style search → bids list ──
const RankedShortlistScreen = ({ onBack, onAccept, onViewReview, requireAsset = false, onViewAsset }) => {
  const [searching, setSearching] = useState(true);
  const [bids, setBids] = useState(SAMPLE.shortlist);

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
              {searching ? 'Searching for workers nearby' : 'Workers found nearby'}
            </Txt>
            <Txt variant="caption" color={T.color.textMuted} style={{ letterSpacing: 0, marginTop: 2 }}>
              {searching ? 'Finding the best matches for your job' : 'Pick the worker you want to hire'}
            </Txt>
          </div>
        </div>

        <style>{`
          @keyframes searchPulse {
            0%   { transform: scale(0.6); opacity: 0.6; }
            100% { transform: scale(1.6); opacity: 0; }
          }
        `}</style>

        {!searching && bids.map(w => (
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
              background: 'none', border: 'none', color: T.color.gold500,
              fontFamily: T.fontSans, fontSize: 13, fontWeight: 600, cursor: 'pointer', padding: 0,
              textDecoration: 'underline', marginBottom: 12,
            }}>View reviews →</button>

            {requireAsset && (
              <SecondaryButton style={{ marginBottom: 10, minHeight: 38, fontSize: 13 }}
                onClick={() => onViewAsset && onViewAsset(w)} icon="truck">View asset details</SecondaryButton>
            )}

            <div style={{ display: 'flex', gap: 10 }}>
              <SecondaryButton style={{ flex: 1 }} onClick={() => onDecline(w.rank)}>Decline</SecondaryButton>
              <PrimaryButton style={{ flex: 2 }} onClick={() => onAccept && onAccept(w)}>Accept Bid</PrimaryButton>
            </div>
          </Card>
        ))}

        {!searching && bids.length === 0 && <EmptyState icon="briefcase" title="No more bids" body="Wait for more workers to bid or repost the job." />}
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

Object.assign(window, {
  JobPostFreeTextScreen, JobPostReviewScreen, JobPostSuccessScreen,
  InstantCancelPromptDialog,
  JobCard, JobFeedScreen, JobDetailScreen,
  BidSubmitScreen, BidEditScreen,
  RankedShortlistScreen, WorkerReviewListScreen,
});
