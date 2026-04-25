// Re'Loren v2 — chat, call permission, notifications, safety, rating.

// ── Chat thread ──────────────────────────────────────────────
const ChatThreadScreen = ({ onBack, onImage, onCall }) => {
  const [msg, setMsg] = useState('');
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: T.color.navyBg }}>
      <AppBarElevated
        title="Rahim Uddin"
        subtitle="Bike delivery · Online"
        left={<BackButton onClick={onBack} />}
        right={<div style={{ display: 'flex', gap: 4 }}>
          <IconButton name="phone" onClick={onCall} />
        </div>} />
      <div style={{ flex: 1, padding: 16, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <Txt variant="caption" color={T.color.textMuted} style={{ letterSpacing: 0, textAlign: 'center', padding: '8px 0' }}>
          Today · 10:42 AM
        </Txt>
        <Banner variant="info">
          Chat is for job-related messages only. Be respectful.
        </Banner>
        {SAMPLE.chat.map((m, i) => {
          const mine = m.side === 'employer';
          return (
            <div key={i} style={{ display: 'flex', justifyContent: mine ? 'flex-end' : 'flex-start' }}>
              <div style={{
                maxWidth: '72%',
                background: mine ? T.color.gold500 : T.color.navyRaised,
                color: mine ? T.color.textOnGold : T.color.textPrimary,
                padding: '10px 14px', borderRadius: T.radius.l,
                borderBottomRightRadius: mine ? 4 : T.radius.l,
                borderBottomLeftRadius: mine ? T.radius.l : 4,
              }}>
                {m.image && (
                  <div onClick={onImage} style={{
                    width: 180, height: 120, borderRadius: T.radius.m, marginBottom: 6,
                    background: `linear-gradient(135deg, ${T.color.navyDeep}, ${T.color.navyHover})`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                  }}>
                    <Icon name="location" size={36} color={T.color.gold500} />
                  </div>
                )}
                <Txt variant="bodySm" color={mine ? T.color.textOnGold : T.color.textPrimary}>{m.text}</Txt>
                <Txt variant="caption" color={mine ? 'rgba(15,25,45,0.6)' : T.color.textMuted}
                  style={{ letterSpacing: 0, marginTop: 4, textAlign: 'right' }}>{m.time}</Txt>
              </div>
            </div>
          );
        })}
      </div>
      <div style={{
        padding: 12, borderTop: `1px solid ${T.color.navyBorder}`, background: T.color.navyBg,
        display: 'flex', alignItems: 'center', gap: 8,
      }}>
        <IconButton name="camera" onClick={onImage} />
        <div style={{ flex: 1 }}>
          <TextField value={msg} onChange={setMsg} placeholder="Type a message…" />
        </div>
        <IconButton name="sendPlane" color={T.color.gold500}
          style={{ background: 'rgba(212,175,55,0.12)', border: `1px solid ${T.color.gold500}` }} />
      </div>
    </div>
  );
};

// ── Image viewer ─────────────────────────────────────────────
const ImageViewerScreen = ({ onBack }) => (
  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: T.color.navyBg }}>
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '12px 16px',
    }}>
      <IconButton name="close" onClick={onBack} color="#fff" />
      <Txt variant="bodySm" color="#fff">Photo · 1 of 1</Txt>
      <IconButton name="download" color="#fff" />
    </div>
    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{
        width: '88%', aspectRatio: '3/4', borderRadius: T.radius.l,
        background: `linear-gradient(135deg, ${T.color.navyDeep}, ${T.color.navyHover})`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Icon name="location" size={80} color={T.color.gold500} />
      </div>
    </div>
    <div style={{ padding: 16, textAlign: 'center' }}>
      <Txt variant="caption" color="rgba(255,255,255,0.6)" style={{ letterSpacing: 0 }}>
        Sent by Karim · 10:43 AM
      </Txt>
    </div>
  </div>
);

// ── Active call ──────────────────────────────────────────────
const ActiveCallScreen = ({ onEnd, user = { name: 'Rahim Uddin', role: 'Worker' } }) => {
  const [seconds, setSeconds] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaker, setIsSpeaker] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(t);
  }, []);

  const fmtTime = s => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  return (
    <div style={{
      flex: 1, display: 'flex', flexDirection: 'column',
      background: `linear-gradient(180deg, ${T.color.navyBg} 0%, ${T.color.navyDeep} 100%)`,
      position: 'relative', overflowY: 'auto', overflowX: 'hidden'
    }}>
      {/* Abstract background circles */}
      <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '60%', aspectRatio: '1/1', background: 'radial-gradient(circle, rgba(212,175,55,0.05) 0%, transparent 70%)', borderRadius: '50%' }} />
      <div style={{ position: 'absolute', bottom: '10%', right: '-10%', width: '80%', aspectRatio: '1/1', background: 'radial-gradient(circle, rgba(212,175,55,0.03) 0%, transparent 70%)', borderRadius: '50%' }} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}>
        <div style={{ position: 'relative', marginBottom: 24 }}>
          <div style={{
            position: 'absolute', inset: -20, borderRadius: '50%',
            border: `2px solid ${T.color.gold500}`, opacity: 0.2,
            animation: 'pulseIn 2s infinite'
          }} />
          <div style={{
            width: 120, height: 120, borderRadius: 60,
            background: T.color.navyRaised, border: `3px solid ${T.color.gold500}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 40, fontWeight: 700, color: T.color.gold500,
            boxShadow: '0 0 30px rgba(212,175,55,0.2)'
          }}>
            {user.name.split(' ').map(n => n[0]).join('')}
          </div>
        </div>

        <Txt variant="headline" style={{ fontSize: 28, marginBottom: 8 }}>{user.name}</Txt>
        <Txt variant="body" color={T.color.gold500} style={{ fontWeight: 600, letterSpacing: '0.05em' }}>{user.role.toUpperCase()}</Txt>
        
        <div style={{ marginTop: 40, background: 'rgba(255,255,255,0.05)', padding: '8px 20px', borderRadius: T.radius.full, border: '1px solid rgba(255,255,255,0.1)' }}>
          <Txt variant="subtitle" color={T.color.textSecondary} style={{ fontFamily: 'monospace' }}>{fmtTime(seconds)}</Txt>
        </div>
      </div>

      {/* Call Controls */}
      <div style={{ padding: '24px 24px 40px', display: 'flex', flexDirection: 'column', gap: 24, zIndex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
          {[
            { id: 'mute', icon: isMuted ? 'micOff' : 'mic', label: 'Mute', active: isMuted, onClick: () => setIsMuted(!isMuted) },
            { id: 'keypad', icon: 'keypad', label: 'Keypad' },
            { id: 'speaker', icon: 'volumeHigh', label: 'Speaker', active: isSpeaker, onClick: () => setIsSpeaker(!isSpeaker) },
          ].map(ctrl => (
            <div key={ctrl.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <button onClick={ctrl.onClick} style={{
                width: 54, height: 54, borderRadius: 27,
                background: ctrl.active ? T.color.gold500 : 'rgba(255,255,255,0.08)',
                border: `1px solid ${ctrl.active ? T.color.gold500 : 'rgba(255,255,255,0.2)'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', transition: 'all 0.2s'
              }}>
                <Icon name={ctrl.icon || 'circle'} size={22} color={ctrl.active ? T.color.textOnGold : '#fff'} />
              </button>
              <Txt variant="caption" color="#fff" style={{ opacity: 0.8, fontSize: 11 }}>{ctrl.label}</Txt>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button onClick={onEnd} style={{
            width: 64, height: 64, borderRadius: 32,
            background: T.color.error, border: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', boxShadow: '0 8px 16px rgba(239,83,80,0.3)',
            transform: 'rotate(135deg)'
          }}>
            <Icon name="phone" size={28} color="#fff" />
          </button>
        </div>
      </div>

      <style>{`
        @keyframes pulseIn {
          0% { transform: scale(1); opacity: 0.2; }
          50% { transform: scale(1.2); opacity: 0.1; }
          100% { transform: scale(1); opacity: 0.2; }
        }
      `}</style>
    </div>
  );
};

// ── Call permission (dialog) ─────────────────────────────────
const CallPermissionDialog = ({ onClose, onAllow }) => (
  <Overlay onClose={onClose} align="center">
    <div style={{ padding: '0 20px', width: '100%', maxWidth: 400 }}>
      <div style={{
        background: T.color.navyRaised, borderRadius: T.radius.xl,
        border: `1px solid ${T.color.navyBorder}`, padding: '24px 20px',
        textAlign: 'center', boxShadow: T.elevation.lg
      }}>
        <div style={{ position: 'relative', width: 64, height: 64, margin: '0 auto 20px' }}>
          <div style={{
            position: 'absolute', inset: 0, borderRadius: 32,
            background: 'rgba(212,175,55,0.1)', border: `2px solid ${T.color.gold500}`,
            animation: 'pulseIn 2s infinite'
          }} />
          <div style={{
            position: 'absolute', inset: 8, borderRadius: 24,
            background: T.color.gold500, display: 'flex', alignItems: 'center',
            justifyContent: 'center', color: T.color.textOnGold
          }}>
            <Icon name="phone" size={24} color={T.color.textOnGold} />
          </div>
        </div>

        <Txt variant="title" style={{ fontSize: 20, marginBottom: 8 }}>Allow voice calls?</Txt>
        <Txt variant="bodySm" color={T.color.textSecondary} style={{ marginBottom: 20, lineHeight: 1.5 }}>
          Re'Loren needs microphone access to connect you with workers. Calls are 
          <span style={{ color: T.color.gold500, fontWeight: 600 }}> encrypted </span> 
          and your number is never shared.
        </Txt>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <PrimaryButton onClick={onAllow}>Allow access</PrimaryButton>
          <button onClick={onClose} style={{
            background: 'none', border: 'none', color: T.color.textMuted,
            fontFamily: T.fontSans, fontSize: 13, fontWeight: 500, cursor: 'pointer',
            padding: 4
          }}>Not now</button>
        </div>
      </div>
    </div>
  </Overlay>
);

// ── Notifications ────────────────────────────────────────────
const NotificationsScreen = ({ onBack, onTap }) => {
  const byDay = SAMPLE.notifications.reduce((a, n) => {
    (a[n.day] = a[n.day] || []).push(n); return a;
  }, {});
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: T.color.navyBg }}>
      <AppBarElevated title="Notifications" left={<BackButton onClick={onBack} />}
        right={<button style={{ background: 'none', border: 'none', color: T.color.gold500,
          fontFamily: T.fontSans, fontSize: 13, fontWeight: 500, padding: '0 16px', cursor: 'pointer' }}>
          Mark all read
        </button>} />
      <div style={{ flex: 1, overflow: 'auto' }}>
        {Object.entries(byDay).map(([day, items]) => (
          <div key={day}>
            <Txt variant="caption" color={T.color.textMuted} style={{ padding: '16px 16px 8px' }}>{day.toUpperCase()}</Txt>
            {items.map(n => (
              <div key={n.id} onClick={() => onTap && onTap(n)}
                style={{
                  padding: '14px 16px', borderBottom: `1px solid ${T.color.navyBorder}`,
                  display: 'flex', gap: 12, alignItems: 'flex-start',
                  background: n.unread ? 'rgba(212,175,55,0.04)' : 'transparent',
                  cursor: 'pointer', position: 'relative',
                }}>
                {n.unread && <div style={{
                  position: 'absolute', left: 6, top: '50%', transform: 'translateY(-50%)',
                  width: 6, height: 6, borderRadius: 3, background: T.color.gold500,
                }} />}
                <div style={{
                  width: 40, height: 40, borderRadius: 20, background: T.color.navyRaised,
                  border: `1px solid ${T.color.navyBorder}`, flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Icon name="bell" size={18} color={T.color.gold500} />
                </div>
                <div style={{ flex: 1 }}>
                  <Txt variant="bodySm" style={{ fontWeight: n.unread ? 600 : 500 }}>{n.title}</Txt>
                  <Txt variant="caption" color={T.color.textSecondary} style={{ letterSpacing: 0, marginTop: 2 }}>
                    {n.body}
                  </Txt>
                  <Txt variant="caption" color={T.color.textMuted} style={{ letterSpacing: 0, marginTop: 4 }}>
                    {n.time}
                  </Txt>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

// ── Safety popup (bottom sheet) ──────────────────────────────
const SafetyPopupSheet = ({ onClose, onShareLocation }) => (
  <BottomSheet onClose={onClose} title="Stay safe on the job">
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 4 }}>
      {[
        { icon: 'shield', title: 'Meet in public places', color: '#4FC3F7',
          body: 'Especially for first-time jobs.' },
        { icon: 'location', title: 'Share your live location', color: T.color.gold500,
          body: 'Let a trusted contact follow your route.' },
        { icon: 'phone', title: 'Call in-app, not directly', color: '#81C784',
          body: "Keep conversations inside the app." },
        { icon: 'warning', title: "If something feels off, leave", color: T.color.error,
          body: "Tap 'Report' on the job." },
      ].map(t => (
        <div key={t.title} style={{ 
          display: 'flex', gap: 12, alignItems: 'center', padding: '10px 12px',
          background: 'rgba(255,255,255,0.03)', borderRadius: T.radius.m,
          border: '1px solid rgba(255,255,255,0.05)'
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: 8, background: `${t.color}15`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            border: `1px solid ${t.color}30`
          }}>
            <Icon name={t.icon} size={18} color={t.color} />
          </div>
          <div style={{ flex: 1 }}>
            <Txt variant="bodySm" style={{ fontWeight: 700, fontSize: 13 }}>{t.title}</Txt>
            <Txt variant="caption" color={T.color.textSecondary} style={{ letterSpacing: 0, marginTop: 2, fontSize: 11 }}>
              {t.body}
            </Txt>
          </div>
        </div>
      ))}
    </div>
    <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
      <PrimaryButton icon="location" style={{ minHeight: 44 }} onClick={onShareLocation}>Share live location</PrimaryButton>
      <SecondaryButton onClick={onClose} style={{ border: 'none', minHeight: 40 }}>I understand</SecondaryButton>
    </div>
  </BottomSheet>
);

// ── Post-job rating ──────────────────────────────────────────
const PostJobRatingScreen = ({ onBack, onSubmit, role = 'employer' }) => {
  const [stars, setStars] = useState(0);
  const [tags, setTags] = useState(new Set());
  const [comment, setComment] = useState('');
  const positiveTags = role === 'employer'
    ? ['On time', 'Polite', 'Professional', 'Good communication', 'Careful with items']
    : ['Clear instructions', 'Paid on time', 'Friendly', 'Easy to reach'];
  const negativeTags = role === 'employer'
    ? ['Late', 'Unresponsive', 'Rude', 'Damaged items']
    : ['Unclear', 'Late payment', 'Rude', 'Changed scope'];
  const tagSet = stars >= 4 ? positiveTags : stars > 0 && stars <= 2 ? negativeTags : positiveTags;
  const toggle = t => {
    const n = new Set(tags); if (n.has(t)) n.delete(t); else n.add(t); setTags(n);
  };
  const counterparty = role === 'employer' ? 'Rahim Uddin' : 'Karim Ahmed';
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: T.color.navyBg }}>
      <AppBarElevated title="Rate your experience" left={<BackButton onClick={onBack} />} />
      <div style={{ flex: 1, padding: 16, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 20 }}>
        <Card style={{ textAlign: 'center', padding: 24 }}>
          <div style={{
            width: 72, height: 72, borderRadius: 36, background: T.color.navyDeep,
            border: `2px solid ${T.color.gold500}`, margin: '0 auto 12px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: T.fontSans, fontSize: 24, fontWeight: 700, color: T.color.gold500,
          }}>{counterparty.split(' ').map(n => n[0]).join('').slice(0, 2)}</div>
          <Txt variant="subtitle">{counterparty}</Txt>
          <Txt variant="caption" color={T.color.textMuted} style={{ letterSpacing: 0, marginTop: 4 }}>
            {role === 'employer' ? 'Medicine delivery — ৳1,500' : 'Medicine delivery — ৳1,275 received'}
          </Txt>
        </Card>
        <div style={{ textAlign: 'center' }}>
          <Txt variant="bodySm" color={T.color.textSecondary} style={{ marginBottom: 14 }}>
            How was {role === 'employer' ? 'Rahim' : 'Karim'}?
          </Txt>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 10 }}>
            {[1, 2, 3, 4, 5].map(i => (
              <button key={i} onClick={() => setStars(i)}
                style={{
                  background: 'transparent', border: 'none', cursor: 'pointer', padding: 6,
                  fontSize: 36, color: i <= stars ? T.color.gold500 : T.color.navyBorder,
                  lineHeight: 1,
                }}>★</button>
            ))}
          </div>
          {stars > 0 && (
            <Txt variant="bodySm" color={T.color.gold500} style={{ marginTop: 8, fontWeight: 500 }}>
              {['Very bad', 'Bad', 'OK', 'Good', 'Excellent'][stars - 1]}
            </Txt>
          )}
        </div>
        {stars > 0 && (
          <div>
            <Txt variant="caption" color={T.color.textMuted} style={{ marginBottom: 10 }}>
              WHAT STOOD OUT? (OPTIONAL)
            </Txt>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {tagSet.map(t => {
                const on = tags.has(t);
                return (
                  <button key={t} onClick={() => toggle(t)}
                    style={{
                      minHeight: 36, padding: '0 14px', borderRadius: 18,
                      background: on ? 'rgba(212,175,55,0.15)' : 'transparent',
                      border: `1px solid ${on ? T.color.gold500 : T.color.navyBorder}`,
                      color: on ? T.color.gold500 : T.color.textSecondary,
                      fontFamily: T.fontSans, fontSize: 13, fontWeight: 500, cursor: 'pointer',
                    }}>{t}</button>
                );
              })}
            </div>
          </div>
        )}
        <TextField multiline rows={3} placeholder="Anything else? (optional)"
          value={comment} onChange={setComment} />
        <Banner variant="info">Ratings are private to Re'Loren and affect matching.</Banner>
        <div style={{ marginTop: 'auto' }}>
          <PrimaryButton onClick={onSubmit} disabled={stars === 0}>Submit rating</PrimaryButton>
        </div>
      </div>
    </div>
  );
};

Object.assign(window, {
  ChatThreadScreen, ImageViewerScreen, CallPermissionDialog,
  ActiveCallScreen, NotificationsScreen, SafetyPopupSheet, PostJobRatingScreen,
});
