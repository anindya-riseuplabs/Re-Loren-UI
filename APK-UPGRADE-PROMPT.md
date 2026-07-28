# Re'Loren — Frontend APK Upgrade Prompt (Online Job Section)

Copy everything below the line into your coding agent. It is written to be self-contained.

---

## Role & scope

You are upgrading the **Re'Loren Android app frontend only**. No backend, no API contracts, no database work. Every screen uses local mock data and hard-coded sample values. Navigation must work end-to-end so the flow can be clicked through like a prototype.

The design reference is `index.html` in the Re'Loren UI showcase repo (Figma-style canvas of all screens). When any detail here is ambiguous, open the matching frame in `index.html` (`id="f-<frame-name>"`) and copy its layout, copy text, spacing and component order exactly.

## Why this work exists

The app has a **Physical Job** flow (on-site work, map matching, live worker location, cash or online payment) and an **Online Job** flow (remote work, no location at all, online payment only, worker can be in another country).

The Online Job flow was only half-built: posting existed, but everything after posting fell through into the physical-job screens. That produced these defects, all of which this upgrade must fix:

1. Selecting "Worldwide" on an online job post did nothing — no language selection appeared.
2. No worker country / flag anywhere in the bid list.
3. Online jobs showed a **map with the worker's live location** — wrong, remote work has no location.
4. Online job payment offered a **Cash** option — wrong, remote work is online-payment only.
5. After paying, "Download receipt" navigated into the physical start-job screen (with live tracking).
6. There was **no job-completion screen reachable** from any online-payment path, for either employer or worker. The flow dead-ended at the installment tracker.
7. No international payment handling — a foreign worker had no payout representation.

## Hard rules (apply to every online-job screen)

- **Never** render a map, a route line, a distance chip ("600 m away"), a live-location tile, or a "worker on the way" state on an online job screen.
- **Never** offer Cash as a payment method for an online job. Online = bKash / Nagad only.
- Online jobs have **no 4-digit start code**. Work starts once escrow is funded.
- Every online job pays in **3 installments: 20% / 60% / 20%**. Only the active installment is fully styled; later ones are dimmed (opacity ~0.5) with a "Pending" pill.
- Both employer and worker must be able to reach a **completion screen**. No progress screen may be a dead end.
- Currency: employer always pays in **BDT (৳)**. A foreign worker is shown their local currency, plus the exchange rate and converted amount.
- Bilingual: every user-visible string needs an English and a Bangla variant. Bangla uses Bangla digits. Fonts: Inter (Latin) + Hind Siliguri (Bangla).
- Design tokens are locked: navy + gold palette, teal (`#0FA7A3`) for action buttons, gold (`#D4AF37`) for decoration and selection. Do not invent new colors, radii, or type sizes.

---

## A. Screens to CREATE (10)

### A1. `PostSuccessOnline` — route `/employer/post/success` (online variant)
Success state after posting an online job.
- Globe icon in the success ring (not the generic check).
- Title: "Online Job Posted!"
- Body: "Your job is live worldwide. Workers who speak Bangla, English or Arabic are being notified now."
- Chips: `Worldwide`, `3 languages`.
- Primary button "View bids" → `ShortlistOnline`.
- Secondary "Make another post" → `PostComposeOnline`.

### A2. `ShortlistOnline` — route `/employer/shortlist/online`
Bid list for an online job. **No radar animation, no map, no distance.**
- App bar title "Job in progress", subtitle "3 bids received".
- Header card: globe icon + "Collecting bids worldwide" / "Remote job — no location matching. Pick the worker you want to hire."
- Bid card (repeat 3, sample data below). Each card contains:
  - avatar, worker name, star rating + review count, bid amount on the right;
  - chip row: **country chip with flag icon** (gold outline), language chip (e.g. "Arabic · English"), and either a skill-match chip or a payout-currency chip ("Pays out in AED");
  - "View reviews →" link → worker reviews screen;
  - buttons: "Decline" (toast "Bid declined") and "Accept Bid" (toast "Bid accepted") → `ContactEmployerOnline`.
- Sample bids: Rahim Uddin · 4.9 (87) · ৳4,200 · Bangladesh · Bangla · English · Logo design; Ayesha Hassan · 4.8 (64) · ৳4,800 · UAE · Arabic · English · Pays out in AED; Lucie Martin · 4.7 (31) · ৳5,100 · France · French · English · Pays out in EUR.

### A3. `JobDetailOnline` — route `/job/detail/online`
Worker-facing detail for an online job. **No map, no distance, no route card.**
- Header: title "Logo design for a Dhaka cafe", "Posted 12 min ago", budget ৳4,500.
- Chip row: `Online · remote`, `Worldwide`, `Instant`.
- Description paragraph.
- Card "HOW THIS JOB RUNS": three icon rows — "Fully remote — no travel, no location sharing", "Deliver the work through chat", "Paid online in 3 installments (20% · 60% · 20%)".
- Card "LANGUAGE REQUIRED": chips Bangla / English / Arabic.
- Card "POSTED BY": client name, rating, **country chip with flag**, "View client reviews →".
- Buttons: "Place a bid" → bid submit screen; "Accept offer" → `WorkerContactOnline`.
- If the worker's NID is unverified, both buttons are disabled (match the existing unverified pattern used on the physical job detail).

### A4. `ContactEmployerOnline` — route `/contact/employer/online`
Employer's post-accept contact screen for an online job. **No map.**
- Order card: job caption + `Online · remote` chip.
- Prominent countdown card: 2:47 timer, "Continue within 2:47", "If you do not continue within the time, this job will be automatically cancelled."
- Worker card: avatar, name, rating, **country chip with flag**, language chip, "View reviews →", Chat and Call buttons.
- Agreed price row.
- Info banner: "This is a remote job — no live location and no map tracking. Work is delivered through chat."
- Footer: "Forward order" → `ShortlistOnline`; "Cancel job" → cancel-reason screen; primary "Continue" → `PaymentOnline`.

### A5. `PaymentOnline` — route `/payment/online`
- "AMOUNT TO BE PAID" + ৳4,800 (amount only, nothing else in that card).
- Info banner: "Online jobs are paid online only. Cash isn't available for remote work."
- PAYMENT METHOD: exactly two radio tiles — **bKash (•••• 7890)** and **Nagad (•••• 4521)**. No cash. No card.
- Row "Add payment method" → add-method screen.
- Section "INTERNATIONAL PAYOUT" (show when the hired worker is outside Bangladesh):
  - worker line "Ayesha Hassan · UAE" / "Receives in AED";
  - "You pay ৳4,800", "Exchange rate 1 AED = ৳33.20", "Worker receives AED 122.90";
  - caption "You always pay in ৳ from bKash / Nagad. Re'Loren converts and pays the worker in their local currency."
- Primary "Pay Now" → `PaySuccessOnline`.

### A6. `PaySuccessOnline` — route `/payment/online/success`
Dimmed background with a centered card (popup style), close ✕ in the card corner.
- Success ring, "Payment secured", "৳4,800 is held in escrow. The worker can start now."
- Primary "Job Progress" → `JobProgressOnlineEmployer`.
- Secondary "Download receipt" — toast "Receipt downloaded", **does not navigate**.

### A7. `JobProgressOnlineEmployer` — route `/job/progress/online`
- App bar "Job Progress" / subtitle "Online · remote".
- Worker card: avatar, name, rating, call + chat icon buttons, country chip with flag.
- Job card: caption + Total ৳4,800.
- INSTALLMENTS: 1) 20% · ৳960 — "Active" pill, with "Cancel job" (→ cancel-reason) and "Pay amount" (toast "Installment 1 disbursed"); 2) 60% · ৳2,880 — dimmed, "Pending"; 3) 20% · ৳960 — dimmed, "Pending".
- Info banner: "Remote job — no live location tracking. Delivered work arrives in chat."
- Footer primary "Complete this job" → completion screen.

### A8. `WorkerContactOnline` — route `/worker/contact/online`
Worker's screen after the employer accepts their offer on an online job.
- Success banner "Offer accepted" / "The client accepted your offer. This is a remote job — start as soon as the payment is secured."
- Client card: avatar, name, rating, country chip with flag, "View reviews →", Chat + Call.
- Job card: caption, `Online · remote` chip, Budget ৳4,800, "You receive AED 122.90".
- Info banner: "No 4-digit code and no location sharing for remote jobs — the job starts once escrow is funded."
- Footer: forward-order caption + "Forward order" (toast); primary "Start work" → `WorkerProgressRemote`.

### A9. `WorkerProgressRemote` — route `/worker/progress/remote`
- App bar "Job Progress" / "Online · remote".
- Client card with call + chat.
- Job card: caption, Budget ৳4,800, "You receive AED 122.90".
- INSTALLMENTS, read-only status: 1 Completed (green check), 2 In progress (gold border), 3 Pending (dimmed).
- Info banner: "Send the delivered files in chat, then submit the work for the client to confirm."
- Footer: primary "Submit completed work" → `WorkerCompletion`; destructive "Cancel this job" → cancellation confirm sheet (keep the existing "This may affect your rating" sheet copy).

### A10. `WorkerCompletion` — route `/worker/job/completion`
Worker-side completion screen (the counterpart of the employer completion screen).
- "Skip" text button top-right → worker home.
- Success ring, "Work submitted", "The client has been notified. Your final installment is released once they confirm."
- Job card: caption, "Earned ৳4,800", "Paid out to you AED 122.90".
- Rating card: client avatar + name, "Rate your client", 5 tappable stars.
- Optional review textarea.
- Primary "Submit" → worker home, toast "Review submitted".

---

## B. Screens to MODIFY (6)

### B1. `PostComposeOnline` — the reach + language picker
Currently "Within Country" and "Worldwide" do nothing. Make them a working radio group that swaps the panel below:
- **Within Country** → info banner "Only workers inside Bangladesh will be notified about this job."
- **Worldwide** → language panel:
  - label "WORKER LANGUAGE";
  - caption "Workers are notified in the languages you pick — in the countries where those languages are spoken.";
  - search field, placeholder "Search a language...";
  - **multi-select** checkbox tiles (more than one can be on at a time — this is not a radio group): Bangla (Bangladesh · India) ✓ preselected, English (Worldwide) ✓ preselected, Arabic (UAE · Saudi Arabia · Qatar), Hindi (India), Malay (Malaysia), French (France · Canada);
  - info banner with globe icon: "You pay in ৳ from bKash / Nagad. Foreign workers withdraw in their own currency — Re'Loren converts it."
- Radio subtitles: "Only workers inside Bangladesh can bid" / "Workers from any country can bid".
- Keep the existing description textarea, job-type dropdown, budget field, and the "Online jobs are paid online only (bKash / Nagad). Cash isn't available." banner.

### B2. `PostReviewOnline`
- Add a "Worker language" row showing the selected language chips.
- "Where should this run?" reflects the actual selection (sample shows Worldwide).
- Add banner: "Workers in Bangladesh, UAE, Saudi Arabia and Qatar will be notified in their own language."
- "Confirm & post" now goes to `PostSuccessOnline`, **not** the physical post-success screen.

### B3. Online job feed (both the populated and empty variants)
Every card tap, "View details" and "Accept offer" must open **`JobDetailOnline`**, never the physical job detail. This single mis-wire is what dropped online jobs into the map flow.

### B4. `PaySuccess` (physical job, online payment)
- "Download receipt" becomes a secondary button that fires a toast only.
- Add a primary "Job Progress" button that carries the navigation forward (to the physical start-job screen).

### B5. `Installments` (physical job, online payment)
Add a footer primary **"Complete this job"** → completion screen. Without it this screen is a dead end and the job can never be completed.

### B6. `WorkerProgressOnline` (physical job, worker side, online payment)
Add a footer primary **"Mark work complete"** → `WorkerCompletion`, above the existing "Cancel this job" button. Same dead-end fix on the worker side.

---

## C. Flow graph to implement

**Employer — online job**
```
Employer home
  → Post job (choose "Online Job")
  → PostComposeOnline  [Within Country | Worldwide → language multi-select]
  → PostReviewOnline
  → PostSuccessOnline
  → ShortlistOnline           (bids with flag + country + languages)
  → ContactEmployerOnline     (3-min timer, no map)
  → PaymentOnline             (bKash/Nagad only + international payout)
  → PaySuccessOnline          (popup: Job Progress | Download receipt)
  → JobProgressOnlineEmployer (installments 20/60/20, no map)
  → Completion → Rating
```

**Worker — online job**
```
Worker home → Online job feed
  → JobDetailOnline
  → (Place a bid → bid submit)  or  (Accept offer)
  → WorkerContactOnline    (no 4-digit code)
  → WorkerProgressRemote   (installment status, submit work)
  → WorkerCompletion       (rate client)
```

**Physical job, online payment (dead ends being fixed)**
```
… → PaySuccess → [Job Progress] → Job start code → Installments → [Complete this job] → Completion → Rating
… worker side: WorkerProgressOnline → [Mark work complete] → WorkerCompletion
```

---

## D. Acceptance checklist

Tick every line by clicking through the built APK:

- [ ] Selecting "Worldwide" reveals the language list; selecting "Within Country" hides it.
- [ ] Multiple languages can be checked at the same time; tapping a checked one unchecks it.
- [ ] Every bid card on an online job shows the worker's country with a flag icon.
- [ ] No map, route line, distance chip, or live-location tile appears anywhere in the online job flow — feed card, job detail, contact page, payment, progress.
- [ ] The online payment screen has exactly two methods (bKash, Nagad) and no cash option.
- [ ] The international payout block shows: amount paid in ৳, exchange rate, and the worker's amount in their own currency.
- [ ] "Download receipt" never navigates; it shows a toast.
- [ ] From the online payment success popup, "Job Progress" opens the online progress screen (no live location).
- [ ] The employer's online progress screen reaches a completion screen.
- [ ] The worker's online progress screen reaches a worker completion screen.
- [ ] The physical-job installment tracker also reaches a completion screen ("Complete this job").
- [ ] The physical-job worker progress screen also reaches a worker completion screen ("Mark work complete").
- [ ] Switching the app to Bangla translates every new screen, including digits.

---

## E. String pairs for the new screens (EN → BN)

| English | Bangla |
|---|---|
| Only workers inside Bangladesh can bid | শুধু বাংলাদেশের ভেতরের কর্মীরা বিড করতে পারবে |
| Workers from any country can bid | যেকোনো দেশের কর্মীরা বিড করতে পারবে |
| Only workers inside Bangladesh will be notified about this job. | এই কাজের বিজ্ঞপ্তি শুধু বাংলাদেশের ভেতরের কর্মীরা পাবে। |
| WORKER LANGUAGE | কর্মীর ভাষা |
| Workers are notified in the languages you pick — in the countries where those languages are spoken. | আপনি যে ভাষাগুলো বাছবেন সেই ভাষার দেশগুলোর কর্মীদের কাছে তাদের নিজের ভাষায় বিজ্ঞপ্তি যাবে। |
| Search a language... | ভাষা খুঁজুন... |
| You pay in ৳ from bKash / Nagad. Foreign workers withdraw in their own currency — Re'Loren converts it. | আপনি বিকাশ / নগদ থেকে ৳-এ পরিশোধ করবেন। বিদেশি কর্মীরা নিজের মুদ্রায় টাকা তুলবে — রি'লরেন রূপান্তর করে দেবে। |
| Online Job Posted! | অনলাইন কাজ পোস্ট হয়েছে! |
| Your job is live worldwide. Workers who speak Bangla, English or Arabic are being notified now. | আপনার কাজ এখন বিশ্বব্যাপী চালু। বাংলা, ইংরেজি বা আরবি জানা কর্মীদের কাছে বিজ্ঞপ্তি যাচ্ছে। |
| View bids | বিড দেখুন |
| Collecting bids worldwide | বিশ্বব্যাপী বিড সংগ্রহ করা হচ্ছে |
| Remote job — no location matching. Pick the worker you want to hire. | রিমোট কাজ — কোনো অবস্থান মেলানো নেই। যাকে নিয়োগ দিতে চান তাকে বেছে নিন। |
| HOW THIS JOB RUNS | এই কাজ কীভাবে চলবে |
| Fully remote — no travel, no location sharing | সম্পূর্ণ রিমোট — কোনো যাতায়াত নেই, অবস্থান শেয়ার নেই |
| Deliver the work through chat | চ্যাটের মাধ্যমে কাজ জমা দিন |
| Paid online in 3 installments (20% · 60% · 20%) | 3 কিস্তিতে অনলাইনে পরিশোধ (20% · 60% · 20%) |
| LANGUAGE REQUIRED | প্রয়োজনীয় ভাষা |
| This is a remote job — no live location and no map tracking. Work is delivered through chat. | এটি একটি রিমোট কাজ — কোনো লাইভ লোকেশন বা ম্যাপ ট্র্যাকিং নেই। কাজ চ্যাটের মাধ্যমে জমা হয়। |
| Online jobs are paid online only. Cash isn't available for remote work. | অনলাইন কাজ শুধু অনলাইনে পরিশোধ হয়। রিমোট কাজে নগদ নেই। |
| INTERNATIONAL PAYOUT | আন্তর্জাতিক পরিশোধ |
| You pay | আপনি দেবেন |
| Exchange rate | বিনিময় হার |
| Worker receives | কর্মী পাবে |
| You always pay in ৳ from bKash / Nagad. Re'Loren converts and pays the worker in their local currency. | আপনি সবসময় বিকাশ / নগদ থেকে ৳-এ পরিশোধ করবেন। রি'লরেন রূপান্তর করে কর্মীকে তার স্থানীয় মুদ্রায় দেবে। |
| Receipt downloaded | রসিদ ডাউনলোড হয়েছে |
| Complete this job | এই কাজটি সম্পন্ন করুন |
| Remote job — no live location tracking. Delivered work arrives in chat. | রিমোট কাজ — কোনো লাইভ লোকেশন ট্র্যাকিং নেই। জমা দেওয়া কাজ চ্যাটে আসবে। |
| The client accepted your offer. This is a remote job — start as soon as the payment is secured. | ক্লায়েন্ট আপনার প্রস্তাব গ্রহণ করেছে। এটি রিমোট কাজ — পেমেন্ট নিশ্চিত হলেই শুরু করুন। |
| You receive | আপনি পাবেন |
| No 4-digit code and no location sharing for remote jobs — the job starts once escrow is funded. | রিমোট কাজে কোনো 4 সংখ্যার কোড বা অবস্থান শেয়ার লাগে না — এসক্রোতে টাকা জমা হলেই কাজ শুরু। |
| Start work | কাজ শুরু করুন |
| Send the delivered files in chat, then submit the work for the client to confirm. | চ্যাটে ফাইলগুলো পাঠান, তারপর ক্লায়েন্টের নিশ্চিতকরণের জন্য কাজ জমা দিন। |
| Submit completed work | সম্পন্ন কাজ জমা দিন |
| Mark work complete | কাজ সম্পন্ন চিহ্নিত করুন |
| Work submitted | কাজ জমা হয়েছে |
| The client has been notified. Your final installment is released once they confirm. | ক্লায়েন্টকে জানানো হয়েছে। তারা নিশ্চিত করলেই আপনার শেষ কিস্তি ছাড় হবে। |
| Earned | আয় |
| Paid out to you | আপনাকে পরিশোধ |
| Rate your client | আপনার ক্লায়েন্টকে রেটিং দিন |
| Review submitted | রিভিউ জমা হয়েছে |

---

## F. Deliverable

- All 10 new screens built and reachable, all 6 modifications applied.
- Every checklist item in section D passing on a real device or emulator.
- A short report listing: screens added, screens modified, navigation edges added, and anything you could not complete with the reason.
