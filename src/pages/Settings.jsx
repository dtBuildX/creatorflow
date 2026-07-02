import { useState } from "react";

const C = {
  bg: "#0F0E17", panel: "#13111F", card: "#1A1828",
  border: "#ffffff0d", purple: "#6C5CE7", purpleLight: "#A29BFE",
  text: "#E8E6F0", muted: "#6B6784", success: "#55EFC4",
  warning: "#FDCB6E", error: "#FF7675",
};

function Input({ label, value, placeholder, type = "text", hint }) {
  const [focused, setFocused] = useState(false);
  const [val, setVal] = useState(value || "");
  return (
    <div style={{ marginBottom: 16 }}>
      {label && <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 6 }}>{label}</label>}
      <input type={type} value={val} onChange={e => setVal(e.target.value)} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} placeholder={placeholder}
        style={{ width: "100%", boxSizing: "border-box", background: C.card, border: `1px solid ${focused ? C.purple : C.border}`, borderRadius: 10, padding: "11px 14px", color: C.text, fontFamily: "inherit", fontSize: 14, outline: "none", boxShadow: focused ? `0 0 0 3px ${C.purple}18` : "none", transition: "all 0.15s" }} />
      {hint && <p style={{ margin: "5px 0 0", fontSize: 12, color: C.muted }}>{hint}</p>}
    </div>
  );
}

function Toggle({ label, desc, defaultOn }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderBottom: `1px solid ${C.border}` }}>
      <div>
        <div style={{ fontSize: 14, fontWeight: 500, color: C.text }}>{label}</div>
        {desc && <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>{desc}</div>}
      </div>
      <div onClick={() => setOn(!on)} style={{ width: 42, height: 24, borderRadius: 12, background: on ? C.purple : "#ffffff15", cursor: "pointer", position: "relative", transition: "background 0.2s", flexShrink: 0 }}>
        <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#fff", position: "absolute", top: 3, left: on ? 21 : 3, transition: "left 0.2s", boxShadow: "0 1px 4px #00000040" }} />
      </div>
    </div>
  );
}

function Section({ title, desc, children }) {
  return (
    <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: "24px 26px", marginBottom: 16 }}>
      <div style={{ marginBottom: 20, paddingBottom: 16, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ fontWeight: 700, fontSize: 15, color: C.text }}>{title}</div>
        {desc && <div style={{ fontSize: 13, color: C.muted, marginTop: 3 }}>{desc}</div>}
      </div>
      {children}
    </div>
  );
}

const tabs = [
  { id: "profile", label: "Profile", icon: "👤" },
  { id: "business", label: "Business", icon: "🏢" },
  { id: "notifications", label: "Notifications", icon: "🔔" },
  { id: "security", label: "Security", icon: "🔒" },
  { id: "billing", label: "Billing", icon: "💳" },
  { id: "integrations", label: "Integrations", icon: "🔗" },
  { id: "appearance", label: "Appearance", icon: "🎨" },
];

function ProfileTab() {
  return (
    <div>
      <Section title="Personal Information" desc="Update your name, email and profile photo">
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
          <div style={{ width: 72, height: 72, borderRadius: "50%", background: "linear-gradient(135deg,#6C5CE7,#A29BFE)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, fontWeight: 700, color: "#fff" }}>AM</div>
          <div>
            <button style={{ padding: "8px 16px", background: C.purple, border: "none", borderRadius: 8, color: "#fff", fontFamily: "inherit", fontSize: 13, fontWeight: 600, cursor: "pointer", marginRight: 8 }}>Upload photo</button>
            <button style={{ padding: "8px 16px", background: "transparent", border: `1px solid ${C.border}`, borderRadius: 8, color: C.muted, fontFamily: "inherit", fontSize: 13, cursor: "pointer" }}>Remove</button>
            <div style={{ fontSize: 11, color: C.muted, marginTop: 6 }}>JPG, PNG or GIF · Max 2MB</div>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
          <Input label="First name" value="Anna" />
          <Input label="Last name" value="Mari" />
        </div>
        <Input label="Email address" value="anna@tmccreatives.com" type="email" />
        <Input label="Phone number" value="+234 800 000 0000" type="tel" />
        <Input label="Bio" placeholder="Describe yourself..." hint="This appears on your public client portal" />
        <button style={{ padding: "11px 22px", background: "linear-gradient(135deg,#6C5CE7,#8B7FF0)", border: "none", borderRadius: 10, color: "#fff", fontFamily: "inherit", fontSize: 14, fontWeight: 700, cursor: "pointer", boxShadow: "0 4px 16px #6C5CE740" }}
          onClick={() => alert("Profile saved!")}>Save changes</button>
      </Section>

      <Section title="Social Links" desc="Connect your social profiles">
        {[["Instagram", "@tmccreatives"], ["TikTok", "@tmccreatives"], ["YouTube", "TMC Creatives"], ["Website", "www.tmccreatives.com"]].map(([label, ph]) => (
          <Input key={label} label={label} placeholder={ph} />
        ))}
        <button style={{ padding: "11px 22px", background: "linear-gradient(135deg,#6C5CE7,#8B7FF0)", border: "none", borderRadius: 10, color: "#fff", fontFamily: "inherit", fontSize: 14, fontWeight: 700, cursor: "pointer" }}
          onClick={() => alert("Links saved!")}>Save links</button>
      </Section>
    </div>
  );
}

function BusinessTab() {
  return (
    <div>
      <Section title="Business Information" desc="Your business details appear on invoices and client portal">
        <Input label="Business name" value="TMC Creatives" />
        <Input label="Business email" value="hello@tmccreatives.com" type="email" />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
          <Input label="City" value="Lagos" />
          <Input label="Country" value="Nigeria" />
        </div>
        <Input label="Business registration number" placeholder="RC 1234567" hint="Optional — shown on invoices if provided" />
        <Input label="Tax ID / VAT number" placeholder="NG12345678" />
        <button style={{ padding: "11px 22px", background: "linear-gradient(135deg,#6C5CE7,#8B7FF0)", border: "none", borderRadius: 10, color: "#fff", fontFamily: "inherit", fontSize: 14, fontWeight: 700, cursor: "pointer" }}
          onClick={() => alert("Business info saved!")}>Save changes</button>
      </Section>

      <Section title="Invoice Settings" desc="Default settings for new invoices">
        <Input label="Invoice prefix" value="INV-" hint="e.g. INV-001" />
        <Input label="Default payment terms" value="Net 14" hint="e.g. Net 7, Net 14, Net 30" />
        <Input label="Default tax rate (%)" value="7.5" type="number" />
        <Input label="Invoice footer note" placeholder="Thank you for your business!" />
        <button style={{ padding: "11px 22px", background: "linear-gradient(135deg,#6C5CE7,#8B7FF0)", border: "none", borderRadius: 10, color: "#fff", fontFamily: "inherit", fontSize: 14, fontWeight: 700, cursor: "pointer" }}
          onClick={() => alert("Invoice settings saved!")}>Save changes</button>
      </Section>
    </div>
  );
}

function NotificationsTab() {
  return (
    <Section title="Notification Preferences" desc="Choose what you get notified about">
      <Toggle label="New booking request" desc="Get notified when a client submits a booking" defaultOn={true} />
      <Toggle label="Invoice paid" desc="Get notified when a payment is received" defaultOn={true} />
      <Toggle label="Invoice overdue" desc="Reminder when an invoice passes its due date" defaultOn={true} />
      <Toggle label="New client message" desc="Get notified when a client sends a message" defaultOn={true} />
      <Toggle label="Project comment" desc="Notifications on project comments and approvals" defaultOn={false} />
      <Toggle label="Weekly summary email" desc="Receive a weekly business performance summary" defaultOn={true} />
      <Toggle label="Marketing & product updates" desc="News about new CreatorFlow features" defaultOn={false} />
    </Section>
  );
}

function SecurityTab() {
  const [show2FA, setShow2FA] = useState(false);
  return (
    <div>
      <Section title="Change Password" desc="Use a strong password to protect your account">
        <Input label="Current password" type="password" placeholder="••••••••" />
        <Input label="New password" type="password" placeholder="Min. 8 characters" />
        <Input label="Confirm new password" type="password" placeholder="••••••••" />
        <button style={{ padding: "11px 22px", background: "linear-gradient(135deg,#6C5CE7,#8B7FF0)", border: "none", borderRadius: 10, color: "#fff", fontFamily: "inherit", fontSize: 14, fontWeight: 700, cursor: "pointer" }}
          onClick={() => alert("Password updated!")}>Update password</button>
      </Section>

      <Section title="Two-Factor Authentication" desc="Add an extra layer of security to your account">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 14, color: C.text, marginBottom: 4 }}>Authenticator app</div>
            <div style={{ fontSize: 12, color: show2FA ? C.success : C.muted }}>{show2FA ? "✓ Enabled" : "Not enabled"}</div>
          </div>
          <button onClick={() => setShow2FA(!show2FA)} style={{ padding: "9px 18px", background: show2FA ? "#2E0D0D" : C.purple, border: `1px solid ${show2FA ? C.error : "transparent"}`, borderRadius: 9, color: show2FA ? C.error : "#fff", fontFamily: "inherit", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
            {show2FA ? "Disable 2FA" : "Enable 2FA"}
          </button>
        </div>
        {show2FA && (
          <div style={{ marginTop: 16, padding: "16px", background: "#6C5CE710", border: "1px solid #6C5CE730", borderRadius: 10 }}>
            <div style={{ fontSize: 13, color: C.purpleLight, fontWeight: 600, marginBottom: 6 }}>✓ 2FA is active</div>
            <div style={{ fontSize: 12, color: C.muted }}>Your account is protected with two-factor authentication.</div>
          </div>
        )}
      </Section>

      <Section title="Active Sessions" desc="Devices currently logged into your account">
        {[{ device: "MacBook Pro", location: "Lagos, Nigeria", time: "Active now", current: true }, { device: "iPhone 15", location: "Lagos, Nigeria", time: "2 hours ago", current: false }].map((s, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: i === 0 ? `1px solid ${C.border}` : "none" }}>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <span style={{ fontSize: 22 }}>{i === 0 ? "💻" : "📱"}</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{s.device}</div>
                <div style={{ fontSize: 11, color: C.muted, marginTop: 1 }}>{s.location} · {s.time}</div>
              </div>
            </div>
            {s.current ? <span style={{ fontSize: 11, color: C.success, fontWeight: 600 }}>Current</span> : <button style={{ fontSize: 12, color: C.error, background: "none", border: "none", cursor: "pointer", fontFamily: "inherit" }}>Sign out</button>}
          </div>
        ))}
      </Section>
    </div>
  );
}

function BillingTab() {
  return (
    <div>
      <Section title="Current Plan" desc="You are on the Professional plan">
        <div style={{ background: "linear-gradient(135deg,#1E1B3A,#251E45)", border: "1px solid #6C5CE730", borderRadius: 12, padding: "20px", marginBottom: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div style={{ fontSize: 18, fontWeight: 800, color: C.text }}>Professional</div>
              <div style={{ fontSize: 13, color: C.muted, marginTop: 3 }}>$49/month · Renews Jan 13, 2025</div>
            </div>
            <span style={{ fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 20, background: "#6C5CE730", color: C.purpleLight }}>ACTIVE</span>
          </div>
          <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid #ffffff0a", display: "flex", gap: 24 }}>
            {[["Clients", "Unlimited"], ["Projects", "Unlimited"], ["Team members", "3"], ["Storage", "50 GB"]].map(([k, v]) => (
              <div key={k}>
                <div style={{ fontSize: 14, fontWeight: 700, color: C.text }}>{v}</div>
                <div style={{ fontSize: 11, color: C.muted }}>{k}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button style={{ padding: "10px 18px", background: C.card, border: `1px solid ${C.border}`, borderRadius: 9, color: C.muted, fontFamily: "inherit", fontSize: 13, cursor: "pointer" }}>Cancel plan</button>
          <button style={{ padding: "10px 18px", background: "linear-gradient(135deg,#6C5CE7,#8B7FF0)", border: "none", borderRadius: 9, color: "#fff", fontFamily: "inherit", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Upgrade to Agency</button>
        </div>
      </Section>

      <Section title="Payment Method" desc="Manage your billing details">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 16px", background: C.bg, borderRadius: 10, marginBottom: 12 }}>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <span style={{ fontSize: 22 }}>💳</span>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>Visa ending in 4242</div>
              <div style={{ fontSize: 11, color: C.muted }}>Expires 08/26</div>
            </div>
          </div>
          <span style={{ fontSize: 11, color: C.success, fontWeight: 600 }}>Default</span>
        </div>
        <button style={{ padding: "10px 18px", background: C.card, border: `1px solid ${C.border}`, borderRadius: 9, color: C.text, fontFamily: "inherit", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>+ Add payment method</button>
      </Section>

      <Section title="Billing History" desc="Your past invoices and payments">
        {[["Dec 13, 2024", "Professional Plan", "$49.00", "Paid"], ["Nov 13, 2024", "Professional Plan", "$49.00", "Paid"], ["Oct 13, 2024", "Professional Plan", "$49.00", "Paid"]].map(([date, desc, amount, status], i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: i < 2 ? `1px solid ${C.border}` : "none" }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{desc}</div>
              <div style={{ fontSize: 11, color: C.muted, marginTop: 1 }}>{date}</div>
            </div>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: C.text }}>{amount}</span>
              <span style={{ fontSize: 11, color: C.success, fontWeight: 600 }}>{status}</span>
              <button style={{ fontSize: 12, color: C.purpleLight, background: "none", border: "none", cursor: "pointer", fontFamily: "inherit" }}>↓ PDF</button>
            </div>
          </div>
        ))}
      </Section>
    </div>
  );
}

function IntegrationsTab() {
  const integrations = [
    { name: "Stripe", desc: "Accept card payments from global clients", icon: "💳", connected: true, color: "#635BFF" },
    { name: "Paystack", desc: "Accept NGN payments from Nigerian clients", icon: "🟢", connected: false, color: "#00C48C" },
    { name: "Flutterwave", desc: "Multi-currency payments across Africa", icon: "🦋", connected: false, color: "#F5A623" },
    { name: "Google Calendar", desc: "Sync bookings with your Google Calendar", icon: "📅", connected: true, color: "#4285F4" },
    { name: "WhatsApp Business", desc: "Send booking confirmations via WhatsApp", icon: "💬", connected: false, color: "#25D366" },
    { name: "Dropbox", desc: "Store and share client files via Dropbox", icon: "📦", connected: false, color: "#0061FF" },
  ];
  return (
    <Section title="Connected Apps" desc="Manage your third-party integrations">
      {integrations.map((app, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 0", borderBottom: i < integrations.length - 1 ? `1px solid ${C.border}` : "none" }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: `${app.color}20`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{app.icon}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: C.text }}>{app.name}</div>
            <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>{app.desc}</div>
          </div>
          <button style={{ padding: "8px 16px", background: app.connected ? "#0D2E1A" : "linear-gradient(135deg,#6C5CE7,#8B7FF0)", border: `1px solid ${app.connected ? "#55EFC430" : "transparent"}`, borderRadius: 8, color: app.connected ? C.success : "#fff", fontFamily: "inherit", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
            {app.connected ? "✓ Connected" : "Connect"}
          </button>
        </div>
      ))}
    </Section>
  );
}

function AppearanceTab() {
  const [theme, setTheme] = useState("dark");
  const [accent, setAccent] = useState("#6C5CE7");
  const presets = ["#6C5CE7", "#E17055", "#00B894", "#0984E3", "#FDCB6E", "#E84393"];

  return (
    <div>
      <Section title="Theme" desc="Choose your preferred workspace appearance">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
          {[["dark", "🌙", "Dark", "Easy on the eyes"], ["light", "☀️", "Light", "Clean and bright"], ["system", "💻", "System", "Follows your OS"]].map(([id, icon, label, desc]) => (
            <div key={id} onClick={() => setTheme(id)} style={{ background: theme === id ? "#6C5CE715" : C.bg, border: `1.5px solid ${theme === id ? C.purple : C.border}`, borderRadius: 12, padding: "16px", cursor: "pointer", textAlign: "center", transition: "all 0.15s" }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>{icon}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: theme === id ? C.purpleLight : C.text }}>{label}</div>
              <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>{desc}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Accent Color" desc="Personalise your workspace color">
        <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
          {presets.map(c => (
            <div key={c} onClick={() => setAccent(c)} style={{ width: 36, height: 36, borderRadius: "50%", background: c, cursor: "pointer", border: `3px solid ${accent === c ? "#fff" : "transparent"}`, boxShadow: accent === c ? `0 0 0 2px ${c}` : "none", transition: "all 0.15s" }} />
          ))}
          <input type="color" value={accent} onChange={e => setAccent(e.target.value)} style={{ width: 36, height: 36, borderRadius: "50%", border: "none", cursor: "pointer", padding: 0 }} />
        </div>
        <div style={{ marginTop: 16, padding: "14px 16px", background: C.bg, borderRadius: 10, display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: accent, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>⚡</div>
          <span style={{ fontSize: 13, color: C.muted }}>Preview of your selected accent color</span>
          <button style={{ marginLeft: "auto", padding: "7px 14px", background: accent, border: "none", borderRadius: 7, color: "#fff", fontFamily: "inherit", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Sample button</button>
        </div>
        <button style={{ marginTop: 16, padding: "11px 22px", background: "linear-gradient(135deg,#6C5CE7,#8B7FF0)", border: "none", borderRadius: 10, color: "#fff", fontFamily: "inherit", fontSize: 14, fontWeight: 700, cursor: "pointer" }}
          onClick={() => alert("Appearance saved!")}>Save appearance</button>
      </Section>
    </div>
  );
}

const tabContent = { profile: <ProfileTab />, business: <BusinessTab />, notifications: <NotificationsTab />, security: <SecurityTab />, billing: <BillingTab />, integrations: <IntegrationsTab />, appearance: <AppearanceTab /> };

export default function Settings() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "'Inter', -apple-system, sans-serif", color: C.text }}>
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "36px 28px" }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, margin: "0 0 24px", letterSpacing: "-0.5px" }}>Settings</h1>

        <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: 20 }}>
          {/* Sidebar */}
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "10px", height: "fit-content" }}>
            {tabs.map(t => (
              <button key={t.id} onClick={() => setActiveTab(t.id)} style={{ display: "flex", alignItems: "center", gap: 9, width: "100%", padding: "10px 12px", border: "none", borderRadius: 9, background: activeTab === t.id ? "#6C5CE720" : "transparent", color: activeTab === t.id ? C.purpleLight : C.muted, fontFamily: "inherit", fontSize: 13.5, fontWeight: activeTab === t.id ? 600 : 400, cursor: "pointer", textAlign: "left", transition: "all 0.15s", marginBottom: 2 }}>
                <span style={{ fontSize: 15 }}>{t.icon}</span>
                {t.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div>{tabContent[activeTab]}</div>
        </div>
      </div>
    </div>
  );
}