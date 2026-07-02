import { useState } from "react";

const C = {
  bg: "#0F0E17", panel: "#13111F", card: "#1A1828",
  border: "#ffffff0d", purple: "#6C5CE7", purpleLight: "#A29BFE",
  text: "#E8E6F0", muted: "#6B6784", success: "#55EFC4",
  warning: "#FDCB6E", error: "#FF7675",
};

const initialProjects = {
  planning: [
    { id: 1, name: "Park Engagement Shoot", client: "James Park", due: "Jan 20", priority: "Low", tags: ["Photography"], progress: 15, avatar: "JP", color: "#FDCB6E" },
    { id: 2, name: "Aria Podcast Series", client: "Aria Patel", due: "Jan 10", priority: "Med", tags: ["YouTube"], progress: 5, avatar: "AP", color: "#74B9FF" },
  ],
  filming: [
    { id: 3, name: "Elevate Brand Film", client: "Marcus Williams", due: "Dec 30", priority: "High", tags: ["Commercial"], progress: 45, avatar: "MW", color: "#00B894" },
    { id: 4, name: "Bloom Agency — Jan", client: "Bloom Weddings", due: "Jan 5", priority: "Med", tags: ["Wedding"], progress: 30, avatar: "BW", color: "#A29BFE" },
  ],
  editing: [
    { id: 5, name: "Chen Wedding Film", client: "Sophia Chen", due: "Dec 22", priority: "High", tags: ["Wedding", "4K"], progress: 78, avatar: "SC", color: "#6C5CE7" },
    { id: 6, name: "Nike Campaign Cut", client: "Marcus Williams", due: "Dec 28", priority: "High", tags: ["Commercial"], progress: 60, avatar: "MW", color: "#00B894" },
  ],
  review: [
    { id: 7, name: "Lena Dec Content", client: "Lena Okafor", due: "Dec 15", priority: "High", tags: ["Social"], progress: 90, avatar: "LO", color: "#E17055" },
  ],
  delivered: [
    { id: 8, name: "Nov Wedding Film", client: "Sophia Chen", due: "Nov 30", priority: "Low", tags: ["Wedding"], progress: 100, avatar: "SC", color: "#6C5CE7" },
    { id: 9, name: "Brand Reel — Oct", client: "Bloom Weddings", due: "Oct 28", priority: "Low", tags: ["Commercial"], progress: 100, avatar: "BW", color: "#A29BFE" },
  ],
};

const columns = [
  { id: "planning", label: "Planning", color: "#74B9FF", emoji: "📋" },
  { id: "filming", label: "Filming", color: "#FDCB6E", emoji: "🎬" },
  { id: "editing", label: "Editing", color: "#6C5CE7", emoji: "✂️" },
  { id: "review", label: "Review", color: "#A29BFE", emoji: "👁" },
  { id: "delivered", label: "Delivered", color: "#55EFC4", emoji: "✅" },
];

const priorityColors = { High: "#FF7675", Med: "#FDCB6E", Low: "#55EFC4" };

function ProjectCard({ project, onOpen }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div onClick={() => onOpen(project)} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ background: hovered ? "#1E1C2E" : C.bg, border: `1px solid ${hovered ? "#6C5CE730" : C.border}`, borderRadius: 12, padding: "14px", cursor: "pointer", transition: "all 0.2s", marginBottom: 10 }}>
      {/* Tags */}
      <div style={{ display: "flex", gap: 5, marginBottom: 10, flexWrap: "wrap" }}>
        {project.tags.map(t => (
          <span key={t} style={{ fontSize: 10, fontWeight: 600, padding: "2px 7px", borderRadius: 20, background: "#6C5CE715", color: C.purpleLight }}>{t}</span>
        ))}
        <span style={{ marginLeft: "auto", fontSize: 10, fontWeight: 700, color: priorityColors[project.priority] }}>● {project.priority}</span>
      </div>

      {/* Title */}
      <div style={{ fontWeight: 700, fontSize: 13.5, color: C.text, marginBottom: 6, lineHeight: 1.3 }}>{project.name}</div>

      {/* Progress */}
      <div style={{ height: 4, background: "#ffffff08", borderRadius: 4, marginBottom: 10 }}>
        <div style={{ height: "100%", width: `${project.progress}%`, background: project.progress === 100 ? "#55EFC4" : project.progress > 70 ? "#6C5CE7" : "#FDCB6E", borderRadius: 4, transition: "width 0.3s" }} />
      </div>

      {/* Footer */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
          <div style={{ width: 22, height: 22, borderRadius: "50%", background: `${project.color}25`, color: project.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 700 }}>{project.avatar}</div>
          <span style={{ fontSize: 11, color: C.muted }}>{project.client}</span>
        </div>
        <div style={{ fontSize: 11, color: C.muted }}>📅 {project.due}</div>
      </div>
    </div>
  );
}

function ProjectModal({ project, onClose }) {
  const [activeTab, setActiveTab] = useState("details");
  if (!project) return null;
  return (
    <div style={{ position: "fixed", inset: 0, background: "#000000bb", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center" }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{ background: C.panel, border: `1px solid ${C.border}`, borderRadius: 18, padding: "28px", width: 520, maxHeight: "85vh", overflowY: "auto", boxShadow: "0 24px 80px #00000090" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div style={{ display: "flex", gap: 6 }}>
            {project.tags.map(t => <span key={t} style={{ fontSize: 11, padding: "3px 9px", borderRadius: 20, background: "#6C5CE715", color: C.purpleLight }}>{t}</span>)}
          </div>
          <button onClick={onClose} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, width: 28, height: 28, cursor: "pointer", color: C.muted, fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>
        </div>

        <h2 style={{ fontSize: 20, fontWeight: 800, color: C.text, margin: "0 0 6px" }}>{project.name}</h2>
        <p style={{ fontSize: 13, color: C.muted, margin: "0 0 20px" }}>Client: {project.client} · Due: {project.due}</p>

        {/* Progress */}
        <div style={{ background: C.card, borderRadius: 12, padding: "16px", marginBottom: 18 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: C.text }}>Progress</span>
            <span style={{ fontSize: 14, fontWeight: 800, color: C.purpleLight }}>{project.progress}%</span>
          </div>
          <div style={{ height: 6, background: "#ffffff08", borderRadius: 4 }}>
            <div style={{ height: "100%", width: `${project.progress}%`, background: "linear-gradient(90deg,#6C5CE7,#A29BFE)", borderRadius: 4 }} />
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 4, background: C.card, borderRadius: 10, padding: 4, marginBottom: 18 }}>
          {["details", "deliverables", "files", "comments"].map(t => (
            <button key={t} onClick={() => setActiveTab(t)} style={{ flex: 1, padding: "7px", border: "none", borderRadius: 7, background: activeTab === t ? C.purple : "transparent", color: activeTab === t ? "#fff" : C.muted, fontFamily: "inherit", fontSize: 11, fontWeight: activeTab === t ? 600 : 400, cursor: "pointer", textTransform: "capitalize" }}>{t}</button>
          ))}
        </div>

        {activeTab === "details" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[["Priority", project.priority], ["Due date", project.due], ["Client", project.client], ["Status", "In Progress"]].map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "10px 14px", background: C.card, borderRadius: 9 }}>
                <span style={{ fontSize: 13, color: C.muted }}>{k}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{v}</span>
              </div>
            ))}
          </div>
        )}
        {activeTab === "deliverables" && (
          <div>
            {["Raw footage review", "First cut", "Client revision round 1", "Color grade", "Final delivery"].map((d, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: `1px solid ${C.border}` }}>
                <div style={{ width: 18, height: 18, borderRadius: 5, border: `1.5px solid ${i < Math.floor(project.progress / 20) ? C.purple : C.border}`, background: i < Math.floor(project.progress / 20) ? C.purple : "transparent", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "#fff", flexShrink: 0 }}>
                  {i < Math.floor(project.progress / 20) ? "✓" : ""}
                </div>
                <span style={{ fontSize: 13, color: i < Math.floor(project.progress / 20) ? C.muted : C.text }}>{d}</span>
              </div>
            ))}
          </div>
        )}
        {activeTab === "files" && (
          <div>
            {[["📹", "raw_footage_v1.zip", "2.4 GB"], ["🎬", "first_cut_v1.mp4", "840 MB"], ["📄", "project_brief.pdf", "1.2 MB"]].map(([icon, name, size], i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", background: C.card, borderRadius: 10, marginBottom: 8 }}>
                <span style={{ fontSize: 20 }}>{icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{name}</div>
                  <div style={{ fontSize: 11, color: C.muted }}>{size}</div>
                </div>
                <button style={{ background: "transparent", border: "none", color: C.purpleLight, cursor: "pointer", fontSize: 12, fontFamily: "inherit" }}>↓ Download</button>
              </div>
            ))}
            <button style={{ width: "100%", padding: "11px", background: "#6C5CE710", border: "1px dashed #6C5CE740", borderRadius: 10, color: C.purpleLight, fontFamily: "inherit", fontSize: 13, cursor: "pointer", marginTop: 4 }}>+ Upload file</button>
          </div>
        )}
        {activeTab === "comments" && (
          <div>
            {[{ user: "Anna Mari", time: "2h ago", msg: "First cut is ready for client review. Please check the color grading in the reception scene." }, { user: "Sophia Chen", time: "1h ago", msg: "Looks amazing! Just one note — can we make the ceremony entrance a bit slower?" }].map((c, i) => (
              <div key={i} style={{ display: "flex", gap: 10, marginBottom: 14 }}>
                <div style={{ width: 30, height: 30, borderRadius: "50%", background: i === 0 ? "#6C5CE730" : "#FDCB6E30", color: i === 0 ? C.purple : "#FDCB6E", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{i === 0 ? "AM" : "SC"}</div>
                <div style={{ flex: 1, background: C.card, borderRadius: 10, padding: "10px 12px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: C.text }}>{c.user}</span>
                    <span style={{ fontSize: 11, color: C.muted }}>{c.time}</span>
                  </div>
                  <p style={{ margin: 0, fontSize: 13, color: C.muted, lineHeight: 1.5 }}>{c.msg}</p>
                </div>
              </div>
            ))}
            <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
              <input placeholder="Add a comment..." style={{ flex: 1, background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 12px", color: C.text, fontFamily: "inherit", fontSize: 13, outline: "none" }} />
              <button style={{ padding: "10px 16px", background: C.purple, border: "none", borderRadius: 10, color: "#fff", fontFamily: "inherit", fontSize: 13, cursor: "pointer" }}>Send</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Projects() {
  const [projects] = useState(initialProjects);
  const [viewMode, setViewMode] = useState("kanban");
  const [selected, setSelected] = useState(null);
  const totalProjects = Object.values(projects).flat().length;
  const activeProjects = Object.entries(projects).filter(([k]) => k !== "delivered").flatMap(([, v]) => v).length;

  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "'Inter', -apple-system, sans-serif", color: C.text }}>
      <div style={{ padding: "36px 28px" }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 800, margin: "0 0 4px", letterSpacing: "-0.5px" }}>Projects</h1>
            <p style={{ margin: 0, fontSize: 13, color: C.muted }}>{totalProjects} total · {activeProjects} in progress</p>
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <div style={{ display: "flex", background: C.card, border: `1px solid ${C.border}`, borderRadius: 9, overflow: "hidden" }}>
              {[["⊞ Kanban", "kanban"], ["☰ List", "list"]].map(([label, v]) => (
                <button key={v} onClick={() => setViewMode(v)} style={{ padding: "8px 14px", border: "none", background: viewMode === v ? C.purple : "transparent", color: viewMode === v ? "#fff" : C.muted, fontFamily: "inherit", fontSize: 12, fontWeight: viewMode === v ? 600 : 400, cursor: "pointer" }}>{label}</button>
              ))}
            </div>
            <button style={{ padding: "10px 18px", background: "linear-gradient(135deg,#6C5CE7,#8B7FF0)", border: "none", borderRadius: 10, color: "#fff", fontFamily: "inherit", fontSize: 13, fontWeight: 700, cursor: "pointer", boxShadow: "0 4px 16px #6C5CE740" }}>+ New project</button>
          </div>
        </div>

        {/* KPIs */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 10, marginBottom: 24 }}>
          {columns.map(col => (
            <div key={col.id} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: "14px 16px" }}>
              <div style={{ fontSize: 18, marginBottom: 6 }}>{col.emoji}</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: col.color }}>{projects[col.id]?.length || 0}</div>
              <div style={{ fontSize: 12, color: C.muted, marginTop: 1 }}>{col.label}</div>
            </div>
          ))}
        </div>

        {/* Kanban board */}
        {viewMode === "kanban" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 14, overflowX: "auto" }}>
            {columns.map(col => (
              <div key={col.id}>
                {/* Column header */}
                <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 12, padding: "8px 10px", background: `${col.color}12`, border: `1px solid ${col.color}25`, borderRadius: 9 }}>
                  <span style={{ fontSize: 14 }}>{col.emoji}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: col.color }}>{col.label}</span>
                  <span style={{ marginLeft: "auto", fontSize: 11, fontWeight: 700, background: `${col.color}20`, color: col.color, borderRadius: 20, padding: "1px 7px" }}>{projects[col.id]?.length}</span>
                </div>
                {/* Cards */}
                <div style={{ minHeight: 100 }}>
                  {projects[col.id]?.map(p => <ProjectCard key={p.id} project={p} onOpen={setSelected} />)}
                  <button style={{ width: "100%", padding: "9px", background: "transparent", border: `1px dashed ${C.border}`, borderRadius: 10, color: C.muted, fontFamily: "inherit", fontSize: 12, cursor: "pointer", marginTop: 4 }}>+ Add card</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* List view */}
        {viewMode === "list" && (
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                  {["Project", "Client", "Status", "Progress", "Due", "Priority"].map(h => (
                    <th key={h} style={{ textAlign: "left", padding: "12px 16px", fontSize: 11, fontWeight: 600, color: C.muted, textTransform: "uppercase", letterSpacing: "0.5px" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Object.entries(projects).flatMap(([status, items]) =>
                  items.map(p => (
                    <tr key={p.id} onClick={() => setSelected(p)} style={{ borderBottom: `1px solid ${C.border}33`, cursor: "pointer" }}
                      onMouseEnter={e => e.currentTarget.style.background = "#ffffff04"}
                      onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                      <td style={{ padding: "13px 16px", fontWeight: 600, fontSize: 13.5, color: C.text }}>{p.name}</td>
                      <td style={{ padding: "13px 16px", fontSize: 13, color: C.muted }}>{p.client}</td>
                      <td style={{ padding: "13px 16px" }}>
                        <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 9px", borderRadius: 20, background: `${columns.find(c => c.id === status)?.color}15`, color: columns.find(c => c.id === status)?.color }}>
                          {columns.find(c => c.id === status)?.label}
                        </span>
                      </td>
                      <td style={{ padding: "13px 16px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <div style={{ width: 80, height: 4, background: "#ffffff08", borderRadius: 4 }}>
                            <div style={{ height: "100%", width: `${p.progress}%`, background: C.purple, borderRadius: 4 }} />
                          </div>
                          <span style={{ fontSize: 11, color: C.muted }}>{p.progress}%</span>
                        </div>
                      </td>
                      <td style={{ padding: "13px 16px", fontSize: 12, color: C.muted }}>{p.due}</td>
                      <td style={{ padding: "13px 16px" }}>
                        <span style={{ fontSize: 11, fontWeight: 700, color: priorityColors[p.priority] }}>● {p.priority}</span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}