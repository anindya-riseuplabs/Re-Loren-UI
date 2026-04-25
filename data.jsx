// Re'Loren v2 — sample data

const SAMPLE = {
  user: {
    name: 'Karim Ahmed',
    phone: '+880 1711-234567',
    email: 'karim@example.com',
    avatar: null,
    language: 'Banglish',
    verified: true,
  },
  worker: {
    name: 'Rahim Uddin',
    rating: 4.9,
    ratingCount: 87,
    languages: ['Bangla', 'English'],
    verified: true,
    asset: 'Motorbike',
  },
  skills: {
    popular: ['Bike delivery', 'Food delivery', 'Pickup / drop'],
    transport: ['Bike delivery', 'Car ride-share', 'Truck moving'],
    handyman: ['General handyman', 'Electrician', 'Plumber', 'Carpenter'],
  },
  assets: [
    { id: 1, name: 'Motorbike', sub: 'Honda CB 150 · BD-12-3456', verified: true },
    { id: 2, name: 'Delivery bag', sub: 'Thermal insulated', pending: true },
  ],
  jobFeed: [
    {
      id: 'j1', title: 'Medicine delivery — Motijheel → Dhanmondi',
      tags: ['Bike delivery'], status: 'bidding',
      price: 1500, distance: '2 km', bids: 4, postedAgo: '12 min',
      type: 'instant',
      description: 'Need someone to pick up medicine from Motijheel pharmacy and deliver to Dhanmondi before 6 PM.',
    },
    {
      id: 'j2', title: 'Move single sofa — Gulshan',
      tags: ['Moving'], status: 'bidding',
      price: 2000, distance: '4.5 km', bids: 1, deadline: '01/05/2026',
      type: 'regular',
    },
    {
      id: 'j3', title: 'Fix kitchen sink leak — Banani',
      tags: ['Plumber'], status: 'bidding',
      price: 1200, distance: '1.8 km', bids: 3, postedAgo: '34 min',
      type: 'instant',
    },
    {
      id: 'j4', title: 'Drop documents to Agargaon — rush',
      tags: ['Bike delivery'], status: 'bidding',
      price: 800, distance: '3.1 km', bids: 2, postedAgo: '8 min',
      type: 'instant',
    },
  ],
  shortlist: [
    {
      rank: 1, name: 'Rahim Uddin', rating: 4.9, ratingCount: 87,
      languages: ['Bangla', 'English'], bid: 1500, distance: '600 m',
      asset: 'Motorbike', verified: true,
      chips: ['tag-match', 'asset', 'distance', 'rating'],
    },
    {
      rank: 2, name: 'Sabbir Hasan', rating: 4.7, ratingCount: 52,
      languages: ['Banglish'], bid: 1400, distance: '1.2 km',
      verified: true,
      chips: ['tag-match', 'language'],
    },
    {
      rank: 3, name: 'Nafis Ahmed', rating: 4.6, ratingCount: 38,
      languages: ['Bangla'], bid: 1600, distance: '1.8 km',
      verified: true,
      chips: ['tag-match', 'rating'],
    },
    {
      rank: 4, name: 'Tareq Islam', rating: 4.4, ratingCount: 21,
      languages: ['Bangla'], bid: 1550, distance: '2.4 km',
      verified: false,
      chips: ['tag-match'],
    },
  ],
  chat: [
    { side: 'worker', text: 'On my way, 5 mins out.', time: '10:42 AM' },
    { side: 'employer', text: 'Thanks — here\'s the pharmacy location.', time: '10:43 AM', image: true },
    { side: 'worker', text: 'Got it. Picking up now.', time: '10:48 AM' },
  ],
  notifications: [
    { id: 1, unread: true, title: 'New job match nearby', body: 'Medicine delivery — Motijheel to Dhanmondi', time: '10:00 AM', day: 'Today' },
    { id: 2, unread: true, title: 'Your bid was accepted', body: 'Move single sofa — ৳2,000 agreed', time: '9:32 AM', day: 'Today' },
    { id: 3, unread: false, title: 'Payment disbursed', body: 'Booking ৳450 released to your wallet', time: '6:04 PM', day: 'Yesterday' },
    { id: 4, unread: false, title: 'Please rate Karim Ahmed', body: 'Completed 23/04/2026', time: '3:20 PM', day: 'Yesterday' },
  ],
};

window.SAMPLE = SAMPLE;

// ──────────────────────────────────────────────────────────────
// Fmt helpers — BD locale
window.fmtBDT = (n) => {
  // Indian grouping at 1 lakh
  const s = Math.round(n).toString();
  if (s.length <= 3) return '৳' + s;
  const last3 = s.slice(-3);
  const rest = s.slice(0, -3);
  const grouped = rest.replace(/\B(?=(\d{2})+(?!\d))/g, ',');
  return '৳' + grouped + ',' + last3;
};
