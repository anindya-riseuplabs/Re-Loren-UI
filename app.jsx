// Re'Loren v2 — showcase app. All spec screens laid out on a design canvas.
// Each artboard = one Android phone with one screen. Screens are interactive
// in isolation; use the "Open" icon on the artboard to focus fullscreen.

const { useState, useEffect, useRef, useMemo } = React;

// ── Phone wrapper — standard 360x720 artboard ────────────────
const Phone = ({ children, title, keyboard }) => (
  <AndroidDevice width={360} height={720} dark>
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: T.color.navyBg, position: 'relative', overflow: 'hidden', minHeight: 0 }}>
      {/* Luxury light flares */}
      <div style={{ position: 'absolute', top: '-10%', left: '-20%', width: '140%', height: '50%', background: 'radial-gradient(ellipse at top, rgba(212, 175, 55, 0.08) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'absolute', bottom: '-20%', right: '-20%', width: '120%', height: '60%', background: 'radial-gradient(circle at bottom right, rgba(15, 167, 163, 0.05) 0%, transparent 60%)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        {children}
      </div>
    </div>
  </AndroidDevice>
);

// Phones that SHOW bottom nav (home-tab screens)
const PhoneWithNav = ({ children, active = 'home', mode = 'employer' }) => (
  <Phone>
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
      {children}
    </div>
    <BottomNavBar active={active} mode={mode} onNav={() => {}} />
  </Phone>
);

// Noop handlers — artboards are visual snapshots, links between them would be
// confusing in a gallery context. The focus-mode overlay is for deep-inspect.
const noop = () => {};

// Fake "logged-in" banner — shown above phones for context
const Ctx = ({ children, tone = 'default' }) => (
  <div style={{
    display: 'inline-flex', alignItems: 'center', gap: 6,
    padding: '4px 10px', borderRadius: 12,
    background: tone === 'gold' ? 'rgba(212,175,55,0.15)' :
                tone === 'red' ? 'rgba(239,83,80,0.15)' :
                tone === 'green' ? 'rgba(102,187,106,0.15)' : 'rgba(255,255,255,0.08)',
    color: tone === 'gold' ? T.color.gold500 :
           tone === 'red' ? T.color.error :
           tone === 'green' ? T.color.success : '#94a3b8',
    fontFamily: T.fontSans, fontSize: 11, fontWeight: 500, letterSpacing: 0.2,
    marginBottom: 8,
  }}>
    {children}
  </div>
);

// ── Screen artboards ─────────────────────────────────────────

function App() {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <DesignCanvas>
        {/* ─── 1. PRE-AUTH ─── */}
        <DCSection id="preauth" title="1 · Pre-auth & onboarding" subtitle="§3 §6 · first-run flow from splash → mode select">
          <DCArtboard id="splash" label="Splash" width={360} height={720}>
            <SplashScreen onDone={noop} />
          </DCArtboard>
          <DCArtboard id="landing" label="Landing · 3-slide" width={360} height={720}>
            <Phone><LandingScreen onSignUp={noop} onLogin={noop} /></Phone>
          </DCArtboard>
          <DCArtboard id="phone-otp" label="Phone + OTP entry" width={360} height={720}>
            <Phone><PhoneOtpEntryScreen onSendOtp={noop} onCreate={noop} onForgot={noop} /></Phone>
          </DCArtboard>
          <DCArtboard id="otp-verify" label="OTP verify (with error)" width={360} height={720}>
            <Phone><OtpVerifyScreen onBack={noop} onVerify={noop} /></Phone>
          </DCArtboard>
          <DCArtboard id="register" label="Register details" width={360} height={720}>
            <Phone><RegisterFormScreen onBack={noop} onNext={noop} /></Phone>
          </DCArtboard>
          <DCArtboard id="mode-select" label="Mode select onboarding" width={360} height={720}>
            <Phone><ModeSelectOnboardingScreen onContinue={noop} /></Phone>
          </DCArtboard>
          <DCArtboard id="forgot" label="Forgot password" width={360} height={720}>
            <Phone><ForgotPasswordEntryScreen onBack={noop} onSend={noop} onSwitchOtp={noop} /></Phone>
          </DCArtboard>
          <DCArtboard id="reset" label="Password reset" width={360} height={720}>
            <Phone><PasswordResetScreen onDone={noop} /></Phone>
          </DCArtboard>
        </DCSection>

        {/* ─── 2. WORKER VERIFICATION ─── */}
        <DCSection id="verify" title="2 · Worker verification" subtitle="§6 · onboarding intro → NID → facial → certs">
          <DCArtboard id="worker-intro" label="Worker Onboarding Intro" width={360} height={720}>
            <Phone><WorkerOnboardingIntroScreen onNext={noop} onSkip={noop} /></Phone>
          </DCArtboard>
          <DCArtboard id="profile-edit" label="Profile edit" width={360} height={720}>
            <Phone><ProfileEditScreen onBack={noop} onSave={noop} /></Phone>
          </DCArtboard>
          <DCArtboard id="nid" label="NID upload (skippable)" width={360} height={720}>
            <Phone><NidUploadScreen onBack={noop} onNext={noop} onSkip={noop} /></Phone>
          </DCArtboard>
          <DCArtboard id="face" label="Facial capture · 3 poses" width={360} height={720}>
            <Phone><FacialCaptureScreen onBack={noop} onNext={noop} /></Phone>
          </DCArtboard>
        </DCSection>

        {/* ─── 3. WORKER SKILLS & ASSETS ─── */}
        <DCSection id="skills" title="3 · Skill & asset declaration" subtitle="§6 · free-text + catalog, inherited vs self-declared">
          <DCArtboard id="skill-decl" label="Skill declaration" width={360} height={720}>
            <Phone><SkillDeclarationScreen onBack={noop} onSave={noop} /></Phone>
          </DCArtboard>
          <DCArtboard id="asset-decl" label="Asset declaration" width={360} height={720}>
            <Phone><AssetDeclarationScreen onBack={noop} onSave={noop} /></Phone>
          </DCArtboard>
          <DCArtboard id="lang" label="Language preference" width={360} height={720}>
            <Phone><LanguagePreferenceScreen onBack={noop} onSave={noop} /></Phone>
          </DCArtboard>
        </DCSection>

        {/* ─── 4. EMPLOYER · POST + MATCH ─── */}
        <DCSection id="post" title="4 · Employer · post & match" subtitle="§7 · consolidated single-screen post → review → shortlist">
          <DCArtboard id="emp-home" label="Employer home" width={360} height={720}>
            <PhoneWithNav active="home" mode="employer">
              <EmployerHomeScreen onPost={noop} onNav={noop} onSwitchMode={noop} />
            </PhoneWithNav>
          </DCArtboard>
          <DCArtboard id="post-compose" label="Post · 5 blocks" width={360} height={720}>
            <Phone><JobPostFreeTextScreen onBack={noop} onReview={noop} /></Phone>
          </DCArtboard>
          <DCArtboard id="post-review" label="Post · review" width={360} height={720}>
            <Phone><JobPostReviewScreen onBack={noop} onPost={noop} /></Phone>
          </DCArtboard>
          <DCArtboard id="post-success" label="Post · success" width={360} height={720}>
            <Phone><JobPostSuccessScreen onDone={noop} /></Phone>
          </DCArtboard>
          <DCArtboard id="shortlist" label="Ranked shortlist" width={360} height={720}>
            <Phone><RankedShortlistScreen onBack={noop} onAccept={noop} onExplain={noop} /></Phone>
          </DCArtboard>
          <DCArtboard id="match-explain" label="Match explanation sheet" width={360} height={720}>
            <Phone>
              <div style={{ flex: 1, background: T.color.navyBg, position: 'relative' }}>
                <AppBarElevated title="Shortlist" />
                <div style={{ padding: 16, opacity: 0.4 }}>
                  <div style={{ height: 120, background: T.color.navyRaised, borderRadius: 12 }} />
                </div>
                <MatchExplanationDetailSheet onClose={noop} />
              </div>
            </Phone>
          </DCArtboard>
        </DCSection>

        {/* ─── 5. WORKER · FEED + BID ─── */}
        <DCSection id="bids" title="5 · Worker · feed & bid" subtitle="§7 · Instant/Regular feed, bid submit with commission math">
          <DCArtboard id="feed" label="Job feed · Instant" width={360} height={720}>
            <PhoneWithNav active="jobs" mode="worker">
              <JobFeedScreen onOpenJob={noop} />
            </PhoneWithNav>
          </DCArtboard>
          <DCArtboard id="job-detail" label="Job detail" width={360} height={720}>
            <Phone><JobDetailScreen onBack={noop} onBid={noop} /></Phone>
          </DCArtboard>
          <DCArtboard id="bid-submit" label="Bid submit · commission" width={360} height={720}>
            <Phone><BidSubmitScreen onBack={noop} onSubmit={noop} /></Phone>
          </DCArtboard>
          <DCArtboard id="bid-edit" label="Bid edit / withdraw" width={360} height={720}>
            <Phone><BidEditScreen onBack={noop} onUpdate={noop} onWithdraw={noop} /></Phone>
          </DCArtboard>
        </DCSection>

        {/* ─── 6. PAYMENT & ESCROW ─── */}
        <DCSection id="pay" title="6 · Payment & escrow" subtitle="§8 · contact → payment method → gateway → success → installment / cash">
          <DCArtboard id="contact-emp" label="Contact page · employer" width={360} height={720}>
            <Phone><ContactPageEmployerScreen onBack={noop} onChat={noop} onCall={noop} onPay={noop} /></Phone>
          </DCArtboard>
          <DCArtboard id="payment-page" label="Payment page · 3 options" width={360} height={720}>
            <Phone><PaymentPageScreen onBack={noop} onSelect={noop} /></Phone>
          </DCArtboard>
          <DCArtboard id="gateway-pick" label="Gateway picker" width={360} height={720}>
            <Phone>
              <div style={{ flex: 1, background: T.color.navyBg, position: 'relative' }}>
                <AppBarElevated title="Payment" />
                <div style={{ padding: 16, opacity: 0.4 }}>
                  <div style={{ height: 80, background: T.color.navyRaised, borderRadius: 12 }} />
                </div>
                <GatewayPickerSheet onClose={noop} onPick={noop} />
              </div>
            </Phone>
          </DCArtboard>
          <DCArtboard id="gateway-redirect" label="bKash redirect" width={360} height={720}>
            <Phone><GatewayRedirectScreen onBack={noop} onSuccess={noop} /></Phone>
          </DCArtboard>
          <DCArtboard id="pay-success" label="Payment secured" width={360} height={720}>
            <Phone><PaymentSuccessScreen onContinue={noop} /></Phone>
          </DCArtboard>
          <DCArtboard id="installment" label="Installment tracker" width={360} height={720}>
            <Phone><InstallmentTrackerScreen onBack={noop} onPayNext={noop} /></Phone>
          </DCArtboard>
          <DCArtboard id="cash-log" label="Cash-on-delivery log" width={360} height={720}>
            <Phone><CashConfirmationScreen onBack={noop} onConfirm={noop} /></Phone>
          </DCArtboard>
        </DCSection>

        {/* ─── 7. PROGRESS & COMPLETION ─── */}
        <DCSection id="progress" title="7 · In-progress & completion" subtitle="§8 · employer tracking, worker status, cancel, rate">
          <DCArtboard id="prog-emp" label="Employer tracking" width={360} height={720}>
            <Phone><ProgressEmployerOnlineScreen onBack={noop} onCancel={noop} onComplete={noop} onChat={noop} /></Phone>
          </DCArtboard>
          <DCArtboard id="prog-worker" label="Worker status advance" width={360} height={720}>
            <Phone><ProgressWorkerScreen onBack={noop} onAdvance={noop} onChat={noop} /></Phone>
          </DCArtboard>
          <DCArtboard id="cancel-reason" label="Cancel reason sheet" width={360} height={720}>
            <Phone>
              <div style={{ flex: 1, background: T.color.navyBg, position: 'relative' }}>
                <AppBarElevated title="Job in progress" />
                <div style={{ padding: 16, opacity: 0.4 }}>
                  <div style={{ height: 120, background: T.color.navyRaised, borderRadius: 12 }} />
                </div>
                <CancelReasonSheet onClose={noop} onConfirm={noop} context="employer" />
              </div>
            </Phone>
          </DCArtboard>
          <DCArtboard id="completion" label="Completion receipt" width={360} height={720}>
            <Phone><JobCompletionScreen onBack={noop} onRate={noop} /></Phone>
          </DCArtboard>
          <DCArtboard id="rate-employer" label="Rate · employer view" width={360} height={720}>
            <Phone><PostJobRatingScreen role="employer" onBack={noop} onSubmit={noop} /></Phone>
          </DCArtboard>
          <DCArtboard id="rate-worker" label="Rate · worker view" width={360} height={720}>
            <Phone><PostJobRatingScreen role="worker" onBack={noop} onSubmit={noop} /></Phone>
          </DCArtboard>
        </DCSection>

        {/* ─── 8. COMMS & SAFETY ─── */}
        <DCSection id="comms" title="8 · Messaging, calls, safety" subtitle="§9 · in-app chat, image share, call permission, safety popup">
          <DCArtboard id="chat" label="Chat thread" width={360} height={720}>
            <Phone><ChatThreadScreen onBack={noop} onImage={noop} onCall={noop} /></Phone>
          </DCArtboard>
          <DCArtboard id="chat-image" label="Image viewer" width={360} height={720}>
            <Phone><ImageViewerScreen onBack={noop} /></Phone>
          </DCArtboard>
          <DCArtboard id="active-call" label="Active call" width={360} height={720}>
            <Phone><ActiveCallScreen onEnd={noop} /></Phone>
          </DCArtboard>
          <DCArtboard id="call-perm" label="Call permission dialog" width={360} height={720}>
            <Phone>
              <div style={{ flex: 1, background: T.color.navyBg, position: 'relative' }}>
                <AppBarElevated title="Rahim Uddin" />
                <div style={{ padding: 16, opacity: 0.4 }}>
                  <div style={{ height: 60, background: T.color.navyRaised, borderRadius: 12 }} />
                </div>
                <CallPermissionDialog onClose={noop} onAllow={noop} />
              </div>
            </Phone>
          </DCArtboard>
          <DCArtboard id="safety" label="Safety popup" width={360} height={720}>
            <Phone>
              <div style={{ flex: 1, background: T.color.navyBg, position: 'relative' }}>
                <AppBarElevated title="Your worker" />
                <div style={{ padding: 16, opacity: 0.4 }}>
                  <div style={{ height: 120, background: T.color.navyRaised, borderRadius: 12 }} />
                </div>
                <SafetyPopupSheet onClose={noop} onShareLocation={noop} />
              </div>
            </Phone>
          </DCArtboard>
          <DCArtboard id="notifs" label="Notifications" width={360} height={720}>
            <Phone><NotificationsScreen onBack={noop} onTap={noop} /></Phone>
          </DCArtboard>
        </DCSection>

        {/* ─── 9. ACCOUNT & HELP ─── */}
        <DCSection id="account" title="9 · Account, history, help" subtitle="profile hub, work history, payment methods, help, terms">
          <DCArtboard id="profile-emp" label="Profile · employer" width={360} height={720}>
            <PhoneWithNav active="profile" mode="employer">
              <ProfileHubScreen mode="employer" onNav={noop} onSwitchMode={noop} />
            </PhoneWithNav>
          </DCArtboard>
          <DCArtboard id="profile-wrk" label="Profile · worker" width={360} height={720}>
            <PhoneWithNav active="profile" mode="worker">
              <ProfileHubScreen mode="worker" onNav={noop} onSwitchMode={noop} />
            </PhoneWithNav>
          </DCArtboard>
          <DCArtboard id="history" label="Work history" width={360} height={720}>
            <Phone><WorkHistoryScreen onBack={noop} /></Phone>
          </DCArtboard>
          <DCArtboard id="payment-methods" label="Payment methods" width={360} height={720}>
            <Phone><PaymentMethodsScreen onBack={noop} /></Phone>
          </DCArtboard>
          <DCArtboard id="help" label="Help & FAQ" width={360} height={720}>
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
