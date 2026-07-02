import { useState } from "react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from "recharts";

const C = {
  bg: "#0F0E17", panel: "#13111F", card: "#1A1828",
  border: "#ffffff0d", purple: "#6C5CE7", purpleLight: "#A29BFE",
  text: "#E8E6F0", muted: "#6B6784", success: "#55EFC4",
  warning: "#FDCB6E", error: "#FF7675",
};

const revenueData = [
  { month: "Jan", revenue: 4200, expenses: 1100 },
  { month: "Feb", revenue: 5800, expenses: 1300 },
  { month: "Mar", revenue: 4900, expenses: 980 },
  { month: "Apr", revenue: 7200, expenses: 1600 },
  { month: "May", revenue: 6100, expenses: 1200 },
  { month: "Jun", revenue: 8400, expenses: 1800 },
  { month: "Jul", revenue: 9200, expenses: 2100 },
  { month: "Aug", revenue: 7800, expenses: 1700 },
  { month: "Sep", revenue: 10500, expenses: 2300 },
  { month: "Oct", revenue: 9800, expenses: 2000 },
  { month: "Nov", revenue: 11200, expenses: 2400 },
  { month: "Dec", revenue: 13400, expenses: 2800 },
];

const serviceData = [
  { name: "Wedding Films", value: 42, color: "#6C5CE7" },
  { name: "Brand Videos", value: 28, color: "#A29BFE" },
  { name: "Social Content", value: 18, color: "#74B9FF" },
  { name: "Photography", value: 12, color: "#55EFC4" },
];

const clients = [
  { id: 1, name: "Sophia Chen", type: "Wedding", amount: "$4,800", status: "Active", avatar: "SC", color: "#6C5CE7", date: "Dec 14" },
  { id: 2, name: "Marcus Williams", type: "Brand Film", amount: "$2,200", status: "In Review", avatar: "MW", color: "#00B894", date: "Dec 18" },
  { id: 3, name: "Lena Okafor", type: "Social Media", amount: "$950/mo", status: "Active", avatar: "LO", color: "#E17055", date: "Ongoing" },
  { id: 4, name: "James Park", type: "Wedding", amount: "$5,500", status: "Upcoming", avatar: "JP", color: "#FDCB6E", date: "Jan 6" },
  { id: 5, name: "Aria Patel", type: "YouTube", amount: "$1,800", status: "Pending", avatar: "AP", color: "#74B9FF", date: "Dec 28" },
];

const bookings = [
  { time: "09:00", client: "Sophia Chen", type: "Pre-wedding shoot", duration: "3h", status: "confirmed" },
  { time: "14:00", client: "James Park", type: "Site walkthrough", duration: "1h", status: "confirmed" },
  { time: "17:30", client: "Lena Okafor", type: "Content review call", duration: "45m", status: "pending" },
];

const projects = [
  { name: "Chen Wedding Film", progress: 78, due: "Dec 22", priority: "High", status: "Editing" },
  { name: "Elevate Brand Film", progress: 45, due: "Dec 30", priority: "Med", status: "Filming" },
  { name: "Lena Dec Content", progress: 90, due: "Dec 15", priority: "High", status: "Review" },
  { name: "Park Engagement", progress: 15, due: "Jan 20", priority: "Low", status: "Planning" },
];

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: "⊞" },
  { id: "clients", label: "Clients", icon: "👥", badge: 3 },
  { id: "bookings", label: "Bookings", icon: "📅", badge: 2 },
  { id: "projects", label: "Projects", icon: "🗂" },
  { id: "invoices", label: "Invoices", icon: "📄", badge: 1 },
  { id: "analytics", label: "Analytics", icon: "📊" },
  { id: "messages", label: "Messages", icon: "💬", badge: 5 },
  { id: "settings", label: "Settings", icon: "⚙" },
];

const statusColors = {
  Active: { bg: "#0D2E1A", text: "#55EFC4", dot: "#55EFC4" },
  "In Review": { bg: "#1E1A00", text: "#FDCB6E", dot: "#FDCB6E" },
  Upcoming: { bg: "#0D1A2E", text: "#74B9FF", dot: "#74B9FF" },
  Pending: { bg: "#1A1020", text: "#A29BFE", dot: "#A29BFE" },
  confirmed: { bg: "#0D2E1A", text: "#55EFC4", dot: "#55EFC4" },
  pending: { bg: "#1E1A00", text: "#FDCB6E", dot: "#FDCB6E" },
};

const Badge = ({ status }) => {
  const s = statusColors[status] || statusColors["Pending"];
  return (
    <span style={{ background: s.bg, color: s.text, border: `1px solid ${s.dot}33`, borderRadius: 20, padding: "3px 10px", fontSize: 11, fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 5, whiteSpace: "nowrap" }}>
      <span style={{ width: 5, height: 5, borderRadius: "50%", background: s.dot }} />{status}
    </span>
  );
};

const Tip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "#13111F", border: "1px solid #ffffff15", borderRadius: 10, padding: "10px 14px" }}>
      <p style={{ color: "#A29CC4", fontSize: 12, margin: "0 0 6px" }}>{label}</p>
      {payload.map((p, i) => <p key={i} style={{ color: p.color, fontSize: 13, fontWeight: 600, margin: 0 }}>{p.name}: ${p.value.toLocaleString()}</p>)}
    </div>
  );
};

export default function Dashboard({ onNavigate }) {
  const [activeNav, setActiveNav] = useState("dashboard");

  const handleNav = (id) => {
    setActiveNav(id);
    if (onNavigate && id !== "dashboard" && id !== "analytics" && id !== "messages" && id !== "bookings") {
      onNavigate(id);
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", background: C.bg, fontFamily: "'Inter', -apple-system, sans-serif", color: C.text, overflow: "hidden", fontSize: 14 }}>

      {/* Sidebar */}
      <aside style={{ width: 210, minWidth: 210, background: C.panel, borderRight: `1px solid ${C.border}`, display: "flex", flexDirection: "column", padding: "18px 0" }}>
        <div style={{ padding: "0 16px 20px", borderBottom: `1px solid ${C.border}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <div style={{ width: 32, height: 32, borderRadius: 9, background: "linear-gradient(135deg,#6C5CE7,#A29BFE)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>⚡</div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 14, letterSpacing: "-0.3px" }}>CreatorFlow</div>
              <div style={{ fontSize: 10, color: C.muted }}>Pro Workspace</div>
            </div>
          </div>
        </div>

        <nav style={{ flex: 1, padding: "14px 8px", display: "flex", flexDirection: "column", gap: 2 }}>
          {navItems.map(({ id, label, icon, badge }) => {
            const isActive = activeNav === id;
            return (
              <button key={id} onClick={() => handleNav(id)} style={{ display: "flex", alignItems: "center", gap: 9, padding: "9px 10px", borderRadius: 9, border: "none", background: isActive ? "#6C5CE720" : "transparent", color: isActive ? C.purpleLight : C.muted, cursor: "pointer", width: "100%", textAlign: "left", fontFamily: "inherit", fontSize: 13.5, fontWeight: isActive ? 600 : 400, transition: "all 0.15s" }}>
                <span style={{ fontSize: 15 }}>{icon}</span>
                <span style={{ flex: 1 }}>{label}</span>
                {badge && <span style={{ background: isActive ? C.purple : "#ffffff12", color: isActive ? "#fff" : C.muted, borderRadius: 20, fontSize: 10, fontWeight: 700, padding: "1px 6px" }}>{badge}</span>}
              </button>
            );
          })}
        </nav>

        <div style={{ padding: "14px 16px", borderTop: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg,#6C5CE7,#A29BFE)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#fff", flexShrink: 0 }}>AM</div>
          <div style={{ overflow: "hidden" }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Anna Mari</div>
            <div style={{ fontSize: 11, color: C.muted }}>TMC Creatives</div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main style={{ flex: 1, overflow: "auto", padding: "28px 28px" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 800, margin: 0, letterSpacing: "-0.4px" }}>Good morning, Anna 👋</h1>
            <p style={{ margin: "4px 0 0", color: C.muted, fontSize: 13 }}>Friday, December 13 · You have 3 bookings today</p>
          </div>
          <button style={{ display: "flex", alignItems: "center", gap: 7, background: "linear-gradient(135deg,#6C5CE7,#8B7FF0)", border: "none", borderRadius: 10, padding: "10px 18px", color: "#fff", fontFamily: "inherit", fontSize: 13, fontWeight: 700, cursor: "pointer", boxShadow: "0 4px 20px #6C5CE740" }}
            onClick={() => alert("New project created! 🎬")}>
            + New Project
          </button>
        </div>

        {/* KPI Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 20 }}>
          {[
            { label: "Revenue This Month", value: "$13,400", change: "+19.2%", up: true, icon: "💰", shimmer: true },
            { label: "Active Clients", value: "24", change: "+4", up: true, icon: "👥" },
            { label: "Active Projects", value: "11", change: "+2", up: true, icon: "🗂" },
            { label: "Avg. Rating", value: "4.9 ★", change: "+0.2", up: true, icon: "⭐" },
          ].map((k, i) => (
            <div key={i} style={{ background: k.shimmer ? "linear-gradient(135deg,#1E1B3A,#251E45,#1A1828)" : C.card, border: `1px solid ${k.shimmer ? C.purple : C.border}`, borderRadius: 14, padding: "18px 20px", boxShadow: k.shimmer ? "0 0 30px #6C5CE720" : "none", position: "relative", overflow: "hidden" }}>
              {k.shimmer && <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,#fff,transparent 60%)", opacity: 0.05, pointerEvents: "none" }} />}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <span style={{ fontSize: 22 }}>{k.icon}</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: k.up ? C.success : C.error }}>{k.up ? "↑" : "↓"} {k.change}</span>
              </div>
              <div style={{ fontSize: 26, fontWeight: 800, color: C.text, marginTop: 12, letterSpacing: "-0.5px" }}>{k.value}</div>
              <div style={{ fontSize: 12, color: C.muted, marginTop: 3 }}>{k.label}</div>
            </div>
          ))}
        </div>

        {/* Charts row */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 260px", gap: 14, marginBottom: 20 }}>
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "20px 22px" }}>
            <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>Revenue Overview</div>
            <div style={{ fontSize: 12, color: C.muted, marginBottom: 16 }}>Jan – Dec 2024</div>
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="gr" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6C5CE7" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6C5CE7" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" tick={{ fill: C.muted, fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: C.muted, fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${v / 1000}k`} />
                <Tooltip content={<Tip />} />
                <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#6C5CE7" strokeWidth={2.5} fill="url(#gr)" dot={false} />
                <Area type="monotone" dataKey="expenses" name="Expenses" stroke="#A29BFE" strokeWidth={1.5} fill="none" dot={false} strokeDasharray="4 3" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "20px 22px" }}>
            <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>By Service</div>
            <div style={{ fontSize: 12, color: C.muted, marginBottom: 10 }}>This year</div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <PieChart width={160} height={120}>
                <Pie data={serviceData} cx={75} cy={55} innerRadius={35} outerRadius={55} dataKey="value" strokeWidth={0}>
                  {serviceData.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
              </PieChart>
            </div>
            {serviceData.map(s => (
              <div key={s.name} style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 7 }}>
                <span style={{ width: 8, height: 8, borderRadius: 2, background: s.color, flexShrink: 0 }} />
                <span style={{ flex: 1, fontSize: 12, color: C.muted }}>{s.name}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: C.text }}>{s.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Clients table + Schedule */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 14, marginBottom: 20 }}>
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "20px 22px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div style={{ fontWeight: 700, fontSize: 14 }}>Recent Clients</div>
              <button onClick={() => onNavigate && onNavigate("clients")} style={{ fontSize: 12, color: C.purpleLight, background: "#6C5CE715", border: "1px solid #6C5CE730", borderRadius: 7, padding: "5px 12px", cursor: "pointer", fontFamily: "inherit" }}>View all</button>
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                  {["Client", "Service", "Value", "Date", "Status"].map(h => (
                    <th key={h} style={{ textAlign: "left", padding: "0 8px 10px", fontSize: 11, fontWeight: 600, color: C.muted, textTransform: "uppercase", letterSpacing: "0.5px" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {clients.map(c => (
                  <tr key={c.id} style={{ borderBottom: `1px solid ${C.border}33` }}>
                    <td style={{ padding: "11px 8px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                        <div style={{ width: 30, height: 30, borderRadius: "50%", background: `${c.color}25`, color: c.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, flexShrink: 0 }}>{c.avatar}</div>
                        <span style={{ fontWeight: 500, fontSize: 13 }}>{c.name}</span>
                      </div>
                    </td>
                    <td style={{ padding: "11px 8px", color: C.muted, fontSize: 12 }}>{c.type}</td>
                    <td style={{ padding: "11px 8px", fontWeight: 700, fontSize: 13 }}>{c.amount}</td>
                    <td style={{ padding: "11px 8px", color: C.muted, fontSize: 12 }}>{c.date}</td>
                    <td style={{ padding: "11px 8px" }}><Badge status={c.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "20px 22px" }}>
            <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 16 }}>Today's Schedule</div>
            {bookings.map((b, i) => (
              <div key={i} style={{ padding: "12px 14px", background: "#ffffff04", borderRadius: 10, borderLeft: `3px solid ${b.status === "confirmed" ? C.purple : C.warning}`, marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: C.muted }}>{b.time}</span>
                  <Badge status={b.status} />
                </div>
                <div style={{ fontWeight: 600, fontSize: 13, marginTop: 5 }}>{b.type}</div>
                <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>{b.client} · {b.duration}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Projects */}
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "20px 22px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div style={{ fontWeight: 700, fontSize: 14 }}>Active Projects</div>
            <button onClick={() => onNavigate && onNavigate("projects")} style={{ fontSize: 12, color: C.purpleLight, background: "#6C5CE715", border: "1px solid #6C5CE730", borderRadius: 7, padding: "5px 12px", cursor: "pointer", fontFamily: "inherit" }}>View board</button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
            {projects.map((p, i) => (
              <div key={i} style={{ padding: "14px", background: "#ffffff04", borderRadius: 10, border: `1px solid ${C.border}` }}>
                <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 4 }}>{p.name}</div>
                <div style={{ fontSize: 11, color: C.muted, marginBottom: 10 }}>Due {p.due} · {p.status}</div>
                <div style={{ height: 4, background: "#ffffff08", borderRadius: 4, marginBottom: 6 }}>
                  <div style={{ height: "100%", width: `${p.progress}%`, background: p.progress > 80 ? C.success : p.progress > 50 ? C.purple : C.warning, borderRadius: 4 }} />
                </div>
                <div style={{ fontSize: 11, fontWeight: 700, color: C.muted }}>{p.progress}%</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ height: 32 }} />
      </main>
    </div>
  );
}