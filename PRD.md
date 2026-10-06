---
title: "Re'Loren — Product Requirements Document"
version: "2.0"
status: client-review
date: "2026-10-06"
---

# Re'Loren — Product Requirements Document

**Version 2.0 · 6 October 2026 · Prepared for client review**

> **In one sentence:** Re'Loren is a mobile marketplace where anyone in Bangladesh can describe the help they need in their own words, get bids from nearby verified assistants (or from assistants worldwide for online work), and pay safely — online through escrow in three installments, or in cash.

This document describes everything that will be built in this release. It follows the finalized UI/UX design screen by screen, and every rule, flow and decision in it is final. Nothing is left open: where a detail could be read two ways, this document states the one that will be built.

The main body (§1 – §14) explains the product in plain language. Appendix A lists every requirement item by item with an ID and priority; Appendix B lists every screen.

---

## 1. How to read this document

<!-- pdf:visual skip -->
| If you want to… | Read |
|---|---|
| Understand the product in five minutes | §2 Product at a glance, §4 Key business rules |
| Walk through the app the way a user will | §5 User journeys (with screens) |
| Understand the AI and matching engine | §6 Behind the scenes |
| See the web panels for your team | §7 Admin panel, §8 Owner panel |
| See quality, technology and scope boundaries | §9 – §13 |
| Check exactly what will be built, item by item | Appendix A — Detailed functional requirements |
| See every screen in the design | Appendix B — Screen list |

**Words used in this document**

<!-- pdf:visual glossary -->
| Term | Meaning |
|---|---|
| **Client** | A person who requests help and pays for it. Needs no identity verification to post. |
| **Assistant** | A person who earns by doing work or by lending something they own. Must be identity-verified to bid. |
| **Request / Job** | What a client posts, written in their own words. |
| **Skill job** | On-site work done by the assistant in person (delivery, cleaning, repairs, driving…). |
| **Asset service** | The client needs a thing the assistant owns — a car, bike, room, camera, parking slot — with or without the owner's labour. |
| **Online job** | Work done remotely (design, translation, data entry…). Can be open to Bangladesh only or worldwide. |
| **Bid** | The price an assistant offers for a job. An assistant can also accept the client's posted budget as-is ("Accept offer"). |
| **Escrow** | Online payments are held safely by Re'Loren until the client releases them to the assistant. |
| **Installment** | Online payments are released to the assistant in three parts: 20% · 60% · 20%. |
| **4-digit code** | A short code exchanged in person to prove a job has started (and, for cash jobs, that cash was received). |
| **Commission** | Re'Loren's platform fee, 15% by default, taken from the assistant's amount. |
| **Admin / Owner** | Re'Loren staff who run the platform from the web panels. |

---

## 2. Product at a glance

### 2.1 Three ways to get help

<!-- pdf:visual jobtypes -->
| Type | What the client gets | Who can take it | How it is paid |
|---|---|---|---|
| **Skill job** | A nearby assistant does the work in person | Verified assistants nearby whose declared skills match | Online (bKash / Nagad, escrow) **or** cash |
| **Asset service** | A nearby assistant provides something they own (car, bike, room, camera…) | Verified assistants who have declared a matching asset that is currently free | Online (bKash / Nagad, escrow) **or** cash |
| **Online job** | Remote work delivered through the app's chat | Verified assistants in Bangladesh, or worldwide in the languages the client picks | Online only (bKash / Nagad, escrow) |

### 2.2 How it works

<!-- pdf:visual howitworks -->
1. **Ask** — The client writes what they need in their own words (Bangla, Banglish or English). No price in the description.
2. **Match** — Re'Loren's engine understands the request, decides whether it needs a skill or an asset, and notifies matching assistants.
3. **Bid** — Assistants bid (or accept the client's budget). The client sees the bids with ratings and reviews and accepts one.
4. **Pay & start** — The client pays online into escrow or chooses cash, and a 4-digit code starts the job in person.
5. **Work** — Both sides follow the job on a Job Progress screen. Online payments are released in three installments.
6. **Finish & rate** — The job is completed, the assistant is paid (minus commission) and both sides rate each other.

<!-- pdf:insert moneyflow -->

### 2.3 Who uses Re'Loren

| Role | Where | What they do |
|---|---|---|
| **Client** | Mobile app | Posts requests, chooses an assistant, pays, tracks progress, rates. |
| **Assistant** | Mobile app | Verifies identity, declares skills and assets, bids on jobs, does the work, gets paid. |
| **Admin** | Web admin panel | Reviews identity documents, approves AI skill tags, handles complaints, disputes and refunds. |
| **Owner** | Web owner panel | Everything an admin can do, plus commission settings, staff accounts, analytics and earnings. |

One account can act as both **Client** and **Assistant** — the user switches mode from their profile. Data and history are kept separately for each mode.

---

## 3. Platforms and delivery

| Deliverable | Description |
|---|---|
| **Android app** | Full client and assistant experience. Built with Flutter. |
| **iOS app** | Same app and features as Android, from the same Flutter codebase. |
| **Admin web panel** | Browser-based tool for the operations team (React). |
| **Owner web panel** | Browser-based tool for the platform owner (React). |
| **Backend & AI engine** | Secure API (FastAPI, Python), AI skill-tagging engine, matching engine, payments, notifications, real-time chat. Hosted on AWS. |

**App languages.** The app interface is delivered fully in **English and Bangla**. The language picker lists the worldwide language set used for online jobs; each additional language is switched on by adding its translation file — no redesign needed. Users can write requests, skills and messages in **any language or dialect** (Bangla, Banglish, English and more) — the AI engine understands them.

**Screen design.** Phone screens are designed at 360 × 720 dp in a navy-and-gold premium style, and scale to larger phones.

**Delivery plan**

| Release | Contents |
|---|---|
| **Release 1 — Core platform** | Accounts and sign-in, skill & asset declaration, AI skill-tagging engine, skill dictionary, matching engine, posting requests, feeds, bidding and hiring. |
| **Release 2 — Money, trust and operations** | Payments, escrow and commission; identity verification; job progress and completion; chat, calls, notifications and SOS; ratings and histories; admin panel; owner panel. |

---

## 4. Key business rules

These are the "rules of the game". Every screen and every requirement follows them.

<!-- pdf:visual rules -->
| # | Rule |
|---|---|
| R1 | **Clients post without verification.** Assistants must pass identity verification (NID + live face photos) before they can bid or accept an offer. Unverified assistants can browse jobs only. |
| R2 | **No prices in descriptions.** A job description may not mention a price; prices happen only in bids. The app blocks price mentions. |
| R3 | **Minimum budget ৳200.** The client's budget has a platform floor of ৳200, set by admin. |
| R4 | **Assistant job limit.** An assistant can hold **one skill job or one online job at a time**. While it runs, the skill and online feeds are locked. **Asset services have no limit**, but each asset can serve only one job at a time. |
| R5 | **Bid freely, first acceptance wins.** An assistant may bid on as many jobs as they like. When a client accepts one bid, the assistant's other active bids are removed automatically (kept in history as "Removed"). |
| R6 | **Client job limit.** A client can have one Skill job and one Asset Service collecting bids at the same time. A client may post new requests while earlier jobs are in progress. |
| R7 | **3 minutes to continue.** After accepting a bid, the client has **3 minutes** to continue to payment, or the job is cancelled automatically. |
| R8 | **5 minutes to pay.** On the payment step the assistant's bid is reserved for **5 minutes**. |
| R9 | **How each job type is paid.** Online jobs: online payment only. Skill jobs and asset services: online payment **or** cash. Online payment means **bKash or Nagad**. |
| R10 | **Escrow in three installments.** Online payments are held in escrow and released to the assistant in **three installments of 20%, 60% and 20%**. Only one installment is active at a time; the next unlocks when the previous one is released. The client releases each one. |
| R11 | **4-digit codes.** For on-site jobs the **client** shows a 4-digit code that the **assistant** enters to start the job. For cash jobs, at the end the **assistant** enters a 4-digit code after receiving the cash and gives it to the **client**, who enters it to complete the job. Online (remote) jobs use no code — they start as soon as escrow is funded. |
| R12 | **Commission.** Re'Loren keeps **15%** of the job amount by default (owner can set a different rate per service category). The assistant always sees what they will receive after commission. |
| R13 | **Commission on cash jobs.** On cash jobs the commission is recorded as **"Due to Re'Loren"** and is paid by the assistant from their linked bKash / Nagad before the payment deadline shown in their profile. Unpaid commission after the deadline pauses access to new jobs. |
| R14 | **Payment method needed for cash jobs.** An assistant without a linked bKash or Nagad account sees a warning and must add one before starting a cash job. |
| R15 | **Cancellation affects rating.** Cancelling more than once a day lowers the user's rating, which can affect future wages. Every cancellation needs a reason. |
| R16 | **Refunds.** Online payments cancelled before work starts are refunded in full. After work starts, the refund covers only the installments not yet released. Refunds are processed by admin. |
| R17 | **Disputes.** A dispute can be raised within 7 days of a job. The Re'Loren team investigates within 48 hours and can release, refund or split escrow funds. |
| R18 | **Location privacy.** Job feeds show only an approximate area (about 500 m). The exact job site appears after the assistant is hired. The assistant's live location is shared with the client only during an active on-site job. Online jobs never share location. |
| R19 | **One account per person, age 18+.** An assistant's age is checked from their NID photo. |
| R20 | **Worldwide online jobs.** The client always pays in Taka (৳). Assistants outside Bangladesh are paid in their own currency at the exchange rate shown at payment time; Re'Loren converts it. |

---

## 5. User journeys

Each journey shows the steps a user takes and the screens they see. Screen images are from the finalized design.

### 5.1 Getting started — everyone

<!-- screens: path=Language & path | landing=Welcome slider | login=Sign in | register-worker=Create account -->

1. **Splash** — the Re'Loren brand screen opens the app.
2. **Language & path** — the user picks their language and chooses **Client** ("Post jobs and hire assistants — no verification needed") or **Assistant** ("Find jobs and earn — needs identity verification"). Both can be changed later from the profile.
3. **Welcome slider** — three slides (Post a job in your own words · Earn on your own schedule · Identity-verified marketplace) with **Create Account** and **Sign In** buttons.
4. **Sign in** — mobile number (+880) and password. "Forgot password?" and "Create account" links. There is no email or OTP sign-in.
5. **Create account** — a switch at the top chooses "Hire assistants (Client)" or "Find work (Assistant)". Fields: profile photo, full name, gender (required), phone number, email (optional), password and retype password (minimum 8 characters). Assistants also enter their **profession** (pick from a searchable list or type their own — clients see it on bids) and can upload a **work certificate** (optional). An assistant's age is read from their NID later, so it is not asked here.
6. **Verify phone** — a 4-digit code is sent by SMS; wrong-code and resend (with countdown) states are included.
7. **Registration complete** — "Your account is ready." Assistants continue to verification; clients can skip and start posting right away.
8. **Forgot password** — enter phone number → 4-digit SMS code → create a new password (minimum 8 characters) → back to sign in. There is no email option.

### 5.2 Becoming a verified assistant

<!-- screens: worker-intro=Verification steps | nid=NID upload | face=Live face photos | emergency=Emergency contact -->

1. **Verification steps** — an overview: National ID, face verification, emergency contact, skill selection, asset registration (if any), asset ownership documents (if any), and skill certificate (optional). The assistant can start now or skip for later.
2. **NID upload** — front side, back side, and a **selfie holding the NID** (all three required). JPG, PNG or PDF, up to 5 MB each. Confirmation: "Documents received — our team will verify within 24 hours."
3. **Live face photos** — three guided photos (look straight, turn left, turn right). **Camera only — gallery is disabled.**
4. **Emergency contact** — contact's full name, phone number (verified by SMS code), NID or birth registration number, and relation. A banner shows "Verification under review — usually less than 24 hours".
5. The assistant continues to **Declare service** (§5.3).

While verification is under review, the assistant home shows a fixed **"Verification under review"** banner. The assistant can browse all jobs but cannot bid or accept offers until approved; on job details the live route stays hidden and a **Verify now** button replaces the bid buttons.

### 5.3 Declaring skills and assets

<!-- screens: skills=Declare service | asset-list=My assets | asset-form=Add asset | asset-preview=Preview asset -->

**Declare service** has three tabs: **Guideline**, **Declare skill** and **Declare asset**.

1. **Guideline** — a short tutorial video. The **Declare skill** tab unlocks only after the video has been watched to the end. Assistants who only want to lend something can go straight to **Declare asset**.
2. **Declare skill** —
   - Profession field (searchable list or own text).
   - One free-text box: "Type a skill in your own words", e.g. *"I can drive a car, be a house maid, cook deshi/Chinese food"*. Several skills can be added at once, separated by commas. If a skill isn't in the list it is still added as a custom skill.
   - Below it, a searchable A–Z list of standard skills; tapping one adds it. Skills already declared are marked and cannot be added twice.
   - "Your skills" shows everything added so far.
   - Optional skill certificate upload (PDF or photo). Assistants with approved certificates are ranked higher in clients' bid lists.
   - **Save skills** opens a confirmation pop-up: "You have these skills. Please confirm to proceed" with **Update** (edit the list) and **Confirm**.
   - After confirming: "Declare your assets?" with **Declare assets** or **Skip for now**.
3. **Declare asset** — "Lend what you own — earn every time a client hires it." Declaring an asset does not require any skill.

**My assets** lists each asset with a **View details** button and a remove (×) action. Removing always asks for confirmation ("Are you sure? This cannot be undone"). Quick-add chips (room for check-in, flat, car, bike, car parking, bicycle, scooty, camera) start the form pre-filled.

**Add asset** form: asset name, asset type (search the list **or** type your own — unknown types are saved under "Other" and grouped by the admin team), model, description, asset location (area search + pin on map), pictures, and ownership documents (optional, speeds up approval).

**Preview asset** shows everything for a final check with **Edit details** or **Add to my assets**, followed by an **Asset added** success screen (**Done** / **Add another**). **Asset details** shows the saved asset read-only.

### 5.4 Client: requesting help

<!-- screens: employer-home=Client home | post-compose=Request assistance | post-review=Confirm your job | post-success=Job posted -->

1. **Client home** — top bar shows the client's name, rating and **current location**, plus mode badge, notifications and menu. A large **Request for assistance** button, the **Active job** (with bid count) and **On-going jobs** (with installment or cash status). Bottom tabs: Home · Jobs · Profile. Menu: Work history, Add payment method, Manage account, Help, Terms & conditions, Sign out.
2. **Choose the kind of help** — **Online job assistance** (done remotely, paid online only) or **Post for assistance / asset service** (on-site, matched to nearby assistants, cash or online).
3. **Request assistance (on-site)** —
   - A ChatGPT-style free-text box: "Write what you need in your own words — skill or asset, our matching engine works it out". No price allowed.
   - **Job type**: *Instant* (matched to nearby assistants right now) or *Long duration / flexible timing* (stays open until a **deadline** the client picks).
   - "Does the job require movement to another location?" **Yes** → **From** and **To** fields (can be the same place), each with "drop pin manually on map". **No** → a single **Job location** with area suggestions and map pin.
   - **Budget** in ৳ (minimum ৳200).
   - **Post a job**.
4. **Behind the scenes** — the engine reads the request and classifies it as **Skill** or **Asset** (the client never sees this step). See §7.
5. **Confirm your job** — an auto-generated **caption**, the full description and all details (job type, deadline, relocation From/To or location, budget). For asset services it also shows the **asset type needed** and the **service area** (3 km radius by default), with the note "Only assistants with a matching declared asset can bid". **Confirm & post** or **Edit**.
6. **Job posted** — "We are now matching you with nearby assistants." **View processing** opens the bid list; **Request for another assistance** returns home.

**Online jobs** use the same free-text box and job type, plus:

- **Where should this run?** — *Within Country* (only assistants in Bangladesh can bid) or *Worldwide* (assistants from any country can bid).
- **Assistant language** (worldwide) — the client picks one or more languages; assistants in the countries where those languages are spoken are notified in their own language.
- Budget in ৳. "You pay in ৳ from bKash / Nagad. Foreign assistants are paid in their own currency — Re'Loren converts it." Cash is not available.

### 5.5 Client: choosing an assistant

<!-- screens: shortlist=Job in progress · bids | shortlist-asset=Bids · asset service | shortlist-online=Bids · online job | worker-reviews=Assistant reviews -->

1. **Job in progress** — an Uber-style searching animation while assistants are found, then the **bid list**. Each bid shows the assistant's name, profession, star rating (with number of ratings), bid amount, short match highlights, **View reviews**, **Decline** and **Accept Bid**. There is no countdown timer on this screen.
   - **Asset services**: each bid shows photos of the asset, asset name, rating, owner name and profession, and a prominent **View asset details** button that opens the full asset information.
   - **Online jobs**: each bid also shows the assistant's country, languages and payout currency.
2. **View reviews** — a separate page listing every review of that assistant: reviewer name, area and number of jobs posted, star rating, message and date.
3. **No assistant found in time** — if nobody bids within the matching window, the client gets three choices: **raise the offer**, **switch to long duration / time flexible** (moves to Posted Jobs and shows to assistants under "Still active"), or **try again later**.

### 5.6 Assistant: finding work and bidding

<!-- screens: worker-home=Assistant home | job-feed=Skill job feed | job-detail=Job detail | bid-submit-accepted=Accept client's wage -->

1. **Assistant home** — summary card (rating, verification status, jobs done, total earned, **Due to Re'Loren**), a **Declare service** shortcut, **Find work** with three feeds and live counts (**Online**, **Skill job**, **Asset service**), **My bidded jobs**, and **On-going service**. Bottom tabs: Home · Job list · Profile.
2. **Feeds** — each feed has two tabs: **Immediately hiring** (instant jobs) and **Still active** (long-duration jobs, showing their **deadline**). Each job card shows title, budget, area, distance, **View details** and **Accept offer**. Filters: sort (nearest, price low→high, price high→low, latest) and **distance radius** (default 3 km — assistants can bid only inside their radius).
   - **Skill job feed** includes a **demand map** by area, updated hourly. Areas show a ~500 m zone, never the exact site.
   - **Asset feed** shows only requests for asset types the assistant has declared and that are currently free.
   - **Online feed** shows remote jobs with the client's country.
3. **Locked feeds** — while an assistant is on a skill or online job, those feeds show a locked state explaining why; the asset feed stays open. If all their assets are on jobs, the asset feed explains that too.
4. **Job detail** — title, posting time, budget, distance, description, route (From/To) with a live route map, reminder ("Remind me in 1 / 2 / 3 hours / Never"), and **Posted by** (client name, rating, **View client reviews**). Asset jobs show the **asset required** and client & asset location. Online jobs show how the job runs (remote, delivered through chat, paid in 3 installments) and the required languages.
5. **Place a bid** — enter the bid amount; "You can edit this bid until it's accepted"; success message **"Bid submitted"**.
6. **Accept offer** — take the client's budget as-is. The amount is locked and the screen shows the platform commission (15%) and **what the assistant receives**.
7. **Edit bid** — job details, new amount, **Update bid** or **Withdraw bid**. Once the client accepts, the bid locks.

### 5.7 Hiring, paying and starting the job

<!-- screens: contact-employer=Contact page · client | payment=Pay online | job-start-code=Start job · share code | worker-contact=Assistant contact page -->

**Client side — on-site jobs (skill or asset)**

1. The client taps **Accept Bid**; a short "Bid accepted" message appears.
2. **Contact page** — the order, the assistant (name, rating, **Chat**, **Call**, **View reviews**), the assistant's live location, and the agreed price. A prominent **3-minute countdown**: "If you do not continue within the time, this job will be automatically cancelled." Buttons: **Forward order** (pick another bidder), **Cancel job**, **Continue**.
3. **Choose payment** — **Online payment** (bKash or Nagad, held in escrow) or **Cash on delivery** (pay the assistant in person). The bid is reserved for 5 minutes.
4. **Online** → **Payment** screen: "Amount to be paid", the client's saved bKash / Nagad accounts, **Add payment method**, then **Continue** to the provider to approve. A **Payment secured** pop-up confirms "৳… is held in escrow" with **Job Progress**, **Download receipt** and a close (×) button.
5. **Start job** — the client sees the job, amount, assistant, the assistant's live location, and a **4-digit code** to share with the assistant in person.

**Assistant side**

1. When the client accepts, the assistant gets a **contact page**: "Offer accepted — the client accepted your offer. Get the 4-digit code from them to start." It shows the client's short details with **View reviews**, **Chat** and **Call**, the job caption and budget, a box to **enter the 4-digit code from the client**, **Forward order** (pass the accepted order to another available assistant) and **Start Job**.
2. If the job is paid in **cash** and the assistant has no bKash / Nagad linked, a **"No payment method"** warning appears first, with **Add payment method** or **Not now**.

**Online (remote) jobs** — same contact page with the countdown, but no map or live location. Payment is online only and shows the **international payout** box when the assistant is abroad (amount in ৳, exchange rate, amount the assistant receives in their currency). There is **no 4-digit code**: the assistant taps **Start work** once escrow is funded.

### 5.8 During the job — Job Progress

<!-- screens: installments=Job Progress · client · online pay | cash-confirm=Job Progress · client · cash | worker-progress-online=Job Progress · assistant · online pay | worker-progress-cash=Job Progress · assistant · cash -->

**Client — paid online.** Assistant details with **Call** and **Chat**, the job post, the total, and **three installments: 20% · 60% · 20%** with percentage and amount. Only the current installment is active; the others look disabled with "Pending". The active installment has **Pay amount** (release it to the assistant) and **Cancel job**. The next installment activates after the previous one is released. Also: **Post for another assistance** and **Complete this job**.

**Client — paid in cash.** Assistant details with **Call** and **Chat**, the job post, the assistant's live location against the job site, **Amount to be paid**, and a box to **enter the 4-digit code from the assistant**. **Complete this Job** becomes active only after the code is entered. **Cancel job** is always available.

**Assistant — paid online.** Client details with **Call** and **Chat**, the job caption and budget, and the installments with their status (**Completed**, **In progress**, **Pending**) — only completed and current installments look active. Buttons: **Earn from another service** (asset services stay open), **Mark work complete**, **Cancel this job**.

**Assistant — paid in cash.** Client details with **Call** and **Chat**, the job and budget, and a 4-digit input: *"Put a 4-digit code and complete the job if you received the amount."* **Submit** activates once 4 digits are entered; the assistant gives this code to the client. **Cancel this job** is always available.

**Online (remote) jobs** — the same screens without location or map; finished work is delivered through the in-app chat, then the assistant taps **Submit completed work**.

Before an assistant cancels, a pop-up warns: "Cancelling more than once a day will reduce your rating, which may affect your next wages" — **Keep this job** or **Cancel anyway**.

### 5.9 Finishing — completion, rating and cancellation

<!-- screens: completion=Job complete · client | worker-completion=Work submitted · assistant | rate=Detailed rating | cancel-reason=Job cancellation reason -->

1. **Job complete (client)** — completion icon and message, the job caption, the assistant's name, a **1–5 star rating** with an optional written review, and **Submit**. **Skip** sits in the top-right corner. After submitting, an optional **detailed rating** asks "What stood out?" (On time, Polite, Professional, Good communication, Careful with items) plus a comment.
2. **Work submitted (assistant)** — "The client has been notified. Your final installment is released once they confirm." Shows the amount earned (and the payout in local currency for assistants abroad), and the assistant rates the client. **Skip** is available.
3. **Job Cancellation Reason** — a page with the cancellation rule, a required **reason** text box, an optional **image**, and **Submit**. Nothing else.
4. **Cancel an instant job while bidding** — a short prompt: Changed my mind / Found assistant offline / Other (with optional note) — **Keep job** or **Cancel job**.

### 5.10 Staying in touch and staying safe

<!-- screens: notifications=Notifications | complaints=Complaints & reports -->

- **Chat** — text chat between the matched client and assistant, with time stamps, read ticks and a **Call** button. Plain message bubbles; links can be shared (online work is delivered this way). No camera, image viewer or rules banner.
- **Call** — calls the other person through the phone's dialer. Available only between a matched client and assistant during a job.
- **Notifications** — grouped by day: new job matches, bid accepted, payment released, "please rate". There is no "Mark all read" button. Assistants also get a daily job-match notification at a time set by admin (10:00 AM by default).
- **Emergency SOS** — on every active-job screen: **Call 999 helpline** or **Share live location** (alerts the Re'Loren safety team and the user's emergency contact).
- **Complaints & reports** — report a client or an assistant, choose the related job, describe what happened, attach a screenshot (optional). Each report gets a reference number (e.g. #RP-2042) and a status (In review / Resolved).

### 5.11 Account and settings

<!-- screens: profile-hub=Profile | bid-history=My bidded jobs | work-history=Work history | payment-methods=Payment methods -->

- **Profile** — name, rating, phone; **active mode** (Client / Assistant) with **Manage mode**; Edit profile, Payment methods, Work history, Complaints & reports, Language, Help & support, Terms & privacy, Sign out. In Assistant mode it adds **Platform commission** (due, paid, payment deadline, **Pay commission**), **My skills**, **My assets** and **My bidded jobs**.
- **Switch mode** — switching to Assistant mode needs approved verification.
- **Edit profile** — photo, full name, **phone number**, email (optional). No time-zone or language fields here.
- **My bidded jobs** (assistant) — Active / Past / All, with statuses Active, Accepted, Rejected, Withdrawn and Removed (removed automatically when another bid was accepted).
- **Posted jobs** (client) — grouped as Active (bidding), Waiting for acceptance, Accepted, Long duration and History (completed / cancelled).
- **Work history** — Assistant: **Earned** and **Jobs done** totals, active jobs, then completed and past jobs. Client: **Disbursed** amount and **Completed jobs** totals, then the job list. No date-range filter.
- **Payment methods** (client and assistant) — **bKash and Nagad only**. Each saved account shows **Active** or **Inactive** and a **Remove** button; selecting an inactive one offers to make it the active method. **Add payment method** → choose bKash or Nagad → the provider's own portal to authorise → **"Payment method added"** success screen.
- **Help & support** — FAQ: how bids work, when payment is released, what happens if I cancel, how to verify, why there is a 15% commission.
- **Terms & privacy** — who we are, your account, payments & escrow, assistant verification, disputes, prohibited uses.
- **Language** — searchable language list and **Save**.

---

## 6. Behind the scenes — how Re'Loren understands and matches

### 6.1 Understanding free text (AI skill tagging)

Clients and assistants write in their own words, in any language. Re'Loren turns that text into **standard skill tags** in three layers, cheapest first:

<!-- pdf:visual layers -->
| Layer | What happens | Why |
|---|---|---|
| **1 · Memory (mapping table)** | The text is first split into separate phrases ("drive a car", "cook"). Each phrase is compared with phrases already approved before. If it matches, the known tag is reused at once. | Fast, free, and gets better every day. |
| **2 · AI (OpenAI GPT-5)** | New phrases are compared by meaning with the skill dictionary. If the similarity is high enough (≥ 0.80) the tag is assigned; otherwise the AI suggests a tag with a confidence score. | Understands new wording, dialects and languages. |
| **3 · People (admin review)** | Suggestions the AI is not sure about go to the admin queue for approval or correction. | Keeps the dictionary accurate and trustworthy. |

**Confidence rules**

| AI confidence | What happens |
|---|---|
| **0.90 or higher** | Approved automatically (when the tag already exists in the dictionary). |
| **0.60 – 0.89** | Sent to the admin review queue. Not used for matching until approved. |
| **Below 0.60** | Sent to the low-confidence queue for manual tagging. |

Every approved phrase is saved to the mapping table, so the same wording never needs the AI again.

### 6.2 The skill dictionary

- One **global dictionary** of standard skills, curated only by admins — the AI never writes to it directly.
- Skills have **parents and children**. Example: *Electrician* (205) is a parent; *Fix ceiling fan* (205.1) is a child.
- An assistant who declares a **parent** skill can take all its child jobs (broad scope). An assistant who declares only a **child** skill matches only that job (limited scope).
- Local wording stays local; standard tags are the same in every country. New countries get AI-drafted translations that an admin approves.

### 6.3 The matching engine

Matching is **rule-based and fully explainable — no AI is used to choose assistants**. It uses only approved, structured data: skill tags, declared assets, location, availability, ratings and language.

**Never used in matching:** raw text, AI guesses, confidence scores, or any tag that is not yet approved.

**Ranking order**

1. Skill tag match (exact child match first, then parent match)
2. Asset requirement met
3. Distance
4. Availability
5. Rating
6. Language
7. Verified certificates and other admin-defined ranking rules (admin can adjust weights and order)

**Asset rule:** jobs that need an asset (ride, delivery vehicle, room, rental) only go to assistants who have declared a matching asset in the asset section and whose asset is free. Skill text never counts as an asset.

**Explainable output:** for every shortlisted assistant the system records why they matched (tag, match type, asset, distance, rating, language). Admin and owner can view this log for every job.

**Multiple skills in one request:** if a request contains more than one skill, the engine matches on the main skill it detects; the client can see and change it on the review screen by editing the description.

---

## 7. Admin panel (web)

| ID | Feature | Details | Priority |
|---|---|---|---|
| ADM-01 | Tag approval queues | My queue, unassigned queue, low-confidence queue; load-balanced assignment (round robin, by load, country or skill). | Must |
| ADM-02 | Approve / reject / edit tags | Approving finalises the phrase; editing corrects the tag and updates the mapping table. | Must |
| ADM-03 | Conflict handling | When admin, AI and mapping table disagree, a conflict flag and banner appear; "Fix tag" resolves it. | Must |
| ADM-04 | Correct past tags | Undo or correct an earlier tag; the history keeps who, what, when and why. | Must |
| ADM-05 | Dictionary and mapping tables | View, filter and sort every table; add new phrases and tags; group "Other" asset types. | Must |
| ADM-06 | Verification review | NID, face photos, certificates and asset ownership documents in one workflow; approve or reject with reason. | Must |
| ADM-07 | Users, jobs and bids | Search, filter, view and manage clients, assistants, jobs and bids. | Must |
| ADM-08 | Complaints, disputes and abuse | Queues for reports and disputes; release, refund or split escrow; record outcomes; reply to the reporter. | Must |
| ADM-09 | Refunds and commission follow-up | Process refunds; weekly list of assistants with unpaid commission. | Must |
| ADM-10 | Platform settings | Minimum budget, daily notification time, matching window, ranking rules, default radius. | Must |
| ADM-11 | Logs and export | AI tagging, skill extraction, request classification, matching and verification logs; export to CSV / Excel. | Should |

## 8. Owner panel (web)

| ID | Feature | Details | Priority |
|---|---|---|---|
| OWN-01 | Everything in the admin panel | Full admin access. | Must |
| OWN-02 | Commission settings | Commission % per service category. | Must |
| OWN-03 | Staff management | Create, disable and assign roles to admin accounts. | Must |
| OWN-04 | Analytics and earnings | Revenue, commission collected and due, user growth, jobs by type, matching statistics, AI accuracy. | Must |
| OWN-05 | System logs | AI confidence log, mapping-table hit / miss log, admin queue, tag history, matching output. | Must |
| OWN-06 | Transactions | Every transaction across the platform. | Must |

---

## 9. Quality, security and performance

<!-- pdf:visual glossary -->
| Area | Commitment |
|---|---|
| **Speed** | Mapping-table lookups under 100 ms; matching results under 500 ms; AI tagging under 3 seconds per phrase. |
| **Availability** | 99.5% monthly uptime for the backend API. |
| **Scale** | Skill and mapping tables designed for millions of rows (indexing and partitioning); any number of countries. |
| **Security** | Token-based sign-in with refresh, role-based access, encrypted storage of NID images, face photos and payment details, protection against the OWASP Top 10 risks. |
| **Privacy** | Exact job location revealed only after hiring; live location only during active on-site jobs; ID documents visible only to verification staff. |
| **Audit trail** | Every AI call, admin action, tag change, verification decision, payment and matching run is logged with time and actor. |
| **Languages** | English and Bangla app interface; AI understands Bangla, Banglish, English and other languages; standard tags are global, wording is local. |
| **Exports** | All logs exportable as CSV / Excel. |

---

## 10. Technology and third-party services

<!-- pdf:visual decisions -->
| Service | Used for |
|---|---|
| **Flutter** | Android and iOS apps from one codebase |
| **FastAPI (Python)** | Backend API, AI engine and matching engine |
| **React** | Admin and owner web panels |
| **WebSocket** | Real-time chat |
| **OpenAI GPT-5 API** | AI skill tagging (similarity and suggestions), abuse detection |
| **Google Maps Platform** | Map pins, place suggestions, distance, radius, live route |
| **bKash API** | Online payments, escrow funding, payouts, payment-method linking |
| **Nagad API** | Online payments, escrow funding, payouts, payment-method linking |
| **SSL Wireless** | SMS codes (phone verification, password reset, emergency contact) |
| **Firebase Cloud Messaging** | Push notifications |
| **AWS (hosting, S3, SES)** | Servers, secure file storage (NID, photos, certificates, asset pictures), system emails |

## 11. What Re'Loren (the client) provides

To go live, the following accounts are opened in Re'Loren's name and access is shared with the development team:

<!-- pdf:visual cols -->
1. Google Play and Apple App Store developer accounts.
2. bKash and Nagad merchant / payment-gateway accounts.
3. SSL Wireless SMS account.
4. OpenAI API account.
5. Google Maps Platform billing account.
6. AWS account.
7. A licensed cross-border payout partner contract, required before **Worldwide** online jobs are switched on (Bangladesh-only online jobs work without it).
8. Final legal text for Terms & Privacy.

## 12. Not included in this release

<!-- pdf:visual cols -->
1. Card payments (Visa / Mastercard via SSLCommerz) — online payment is bKash and Nagad only.
2. Automatic NID checks against government databases — verification is manual by admin.
3. Automatic refunds — refunds are processed by admin.
4. In-app voice or video calling — calls use the phone's dialer.
5. Sending photos or files inside chat — chat is text and links.
6. AI safety pop-ups during jobs.
7. A notification on/off switch for assistants.
8. Training or fine-tuning AI models — the OpenAI GPT-5 API is used as provided.
9. Advanced business-intelligence dashboards — the owner panel includes the analytics listed in §8.
10. Professional translation of the app interface beyond English and Bangla (the app is ready to accept more languages).
11. App store listing preparation and publishing.
12. Production server lockdown settings at go-live (documented for Re'Loren's operations team).

## 13. Confirmed decisions

<!-- pdf:visual decisions -->
| Topic | Decision |
|---|---|
| User names | **Client** and **Assistant** |
| Sign-in | Mobile number + password |
| Client verification | Not required to post |
| Assistant verification | NID (front, back, selfie) + 3 live face photos + emergency contact; manual admin review within 24 hours |
| Payment methods | bKash and Nagad |
| Payment options per job | Online or cash (online jobs: online only) |
| Escrow release | 3 installments: 20% · 60% · 20%, released by the client |
| Commission | 15% default, owner-configurable per category |
| Start and completion proof | 4-digit codes (start: client → assistant; cash completion: assistant → client) |
| Time limits | 3 minutes to continue after accepting a bid; 5 minutes to pay |
| Minimum budget | ৳200, admin-configurable |
| Assistant job limit | One skill or online job at a time; asset services unlimited, one job per asset |
| Location sharing | Only during an active on-site job |
| AI provider | OpenAI GPT-5 |
| Matching | Rule-based, explainable, no AI |
| SMS provider | SSL Wireless |
| Push notifications | Firebase Cloud Messaging |
| Email | AWS SES |
| File storage and hosting | AWS (S3) |
| Chat | Real-time over WebSocket, text and links |
| Mobile apps | Flutter (Android + iOS) |
| Web panels | React |
| Backend | FastAPI (Python) |
| App languages | English and Bangla |
| Daily job-match notification | Admin-set time, default 10:00 AM |

---

## 14. Review and sign-off

This document, including Appendices A and B and the finalized UI/UX design, defines the scope of this release. Once signed, it becomes the baseline for development; any later change is handled as a change request with its own estimate.

| | Name | Signature | Date |
|---|---|---|---|
| **For Re'Loren (client)** | | | |
| **For RiseUp Labs** | | | |

---

## Appendix A — Detailed functional requirements

**Priority:** **Must** = required for launch. **Should** = included in this release, scheduled after the Must items of the same area.

### A.1 Accounts and sign-in

| ID | Requirement | Details | Priority |
|---|---|---|---|
| ACC-01 | Choose language and path on first launch | After splash: language picker + Client / Assistant path. Changeable later from Profile. | Must |
| ACC-02 | Welcome slider | Three slides (Post · Work · Trust) with Create Account and Sign In. | Should |
| ACC-03 | Register | Profile photo, full name, gender (required), phone (+880), email (optional), password + retype (min 8 characters). Client / Assistant switch at the top. | Must |
| ACC-04 | Assistant registration extras | Profession (searchable list + own text, shown on bids); optional work certificate. Age is taken from the NID. | Must |
| ACC-05 | Phone verification | 4-digit SMS code with resend countdown and wrong-code message. | Must |
| ACC-06 | Registration complete | Confirmation screen; assistant continues to verification; client may skip and post. | Should |
| ACC-07 | Sign in | Mobile number + password only. Secure token-based session with refresh. | Must |
| ACC-08 | Forgot password | Phone number → SMS code → new password (min 8, confirm). No email option. | Must |
| ACC-09 | Two modes in one account | Switch between Client and Assistant from Profile; each mode keeps its own data and history. Assistant mode requires approved verification. | Must |
| ACC-10 | Edit profile | Photo, full name, phone number, email. | Should |
| ACC-11 | Role-based access | Roles: client, assistant, admin, owner. Each feature is available only to the right role. | Must |
| ACC-12 | Sign out | From the menu and Profile. | Must |

### A.2 Assistant verification

| ID | Requirement | Details | Priority |
|---|---|---|---|
| VER-01 | Verification overview | Steps list with Start Verification and Skip for now. | Should |
| VER-02 | NID upload | Front, back and selfie holding the NID — all three required. JPG / PNG / PDF, max 5 MB each. Stored encrypted. | Must |
| VER-03 | Live face photos | Three guided photos (straight, left, right). Camera only; gallery disabled. Stored with time stamp. | Must |
| VER-04 | Emergency contact | Name, phone (SMS-verified), NID / birth registration number, relation. Required to finish onboarding. | Must |
| VER-05 | Under-review state | Fixed "Verification under review" banner on the assistant home; browse only — no bids or accepting offers; live route hidden on job details; Verify now button. | Must |
| VER-06 | Admin review | Admin approves or rejects NID and face photos with a reason; the assistant is notified. Target: within 24 hours. | Must |
| VER-07 | Certificates | Optional skill / work certificates; admin marks them verified. Verified certificates raise ranking. | Should |
| VER-08 | Audit | Every verification decision is logged with time and admin ID, and cannot be edited. | Must |

### A.3 Skills

| ID | Requirement | Details | Priority |
|---|---|---|---|
| SKL-01 | Tutorial first | Guideline video must finish before the Declare skill tab unlocks. | Should |
| SKL-02 | Free-text skills | One text box; any language; several skills separated by commas; unknown skills are added as custom skills. | Must |
| SKL-03 | Skill list | Searchable A–Z list of admin-approved skills; tap to add; duplicates blocked with a message. | Must |
| SKL-04 | Confirm skills | Editable confirmation pop-up (Update / Confirm), then Declare assets or Skip for now. | Must |
| SKL-05 | AI tagging of skills | Every skill is converted to a standard skill tag by the AI engine (§6). Only approved tags are used for matching. | Must |
| SKL-06 | Skills vs assets kept apart | Mentions of things owned (e.g. "I have a bike") in the skill box are ignored for asset matching; only the asset section counts. | Must |
| SKL-07 | Manage skills later | My skills from Profile. | Should |

### A.4 Assets

| ID | Requirement | Details | Priority |
|---|---|---|---|
| AST-01 | Asset list | All assets with View details and Remove; Add asset; quick-add chips. | Must |
| AST-02 | Add asset form | Name, type (search or own text → "Other"), model, description, location (area + map pin), pictures, ownership documents (optional). | Must |
| AST-03 | Preview before adding | Editable preview, then Asset added success (Done / Add another). | Must |
| AST-04 | View details | Read-only page per asset. | Must |
| AST-05 | Remove with confirmation | "Are you sure? This cannot be undone." | Must |
| AST-06 | No primary asset | All assets are equal; no "set primary". | Must |
| AST-07 | One job per asset | An asset on a job is hidden from new requests until it is free. | Must |
| AST-08 | New asset types | Admin groups "Other" types into categories and can add new types at any time. | Should |

### A.5 Posting a request

| ID | Requirement | Details | Priority |
|---|---|---|---|
| POST-01 | Choose kind of help | Online job assistance, or on-site assistance / asset service. | Must |
| POST-02 | Free-text description | ChatGPT-style box in any language. No separate caption — the caption is generated automatically. | Must |
| POST-03 | Block prices | Price mentions in the description are detected and blocked with a message. | Must |
| POST-04 | Job type | Instant, or Long duration / flexible timing with a deadline (date and time). | Must |
| POST-05 | Relocation | "Movement to another location?" Yes → From and To (can be the same), each with map pin. No → one job location with suggestions and map pin. | Must |
| POST-06 | Budget | Amount in ৳, minimum ৳200 (admin-configurable). | Must |
| POST-07 | Skill or asset classification | The engine decides whether the request needs a skill or an asset and routes it to the right review screen. Not shown to the client. | Must |
| POST-08 | Review before posting | Caption, description and all details; asset jobs add asset type and service area. Confirm & post / Edit. | Must |
| POST-09 | Posted confirmation | Success screen with View processing / View bids and Request for another assistance. | Must |
| POST-10 | Online job reach | Within Country or Worldwide; for Worldwide, pick assistant languages — assistants in countries where those languages are spoken are notified in their language. | Must |
| POST-11 | Online job payment notice | Online jobs show "paid online only (bKash / Nagad)" and the currency note. | Must |
| POST-12 | Client request limit | Rule R6 is enforced with a clear message. | Must |
| POST-13 | Posted jobs | List grouped by stage (Active, Waiting, Accepted, Long duration, History). | Must |

### A.6 Bids and hiring

| ID | Requirement | Details | Priority |
|---|---|---|---|
| BID-01 | Three feeds | Online, Skill job and Asset service, each with Immediately hiring / Still active tabs and counts. | Must |
| BID-02 | Feed filters | Sort (nearest, price, latest) and distance radius (default 3 km). Bids allowed only inside the radius. | Must |
| BID-03 | Demand map | Area-wise job demand, updated hourly, ~500 m zones; exact site hidden until hired. | Should |
| BID-04 | Locked feeds | Skill and online feeds locked while the assistant is on a skill or online job; asset feed filtered to free, declared assets. Clear explanation screens. | Must |
| BID-05 | Job detail | Description, budget, distance, route map, reminder, client details and reviews; asset and online variants. | Must |
| BID-06 | Place a bid | Amount, editable until accepted, "Bid submitted" confirmation. | Must |
| BID-07 | Accept offer | Take the client's budget; locked amount; shows commission and amount received. | Must |
| BID-08 | Edit / withdraw | Job details, update amount or withdraw while still bidding. | Must |
| BID-09 | Auto-remove other bids | When one bid is accepted, the assistant's other bids are removed and marked "Removed". | Must |
| BID-10 | Bid list for client | "Job in progress": searching animation, then bids with name, profession, rating, amount, match highlights, View reviews, Decline, Accept Bid. No timer. | Must |
| BID-11 | Asset bids | Asset photos, asset name, owner details and a prominent View asset details button. | Must |
| BID-12 | Online bids | Country, languages and payout currency on each bid. | Must |
| BID-13 | Reviews pages | Full review list for any assistant or client: reviewer, short details, stars, message, date. | Must |
| BID-14 | No match | Raise offer / switch to long duration / try again later. Matching window set by admin. | Must |
| BID-15 | Job reminders | Remind me in 1, 2 or 3 hours, or never. | Should |
| BID-16 | My bidded jobs | Active / Past / All with statuses. | Must |

### A.7 Payments, escrow and commission

| ID | Requirement | Details | Priority |
|---|---|---|---|
| PAY-01 | Contact page with countdown | After accepting a bid: assistant details, chat, call, live location, agreed price, 3-minute countdown with auto-cancel, Forward order, Cancel job, Continue. | Must |
| PAY-02 | Choose online or cash | Two options only: Online (bKash / Nagad, escrow) and Cash on delivery. 5-minute reservation. Online jobs skip this choice (online only). | Must |
| PAY-03 | Pay online | "Amount to be paid", saved bKash / Nagad accounts, Add payment method, redirect to provider. | Must |
| PAY-04 | Payment secured pop-up | Amount held in escrow; Job Progress, Download receipt, close (×). | Must |
| PAY-05 | Escrow and installments | Funds held in escrow; released in 20% / 60% / 20% by the client, one at a time. | Must |
| PAY-06 | Commission | 15% default, configurable by the owner per service category, deducted from the assistant's amount. | Must |
| PAY-07 | Commission on cash jobs | Recorded as "Due to Re'Loren"; paid by the assistant from bKash / Nagad before the deadline; overdue commission pauses new jobs; admin is reminded weekly of unpaid commission. | Must |
| PAY-08 | Payment methods | bKash and Nagad only; Active / Inactive; Remove; set active; add via provider portal; success screen. For clients and assistants. | Must |
| PAY-09 | Cash job warning | Assistant without a payment method is warned before a cash job. | Must |
| PAY-10 | International payout | Worldwide online jobs: client pays in ৳; the assistant abroad sees and receives their local currency at the shown exchange rate. | Should |
| PAY-11 | Receipts | Downloadable receipt for every online payment. | Should |
| PAY-12 | Refunds | Rule R16; processed by admin with full logging. | Must |
| PAY-13 | Transaction records | Job, amount, method, status, time for every payment, release, refund and commission. Admins see user-level records; the owner sees the whole platform. | Must |

### A.8 Job progress, completion and cancellation

| ID | Requirement | Details | Priority |
|---|---|---|---|
| JOB-01 | Start code | Client shows a 4-digit code; assistant enters it and taps Start Job. Not used for online jobs. | Must |
| JOB-02 | Client progress · online pay | Assistant details, call, chat, job post, total, 20/60/20 installments (active / pending), Pay amount, Cancel job, Complete this job, Post for another assistance. | Must |
| JOB-03 | Client progress · cash | Assistant details, call, chat, live location, amount to be paid, 4-digit code from assistant enables Complete this Job, Cancel job. | Must |
| JOB-04 | Assistant progress · online pay | Client details, call, chat, job and budget, installments as Completed / In progress / Pending, Mark work complete, Cancel this job, Earn from another service. | Must |
| JOB-05 | Assistant progress · cash | Client details, call, chat, job and budget, 4-digit code entry enables Submit, Cancel this job. | Must |
| JOB-06 | Online (remote) progress | Same as above without map, location or codes; Submit completed work. | Must |
| JOB-07 | Live location | Assistant's live location visible to the client during an active on-site job only. | Must |
| JOB-08 | Forward order | Client can pick another bidder; assistant can pass an accepted order to another available assistant. | Should |
| JOB-09 | Cancellation reason | "Job Cancellation Reason" page: required reason, optional image, Submit. Rating warning shown. | Must |
| JOB-10 | Cancel while bidding | Quick reason prompt for instant jobs. | Should |
| JOB-11 | Completion · client | Completion message, caption, assistant name, stars + review, Submit, Skip. | Must |
| JOB-12 | Completion · assistant | Work submitted, amount earned (and local-currency payout), rate the client, Skip. | Must |
| JOB-13 | Job status tracking | Posted → Bidding → Assigned → In progress → Completed or Cancelled, visible to both sides and to admin. | Must |

### A.9 Communication, notifications and safety

| ID | Requirement | Details | Priority |
|---|---|---|---|
| COM-01 | Chat | Real-time text chat for matched pairs, linked to the job, with read ticks; links allowed; all messages logged. | Must |
| COM-02 | Call | Call button on contact, progress and chat screens; uses the phone's dialer; matched pairs only. | Should |
| COM-03 | Notifications | Push notifications (job matches, bid accepted, payment released, rate requests) and in-app list by day. Daily job-match notification at admin-set time (default 10:00 AM). | Must |
| COM-04 | SOS | Call 999 or share live location with Re'Loren safety team and emergency contact, on all active-job screens. | Must |
| COM-05 | Abuse protection | Posts and messages are checked by AI for abusive or illegal content; violations are blocked and admin is notified. | Must |
| COM-06 | Complaints & reports | Report a client or assistant, related job, message, optional screenshot; reference number and status. | Must |

### A.10 Ratings, reviews and history

| ID | Requirement | Details | Priority |
|---|---|---|---|
| RAT-01 | Mutual rating | Both sides rate 1–5 stars with an optional review after each job. | Must |
| RAT-02 | Detailed feedback | Optional "What stood out?" tags and comment; private to Re'Loren and used for matching. | Should |
| RAT-03 | Ratings in matching | Ratings are a ranking factor (§6.3). | Must |
| RAT-04 | Public reviews | Star average, rating count and written reviews visible via View reviews. | Must |
| RAT-05 | Work history | Assistant: Earned + Jobs done. Client: Disbursed + Completed jobs. | Should |

### A.11 Settings and support

| ID | Requirement | Details | Priority |
|---|---|---|---|
| SET-01 | Language | Searchable language list; English and Bangla fully translated. | Must |
| SET-02 | Help & FAQ | Five FAQ topics, expandable. | Should |
| SET-03 | Terms & privacy | In-app terms with last-updated date. | Must |
| SET-04 | Commission card | Due, paid, deadline and Pay commission in Assistant mode. | Must |

### A.12 AI engine and matching

| ID | Requirement | Details | Priority |
|---|---|---|---|
| AI-01 | Phrase splitting | Text split into phrases at commas, "and", "with" and punctuation; each stored separately. | Must |
| AI-02 | Mapping table first | Known phrases reuse their approved tag without calling the AI. | Must |
| AI-03 | AI tagging | OpenAI GPT-5 similarity (threshold 0.80) and suggestion with confidence score. | Must |
| AI-04 | Confidence routing | ≥ 0.90 auto-approve; 0.60–0.89 admin queue; < 0.60 low-confidence queue. | Must |
| AI-05 | No duplicates | Each phrase is stored once; repeats update the existing entry. | Must |
| AI-06 | Same engine for both sides | Client requests and assistant skills go through the same layers and rules. | Must |
| AI-07 | Skill vs asset detection | Requests are classified as skill or asset; asset text is ignored in skill tagging. | Must |
| AI-08 | Global dictionary | Admin-only edits; duplicate, synonym and spelling checks on new tags. | Must |
| AI-09 | Parent / child tags | Child IDs follow the parent (205 → 205.1, 205.2…); parents inherit children. | Must |
| AI-10 | New countries | AI-drafted translations of the mapping table, approved by admin. | Should |
| MAT-01 | Tag-based matching | Matches by approved skill tag through the dictionary only. | Must |
| MAT-02 | Ranking | Ranking order in §6.3; weights adjustable by admin. | Must |
| MAT-03 | Asset rule | Asset jobs require a matching, free, declared asset. | Must |
| MAT-04 | Location and radius | Distance and service radius used in matching; live location only during active jobs. | Must |
| MAT-05 | Explainable log | Every matching run logged: job, tags, ranked assistants, reasons, time. | Must |
| MAT-06 | One assistant per job | Only one assistant is hired per job at a time. | Must |
| MAT-07 | Learning loop | Admin approvals and corrections are saved and reused, reducing AI calls over time. | Should |
| MAT-08 | Test mode | Owner / admin can try sample skills and requests and see tags and matches without touching live data. | Should |

---

## Appendix B — Screen list

All screens in the finalized design (94 screens, grouped as in the design file).

**1 · Getting started**

| Screen | Purpose |
|---|---|
| Splash | Brand opening screen |
| Language & path | Choose language and Client / Assistant |
| Welcome slider | Three intro slides, Create Account, Sign In |
| Sign in | Mobile number + password |
| Verify phone | 4-digit SMS code |
| Create account · client | Client registration |
| Create account · assistant | Assistant registration with profession and certificate |
| Registration complete | Account ready; continue to verification or skip |
| Forgot password | Phone number for reset code |
| New password | Set a new password |

**2 · Assistant verification**

| Screen | Purpose |
|---|---|
| Verification steps | Overview of all steps |
| NID upload | Front, back, selfie with NID |
| Live face photos | Three guided camera photos |
| Emergency contact | Contact details with phone verification |

**3 · Skills and assets**

| Screen | Purpose |
|---|---|
| Declare service | Guideline video, declare skill, declare asset, confirmation pop-ups |
| My assets | Asset list, quick add, remove with confirmation |
| Add asset | Name, type, model, description, location, pictures, documents |
| Preview asset | Editable check before adding |
| Asset added | Success |
| Asset details | Read-only asset view |

**4 · Client: post and choose**

| Screen | Purpose |
|---|---|
| Client home | Request help, active and on-going jobs |
| Request assistance | Free-text on-site / asset request |
| Processing (internal) | Skill vs asset classification — not shown to users |
| Confirm · asset service | Review before posting an asset request |
| Posted · asset service | Success |
| Online job | Free-text online request with reach and languages |
| Confirm · online job | Review before posting |
| Confirm · skill job | Review before posting |
| Posted · online job | Success |
| Bids · online job | Bid list with country and currency |
| Posted · skill job | Success |
| Bids · skill job | "Job in progress" bid list |
| Bids · asset service | Bid list with asset details |
| No assistant found | Raise offer, switch to long duration, try later |
| Assistant reviews | All reviews of an assistant |
| Client reviews | All reviews of a client |

**5 · Assistant: find work and bid**

| Screen | Purpose |
|---|---|
| Assistant home | Summary, feeds, bids, on-going services |
| Home · on a skill job | Locked skill / online work explained |
| Home · under review | Verification banner, browse only |
| Skill job feed | Instant and still-active jobs with demand map |
| Skill job feed · empty | No matching jobs |
| Skill job feed · locked | Locked while on a job |
| Asset feed | Requests for declared, free assets |
| Asset feed · all assets busy | Every asset is on a job |
| Asset feed · empty | No matching requests |
| Online job feed | Remote jobs |
| Online job feed · empty | No online jobs |
| Job detail · online | Remote job details |
| Job detail | On-site job with route |
| Job detail · not verified | Bidding disabled until verified |
| Job detail · asset service | Asset required and locations |
| Place your bid | Bid amount and confirmation |
| Accept client's wage | Locked amount with commission |
| Edit bid | Update or withdraw |

**6 · Hiring, payment and progress (client)**

| Screen | Purpose |
|---|---|
| Contact page · client | Hired assistant, 3-minute countdown, Continue |
| Contact page · online job | Remote version |
| Pay · online job | bKash / Nagad with international payout |
| Payment secured · online job | Escrow confirmation pop-up |
| Job Progress · online job (client) | Remote installments |
| Pay online | Amount to be paid, bKash / Nagad |
| Online or cash | Choose payment option |
| Payment secured | Escrow confirmation pop-up |
| Start job | 4-digit code and live location |
| Job Progress · online pay (client) | 20 / 60 / 20 installments |
| Job Progress · cash (client) | 4-digit code from assistant to complete |

**7 · Assistant: after acceptance**

| Screen | Purpose |
|---|---|
| Assistant contact page | Offer accepted, enter client's code, start job |
| Job Progress · online pay (assistant) | Installment status |
| Assistant contact · online job | Start remote work |
| Job Progress · online job (assistant) | Remote installments, submit work |
| Job Progress · cash (assistant) | 4-digit code after receiving cash |
| No payment method | Warning before a cash job |

**8 · Cancellation and completion**

| Screen | Purpose |
|---|---|
| Job cancellation reason | Reason, optional image, submit |
| Cancel instant job | Quick reason prompt while bidding |
| Job complete · client | Completion, rating and review |
| Work submitted · assistant | Completion, earnings, rate client |
| Detailed rating | What stood out + comment |

**9 · Messages and notifications**

| Screen | Purpose |
|---|---|
| Chat | Text chat with call button |
| Notifications | Alerts grouped by day |

**10 · Account and settings**

| Screen | Purpose |
|---|---|
| Profile | Mode, settings, commission card |
| Switch mode | Client / Assistant |
| Edit profile | Photo, name, phone, email |
| My bidded jobs | Active / past / all bids |
| My bidded jobs · one accepted | Other bids removed automatically |
| My bidded jobs · empty | No bids yet |
| Posted jobs | Client's requests by stage |
| Work history · assistant | Earned and jobs done |
| Work history · client | Disbursed and completed jobs |
| Payment methods | bKash / Nagad, active, remove |
| Add payment method | Choose provider, go to portal |
| Method added | Success |
| Complaints & reports | Report a problem, track reports |
| Help & support | FAQ |
| Terms & privacy | Terms |
| Language | Interface language |
