// Re'Loren v2 tokens — navy + gold, locked from spec §4. Do NOT invent values.

const T = {
  color: {
    // Primary — Rich Royal Blue (refined, sophisticated)
    primary50:  '#ECF0F8',
    primary100: '#CEE0F5',
    primary200: '#A8C8ED',
    primary300: '#7FA8E0',
    primary400: '#4F82CC',
    primary500: '#1E4AAB',
    primary600: '#0F3380',
    primary700: '#0B2860',
    primary800: '#082047',
    primary900: '#051530',

    // Dark-mode luxury variants
    navyBg:      'linear-gradient(135deg, #0A1F4D 0%, #050E24 100%)', // More vibrant navy/blue gradient
    navyBgSolid: '#0A1F4D',
    navyRaised:  'rgba(26, 44, 80, 0.7)', // Slightly more blue glassmorphism
    navyDeep:    '#071126', // deep blue for modals/deepest
    navyHover:   'rgba(40, 60, 100, 0.5)',
    navyBorder:  'rgba(212, 175, 55, 0.18)', // subtle gold border
    navyDivider: 'rgba(212, 175, 55, 0.1)',

    // Secondary — Gold (text + CTA on navy)
    gold50:  '#FAF4DC',
    gold100: '#F3E4A8',
    gold300: '#E5C869',
    gold500: '#D4AF37',
    gold600: '#C9A227', // Rich gold accent
    gold700: '#E8C566',
    gold900: '#F5DCA0',
    goldGradient: 'linear-gradient(90deg, #8C5A17 0%, #C89533 20%, #FDE48F 50%, #C49130 80%, #875514 100%)',

    // Accent — Teal/Cyan (complementary to blue, adds visual sophistication)
    teal50:   '#E0F7F6',
    teal100:  '#B3ECEA',
    teal300:  '#5FD9D4',
    teal500:  '#0FA7A3',
    teal600:  '#0A8A8A',
    teal700:  '#067A76',
    teal900:  '#033B39',

    // Warm Neutral — Taupe (for secondary surfaces, bridges blue and gold)
    taupe50:   '#F5F3F1',
    taupe100:  '#E8E4E0',
    taupe300:  '#C8BFBA',
    taupe500:  '#8B7D77',
    taupe700:  '#5B5450',
    taupe900:  '#2A2620',

    // Foreground tiers on navy
    textHeading:   '#FDFBF7', // warm white for headings
    textPrimary:   '#A0AEC0', // soft gray for body text
    textSecondary: '#718096',
    textMuted:     'rgba(160, 174, 192, 0.48)',
    textOnGold:    '#0B0F1A',

    // Neutrals (refined warm grays — for non-navy surfaces like chat images)
    n0:   '#FFFFFF',
    n50:  '#F9FAFB',
    n100: '#F3F4F6',
    n200: '#E5E7EB',
    n400: '#A1A5B0',
    n600: '#5A6370',
    n800: '#2A2E37',
    n900: '#16191F',

    // Semantic (paired with icon in UI) — adjusted for new palette harmony
    success:      '#4CAF50',
    successBg:    '#1B4620',
    warning:      '#FF9800',
    warningBg:    '#4A3500',
    error:        '#EF5350',
    errorBg:      '#3B0F11',
    info:         '#29B6F6',
    infoBg:       '#052238',

    offline: '#FF9800',
    conflict: '#FF9800',
  },
  space: { xs: 4, s: 8, m: 12, l: 16, xl: 24, xxl: 32, xxxl: 48, huge: 64 },
  radius: { s: 8, m: 12, l: 16, xl: 20, full: 9999 },
  elevation: {
    sm: 'inset 0 1px 1px rgba(255, 255, 255, 0.05), 0 4px 6px rgba(0, 0, 0, 0.2)', // soft inner shadow
    md: 'inset 0 1px 1px rgba(255, 255, 255, 0.08), 0 8px 16px rgba(0, 0, 0, 0.3)',
    lg: 'inset 0 1px 1px rgba(255, 255, 255, 0.1), 0 12px 24px rgba(0, 0, 0, 0.4), 0 0 20px rgba(212, 175, 55, 0.15)', // with soft gold glow
  },
  type: {
    display:  { size: 36, lh: 1.3, w: 700, ls: '-0.5%' },
    headline: { size: 28, lh: 1.3, w: 700, ls: '-0.5%' },
    title:    { size: 22, lh: 1.3, w: 600 },
    subtitle: { size: 18, lh: 1.4, w: 600 },
    body:     { size: 16, lh: 1.5, w: 400 },
    bodySm:   { size: 14, lh: 1.5, w: 400 },
    caption:  { size: 12, lh: 1.4, w: 500, ls: '2%' },
  },
  fontSans: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  fontBangla: "'Hind Siliguri', Inter, sans-serif",
};

window.T = T;
