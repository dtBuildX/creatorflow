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
  warning: "#FDCB6E",
};

// ── SHARED INPUT ──────────────────────────────────────────────────────────────
function Input({ label, value, onChange, placeholder, type = "text", hint }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ marginBottom: 14 }}>
      {label && <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 6 }}>{label}</label>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        style={{
          width: "100%", boxSizing: "border-box",
          background: C.card, border: `1px solid ${focused ? C.purple : C.border}`,
          borderRadius: 10, padding: "11px 14px", color: C.text,
          fontFamily: "inherit", fontSize: 14, outline: "none",
          boxShadow: focused ? `0 0 0 3px ${C.purple}18` : "none",
          transition: "all 0.15s",
        }}
      />
      {hint && <p style={{ margin: "5px 0 0", fontSize: 12, color: C.muted }}>{hint}</p>}
    </div>
  );
}

// ── PROGRESS BAR ─────────────────────────────────────────────────────────────
function ProgressBar({ step, total }) {
  const steps = ["Plan", "Business", "Branding", "Payments", "Done"];
  return (
    <div style={{ marginBottom: 40 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
        {steps.map((s, i) => (
          <div key={s} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <div style={{
              width: 30, height: 30, borderRadius: "50%",
              background: i + 1 < step ? C.purple : i + 1 === step ? "linear-gradient(135deg,#6C5CE7,#A29BFE)" : C.card,
              border: `1.5px solid ${i + 1 <= step ? C.purple : C.border}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 11, fontWeight: 700,
              color: i + 1 <= step ? "#fff" : C.muted,
              transition: "all 0.3s",
              boxShadow: i + 1 === step ? "0 0 12px #6C5CE750" : "none",
            }}>
              {i + 1 < step ? "✓" : i + 1}
            </div>
            <span style={{ fontSize: 11, color: i + 1 === step ? C.purpleLight : C.muted, fontWeight: i + 1 === step ? 600 : 400 }}>{s}</span>
          </div>
        ))}
      </div>
      {/* connecting line */}
      <div style={{ position: "relative", height: 3, background: C.card, borderRadius: 4, marginTop: -30, zIndex: -1, width: "85%", margin: "-30px auto 0" }}>
        <div style={{ height: "100%", width: `${((step - 1) / (total - 1)) * 100}%`, background: "linear-gradient(90deg,#6C5CE7,#A29BFE)", borderRadius: 4, transition: "width 0.4s ease" }} />
      </div>
    </div>
  );
}

// ── STEP 1: PLAN SELECTION ────────────────────────────────────────────────────
function StepPlan({ onNext }) {
  const [selected, setSelected] = useState("professional");

  const plans = [
    {
      id: "starter",
      name: "Starter",
      price: "$19",
      period: "/month",
      desc: "For solo freelancers just starting out",
      features: ["Up to 10 clients", "5 active projects", "Basic invoicing", "Email support"],
      color: "#74B9FF",
    },
    {
      id: "professional",
      name: "Professional",
      price: "$49",
      period: "/month",
      desc: "For growing creative businesses",
      features: ["Unlimited clients", "Unlimited projects", "Advanced analytics", "Priority support", "Team (up to 3)", "Client portal"],
      color: C.purple,
      popular: true,
    },
    {
      id: "agency",
      name: "Agency",
      price: "$99",
      period: "/month",
      desc: "For creative agencies and teams",
      features: ["Everything in Pro", "Unlimited team members", "Custom branding", "API access", "Dedicated manager", "SLA guarantee"],
      color: "#55EFC4",
    },
  ];

  return (
    <div>
      <div style={{ textAlign: "center", marginBottom: 36 }}>
        <h2 style={{ fontSize: 26, fontWeight: 800, color: C.text, margin: "0 0 8px", letterSpacing: "-0.5px" }}>Choose your plan</h2>
        <p style={{ fontSize: 14, color: C.muted, margin: 0 }}>Start free for 14 days. No credit card required.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, marginBottom: 28 }}>
        {plans.map(p => (
          <div key={p.id} onClick={() => setSelected(p.id)} style={{
            background: selected === p.id ? `${p.color}10` : C.card,
            border: `1.5px solid ${selected === p.id ? p.color : C.border}`,
            borderRadius: 14, padding: "20px 18px", cursor: "pointer",
            transition: "all 0.2s", position: "relative",
            boxShadow: selected === p.id ? `0 0 20px ${p.color}20` : "none",
          }}>
            {p.popular && (
              <div style={{ position: "absolute", top: -10, left: "50%", transform: "translateX(-50%)", background: C.purple, color: "#fff", fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 20, whiteSpace: "nowrap" }}>
                MOST POPULAR
              </div>
            )}
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: C.text }}>{p.name}</div>
              <div style={{ fontSize: 11, color: C.muted, marginTop: 3 }}>{p.desc}</div>
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 3, marginBottom: 16 }}>
              <span style={{ fontSize: 28, fontWeight: 800, color: p.color, letterSpacing: "-1px" }}>{p.price}</span>
              <span style={{ fontSize: 12, color: C.muted }}>{p.period}</span>
            </div>
            {p.features.map(f => (
              <div key={f} style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 7 }}>
                <span style={{ color: p.color, fontSize: 13 }}>✓</span>
                <span style={{ fontSize: 12, color: C.muted }}>{f}</span>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <span style={{ fontSize: 12, color: C.muted }}>🔒 SSL secured · Cancel anytime · 14-day free trial on all plans</span>
      </div>

      <button onClick={onNext} style={{ width: "100%", padding: "13px", background: "linear-gradient(135deg,#6C5CE7,#8B7FF0)", border: "none", borderRadius: 10, color: "#fff", fontFamily: "inherit", fontSize: 14, fontWeight: 700, cursor: "pointer", boxShadow: "0 4px 24px #6C5CE750" }}>
        Continue with {plans.find(p => p.id === selected)?.name} →
      </button>
    </div>
  );
}

// ── STEP 2: BUSINESS INFO ─────────────────────────────────────────────────────
function StepBusiness({ onNext, onBack }) {
  const [business, setBusiness] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [services, setServices] = useState([]);

  const allServices = [
    "Wedding Videography", "Wedding Photography", "Commercial Films",
    "Social Media Content", "Brand Films", "YouTube Production",
    "Event Coverage", "Real Estate Video", "Music Videos", "Drone Footage",
    "Photo Editing", "Video Editing",
  ];

  const toggleService = s => setServices(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h2 style={{ fontSize: 24, fontWeight: 800, color: C.text, margin: "0 0 6px", letterSpacing: "-0.5px" }}>Tell us about your business</h2>
        <p style={{ fontSize: 14, color: C.muted, margin: 0 }}>This helps personalise your CreatorFlow workspace.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}>
        <div style={{ paddingRight: 8 }}>
          <Input label="Business name" value={business} onChange={e => setBusiness(e.target.value)} placeholder="TMC Creatives" />
        </div>
        <div style={{ paddingLeft: 8 }}>
          <Input label="Location" value={location} onChange={e => setLocation(e.target.value)} placeholder="Lagos, Nigeria" />
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}>
        <div style={{ paddingRight: 8 }}>
          <Input label="Phone number" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+234 800 000 0000" type="tel" />
        </div>
        <div style={{ paddingLeft: 8 }}>
          <Input label="Website (optional)" value={website} onChange={e => setWebsite(e.target.value)} placeholder="www.tmccreatives.com" />
        </div>
      </div>

      <div style={{ marginBottom: 24 }}>
        <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 10 }}>
          What services do you offer? <span style={{ color: C.muted, fontWeight: 400 }}>Select all that apply</span>
        </label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {allServices.map(s => {
            const active = services.includes(s);
            return (
              <button key={s} onClick={() => toggleService(s)} style={{
                padding: "7px 13px", borderRadius: 20,
                border: `1.5px solid ${active ? C.purple : C.border}`,
                background: active ? "#6C5CE720" : C.card,
                color: active ? C.purpleLight : C.muted,
                fontFamily: "inherit", fontSize: 12, fontWeight: active ? 600 : 400,
                cursor: "pointer", transition: "all 0.15s",
              }}>
                {active ? "✓ " : ""}{s}
              </button>
            );
          })}
        </div>
        {services.length > 0 && <p style={{ margin: "8px 0 0", fontSize: 12, color: C.success }}>{services.length} service{services.length > 1 ? "s" : ""} selected</p>}
      </div>

      <div style={{ display: "flex", gap: 10 }}>
        <button onClick={onBack} style={{ flex: 1, padding: "12px", background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, color: C.muted, fontFamily: "inherit", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>← Back</button>
        <button onClick={onNext} style={{ flex: 2, padding: "12px", background: "linear-gradient(135deg,#6C5CE7,#8B7FF0)", border: "none", borderRadius: 10, color: "#fff", fontFamily: "inherit", fontSize: 14, fontWeight: 700, cursor: "pointer", boxShadow: "0 4px 24px #6C5CE750" }}>
          Save & continue →
        </button>
      </div>
    </div>
  );
}

// ── STEP 3: BRANDING ──────────────────────────────────────────────────────────
function StepBranding({ onNext, onBack }) {
  const [color, setColor] = useState("#6C5CE7");
  const [logoPreview, setLogoPreview] = useState(null);
  const [tagline, setTagline] = useState("");
  const [dragging, setDragging] = useState(false);

  const presetColors = ["#6C5CE7", "#E17055", "#00B894", "#0984E3", "#FDCB6E", "#E84393", "#2D3436", "#74B9FF"];

  const handleFile = (file) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = e => setLogoPreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h2 style={{ fontSize: 24, fontWeight: 800, color: C.text, margin: "0 0 6px", letterSpacing: "-0.5px" }}>Brand your workspace</h2>
        <p style={{ fontSize: 14, color: C.muted, margin: 0 }}>Your logo and colors will appear across your client portal and invoices.</p>
      </div>

      {/* Logo upload */}
      <div style={{ marginBottom: 20 }}>
        <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 8 }}>Business logo</label>
        <div
          onDragOver={e => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={e => { e.preventDefault(); setDragging(false); handleFile(e.dataTransfer.files[0]); }}
          style={{
            border: `2px dashed ${dragging ? C.purple : C.border}`,
            borderRadius: 12, padding: "28px 20px", textAlign: "center",
            background: dragging ? "#6C5CE710" : C.card, cursor: "pointer",
            transition: "all 0.2s",
          }}
          onClick={() => document.getElementById("logoInput").click()}
        >
          {logoPreview ? (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14 }}>
              <img src={logoPreview} alt="logo" style={{ width: 56, height: 56, borderRadius: 10, objectFit: "cover" }} />
              <div style={{ textAlign: "left" }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>Logo uploaded ✓</div>
                <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>Click to replace</div>
              </div>
            </div>
          ) : (
            <>
              <div style={{ fontSize: 28, marginBottom: 8 }}>🖼️</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 4 }}>Drop your logo here</div>
              <div style={{ fontSize: 12, color: C.muted }}>PNG, JPG or SVG · Max 2MB</div>
            </>
          )}
        </div>
        <input id="logoInput" type="file" accept="image/*" style={{ display: "none" }} onChange={e => handleFile(e.target.files[0])} />
      </div>

      {/* Brand color */}
      <div style={{ marginBottom: 20 }}>
        <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 10 }}>Brand color</label>
        <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
          {presetColors.map(c => (
            <div key={c} onClick={() => setColor(c)} style={{
              width: 34, height: 34, borderRadius: "50%", background: c, cursor: "pointer",
              border: `3px solid ${color === c ? "#fff" : "transparent"}`,
              boxShadow: color === c ? `0 0 0 2px ${c}` : "none",
              transition: "all 0.15s",
            }} />
          ))}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginLeft: 4 }}>
            <input type="color" value={color} onChange={e => setColor(e.target.value)} style={{ width: 34, height: 34, border: "none", borderRadius: "50%", cursor: "pointer", background: "none", padding: 0 }} />
            <span style={{ fontSize: 12, color: C.muted }}>Custom</span>
          </div>
        </div>

        {/* Preview */}
        <div style={{ marginTop: 16, background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: "16px 18px", display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>⚡</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.text }}>Workspace preview</div>
            <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>This color will appear on buttons, badges and accents</div>
          </div>
          <button style={{ marginLeft: "auto", padding: "7px 14px", background: color, border: "none", borderRadius: 8, color: "#fff", fontFamily: "inherit", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
            Sample button
          </button>
        </div>
      </div>

      <Input label="Business tagline (optional)" value={tagline} onChange={e => setTagline(e.target.value)} placeholder="e.g. Premium video production for memorable moments" hint="Shown on your client portal and invoices" />

      <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
        <button onClick={onBack} style={{ flex: 1, padding: "12px", background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, color: C.muted, fontFamily: "inherit", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>← Back</button>
        <button onClick={onNext} style={{ flex: 2, padding: "12px", background: "linear-gradient(135deg,#6C5CE7,#8B7FF0)", border: "none", borderRadius: 10, color: "#fff", fontFamily: "inherit", fontSize: 14, fontWeight: 700, cursor: "pointer", boxShadow: "0 4px 24px #6C5CE750" }}>
          Save & continue →
        </button>
      </div>
    </div>
  );
}

// ── STEP 4: PAYMENTS ──────────────────────────────────────────────────────────
function StepPayments({ onNext, onBack }) {
  const [selected, setSelected] = useState(null);

  const providers = [
    {
      id: "stripe",
      name: "Stripe",
      desc: "Best for USD/EUR clients. Supports cards, Apple Pay, Google Pay.",
      badge: "Global",
      badgeColor: "#74B9FF",
      logo: "💳",
      regions: "USA · Europe · Global",
    },
    {
      id: "paystack",
      name: "Paystack",
      desc: "Best for Nigerian and African clients. Instant NGN payouts.",
      badge: "Nigeria",
      badgeColor: C.success,
      logo: "🟢",
      regions: "Nigeria · Ghana · Kenya",
    },
    {
      id: "flutterwave",
      name: "Flutterwave",
      desc: "Accept payments across Africa and globally. Multi-currency.",
      badge: "Africa",
      badgeColor: C.warning,
      logo: "🦋",
      regions: "30+ African countries",
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h2 style={{ fontSize: 24, fontWeight: 800, color: C.text, margin: "0 0 6px", letterSpacing: "-0.5px" }}>Connect payments</h2>
        <p style={{ fontSize: 14, color: C.muted, margin: 0 }}>Choose how you want to receive payments from clients. You can add more later.</p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
        {providers.map(p => (
          <div key={p.id} onClick={() => setSelected(p.id)} style={{
            background: selected === p.id ? "#6C5CE710" : C.card,
            border: `1.5px solid ${selected === p.id ? C.purple : C.border}`,
            borderRadius: 12, padding: "16px 18px", cursor: "pointer",
            display: "flex", alignItems: "center", gap: 14,
            transition: "all 0.2s",
            boxShadow: selected === p.id ? "0 0 16px #6C5CE720" : "none",
          }}>
            <div style={{ width: 44, height: 44, borderRadius: 10, background: "#ffffff08", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>{p.logo}</div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                <span style={{ fontWeight: 700, fontSize: 14, color: C.text }}>{p.name}</span>
                <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 20, background: `${p.badgeColor}20`, color: p.badgeColor }}>{p.badge}</span>
              </div>
              <div style={{ fontSize: 12, color: C.muted, marginBottom: 3 }}>{p.desc}</div>
              <div style={{ fontSize: 11, color: "#ffffff30" }}>🌍 {p.regions}</div>
            </div>
            <div style={{ width: 20, height: 20, borderRadius: "50%", border: `2px solid ${selected === p.id ? C.purple : C.border}`, background: selected === p.id ? C.purple : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.2s" }}>
              {selected === p.id && <span style={{ color: "#fff", fontSize: 10 }}>✓</span>}
            </div>
          </div>
        ))}
      </div>

      {selected && (
        <div style={{ background: "#6C5CE710", border: "1px solid #6C5CE730", borderRadius: 10, padding: "12px 16px", marginBottom: 20, fontSize: 13, color: C.purpleLight }}>
          ⚡ You'll connect your {providers.find(p => p.id === selected)?.name} account after setup. We'll walk you through it step by step.
        </div>
      )}

      <button onClick={onNext} style={{ width: "100%", marginBottom: 10, padding: "13px", background: selected ? "linear-gradient(135deg,#6C5CE7,#8B7FF0)" : C.card, border: `1px solid ${selected ? "transparent" : C.border}`, borderRadius: 10, color: selected ? "#fff" : C.muted, fontFamily: "inherit", fontSize: 14, fontWeight: 700, cursor: "pointer", boxShadow: selected ? "0 4px 24px #6C5CE750" : "none", transition: "all 0.2s" }}>
        {selected ? `Continue with ${providers.find(p => p.id === selected)?.name} →` : "Select a payment provider"}
      </button>
      <button onClick={onNext} style={{ width: "100%", padding: "11px", background: "transparent", border: "none", color: C.muted, fontFamily: "inherit", fontSize: 13, cursor: "pointer" }}>
        Skip for now — I'll set this up later
      </button>
      <button onClick={onBack} style={{ width: "100%", padding: "8px", background: "transparent", border: "none", color: C.muted, fontFamily: "inherit", fontSize: 12, cursor: "pointer", marginTop: 4 }}>← Back</button>
    </div>
  );
}

// ── STEP 5: ALL SET ───────────────────────────────────────────────────────────
function StepDone() {
  const features = [
    { icon: "👥", label: "Add your first client" },
    { icon: "📅", label: "Set up a booking" },
    { icon: "📄", label: "Create an invoice" },
    { icon: "🗂", label: "Start a project" },
  ];

  return (
    <div style={{ textAlign: "center" }}>
      {/* Animated checkmark */}
      <div style={{ position: "relative", width: 80, height: 80, margin: "0 auto 24px" }}>
        <div style={{ width: 80, height: 80, borderRadius: "50%", background: "linear-gradient(135deg,#6C5CE7,#A29BFE)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, boxShadow: "0 0 40px #6C5CE760" }}>✓</div>
      </div>

      <h2 style={{ fontSize: 28, fontWeight: 800, color: C.text, margin: "0 0 10px", letterSpacing: "-0.6px" }}>You're all set! 🎉</h2>
      <p style={{ fontSize: 15, color: C.muted, margin: "0 0 36px", lineHeight: 1.6, maxWidth: 360, marginLeft: "auto", marginRight: "auto" }}>
        Your CreatorFlow workspace is ready. Here's what you can do first:
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 32, textAlign: "left" }}>
        {features.map((f, i) => (
          <div key={i} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: "14px 16px", display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 20 }}>{f.icon}</span>
            <span style={{ fontSize: 13, fontWeight: 500, color: C.text }}>{f.label}</span>
          </div>
        ))}
      </div>

      {/* Trial banner */}
      <div style={{ background: "linear-gradient(135deg,#1E1B3A,#251E45)", border: "1px solid #6C5CE730", borderRadius: 12, padding: "14px 20px", marginBottom: 24, display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ fontSize: 20 }}>⏱️</span>
        <div style={{ textAlign: "left" }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.text }}>14-day free trial active</div>
          <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>No charges until Jan 27, 2025 · Cancel anytime</div>
        </div>
      </div>

      <button onClick={onSuccess} style={{ width: "100%", padding: "14px", background: "linear-gradient(135deg,#6C5CE7,#8B7FF0)", border: "none", borderRadius: 10, color: "#fff", fontFamily: "inherit", fontSize: 15, fontWeight: 700, cursor: "pointer", boxShadow: "0 4px 28px #6C5CE760", letterSpacing: "0.2px" }}>
        Go to my dashboard →
      </button>
    </div>
  );
}

// ── ROOT ──────────────────────────────────────────────────────────────────────
export default function Onboarding({ onSuccess }) {
  const [step, setStep] = useState(1);
  const total = 5;

  const next = () => setStep(s => Math.min(s + 1, total));
  const back = () => setStep(s => Math.max(s - 1, 1));

  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "'Inter', -apple-system, sans-serif", display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "48px 20px" }}>

      {/* Background glow */}
      <div style={{ position: "fixed", top: -200, left: "50%", transform: "translateX(-50%)", width: 600, height: 400, borderRadius: "50%", background: "#6C5CE7", opacity: 0.04, filter: "blur(100px)", pointerEvents: "none" }} />

      <div style={{ width: "100%", maxWidth: 680 }}>

        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 36 }}>
          <div style={{ width: 34, height: 34, borderRadius: 9, background: "linear-gradient(135deg,#6C5CE7,#A29BFE)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15 }}>⚡</div>
          <span style={{ fontWeight: 800, fontSize: 16, color: C.text, letterSpacing: "-0.3px" }}>CreatorFlow</span>
        </div>

        {/* Progress */}
        {step < total && <ProgressBar step={step} total={total} />}

        {/* Card */}
        <div style={{ background: C.panel, border: `1px solid ${C.border}`, borderRadius: 18, padding: "36px 40px", boxShadow: "0 8px 40px #00000040" }}>
          {step === 1 && <StepPlan onNext={next} />}
          {step === 2 && <StepBusiness onNext={next} onBack={back} />}
          {step === 3 && <StepBranding onNext={next} onBack={back} />}
          {step === 4 && <StepPayments onNext={next} onBack={back} />}
          {step === 5 && <StepDone />}
        </div>

        {/* Footer */}
        {step < total && (
          <p style={{ textAlign: "center", fontSize: 12, color: C.muted, marginTop: 20 }}>
            Step {step} of {total - 1} · 🔒 Your data is encrypted and secure
          </p>
        )}
      </div>
    </div>
  );
}