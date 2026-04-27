// Re'Loren v2 — showcase app. All spec screens laid out on a design canvas.
// Each artboard = one Android phone with one screen. Screens are interactive
// in isolation; use the "Open" icon on the artboard to focus fullscreen.

const { useState, useEffect, useRef, useMemo } = React;

// ── Phone wrapper — standard 360x720 artboard ────────────────
// NOTE: AndroidDevice wraps children in a non-flex `<div flex:1 overflow:auto>`,
// so we must use `height: '100%'` here (not `flex: 1`) for the outer column
// to actually fill the device frame. The inner zIndex:1 div has `overflow:auto`
// so screens taller than 720 scroll inside the frame even if they don't have
// their own scrollable inner area. Screens that DO have a flex:1+overflow:auto
// inner block scroll internally first (their AppBar stays pinned).
const Phone = ({ children, title, keyboard }) => (
  <AndroidDevice width={360} height={720} dark>
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: T.color.navyBg, position: 'relative', overflow: 'hidden', minHeight: 0 }}>
      {/* Luxury light flares */}
      <div style={{ position: 'absolute', top: '-10%', left: '-20%', width: '140%', height: '50%', background: 'radial-gradient(ellipse at top, rgba(212, 175, 55, 0.08) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'absolute', bottom: '-20%', right: '-20%', width: '120%', height: '60%', background: 'radial-gradient(circle at bottom right, rgba(15, 167, 163, 0.05) 0%, transparent 60%)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, overflow: 'auto' }}>
        {children}
      </div>
    </div>
  </AndroidDevice>
);

// Phones that SHOW bottom nav (home-tab screens)
// NavBar must stay pinned at the bottom regardless of content height, so we
// build it ourselves (parallel to Phone) instead of nesting Phone — that lets
// us put the scrollable wrapper and the nav as SIBLINGS, not nest the nav
// inside an overflow:auto container (which would scroll it away).
const PhoneWithNav = ({ children, active = 'home', mode = 'employer' }) => (
  <AndroidDevice width={360} height={720} dark>
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: T.color.navyBg, position: 'relative', overflow: 'hidden', minHeight: 0 }}>
      <div style={{ position: 'absolute', top: '-10%', left: '-20%', width: '140%', height: '50%', background: 'radial-gradient(ellipse at top, rgba(212, 175, 55, 0.08) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'absolute', bottom: '-20%', right: '-20%', width: '120%', height: '60%', background: 'radial-gradient(circle at bottom right, rgba(15, 167, 163, 0.05) 0%, transparent 60%)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, overflow: 'auto' }}>
        {children}
      </div>
      <div style={{ position: 'relative', zIndex: 1, flexShrink: 0 }}>
        <BottomNavBar active={active} mode={mode} onNav={() => {}} />
      </div>
    </div>
  </AndroidDevice>
);

const noop = () => {};

// ── Screen artboards ─────────────────────────────────────────

function App() {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <DesignCanvas>
        {/* ─── 1. PRE-AUTH ─── */}
        <DCSection id="preauth" title="1 · Pre-auth & onboarding" subtitle="Splash → slider landing → mobile+password login">
          <DCArtboard id="splash" label="Splash" width={360} height={720}>
            <SplashScreen onDone={noop} />
          </DCArtboard>
          <DCArtboard id="landing" label="Landing · slider + CTAs" width={360} height={720}>
            <Phone><LandingScreen onSignUp={noop} onLogin={noop} /></Phone>
          </DCArtboard>
          <DCArtboard id="phone-login" label="Sign in · phone + password" width={360} height={720}>
            <Phone><PhoneOtpEntryScreen onSendOtp={noop} onCreate={noop} onForgot={noop} /></Phone>
          </DCArtboard>
          <DCArtboard id="register" label="Register · with phone OTP verify" width={360} height={720}>
            <Phone><RegisterFormScreen onBack={noop} onNext={noop} /></Phone>
          </DCArtboard>
          <DCArtboard id="reg-complete" label="Registration complete · review" width={360} height={720}>
            <Phone><RegistrationCompleteScreen onContinue={noop} /></Phone>
          </DCArtboard>
          <DCArtboard id="mode-select" label="Mode select onboarding" width={360} height={720}>
            <Phone><ModeSelectOnboardingScreen onContinue={noop} /></Phone>
          </DCArtboard>
          <DCArtboard id="forgot" label="Forgot password · phone-only" width={360} height={720}>
            <Phone><ForgotPasswordEntryScreen onBack={noop} onSend={noop} /></Phone>
          </DCArtboard>
          <DCArtboard id="reset" label="Password reset" width={360} height={720}>
            <Phone><PasswordResetScreen onDone={noop} /></Phone>
          </DCArtboard>
        </DCSection>

        {/* ─── 2. WORKER VERIFICATION ─── */}
        <DCSection id="verify" title="2 · Worker verification" subtitle="Onboarding intro → NID → facial">
          <DCArtboard id="worker-intro" label="Worker Onboarding Intro" width={360} height={720}>
            <Phone><WorkerOnboardingIntroScreen onNext={noop} onSkip={noop} /></Phone>
          </DCArtboard>
          <DCArtboard id="nid" label="NID upload (skippable)" width={360} height={720}>
            <Phone><NidUploadScreen onBack={noop} onNext={noop} onSkip={noop} /></Phone>
          </DCArtboard>
          <DCArtboard id="face" label="Facial capture · 3 poses" width={360} height={720}>
            <Phone><FacialCaptureScreen onBack={noop} onNext={noop} /></Phone>
          </DCArtboard>
        </DCSection>

        {/* ─── 3. WORKER SKILLS & ASSETS ─── */}
        <DCSection id="skills" title="3 · Skill & asset declaration" subtitle="Free-text + searchable list, asset detail flow">
          <DCArtboard id="skill-decl" label="Skill declaration · free text + list" width={360} height={720}>
            <Phone><SkillDeclarationScreen onBack={noop} onSave={noop} onDeclareAssets={noop} /></Phone>
          </DCArtboard>
          <DCArtboard id="asset-list" label="Asset list" width={360} height={720}>
            <Phone><AssetDeclarationScreen onBack={noop} onSave={noop} onAddAsset={noop} onViewDetails={noop} /></Phone>
          </DCArtboard>
          <DCArtboard id="asset-form" label="Asset form · name/type/desc/pics" width={360} height={720}>
            <Phone><AssetDetailFormScreen onBack={noop} onPreview={noop} /></Phone>
          </DCArtboard>
          <DCArtboard id="asset-preview" label="Asset preview · editable" width={360} height={720}>
            <Phone><AssetPreviewScreen onBack={noop} onEdit={noop} onConfirm={noop} /></Phone>
          </DCArtboard>
          <DCArtboard id="asset-success" label="Asset added · success" width={360} height={720}>
            <Phone><AssetAddedSuccessScreen onContinue={noop} onAddAnother={noop} /></Phone>
          </DCArtboard>
          <DCArtboard id="asset-view" label="Asset details · view" width={360} height={720}>
            <Phone><AssetDetailsViewScreen onBack={noop} /></Phone>
          </DCArtboard>
          <DCArtboard id="lang" label="Language preference" width={360} height={720}>
            <Phone><LanguagePreferenceScreen onBack={noop} onSave={noop} /></Phone>
          </DCArtboard>
        </DCSection>

        {/* ─── 4. EMPLOYER · POST + MATCH ─── */}
        <DCSection id="post" title="4 · Employer · post & match" subtitle="ChatGPT-style post → review → searching → bids list">
          <DCArtboard id="emp-home" label="Employer home · location + active job" width={360} height={720}>
            <PhoneWithNav active="home" mode="employer">
              <EmployerHomeScreen onPost={noop} onNav={noop} onSwitchMode={noop} />
            </PhoneWithNav>
          </DCArtboard>
          <DCArtboard id="post-compose" label="Post · ChatGPT free text" width={360} height={720}>
            <Phone><JobPostFreeTextScreen onBack={noop} onReview={noop} /></Phone>
          </DCArtboard>
          <DCArtboard id="post-review" label="Post · confirm details" width={360} height={720}>
            <Phone><JobPostReviewScreen
              data={{ caption: 'Medicine delivery — Motijheel → Dhanmondi', desc: 'Need someone to pick up medicine from Motijheel pharmacy and deliver to Dhanmondi before 6 PM.', jobType: 'instant', relocate: 'yes', from: 'Motijheel, Dhaka', to: 'Dhanmondi, Dhaka', budget: '1500' }}
              onBack={noop} onPost={noop} /></Phone>
          </DCArtboard>
          <DCArtboard id="post-success" label="Post · success" width={360} height={720}>
            <Phone><JobPostSuccessScreen data={{ jobType: 'instant' }} onDone={noop} /></Phone>
          </DCArtboard>
          <DCArtboard id="job-in-progress" label="Job in progress · search + bids" width={360} height={720}>
            <Phone><RankedShortlistScreen onBack={noop} onAccept={noop} onViewReview={noop} /></Phone>
          </DCArtboard>
          <DCArtboard id="job-in-progress-asset" label="Job in progress · asset variant" width={360} height={720}>
            <Phone><RankedShortlistScreen onBack={noop} onAccept={noop} onViewReview={noop} requireAsset={true} onViewAsset={noop} /></Phone>
          </DCArtboard>
          <DCArtboard id="worker-reviews" label="Worker reviews list" width={360} height={720}>
            <Phone><WorkerReviewListScreen onBack={noop} /></Phone>
          </DCArtboard>
          <DCArtboard id="asset-details-view" label="Asset details (employer-side view)" width={360} height={720}>
            <Phone><AssetDetailsViewScreen onBack={noop} /></Phone>
          </DCArtboard>
        </DCSection>

        {/* ─── 5. WORKER · FEED + BID ─── */}
        <DCSection id="bids" title="5 · Worker · feed & bid" subtitle="NID-verified vs pending, job detail, bid submit/edit">
          <DCArtboard id="feed-verified" label="Job feed · NID verified" width={360} height={720}>
            <PhoneWithNav active="jobs" mode="worker">
              <JobFeedScreen onOpenJob={noop} onNav={noop} verified={true} />
            </PhoneWithNav>
          </DCArtboard>
          <DCArtboard id="feed-pending" label="Job feed · NID pending" width={360} height={720}>
            <PhoneWithNav active="jobs" mode="worker">
              <JobFeedScreen onOpenJob={noop} onNav={noop} verified={false} />
            </PhoneWithNav>
          </DCArtboard>
          <DCArtboard id="job-detail-verified" label="Job detail · verified" width={360} height={720}>
            <Phone><JobDetailScreen onBack={noop} onBid={noop} verified={true} /></Phone>
          </DCArtboard>
          <DCArtboard id="job-detail-pending" label="Job detail · disabled bid" width={360} height={720}>
            <Phone><JobDetailScreen onBack={noop} onBid={noop} verified={false} /></Phone>
          </DCArtboard>
          <DCArtboard id="bid-submit" label="Bid submit · commission" width={360} height={720}>
            <Phone><BidSubmitScreen onBack={noop} onSubmit={noop} /></Phone>
          </DCArtboard>
          <DCArtboard id="bid-edit" label="Bid edit · with job details" width={360} height={720}>
            <Phone><BidEditScreen onBack={noop} onUpdate={noop} onWithdraw={noop} /></Phone>
          </DCArtboard>
        </DCSection>

        {/* ─── 6. PAYMENT & ESCROW ─── */}
        <DCSection id="pay" title="6 · Payment & escrow" subtitle="Contact → payment (online/cash) → success popup → start code → progress">
          <DCArtboard id="contact-emp" label="Employer contact · 3-min timer" width={360} height={720}>
            <Phone><ContactPageEmployerScreen onBack={noop} onChat={noop} onCall={noop} onPay={noop} /></Phone>
          </DCArtboard>
          <DCArtboard id="payment-page" label="Payment · Online or Cash" width={360} height={720}>
            <Phone><PaymentPageScreen onBack={noop} onSelect={noop} /></Phone>
          </DCArtboard>
          <DCArtboard id="pay-success" label="Payment secured · popup" width={360} height={720}>
            <Phone><PaymentSuccessScreen onContinue={noop} onClose={noop} onDownload={noop} /></Phone>
          </DCArtboard>
          <DCArtboard id="job-start-code" label="Job start · 4-digit code" width={360} height={720}>
            <Phone><JobStartCodeScreen onBack={noop} onStart={noop} onChat={noop} onCall={noop} /></Phone>
          </DCArtboard>
          <DCArtboard id="installment" label="Job Progress · installments 20/60/20" width={360} height={720}>
            <Phone><InstallmentTrackerScreen onBack={noop} onDisburse={noop} onCancel={noop} onChat={noop} onCall={noop} /></Phone>
          </DCArtboard>
          <DCArtboard id="cash-log" label="Job Progress · cash · 4-digit complete" width={360} height={720}>
            <Phone><CashConfirmationScreen onBack={noop} onConfirm={noop} onCancel={noop} onChat={noop} onCall={noop} /></Phone>
          </DCArtboard>
        </DCSection>

        {/* ─── 7. WORKER PAY-SIDE & PROGRESS ─── */}
        <DCSection id="worker-pay" title="7 · Worker · post-accept & progress" subtitle="Worker contact → start → progress (online/cash) → warning">
          <DCArtboard id="worker-contact" label="Worker contact · offer accepted" width={360} height={720}>
            <Phone><WorkerContactPageScreen onBack={noop} onChat={noop} onCall={noop} onViewReview={noop} onStart={noop} /></Phone>
          </DCArtboard>
          <DCArtboard id="worker-progress-online" label="Worker progress · online installments" width={360} height={720}>
            <Phone><WorkerJobProgressOnlineScreen onBack={noop} onCancel={noop} onChat={noop} onCall={noop} /></Phone>
          </DCArtboard>
          <DCArtboard id="worker-progress-cash" label="Worker progress · cash 4-digit" width={360} height={720}>
            <Phone><WorkerJobProgressCashScreen onBack={noop} onSubmit={noop} onCancel={noop} onChat={noop} onCall={noop} /></Phone>
          </DCArtboard>
          <DCArtboard id="cash-no-method-warn" label="Cash job · no payment method warning" width={360} height={720}>
            <Phone><CashJobNoMethodWarningScreen onClose={noop} onAddMethod={noop} /></Phone>
          </DCArtboard>
        </DCSection>

        {/* ─── 8. CANCELLATION & COMPLETION ─── */}
        <DCSection id="progress" title="8 · Cancellation & completion" subtitle="Cancel reason form, completion w/ rating + skip">
          <DCArtboard id="cancel-reason" label="Job cancellation reason" width={360} height={720}>
            <Phone><CancelReasonSheet onClose={noop} onConfirm={noop} /></Phone>
          </DCArtboard>
          <DCArtboard id="completion" label="Completion · rating + skip" width={360} height={720}>
            <Phone><JobCompletionScreen onBack={noop} onRate={noop} onSkip={noop} /></Phone>
          </DCArtboard>
          <DCArtboard id="rate-employer" label="Rate · employer view" width={360} height={720}>
            <Phone><PostJobRatingScreen role="employer" onBack={noop} onSubmit={noop} /></Phone>
          </DCArtboard>
          <DCArtboard id="rate-worker" label="Rate · worker view" width={360} height={720}>
            <Phone><PostJobRatingScreen role="worker" onBack={noop} onSubmit={noop} /></Phone>
          </DCArtboard>
        </DCSection>

        {/* ─── 9. COMMS ─── */}
        <DCSection id="comms" title="9 · Messaging & notifications" subtitle="Chat (no camera/notice/location-preview) + notifications">
          <DCArtboard id="chat" label="Chat thread" width={360} height={720}>
            <Phone><ChatThreadScreen onBack={noop} onCall={noop} /></Phone>
          </DCArtboard>
          <DCArtboard id="notifs" label="Notifications" width={360} height={720}>
            <Phone><NotificationsScreen onBack={noop} onTap={noop} /></Phone>
          </DCArtboard>
        </DCSection>

        {/* ─── 10. ACCOUNT & HELP ─── */}
        <DCSection id="account" title="10 · Account, history, payment methods, help" subtitle="Profile (edit moved here), bidded jobs, history, methods, help">
          <DCArtboard id="profile-emp" label="Profile · employer · no verified" width={360} height={720}>
            <PhoneWithNav active="profile" mode="employer">
              <ProfileHubScreen mode="employer" onNav={noop} onSwitchMode={noop} />
            </PhoneWithNav>
          </DCArtboard>
          <DCArtboard id="profile-wrk" label="Profile · worker · bidded jobs + rating" width={360} height={720}>
            <PhoneWithNav active="profile" mode="worker">
              <ProfileHubScreen mode="worker" onNav={noop} onSwitchMode={noop} />
            </PhoneWithNav>
          </DCArtboard>
          <DCArtboard id="bid-history" label="Worker · bidded jobs (history)" width={360} height={720}>
            <Phone><WorkerBidHistoryScreen onBack={noop} onOpenBid={noop} /></Phone>
          </DCArtboard>
          <DCArtboard id="profile-edit" label="Profile edit · phone + name + email" width={360} height={720}>
            <Phone><ProfileEditScreen onBack={noop} onSave={noop} /></Phone>
          </DCArtboard>
          <DCArtboard id="history-worker" label="Work history · worker" width={360} height={720}>
            <Phone><WorkHistoryScreen onBack={noop} /></Phone>
          </DCArtboard>
          <DCArtboard id="history-employer" label="Work history · employer" width={360} height={720}>
            <Phone><EmployerWorkHistoryScreen onBack={noop} /></Phone>
          </DCArtboard>
          <DCArtboard id="payment-methods" label="Payment methods · bKash + Nagad" width={360} height={720}>
            <Phone><PaymentMethodsScreen onBack={noop} onAdd={noop} /></Phone>
          </DCArtboard>
          <DCArtboard id="add-method-pick" label="Add method · bKash or Nagad" width={360} height={720}>
            <Phone><AddPaymentMethodPickerScreen onBack={noop} onProceed={noop} /></Phone>
          </DCArtboard>
          <DCArtboard id="method-added" label="Payment method added · success" width={360} height={720}>
            <Phone><PaymentMethodAddedSuccessScreen onDone={noop} /></Phone>
          </DCArtboard>
          <DCArtboard id="help" label="Help & FAQ · no support chat" width={360} height={720}>
            <Phone><HelpScreen onBack={noop} /></Phone>
          </DCArtboard>
          <DCArtboard id="terms" label="Terms & Privacy" width={360} height={720}>
            <Phone><TermsScreen onBack={noop} /></Phone>
          </DCArtboard>
        </DCSection>

      </DesignCanvas>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
