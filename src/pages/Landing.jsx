import { useState } from "react";

const C = {
  bg: "#0F0E17", panel: "#13111F", card: "#1A1828",
  border: "#ffffff0d", purple: "#6C5CE7", purpleLight: "#A29BFE",
  text: "#E8E6F0", muted: "#6B6784", success: "#55EFC4",
  warning: "#FDCB6E", error: "#FF7675",
};

const features = [
  { icon: "👥", title: "Client CRM", desc: "Manage every client relationship in one place. Track communications, contracts, and project history." },
  { icon: "📅", title: "Smart Booking", desc: "Let clients book directly from your portal. Automated reminders so nothing slips through." },
  { icon: "🗂", title: "Project Tracker", desc: "Kanban boards, milestones, file sharing and client approvals — all in one workspace." },
  { icon: "📄", title: "Invoicing", desc: "Create professional invoices in seconds. Accept payments via Stripe, Paystack or Flutterwave." },
  { icon: "📊", title: "Analytics", desc: "Track revenue, conversion rates, and business growth with beautiful charts and reports." },
  { icon: "🤝", title: "Team Workspace", desc: "Assign tasks, track workload and collaborate with your team in real time." },
];

const testimonials = [
  { name: "Sophia Chen", role: "Wedding Videographer · Los Angeles", avatar: "SC", color: "#6C5CE7", text: "CreatorFlow replaced five tools I was using. My revenue went up 40% in the first three months because I stopped losing leads.", stars: 5 },
  { name: "Marcus Williams", role: "Commercial Filmmaker · London", avatar: "MW", color: "#00B894", text: "The invoicing and client portal alone is worth every penny. My clients feel like they're working with a proper studio.", stars: 5 },
  { name: "Lena Okafor", role: "Social Media Manager · Lagos", avatar: "LO", color: "#E17055", text: "Paystack integration was a game changer for me. I now get paid on time, every time. Couldn't run my business without it.", stars: 5 },
];

const plans = [
  { name: "Starter", price: "$19", period: "/mo", desc: "For solo freelancers", color: "#74B9FF", features: ["Up to 10 clients", "5 active projects", "Basic invoicing", "Email support"] },
  { name: "Professional", price: "$49", period: "/mo", desc: "For growing creators", color: C.purple, popular: true, features: ["Unlimited clients", "Unlimited projects", "Advanced analytics", "Priority support", "Team up to 3", "Client portal"] },
  { name: "Agency", price: "$99", period: "/mo", desc: "For creative agencies", color: "#55EFC4", features: ["Everything in Pro", "Unlimited team", "Custom branding", "API access", "Dedicated manager", "SLA guarantee"] },
];

const stats = [
  { value: "12,400+", label: "Creative professionals" },
  { value: "$2.4M+", label: "Revenue managed monthly" },
  { value: "4.9★", label: "Average rating" },
  { value: "98%", label: "Customer satisfaction" },
];

const faqs = [
  { q: "Do I need a credit card to start?", a: "No. Your 14-day free trial starts immediately with no payment details required." },
  { q: "Can I accept payments from Nigerian clients?", a: "Yes. CreatorFlow integrates with Paystack and Flutterwave for seamless NGN payments and instant payouts." },
  { q: "Can I use CreatorFlow as a solo freelancer?", a: "Absolutely. The Starter plan is built specifically for solo creatives — videographers, photographers, designers and more." },
  { q: "Is my data secure?", a: "Yes. All data is encrypted in transit and at rest. We're SOC 2 compliant and take security seriously." },
  { q: "Can I cancel anytime?", a: "Yes, cancel anytime with no penalties. Your data remains accessible for 30 days after cancellation." },
];

// smooth scroll helper
const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

// ── NAV ───────────────────────────────────────────────────────────────────────
function Nav({ onGetStarted }) {
  const navLinks = [
    { label: "Features", target: "features" },
    { label: "Pricing", target: "pricing" },
    { label: "FAQ", target: "faq" },
    { label: "Testimonials", target: "testimonials" },
  ];

  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: "#0F0E17ee", backdropFilter: "blur(12px)", borderBottom: "1px solid #ffffff08" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 9, cursor: "pointer" }} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <div style={{ width: 32, height: 32, borderRadius: 9, background: "linear-gradient(135deg,#6C5CE7,#A29BFE)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>⚡</div>
          <span style={{ fontWeight: 800, fontSize: 16, color: C.text, letterSpacing: "-0.3px" }}>CreatorFlow</span>
        </div>

        {/* Links */}
        <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {navLinks.map(l => (
            <button key={l.label} onClick={() => scrollTo(l.target)}
              style={{ fontSize: 14, color: C.muted, background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", fontWeight: 500, padding: 0 }}
              onMouseEnter={e => e.target.style.color = C.text}
              onMouseLeave={e => e.target.style.color = C.muted}>
              {l.label}
            </button>
          ))}
        </div>

        {/* CTA */}
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <button onClick={onGetStarted} style={{ padding: "8px 16px", background: "transparent", border: "none", color: C.muted, fontFamily: "inherit", fontSize: 14, cursor: "pointer" }}>
            Sign in
          </button>
          <button onClick={onGetStarted} style={{ padding: "9px 18px", background: "linear-gradient(135deg,#6C5CE7,#8B7FF0)", border: "none", borderRadius: 9, color: "#fff", fontFamily: "inherit", fontSize: 14, fontWeight: 600, cursor: "pointer", boxShadow: "0 4px 16px #6C5CE740" }}>
            Start free trial
          </button>
        </div>
      </div>
    </nav>
  );
}

// ── DEMO MODAL ────────────────────────────────────────────────────────────────
function DemoModal({ onClose }) {
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "#000000cc", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div onClick={e => e.stopPropagation()} style={{ background: C.panel, border: `1px solid ${C.border}`, borderRadius: 18, padding: "32px", width: 560, boxShadow: "0 24px 80px #00000090", textAlign: "center" }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🎬</div>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: C.text, margin: "0 0 10px" }}>Product Demo</h2>
        <p style={{ fontSize: 14, color: C.muted, margin: "0 0 24px", lineHeight: 1.6 }}>
          A full video walkthrough of CreatorFlow is coming soon. In the meantime, sign up for free and explore the live product yourself.
        </p>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: "40px 20px", marginBottom: 24, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 60, height: 60, borderRadius: "50%", background: "linear-gradient(135deg,#6C5CE7,#A29BFE)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, cursor: "pointer" }}
            onClick={() => alert("Video player coming soon!")}>▶</div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={onClose} style={{ flex: 1, padding: "12px", background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, color: C.muted, fontFamily: "inherit", fontSize: 14, cursor: "pointer" }}>Close</button>
          <button onClick={onClose} style={{ flex: 2, padding: "12px", background: "linear-gradient(135deg,#6C5CE7,#8B7FF0)", border: "none", borderRadius: 10, color: "#fff", fontFamily: "inherit", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>Try it free instead →</button>
        </div>
      </div>
    </div>
  );
}

// ── HERO ──────────────────────────────────────────────────────────────────────
function Hero({ onGetStarted, onDemo }) {
  return (
    <section style={{ paddingTop: 140, paddingBottom: 100, textAlign: "center", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 700, height: 400, borderRadius: "50%", background: "#6C5CE7", opacity: 0.07, filter: "blur(100px)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 24px", position: "relative" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "#6C5CE715", border: "1px solid #6C5CE730", borderRadius: 20, padding: "6px 14px", marginBottom: 28 }}>
          <span style={{ fontSize: 12 }}>✨</span>
          <span style={{ fontSize: 12, color: C.purpleLight, fontWeight: 600 }}>Trusted by 12,400+ creative professionals worldwide</span>
        </div>

        <h1 style={{ fontSize: 58, fontWeight: 900, color: C.text, margin: "0 0 20px", lineHeight: 1.08, letterSpacing: "-2px" }}>
          The operating system<br />for{" "}
          <span style={{ background: "linear-gradient(90deg,#6C5CE7,#A29BFE,#74B9FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            creative businesses
          </span>
        </h1>

        <p style={{ fontSize: 18, color: C.muted, lineHeight: 1.7, margin: "0 auto 36px", maxWidth: 560 }}>
          Manage clients, bookings, projects, and invoices from one beautiful dashboard. Built for videographers, photographers, agencies and creators.
        </p>

        <div style={{ display: "flex", gap: 12, justifyContent: "center", alignItems: "center", marginBottom: 48 }}>
          <button onClick={onGetStarted} style={{ padding: "14px 28px", background: "linear-gradient(135deg,#6C5CE7,#8B7FF0)", border: "none", borderRadius: 11, color: "#fff", fontFamily: "inherit", fontSize: 15, fontWeight: 700, cursor: "pointer", boxShadow: "0 6px 28px #6C5CE760" }}>
            Start free — no card needed
          </button>
          <button onClick={onDemo} style={{ padding: "14px 24px", background: C.card, border: `1px solid ${C.border}`, borderRadius: 11, color: C.text, fontFamily: "inherit", fontSize: 15, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
            ▶ Watch demo
          </button>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}>
          <div style={{ display: "flex" }}>
            {["SC", "MW", "LO", "JP", "AP"].map((a, i) => (
              <div key={i} style={{ width: 32, height: 32, borderRadius: "50%", background: ["#6C5CE730", "#00B89430", "#E1705530", "#FDCB6E30", "#74B9FF30"][i], color: ["#6C5CE7", "#00B894", "#E17055", "#FDCB6E", "#74B9FF"][i], display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, border: "2px solid #0F0E17", marginLeft: i > 0 ? -8 : 0 }}>{a}</div>
            ))}
          </div>
          <div style={{ fontSize: 13, color: C.muted }}>
            <span style={{ color: C.warning }}>★★★★★</span> Loved by 12,400+ creatives
          </div>
        </div>
      </div>

      {/* Dashboard preview */}
      <div style={{ maxWidth: 900, margin: "60px auto 0", padding: "0 24px" }}>
        <div style={{ background: C.panel, border: "1px solid #ffffff0f", borderRadius: 18, padding: 16, boxShadow: "0 40px 100px #00000080" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 14, paddingBottom: 14, borderBottom: "1px solid #ffffff08" }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#FF7675" }} />
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#FDCB6E" }} />
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#55EFC4" }} />
            <div style={{ flex: 1, background: C.card, borderRadius: 6, padding: "5px 12px", fontSize: 11, color: C.muted, marginLeft: 8 }}>app.creatorflow.io/dashboard</div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginBottom: 12 }}>
            {[["💰", "$13,400", "Revenue"], ["👥", "24", "Clients"], ["🗂", "11", "Projects"], ["⭐", "4.9", "Rating"]].map(([icon, val, label], i) => (
              <div key={i} style={{ background: i === 0 ? "linear-gradient(135deg,#1E1B3A,#251E45)" : C.card, border: `1px solid ${i === 0 ? "#6C5CE7" : "#ffffff08"}`, borderRadius: 10, padding: "12px 14px" }}>
                <div style={{ fontSize: 16, marginBottom: 6 }}>{icon}</div>
                <div style={{ fontSize: 18, fontWeight: 800, color: C.text, letterSpacing: "-0.5px" }}>{val}</div>
                <div style={{ fontSize: 11, color: C.muted }}>{label}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 260px", gap: 10 }}>
            <div style={{ background: C.card, borderRadius: 10, padding: "14px 16px", height: 100, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: C.text }}>Revenue Overview</div>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 50 }}>
                {[30, 45, 38, 60, 52, 72, 65, 85, 78, 92, 88, 100].map((h, i) => (
                  <div key={i} style={{ flex: 1, height: `${h}%`, background: i === 11 ? "#6C5CE7" : "#6C5CE730", borderRadius: "3px 3px 0 0" }} />
                ))}
              </div>
            </div>
            <div style={{ background: C.card, borderRadius: 10, padding: "14px 16px" }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: C.text, marginBottom: 10 }}>Today's Schedule</div>
              {[["09:00", "Pre-wedding shoot", "confirmed"], ["14:00", "Brand call", "pending"]].map(([t, n, s], i) => (
                <div key={i} style={{ display: "flex", gap: 8, padding: "7px 8px", background: "#ffffff04", borderRadius: 7, borderLeft: `2px solid ${s === "confirmed" ? "#6C5CE7" : "#FDCB6E"}`, marginBottom: 6 }}>
                  <span style={{ fontSize: 10, color: C.muted, fontWeight: 700 }}>{t}</span>
                  <span style={{ fontSize: 11, color: C.text }}>{n}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── STATS ─────────────────────────────────────────────────────────────────────
function Stats() {
  return (
    <section style={{ padding: "60px 24px", borderTop: "1px solid #ffffff08", borderBottom: "1px solid #ffffff08" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)" }}>
        {stats.map((s, i) => (
          <div key={i} style={{ textAlign: "center", padding: "20px", borderRight: i < 3 ? "1px solid #ffffff08" : "none" }}>
            <div style={{ fontSize: 32, fontWeight: 900, color: C.text, letterSpacing: "-1px", background: "linear-gradient(135deg,#E8E6F0,#A29BFE)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{s.value}</div>
            <div style={{ fontSize: 13, color: C.muted, marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── FEATURES ──────────────────────────────────────────────────────────────────
function Features() {
  return (
    <section id="features" style={{ padding: "100px 24px", maxWidth: 1100, margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: 60 }}>
        <div style={{ display: "inline-block", fontSize: 12, fontWeight: 700, color: C.purpleLight, background: "#6C5CE715", border: "1px solid #6C5CE730", borderRadius: 20, padding: "5px 14px", marginBottom: 16 }}>FEATURES</div>
        <h2 style={{ fontSize: 40, fontWeight: 900, color: C.text, margin: "0 0 14px", letterSpacing: "-1px" }}>Everything your creative business needs</h2>
        <p style={{ fontSize: 16, color: C.muted, maxWidth: 500, margin: "0 auto" }}>Stop juggling tools. CreatorFlow brings your entire business into one clean workspace.</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
        {features.map((f, i) => (
          <div key={i}
            style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: "26px 24px", transition: "all 0.2s", cursor: "default" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#6C5CE740"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.transform = "translateY(0)"; }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: "#6C5CE715", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, marginBottom: 16 }}>{f.icon}</div>
            <div style={{ fontWeight: 700, fontSize: 15, color: C.text, marginBottom: 8 }}>{f.title}</div>
            <div style={{ fontSize: 13.5, color: C.muted, lineHeight: 1.6 }}>{f.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── TESTIMONIALS ──────────────────────────────────────────────────────────────
function Testimonials() {
  return (
    <section id="testimonials" style={{ padding: "80px 24px", background: C.panel, borderTop: "1px solid #ffffff08", borderBottom: "1px solid #ffffff08" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ display: "inline-block", fontSize: 12, fontWeight: 700, color: C.purpleLight, background: "#6C5CE715", border: "1px solid #6C5CE730", borderRadius: 20, padding: "5px 14px", marginBottom: 16 }}>TESTIMONIALS</div>
          <h2 style={{ fontSize: 36, fontWeight: 900, color: C.text, margin: 0, letterSpacing: "-0.8px" }}>Loved by creatives worldwide</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
          {testimonials.map((t, i) => (
            <div key={i} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: "24px" }}>
              <div style={{ color: C.warning, fontSize: 14, marginBottom: 14 }}>{"★".repeat(t.stars)}</div>
              <p style={{ fontSize: 14, color: "#C4C0D8", lineHeight: 1.7, margin: "0 0 20px", fontStyle: "italic" }}>"{t.text}"</p>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: `${t.color}25`, color: t.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700 }}>{t.avatar}</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: C.text }}>{t.name}</div>
                  <div style={{ fontSize: 11, color: C.muted, marginTop: 1 }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── PRICING ───────────────────────────────────────────────────────────────────
function Pricing({ onGetStarted }) {
  return (
    <section id="pricing" style={{ padding: "100px 24px", maxWidth: 1000, margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: 52 }}>
        <div style={{ display: "inline-block", fontSize: 12, fontWeight: 700, color: C.purpleLight, background: "#6C5CE715", border: "1px solid #6C5CE730", borderRadius: 20, padding: "5px 14px", marginBottom: 16 }}>PRICING</div>
        <h2 style={{ fontSize: 38, fontWeight: 900, color: C.text, margin: "0 0 12px", letterSpacing: "-1px" }}>Simple, transparent pricing</h2>
        <p style={{ fontSize: 15, color: C.muted, margin: 0 }}>Start free for 14 days. No credit card required.</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
        {plans.map((p, i) => (
          <div key={i} style={{ background: p.popular ? "linear-gradient(145deg,#1E1B3A,#1A1828)" : C.card, border: `1.5px solid ${p.popular ? C.purple : C.border}`, borderRadius: 16, padding: "28px 24px", position: "relative", boxShadow: p.popular ? "0 0 30px #6C5CE725" : "none" }}>
            {p.popular && <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: C.purple, color: "#fff", fontSize: 10, fontWeight: 700, padding: "4px 12px", borderRadius: 20, whiteSpace: "nowrap" }}>MOST POPULAR</div>}
            <div style={{ fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 4 }}>{p.name}</div>
            <div style={{ fontSize: 12, color: C.muted, marginBottom: 16 }}>{p.desc}</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 3, marginBottom: 20 }}>
              <span style={{ fontSize: 36, fontWeight: 900, color: p.color, letterSpacing: "-1.5px" }}>{p.price}</span>
              <span style={{ fontSize: 13, color: C.muted }}>{p.period}</span>
            </div>
            {p.features.map(f => (
              <div key={f} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 9 }}>
                <span style={{ color: p.color, fontSize: 13, fontWeight: 700 }}>✓</span>
                <span style={{ fontSize: 13, color: C.muted }}>{f}</span>
              </div>
            ))}
            <button onClick={onGetStarted} style={{ width: "100%", marginTop: 20, padding: "11px", background: p.popular ? "linear-gradient(135deg,#6C5CE7,#8B7FF0)" : C.panel, border: `1px solid ${p.popular ? "transparent" : C.border}`, borderRadius: 9, color: p.popular ? "#fff" : C.muted, fontFamily: "inherit", fontSize: 13, fontWeight: 600, cursor: "pointer", boxShadow: p.popular ? "0 4px 16px #6C5CE740" : "none" }}>
              Start free trial
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── FAQ ───────────────────────────────────────────────────────────────────────
function FAQ() {
  const [open, setOpen] = useState(null);
  return (
    <section id="faq" style={{ padding: "80px 24px", background: C.panel, borderTop: "1px solid #ffffff08" }}>
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <div style={{ display: "inline-block", fontSize: 12, fontWeight: 700, color: C.purpleLight, background: "#6C5CE715", border: "1px solid #6C5CE730", borderRadius: 20, padding: "5px 14px", marginBottom: 16 }}>FAQ</div>
          <h2 style={{ fontSize: 36, fontWeight: 900, color: C.text, margin: 0, letterSpacing: "-0.8px" }}>Common questions</h2>
        </div>
        {faqs.map((f, i) => (
          <div key={i} onClick={() => setOpen(open === i ? null : i)}
            style={{ background: C.card, border: `1px solid ${open === i ? "#6C5CE740" : C.border}`, borderRadius: 12, padding: "18px 20px", marginBottom: 10, cursor: "pointer", transition: "border-color 0.2s" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: C.text }}>{f.q}</span>
              <span style={{ color: C.muted, fontSize: 20, fontWeight: 300, marginLeft: 16, flexShrink: 0 }}>{open === i ? "−" : "+"}</span>
            </div>
            {open === i && <p style={{ margin: "12px 0 0", fontSize: 13.5, color: C.muted, lineHeight: 1.7 }}>{f.a}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}

// ── CTA ───────────────────────────────────────────────────────────────────────
function CTASection({ onGetStarted }) {
  return (
    <section style={{ padding: "100px 24px", textAlign: "center", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 600, height: 300, borderRadius: "50%", background: "#6C5CE7", opacity: 0.07, filter: "blur(80px)", pointerEvents: "none" }} />
      <div style={{ maxWidth: 600, margin: "0 auto", position: "relative" }}>
        <h2 style={{ fontSize: 44, fontWeight: 900, color: C.text, margin: "0 0 16px", letterSpacing: "-1.5px", lineHeight: 1.1 }}>
          Ready to grow your<br />
          <span style={{ background: "linear-gradient(90deg,#6C5CE7,#A29BFE)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>creative business?</span>
        </h2>
        <p style={{ fontSize: 16, color: C.muted, margin: "0 0 36px", lineHeight: 1.6 }}>
          Join 12,400+ creatives already using CreatorFlow. Start your 14-day free trial today.
        </p>
        <button onClick={onGetStarted} style={{ padding: "15px 32px", background: "linear-gradient(135deg,#6C5CE7,#8B7FF0)", border: "none", borderRadius: 12, color: "#fff", fontFamily: "inherit", fontSize: 16, fontWeight: 700, cursor: "pointer", boxShadow: "0 8px 32px #6C5CE770" }}>
          Start free trial — 14 days free
        </button>
        <p style={{ fontSize: 12, color: C.muted, marginTop: 14 }}>No credit card · Cancel anytime · Setup in 2 minutes</p>
      </div>
    </section>
  );
}

// ── FOOTER ────────────────────────────────────────────────────────────────────
function Footer({ onGetStarted }) {
  const cols = [
    { title: "Product", links: ["Features", "Pricing", "Changelog", "Roadmap"] },
    { title: "Company", links: ["About", "Blog", "Careers", "Press"] },
    { title: "Support", links: ["Help Center", "Documentation", "Contact", "Status"] },
    { title: "Legal", links: ["Privacy Policy", "Terms of Service", "Cookie Policy", "GDPR"] },
  ];

  const footerScroll = (label) => {
    const map = { Features: "features", Pricing: "pricing", FAQ: "faq", Testimonials: "testimonials" };
    if (map[label]) scrollTo(map[label]);
  };

  return (
    <footer style={{ background: C.panel, borderTop: "1px solid #ffffff08", padding: "60px 24px 32px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", gap: 40, marginBottom: 48 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 14 }}>
              <div style={{ width: 30, height: 30, borderRadius: 8, background: "linear-gradient(135deg,#6C5CE7,#A29BFE)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13 }}>⚡</div>
              <span style={{ fontWeight: 800, fontSize: 15, color: C.text }}>CreatorFlow</span>
            </div>
            <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.7, maxWidth: 220, margin: "0 0 16px" }}>
              The operating system for creative businesses. Built with ❤️ in Austin, TX.
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              {["𝕏", "in", "▶"].map((s, i) => (
                <div key={i} style={{ width: 32, height: 32, borderRadius: 8, background: C.card, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, color: C.muted, cursor: "pointer" }}>{s}</div>
              ))}
            </div>
          </div>
          {cols.map(col => (
            <div key={col.title}>
              <div style={{ fontSize: 12, fontWeight: 700, color: C.text, marginBottom: 14, textTransform: "uppercase", letterSpacing: "0.5px" }}>{col.title}</div>
              {col.links.map(l => (
                <button key={l} onClick={() => footerScroll(l)}
                  style={{ display: "block", fontSize: 13, color: C.muted, background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", marginBottom: 9, padding: 0, textAlign: "left" }}
                  onMouseEnter={e => e.target.style.color = C.text}
                  onMouseLeave={e => e.target.style.color = C.muted}>
                  {l}
                </button>
              ))}
            </div>
          ))}
        </div>
        <div style={{ borderTop: "1px solid #ffffff08", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 12, color: C.muted }}>© 2024 CreatorFlow Inc. All rights reserved.</span>
          <span style={{ fontSize: 12, color: C.muted }}>Made for creatives, by creatives 🎬</span>
        </div>
      </div>
    </footer>
  );
}

// ── ROOT EXPORT ───────────────────────────────────────────────────────────────
export default function Landing({ onGetStarted }) {
  const [showDemo, setShowDemo] = useState(false);

  return (
    <div style={{ background: C.bg, fontFamily: "'Inter', -apple-system, sans-serif", color: C.text, minHeight: "100vh" }}>
      <Nav onGetStarted={onGetStarted} />
      <Hero onGetStarted={onGetStarted} onDemo={() => setShowDemo(true)} />
      <Stats />
      <Features />
      <Testimonials />
      <Pricing onGetStarted={onGetStarted} />
      <FAQ />
      <CTASection onGetStarted={onGetStarted} />
      <Footer onGetStarted={onGetStarted} />
      {showDemo && <DemoModal onClose={() => setShowDemo(false)} />}
    </div>
  );
}