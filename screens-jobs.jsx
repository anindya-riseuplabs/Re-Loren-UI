// Re'Loren v2 — employer/worker job flow screens.

// ── Job post composer (consolidated) ─────────────────────────
const JobPostFreeTextScreen = ({ onBack, onReview }) => {
  const [caption, setCaption] = useState('Medicine delivery');
  const [desc, setDesc] = useState('Need someone to pick up medicine from Motijheel pharmacy and deliver to Dhanmondi before 6 PM.');
  const [hiringOption, setHiringOption] = useState('later'); // 'now' or 'later'
  const [deadline, setDeadline] = useState('2026-05-01');
  const [from, setFrom] = useState('Motijheel, Dhaka');
  const [to, setTo] = useState('Dhanmondi, Dhaka');
  const [relocate, setRelocate] = useState(false);
  const [relocationLocation, setRelocationLocation] = useState('');
  const [budget, setBudget] = useState('1500');
  const [priceBlock, setPriceBlock] = useState(false);

  const allFilled = caption && desc && budget && from && to && (hiringOption === 'now' || deadline);

  const onSubmit = () => {
    if (/\b\d{3,}\b|taka|tk|৳/i.test(desc)) { setPriceBlock(true); return; }
    onReview && onReview({ caption, desc, hiringOption, deadline, from, to, relocate, relocationLocation, budget });
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: T.color.navyBg }}>
      <AppBarElevated title="Post a Job" left={<BackButton onClick={onBack} />} />
      <div style={{ flex: 1, padding: 16, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 20 }}>
        
        <div>
          <Txt variant="caption" color={T.color.textMuted} style={{ marginBottom: 8, display: 'block' }}>JOB CAPTION</Txt>
          <TextField placeholder="e.g. Delivery, Handyman..." value={caption} onChange={setCaption} />
        </div>

        <div>
          <Txt variant="caption" color={T.color.textMuted} style={{ marginBottom: 8, display: 'block' }}>JOB DESCRIPTION</Txt>
          <TextField multiline rows={4} placeholder="Describe what needs to be done..." value={desc} onChange={setDesc} />
          {priceBlock && <Banner variant="error" title="Don't mention a price" style={{ marginTop: 10 }}>
            Workers will bid on your job — prices happen in bids, not descriptions.
          </Banner>}
        </div>

        <div>
          <Txt variant="caption" color={T.color.textMuted} style={{ marginBottom: 10, display: 'block' }}>HIRING OPTION</Txt>
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={() => setHiringOption('now')}
              style={{
                flex: 1, minHeight: 48, borderRadius: T.radius.m,
                border: `1.5px solid ${hiringOption === 'now' ? T.color.gold500 : T.color.navyBorder}`,
                background: hiringOption === 'now' ? 'rgba(212,175,55,0.08)' : 'transparent',
                color: hiringOption === 'now' ? T.color.gold500 : T.color.textMuted,
                cursor: 'pointer', fontFamily: T.fontSans, fontSize: 15, fontWeight: 600,
              }}>Hire now</button>
            <button onClick={() => setHiringOption('later')}
              style={{
                flex: 1, minHeight: 48, borderRadius: T.radius.m,
                border: `1.5px solid ${hiringOption === 'later' ? T.color.gold500 : T.color.navyBorder}`,
                background: hiringOption === 'later' ? 'rgba(212,175,55,0.08)' : 'transparent',
                color: hiringOption === 'later' ? T.color.gold500 : T.color.textMuted,
                cursor: 'pointer', fontFamily: T.fontSans, fontSize: 15, fontWeight: 600,
              }}>Hire later</button>
          </div>
        </div>

        {hiringOption === 'later' && (
          <div>
            <Txt variant="caption" color={T.color.textMuted} style={{ marginBottom: 8, display: 'block' }}>DEADLINE</Txt>
            <TextField type="date" value={deadline} onChange={setDeadline} />
          </div>
        )}

        <div>
          <Txt variant="caption" color={T.color.textMuted} style={{ marginBottom: 10, display: 'block' }}>LOCATION FLOW</Txt>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <TextField label="From" value={from} onChange={setFrom} placeholder="Current location..." />
            
            <div style={{ position: 'relative' }}>
              <Txt variant="bodySm" color={T.color.gold500} style={{ marginBottom: 6, fontWeight: 500 }}>To</Txt>
              <select 
                value={relocate ? 'relocate' : to}
                onChange={(e) => {
                  if (e.target.value === 'relocate') {
                    setRelocate(true);
                  } else {
                    setRelocate(false);
                    setTo(e.target.value);
                  }
                }}
                style={{
                  width: '100%', minHeight: 48, background: T.color.navyRaised,
                  border: `1.5px solid ${T.color.navyBorder}`, borderRadius: T.radius.m,
                  color: T.color.textPrimary, padding: '0 14px', fontFamily: T.fontSans, fontSize: 16,
                  outline: 'none', appearance: 'none',
                }}
              >
                <option value={from}>{from} (Same as From)</option>
                <option value="Dhanmondi, Dhaka">Dhanmondi, Dhaka</option>
                <option value="Gulshan, Dhaka">Gulshan, Dhaka</option>
                <option value="relocate">Worker needs to relocate</option>
              </select>
            </div>

            {relocate && (
              <TextField label="Relocation Location" value={relocationLocation} onChange={setRelocationLocation} placeholder="Enter destination..." />
            )}
          </div>
        </div>

        <div>
          <Txt variant="caption" color={T.color.textMuted} style={{ marginBottom: 8, display: 'block' }}>BUDGET</Txt>
          <TextField value={budget} onChange={v => setBudget(v.replace(/\D/g, ''))}
            prefix={<span style={{ color: T.color.gold500, fontWeight: 600 }}>৳</span>}
            placeholder="1,500" />
        </div>

        <div style={{ marginTop: 10, paddingBottom: 20 }}>
          <PrimaryButton onClick={onSubmit} disabled={!allFilled}>Review & post</PrimaryButton>
        </div>
      </div>
    </div>
  );
};

// ── Job post review ──────────────────────────────────────────
const JobPostReviewScreen = ({ data = {}, onBack, onPost }) => {
  const { caption, desc, hiringOption, deadline, from, to, relocate, relocationLocation, budget } = data;
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: T.color.navyBg }}>
      <AppBarElevated title="Review your job" left={<BackButton onClick={onBack} />} />
      <div style={{ flex: 1, padding: 16, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <Card>
          <Txt variant="caption" color={T.color.textMuted} style={{ marginBottom: 8 }}>JOB</Txt>
          <Txt variant="subtitle" style={{ fontSize: 18 }}>{caption}</Txt>
          <Txt variant="body" style={{ marginTop: 8, fontStyle: 'italic', color: T.color.textSecondary }}>
            "{desc}"
          </Txt>
        </Card>
        <Card>
          {[
            ['Hiring', hiringOption === 'now' ? 'Hire Now' : 'Hire Later'],
            hiringOption === 'later' ? ['Deadline', deadline] : null,
            ['From', from],
            ['To', relocate ? `Relocate to: ${relocationLocation}` : to],
            ['Budget ceiling', fmtBDT(budget)],
          ].filter(Boolean).map(([k, v]) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: `1px solid ${T.color.navyBorder}` }}>
              <Txt variant="bodySm" color={T.color.textSecondary}>{k}</Txt>
              <Txt variant="bodySm" style={{ fontWeight: 500 }}>{v}</Txt>
            </div>
          ))}
        </Card>
        <Banner variant="info">Posts cannot be edited once published.</Banner>
        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 10, paddingBottom: 20 }}>
          <PrimaryButton onClick={() => onPost(data)}>Post job</PrimaryButton>
          <SecondaryButton onClick={onBack}>Edit</SecondaryButton>
        </div>
      </div>
    </div>
  );
};

const JobPostSuccessScreen = ({ data = {}, onDone }) => {
  const isHireNow = data.hiringOption === 'now';
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
const JobCard = ({ job, onClick, onAccept }) => (
  <Card onClick={onClick}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
      <Txt variant="subtitle" style={{ fontSize: 18, fontWeight: 700 }}>{job.title}</Txt>
      <Txt variant="subtitle" color={T.color.gold500}>{fmtBDT(job.price)}</Txt>
    </div>
    
    <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <Icon name="location" size={14} color={T.color.textMuted} />
        <Txt variant="caption" color={T.color.textMuted}>{job.location || 'Dhaka'}</Txt>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <Icon name="truck" size={14} color={T.color.textMuted} />
        <Txt variant="caption" color={T.color.textMuted}>{job.distance}</Txt>
      </div>
    </div>

    <div style={{ display: 'flex', gap: 10 }}>
      <SecondaryButton style={{ flex: 1, minHeight: 40, fontSize: 14 }} onClick={(e) => { e.stopPropagation(); onClick(); }}>View details</SecondaryButton>
      <PrimaryButton style={{ flex: 1, minHeight: 40, fontSize: 14 }} onClick={(e) => { e.stopPropagation(); onAccept && onAccept(job); }}>Accept offer</PrimaryButton>
    </div>
  </Card>
);

// ── Job feed (worker) ────────────────────────────────────────
const JobFeedScreen = ({ onOpenJob, onNav }) => {
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
      <div style={{ flex: 1, padding: 16, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <Banner variant="warning" title="NID not verified" style={{ marginBottom: 4 }}>
          Please verify your NID to unlock all worker features and apply for jobs.
          <button style={{ 
            background: 'none', border: 'none', color: T.color.gold500, 
            textDecoration: 'underline', padding: 0, marginLeft: 8, cursor: 'pointer' 
          }}>Verify now</button>
        </Banner>
        <Segmented
          options={[{ value: 'immediate', label: 'Immediately hiring' }, { value: 'active', label: 'Still active' }]}
          value={seg} onChange={setSeg} />
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Txt variant="caption" color={T.color.textMuted} style={{ letterSpacing: 0 }}>
            {jobs.length} jobs available nearby
          </Txt>
          <IconButton name="filter" onClick={() => setFilterOpen(true)} size={32} iconSize={18} />
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
          <StatusPill variant="posted">Posted</StatusPill>
          <CapabilityTag>600m away</CapabilityTag>
        </div>

        <Txt variant="body" style={{ marginTop: 10 }}>{j.description || 'Looking for a reliable worker to help with this task. Please see details below.'}</Txt>

        <Card>
          <Txt variant="caption" color={T.color.textMuted} style={{ marginBottom: 12 }}>ROUTE & LOCATION</Txt>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <div style={{ width: 8, height: 8, borderRadius: 4, background: T.color.success }} />
            <Txt variant="bodySm">From: Motijheel, Dhaka</Txt>
          </div>
          <div style={{ height: 20, width: 2, background: T.color.navyBorder, marginLeft: 3, marginBottom: 8 }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 8, height: 8, borderRadius: 4, background: T.color.error }} />
            <Txt variant="bodySm">To: Dhanmondi, Dhaka</Txt>
          </div>
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
          <Txt variant="caption" color={T.color.textMuted} style={{ marginBottom: 8 }}>POSTED BY</Txt>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <Txt variant="body" style={{ fontWeight: 600, marginBottom: 2 }}>Karim Ahmed</Txt>
              <RatingStars value={4.8} count={142} />
            </div>
            <VerifiedBadge />
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
  const [note, setNote] = useState("I'm 5 minutes away and can start right now.");
  const [showPopup, setShowPopup] = useState(false);
  const net = Math.round(parseInt(amount || '0') * 0.85);
  const commission = parseInt(amount || '0') - net;
  
  if (showPopup) return (
    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: T.color.navyBg, padding: 24 }}>
      <Card style={{ textAlign: 'center', padding: 32 }}>
        <Icon name="checkCircle" size={64} color={T.color.success} style={{ marginBottom: 16 }} />
        <Txt variant="title" style={{ marginBottom: 8 }}>Application Submitted!</Txt>
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
        <TextField label="Note to employer (optional)" multiline rows={3} value={note} onChange={setNote} />
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
const RankedShortlistScreen = ({ onBack, onAccept, onExplain }) => {
  const [bids, setBids] = useState(SAMPLE.shortlist);
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes

  useEffect(() => {
    if (timeLeft <= 0) return;
    const t = setInterval(() => setTimeLeft(s => s - 1), 1000);
    return () => clearInterval(t);
  }, [timeLeft]);

  const fmtTime = s => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  const onDecline = (rank) => {
    setBids(bids.filter(b => b.rank !== rank));
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: T.color.navyBg }}>
      <AppBarElevated 
        title="Manage Bids" 
        subtitle={`${bids.length} active bids`} 
        left={<BackButton onClick={onBack} />}
        right={
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(239,83,80,0.1)', padding: '4px 10px', borderRadius: T.radius.full, border: `1px solid ${T.color.error}` }}>
            <Icon name="clock" size={14} color={T.color.error} />
            <Txt variant="caption" color={T.color.error} style={{ fontWeight: 700 }}>{fmtTime(timeLeft)}</Txt>
          </div>
        }
      />
      <div style={{ flex: 1, padding: 16, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <Banner variant="info" title="Choose a worker">
          Bids will expire in 3 minutes. Please select a worker to proceed to payment.
        </Banner>
        
        {bids.map(w => (
          <Card key={w.rank}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 32, height: 32, borderRadius: 16, background: T.color.gold500,
                  color: T.color.textOnGold, fontFamily: T.fontSans, fontSize: 14, fontWeight: 700,
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
            
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
              {w.chips.map(c => (
                <ExplanationChip key={c} kind={c}>
                  {c === 'tag-match' ? 'exact' : c === 'asset' ? (w.asset || 'Motorbike') : c === 'distance' ? w.distance : c === 'rating' ? w.rating.toFixed(1) : w.languages[0]}
                </ExplanationChip>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 10 }}>
              <SecondaryButton style={{ flex: 1 }} onClick={() => onDecline(w.rank)}>Decline</SecondaryButton>
              <PrimaryButton style={{ flex: 2 }} onClick={() => onAccept(w)}>Accept Bid</PrimaryButton>
            </div>
          </Card>
        ))}
        {bids.length === 0 && <EmptyState icon="briefcase" title="No more bids" body="Wait for more workers to bid or repost the job." />}
      </div>
    </div>
  );
};

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
  JobPostFreeTextScreen, JobPostReviewScreen, JobPostSuccessScreen,
  InstantCancelPromptDialog,
  JobCard, JobFeedScreen, JobDetailScreen,
  BidSubmitScreen, BidEditScreen,
  RankedShortlistScreen, MatchExplanationDetailSheet,
});
