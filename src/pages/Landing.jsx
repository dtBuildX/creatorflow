import { useState, useEffect } from "react";

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
  { name: "Sophia Chen", role: "Wedding Videographer · LA", avatar: "SC", color: "#6C5CE7", text: "CreatorFlow replaced five tools I was using. My revenue went up 40% in three months.", stars: 5 },
  { name: "Marcus Williams", role: "Filmmaker · London", avatar: "MW", color: "#00B894", text: "The invoicing and client portal alone is worth every penny. My clients feel like a proper studio.", stars: 5 },
  { name: "Lena Okafor", role: "Social Media Manager · Lagos", avatar: "LO", color: "#E17055", text: "Paystack integration was a game changer. I now get paid on time, every time.", stars: 5 },
];

const plans = [
  { name: "Starter", price: "$19", period: "/mo", desc: "For solo freelancers", color: "#74B9FF", features: ["Up to 10 clients", "5 active projects", "Basic invoicing", "Email support"] },
  { name: "Professional", price: "$49", period: "/mo", desc: "For growing creators", color: C.purple, popular: true, features: ["Unlimited clients", "Unlimited projects", "Advanced analytics", "Priority support", "Team up to 3", "Client portal"] },
  { name: "Agency", price: "$99", period: "/mo", desc: "For creative agencies", color: "#55EFC4", features: ["Everything in Pro", "Unlimited team", "Custom branding", "API access", "Dedicated manager", "SLA guarantee"] },
];

const faqs = [
  { q: "Do I need a credit card to start?", a: "No. Your 14-day free trial starts immediately with no payment details required." },
  { q: "Can I accept payments from Nigerian clients?", a: "Yes. CreatorFlow integrates with Paystack and Flutterwave for seamless NGN payments and instant payouts." },
  { q: "Can I use CreatorFlow as a solo freelancer?", a: "Absolutely. The Starter plan is built for solo creatives — videographers, photographers, designers and more." },
  { q: "Is my data secure?", a: "Yes. All data is encrypted in transit and at rest. We take security seriously." },
  { q: "Can I cancel anytime?", a: "Yes, cancel anytime with no penalties. Your data remains accessible for 30 days after cancellation." },
];

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

// ── HOOK: screen size ─────────────────────────────────────────────────────────
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return isMobile;
}

// ── NAV ───────────────────────────────────────────────────────────────────────
function Nav({ onGetStarted }) {
  const isMobile = useIsMobile();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { label: "Features", target: "features" },
    { label: "Pricing", target: "pricing" },
    { label: "FAQ", target: "faq" },
    { label: "Testimonials", target: "testimonials" },
  ];

  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: "#0F0E17ee", backdropFilter: "blur(12px)", borderBottom: "1px solid #ffffff08" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 20px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Logo — goes back to top */}
        <div onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} style={{ display: "flex", alignItems: "center", gap: 9, cursor: "pointer" }}>
          <div style={{ width: 30, height: 30, borderRadius: 8, background: "linear-gradient(135deg,#6C5CE7,#A29BFE)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13 }}>⚡</div>
          <span style={{ fontWeight: 800, fontSize: 15, color: C.text, letterSpacing: "-0.3px" }}>CreatorFlow</span>
        </div>

        {/* Desktop links */}
        {!isMobile && (
          <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
            {navLinks.map(l => (
              <button key={l.label} onClick={() => scrollTo(l.target)}
                style={{ fontSize: 13.5, color: C.muted, background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", fontWeight: 500, padding: 0 }}
                onMouseEnter={e => e.target.style.color = C.text}
                onMouseLeave={e => e.target.style.color = C.muted}>
                {l.label}
              </button>
            ))}
          </div>
        )}

        {/* Desktop CTA */}
        {!isMobile && (
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <button onClick={onGetStarted} style={{ padding: "7px 14px", background: "transparent", border: "none", color: C.muted, fontFamily: "inherit", fontSize: 13.5, cursor: "pointer" }}>Sign in</button>
            <button onClick={onGetStarted} style={{ padding: "8px 16px", background: "linear-gradient(135deg,#6C5CE7,#8B7FF0)", border: "none", borderRadius: 8, color: "#fff", fontFamily: "inherit", fontSize: 13.5, fontWeight: 600, cursor: "pointer", boxShadow: "0 4px 16px #6C5CE740" }}>
              Start free
            </button>
          </div>
        )}

        {/* Mobile hamburger */}
        {isMobile && (
          <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: "none", border: "none", color: C.text, cursor: "pointer", fontSize: 22, padding: 4 }}>
            {menuOpen ? "✕" : "☰"}
          </button>
        )}
      </div>

      {/* Mobile menu */}
      {isMobile && menuOpen && (
        <div style={{ background: C.panel, borderTop: "1px solid #ffffff08", padding: "16px 20px", display: "flex", flexDirection: "column", gap: 4 }}>
          {navLinks.map(l => (
            <button key={l.label} onClick={() => { scrollTo(l.target); setMenuOpen(false); }}
              style={{ fontSize: 15, color: C.text, background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", fontWeight: 500, padding: "10px 0", textAlign: "left", borderBottom: "1px solid #ffffff08" }}>
              {l.label}
            </button>
          ))}
          <button onClick={() => { onGetStarted(); setMenuOpen(false); }}
            style={{ marginTop: 10, padding: "12px", background: "linear-gradient(135deg,#6C5CE7,#8B7FF0)", border: "none", borderRadius: 10, color: "#fff", fontFamily: "inherit", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
            Start free trial
          </button>
          <button onClick={() => { onGetStarted(); setMenuOpen(false); }}
            style={{ padding: "10px", background: "transparent", border: "none", color: C.muted, fontFamily: "inherit", fontSize: 14, cursor: "pointer" }}>
            Sign in
          </button>
        </div>
      )}
    </nav>
  );
}

// ── DEMO MODAL ────────────────────────────────────────────────────────────────
function DemoModal({ onClose, onGetStarted }) {
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "#000000cc", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div onClick={e => e.stopPropagation()} style={{ background: C.panel, border: `1px solid ${C.border}`, borderRadius: 18, padding: "28px 24px", width: "100%", maxWidth: 500, boxShadow: "0 24px 80px #00000090", textAlign: "center" }}>
        <div style={{ fontSize: 44, marginBottom: 14 }}>🎬</div>
        <h2 style={{ fontSize: 20, fontWeight: 800, color: C.text, margin: "0 0 10px" }}>Product Demo</h2>
        <p style={{ fontSize: 14, color: C.muted, margin: "0 0 22px", lineHeight: 1.6 }}>
          A full video walkthrough is coming soon. Sign up free and explore the live product yourself right now.
        </p>
        <div style={{ display: "flex", gap: 10, flexDirection: "column" }}>
          <button onClick={onGetStarted} style={{ padding: "12px", background: "linear-gradient(135deg,#6C5CE7,#8B7FF0)", border: "none", borderRadius: 10, color: "#fff", fontFamily: "inherit", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>Try it free →</button>
          <button onClick={onClose} style={{ padding: "12px", background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, color: C.muted, fontFamily: "inherit", fontSize: 14, cursor: "pointer" }}>Close</button>
        </div>
      </div>
    </div>
  );
}

// ── HERO ──────────────────────────────────────────────────────────────────────
function Hero({ onGetStarted, onDemo }) {
  const isMobile = useIsMobile();

  return (
    <section style={{ paddingTop: isMobile ? 100 : 140, paddingBottom: isMobile ? 60 : 100, textAlign: "center", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 600, height: 400, borderRadius: "50%", background: "#6C5CE7", opacity: 0.07, filter: "blur(100px)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 20px", position: "relative" }}>
        {/* Badge */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "#6C5CE715", border: "1px solid #6C5CE730", borderRadius: 20, padding: "5px 12px", marginBottom: 22 }}>
          <span style={{ fontSize: 11 }}>✨</span>
          <span style={{ fontSize: 11, color: C.purpleLight, fontWeight: 600 }}>Trusted by 12,400+ creative professionals</span>
        </div>

        {/* Headline */}
        <h1 style={{ fontSize: isMobile ? 34 : 56, fontWeight: 900, color: C.text, margin: "0 0 16px", lineHeight: 1.1, letterSpacing: isMobile ? "-1px" : "-2px" }}>
          The operating system<br />for{" "}
          <span style={{ background: "linear-gradient(90deg,#6C5CE7,#A29BFE,#74B9FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            creative businesses
          </span>
        </h1>

        <p style={{ fontSize: isMobile ? 15 : 17, color: C.muted, lineHeight: 1.7, margin: "0 auto 28px", maxWidth: 520 }}>
          Manage clients, bookings, projects, and invoices from one beautiful dashboard. Built for videographers, photographers, agencies and creators.
        </p>

        {/* CTAs */}
        <div style={{ display: "flex", gap: 10, justifyContent: "center", alignItems: "center", marginBottom: 36, flexDirection: isMobile ? "column" : "row" }}>
          <button onClick={onGetStarted} style={{ padding: isMobile ? "13px 24px" : "14px 28px", background: "linear-gradient(135deg,#6C5CE7,#8B7FF0)", border: "none", borderRadius: 11, color: "#fff", fontFamily: "inherit", fontSize: isMobile ? 14 : 15, fontWeight: 700, cursor: "pointer", boxShadow: "0 6px 28px #6C5CE760", width: isMobile ? "100%" : "auto" }}>
            Start free — no card needed
          </button>
          <button onClick={onDemo} style={{ padding: isMobile ? "13px 24px" : "14px 24px", background: C.card, border: `1px solid ${C.border}`, borderRadius: 11, color: C.text, fontFamily: "inherit", fontSize: isMobile ? 14 : 15, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, width: isMobile ? "100%" : "auto" }}>
            ▶ Watch demo
          </button>
        </div>

        {/* Social proof */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
          <div style={{ display: "flex" }}>
            {["SC", "MW", "LO", "JP", "AP"].map((a, i) => (
              <div key={i} style={{ width: 28, height: 28, borderRadius: "50%", background: ["#6C5CE730", "#00B89430", "#E1705530", "#FDCB6E30", "#74B9FF30"][i], color: ["#6C5CE7", "#00B894", "#E17055", "#FDCB6E", "#74B9FF"][i], display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 700, border: "2px solid #0F0E17", marginLeft: i > 0 ? -7 : 0 }}>{a}</div>
            ))}
          </div>
          <div style={{ fontSize: 12, color: C.muted }}>
            <span style={{ color: C.warning }}>★★★★★</span> Loved by 12,400+ creatives
          </div>
        </div>
      </div>

      {/* Dashboard preview — hide on mobile */}
      {!isMobile && (
        <div style={{ maxWidth: 900, margin: "50px auto 0", padding: "0 24px" }}>
          <div style={{ background: C.panel, border: "1px solid #ffffff0f", borderRadius: 16, padding: 14, boxShadow: "0 40px 100px #00000080" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12, paddingBottom: 12, borderBottom: "1px solid #ffffff08" }}>
              <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#FF7675" }} />
              <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#FDCB6E" }} />
              <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#55EFC4" }} />
              <div style={{ flex: 1, background: C.card, borderRadius: 5, padding: "4px 10px", fontSize: 10, color: C.muted, marginLeft: 8 }}>app.creatorflow.io/dashboard</div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8, marginBottom: 10 }}>
              {[["💰", "$13,400", "Revenue"], ["👥", "24", "Clients"], ["🗂", "11", "Projects"], ["⭐", "4.9", "Rating"]].map(([icon, val, label], i) => (
                <div key={i} style={{ background: i === 0 ? "linear-gradient(135deg,#1E1B3A,#251E45)" : C.card, border: `1px solid ${i === 0 ? "#6C5CE7" : "#ffffff08"}`, borderRadius: 8, padding: "10px 12px" }}>
                  <div style={{ fontSize: 14, marginBottom: 4 }}>{icon}</div>
                  <div style={{ fontSize: 16, fontWeight: 800, color: C.text }}>{val}</div>
                  <div style={{ fontSize: 10, color: C.muted }}>{label}</div>
                </div>
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 240px", gap: 8 }}>
              <div style={{ background: C.card, borderRadius: 8, padding: "12px 14px", height: 90, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: C.text }}>Revenue Overview</div>
                <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 44 }}>
                  {[30, 45, 38, 60, 52, 72, 65, 85, 78, 92, 88, 100].map((h, i) => (
                    <div key={i} style={{ flex: 1, height: `${h}%`, background: i === 11 ? "#6C5CE7" : "#6C5CE730", borderRadius: "2px 2px 0 0" }} />
                  ))}
                </div>
              </div>
              <div style={{ background: C.card, borderRadius: 8, padding: "12px 14px" }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: C.text, marginBottom: 8 }}>Today's Schedule</div>
                {[["09:00", "Pre-wedding shoot", "confirmed"], ["14:00", "Brand call", "pending"]].map(([t, n, s], i) => (
                  <div key={i} style={{ display: "flex", gap: 7, padding: "6px 7px", background: "#ffffff04", borderRadius: 6, borderLeft: `2px solid ${s === "confirmed" ? "#6C5CE7" : "#FDCB6E"}`, marginBottom: 5 }}>
                    <span style={{ fontSize: 9, color: C.muted, fontWeight: 700 }}>{t}</span>
                    <span style={{ fontSize: 10, color: C.text }}>{n}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

// ── STATS ─────────────────────────────────────────────────────────────────────
function Stats() {
  const isMobile = useIsMobile();
  const stats = [
    { value: "12,400+", label: "Creative professionals" },
    { value: "$2.4M+", label: "Revenue managed" },
    { value: "4.9★", label: "Average rating" },
    { value: "98%", label: "Satisfaction" },
  ];
  return (
    <section style={{ padding: "40px 20px", borderTop: "1px solid #ffffff08", borderBottom: "1px solid #ffffff08" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: isMobile ? "repeat(2,1fr)" : "repeat(4,1fr)", gap: isMobile ? 20 : 0 }}>
        {stats.map((s, i) => (
          <div key={i} style={{ textAlign: "center", padding: "16px", borderRight: !isMobile && i < 3 ? "1px solid #ffffff08" : "none" }}>
            <div style={{ fontSize: isMobile ? 24 : 30, fontWeight: 900, color: C.text, letterSpacing: "-1px", background: "linear-gradient(135deg,#E8E6F0,#A29BFE)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{s.value}</div>
            <div style={{ fontSize: 12, color: C.muted, marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── FEATURES ──────────────────────────────────────────────────────────────────
function Features() {
  const isMobile = useIsMobile();
  return (
    <section id="features" style={{ padding: isMobile ? "60px 20px" : "90px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <div style={{ display: "inline-block", fontSize: 11, fontWeight: 700, color: C.purpleLight, background: "#6C5CE715", border: "1px solid #6C5CE730", borderRadius: 20, padding: "5px 14px", marginBottom: 14 }}>FEATURES</div>
          <h2 style={{ fontSize: isMobile ? 28 : 38, fontWeight: 900, color: C.text, margin: "0 0 12px", letterSpacing: "-1px" }}>Everything your creative business needs</h2>
          <p style={{ fontSize: 14, color: C.muted, maxWidth: 480, margin: "0 auto" }}>Stop juggling tools. CreatorFlow brings your entire business into one clean workspace.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)", gap: 14 }}>
          {features.map((f, i) => (
            <div key={i} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "22px 20px" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#6C5CE740"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.transform = "translateY(0)"; }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: "#6C5CE715", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, marginBottom: 14 }}>{f.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 14, color: C.text, marginBottom: 8 }}>{f.title}</div>
              <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.6 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── TESTIMONIALS ──────────────────────────────────────────────────────────────
function Testimonials() {
  const isMobile = useIsMobile();
  return (
    <section id="testimonials" style={{ padding: isMobile ? "60px 20px" : "80px 24px", background: C.panel, borderTop: "1px solid #ffffff08", borderBottom: "1px solid #ffffff08" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ display: "inline-block", fontSize: 11, fontWeight: 700, color: C.purpleLight, background: "#6C5CE715", border: "1px solid #6C5CE730", borderRadius: 20, padding: "5px 14px", marginBottom: 14 }}>TESTIMONIALS</div>
          <h2 style={{ fontSize: isMobile ? 26 : 34, fontWeight: 900, color: C.text, margin: 0, letterSpacing: "-0.8px" }}>Loved by creatives worldwide</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)", gap: 14 }}>
          {testimonials.map((t, i) => (
            <div key={i} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "22px" }}>
              <div style={{ color: C.warning, fontSize: 13, marginBottom: 12 }}>{"★".repeat(t.stars)}</div>
              <p style={{ fontSize: 13.5, color: "#C4C0D8", lineHeight: 1.7, margin: "0 0 18px", fontStyle: "italic" }}>"{t.text}"</p>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 34, height: 34, borderRadius: "50%", background: `${t.color}25`, color: t.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700 }}>{t.avatar}</div>
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
  const isMobile = useIsMobile();
  return (
    <section id="pricing" style={{ padding: isMobile ? "60px 20px" : "90px 24px" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <div style={{ display: "inline-block", fontSize: 11, fontWeight: 700, color: C.purpleLight, background: "#6C5CE715", border: "1px solid #6C5CE730", borderRadius: 20, padding: "5px 14px", marginBottom: 14 }}>PRICING</div>
          <h2 style={{ fontSize: isMobile ? 28 : 36, fontWeight: 900, color: C.text, margin: "0 0 10px", letterSpacing: "-1px" }}>Simple, transparent pricing</h2>
          <p style={{ fontSize: 14, color: C.muted, margin: 0 }}>Start free for 14 days. No credit card required.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)", gap: 14 }}>
          {plans.map((p, i) => (
            <div key={i} style={{ background: p.popular ? "linear-gradient(145deg,#1E1B3A,#1A1828)" : C.card, border: `1.5px solid ${p.popular ? C.purple : C.border}`, borderRadius: 16, padding: "24px 20px", position: "relative", boxShadow: p.popular ? "0 0 30px #6C5CE725" : "none" }}>
              {p.popular && <div style={{ position: "absolute", top: -11, left: "50%", transform: "translateX(-50%)", background: C.purple, color: "#fff", fontSize: 10, fontWeight: 700, padding: "3px 12px", borderRadius: 20, whiteSpace: "nowrap" }}>MOST POPULAR</div>}
              <div style={{ fontSize: 14, fontWeight: 700, color: C.text, marginBottom: 4 }}>{p.name}</div>
              <div style={{ fontSize: 12, color: C.muted, marginBottom: 14 }}>{p.desc}</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 3, marginBottom: 18 }}>
                <span style={{ fontSize: 32, fontWeight: 900, color: p.color, letterSpacing: "-1px" }}>{p.price}</span>
                <span style={{ fontSize: 12, color: C.muted }}>{p.period}</span>
              </div>
              {p.features.map(f => (
                <div key={f} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <span style={{ color: p.color, fontSize: 12, fontWeight: 700 }}>✓</span>
                  <span style={{ fontSize: 13, color: C.muted }}>{f}</span>
                </div>
              ))}
              <button onClick={onGetStarted} style={{ width: "100%", marginTop: 18, padding: "11px", background: p.popular ? "linear-gradient(135deg,#6C5CE7,#8B7FF0)" : C.panel, border: `1px solid ${p.popular ? "transparent" : C.border}`, borderRadius: 9, color: p.popular ? "#fff" : C.muted, fontFamily: "inherit", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                Start free trial
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── FAQ ───────────────────────────────────────────────────────────────────────
function FAQ() {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(null);
  return (
    <section id="faq" style={{ padding: isMobile ? "60px 20px" : "80px 24px", background: C.panel, borderTop: "1px solid #ffffff08" }}>
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ display: "inline-block", fontSize: 11, fontWeight: 700, color: C.purpleLight, background: "#6C5CE715", border: "1px solid #6C5CE730", borderRadius: 20, padding: "5px 14px", marginBottom: 14 }}>FAQ</div>
          <h2 style={{ fontSize: isMobile ? 26 : 34, fontWeight: 900, color: C.text, margin: 0, letterSpacing: "-0.8px" }}>Common questions</h2>
        </div>
        {faqs.map((f, i) => (
          <div key={i} onClick={() => setOpen(open === i ? null : i)}
            style={{ background: C.card, border: `1px solid ${open === i ? "#6C5CE740" : C.border}`, borderRadius: 12, padding: "16px 18px", marginBottom: 10, cursor: "pointer", transition: "border-color 0.2s" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 13.5, fontWeight: 600, color: C.text, paddingRight: 12 }}>{f.q}</span>
              <span style={{ color: C.muted, fontSize: 20, fontWeight: 300, flexShrink: 0 }}>{open === i ? "−" : "+"}</span>
            </div>
            {open === i && <p style={{ margin: "10px 0 0", fontSize: 13, color: C.muted, lineHeight: 1.7 }}>{f.a}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}

// ── CTA ───────────────────────────────────────────────────────────────────────
function CTASection({ onGetStarted }) {
  const isMobile = useIsMobile();
  return (
    <section style={{ padding: isMobile ? "70px 20px" : "100px 24px", textAlign: "center", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 500, height: 300, borderRadius: "50%", background: "#6C5CE7", opacity: 0.07, filter: "blur(80px)", pointerEvents: "none" }} />
      <div style={{ maxWidth: 560, margin: "0 auto", position: "relative" }}>
        <h2 style={{ fontSize: isMobile ? 30 : 42, fontWeight: 900, color: C.text, margin: "0 0 14px", letterSpacing: "-1px", lineHeight: 1.1 }}>
          Ready to grow your<br />
          <span style={{ background: "linear-gradient(90deg,#6C5CE7,#A29BFE)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>creative business?</span>
        </h2>
        <p style={{ fontSize: 15, color: C.muted, margin: "0 0 28px", lineHeight: 1.6 }}>
          Join 12,400+ creatives already using CreatorFlow. Start your 14-day free trial today.
        </p>
        <button onClick={onGetStarted} style={{ padding: "14px 28px", background: "linear-gradient(135deg,#6C5CE7,#8B7FF0)", border: "none", borderRadius: 12, color: "#fff", fontFamily: "inherit", fontSize: 15, fontWeight: 700, cursor: "pointer", boxShadow: "0 8px 32px #6C5CE770", width: isMobile ? "100%" : "auto" }}>
          Start free trial — 14 days free
        </button>
        <p style={{ fontSize: 12, color: C.muted, marginTop: 12 }}>No credit card · Cancel anytime · Setup in 2 minutes</p>
      </div>
    </section>
  );
}

// ── FOOTER ────────────────────────────────────────────────────────────────────
function Footer({ onGetStarted }) {
  const isMobile = useIsMobile();
  const cols = [
    { title: "Product", links: ["Features", "Pricing", "FAQ", "Testimonials"] },
    { title: "Company", links: ["About", "Blog", "Careers", "Press"] },
    { title: "Support", links: ["Help Center", "Contact", "Status", "Docs"] },
    { title: "Legal", links: ["Privacy", "Terms", "Cookies", "GDPR"] },
  ];

  const handleFooterLink = (label) => {
    const map = { Features: "features", Pricing: "pricing", FAQ: "faq", Testimonials: "testimonials" };
    if (map[label]) scrollTo(map[label]);
  };

  return (
    <footer style={{ background: C.panel, borderTop: "1px solid #ffffff08", padding: isMobile ? "40px 20px 24px" : "56px 24px 28px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "2fr 1fr 1fr 1fr 1fr", gap: isMobile ? 28 : 40, marginBottom: 36 }}>
          <div style={{ gridColumn: isMobile ? "1 / -1" : "auto" }}>
            <div onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 12, cursor: "pointer" }}>
              <div style={{ width: 28, height: 28, borderRadius: 7, background: "linear-gradient(135deg,#6C5CE7,#A29BFE)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12 }}>⚡</div>
              <span style={{ fontWeight: 800, fontSize: 14, color: C.text }}>CreatorFlow</span>
            </div>
            <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.7, maxWidth: 220, margin: "0 0 14px" }}>
              The operating system for creative businesses. Built with ❤️ in Austin, TX.
            </p>
            <div style={{ display: "flex", gap: 8 }}>
              {["𝕏", "in", "▶"].map((s, i) => (
                <div key={i} style={{ width: 30, height: 30, borderRadius: 7, background: C.card, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: C.muted, cursor: "pointer" }}>{s}</div>
              ))}
            </div>
          </div>
          {cols.map(col => (
            <div key={col.title}>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.text, marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.5px" }}>{col.title}</div>
              {col.links.map(l => (
                <button key={l} onClick={() => handleFooterLink(l)}
                  style={{ display: "block", fontSize: 13, color: C.muted, background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", marginBottom: 8, padding: 0, textAlign: "left" }}
                  onMouseEnter={e => e.target.style.color = C.text}
                  onMouseLeave={e => e.target.style.color = C.muted}>
                  {l}
                </button>
              ))}
            </div>
          ))}
        </div>
        <div style={{ borderTop: "1px solid #ffffff08", paddingTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: isMobile ? "column" : "row", gap: isMobile ? 8 : 0 }}>
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
      {showDemo && <DemoModal onClose={() => setShowDemo(false)} onGetStarted={() => { setShowDemo(false); onGetStarted(); }} />}
    </div>
  );
}
