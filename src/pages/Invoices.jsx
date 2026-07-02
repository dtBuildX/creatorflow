import { useState } from "react";

const C = {
  bg: "#0F0E17", panel: "#13111F", card: "#1A1828",
  border: "#ffffff0d", purple: "#6C5CE7", purpleLight: "#A29BFE",
  text: "#E8E6F0", muted: "#6B6784", success: "#55EFC4",
  warning: "#FDCB6E", error: "#FF7675",
};

const invoices = [
  { id: "INV-041", client: "Sophia Chen", email: "sophia@bloomweddings.com", service: "Wedding Videography", amount: 4800, due: "Dec 20, 2024", issued: "Dec 6, 2024", status: "Pending", avatar: "SC", color: "#6C5CE7", items: [{ desc: "Full wedding coverage (8hrs)", qty: 1, rate: 3500 }, { desc: "Same-day highlight reel", qty: 1, rate: 800 }, { desc: "Travel & accommodation", qty: 1, rate: 500 }] },
  { id: "INV-040", client: "Marcus Williams", email: "marcus@visionstudios.io", service: "Brand Film", amount: 2200, due: "Dec 10, 2024", issued: "Nov 26, 2024", status: "Overdue", avatar: "MW", color: "#00B894", items: [{ desc: "Brand film production (2 days)", qty: 1, rate: 1800 }, { desc: "Color grading", qty: 1, rate: 400 }] },
  { id: "INV-039", client: "Lena Okafor", email: "lena@auroramedia.ng", service: "Social Media Retainer", amount: 950, due: "Dec 1, 2024", issued: "Nov 18, 2024", status: "Paid", avatar: "LO", color: "#E17055", items: [{ desc: "Monthly social media management", qty: 1, rate: 950 }] },
  { id: "INV-038", client: "James Park", email: "james@evergreeneventss.com", service: "Engagement Shoot", amount: 1500, due: "Nov 28, 2024", issued: "Nov 14, 2024", status: "Paid", avatar: "JP", color: "#FDCB6E", items: [{ desc: "Engagement photo & video session", qty: 1, rate: 1200 }, { desc: "Edited highlight video", qty: 1, rate: 300 }] },
  { id: "INV-037", client: "Aria Patel", email: "aria@novaprod.co", service: "YouTube Production", amount: 1800, due: "Dec 28, 2024", issued: "Dec 14, 2024", status: "Pending", avatar: "AP", color: "#74B9FF", items: [{ desc: "Podcast episode production (x3)", qty: 3, rate: 500 }, { desc: "Thumbnail design", qty: 3, rate: 100 }] },
  { id: "INV-036", client: "Bloom Weddings", email: "hello@bloomweddings.com", service: "Agency — Nov", amount: 8200, due: "Nov 15, 2024", issued: "Nov 1, 2024", status: "Paid", avatar: "BW", color: "#A29BFE", items: [{ desc: "4x Wedding coverage packages", qty: 4, rate: 2050 }] },
];

const statusColors = {
  Paid: { bg: "#0D2E1A", text: "#55EFC4", dot: "#55EFC4" },
  Pending: { bg: "#1A1020", text: "#A29BFE", dot: "#A29BFE" },
  Overdue: { bg: "#2E0D0D", text: "#FF7675", dot: "#FF7675" },
};

const Badge = ({ status }) => {
  const s = statusColors[status];
  return (
    <span style={{ background: s.bg, color: s.text, border: `1px solid ${s.dot}33`, borderRadius: 20, padding: "3px 10px", fontSize: 11, fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 5, whiteSpace: "nowrap" }}>
      <span style={{ width: 5, height: 5, borderRadius: "50%", background: s.dot }} />{status}
    </span>
  );
};

function InvoiceDetail({ invoice, onClose }) {
  const subtotal = invoice.items.reduce((s, i) => s + i.qty * i.rate, 0);
  const tax = Math.round(subtotal * 0.075);
  const total = subtotal + tax;

  return (
    <div style={{ position: "fixed", inset: 0, background: "#000000bb", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center" }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{ background: C.panel, border: `1px solid ${C.border}`, borderRadius: 18, width: 540, maxHeight: "90vh", overflowY: "auto", boxShadow: "0 24px 80px #00000090" }}>
        {/* Invoice header */}
        <div style={{ padding: "28px 28px 20px", borderBottom: `1px solid ${C.border}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 16 }}>
                <div style={{ width: 30, height: 30, borderRadius: 8, background: "linear-gradient(135deg,#6C5CE7,#A29BFE)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13 }}>⚡</div>
                <span style={{ fontWeight: 800, fontSize: 14, color: C.text }}>CreatorFlow</span>
              </div>
              <div style={{ fontSize: 22, fontWeight: 900, color: C.text, letterSpacing: "-0.5px" }}>{invoice.id}</div>
              <div style={{ fontSize: 12, color: C.muted, marginTop: 4 }}>Issued {invoice.issued} · Due {invoice.due}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <Badge status={invoice.status} />
              <div style={{ fontSize: 28, fontWeight: 900, color: C.text, marginTop: 12, letterSpacing: "-1px" }}>${total.toLocaleString()}</div>
            </div>
          </div>
        </div>

        {/* Bill to */}
        <div style={{ padding: "20px 28px", borderBottom: `1px solid ${C.border}` }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 8 }}>Bill to</div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: `${invoice.color}25`, color: invoice.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700 }}>{invoice.avatar}</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14, color: C.text }}>{invoice.client}</div>
              <div style={{ fontSize: 12, color: C.muted }}>{invoice.email}</div>
            </div>
          </div>
        </div>

        {/* Line items */}
        <div style={{ padding: "20px 28px", borderBottom: `1px solid ${C.border}` }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 12 }}>Services</div>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                {["Description", "Qty", "Rate", "Amount"].map(h => (
                  <th key={h} style={{ textAlign: h === "Description" ? "left" : "right", padding: "0 0 8px", fontSize: 11, color: C.muted, fontWeight: 600 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((item, i) => (
                <tr key={i} style={{ borderBottom: `1px solid ${C.border}22` }}>
                  <td style={{ padding: "11px 0", fontSize: 13, color: C.text }}>{item.desc}</td>
                  <td style={{ padding: "11px 0", fontSize: 13, color: C.muted, textAlign: "right" }}>{item.qty}</td>
                  <td style={{ padding: "11px 0", fontSize: 13, color: C.muted, textAlign: "right" }}>${item.rate.toLocaleString()}</td>
                  <td style={{ padding: "11px 0", fontSize: 13, fontWeight: 600, color: C.text, textAlign: "right" }}>${(item.qty * item.rate).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div style={{ padding: "16px 28px", borderBottom: `1px solid ${C.border}` }}>
          {[["Subtotal", `$${subtotal.toLocaleString()}`], ["Tax (7.5%)", `$${tax.toLocaleString()}`]].map(([k, v]) => (
            <div key={k} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ fontSize: 13, color: C.muted }}>{k}</span>
              <span style={{ fontSize: 13, color: C.muted }}>{v}</span>
            </div>
          ))}
          <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 10, borderTop: `1px solid ${C.border}`, marginTop: 6 }}>
            <span style={{ fontSize: 15, fontWeight: 700, color: C.text }}>Total</span>
            <span style={{ fontSize: 18, fontWeight: 900, color: C.text }}>${total.toLocaleString()}</span>
          </div>
        </div>

        {/* Actions */}
        <div style={{ padding: "20px 28px", display: "flex", gap: 10 }}>
          <button onClick={onClose} style={{ flex: 1, padding: "11px", background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, color: C.muted, fontFamily: "inherit", fontSize: 13, cursor: "pointer" }}>← Back</button>
          {invoice.status !== "Paid" && (
            <button onClick={() => alert("Payment link sent!")} style={{ flex: 1, padding: "11px", background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, color: C.text, fontFamily: "inherit", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>📧 Send reminder</button>
          )}
          <button onClick={() => alert("Downloading PDF...")} style={{ flex: 1, padding: "11px", background: "linear-gradient(135deg,#6C5CE7,#8B7FF0)", border: "none", borderRadius: 10, color: "#fff", fontFamily: "inherit", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>⬇ Download PDF</button>
        </div>
      </div>
    </div>
  );
}

export default function Invoices() {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(null);
  const [showNew, setShowNew] = useState(false);

  const filters = ["All", "Pending", "Paid", "Overdue"];
  const filtered = filter === "All" ? invoices : invoices.filter(i => i.status === filter);

  const total = invoices.reduce((s, i) => s + i.amount, 0);
  const paid = invoices.filter(i => i.status === "Paid").reduce((s, i) => s + i.amount, 0);
  const pending = invoices.filter(i => i.status === "Pending").reduce((s, i) => s + i.amount, 0);
  const overdue = invoices.filter(i => i.status === "Overdue").reduce((s, i) => s + i.amount, 0);

  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "'Inter', -apple-system, sans-serif", color: C.text }}>
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "36px 28px" }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 800, margin: "0 0 4px", letterSpacing: "-0.5px" }}>Invoices</h1>
            <p style={{ margin: 0, fontSize: 13, color: C.muted }}>{invoices.length} total · {invoices.filter(i => i.status === "Overdue").length} overdue</p>
          </div>
          <button onClick={() => setShowNew(true)} style={{ padding: "10px 18px", background: "linear-gradient(135deg,#6C5CE7,#8B7FF0)", border: "none", borderRadius: 10, color: "#fff", fontFamily: "inherit", fontSize: 13, fontWeight: 700, cursor: "pointer", boxShadow: "0 4px 16px #6C5CE740" }}>
            + New invoice
          </button>
        </div>

        {/* KPI cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 24 }}>
          {[
            { label: "Total invoiced", value: `$${total.toLocaleString()}`, color: C.purpleLight, icon: "📊" },
            { label: "Paid", value: `$${paid.toLocaleString()}`, color: C.success, icon: "✅" },
            { label: "Pending", value: `$${pending.toLocaleString()}`, color: C.warning, icon: "⏳" },
            { label: "Overdue", value: `$${overdue.toLocaleString()}`, color: C.error, icon: "⚠️" },
          ].map((k, i) => (
            <div key={i} style={{ background: C.card, border: `1px solid ${i === 3 && overdue > 0 ? C.error + "33" : C.border}`, borderRadius: 12, padding: "16px 18px" }}>
              <div style={{ fontSize: 20, marginBottom: 8 }}>{k.icon}</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: k.color, letterSpacing: "-0.5px" }}>{k.value}</div>
              <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>{k.label}</div>
            </div>
          ))}
        </div>

        {/* Overdue banner */}
        {overdue > 0 && (
          <div style={{ background: "#2E0D0D", border: "1px solid #FF767530", borderRadius: 12, padding: "14px 18px", marginBottom: 20, display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 18 }}>⚠️</span>
            <div style={{ flex: 1 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: C.error }}>You have ${overdue.toLocaleString()} in overdue invoices.</span>
              <span style={{ fontSize: 13, color: C.muted }}> Send reminders to avoid payment delays.</span>
            </div>
            <button onClick={() => alert("Reminders sent to all overdue clients!")} style={{ padding: "7px 14px", background: C.error, border: "none", borderRadius: 8, color: "#fff", fontFamily: "inherit", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Send reminders</button>
          </div>
        )}

        {/* Filters */}
        <div style={{ display: "flex", gap: 6, marginBottom: 18 }}>
          {filters.map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{ padding: "8px 16px", borderRadius: 9, border: "none", background: filter === f ? C.purple : C.card, color: filter === f ? "#fff" : C.muted, fontFamily: "inherit", fontSize: 12, fontWeight: filter === f ? 600 : 400, cursor: "pointer", border: `1px solid ${filter === f ? "transparent" : C.border}` }}>{f}</button>
          ))}
          <span style={{ marginLeft: "auto", fontSize: 12, color: C.muted, display: "flex", alignItems: "center" }}>{filtered.length} invoice{filtered.length !== 1 ? "s" : ""}</span>
        </div>

        {/* Table */}
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                {["Invoice", "Client", "Service", "Amount", "Due Date", "Status", ""].map(h => (
                  <th key={h} style={{ textAlign: "left", padding: "14px 18px", fontSize: 11, fontWeight: 600, color: C.muted, textTransform: "uppercase", letterSpacing: "0.5px" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((inv, i) => (
                <tr key={inv.id} style={{ borderBottom: i < filtered.length - 1 ? `1px solid ${C.border}33` : "none" }}
                  onMouseEnter={e => e.currentTarget.style.background = "#ffffff04"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                  <td style={{ padding: "14px 18px" }}>
                    <div style={{ fontWeight: 700, fontSize: 13, color: C.purpleLight }}>{inv.id}</div>
                    <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>Issued {inv.issued}</div>
                  </td>
                  <td style={{ padding: "14px 18px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                      <div style={{ width: 30, height: 30, borderRadius: "50%", background: `${inv.color}25`, color: inv.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700 }}>{inv.avatar}</div>
                      <span style={{ fontSize: 13, fontWeight: 500, color: C.text }}>{inv.client}</span>
                    </div>
                  </td>
                  <td style={{ padding: "14px 18px", fontSize: 13, color: C.muted }}>{inv.service}</td>
                  <td style={{ padding: "14px 18px", fontWeight: 800, fontSize: 15, color: C.text }}>${inv.amount.toLocaleString()}</td>
                  <td style={{ padding: "14px 18px", fontSize: 12, color: inv.status === "Overdue" ? C.error : C.muted }}>{inv.due}</td>
                  <td style={{ padding: "14px 18px" }}><Badge status={inv.status} /></td>
                  <td style={{ padding: "14px 18px" }}>
                    <button onClick={() => setSelected(inv)} style={{ background: "#6C5CE715", border: "1px solid #6C5CE730", borderRadius: 7, padding: "6px 12px", color: C.purpleLight, fontFamily: "inherit", fontSize: 12, cursor: "pointer", fontWeight: 600 }}>View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selected && <InvoiceDetail invoice={selected} onClose={() => setSelected(null)} />}

      {showNew && (
        <div style={{ position: "fixed", inset: 0, background: "#000000bb", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => setShowNew(false)}>
          <div onClick={e => e.stopPropagation()} style={{ background: C.panel, border: `1px solid ${C.border}`, borderRadius: 18, padding: "32px", width: 480, boxShadow: "0 24px 80px #00000090" }}>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: C.text, margin: "0 0 20px" }}>New invoice</h2>
            {[["Client name", "Sophia Chen"], ["Service description", "Wedding Videography"], ["Amount ($)", "4800"], ["Due date", "Dec 20, 2024"]].map(([label, ph]) => (
              <div key={label} style={{ marginBottom: 14 }}>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 6 }}>{label}</label>
                <input placeholder={ph} style={{ width: "100%", boxSizing: "border-box", background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "11px 14px", color: C.text, fontFamily: "inherit", fontSize: 13, outline: "none" }} />
              </div>
            ))}
            <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
              <button onClick={() => setShowNew(false)} style={{ flex: 1, padding: "12px", background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, color: C.muted, fontFamily: "inherit", fontSize: 14, cursor: "pointer" }}>Cancel</button>
              <button onClick={() => { alert("Invoice created!"); setShowNew(false); }} style={{ flex: 2, padding: "12px", background: "linear-gradient(135deg,#6C5CE7,#8B7FF0)", border: "none", borderRadius: 10, color: "#fff", fontFamily: "inherit", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>Create invoice</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}