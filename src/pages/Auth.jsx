import { useState } from "react";

const C = {
  bg: "#0F0E17",
  panel: "#13111F",
  card: "#1A1828",
  border: "#ffffff0d",
  purple: "#6C5CE7",
  purpleLight: "#A29BFE",
  text: "#E8E6F0",
  muted: "#6B6784",
  success: "#55EFC4",
  error: "#FF7675",
};

// ── GOOGLE ICON ───────────────────────────────────────────────────────────────
function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}

// ── SHARED INPUT ──────────────────────────────────────────────────────────────
function FormInput({ label, type, value, onChange, placeholder, error, hint, showToggle, onToggle }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 6 }}>{label}</label>
      <div style={{ position: "relative" }}>
        <input
          type={type || "text"}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          style={{
            width: "100%", boxSizing: "border-box",
            background: C.card,
            border: `1px solid ${error ? C.error : focused ? C.purple : C.border}`,
            borderRadius: 10, padding: showToggle ? "11px 42px 11px 14px" : "11px 14px",
            color: C.text, fontFamily: "inherit", fontSize: 14, outline: "none",
            boxShadow: focused ? `0 0 0 3px ${C.purple}18` : "none",
            transition: "all 0.15s",
          }}
        />
        {showToggle && (
          <button onClick={onToggle} type="button" style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: C.muted, cursor: "pointer", fontSize: 13 }}>
            {type === "password" ? "👁" : "🙈"}
          </button>
        )}
      </div>
      {error && <p style={{ margin: "5px 0 0", fontSize: 12, color: C.error }}>{error}</p>}
      {hint && !error && <p style={{ margin: "5px 0 0", fontSize: 12, color: C.muted }}>{hint}</p>}
    </div>
  );
}

// ── PASSWORD STRENGTH ─────────────────────────────────────────────────────────
function PasswordStrength({ password }) {
  const checks = [
    { label: "8+ characters", ok: password.length >= 8 },
    { label: "Uppercase", ok: /[A-Z]/.test(password) },
    { label: "Number", ok: /[0-9]/.test(password) },
    { label: "Special char", ok: /[^A-Za-z0-9]/.test(password) },
  ];
  const score = checks.filter(c => c.ok).length;
  const barColors = ["#FF7675", "#FF7675", "#FDCB6E", "#55EFC4", "#55EFC4"];
  if (!password) return null;
  return (
    <div style={{ marginTop: -8, marginBottom: 16 }}>
      <div style={{ display: "flex", gap: 4, marginBottom: 8 }}>
        {[0, 1, 2, 3].map(i => (
          <div key={i} style={{ flex: 1, height: 3, borderRadius: 4, background: i < score ? barColors[score] : C.border, transition: "background 0.3s" }} />
        ))}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "5px 12px" }}>
        {checks.map(c => (
          <span key={c.label} style={{ fontSize: 11, color: c.ok ? C.success : C.muted }}>
            {c.ok ? "✓" : "○"} {c.label}
          </span>
        ))}
      </div>
    </div>
  );
}

// ── LEFT PANEL ────────────────────────────────────────────────────────────────
function LeftPanel() {
  return (
    <div style={{
      width: "45%", minWidth: 360,
      background: "linear-gradient(145deg,#1A1640,#13111F,#0F0E17)",
      borderRight: "1px solid #ffffff08",
      padding: "48px 52px",
      display: "flex", flexDirection: "column", justifyContent: "space-between",
      position: "relative", overflow: "hidden",
    }}>
      <div style={{ position: "absolute", top: -100, left: -100, width: 400, height: 400, borderRadius: "50%", background: "#6C5CE7", opacity: 0.06, filter: "blur(80px)", pointerEvents: "none" }} />

      <div>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 64 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg,#6C5CE7,#A29BFE)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>⚡</div>
          <span style={{ fontWeight: 800, fontSize: 18, color: C.text, letterSpacing: "-0.4px" }}>CreatorFlow</span>
        </div>

        {/* Headline */}
        <h2 style={{ fontSize: 34, fontWeight: 800, color: C.text, margin: "0 0 16px", lineHeight: 1.15, letterSpacing: "-0.8px" }}>
          Run your creative<br />
          <span style={{ background: "linear-gradient(90deg,#6C5CE7,#A29BFE)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            business smarter.
          </span>
        </h2>
        <p style={{ fontSize: 15, color: C.muted, lineHeight: 1.6, margin: "0 0 40px", maxWidth: 320 }}>
          The all-in-one platform for videographers, photographers, agencies and creators.
        </p>

        {/* Testimonial */}
        <div style={{ background: "#ffffff06", border: "1px solid #ffffff0d", borderRadius: 14, padding: "18px 20px" }}>
          <p style={{ fontSize: 14, color: "#C4C0D8", lineHeight: 1.6, margin: "0 0 14px", fontStyle: "italic" }}>
            "CreatorFlow replaced five tools I was using. My revenue went up 40% in three months."
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg,#6C5CE7,#A29BFE)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#fff" }}>SC</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>Sophia Chen</div>
              <div style={{ fontSize: 11, color: C.muted }}>Wedding Videographer, LA</div>
            </div>
            <div style={{ marginLeft: "auto", color: "#FDCB6E", fontSize: 13 }}>★★★★★</div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div>
        <div style={{ display: "flex", gap: 32 }}>
          {[["12,400+", "Creatives worldwide"], ["$2.4M+", "Revenue managed"], ["4.9★", "Avg rating"]].map(([v, l]) => (
            <div key={l}>
              <div style={{ fontSize: 20, fontWeight: 800, color: C.text, letterSpacing: "-0.5px" }}>{v}</div>
              <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── DIVIDER ───────────────────────────────────────────────────────────────────
function Divider() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "18px 0" }}>
      <div style={{ flex: 1, height: 1, background: C.border }} />
      <span style={{ fontSize: 12, color: C.muted }}>or continue with email</span>
      <div style={{ flex: 1, height: 1, background: C.border }} />
    </div>
  );
}

// ── LOGIN SCREEN ──────────────────────────────────────────────────────────────
function LoginScreen({ onSwitchToSignup, onSwitchToForgot, onSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(false);

  const validate = () => {
    const e = {};
    if (!email.includes("@")) e.email = "Enter a valid email address";
    if (password.length < 6) e.password = "Password must be at least 6 characters";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setLoading(true);
    setTimeout(() => { setLoading(false); setDone(true); }, 1800);
  };

  if (done) return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, textAlign: "center" }}>
      <div style={{ width: 60, height: 60, borderRadius: "50%", background: "#55EFC420", border: "2px solid #55EFC4", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26 }}>✓</div>
      <div style={{ fontWeight: 800, fontSize: 20, color: C.text }}>Welcome back!</div>
      <div style={{ fontSize: 14, color: C.muted }}>Redirecting to your dashboard…</div>
      <button onClick={onSuccess} style={{ marginTop: 8, padding: "11px 24px", background: "linear-gradient(135deg,#6C5CE7,#8B7FF0)", border: "none", borderRadius: 10, color: "#fff", fontFamily: "inherit", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
        Go to dashboard →
      </button>
    </div>
  );

  return (
    <div style={{ width: "100%", maxWidth: 400 }}>
      <h1 style={{ fontSize: 26, fontWeight: 800, color: C.text, margin: "0 0 6px", letterSpacing: "-0.5px" }}>Welcome back</h1>
      <p style={{ fontSize: 14, color: C.muted, margin: "0 0 24px" }}>Sign in to your CreatorFlow account</p>

      <button onClick={() => alert("Google OAuth — coming soon!")} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, padding: "11px", background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, color: C.text, fontFamily: "inherit", fontSize: 14, fontWeight: 500, cursor: "pointer", marginBottom: 4 }}>
        <GoogleIcon /> Continue with Google
      </button>

      <Divider />

      <FormInput label="Email address" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@studio.com" error={errors.email} />
      <FormInput label="Password" type={showPw ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" error={errors.password} showToggle onToggle={() => setShowPw(!showPw)} />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
          <div onClick={() => setRemember(!remember)} style={{ width: 18, height: 18, borderRadius: 5, border: `1.5px solid ${remember ? C.purple : C.border}`, background: remember ? C.purple : "transparent", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.15s" }}>
            {remember && <span style={{ color: "#fff", fontSize: 10, fontWeight: 700 }}>✓</span>}
          </div>
          <span style={{ fontSize: 13, color: C.muted }}>Remember me</span>
        </label>
        <button onClick={onSwitchToForgot} style={{ background: "none", border: "none", color: C.purpleLight, fontSize: 13, cursor: "pointer", fontFamily: "inherit", fontWeight: 500 }}>
          Forgot password?
        </button>
      </div>

      <button onClick={handleSubmit} disabled={loading} style={{ width: "100%", padding: "13px", background: loading ? "#6C5CE780" : "linear-gradient(135deg,#6C5CE7,#8B7FF0)", border: "none", borderRadius: 10, color: "#fff", fontFamily: "inherit", fontSize: 14, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", boxShadow: loading ? "none" : "0 4px 24px #6C5CE750", transition: "all 0.2s" }}>
        {loading ? "Signing in…" : "Sign in to CreatorFlow"}
      </button>

      <p style={{ textAlign: "center", fontSize: 13, color: C.muted, marginTop: 22 }}>
        Don't have an account?{" "}
        <button onClick={onSwitchToSignup} style={{ background: "none", border: "none", color: C.purpleLight, cursor: "pointer", fontFamily: "inherit", fontSize: 13, fontWeight: 600 }}>Create one free</button>
      </p>
    </div>
  );
}

// ── SIGNUP SCREEN ─────────────────────────────────────────────────────────────
function SignupScreen({ onSwitchToLogin, onSuccess }) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [role, setRole] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const roles = ["Wedding Videographer", "Filmmaker", "Photographer", "Social Media Manager", "Creative Agency", "Content Creator", "Designer", "Other"];

  const validateStep1 = () => {
    const e = {};
    if (!name.trim()) e.name = "Full name is required";
    if (!email.includes("@")) e.email = "Enter a valid email address";
    return e;
  };

  const validateStep2 = () => {
    const e = {};
    if (password.length < 8) e.password = "Password must be at least 8 characters";
    if (!role) e.role = "Please select your creative role";
    if (!agreed) e.agreed = "Please accept the terms to continue";
    return e;
  };

  const goNext = () => {
    const e = validateStep1();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setStep(2);
  };

  const handleSubmit = () => {
    const e = validateStep2();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setLoading(true);
    setTimeout(() => { setLoading(false); setDone(true); }, 2000);
  };

  if (done) return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14, textAlign: "center" }}>
      <div style={{ fontSize: 48 }}>🎉</div>
      <div style={{ fontWeight: 800, fontSize: 22, color: C.text }}>Account created!</div>
      <div style={{ fontSize: 14, color: C.muted, maxWidth: 280, lineHeight: 1.6 }}>
        Welcome to CreatorFlow, {name.split(" ")[0]}. Let's set up your workspace.
      </div>
      <button onClick={onSuccess} style={{ marginTop: 10, padding: "12px 28px", background: "linear-gradient(135deg,#6C5CE7,#A29BFE)", border: "none", borderRadius: 10, color: "#fff", fontFamily: "inherit", fontSize: 14, fontWeight: 700, cursor: "pointer", boxShadow: "0 4px 24px #6C5CE750" }}>
        Continue to setup →
      </button>
    </div>
  );

  return (
    <div style={{ width: "100%", maxWidth: 400 }}>
      {/* Step indicator */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 28 }}>
        {[1, 2].map(s => (
          <div key={s} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 26, height: 26, borderRadius: "50%", background: s <= step ? C.purple : C.card, border: `1.5px solid ${s <= step ? C.purple : C.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: s <= step ? "#fff" : C.muted, transition: "all 0.3s" }}>
              {s < step ? "✓" : s}
            </div>
            <span style={{ fontSize: 12, color: s === step ? C.text : C.muted, fontWeight: s === step ? 600 : 400 }}>
              {s === 1 ? "Your info" : "Setup"}
            </span>
            {s < 2 && <div style={{ width: 32, height: 1, background: step > s ? C.purple : C.border, transition: "background 0.3s" }} />}
          </div>
        ))}
      </div>

      <h1 style={{ fontSize: 24, fontWeight: 800, color: C.text, margin: "0 0 6px", letterSpacing: "-0.5px" }}>
        {step === 1 ? "Create your account" : "Almost there"}
      </h1>
      <p style={{ fontSize: 14, color: C.muted, margin: "0 0 22px" }}>
        {step === 1 ? "Start your 14-day free trial. No credit card needed." : "Set your password and tell us about your work."}
      </p>

      {step === 1 && (
        <>
          <button onClick={() => alert("Google OAuth — coming soon!")} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, padding: "11px", background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, color: C.text, fontFamily: "inherit", fontSize: 14, fontWeight: 500, cursor: "pointer", marginBottom: 4 }}>
            <GoogleIcon /> Sign up with Google
          </button>
          <Divider />
          <FormInput label="Full name" value={name} onChange={e => setName(e.target.value)} placeholder="Anna Mari" error={errors.name} />
          <FormInput label="Work email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@studio.com" error={errors.email} hint="We'll send a confirmation link here" />
          <button onClick={goNext} style={{ width: "100%", padding: "13px", background: "linear-gradient(135deg,#6C5CE7,#8B7FF0)", border: "none", borderRadius: 10, color: "#fff", fontFamily: "inherit", fontSize: 14, fontWeight: 700, cursor: "pointer", boxShadow: "0 4px 24px #6C5CE750" }}>
            Continue →
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <FormInput label="Password" type={showPw ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} placeholder="Min. 8 characters" error={errors.password} showToggle onToggle={() => setShowPw(!showPw)} />
          <PasswordStrength password={password} />

          <div style={{ marginBottom: 16 }}>
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 8 }}>What best describes you?</label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {roles.map(r => (
                <button key={r} onClick={() => setRole(r)} style={{ padding: "9px 12px", borderRadius: 9, border: `1.5px solid ${role === r ? C.purple : C.border}`, background: role === r ? "#6C5CE715" : C.card, color: role === r ? C.purpleLight : C.muted, fontFamily: "inherit", fontSize: 12, fontWeight: role === r ? 600 : 400, cursor: "pointer", textAlign: "left", transition: "all 0.15s" }}>
                  {role === r ? "✓ " : ""}{r}
                </button>
              ))}
            </div>
            {errors.role && <p style={{ margin: "6px 0 0", fontSize: 12, color: C.error }}>{errors.role}</p>}
          </div>

          <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer", marginBottom: 6 }}>
            <div onClick={() => setAgreed(!agreed)} style={{ width: 18, height: 18, minWidth: 18, borderRadius: 5, border: `1.5px solid ${agreed ? C.purple : C.border}`, background: agreed ? C.purple : "transparent", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", marginTop: 1, transition: "all 0.15s" }}>
              {agreed && <span style={{ color: "#fff", fontSize: 10, fontWeight: 700 }}>✓</span>}
            </div>
            <span style={{ fontSize: 12, color: C.muted, lineHeight: 1.5 }}>
              I agree to CreatorFlow's{" "}
              <span style={{ color: C.purpleLight }}>Terms of Service</span> and{" "}
              <span style={{ color: C.purpleLight }}>Privacy Policy</span>
            </span>
          </label>
          {errors.agreed && <p style={{ margin: "0 0 12px", fontSize: 12, color: C.error }}>{errors.agreed}</p>}

          <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
            <button onClick={() => setStep(1)} style={{ flex: 1, padding: "13px", background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, color: C.muted, fontFamily: "inherit", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>← Back</button>
            <button onClick={handleSubmit} disabled={loading} style={{ flex: 2, padding: "13px", background: loading ? "#6C5CE780" : "linear-gradient(135deg,#6C5CE7,#8B7FF0)", border: "none", borderRadius: 10, color: "#fff", fontFamily: "inherit", fontSize: 14, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", boxShadow: loading ? "none" : "0 4px 24px #6C5CE750" }}>
              {loading ? "Creating account…" : "Create account"}
            </button>
          </div>
        </>
      )}

      <p style={{ textAlign: "center", fontSize: 13, color: C.muted, marginTop: 22 }}>
        Already have an account?{" "}
        <button onClick={onSwitchToLogin} style={{ background: "none", border: "none", color: C.purpleLight, cursor: "pointer", fontFamily: "inherit", fontSize: 13, fontWeight: 600 }}>Sign in</button>
      </p>
    </div>
  );
}

// ── FORGOT PASSWORD SCREEN ────────────────────────────────────────────────────
function ForgotScreen({ onSwitchToLogin }) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!email.includes("@")) { setError("Enter a valid email address"); return; }
    setError("");
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1600);
  };

  if (sent) return (
    <div style={{ width: "100%", maxWidth: 400, textAlign: "center" }}>
      <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#6C5CE720", border: "2px solid #6C5CE7", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, margin: "0 auto 20px" }}>📬</div>
      <h1 style={{ fontSize: 22, fontWeight: 800, color: C.text, margin: "0 0 10px" }}>Check your inbox</h1>
      <p style={{ fontSize: 14, color: C.muted, margin: "0 0 28px", lineHeight: 1.6 }}>
        We sent a reset link to <strong style={{ color: C.text }}>{email}</strong>. Check your spam folder if you don't see it.
      </p>
      <button onClick={() => { setSent(false); setEmail(""); }} style={{ fontSize: 13, color: C.purpleLight, background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", display: "block", margin: "0 auto 10px" }}>
        Send to a different email
      </button>
      <button onClick={onSwitchToLogin} style={{ fontSize: 13, color: C.muted, background: "none", border: "none", cursor: "pointer", fontFamily: "inherit" }}>
        ← Back to sign in
      </button>
    </div>
  );

  return (
    <div style={{ width: "100%", maxWidth: 400 }}>
      <button onClick={onSwitchToLogin} style={{ background: "none", border: "none", color: C.muted, fontSize: 13, cursor: "pointer", fontFamily: "inherit", marginBottom: 24, padding: 0 }}>
        ← Back to sign in
      </button>
      <h1 style={{ fontSize: 24, fontWeight: 800, color: C.text, margin: "0 0 8px", letterSpacing: "-0.5px" }}>Reset your password</h1>
      <p style={{ fontSize: 14, color: C.muted, margin: "0 0 24px", lineHeight: 1.6 }}>Enter the email linked to your account and we'll send a reset link.</p>
      <FormInput label="Email address" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@studio.com" error={error} />
      <button onClick={handleSubmit} disabled={loading} style={{ width: "100%", padding: "13px", background: loading ? "#6C5CE780" : "linear-gradient(135deg,#6C5CE7,#8B7FF0)", border: "none", borderRadius: 10, color: "#fff", fontFamily: "inherit", fontSize: 14, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", boxShadow: loading ? "none" : "0 4px 24px #6C5CE750" }}>
        {loading ? "Sending…" : "Send reset link"}
      </button>
    </div>
  );
}

// ── ROOT EXPORT ───────────────────────────────────────────────────────────────
export default function Auth({ onSuccess }) {
  const [screen, setScreen] = useState("login");

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: C.bg, fontFamily: "'Inter', -apple-system, sans-serif" }}>
      <LeftPanel />
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 32px" }}>
        {screen === "login" && (
          <LoginScreen
            onSwitchToSignup={() => setScreen("signup")}
            onSwitchToForgot={() => setScreen("forgot")}
            onSuccess={onSuccess}
          />
        )}
        {screen === "signup" && (
          <SignupScreen
            onSwitchToLogin={() => setScreen("login")}
            onSuccess={onSuccess}
          />
        )}
        {screen === "forgot" && (
          <ForgotScreen
            onSwitchToLogin={() => setScreen("login")}
          />
        )}
      </div>
    </div>
  );
}