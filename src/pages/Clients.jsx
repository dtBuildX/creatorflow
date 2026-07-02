import { useState } from "react";

const C = {
  bg: "#0F0E17", panel: "#13111F", card: "#1A1828",
  border: "#ffffff0d", purple: "#6C5CE7", purpleLight: "#A29BFE",
  text: "#E8E6F0", muted: "#6B6784", success: "#55EFC4",
  warning: "#FDCB6E", error: "#FF7675",
};

const allClients = [
  { id: 1, name: "Sophia Chen", email: "sophia@bloomweddings.com", phone: "+1 310 555 0192", type: "Wedding", amount: "$4,800", status: "Active", avatar: "SC", color: "#6C5CE7", date: "Dec 14, 2024", projects: 3, invoices: 2, tags: ["VIP", "Repeat"], location: "Los Angeles, USA", notes: "Prefers communication via WhatsApp. Very detail-oriented client." },
  { id: 2, name: "Marcus Williams", email: "marcus@visionstudios.io", phone: "+44 20 7946 0321", type: "Brand Film", amount: "$2,200", status: "In Review", avatar: "MW", color: "#00B894", date: "Dec 18, 2024", projects: 1, invoices: 1, tags: ["New"], location: "London, UK", notes: "Working on Nike campaign launch. Deadline is strict." },
  { id: 3, name: "Lena Okafor", email: "lena@auroramedia.ng", phone: "+234 801 234 5678", type: "Social Media", amount: "$950/mo", status: "Active", avatar: "LO", color: "#E17055", date: "Ongoing", projects: 2, invoices: 4, tags: ["Retainer", "VIP"], location: "Lagos, Nigeria", notes: "Monthly retainer client. Delivers content brief on the 1st of every month." },
  { id: 4, name: "James Park", email: "james@evergreeneventss.com", phone: "+1 415 555 0847", type: "Wedding", amount: "$5,500", status: "Upcoming", avatar: "JP", color: "#FDCB6E", date: "Jan 6, 2025", projects: 1, invoices: 1, tags: ["New"], location: "San Francisco, USA", notes: "Engagement shoot first, full wedding in June." },
  { id: 5, name: "Aria Patel", email: "aria@novaprod.co", phone: "+1 646 555 0374", type: "YouTube", amount: "$1,800", status: "Pending", avatar: "AP", color: "#74B9FF", date: "Dec 28, 2024", projects: 1, invoices: 1, tags: ["New"], location: "New York, USA", notes: "YouTube podcast series — 6 episodes." },
  { id: 6, name: "Bloom Weddings", email: "hello@bloomweddings.com", phone: "+1 310 555 0011", type: "Wedding", amount: "$8,200", status: "Active", avatar: "BW", color: "#A29BFE", date: "Nov 20, 2024", projects: 4, invoices: 3, tags: ["Agency", "VIP"], location: "Los Angeles, USA", notes: "Agency account — handles multiple wedding bookings per month." },
];

const statusColors = {
  Active: { bg: "#0D2E1A", text: "#55EFC4", dot: "#55EFC4" },
  "In Review": { bg: "#1E1A00", text: "#FDCB6E", dot: "#FDCB6E" },
  Upcoming: { bg: "#0D1A2E", text: "#74B9FF", dot: "#74B9FF" },
  Pending: { bg: "#1A1020", text: "#A29BFE", dot: "#A29BFE" },
};

const Badge = ({ status }) => {
  const s = statusColors[status] || statusColors["Pending"];
  return (
    <span style={{ background: s.bg, color: s.text, border: `1px solid ${s.dot}33`, borderRadius: 20, padding: "3px 10px", fontSize: 11, fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 5, whiteSpace: "nowrap" }}>
      <span style={{ width: 5, height: 5, borderRadius: "50%", background: s.dot }} />{status}
    </span>
  );
};

function ClientCard({ client, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div onClick={() => onClick(client)} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ background: hovered ? "#1E1C2E" : C.card, border: `1px solid ${hovered ? "#6C5CE730" : C.border}`, borderRadius: 14, padding: "20px", cursor: "pointer", transition: "all 0.2s" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 46, height: 46, borderRadius: "50%", background: `${client.color}25`, color: client.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, flexShrink: 0 }}>{client.avatar}</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 14, color: C.text }}>{client.name}</div>
            <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>{client.email}</div>
          </div>
        </div>
        <Badge status={client.status} />
      </div>
      <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
        {client.tags.map(t => (
          <span key={t} style={{ fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 20, background: "#6C5CE715", color: C.purpleLight, border: "1px solid #6C5CE720" }}>{t}</span>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 12, borderTop: `1px solid ${C.border}` }}>
        <div>
          <div style={{ fontSize: 18, fontWeight: 800, color: C.text, letterSpacing: "-0.5px" }}>{client.amount}</div>
          <div style={{ fontSize: 11, color: C.muted, marginTop: 1 }}>{client.type}</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 12, color: C.muted }}>{client.projects} projects · {client.invoices} invoices</div>
          <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>📍 {client.location}</div>
        </div>
      </div>
    </div>
  );
}

function ClientDetail({ client, onClose }) {
  const [tab, setTab] = useState("overview");
  const tabs = ["overview", "projects", "invoices", "notes"];

  return (
    <div style={{ position: "fixed", inset: 0, background: "#000000aa", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "flex-end" }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{ width: 440, height: "100vh", background: C.panel, borderLeft: `1px solid ${C.border}`, padding: "28px 28px", overflowY: "auto" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: C.muted }}>Client Profile</div>
          <button onClick={onClose} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, width: 30, height: 30, cursor: "pointer", color: C.muted, fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>
        </div>

        {/* Avatar + name */}
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
          <div style={{ width: 60, height: 60, borderRadius: "50%", background: `${client.color}25`, color: client.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 700 }}>{client.avatar}</div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 18, color: C.text }}>{client.name}</div>
            <div style={{ fontSize: 13, color: C.muted, marginTop: 2 }}>{client.type} · {client.location}</div>
          </div>
        </div>

        <Badge status={client.status} />

        {/* Contact info */}
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: "16px", margin: "18px 0" }}>
          {[["📧", client.email], ["📞", client.phone], ["📅", `Since ${client.date}`]].map(([icon, val], i) => (
            <div key={i} style={{ display: "flex", gap: 10, marginBottom: i < 2 ? 10 : 0 }}>
              <span style={{ fontSize: 14 }}>{icon}</span>
              <span style={{ fontSize: 13, color: C.muted }}>{val}</span>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginBottom: 20 }}>
          {[["💰", client.amount, "Value"], ["🗂", client.projects, "Projects"], ["📄", client.invoices, "Invoices"]].map(([icon, val, label], i) => (
            <div key={i} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "12px", textAlign: "center" }}>
              <div style={{ fontSize: 16, marginBottom: 4 }}>{icon}</div>
              <div style={{ fontWeight: 800, fontSize: 15, color: C.text }}>{val}</div>
              <div style={{ fontSize: 11, color: C.muted }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 4, marginBottom: 18, background: C.card, borderRadius: 10, padding: 4 }}>
          {tabs.map(t => (
            <button key={t} onClick={() => setTab(t)} style={{ flex: 1, padding: "7px", border: "none", borderRadius: 7, background: tab === t ? C.purple : "transparent", color: tab === t ? "#fff" : C.muted, fontFamily: "inherit", fontSize: 12, fontWeight: tab === t ? 600 : 400, cursor: "pointer", textTransform: "capitalize", transition: "all 0.15s" }}>{t}</button>
          ))}
        </div>

        {tab === "overview" && (
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 10 }}>Tags</div>
            <div style={{ display: "flex", gap: 6, marginBottom: 20 }}>
              {client.tags.map(t => (
                <span key={t} style={{ fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 20, background: "#6C5CE715", color: C.purpleLight, border: "1px solid #6C5CE720" }}>{t}</span>
              ))}
              <button style={{ fontSize: 11, padding: "4px 10px", borderRadius: 20, background: C.card, border: `1px solid ${C.border}`, color: C.muted, cursor: "pointer", fontFamily: "inherit" }}>+ Add tag</button>
            </div>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 8 }}>Notes</div>
            <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "14px", fontSize: 13, color: C.muted, lineHeight: 1.6 }}>{client.notes}</div>
          </div>
        )}
        {tab === "projects" && (
          <div>
            {Array.from({ length: client.projects }).map((_, i) => (
              <div key={i} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "14px", marginBottom: 10 }}>
                <div style={{ fontWeight: 600, fontSize: 13, color: C.text, marginBottom: 6 }}>Project {i + 1} — {client.type} {["Film", "Shoot", "Series"][i % 3]}</div>
                <div style={{ height: 4, background: "#ffffff0a", borderRadius: 4 }}>
                  <div style={{ height: "100%", width: `${[78, 45, 90][i % 3]}%`, background: C.purple, borderRadius: 4 }} />
                </div>
                <div style={{ fontSize: 11, color: C.muted, marginTop: 6 }}>{[78, 45, 90][i % 3]}% complete</div>
              </div>
            ))}
          </div>
        )}
        {tab === "invoices" && (
          <div>
            {Array.from({ length: client.invoices }).map((_, i) => (
              <div key={i} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "14px", marginBottom: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 13, color: C.text }}>INV-{String(40 - i).padStart(3, "0")}</div>
                  <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>Dec {10 + i}, 2024</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontWeight: 700, fontSize: 14, color: C.text }}>{client.amount}</div>
                  <span style={{ fontSize: 10, color: i === 0 ? C.warning : C.success, fontWeight: 700 }}>{i === 0 ? "Pending" : "Paid"}</span>
                </div>
              </div>
            ))}
          </div>
        )}
        {tab === "notes" && (
          <div>
            <textarea defaultValue={client.notes} style={{ width: "100%", boxSizing: "border-box", background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "14px", color: C.text, fontFamily: "inherit", fontSize: 13, lineHeight: 1.6, minHeight: 140, outline: "none", resize: "vertical" }} />
            <button style={{ marginTop: 10, padding: "10px 18px", background: C.purple, border: "none", borderRadius: 9, color: "#fff", fontFamily: "inherit", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Save notes</button>
          </div>
        )}

        {/* Actions */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 24 }}>
          <button style={{ padding: "11px", background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, color: C.text, fontFamily: "inherit", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>📄 New invoice</button>
          <button style={{ padding: "11px", background: "linear-gradient(135deg,#6C5CE7,#8B7FF0)", border: "none", borderRadius: 10, color: "#fff", fontFamily: "inherit", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>💬 Message</button>
        </div>
      </div>
    </div>
  );
}

export default function Clients() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [view, setView] = useState("grid");
  const [selected, setSelected] = useState(null);
  const [showAdd, setShowAdd] = useState(false);

  const statuses = ["All", "Active", "Upcoming", "Pending", "In Review"];
  const filtered = allClients.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.type.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || c.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "'Inter', -apple-system, sans-serif", color: C.text }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "36px 28px" }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 }}>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 800, margin: "0 0 4px", letterSpacing: "-0.5px" }}>Clients</h1>
            <p style={{ margin: 0, fontSize: 13, color: C.muted }}>{allClients.length} total · {allClients.filter(c => c.status === "Active").length} active</p>
          </div>
          <button onClick={() => setShowAdd(true)} style={{ padding: "10px 18px", background: "linear-gradient(135deg,#6C5CE7,#8B7FF0)", border: "none", borderRadius: 10, color: "#fff", fontFamily: "inherit", fontSize: 13, fontWeight: 700, cursor: "pointer", boxShadow: "0 4px 16px #6C5CE740", display: "flex", alignItems: "center", gap: 7 }}>
            + Add client
          </button>
        </div>

        {/* KPIs */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 24 }}>
          {[{ label: "Total clients", value: allClients.length, icon: "👥" }, { label: "Active", value: allClients.filter(c => c.status === "Active").length, icon: "✅" }, { label: "Total value", value: "$23,250", icon: "💰" }, { label: "Avg. rating", value: "4.9★", icon: "⭐" }].map((k, i) => (
            <div key={i} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: "16px 18px" }}>
              <div style={{ fontSize: 20, marginBottom: 8 }}>{k.icon}</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: C.text, letterSpacing: "-0.5px" }}>{k.value}</div>
              <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>{k.label}</div>
            </div>
          ))}
        </div>

        {/* Filters + search */}
        <div style={{ display: "flex", gap: 10, marginBottom: 20, alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 200, position: "relative" }}>
            <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: C.muted, fontSize: 14 }}>🔍</span>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search clients..." style={{ width: "100%", boxSizing: "border-box", background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 14px 10px 36px", color: C.text, fontFamily: "inherit", fontSize: 13, outline: "none" }} />
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            {statuses.map(s => (
              <button key={s} onClick={() => setFilter(s)} style={{ padding: "8px 14px", borderRadius: 9, border: "none", background: filter === s ? C.purple : C.card, color: filter === s ? "#fff" : C.muted, fontFamily: "inherit", fontSize: 12, fontWeight: filter === s ? 600 : 400, cursor: "pointer", border: `1px solid ${filter === s ? "transparent" : C.border}` }}>{s}</button>
            ))}
          </div>
          <div style={{ display: "flex", background: C.card, border: `1px solid ${C.border}`, borderRadius: 9, overflow: "hidden" }}>
            {[["⊞", "grid"], ["☰", "list"]].map(([icon, v]) => (
              <button key={v} onClick={() => setView(v)} style={{ padding: "8px 12px", border: "none", background: view === v ? C.purple : "transparent", color: view === v ? "#fff" : C.muted, cursor: "pointer", fontSize: 15 }}>{icon}</button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <div style={{ fontSize: 12, color: C.muted, marginBottom: 16 }}>{filtered.length} client{filtered.length !== 1 ? "s" : ""} found</div>

        {/* Grid view */}
        {view === "grid" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px,1fr))", gap: 14 }}>
            {filtered.map(c => <ClientCard key={c.id} client={c} onClick={setSelected} />)}
          </div>
        )}

        {/* List view */}
        {view === "list" && (
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                  {["Client", "Type", "Value", "Location", "Projects", "Status", ""].map(h => (
                    <th key={h} style={{ textAlign: "left", padding: "12px 16px", fontSize: 11, fontWeight: 600, color: C.muted, textTransform: "uppercase", letterSpacing: "0.5px" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(c => (
                  <tr key={c.id} onClick={() => setSelected(c)} style={{ borderBottom: `1px solid ${C.border}33`, cursor: "pointer" }}
                    onMouseEnter={e => e.currentTarget.style.background = "#ffffff04"}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                    <td style={{ padding: "13px 16px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ width: 32, height: 32, borderRadius: "50%", background: `${c.color}25`, color: c.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700 }}>{c.avatar}</div>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: 13.5, color: C.text }}>{c.name}</div>
                          <div style={{ fontSize: 11, color: C.muted }}>{c.email}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: "13px 16px", fontSize: 13, color: C.muted }}>{c.type}</td>
                    <td style={{ padding: "13px 16px", fontWeight: 700, fontSize: 14, color: C.text }}>{c.amount}</td>
                    <td style={{ padding: "13px 16px", fontSize: 12, color: C.muted }}>{c.location}</td>
                    <td style={{ padding: "13px 16px", fontSize: 13, color: C.muted, textAlign: "center" }}>{c.projects}</td>
                    <td style={{ padding: "13px 16px" }}><Badge status={c.status} /></td>
                    <td style={{ padding: "13px 16px", fontSize: 16, color: C.muted, cursor: "pointer" }}>›</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "80px 20px" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>👥</div>
            <div style={{ fontWeight: 700, fontSize: 16, color: C.text, marginBottom: 6 }}>No clients found</div>
            <div style={{ fontSize: 13, color: C.muted }}>Try adjusting your search or filter</div>
          </div>
        )}
      </div>

      {/* Detail drawer */}
      {selected && <ClientDetail client={selected} onClose={() => setSelected(null)} />}

      {/* Add client modal */}
      {showAdd && (
        <div style={{ position: "fixed", inset: 0, background: "#000000aa", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => setShowAdd(false)}>
          <div onClick={e => e.stopPropagation()} style={{ background: C.panel, border: `1px solid ${C.border}`, borderRadius: 18, padding: "32px", width: 480, boxShadow: "0 24px 80px #00000080" }}>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: C.text, margin: "0 0 20px" }}>Add new client</h2>
            {[["Full name", "Sophia Chen"], ["Email address", "sophia@studio.com"], ["Phone number", "+1 310 555 0000"], ["Service type", "Wedding Videography"]].map(([label, ph]) => (
              <div key={label} style={{ marginBottom: 14 }}>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 6 }}>{label}</label>
                <input placeholder={ph} style={{ width: "100%", boxSizing: "border-box", background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "11px 14px", color: C.text, fontFamily: "inherit", fontSize: 13, outline: "none" }} />
              </div>
            ))}
            <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
              <button onClick={() => setShowAdd(false)} style={{ flex: 1, padding: "12px", background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, color: C.muted, fontFamily: "inherit", fontSize: 14, cursor: "pointer" }}>Cancel</button>
              <button onClick={() => { alert("Client added!"); setShowAdd(false); }} style={{ flex: 2, padding: "12px", background: "linear-gradient(135deg,#6C5CE7,#8B7FF0)", border: "none", borderRadius: 10, color: "#fff", fontFamily: "inherit", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>Add client</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}