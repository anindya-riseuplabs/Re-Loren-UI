// Re'Loren v2 — chat, call permission, notifications, safety, rating.

// ── Chat thread ──────────────────────────────────────────────
// Read receipt: ✓ sent, ✓✓ read
const ReadReceipt = ({ status = 'read' }) => (
  <span style={{ display: 'inline-flex', alignItems: 'center', marginLeft: 4, position: 'relative', width: status === 'read' ? 16 : 10, height: 10 }}>
    <Icon name="check" size={10} color={status === 'read' ? '#4FC3F7' : 'rgba(15,25,45,0.7)'}
      style={{ position: 'absolute', left: 0, top: 0 }} />
    {status === 'read' && (
      <Icon name="check" size={10} color="#4FC3F7"
        style={{ position: 'absolute', left: 5, top: 0 }} />
    )}
  </span>
);

const ChatThreadScreen = ({ onBack, onCall }) => {
  const [msg, setMsg] = useState('');
  // Annotate sample chat with read-receipt status for sent (employer) bubbles
  const messages = SAMPLE.chat.map((m, i) => ({
    ...m,
    receipt: m.side === 'employer' ? (i < SAMPLE.chat.length - 1 ? 'read' : 'sent') : null,
  }));

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: T.color.navyBg, minHeight: 0 }}>
      <AppBarElevated
        title="Rahim Uddin"
        subtitle="Bike delivery · Online"
        left={<BackButton onClick={onBack} />}
        right={<div style={{ display: 'flex', gap: 4 }}>
          <IconButton name="phone" onClick={onCall} />
        </div>} />

      <div style={{ flex: 1, padding: 16, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 8, minHeight: 0 }}>
        <Txt variant="caption" color={T.color.textMuted} style={{ letterSpacing: 0, textAlign: 'center', padding: '8px 0' }}>
          Today · 10:42 AM
        </Txt>
        {messages.map((m, i) => {
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
                <Txt variant="bodySm" color={mine ? T.color.textOnGold : T.color.textPrimary}>{m.text}</Txt>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 2, marginTop: 4 }}>
                  <Txt variant="caption" color={mine ? 'rgba(15,25,45,0.6)' : T.color.textMuted}
                    style={{ letterSpacing: 0 }}>{m.time}</Txt>
                  {mine && m.receipt && <ReadReceipt status={m.receipt} />}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Typing bar pinned to bottom */}
      <div style={{
        flexShrink: 0,
        padding: 10, borderTop: `1px solid ${T.color.navyBorder}`, background: T.color.navyDeep,
        display: 'flex', alignItems: 'center', gap: 8,
      }}>
        <div style={{ flex: 1 }}>
          <TextField value={msg} onChange={setMsg} placeholder="Type a message…" />
        </div>
        <button style={{
          width: 44, height: 44, borderRadius: 22, flexShrink: 0,
          background: T.color.gold500, border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon name="send" size={18} color={T.color.textOnGold} />
        </button>
      </div>
    </div>
  );
};

// ── Notifications ────────────────────────────────────────────
const NotificationsScreen = ({ onBack, onTap }) => {
  const byDay = SAMPLE.notifications.reduce((a, n) => {
    (a[n.day] = a[n.day] || []).push(n); return a;
  }, {});
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: T.color.navyBg }}>
      <AppBarElevated title="Notifications" left={<BackButton onClick={onBack} />} />
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
  ChatThreadScreen, NotificationsScreen, PostJobRatingScreen,
});
