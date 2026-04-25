// Re'Loren v2 — §5 component library. All components use navy+gold tokens.
// NAMING: every style object is prefixed per-component to avoid globals collision.

const { useState, useEffect, useRef } = React;

// ── Phosphor-style icons (outline, 1.5px stroke, 24px) ─────────────
const Icon = ({ name, size = 24, color = T.color.textPrimary, style }) => {
  const paths = {
    back: <path d="M15 6l-6 6 6 6" />,
    close: <><path d="M6 6l12 12" /><path d="M18 6L6 18" /></>,
    bell: <><path d="M6 8a6 6 0 0112 0v5l2 3H4l2-3V8z" /><path d="M10 19a2 2 0 004 0" /></>,
    chat: <path d="M4 5h16v11H9l-4 4V5z" />,
    home: <path d="M4 11l8-7 8 7v9H4v-9z" />,
    briefcase: <><rect x="3" y="7" width="18" height="13" rx="1" /><path d="M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2" /></>,
    wallet: <><rect x="3" y="6" width="18" height="13" rx="2" /><path d="M16 12h3" /></>,
    user: <><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-6 8-6s8 2 8 6" /></>,
    search: <><circle cx="11" cy="11" r="7" /><path d="M16 16l5 5" /></>,
    filter: <path d="M4 5h16l-6 8v6l-4-2v-4L4 5z" />,
    plus: <><path d="M12 5v14" /><path d="M5 12h14" /></>,
    check: <path d="M4 12l5 5L20 6" />,
    checkCircle: <><circle cx="12" cy="12" r="9" /><path d="M8 12l3 3 5-6" /></>,
    x: <><circle cx="12" cy="12" r="9" /><path d="M9 9l6 6" /><path d="M15 9l-6 6" /></>,
    warning: <><path d="M12 3l10 18H2L12 3z" /><path d="M12 10v5" /><circle cx="12" cy="18" r="0.5" /></>,
    info: <><circle cx="12" cy="12" r="9" /><path d="M12 11v5" /><circle cx="12" cy="8" r="0.5" /></>,
    shield: <><path d="M12 3l8 3v6c0 4.5-3.5 8-8 9-4.5-1-8-4.5-8-9V6l8-3z" /><path d="M9 12l2 2 4-4" /></>,
    camera: <><rect x="3" y="7" width="18" height="13" rx="2" /><circle cx="12" cy="13" r="4" /><path d="M8 7l2-3h4l2 3" /></>,
    image: <><rect x="3" y="5" width="18" height="14" rx="2" /><circle cx="9" cy="10" r="1.5" /><path d="M4 18l5-5 4 4 3-3 4 4" /></>,
    phone: <path d="M5 4h3l2 5-2 1a11 11 0 006 6l1-2 5 2v3a2 2 0 01-2 2A15 15 0 013 6a2 2 0 012-2z" />,
    send: <path d="M3 12l18-8-8 18-2-8-8-2z" />,
    chevron: <path d="M9 6l6 6-6 6" />,
    chevronDown: <path d="M6 9l6 6 6-6" />,
    location: <><path d="M12 22s8-7 8-13a8 8 0 10-16 0c0 6 8 13 8 13z" /><circle cx="12" cy="9" r="3" /></>,
    star: <path d="M12 3l2.6 6 6.4.6-5 4.5 1.6 6.4L12 17l-5.6 3.5L8 14l-5-4.5 6.4-.6L12 3z" />,
    starFill: <path d="M12 3l2.6 6 6.4.6-5 4.5 1.6 6.4L12 17l-5.6 3.5L8 14l-5-4.5 6.4-.6L12 3z" fill={T.color.gold500} />,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    money: <><rect x="3" y="6" width="18" height="13" rx="2" /><circle cx="12" cy="12.5" r="2.5" /></>,
    eye: <><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></>,
    trash: <><path d="M4 7h16" /><path d="M6 7v13a1 1 0 001 1h10a1 1 0 001-1V7" /><path d="M9 7V4h6v3" /></>,
    edit: <><path d="M4 20h4l10-10-4-4L4 16v4z" /><path d="M14 6l4 4" /></>,
    refresh: <><path d="M4 12a8 8 0 0114-5l2 2" /><path d="M20 4v5h-5" /><path d="M20 12a8 8 0 01-14 5l-2-2" /><path d="M4 20v-5h5" /></>,
    menu: <><path d="M4 6h16" /><path d="M4 12h16" /><path d="M4 18h16" /></>,
    upload: <><path d="M12 15V4" /><path d="M8 8l4-4 4 4" /><path d="M4 17v2a1 1 0 001 1h14a1 1 0 001-1v-2" /></>,
    forward: <path d="M5 5l7 7-7 7M13 5l7 7-7 7" />,
    minus: <path d="M5 12h14" />,
    circle: <circle cx="12" cy="12" r="9" />,
    file: <><path d="M6 3h8l4 4v13a1 1 0 01-1 1H6a1 1 0 01-1-1V4a1 1 0 011-1z" /><path d="M14 3v4h4" /></>,
  };
  const content = paths[name] || <circle cx="12" cy="12" r="9" />;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"
      style={style}>
      {content}
    </svg>
  );
};

// ── Text helpers ─────────────────────────────────────────────
const Txt = ({ variant = 'body', children, color, style, as: As = 'div', bn = false }) => {
  const t = T.type[variant] || T.type.body;
  const s = {
    fontFamily: bn ? T.fontBangla : T.fontSans,
    fontSize: t.size,
    lineHeight: t.lh,
    fontWeight: t.w,
    letterSpacing: t.ls || 'normal',
    color: color || T.color.textPrimary,
    margin: 0,
    textWrap: 'pretty',
    ...style,
  };
  return <As style={s}>{children}</As>;
};

// ── Buttons ───────────────────────────────────────────────────
const btnBase = {
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
  minHeight: 48, padding: '0 20px',
  borderRadius: T.radius.m, border: 'none',
  fontFamily: T.fontSans, fontWeight: 600, fontSize: 16,
  cursor: 'pointer', width: '100%',
  transition: 'background 150ms ease-out, transform 150ms ease-out',
};
const PrimaryButton = ({ children, onClick, disabled, icon, style }) => (
  <button onClick={disabled ? undefined : onClick} disabled={disabled}
    style={{ ...btnBase, background: disabled ? T.color.taupe500 : T.color.gold500, color: T.color.textOnGold, opacity: disabled ? 0.5 : 1, ...style }}>
    {icon && <Icon name={icon} size={20} color={T.color.textOnGold} />}
    {children}
  </button>
);
const SecondaryButton = ({ children, onClick, icon, style }) => (
  <button onClick={onClick}
    style={{ ...btnBase, background: 'transparent', border: `1.5px solid ${T.color.gold500}`, color: T.color.gold500, ...style }}>
    {icon && <Icon name={icon} size={20} color={T.color.gold500} />}
    {children}
  </button>
);
const AccentButton = ({ children, onClick, icon, style }) => (
  <button onClick={onClick}
    style={{ ...btnBase, background: T.color.gold600, color: T.color.textOnGold, ...style }}>
    {icon && <Icon name={icon} size={20} color={T.color.textOnGold} />}
    {children}
  </button>
);
const DestructiveButton = ({ children, onClick, icon, style }) => (
  <button onClick={onClick}
    style={{ ...btnBase, background: T.color.error, color: '#fff', ...style }}>
    {icon && <Icon name={icon} size={20} color="#fff" />}
    {children}
  </button>
);
const IconButton = ({ name, onClick, size = 48, iconSize = 24, color = T.color.textPrimary, label, style }) => (
  <button onClick={onClick} aria-label={label || name}
    style={{
      width: size, height: size, minWidth: size, minHeight: size,
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      border: 'none', background: 'transparent', cursor: 'pointer',
      borderRadius: T.radius.full, ...style,
    }}>
    <Icon name={name} size={iconSize} color={color} />
  </button>
);

// ── TextField ────────────────────────────────────────────────
const TextField = ({ label, value, onChange, placeholder, multiline, rows = 1, prefix, suffix, helper, error, type = 'text', style }) => {
  const [focused, setFocused] = useState(false);
  const As = multiline ? 'textarea' : 'input';
  return (
    <label style={{ display: 'block', ...style }}>
      {label && <Txt variant="bodySm" color={T.color.gold500} style={{ marginBottom: 6, fontWeight: 500 }}>{label}</Txt>}
      <div style={{
        display: 'flex', alignItems: multiline ? 'flex-start' : 'center',
        background: T.color.navyRaised,
        border: `1.5px solid ${error ? T.color.error : focused ? T.color.gold500 : T.color.navyBorder}`,
        borderRadius: T.radius.m,
        padding: multiline ? '12px 14px' : '0 14px',
        minHeight: 48,
        transition: 'border-color 150ms',
      }}>
        {prefix && <Txt variant="body" color={T.color.textMuted} style={{ marginRight: 8 }}>{prefix}</Txt>}
        <As type={type} value={value || ''} onChange={e => onChange && onChange(e.target.value)}
          placeholder={placeholder} rows={multiline ? rows : undefined}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          style={{
            flex: 1, minWidth: 0, background: 'transparent', border: 'none', outline: 'none',
            color: T.color.textPrimary, fontFamily: T.fontSans, fontSize: 16, fontWeight: 400,
            resize: multiline ? 'vertical' : 'none', padding: multiline ? 0 : '12px 0',
            lineHeight: 1.5,
          }} />
        {suffix && <div style={{ marginLeft: 8, color: T.color.textMuted, display: 'flex' }}>{suffix}</div>}
      </div>
      {(helper || error) && (
        <Txt variant="caption" color={error ? T.color.error : T.color.textMuted} style={{ marginTop: 6, letterSpacing: 0 }}>
          {error || helper}
        </Txt>
      )}
    </label>
  );
};

// ── OtpInput ─────────────────────────────────────────────────
const OtpInput = ({ length = 4, value = '', onChange, error }) => {
  const refs = useRef([]);
  const handle = (i, v) => {
    const digit = v.replace(/\D/g, '').slice(-1);
    const arr = value.padEnd(length, ' ').split('');
    arr[i] = digit || ' ';
    const next = arr.join('').trimEnd();
    onChange && onChange(next);
    if (digit && i < length - 1) refs.current[i + 1]?.focus();
  };
  const paste = e => {
    const txt = (e.clipboardData.getData('text') || '').replace(/\D/g, '').slice(0, length);
    if (txt) { e.preventDefault(); onChange && onChange(txt); refs.current[Math.min(txt.length, length - 1)]?.focus(); }
  };
  const keyDown = (i, e) => {
    if (e.key === 'Backspace' && !value[i] && i > 0) refs.current[i - 1]?.focus();
  };
  return (
    <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
      {Array.from({ length }).map((_, i) => (
        <input key={i} ref={el => refs.current[i] = el}
          value={value[i] || ''} onChange={e => handle(i, e.target.value)}
          onPaste={paste} onKeyDown={e => keyDown(i, e)}
          inputMode="numeric" maxLength={1}
          style={{
            width: 56, height: 64, textAlign: 'center',
            background: T.color.navyRaised,
            border: `1.5px solid ${error ? T.color.error : value[i] ? T.color.gold500 : T.color.navyBorder}`,
            borderRadius: T.radius.m,
            color: T.color.gold500, fontSize: 28, fontWeight: 600,
            fontFamily: T.fontSans, outline: 'none',
          }} />
      ))}
    </div>
  );
};

// ── PhoneNumberField ─────────────────────────────────────────
const PhoneNumberField = ({ value, onChange }) => (
  <div style={{
    display: 'flex', alignItems: 'center',
    background: T.color.navyRaised, border: `1.5px solid ${T.color.navyBorder}`,
    borderRadius: T.radius.m, minHeight: 48, padding: '0 14px',
  }}>
    <Txt variant="body" color={T.color.gold500} style={{ fontWeight: 600, marginRight: 12 }}>+880</Txt>
    <div style={{ width: 1, height: 24, background: T.color.navyBorder, marginRight: 12 }} />
    <input value={value || ''} onChange={e => onChange && onChange(e.target.value.replace(/\D/g, '').slice(0, 10))}
      placeholder="1711-234567" inputMode="numeric"
      style={{
        flex: 1, minWidth: 0, background: 'transparent', border: 'none', outline: 'none',
        color: T.color.textPrimary, fontSize: 16, fontFamily: T.fontSans, padding: '12px 0',
      }} />
  </div>
);

// ── Banner ───────────────────────────────────────────────────
const Banner = ({ variant = 'info', children, icon, title }) => {
  const map = {
    success: { bg: T.color.successBg, fg: T.color.success, icon: 'checkCircle' },
    warning: { bg: T.color.warningBg, fg: T.color.warning, icon: 'warning' },
    error:   { bg: T.color.errorBg, fg: T.color.error, icon: 'x' },
    info:    { bg: T.color.infoBg, fg: T.color.info, icon: 'info' },
    offline: { bg: 'rgba(251,140,0,0.12)', fg: T.color.offline, icon: 'warning' },
    conflict:{ bg: T.color.warningBg, fg: T.color.warning, icon: 'warning' },
  };
  const c = map[variant];
  return (
    <div style={{
      display: 'flex', alignItems: 'flex-start', gap: 12,
      background: c.bg, borderLeft: `3px solid ${c.fg}`,
      borderRadius: T.radius.m, padding: '12px 14px',
    }}>
      <Icon name={icon || c.icon} size={20} color={c.fg} style={{ flex: 'none', marginTop: 1 }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        {title && <Txt variant="bodySm" color={c.fg} style={{ fontWeight: 600, marginBottom: 2 }}>{title}</Txt>}
        <Txt variant="bodySm" color={c.fg} style={{ opacity: 0.95 }}>{children}</Txt>
      </div>
    </div>
  );
};

// ── Status pill / capability tag / verified badge / explanation chip ──
const StatusPill = ({ children, variant = 'neutral' }) => {
  const map = {
    posted:     { bg: 'rgba(41,182,246,0.18)', fg: T.color.info },
    bidding:    { bg: 'rgba(212,175,55,0.16)', fg: T.color.gold500 },
    accepted:   { bg: 'rgba(102,187,106,0.18)', fg: T.color.success },
    in_progress:{ bg: 'rgba(102,187,106,0.18)', fg: T.color.success },
    complete:   { bg: 'rgba(102,187,106,0.22)', fg: T.color.success },
    cancelled:  { bg: 'rgba(239,83,80,0.18)', fg: T.color.error },
    pending:    { bg: 'rgba(255,167,38,0.16)', fg: T.color.warning },
    neutral:    { bg: 'rgba(212,175,55,0.14)', fg: T.color.gold500 },
  };
  const c = map[variant] || map.neutral;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '4px 10px', borderRadius: T.radius.full,
      background: c.bg, color: c.fg,
      fontFamily: T.fontSans, fontSize: 12, fontWeight: 600,
      letterSpacing: '2%', textTransform: 'uppercase',
    }}>{children}</span>
  );
};

const CapabilityTag = ({ children, inherited, onRemove }) => (
  <span style={{
    display: 'inline-flex', alignItems: 'center', gap: 6,
    padding: '6px 12px', borderRadius: T.radius.full,
    background: 'rgba(212,175,55,0.10)', border: `1px solid ${T.color.gold500}`,
    color: T.color.gold500, fontFamily: T.fontSans, fontSize: 13, fontWeight: 500,
  }}>
    {inherited && <Icon name="chevron" size={12} color={T.color.gold500} />}
    {children}
    {onRemove && <button onClick={onRemove} style={{ background: 'none', border: 'none', color: T.color.gold500, cursor: 'pointer', padding: 0, display: 'flex' }}><Icon name="close" size={14} color={T.color.gold500} /></button>}
  </span>
);

const VerifiedBadge = ({ label = 'Verified' }) => (
  <span style={{
    display: 'inline-flex', alignItems: 'center', gap: 4,
    padding: '2px 8px', borderRadius: T.radius.full,
    background: 'rgba(102,187,106,0.16)', color: T.color.success,
    fontFamily: T.fontSans, fontSize: 11, fontWeight: 600, letterSpacing: '2%', textTransform: 'uppercase',
  }}>
    <Icon name="shield" size={12} color={T.color.success} />
    {label}
  </span>
);

const ExplanationChip = ({ kind, children }) => {
  const labels = {
    'tag-match': 'Tag match',
    'asset':     'Asset',
    'distance':  'Distance',
    'rating':    'Rating',
    'language':  'Language',
    'relevance-source': 'Source',
  };
  const icons = {
    'tag-match': 'check',
    'asset':     'briefcase',
    'distance':  'location',
    'rating':    'star',
    'language':  'chat',
    'relevance-source': 'info',
  };
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '4px 10px', borderRadius: T.radius.s,
      background: T.color.navyDeep, border: `1px solid ${T.color.navyBorder}`,
      color: T.color.gold500, fontFamily: T.fontSans, fontSize: 12, fontWeight: 500,
    }}>
      <Icon name={icons[kind]} size={12} color={T.color.gold500} />
      <span style={{ color: T.color.textMuted }}>{labels[kind]}:</span>
      <span>{children}</span>
    </span>
  );
};

// ── Card / JobCard / BidCard / WorkerCard ───────────────────
const Card = ({ children, onClick, style, elevation = 'sm' }) => (
  <div onClick={onClick}
    style={{
      background: T.color.navyRaised, borderRadius: T.radius.l,
      border: `1px solid ${T.color.navyBorder}`,
      boxShadow: T.elevation[elevation], padding: 16,
      cursor: onClick ? 'pointer' : 'default',
      ...style,
    }}>{children}</div>
);

// ── RatingStars ──────────────────────────────────────────────
const RatingStars = ({ value, count, size = 14, compact }) => {
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
      {!compact && [0, 1, 2, 3, 4].map(i => (
        <Icon key={i} name={i < full || (i === full && half) ? 'starFill' : 'star'}
          size={size} color={T.color.gold500} />
      ))}
      {compact && <Icon name="starFill" size={size} color={T.color.gold500} />}
      <Txt variant="bodySm" color={T.color.gold500} style={{ fontWeight: 600, marginLeft: 2 }}>
        {value.toFixed(1)}
      </Txt>
      {count != null && <Txt variant="caption" color={T.color.textMuted} style={{ letterSpacing: 0 }}>({count})</Txt>}
    </span>
  );
};

// ── SkeletonLoader ───────────────────────────────────────────
const SkeletonLoader = ({ h = 16, w = '100%', r = 6, style }) => (
  <div style={{
    background: `linear-gradient(90deg, ${T.color.navyRaised}, ${T.color.navyHover}, ${T.color.navyRaised})`,
    backgroundSize: '200% 100%',
    animation: 'skeletonShimmer 1.4s linear infinite',
    height: h, width: w, borderRadius: r, ...style,
  }} />
);

// ── EmptyState / ErrorState ──────────────────────────────────
const EmptyState = ({ title, body, icon = 'search', cta, onCta }) => (
  <div style={{ textAlign: 'center', padding: 32 }}>
    <div style={{
      width: 72, height: 72, borderRadius: T.radius.full,
      background: T.color.navyRaised, border: `1px solid ${T.color.navyBorder}`,
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16,
    }}>
      <Icon name={icon} size={32} color={T.color.gold500} />
    </div>
    <Txt variant="subtitle" style={{ marginBottom: 6 }}>{title}</Txt>
    <Txt variant="bodySm" color={T.color.textSecondary} style={{ marginBottom: 20 }}>{body}</Txt>
    {cta && <PrimaryButton onClick={onCta} style={{ maxWidth: 240, margin: '0 auto' }}>{cta}</PrimaryButton>}
  </div>
);

const ErrorState = ({ title = 'Something went wrong', body, onRetry }) => (
  <div style={{ textAlign: 'center', padding: 32 }}>
    <div style={{
      width: 72, height: 72, borderRadius: T.radius.full,
      background: T.color.errorBg, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16,
    }}>
      <Icon name="warning" size={32} color={T.color.error} />
    </div>
    <Txt variant="subtitle" style={{ marginBottom: 6 }}>{title}</Txt>
    <Txt variant="bodySm" color={T.color.textSecondary} style={{ marginBottom: 20 }}>{body}</Txt>
    {onRetry && <SecondaryButton onClick={onRetry} icon="refresh" style={{ maxWidth: 240, margin: '0 auto' }}>Retry</SecondaryButton>}
  </div>
);

// ── BottomSheet / Dialog ─────────────────────────────────────
const Overlay = ({ onClose, children, align = 'bottom' }) => (
  <div onClick={onClose}
    style={{
      position: 'absolute', inset: 0, background: 'rgba(20,29,45,0.72)',
      display: 'flex', alignItems: align === 'bottom' ? 'flex-end' : 'center', justifyContent: 'center',
      zIndex: 100,
    }}>
    <div onClick={e => e.stopPropagation()} style={{ width: '100%' }}>{children}</div>
  </div>
);

const BottomSheet = ({ onClose, title, children }) => (
  <Overlay onClose={onClose}>
    <div style={{
      background: T.color.navyDeep, borderRadius: `${T.radius.xl}px ${T.radius.xl}px 0 0`,
      borderTop: `1px solid ${T.color.navyBorder}`,
      padding: 20, maxHeight: '85%', overflow: 'auto',
    }}>
      <div style={{ width: 40, height: 4, background: T.color.navyBorder, borderRadius: 2, margin: '0 auto 16px' }} />
      {title && <Txt variant="subtitle" style={{ marginBottom: 12 }}>{title}</Txt>}
      {children}
    </div>
  </Overlay>
);

const Dialog = ({ onClose, title, children, actions }) => (
  <Overlay onClose={onClose} align="center">
    <div style={{ padding: '0 24px' }}>
      <div style={{
        background: T.color.navyRaised, borderRadius: T.radius.xl,
        border: `1px solid ${T.color.navyBorder}`, padding: 24,
      }}>
        {title && <Txt variant="title" style={{ marginBottom: 8 }}>{title}</Txt>}
        <div style={{ marginBottom: 20 }}>{children}</div>
        {actions && <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>{actions}</div>}
      </div>
    </div>
  </Overlay>
);

// ── Toast ────────────────────────────────────────────────────
const Toast = ({ text, onDone }) => {
  useEffect(() => { const t = setTimeout(() => onDone && onDone(), 2400); return () => clearTimeout(t); }, []);
  return (
    <div style={{
      position: 'absolute', bottom: 100, left: '50%', transform: 'translateX(-50%)',
      background: T.color.navyDeep, border: `1px solid ${T.color.navyBorder}`,
      color: T.color.gold500, padding: '10px 16px', borderRadius: T.radius.m,
      fontSize: 14, fontFamily: T.fontSans, zIndex: 200, boxShadow: T.elevation.lg,
    }}>{text}</div>
  );
};

// ── AppBarElevated + BackButton + BottomNavBar ──────────────
const AppBarElevated = ({ title, left, right, subtitle, modePill }) => (
  <div style={{
    background: T.color.navyBg, borderBottom: `1px solid ${T.color.navyBorder}`,
    padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 8, minHeight: 56,
    boxShadow: '0 1px 0 rgba(0,0,0,0.2)',
  }}>
    {left}
    <div style={{ flex: 1, minWidth: 0 }}>
      <Txt variant="subtitle" style={{ fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
        {title}
      </Txt>
      {subtitle && <Txt variant="caption" color={T.color.textMuted} style={{ letterSpacing: 0 }}>{subtitle}</Txt>}
    </div>
    {modePill}
    {right}
  </div>
);

const BackButton = ({ onClick }) => (
  <IconButton name="back" onClick={onClick} label="Back" />
);

const BottomNavBar = ({ active, onNav, mode = 'employer' }) => {
  const tabs = [
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'jobs', label: 'Jobs', icon: 'briefcase' },
    { id: 'chat', label: 'Chat', icon: 'chat' },
    { id: 'money', label: mode === 'worker' ? 'Earn' : 'Pay', icon: 'wallet' },
    { id: 'profile', label: 'Profile', icon: 'user' },
  ];
  return (
    <div style={{
      background: T.color.navyBg, borderTop: `1px solid ${T.color.navyBorder}`,
      display: 'flex', padding: '6px 0 10px',
    }}>
      {tabs.map(t => {
        const isActive = active === t.id;
        return (
          <button key={t.id} onClick={() => onNav && onNav(t.id)}
            style={{
              flex: 1, minHeight: 52, background: 'transparent', border: 'none', cursor: 'pointer',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, padding: 0,
            }}>
            <Icon name={t.icon} size={22} color={isActive ? T.color.gold500 : T.color.textMuted} />
            <Txt variant="caption" color={isActive ? T.color.gold500 : T.color.textMuted}
              style={{ letterSpacing: 0, fontWeight: isActive ? 600 : 500 }}>
              {t.label}
            </Txt>
          </button>
        );
      })}
    </div>
  );
};

// ── Mode pill (AppBar) ───────────────────────────────────────
const ModePill = ({ mode, onToggle }) => (
  <button onClick={onToggle}
    style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '6px 10px', borderRadius: T.radius.full,
      background: 'rgba(212,175,55,0.10)', border: `1px solid ${T.color.gold500}`,
      color: T.color.gold500, cursor: 'pointer',
      fontFamily: T.fontSans, fontSize: 12, fontWeight: 600, letterSpacing: '2%', textTransform: 'uppercase',
    }}>
    <div style={{ width: 6, height: 6, borderRadius: 3, background: T.color.gold500 }} />
    {mode === 'worker' ? 'Worker' : 'Employer'}
  </button>
);

// ── Segmented control ────────────────────────────────────────
const Segmented = ({ options, value, onChange }) => (
  <div style={{
    display: 'flex', background: T.color.navyDeep, borderRadius: T.radius.m,
    padding: 4, border: `1px solid ${T.color.navyBorder}`,
  }}>
    {options.map(o => {
      const active = o.value === value;
      return (
        <button key={o.value} onClick={() => onChange(o.value)}
          style={{
            flex: 1, minHeight: 40, border: 'none',
            background: active ? T.color.gold500 : 'transparent',
            color: active ? T.color.textOnGold : T.color.gold500,
            borderRadius: T.radius.s, cursor: 'pointer',
            fontFamily: T.fontSans, fontSize: 14, fontWeight: 600,
          }}>{o.label}</button>
      );
    })}
  </div>
);

// ── Radio / Checkbox ─────────────────────────────────────────
const Radio = ({ checked, label, sub, onClick }) => (
  <button onClick={onClick}
    style={{
      display: 'flex', alignItems: 'flex-start', gap: 12, width: '100%',
      background: checked ? 'rgba(212,175,55,0.06)' : 'transparent',
      border: `1px solid ${checked ? T.color.gold500 : T.color.navyBorder}`,
      borderRadius: T.radius.m, padding: 14, cursor: 'pointer', textAlign: 'left',
    }}>
    <div style={{
      width: 20, height: 20, borderRadius: 10, border: `2px solid ${checked ? T.color.gold500 : T.color.textMuted}`,
      display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none', marginTop: 2,
    }}>
      {checked && <div style={{ width: 10, height: 10, borderRadius: 5, background: T.color.gold500 }} />}
    </div>
    <div style={{ flex: 1 }}>
      <Txt variant="body" style={{ fontWeight: 500 }}>{label}</Txt>
      {sub && <Txt variant="bodySm" color={T.color.textSecondary} style={{ marginTop: 2 }}>{sub}</Txt>}
    </div>
  </button>
);

const Checkbox = ({ checked, label, onClick }) => (
  <button onClick={onClick}
    style={{
      display: 'flex', alignItems: 'center', gap: 12, width: '100%',
      background: 'transparent', border: 'none', cursor: 'pointer', padding: '8px 0',
    }}>
    <div style={{
      width: 20, height: 20, borderRadius: 4, border: `2px solid ${checked ? T.color.gold500 : T.color.textMuted}`,
      background: checked ? T.color.gold500 : 'transparent',
      display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none',
    }}>
      {checked && <Icon name="check" size={14} color={T.color.textOnGold} />}
    </div>
    <Txt variant="body">{label}</Txt>
  </button>
);

// ── Toggle switch ────────────────────────────────────────────
const Toggle = ({ checked, onChange }) => (
  <button onClick={() => onChange(!checked)}
    style={{
      width: 44, height: 26, borderRadius: 13,
      background: checked ? T.color.gold500 : T.color.navyBorder,
      border: 'none', cursor: 'pointer', padding: 0, position: 'relative',
      transition: 'background 150ms',
    }}>
    <div style={{
      width: 20, height: 20, borderRadius: 10, background: checked ? T.color.textOnGold : T.color.textMuted,
      position: 'absolute', top: 3, left: checked ? 21 : 3, transition: 'left 150ms',
    }} />
  </button>
);

// Export
Object.assign(window, {
  Icon, Txt,
  PrimaryButton, SecondaryButton, AccentButton, DestructiveButton, IconButton,
  TextField, OtpInput, PhoneNumberField,
  Banner, StatusPill, CapabilityTag, VerifiedBadge, ExplanationChip,
  Card, RatingStars, SkeletonLoader, EmptyState, ErrorState,
  BottomSheet, Dialog, Toast, Overlay,
  AppBarElevated, BackButton, BottomNavBar, ModePill,
  Segmented, Radio, Checkbox, Toggle,
});
